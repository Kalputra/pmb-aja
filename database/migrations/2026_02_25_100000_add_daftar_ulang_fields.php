<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('registrations', function (Blueprint $table) {
            // Add registered_at timestamp for daftar ulang completion
            $table->timestamp('registered_at')->nullable()->after('exam_date');
            
            // Add registered documents status
            $table->enum('registration_status', [
                'pending',
                'documents_submitted',
                'verified',
                'completed'
            ])->default('pending')->after('registered_at');
        });
    }

    public function down(): void
    {
        Schema::table('registrations', function (Blueprint $table) {
            $table->dropColumn(['registered_at', 'registration_status']);
        });
    }
};
