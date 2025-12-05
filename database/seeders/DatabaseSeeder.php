<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Raffle;
use App\Models\RaffleParticipant;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create default raffle
        $raffle = Raffle::create([
            'raffle_name' => 'EmpireOne Christmas Raffle 2024',
            'description' => 'Win amazing prizes this Christmas season!',
            'status' => 'active',
            'start_date' => now(),
            'end_date' => now()->addDays(30),
        ]);

        // Create sample participants
        RaffleParticipant::create([
            'raffle_id' => $raffle->id,
            'attendee_name' => 'Erving Langga',
            'contact_number' => '1234567890',
            'email' => 'erving@example.com',
            'qr_code_data' => 'QR_CODE_DATA_1',
            'is_winner' => false,
            'scanned_at' => now(),
        ]);

        RaffleParticipant::create([
            'raffle_id' => $raffle->id,
            'attendee_name' => 'Wakin Hojilla',
            'contact_number' => '0987654321',
            'email' => 'wakin@example.com',
            'qr_code_data' => 'QR_CODE_DATA_2',
            'is_winner' => false,
            'scanned_at' => now(),
        ]);
    }
}