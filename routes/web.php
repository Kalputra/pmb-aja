<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\DashboardController as UserDashboardController;
use App\Http\Controllers\User\RegistrationController;
use App\Http\Controllers\User\ExamController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\RegistrationManagementController;
use App\Http\Controllers\Admin\StudyProgramController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Landing Page - Show welcome page if not authenticated
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('welcome');

// Profile Routes (for both admin and user)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// User (Mahasiswa) Routes
Route::middleware(['auth', 'verified', 'user'])->prefix('dashboard')->group(function () {
    Route::get('/', [UserDashboardController::class, 'index'])->name('dashboard');
    
    // Photo Upload
    Route::post('/photo/upload', [UserDashboardController::class, 'uploadPhoto'])->name('photo.upload');
    
    // Registration Management
    Route::prefix('registration')->name('registration.')->group(function () {
        Route::get('/', [RegistrationController::class, 'index'])->name('index');
        Route::get('/create', [RegistrationController::class, 'create'])->name('create');
        Route::post('/', [RegistrationController::class, 'store'])->name('store');
        Route::get('/{registration}', [RegistrationController::class, 'show'])->name('show');
        Route::get('/{registration}/edit', [RegistrationController::class, 'edit'])->name('edit');
        Route::put('/{registration}', [RegistrationController::class, 'update'])->name('update');
        Route::post('/{registration}/verify', [RegistrationController::class, 'verify'])->name('verify');
        
        // Documents
        Route::post('/{registration}/upload-documents', [RegistrationController::class, 'uploadDocuments'])->name('upload-documents');
        
        // Payment
        Route::get('/{registration}/payment', [RegistrationController::class, 'payment'])->name('payment');
        Route::post('/{registration}/create-payment', [RegistrationController::class, 'createPayment'])->name('create-payment');
        Route::post('/{registration}/upload-payment-proof', [RegistrationController::class, 'uploadPaymentProof'])->name('upload-payment-proof');
        
        // Exam
        Route::get('/{registration}/exam/start', [ExamController::class, 'start'])->name('exam.start');
        Route::post('/{registration}/exam/submit', [ExamController::class, 'submit'])->name('exam.submit');
        
// Exam Card & Result
        Route::get('/{registration}/exam-card', [RegistrationController::class, 'examCard'])->name('exam-card');
        Route::get('/{registration}/result', [RegistrationController::class, 'result'])->name('result');
        
        // Daftar Ulang (for accepted students)
        Route::get('/{registration}/daftar-ulang', [RegistrationController::class, 'daftarUlang'])->name('daftar-ulang');
        Route::post('/{registration}/submit-daftar-ulang', [RegistrationController::class, 'submitDaftarUlang'])->name('submit-daftar-ulang');
    });
});

// Admin Routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    
    // Registration Management
    Route::resource('registrations', RegistrationManagementController::class)->only([
        'index', 'show', 'destroy'
    ]);
    
// Registration Actions
    Route::post('registrations/{registration}/verify-payment', [RegistrationManagementController::class, 'verifyPayment'])->name('registrations.verify-payment');
    Route::post('registrations/{registration}/reject-payment', [RegistrationManagementController::class, 'rejectPayment'])->name('registrations.reject-payment');
    Route::post('registrations/{registration}/generate-exam-card', [RegistrationManagementController::class, 'generateExamCard'])->name('registrations.generate-exam-card');
    Route::post('registrations/{registration}/input-result', [RegistrationManagementController::class, 'inputResult'])->name('registrations.input-result');
    Route::post('registrations/{registration}/approve', [RegistrationManagementController::class, 'approve'])->name('registrations.approve');
    Route::post('registrations/{registration}/reject', [RegistrationManagementController::class, 'reject'])->name('registrations.reject');
    
    // Daftar Ulang Verification
    Route::post('registrations/{registration}/verify-daftar-ulang', [RegistrationManagementController::class, 'verifyDaftarUlang'])->name('registrations.verify-daftar-ulang');
    Route::post('registrations/{registration}/reject-daftar-ulang', [RegistrationManagementController::class, 'rejectDaftarUlang'])->name('registrations.reject-daftar-ulang');
    
    // Study Programs
    Route::resource('study-programs', StudyProgramController::class);
    
    // Statistics
    Route::get('/statistics', [AdminDashboardController::class, 'statistics'])->name('statistics');
});

require __DIR__.'/auth.php';