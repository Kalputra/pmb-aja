<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user
        User::create([
            'username' => 'admin',
            'name' => 'Administrator',
            'email' => 'admin@pmb-ui.ac.id',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // Test user mahasiswa
        User::create([
            'username' => 'testuser',
            'name' => 'Test User',
            'email' => 'user@test.com',
            'password' => Hash::make('password'),
            'role' => 'user',
            'email_verified_at' => now(),
            'nama_identitas' => 'Test User',
            'nama_ijazah' => 'Test User',
            'jenis_kelamin' => 'Pria',
            'tanggal_lahir' => '2000-01-01',
            'no_hp' => '081234567890',
        ]);
    }
}