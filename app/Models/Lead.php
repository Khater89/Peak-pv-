<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasFactory;

    protected $fillable = ['reference', 'submission_token', 'name', 'email', 'phone', 'property_type', 'location', 'message', 'consented_at'];

    protected function casts(): array
    {
        return ['consented_at' => 'datetime'];
    }
}
