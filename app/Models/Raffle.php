<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Raffle extends Model
{
    use HasFactory;

    protected $fillable = [
        'raffle_name',
        'description',
        'status',
        'start_date',
        'end_date'
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    public function participants()
    {
        return $this->hasMany(RaffleParticipant::class);
    }

    public function winners()
    {
        return $this->hasMany(RaffleWinner::class);
    }
}