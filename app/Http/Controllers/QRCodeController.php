<?php

namespace App\Http\Controllers;

use App\Services\QRCodeService;
use Illuminate\Http\Request;

class QRCodeController extends Controller
{
    protected $qrCodeService;

    public function __construct(QRCodeService $qrCodeService)
    {
        $this->qrCodeService = $qrCodeService;
    }

    public function generateQRCode(Request $request)
    {
        $data = $request->validate([
            'participant_id' => 'required|exists:participants,id',
        ]);

        $qrCode = $this->qrCodeService->generate($data['participant_id']);

        return response()->json(['qr_code' => $qrCode]);
    }

    public function scanQRCode(Request $request)
    {
        $data = $request->validate([
            'qr_code_data' => 'required|string',
        ]);

        $participant = $this->qrCodeService->scan($data['qr_code_data']);

        return response()->json(['participant' => $participant]);
    }
}