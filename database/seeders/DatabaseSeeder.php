<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Raffle;
use App\Models\RaffleParticipant;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
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

        // Sample names
        $firstNames = [
            'John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'James', 'Emma',
            'Robert', 'Olivia', 'William', 'Ava', 'Richard', 'Isabella', 'Joseph',
            'Sophia', 'Thomas', 'Mia', 'Charles', 'Charlotte', 'Daniel', 'Amelia',
            'Matthew', 'Harper', 'Anthony', 'Evelyn', 'Mark', 'Abigail', 'Donald',
            'Elizabeth', 'Steven', 'Sofia', 'Paul', 'Ella', 'Andrew', 'Madison',
            'Joshua', 'Scarlett', 'Kenneth', 'Victoria', 'Kevin', 'Aria', 'Brian',
            'Grace', 'George', 'Chloe', 'Edward', 'Camila', 'Ronald', 'Penelope'
        ];

        $lastNames = [
            'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
            'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez',
            'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
            'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark',
            'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King',
            'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green',
            'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell',
            'Carter', 'Roberts'
        ];

        // Create 50 participants
        for ($i = 1; $i <= 50; $i++) {
            $firstName = $firstNames[array_rand($firstNames)];
            $lastName = $lastNames[array_rand($lastNames)];
            $fullName = $firstName . ' ' . $lastName;
            $email = strtolower($firstName . '.' . $lastName . $i . '@example.com');
            $contactNumber = '+639' . rand(100000000, 999999999);

            RaffleParticipant::create([
                'raffle_id' => $raffle->id,
                'attendee_name' => $fullName,
                'contact_number' => $contactNumber,
                'email' => $email,
                'qr_code_data' => 'QR_CODE_' . str_pad($i, 4, '0', STR_PAD_LEFT),
                'is_winner' => false,
                'scanned_at' => now(),
            ]);
        }

        $this->command->info('✅ Created 1 raffle and 50 participants successfully!');
    }
}