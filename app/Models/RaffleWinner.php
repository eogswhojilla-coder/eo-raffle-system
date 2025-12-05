<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RaffleWinner extends Model
{
    use HasFactory;

    protected $fillable = [
        'raffle_id',
        'winner_id',
        'prize_name',
        'drawn_at'
    ];

    protected $casts = [
        'drawn_at' => 'datetime',
    ];

    public function raffle()
    {
        return $this->belongsTo(Raffle::class);
    }

    public function participant()
    {
        return $this->belongsTo(RaffleParticipant::class, 'winner_id');
    }
}