<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamCard extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration_id',
        'card_number',
        'exam_location',
        'exam_room',
        'seat_number',
        'exam_date',
        'exam_time',
        'qr_code',
    ];

    protected function casts(): array
    {
        return [
            'exam_date' => 'datetime',
        ];
    }

    public function registration()
    {
        return $this->belongsTo(Registration::class);
    }
}