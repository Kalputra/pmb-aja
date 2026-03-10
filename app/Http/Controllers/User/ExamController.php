<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use App\Models\ExamQuestion;
use App\Models\ExamAnswer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExamController extends Controller
{
    public function start(Registration $registration)
    {
        // Check ownership
        if ($registration->user_id !== auth()->id()) {
            abort(403);
        }

        // Check if exam card exists
        if (!$registration->examCard) {
            return redirect()->route('registration.show', $registration)
                ->with('error', 'Kartu ujian belum tersedia!');
        }

        // Check if already completed
        if ($registration->status === 'exam_completed') {
            return redirect()->route('registration.show', $registration)
                ->with('error', 'Anda sudah menyelesaikan ujian!');
        }

        // Get random questions
        $questions = ExamQuestion::where('is_active', true)
            ->inRandomOrder()
            ->take(20) // 20 soal
            ->get();

        return Inertia::render('User/Exam/Start', [
            'registration' => $registration->load(['studyProgram', 'examCard']),
            'questions' => $questions,
            'duration' => 60, // 60 menit
        ]);
    }

    public function submit(Request $request, Registration $registration)
    {
        // Check ownership
        if ($registration->user_id !== auth()->id()) {
            abort(403);
        }

        $request->validate([
            'answers' => 'required|array',
        ]);

        $totalScore = 0;
        $correctAnswers = 0;

        // Save answers and calculate score
        foreach ($request->answers as $questionId => $answer) {
            $question = ExamQuestion::find($questionId);
            
            if (!$question) continue;

            $isCorrect = $question->correct_answer === $answer;
            
            ExamAnswer::create([
                'registration_id' => $registration->id,
                'exam_question_id' => $questionId,
                'answer' => $answer,
                'is_correct' => $isCorrect,
            ]);

            if ($isCorrect) {
                $totalScore += $question->point;
                $correctAnswers++;
            }
        }

        // Calculate final score (0-100)
        $maxScore = ExamQuestion::whereIn('id', array_keys($request->answers))->sum('point');
        $finalScore = ($totalScore / $maxScore) * 100;

        // Update registration status
        $registration->update([
            'status' => 'exam_completed',
        ]);

        // Create exam result (admin will review and finalize)
        $registration->examResult()->create([
            'score' => round($finalScore, 2),
            'status' => 'pending',
            'remarks' => "Jawaban benar: {$correctAnswers} dari " . count($request->answers),
        ]);

        return redirect()->route('registration.show', $registration)
            ->with('success', 'Ujian berhasil diselesaikan! Menunggu review dari admin.');
    }
}