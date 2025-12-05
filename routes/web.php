<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RaffleController;
use App\Http\Controllers\ParticipantController;
use App\Http\Controllers\QRCodeController;

// Raffle routes
Route::resource('raffles', RaffleController::class);

// Participant routes
Route::post('participants', [ParticipantController::class, 'registerParticipant']);
Route::get('participants', [ParticipantController::class, 'getParticipants']);
Route::get('participants/{id}', [ParticipantController::class, 'getParticipant']);

// QR Code routes
Route::post('qrcode/generate', [QRCodeController::class, 'generateQRCode']);
Route::post('qrcode/scan', [QRCodeController::class, 'scanQRCode']);

// Catch all routes and return the React app
// This MUST be at the bottom - Laravel reads routes top to bottom
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');