<?php

namespace Tests\Feature;

use App\Models\Lead;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Schema;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class LeadSubmissionTest extends TestCase
{
    use RefreshDatabase;

    private function payload(array $overrides = []): array
    {
        return array_merge([
            'submission_token' => '9c8a2526-14b9-45d5-8d91-2951a2c69c90',
            'name' => 'Jane Doe',
            'email' => 'jane@example.org',
            'phone' => '+962 7 9000 0000',
            'property_type' => 'residential',
            'location' => 'Amman',
            'message' => 'I would like to explore rooftop solar.',
            'consent' => '1',
        ], $overrides);
    }

    public function test_saves_request_and_returns_its_reference_without_sending_mail(): void
    {
        Mail::fake();

        $response = $this->post('/consultation', $this->payload(['reference' => 'attacker-controlled']));

        $response->assertRedirect('/#consultation')->assertSessionHasNoErrors();
        $lead = Lead::sole();
        $response->assertSessionHas('lead_reference', $lead->reference);
        $this->assertDatabaseHas('leads', ['name' => 'Jane Doe', 'email' => 'jane@example.org', 'location' => 'Amman']);
        $this->assertNotSame('attacker-controlled', $lead->reference);
        $this->assertNotNull($lead->consented_at);
        Mail::assertNothingSent();
    }

    public function test_retry_does_not_create_or_overwrite_a_request(): void
    {
        $this->post('/consultation', $this->payload())->assertSessionHasNoErrors();
        $reference = Lead::sole()->reference;

        $response = $this->post('/consultation', $this->payload(['name' => 'Changed name']));

        $response->assertSessionHas('lead_reference', $reference);
        $this->assertDatabaseCount('leads', 1);
        $this->assertDatabaseHas('leads', ['name' => 'Jane Doe']);
    }

    public function test_missing_fields_are_rejected_with_preserved_input(): void
    {
        $response = $this->from('/')->post('/consultation', ['email' => 'jane@example.org']);

        $response->assertRedirect('/')->assertSessionHasErrors(['name', 'phone', 'property_type', 'location', 'consent', 'submission_token']);
        $response->assertSessionHasInput('email', 'jane@example.org');
        $this->assertDatabaseCount('leads', 0);
    }

    public static function invalidInputs(): array
    {
        return [
            'invalid email' => ['email', 'not-an-email'],
            'invalid phone' => ['phone', 'phone-number'],
            'short phone' => ['phone', '123'],
            'unknown type' => ['property_type', 'industrial-other'],
            'no consent' => ['consent', '0'],
            'forged token' => ['submission_token', 'invalid'],
            'name too long' => ['name', str_repeat('a', 121)],
            'message too long' => ['message', str_repeat('a', 2001)],
            'location too long' => ['location', str_repeat('a', 161)],
            'honeypot' => ['website', 'spam.example'],
        ];
    }

    #[DataProvider('invalidInputs')]
    public function test_invalid_input_cannot_create_a_lead(string $field, string $value): void
    {
        $response = $this->from('/')->post('/consultation', $this->payload([$field => $value]));

        $response->assertSessionHasErrors($field)->assertSessionMissing('lead_reference');
        $this->assertDatabaseCount('leads', 0);
    }

    public function test_validation_renders_untrusted_old_input_as_text(): void
    {
        $payload = $this->payload(['name' => '<script>alert(1)</script>', 'email' => 'bad']);
        $this->from('/')->post('/consultation', $payload)->assertSessionHasErrors('email');

        $response = $this->get('/');

        $response->assertOk()->assertSee('&lt;script&gt;alert(1)&lt;/script&gt;', false)
            ->assertDontSee('<script>alert(1)</script>', false);
    }

    public function test_storage_failure_returns_error_without_success(): void
    {
        Schema::drop('leads');

        $response = $this->post('/consultation', $this->payload());

        $response->assertRedirect('/#consultation')->assertSessionHasErrors('form')
            ->assertSessionMissing('lead_reference')->assertSessionHasInput('email', 'jane@example.org');
    }

    public function test_sixth_submission_in_one_minute_returns_429(): void
    {
        for ($attempt = 0; $attempt < 5; $attempt++) {
            $this->post('/consultation', $this->payload())->assertRedirect();
        }

        $response = $this->post('/consultation', $this->payload());

        $response->assertTooManyRequests();
        $this->assertDatabaseCount('leads', 1);
    }

    public function test_public_cannot_browse_or_edit_leads(): void
    {
        $this->get('/leads')->assertNotFound();
        $this->put('/consultation', $this->payload())->assertStatus(405);
    }

    public function test_home_explains_preview_and_has_all_main_sections(): void
    {
        $this->get('/')->assertOk()->assertSee('Energy Mode')
            ->assertSee('PRE-LAUNCH PREVIEW')->assertSee('Request a consultation')
            ->assertSee('Our project collection is taking shape.');
    }

    public function test_cleanup_removes_expired_leads_and_preserves_recent_records(): void
    {
        $expired = Lead::factory()->create(['created_at' => now()->subDays(91)]);
        $recent = Lead::factory()->create(['created_at' => now()->subDays(2)]);

        $this->artisan('leads:prune')->assertSuccessful();

        $this->assertModelMissing($expired);
        $this->assertModelExists($recent);
    }
}
