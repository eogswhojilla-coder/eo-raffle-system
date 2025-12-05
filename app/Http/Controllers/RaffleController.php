<?php

namespace App\Http\Controllers;

use App\Models\Raffle;
use Illuminate\Http\Request;

class RaffleController extends Controller
{
    /**
     * Get all raffles
     */
    public function index()
    {
        $raffles = Raffle::with(['participants', 'winners'])
            ->orderBy('created_at', 'desc')
            ->get();
        
        return response()->json($raffles);
    }

    /**
     * Create a new raffle
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'raffle_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);

        $raffle = Raffle::create([
            'raffle_name' => $validated['raffle_name'],
            'description' => $validated['description'] ?? null,
            'status' => 'active',
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Raffle created successfully',
            'raffle' => $raffle
        ], 201);
    }

    /**
     * Get a single raffle with participants and winners
     */
    public function show($id)
    {
        $raffle = Raffle::with(['participants', 'winners'])->findOrFail($id);
        return response()->json($raffle);
    }

    /**
     * Update raffle information
     */
    public function update(Request $request, $id)
    {
        $raffle = Raffle::findOrFail($id);
        
        $validated = $request->validate([
            'raffle_name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|in:active,completed,cancelled',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date|after:start_date',
        ]);

        $raffle->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Raffle updated successfully',
            'raffle' => $raffle
        ]);
    }

    /**
     * Delete a raffle
     */
    public function destroy($id)
    {
        $raffle = Raffle::findOrFail($id);
        $raffle->delete();

        return response()->json([
            'success' => true,
            'message' => 'Raffle deleted successfully'
        ]);
    }
}