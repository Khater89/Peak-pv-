<?php

use App\Models\Lead;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('leads:prune', function () {
    $count = Lead::where('created_at', '<', now()->subDays(90))->delete();
    $this->info("Deleted {$count} expired enquiries.");
})->purpose('Delete enquiries older than the proposed 90-day retention period');

Schedule::command('leads:prune')->daily();
