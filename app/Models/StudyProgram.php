<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudyProgram extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'faculty',
        'level',
        'class_type',
        'tuition_fee',
        'quota',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'tuition_fee' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }

    public function secondChoiceRegistrations()
    {
        return $this->hasMany(Registration::class, 'second_choice_id');
    }

    /**
     * Check if this study program requires document upload
     * Required for: S2, S3, Profesi, Spesialis, S1 Ekstensi, S1 International
     */
    public function requiresDocumentUpload(): bool
    {
        // S2, S3, Profesi, Spesialis
        if (in_array($this->level, ['S2', 'S3', 'Profesi', 'Spesialis'])) {
            return true;
        }

        // S1 International
        if ($this->level === 'S1' && $this->class_type === 'International') {
            return true;
        }

        // S1 Ekstensi
        if ($this->level === 'S1' && $this->class_type === 'Ekstensi') {
            return true;
        }

        return false;
    }
}
