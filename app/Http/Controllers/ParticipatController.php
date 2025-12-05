<?php

namespace App\Http\Controllers;

use App\Models\RaffleParticipant;
use App\Services\QRCodeService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ParticipantController extends Controller
{
    protected $qrCodeService;

    public function __construct(QRCodeService $qrCodeService)
    {
        $this->qrCodeService = $qrCodeService;
    }

    /**
     * Get all participants (not winners)
     */
    public function index()
    {
        $participants = RaffleParticipant::where('is_winner', false)
            ->orderBy('created_at', 'desc')
            ->get();
        
        return response()->json($participants);
    }

    /**
     * Get participants for a specific raffle
     */
    public function getParticipants($raffleId)
    {
        $participants = RaffleParticipant::where('raffle_id', $raffleId)
            ->where('is_winner', false)
            ->get();
        
        return response()->json($participants);
    }

    /**
     * Register a new participant with QR code generation
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'attendee_name' => 'required|string|max:255',
            'contact_number' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'raffle_id' => 'nullable|exists:raffles,id'
        ]);

        // Generate unique QR code data
        $qrData = Str::uuid()->toString();

        // Generate QR code image
        $qrCode = $this->qrCodeService->generateQRCode($qrData, "participant_{$qrData}.svg");

        // Create participant
        $participant = RaffleParticipant::create([
            'raffle_id' => $validated['raffle_id'] ?? 1,
            'attendee_name' => $validated['attendee_name'],
            'contact_number' => $validated['contact_number'] ?? null,
            'email' => $validated['email'] ?? null,
            'qr_code_data' => $qrData,
            'scanned_at' => now(),
            'is_winner' => false,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Participant registered successfully',
            'participant' => $participant,
            'qr_code_url' => $qrCode['url'],
            'qr_code_path' => $qrCode['path']
        ], 201);
    }

    /**
     * Register participant by scanning QR code
     */
    public function registerParticipant(Request $request)
    {
        $validated = $request->validate([
            'qr_code_data' => 'required|string',
            'raffle_id' => 'nullable|exists:raffles,id'
        ]);

        $existingParticipant = RaffleParticipant::where('qr_code_data', $validated['qr_code_data'])->first();

        if ($existingParticipant) {
            return response()->json([
                'success' => false,
                'message' => 'QR Code already scanned',
                'participant' => $existingParticipant
            ], 422);
        }

        $participant = RaffleParticipant::create([
            'raffle_id' => $validated['raffle_id'] ?? 1,
            'qr_code_data' => $validated['qr_code_data'],
            'scanned_at' => now(),
            'is_winner' => false,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Participant registered via QR scan',
            'participant' => $participant
        ], 201);
    }

    /**
     * Get a single participant
     */
    public function show($id)
    {
        $participant = RaffleParticipant::with('raffle')->findOrFail($id);
        return response()->json($participant);
    }

    /**
     * Update participant information
     */
    public function update(Request $request, $id)
    {
        $participant = RaffleParticipant::findOrFail($id);

        $validated = $request->validate([
            'attendee_name' => 'sometimes|string|max:255',
            'contact_number' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
        ]);

        $participant->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Participant updated successfully',
            'participant' => $participant
        ]);
    }

    /**
     * Delete a participant
     */
    public function destroy($id)
    {
        $participant = RaffleParticipant::findOrFail($id);
        $participant->delete();

        return response()->json([
            'success' => true,
            'message' => 'Participant deleted successfully'
        ]);
    }
}