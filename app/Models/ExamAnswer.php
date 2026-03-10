<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamAnswer extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration_id',
        'exam_question_id',
        'answer',
        'is_correct',
    ];

    protected function casts(): array
    {
        return [
            'is_correct' => 'boolean',
        ];
    }


    public function registration()
    {
        return $this->belongsTo(Registration::class);
    }

    public function question()
    {
        return $this->belongsTo(ExamQuestion::class, 'exam_question_id');
    }
}