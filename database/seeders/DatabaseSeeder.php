<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    // Isi database dengan data awal aplikasi
    public function run(): void
    {
        $this->call([
            AdminUserSeeder::class,
            StudyProgramSeeder::class,
            ExamQuestionSeeder::class,
        ]);
    }
}
