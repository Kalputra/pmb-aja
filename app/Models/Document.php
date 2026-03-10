<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration_id',
        'document_type',
        'file_name',
        'file_path',
        'file_size',
        'status',
        'rejection_reason',
    ];

    public function registration()
    {
        return $this->belongsTo(Registration::class);
    }
}