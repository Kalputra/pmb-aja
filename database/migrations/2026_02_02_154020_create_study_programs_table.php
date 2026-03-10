<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('study_programs', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('name');
            $table->string('faculty');
            $table->enum('level', ['S1', 'S2', 'S3', 'Profesi', 'Spesialis']);
            $table->enum('class_type', ['Regular', 'International', 'Extension']);
            $table->decimal('tuition_fee', 15, 2);
            $table->integer('quota');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('study_programs');
    }
};