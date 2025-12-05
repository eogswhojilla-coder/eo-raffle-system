<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Services\RouletteService;

class RouletteServiceTest extends TestCase
{
    protected $rouletteService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->rouletteService = new RouletteService();
    }

    public function testSelectWinner()
    {
        $participants = ['Alice', 'Bob', 'Charlie'];
        $winner = $this->rouletteService->selectWinner($participants);
        $this->assertContains($winner, $participants);
    }

    public function testSelectWinnerFromEmptyList()
    {
        $participants = [];
        $winner = $this->rouletteService->selectWinner($participants);
        $this->assertNull($winner);
    }
}