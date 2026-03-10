<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use App\Models\User;
use App\Models\StudyProgram;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_users' => User::where('role', 'user')->count(),
            'total_registrations' => Registration::count(),
            'pending_verifications' => Registration::where('status', 'draft')->count(),
            'verified' => Registration::where('status', 'verified')->count(),
            'pending_payments' => Registration::where('status', 'verified')
                ->whereHas('payment', function($q) {
                    $q->where('status', 'pending');
                })->count(),
            'paid' => Registration::where('status', 'paid')->count(),
            'accepted' => Registration::where('status', 'accepted')->count(),
            'rejected' => Registration::where('status', 'rejected')->count(),
        ];

        $recentRegistrations = Registration::with(['user', 'studyProgram'])
            ->latest()
            ->take(10)
            ->get();

        $programStats = Registration::selectRaw('study_program_id, count(*) as total')
            ->with('studyProgram')
            ->groupBy('study_program_id')
            ->orderByDesc('total')
            ->take(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentRegistrations' => $recentRegistrations,
            'programStats' => $programStats,
        ]);
    }

    public function statistics()
    {
        // Detailed statistics
        $monthlyRegistrations = Registration::selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->whereYear('created_at', date('Y'))
            ->groupBy('month')
            ->get();

        return Inertia::render('Admin/Statistics', [
            'monthlyRegistrations' => $monthlyRegistrations,
        ]);
    }
}