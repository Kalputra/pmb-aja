<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('exam_questions', function (Blueprint $table) {
            $table->id();
            $table->text('question');
            $table->string('option_a');
            $table->string('option_b');
            $table->string('option_c');
            $table->string('option_d');
            $table->string('option_e');
            $table->enum('correct_answer', ['A', 'B', 'C', 'D', 'E']);
            $table->enum('category', ['Matematika', 'Bahasa Indonesia', 'Bahasa Inggris', 'IPA', 'IPS'])->default('Matematika');
            $table->integer('point')->default(1);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('exam_questions');
    }
};