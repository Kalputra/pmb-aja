<?php

namespace Database\Seeders;

use App\Models\StudyProgram;
use Illuminate\Database\Seeder;

class StudyProgramSeeder extends Seeder
{
    public function run(): void
    {
        $programs = [
            // S1 Regular
            [
                'code' => 'S1-TI-REG',
                'name' => 'Teknik Informatika',
                'faculty' => 'Fakultas Ilmu Komputer',
                'level' => 'S1',
                'class_type' => 'Regular',
                'tuition_fee' => 10000000,
                'quota' => 100,
                'is_active' => true,
            ],
            [
                'code' => 'S1-SI-REG',
                'name' => 'Sistem Informasi',
                'faculty' => 'Fakultas Ilmu Komputer',
                'level' => 'S1',
                'class_type' => 'Regular',
                'tuition_fee' => 10000000,
                'quota' => 80,
                'is_active' => true,
            ],
            [
                'code' => 'S1-ARS-REG',
                'name' => 'Arsitektur',
                'faculty' => 'Fakultas Teknik',
                'level' => 'S1',
                'class_type' => 'Regular',
                'tuition_fee' => 12000000,
                'quota' => 60,
                'is_active' => true,
            ],
            [
                'code' => 'S1-HUK-REG',
                'name' => 'Ilmu Hukum',
                'faculty' => 'Fakultas Hukum',
                'level' => 'S1',
                'class_type' => 'Regular',
                'tuition_fee' => 9000000,
                'quota' => 120,
                'is_active' => true,
            ],
            [
                'code' => 'S1-KED-REG',
                'name' => 'Kedokteran',
                'faculty' => 'Fakultas Kedokteran',
                'level' => 'S1',
                'class_type' => 'Regular',
                'tuition_fee' => 25000000,
                'quota' => 50,
                'is_active' => true,
            ],
            
            // S1 International
            [
                'code' => 'S1-TI-INT',
                'name' => 'Teknik Informatika (International)',
                'faculty' => 'Fakultas Ilmu Komputer',
                'level' => 'S1',
                'class_type' => 'International',
                'tuition_fee' => 25000000,
                'quota' => 40,
                'is_active' => true,
            ],
            [
                'code' => 'S1-MAN-INT',
                'name' => 'Manajemen (International)',
                'faculty' => 'Fakultas Ekonomi dan Bisnis',
                'level' => 'S1',
                'class_type' => 'International',
                'tuition_fee' => 20000000,
                'quota' => 50,
                'is_active' => true,
            ],
            
            // S2
            [
                'code' => 'S2-TI',
                'name' => 'Magister Teknik Informatika',
                'faculty' => 'Fakultas Ilmu Komputer',
                'level' => 'S2',
                'class_type' => 'Regular',
                'tuition_fee' => 15000000,
                'quota' => 30,
                'is_active' => true,
            ],
            [
                'code' => 'S2-HUK',
                'name' => 'Magister Ilmu Hukum',
                'faculty' => 'Fakultas Hukum',
                'level' => 'S2',
                'class_type' => 'Regular',
                'tuition_fee' => 13000000,
                'quota' => 40,
                'is_active' => true,
            ],
            
            // S3
            [
                'code' => 'S3-TI',
                'name' => 'Doktor Teknik Informatika',
                'faculty' => 'Fakultas Ilmu Komputer',
                'level' => 'S3',
                'class_type' => 'Regular',
                'tuition_fee' => 20000000,
                'quota' => 15,
                'is_active' => true,
            ],
        ];

        foreach ($programs as $program) {
            StudyProgram::create($program);
        }
    }
}