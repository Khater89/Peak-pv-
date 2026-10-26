<?php

use App\Http\Controllers\LeadController;
use Illuminate\Support\Facades\Route;

Route::view('/', 'home')->name('home');
Route::post('/consultation', [LeadController::class, 'store'])->middleware('throttle:5,1')->name('leads.store');
