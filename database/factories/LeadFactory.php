<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class LeadFactory extends Factory
{
    public function definition(): array
    {
        return [
            'reference' => fake()->uuid(),
            'submission_token' => fake()->uuid(),
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
            'phone' => '+962 7 9000 0000',
            'property_type' => 'residential',
            'location' => 'Amman',
            'message' => null,
            'consented_at' => now(),
        ];
    }
}
