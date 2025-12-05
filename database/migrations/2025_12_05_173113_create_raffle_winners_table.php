<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('raffle_winners', function (Blueprint $table) {
            $table->id();
            $table->foreignId('raffle_id')->nullable()->constrained('raffles')->onDelete('cascade');
            $table->foreignId('winner_id')->constrained('raffle_participants')->onDelete('cascade');
            $table->string('prize_name')->nullable();
            $table->timestamp('drawn_at');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('raffle_winners');
    }
};