<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('registration_number')->unique();
            $table->foreignId('study_program_id')->constrained()->onDelete('cascade');
            $table->foreignId('second_choice_id')->nullable()->constrained('study_programs')->onDelete('set null');
            
            // Status tracking
            $table->enum('status', [
                'draft',
                'verified',
                'documents_uploaded',
                'paid',
                'exam_card_generated',
                'exam_completed',
                'accepted',
                'rejected'
            ])->default('draft');
            
            $table->timestamp('verified_at')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('exam_date')->nullable();
            
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};