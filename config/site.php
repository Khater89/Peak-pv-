<?php

return [
    'name' => 'Energy Mode',
    'tagline' => 'A brighter way forward.',
    'preview' => env('SITE_PREVIEW', true),
    // Publish only verified services and company details. No public contact details are invented.
    'email' => env('SITE_CONTACT_EMAIL'),
    'phone' => env('SITE_CONTACT_PHONE'),
    'service_area' => env('SITE_SERVICE_AREA'),
    'services' => [
        ['number' => '01', 'title' => 'Solar for your home', 'text' => 'Explore a rooftop PV system built around your home, your energy use, and your plans for the future.', 'type' => 'Residential'],
        ['number' => '02', 'title' => 'Power your business', 'text' => 'Understand the options for your commercial property, from available roof space to your daily energy profile.', 'type' => 'Commercial'],
        ['number' => '03', 'title' => 'Start with clarity', 'text' => 'Make sense of solar panels, inverters, and battery options before deciding on your next step.', 'type' => 'Consultation'],
    ],
    'faqs' => [
        ['question' => 'Is my property suitable for solar?', 'answer' => 'Suitability depends on roof condition, orientation, shading, available space, and local requirements. A site assessment is needed before a system can be recommended.'],
        ['question' => 'How much could I save?', 'answer' => 'Savings vary with your energy use, system design, electricity tariff, and local export rules. A proposal should explain its inputs and assumptions. We do not promise a fixed saving.'],
        ['question' => 'Do I need a battery?', 'answer' => 'A battery is optional for many systems. Whether it makes sense depends on when you use electricity, backup needs, local rules, and budget. Backup capability requires suitable equipment and design.'],
        ['question' => 'What happens after I send a request?', 'answer' => 'Your request is stored with a reference number. This preview does not send email or guarantee a callback. Confirm the company contact and receiving workflow before using it for a real enquiry.'],
        ['question' => 'Can solar power my home during an outage?', 'answer' => 'Standard grid-connected systems generally shut down during an outage. Backup operation requires a specifically designed system, compatible equipment, and appropriate safety controls.'],
    ],
];
