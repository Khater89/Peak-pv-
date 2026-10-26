<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Database\QueryException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class LeadController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'submission_token' => ['required', 'uuid'],
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email:rfc', 'max:254'],
            'phone' => ['required', 'string', 'min:7', 'max:40', 'regex:/^[0-9+() .-]+$/'],
            'property_type' => ['required', Rule::in(['residential', 'commercial', 'other'])],
            'location' => ['required', 'string', 'max:160'],
            'message' => ['nullable', 'string', 'max:2000'],
            'consent' => ['accepted'],
            'website' => ['nullable', 'max:0'],
        ]);

        try {
            $lead = Lead::firstOrCreate(
                ['submission_token' => $data['submission_token']],
                array_merge(collect($data)->except(['consent', 'website'])->all(), [
                    'reference' => (string) Str::uuid(),
                    'consented_at' => now(),
                ]),
            );
        } catch (QueryException $exception) {
            report($exception);

            return redirect('/#consultation')->withInput($request->except(['_token', 'website']))
                ->withErrors(['form' => 'We could not save your request. Please try again shortly.']);
        }

        return redirect('/#consultation')->with('lead_reference', $lead->reference);
    }
}
