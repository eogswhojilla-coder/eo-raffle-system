<?php

namespace App\Http\Controllers;

use App\Models\RaffleWinner;
use App\Models\RaffleParticipant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WinnerController extends Controller
{
    /**
     * Get all winners with participant and raffle details
     */
    public function index()
    {
        $winners = RaffleWinner::with(['participant', 'raffle'])
            ->orderBy('drawn_at', 'desc')
            ->get();
        
        return response()->json($winners);
    }

    /**
     * Record a new winner
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'participant_id' => 'required|exists:raffle_participants,id',
            'prize_name' => 'nullable|string|max:255',
            'raffle_id' => 'nullable|exists:raffles,id'
        ]);

        $participant = RaffleParticipant::findOrFail($validated['participant_id']);
        
        // Check if participant is already a winner
        if ($participant->is_winner) {
            return response()->json([
                'success' => false,
                'message' => 'Participant has already won'
            ], 422);
        }

        DB::beginTransaction();
        
        try {
            // Mark participant as winner
            $participant->update(['is_winner' => true]);

            // Create winner record
            $winner = RaffleWinner::create([
                'raffle_id' => $validated['raffle_id'] ?? $participant->raffle_id,
                'winner_id' => $validated['participant_id'],
                'prize_name' => $validated['prize_name'] ?? 'Grand Prize',
                'drawn_at' => now(),
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Winner recorded successfully',
                'winner' => $winner->load(['participant', 'raffle'])
            ], 201);
            
        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to record winner: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get winners for a specific raffle
     */
    public function getRaffleWinners($raffleId)
    {
        $winners = RaffleWinner::with(['participant'])
            ->where('raffle_id', $raffleId)
            ->orderBy('drawn_at', 'desc')
            ->get();
        
        return response()->json($winners);
    }
}
