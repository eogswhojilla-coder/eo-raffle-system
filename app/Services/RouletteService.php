<?php

namespace App\Services;

use App\Models\Participant;
use Illuminate\Support\Collection;

class RouletteService
{
    protected $participants;

    public function __construct()
    {
        $this->participants = collect();
    }

    public function addParticipant(Participant $participant)
    {
        $this->participants->push($participant);
    }

    public function spinRoulette(): ?Participant
    {
        if ($this->participants->isEmpty()) {
            return null;
        }

        $winnerIndex = random_int(0, $this->participants->count() - 1);
        return $this->participants->get($winnerIndex);
    }

    public function getParticipants(): Collection
    {
        return $this->participants;
    }
}