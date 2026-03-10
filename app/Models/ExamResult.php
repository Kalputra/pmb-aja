<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration_id',
        'score',
        'rank',
        'status',
        'announced_at',
        'remarks',
    ];

    protected function casts(): array
    {
        return [
            'score' => 'decimal:2',
            'announced_at' => 'datetime',
        ];
    }

    public function registration()
    {
        return $this->belongsTo(Registration::class);
    }
}