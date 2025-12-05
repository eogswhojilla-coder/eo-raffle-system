<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateParticipantsTable extends Migration
{
    public function up()
    {
        Schema::create('raffle_participants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('raffle_id')->constrained()->onDelete('cascade');
            $table->string('attendee_name');
            $table->string('contact_number');
            $table->string('email')->unique();
            $table->string('qr_code_data')->unique();
            $table->boolean('is_winner')->default(false);
            $table->timestamp('scanned_at')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('raffle_participants');
    }
}