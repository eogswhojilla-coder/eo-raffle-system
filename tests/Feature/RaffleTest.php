<?php

namespace Tests\Feature;

use App\Models\Raffle;
use App\Models\Participant;
use App\Models\RaffleParticipant;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class RaffleTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_raffle()
    {
        $response = $this->postJson('/api/raffles', [
            'raffle_name' => 'Test Raffle',
            'description' => 'This is a test raffle.',
            'start_date' => now(),
            'end_date' => now()->addDays(5),
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('raffles', [
            'raffle_name' => 'Test Raffle',
        ]);
    }

    public function test_can_get_raffles()
    {
        Raffle::factory()->count(3)->create();

        $response = $this->getJson('/api/raffles');

        $response->assertStatus(200);
        $this->assertCount(3, $response->json());
    }

    public function test_can_update_raffle()
    {
        $raffle = Raffle::factory()->create();

        $response = $this->putJson('/api/raffles/' . $raffle->id, [
            'raffle_name' => 'Updated Raffle',
            'description' => 'Updated description.',
            'start_date' => now(),
            'end_date' => now()->addDays(10),
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('raffles', [
            'raffle_name' => 'Updated Raffle',
        ]);
    }

    public function test_can_delete_raffle()
    {
        $raffle = Raffle::factory()->create();

        $response = $this->deleteJson('/api/raffles/' . $raffle->id);

        $response->assertStatus(204);
        $this->assertDatabaseMissing('raffles', [
            'id' => $raffle->id,
        ]);
    }

    public function test_can_register_participant()
    {
        $raffle = Raffle::factory()->create();

        $response = $this->postJson('/api/participants', [
            'raffle_id' => $raffle->id,
            'attendee_name' => 'John Doe',
            'contact_number' => '1234567890',
            'email' => 'john@example.com',
            'qr_code_data' => Str::random(10),
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('participants', [
            'attendee_name' => 'John Doe',
        ]);
    }

    public function test_can_get_participants()
    {
        $raffle = Raffle::factory()->create();
        RaffleParticipant::factory()->count(3)->create(['raffle_id' => $raffle->id]);

        $response = $this->getJson('/api/participants?raffle_id=' . $raffle->id);

        $response->assertStatus(200);
        $this->assertCount(3, $response->json());
    }
}