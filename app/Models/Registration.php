<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'registration_number',
        'study_program_id',
        'second_choice_id',
        'status',
        'verified_at',
        'paid_at',
        'exam_date',
        'registered_at',
        'registration_status',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'verified_at' => 'datetime',
            'paid_at' => 'datetime',
            'exam_date' => 'datetime',
            'registered_at' => 'datetime',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function studyProgram()
    {
        return $this->belongsTo(StudyProgram::class);
    }

    public function secondChoice()
    {
        return $this->belongsTo(StudyProgram::class, 'second_choice_id');
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    public function examCard()
    {
        return $this->hasOne(ExamCard::class);
    }

    public function examResult()
    {
        return $this->hasOne(ExamResult::class);
    }

    public function examAnswers()
    {
        return $this->hasMany(ExamAnswer::class);
    }
}
