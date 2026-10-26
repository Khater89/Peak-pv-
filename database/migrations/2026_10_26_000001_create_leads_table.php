<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->uuid('reference')->unique();
            $table->uuid('submission_token')->unique();
            $table->string('name', 120);
            $table->string('email', 254);
            $table->string('phone', 40);
            $table->string('property_type', 30);
            $table->string('location', 160);
            $table->text('message')->nullable();
            $table->timestamp('consented_at');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
