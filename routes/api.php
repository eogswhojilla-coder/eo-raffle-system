<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RaffleController;
use App\Http\Controllers\ParticipantController;
use App\Http\Controllers\WinnerController;

// Raffle Routes
Route::apiResource('raffles', RaffleController::class);

// Participant Routes
Route::get('participants', [ParticipantController::class, 'index']);
Route::post('participants', [ParticipantController::class, 'store']);
Route::get('participants/{id}', [ParticipantController::class, 'show']);
Route::put('participants/{id}', [ParticipantController::class, 'update']);
Route::delete('participants/{id}', [ParticipantController::class, 'destroy']);

// Special participant routes
Route::get('raffles/{raffleId}/participants', [ParticipantController::class, 'getParticipants']);
Route::post('participants/scan', [ParticipantController::class, 'registerParticipant']);

// Winner Routes
Route::get('winners', [WinnerController::class, 'index']);
Route::post('winners', [WinnerController::class, 'store']);
Route::get('raffles/{raffleId}/winners', [WinnerController::class, 'getRaffleWinners']);