<?php

namespace Database\Seeders;

use App\Models\ExamQuestion;
use Illuminate\Database\Seeder;

class ExamQuestionSeeder extends Seeder
{
    public function run(): void
    {
        $questions = [
            // Matematika
            [
                'question' => 'Berapakah hasil dari 15 + 25 × 2?',
                'option_a' => '80',
                'option_b' => '65',
                'option_c' => '55',
                'option_d' => '50',
                'option_e' => '40',
                'correct_answer' => 'B',
                'category' => 'Matematika',
                'point' => 2,
            ],
            [
                'question' => 'Jika x + 5 = 12, maka nilai x adalah?',
                'option_a' => '5',
                'option_b' => '6',
                'option_c' => '7',
                'option_d' => '8',
                'option_e' => '9',
                'correct_answer' => 'C',
                'category' => 'Matematika',
                'point' => 2,
            ],
            [
                'question' => 'Luas persegi dengan sisi 8 cm adalah?',
                'option_a' => '16 cm²',
                'option_b' => '32 cm²',
                'option_c' => '48 cm²',
                'option_d' => '64 cm²',
                'option_e' => '80 cm²',
                'correct_answer' => 'D',
                'category' => 'Matematika',
                'point' => 2,
            ],
            
            // Bahasa Indonesia
            [
                'question' => 'Kata yang memiliki makna berlawanan dengan "gelap" adalah?',
                'option_a' => 'Redup',
                'option_b' => 'Terang',
                'option_c' => 'Suram',
                'option_d' => 'Remang',
                'option_e' => 'Kelam',
                'correct_answer' => 'B',
                'category' => 'Bahasa Indonesia',
                'point' => 1,
            ],
            [
                'question' => 'Imbuhan yang tepat untuk kata "ajar" menjadi kata benda adalah?',
                'option_a' => 'ber-',
                'option_b' => 'me-',
                'option_c' => 'pe-an',
                'option_d' => 'ter-',
                'option_e' => 'ke-an',
                'correct_answer' => 'C',
                'category' => 'Bahasa Indonesia',
                'point' => 1,
            ],
            
            // Bahasa Inggris
            [
                'question' => 'What is the synonym of "beautiful"?',
                'option_a' => 'Ugly',
                'option_b' => 'Pretty',
                'option_c' => 'Bad',
                'option_d' => 'Terrible',
                'option_e' => 'Awful',
                'correct_answer' => 'B',
                'category' => 'Bahasa Inggris',
                'point' => 1,
            ],
            [
                'question' => 'She ... to school every day.',
                'option_a' => 'go',
                'option_b' => 'goes',
                'option_c' => 'going',
                'option_d' => 'gone',
                'option_e' => 'went',
                'correct_answer' => 'B',
                'category' => 'Bahasa Inggris',
                'point' => 1,
            ],
            
            // IPA
            [
                'question' => 'Proses perubahan air menjadi uap disebut?',
                'option_a' => 'Kondensasi',
                'option_b' => 'Sublimasi',
                'option_c' => 'Evaporasi',
                'option_d' => 'Kristalisasi',
                'option_e' => 'Deposisi',
                'correct_answer' => 'C',
                'category' => 'IPA',
                'point' => 2,
            ],
            [
                'question' => 'Planet terdekat dengan matahari adalah?',
                'option_a' => 'Venus',
                'option_b' => 'Bumi',
                'option_c' => 'Mars',
                'option_d' => 'Merkurius',
                'option_e' => 'Jupiter',
                'correct_answer' => 'D',
                'category' => 'IPA',
                'point' => 1,
            ],
            
            // IPS
            [
                'question' => 'Ibukota negara Indonesia adalah?',
                'option_a' => 'Bandung',
                'option_b' => 'Surabaya',
                'option_c' => 'Jakarta',
                'option_d' => 'Medan',
                'option_e' => 'Semarang',
                'correct_answer' => 'C',
                'category' => 'IPS',
                'point' => 1,
            ],
            [
                'question' => 'Proklamasi kemerdekaan Indonesia terjadi pada tanggal?',
                'option_a' => '17 Agustus 1945',
                'option_b' => '17 Agustus 1944',
                'option_c' => '17 Agustus 1946',
                'option_d' => '1 Juni 1945',
                'option_e' => '20 Mei 1945',
                'correct_answer' => 'A',
                'category' => 'IPS',
                'point' => 1,
            ],
        ];

        foreach ($questions as $question) {
            ExamQuestion::create($question);
        }
    }
}