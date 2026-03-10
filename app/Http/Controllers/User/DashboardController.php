<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        
        // Get user's registrations
        $registrations = $user->registrations()
            ->with(['studyProgram', 'secondChoice', 'payment', 'examCard', 'examResult'])
            ->latest()
            ->get();
        
        return Inertia::render('User/Dashboard', [
            'auth' => [
                'user' => $user,
            ],
            'user' => $user,
            'registrations' => $registrations,
            'hasPhoto' => !empty($user->photo),
        ]);
    }

    public function uploadPhoto(Request $request)
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpeg,jpg,png|max:2048',
        ], [
            'photo.required' => 'Foto harus diunggah',
            'photo.image' => 'File harus berupa gambar',
            'photo.mimes' => 'Format foto harus jpeg, jpg, atau png',
            'photo.max' => 'Ukuran foto maksimal 2MB',
        ]);

        $user = auth()->user();
        
        // Create uploads directory if not exists
        if (!file_exists(public_path('uploads/photos'))) {
            mkdir(public_path('uploads/photos'), 0777, true);
        }
        
        // Delete old photo if exists
        if ($user->photo && file_exists(public_path($user->photo))) {
            unlink(public_path($user->photo));
        }

        // Upload new photo
        $photo = $request->file('photo');
        $filename = 'photo_' . $user->id . '_' . time() . '.' . $photo->getClientOriginalExtension();
        $photo->move(public_path('uploads/photos'), $filename);

        $user->update([
            'photo' => 'uploads/photos/' . $filename,
        ]);

        return redirect()->back()->with('success', 'Foto berhasil diunggah!');
    }
}