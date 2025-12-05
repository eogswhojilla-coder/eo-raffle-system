<?php


namespace App\Http\Controllers;

use App\Models\RaffleParticipant;
use Illuminate\Http\Request;

class RaffleParticipantController extends Controller
{
    // ...existing methods...

    /**
     * ✅ Mark participant as winner
     */
    public function markAsWinner(Request $request, RaffleParticipant $raffleParticipant)
    {
        try {
            $raffleParticipant->update([
                'is_winner' => true,
                'prize_name' => $request->input('prize_name', 'Grand Prize'),
                'won_at' => $request->input('won_at', now()),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Winner saved successfully!',
                'data' => $raffleParticipant
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to save winner: ' . $e->getMessage()
            ], 500);
        }
    }
}