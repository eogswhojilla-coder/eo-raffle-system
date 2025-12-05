<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RaffleParticipant extends Model
{
    use HasFactory;

    protected $fillable = [
        'raffle_id',
        'attendee_name',
        'contact_number',
        'email',
        'qr_code_data',
        'is_winner',
        'scanned_at',
        'prize_name',     // ✅ ADD
        'won_at',         // ✅ ADD
    ];

    protected $casts = [
        'is_winner' => 'boolean',
        'scanned_at' => 'datetime',
        'won_at' => 'datetime',
    ];

    public function raffle()
    {
        return $this->belongsTo(Raffle::class);
    }

    public function winner()
    {
        return $this->hasOne(RaffleWinner::class, 'winner_id');
    }
}