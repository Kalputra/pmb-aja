<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ExamCard;
use SimpleSoftwareIO\QrCode\Generator;
use Illuminate\Support\Str;

class RegistrationManagementController extends Controller
{
    public function index()
    {
        $registrations = Registration::with(['user', 'studyProgram', 'secondChoice'])
            ->latest()
            ->paginate(20);

        return Inertia::render('Admin/Registrations/Index', [
            'registrations' => $registrations,
        ]);
    }

    public function show(Registration $registration)
    {
        $registration->load(['user', 'studyProgram', 'secondChoice', 'documents', 'payment', 'examCard', 'examResult']);

        return Inertia::render('Admin/Registrations/Show', [
            'registration' => $registration,
        ]);
    }

    public function verifyPayment(Request $request, Registration $registration)
    {
        $request->validate([
            'admin_notes' => 'nullable|string|max:500',
        ]);

        $payment = $registration->payment;

        if (!$payment) {
            return redirect()->back()->with('error', 'Pembayaran tidak ditemukan!');
        }

        if ($payment->status === 'paid') {
            return redirect()->back()->with('error', 'Pembayaran sudah diverifikasi!');
        }

        // Update payment status
        $payment->update([
            'status' => 'paid',
            'paid_at' => now(),
            'admin_notes' => $request->admin_notes,
        ]);

        // Update registration status
        $registration->update([
            'status' => 'paid',
            'paid_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Pembayaran berhasil diverifikasi!');
    }

    // Reject Payment
    public function rejectPayment(Request $request, Registration $registration)
    {
        $request->validate([
            'reason' => 'required|string|max:500',
        ]);

        $payment = $registration->payment;

        if (!$payment) {
            return redirect()->back()->with('error', 'Pembayaran tidak ditemukan!');
        }

        // Update payment
        $payment->update([
            'status' => 'cancelled',
            'notes' => $request->reason,
        ]);

        return redirect()->back()->with('success', 'Pembayaran ditolak. User harus upload ulang bukti.');
    }

    public function approve(Registration $registration)
    {
        // Logic untuk approve (terima mahasiswa) setelah ujian
        $registration->update([
            'status' => 'accepted',
        ]);

        return redirect()->back()->with('success', 'Pendaftar diterima!');
    }

    public function reject(Request $request, Registration $registration)
    {
        $request->validate([
            'reason' => 'required|string|max:500',
        ]);

        $registration->update([
            'status' => 'rejected',
            'notes' => $request->reason,
        ]);

        return redirect()->back()->with('success', 'Pendaftar ditolak!');
    }

    // Verify Daftar Ulang
    public function verifyDaftarUlang(Request $request, Registration $registration)
    {
        $request->validate([
            'admin_notes' => 'nullable|string|max:500',
        ]);

        // Check if registration is accepted
        if ($registration->status !== 'accepted') {
            return redirect()->back()->with('error', 'Pendaftaran harus berstatus DITERIMA!');
        }

        // Check if documents have been submitted
        if (!in_array($registration->registration_status, ['documents_submitted', 'verified'])) {
            return redirect()->back()->with('error', 'Dokumen daftar ulang belum diupload!');
        }

        // Update registration status
        $registration->update([
            'registration_status' => 'verified',
        ]);

        return redirect()->back()->with('success', 'Dokumen daftar ulang berhasil diverifikasi!');
    }

    // Reject Daftar Ulang
    public function rejectDaftarUlang(Request $request, Registration $registration)
    {
        $request->validate([
            'reason' => 'required|string|max:500',
        ]);

        // Check if registration is accepted
        if ($registration->status !== 'accepted') {
            return redirect()->back()->with('error', 'Pendaftaran harus berstatus DITERIMA!');
        }

        // Update registration status back to pending
        $registration->update([
            'registration_status' => 'pending',
            'notes' => 'Ditolak: ' . $request->reason,
        ]);

        return redirect()->back()->with('success', 'Dokumen daftar ulang ditolak. User harus upload ulang.');
    }

    public function generateExamCard(Registration $registration)
    {
        // Validate: harus sudah bayar
        if ($registration->status !== 'paid') {
            return redirect()->back()->with('error', 'Pendaftaran harus sudah dibayar!');
        }

        // Check if exam card already exists
        if ($registration->examCard) {
            return redirect()->back()->with('error', 'Kartu ujian sudah dibuat!');
        }

        // Generate card number
        $cardNumber = 'EC-' . date('Y') . '-' . str_pad($registration->id, 6, '0', STR_PAD_LEFT);

        // Exam locations
        $locations = [
            'Gedung A - Kampus UI Depok',
            'Gedung B - Kampus UI Depok',
            'Gedung C - Kampus UI Depok',
            'Gedung D - Kampus UI Salemba',
        ];

        $rooms = ['R101', 'R102', 'R103', 'R201', 'R202', 'R203', 'R301', 'R302'];

        // Random exam details
        $examLocation = $locations[array_rand($locations)];
        $examRoom = $rooms[array_rand($rooms)];
        $seatNumber = rand(1, 50);

        // Set exam date (contoh: 2 minggu dari sekarang)
        $examDate = now()->addWeeks(2)->setTime(8, 0);

        // Create QR code with comprehensive data
        $qrData = json_encode([
            'card_number' => $cardNumber,
            'registration_id' => $registration->id,
            'user_id' => $registration->user_id,
            'name' => $registration->user->nama_identitas,
            'email' => $registration->user->email,
            'program' => $registration->studyProgram->name,
            'exam_date' => $examDate->format('Y-m-d'),
            'exam_time' => $examDate->format('H:i'),
            'exam_location' => $examLocation,
            'exam_room' => $examRoom,
            'seat_number' => $seatNumber,
            'generated_at' => now()->toISOString(),
            'verification_url' => route('admin.registrations.show', $registration->id),
        ]);

        // Generate QR Code image using SimpleSoftwareIO\QrCode
        $qrPath = 'uploads/qrcodes/';
        if (!file_exists(public_path($qrPath))) {
            mkdir(public_path($qrPath), 0777, true);
        }

        $qrFilename = 'qr_' . $cardNumber . '.svg';
        $generator = new Generator();
        $qrImage = $generator->format('svg')
            ->size(400)
            ->margin(4)
            ->errorCorrection('H')
            ->generate($qrData);
        file_put_contents(public_path($qrPath . $qrFilename), $qrImage);

        // Create exam card
        $examCard = ExamCard::create([
            'registration_id' => $registration->id,
            'card_number' => $cardNumber,
            'exam_location' => $examLocation,
            'exam_room' => $examRoom,
            'seat_number' => $seatNumber,
            'exam_date' => $examDate,
            'exam_time' => '08:00',
            'qr_code' => $qrPath . $qrFilename,
        ]);

        // Update registration status
        $registration->update([
            'status' => 'exam_card_generated',
            'exam_date' => $examDate,
        ]);

        return redirect()->back()->with('success', 'Kartu ujian berhasil dibuat!');
    }

    public function inputResult(Request $request, Registration $registration)
    {
        $request->validate([
            'score' => 'required|numeric|min:0|max:100',
            'rank' => 'nullable|integer|min:1',
            'status' => 'required|in:passed,failed',
            'remarks' => 'nullable|string|max:500',
        ]);

        // Check if exam card exists
        if (!$registration->examCard) {
            return redirect()->back()->with('error', 'Kartu ujian belum dibuat!');
        }

        // Create or update exam result
        if ($registration->examResult) {
            $registration->examResult->update([
                'score' => $request->score,
                'rank' => $request->rank,
                'status' => $request->status,
                'remarks' => $request->remarks,
                'announced_at' => now(),
            ]);
        } else {
            $registration->examResult()->create([
                'score' => $request->score,
                'rank' => $request->rank,
                'status' => $request->status,
                'remarks' => $request->remarks,
                'announced_at' => now(),
            ]);
        }

        // Update registration status
        $registration->update([
            'status' => 'exam_completed',
        ]);

        return redirect()->back()->with('success', 'Hasil ujian berhasil diinput!');
    }

    // Methods lain dari resource controller
    public function create()
    {
        // Admin biasanya tidak create registration
        abort(404);
    }

    public function store(Request $request)
    {
        abort(404);
    }

    public function edit(Registration $registration)
    {
        abort(404);
    }

    public function update(Request $request, Registration $registration)
    {
        abort(404);
    }

    public function verifyQrCode(Request $request)
    {
        $request->validate([
            'qr_data' => 'required|string',
        ]);

        try {
            $qrData = json_decode($request->qr_data, true);

            if (!$qrData || !isset($qrData['card_number'])) {
                return response()->json([
                    'valid' => false,
                    'message' => 'Invalid QR code data',
                ], 400);
            }

            // Find exam card by card number
            $examCard = ExamCard::where('card_number', $qrData['card_number'])
                ->with(['registration.user', 'registration.studyProgram'])
                ->first();

            if (!$examCard) {
                return response()->json([
                    'valid' => false,
                    'message' => 'Exam card not found',
                ], 404);
            }

            // Verify all data matches
            $registration = $examCard->registration;
            $isValid = (
                $qrData['registration_id'] == $registration->id &&
                $qrData['user_id'] == $registration->user_id &&
                $qrData['name'] == $registration->user->nama_identitas &&
                $qrData['email'] == $registration->user->email &&
                $qrData['program'] == $registration->studyProgram->name &&
                $qrData['exam_date'] == $examCard->exam_date->format('Y-m-d') &&
                $qrData['exam_time'] == $examCard->exam_time &&
                $qrData['exam_location'] == $examCard->exam_location &&
                $qrData['exam_room'] == $examCard->exam_room &&
                $qrData['seat_number'] == $examCard->seat_number
            );

            if (!$isValid) {
                return response()->json([
                    'valid' => false,
                    'message' => 'QR code data does not match exam card',
                ], 400);
            }

            return response()->json([
                'valid' => true,
                'message' => 'QR code verified successfully',
                'data' => [
                    'card_number' => $examCard->card_number,
                    'name' => $registration->user->nama_identitas,
                    'program' => $registration->studyProgram->name,
                    'exam_date' => $examCard->exam_date->format('Y-m-d'),
                    'exam_time' => $examCard->exam_time,
                    'exam_location' => $examCard->exam_location,
                    'exam_room' => $examCard->exam_room,
                    'seat_number' => $examCard->seat_number,
                    'status' => $registration->status,
                ],
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'valid' => false,
                'message' => 'Error verifying QR code: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function destroy(Registration $registration)
    {
        // Optional: admin bisa delete registration
        $registration->delete();
        return redirect()->route('admin.registrations.index')
            ->with('success', 'Pendaftaran berhasil dihapus!');
    }
}
