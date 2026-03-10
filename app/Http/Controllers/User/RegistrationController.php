<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use App\Models\StudyProgram;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class RegistrationController extends Controller
{
    public function index()
    {
        $registrations = auth()->user()->registrations()
            ->with(['studyProgram', 'secondChoice', 'payment', 'examCard', 'examResult'])
            ->latest()
            ->get();

        return Inertia::render('User/Registration/Index', [
            'registrations' => $registrations,
        ]);
    }

    public function create()
    {
        // Check if user has uploaded photo
        if (!auth()->user()->photo) {
            return redirect()->route('dashboard')
                ->with('error', 'Anda harus mengunggah foto terlebih dahulu!');
        }

        $hasAcceptedRegistration = auth()->user()->registrations()
            ->where('status', 'accepted')
            ->exists();

        if ($hasAcceptedRegistration) {
            return redirect()->route('dashboard')
                ->with('error', 'Anda sudah diterima! Silakan lakukan daftar ulang.');
        }

        $studyPrograms = StudyProgram::where('is_active', true)
            ->orderBy('faculty')
            ->orderBy('name')
            ->get()
            ->groupBy('faculty');

        return Inertia::render('User/Registration/Create', [
            'studyPrograms' => $studyPrograms,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'study_program_id' => 'required|exists:study_programs,id',
            'second_choice_id' => 'nullable|exists:study_programs,id|different:study_program_id',
        ]);

        // Generate unique registration number
        $registrationNumber = 'REG-' . date('Y') . '-' . strtoupper(Str::random(8));

        $registration = Registration::create([
            'user_id' => auth()->id(),
            'registration_number' => $registrationNumber,
            'study_program_id' => $request->study_program_id,
            'second_choice_id' => $request->second_choice_id,
            'status' => 'draft',
        ]);

        return redirect()->route('registration.show', $registration)
            ->with('success', 'Pendaftaran berhasil dibuat!');
    }

    public function show(Registration $registration)
    {
        // Check ownership
        if ($registration->user_id !== auth()->id()) {
            abort(403);
        }

        $registration->load([
            'studyProgram', 
            'secondChoice', 
            'payment', 
            'examCard', 
            'examResult',
            'documents'
        ]);

        return Inertia::render('User/Registration/Show', [
            'registration' => $registration,
        ]);
    }

    public function edit(Registration $registration)
    {
        // Check ownership
        if ($registration->user_id !== auth()->id()) {
            abort(403);
        }

        // Can only edit if status is draft
        if ($registration->status !== 'draft') {
            return redirect()->route('registration.show', $registration)
                ->with('error', 'Pendaftaran tidak dapat diubah setelah diverifikasi!');
        }

        $studyPrograms = StudyProgram::where('is_active', true)
            ->orderBy('faculty')
            ->orderBy('name')
            ->get()
            ->groupBy('faculty');

        return Inertia::render('User/Registration/Edit', [
            'registration' => $registration,
            'studyPrograms' => $studyPrograms,
        ]);
    }

    public function update(Request $request, Registration $registration)
    {
        // Check ownership
        if ($registration->user_id !== auth()->id()) {
            abort(403);
        }

        // Can only update if status is draft
        if ($registration->status !== 'draft') {
            return redirect()->route('registration.show', $registration)
                ->with('error', 'Pendaftaran tidak dapat diubah setelah diverifikasi!');
        }

        $request->validate([
            'study_program_id' => 'required|exists:study_programs,id',
            'second_choice_id' => 'nullable|exists:study_programs,id|different:study_program_id',
        ]);

        $registration->update([
            'study_program_id' => $request->study_program_id,
            'second_choice_id' => $request->second_choice_id,
        ]);

        return redirect()->route('registration.show', $registration)
            ->with('success', 'Pendaftaran berhasil diperbarui!');
    }

    public function verify(Registration $registration)
    {
        // Check ownership
        if ($registration->user_id !== auth()->id()) {
            abort(403);
        }

        // Can only verify if status is draft
        if ($registration->status !== 'draft') {
            return redirect()->route('registration.show', $registration)
                ->with('error', 'Pendaftaran sudah diverifikasi!');
        }

        // Check if study program requires document upload
        $studyProgram = $registration->studyProgram;
        $requiresDocumentUpload = false;

        if ($studyProgram) {
            // S2, S3, Profesi, Spesialis require document upload
            if (in_array($studyProgram->level, ['S2', 'S3', 'Profesi', 'Spesialis'])) {
                $requiresDocumentUpload = true;
            }
            // S1 International requires document upload
            if ($studyProgram->level === 'S1' && $studyProgram->class_type === 'International') {
                $requiresDocumentUpload = true;
            }
            // S1 Ekstensi requires document upload
            if ($studyProgram->level === 'S1' && $studyProgram->class_type === 'Ekstensi') {
                $requiresDocumentUpload = true;
            }
        }

        // If document upload is required, set status to 'verified', otherwise go directly to 'documents_uploaded'
        $newStatus = $requiresDocumentUpload ? 'verified' : 'documents_uploaded';

        $registration->update([
            'status' => $newStatus,
            'verified_at' => now(),
        ]);

        if ($requiresDocumentUpload) {
            return redirect()->route('registration.show', $registration)
                ->with('success', 'Pendaftaran berhasil diverifikasi! Silakan upload dokumen persyaratan.');
        } else {
            return redirect()->route('registration.show', $registration)
                ->with('success', 'Pendaftaran berhasil diverifikasi! Silakan lakukan pembayaran.');
        }
    }

    public function uploadDocuments(Request $request, Registration $registration)
    {
        // Check ownership
        if ($registration->user_id !== auth()->id()) {
            abort(403);
        }

        $request->validate([
            'documents' => 'required|array',
            'documents.*' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120', // 5MB max
        ]);

        foreach ($request->file('documents') as $key => $file) {
            $filename = 'doc_' . $registration->id . '_' . $key . '_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/documents'), $filename);

            $registration->documents()->create([
                'document_type' => $key,
                'file_name' => $file->getClientOriginalName(),
                'file_path' => 'uploads/documents/' . $filename,
                'file_size' => $file->getSize(),
                'status' => 'pending',
            ]);
        }

        $registration->update([
            'status' => 'documents_uploaded',
        ]);

        return redirect()->route('registration.show', $registration)
            ->with('success', 'Dokumen berhasil diunggah!');
    }

    public function examCard(Registration $registration)
    {
        // Check ownership
        if ($registration->user_id !== auth()->id()) {
            abort(403);
        }

        if (!$registration->examCard) {
            return redirect()->route('registration.show', $registration)
                ->with('error', 'Kartu ujian belum tersedia!');
        }

        $registration->load(['studyProgram', 'examCard', 'user']);

        return Inertia::render('User/Registration/ExamCard', [
            'registration' => $registration,
        ]);
    }

    public function result(Registration $registration)
    {
        // Check ownership
        if ($registration->user_id !== auth()->id()) {
            abort(403);
        }

        if (!$registration->examResult) {
            return redirect()->route('registration.show', $registration)
                ->with('error', 'Hasil ujian belum diumumkan!');
        }

        return Inertia::render('User/Registration/Result', [
            'registration' => $registration->load(['studyProgram', 'examResult', 'user']),
        ]);
    }

    public function payment(Registration $registration)
    {
        // Check ownership
        if ($registration->user_id !== auth()->id()) {
            abort(403);
        }

        // Can only pay if verified
        if (!in_array($registration->status, ['verified', 'documents_uploaded'])) {
            return redirect()->route('registration.show', $registration)
                ->with('error', 'Pendaftaran harus diverifikasi terlebih dahulu!');
        }

        $payment = $registration->payment;

        return Inertia::render('User/Registration/Payment', [
            'registration' => $registration->load(['studyProgram']),
            'payment' => $payment,
        ]);
    }

    public function createPayment(Request $request, Registration $registration)
    {
        // Check ownership
        if ($registration->user_id !== auth()->id()) {
            abort(403);
        }

        // Check if payment already exists
        if ($registration->payment) {
            return redirect()->route('registration.payment', $registration)
                ->with('error', 'Pembayaran sudah dibuat!');
        }

        $request->validate([
            'payment_method' => 'required|in:bank_transfer,virtual_account,credit_card',
        ]);

        // Generate payment code
        $paymentCode = 'PAY-' . strtoupper(Str::random(10));
        
        // Virtual account number format
        if ($request->payment_method === 'virtual_account') {
            $paymentCode = '8808' . str_pad($registration->id, 10, '0', STR_PAD_LEFT);
        }

        // Create payment
        $payment = Payment::create([
            'registration_id' => $registration->id,
            'payment_code' => $paymentCode,
            'amount' => 300000,
            'registration_fee' => 300000,
            'payment_method' => $request->payment_method,
            'status' => 'pending',
            'expires_at' => now()->addDays(2),
        ]);

        return redirect()->route('registration.payment', $registration)
            ->with('success', 'Silakan selesaikan pembayaran!');
    }

    public function uploadPaymentProof(Request $request, Registration $registration)
    {
        // Check ownership
        if ($registration->user_id !== auth()->id()) {
            abort(403);
        }

        $request->validate([
            'payment_proof' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        $payment = $registration->payment;
        
        if (!$payment) {
            return redirect()->back()->with('error', 'Pembayaran tidak ditemukan!');
        }

        // Create uploads directory if not exists
        if (!file_exists(public_path('uploads/payments'))) {
            mkdir(public_path('uploads/payments'), 0777, true);
        }

        // Delete old proof if exists
        if ($payment->payment_proof && file_exists(public_path($payment->payment_proof))) {
            unlink(public_path($payment->payment_proof));
        }

        // Upload new proof
        $file = $request->file('payment_proof');
        $filename = 'payment_' . $registration->id . '_' . time() . '.' . $file->getClientOriginalExtension();
        $file->move(public_path('uploads/payments'), $filename);

        $payment->update([
            'payment_proof' => 'uploads/payments/' . $filename,
        ]);

        return redirect()->back()->with('success', 'Bukti pembayaran berhasil diupload! Menunggu verifikasi admin.');
    }

    // Daftar Ulang - for accepted students to upload final documents
    public function daftarUlang(Registration $registration)
    {
        // Check ownership
        if ($registration->user_id !== auth()->id()) {
            abort(403);
        }

        // Can only do daftar ulang if accepted
        if ($registration->status !== 'accepted') {
            return redirect()->route('registration.show', $registration)
                ->with('error', 'Daftar ulang hanya untuk mahasiswa yang diterima!');
        }

        // Load documents
        $registration->load(['documents', 'studyProgram', 'user']);

        return Inertia::render('User/Registration/DaftarUlang', [
            'registration' => $registration,
        ]);
    }

    public function submitDaftarUlang(Request $request, Registration $registration)
    {
        // Check ownership
        if ($registration->user_id !== auth()->id()) {
            abort(403);
        }

        // Can only submit if accepted
        if ($registration->status !== 'accepted') {
            return redirect()->route('registration.show', $registration)
                ->with('error', 'Daftar ulang hanya untuk mahasiswa yang diterima!');
        }

        // Validate required documents for daftar ulang
        $request->validate([
            'ijazah' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'akta_kelahiran' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'kartu_keluarga' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'ktp' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'pas_photo' => 'required|file|mimes:jpg,jpeg,png|max:2048',
        ]);

        $documentsPath = public_path('uploads/daftar-ulang/' . $registration->id);
        if (!file_exists($documentsPath)) {
            mkdir($documentsPath, 0777, true);
        }

        // Upload each document
        $documentTypes = ['ijazah', 'akta_kelahiran', 'kartu_keluarga', 'ktp', 'pas_photo'];
        
        foreach ($documentTypes as $type) {
            if ($request->hasFile($type)) {
                $file = $request->file($type);
                $filename = $type . '_' . time() . '.' . $file->getClientOriginalExtension();
                $file->move($documentsPath, $filename);

                // Create or update document record
                $registration->documents()->updateOrCreate(
                    ['document_type' => 'daftar_ulang_' . $type],
                    [
                        'file_name' => $file->getClientOriginalName(),
                        'file_path' => 'uploads/daftar-ulang/' . $registration->id . '/' . $filename,
                        'file_size' => $file->getSize(),
                        'status' => 'pending',
                    ]
                );
            }
        }

        // Update registration status
        $registration->update([
            'registration_status' => 'documents_submitted',
            'registered_at' => now(),
        ]);

        return redirect()->route('registration.show', $registration)
            ->with('success', 'Dokumen daftar ulang berhasil diupload! Menunggu verifikasi admin.');
    }
}
