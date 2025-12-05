
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('raffle_participants', function (Blueprint $table) {
            if (!Schema::hasColumn('raffle_participants', 'prize_name')) {
                $table->string('prize_name')->nullable()->after('is_winner');
            }
            if (!Schema::hasColumn('raffle_participants', 'won_at')) {
                $table->timestamp('won_at')->nullable()->after('prize_name');
            }
        });
    }

    public function down(): void
    {
        Schema::table('raffle_participants', function (Blueprint $table) {
            $table->dropColumn(['prize_name', 'won_at']);
        });
    }
};