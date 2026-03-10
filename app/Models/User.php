<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'username',
        'name',
        'email',
        'password',
        'role',
        'photo',
        'nama_identitas',
        'nama_ijazah',
        'jenis_identitas',
        'nomor_identitas',
        'kewarganegaraan',
        'jenis_kelamin',
        'tanggal_lahir',
        'alamat_tetap',
        'negara',
        'provinsi',
        'kabupaten',
        'alamat_saat_ini',
        'no_telepon',
        'no_hp',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'tanggal_lahir' => 'date',
        ];
    }

    protected $appends = ['is_admin'];
    
    // Relationships
    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }

    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    public function getIsAdminAttribute()
    {
        return $this->isAdmin();
    }
}