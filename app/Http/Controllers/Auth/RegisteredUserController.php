<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\GoogleSheetsService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    protected $googleSheetsService;

    public function __construct(GoogleSheetsService $googleSheetsService)
    {
        $this->googleSheetsService = $googleSheetsService;
    }

    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            // Login
            'username' => 'required|string|max:255|unique:users|regex:/^[a-zA-Z0-9_]+$/',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            
            // Identitas
            'nama_identitas' => 'required|string|max:255',
            'nama_ijazah' => 'required|string|max:255',
            'jenis_identitas' => 'required|in:KTP,SIM,Paspor,Kartu Pelajar',
            'nomor_identitas' => 'required|string|max:255',
            'kewarganegaraan' => 'required|string|max:255',
            'jenis_kelamin' => 'required|in:Pria,Wanita',
            'tanggal_lahir' => 'required|date',
            
            // Kontak
            'alamat_tetap' => 'required|string',
            'negara' => 'required|string|max:255',
            'provinsi' => 'required|string|max:255',
            'kabupaten' => 'required|string|max:255',
            'alamat_saat_ini' => 'required|string',
            'no_telepon' => 'required|string|max:255',
            'no_hp' => 'nullable|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
        ]);

        $user = User::create([
            'username' => $request->username,
            'name' => $request->nama_identitas,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'user',
            'nama_identitas' => $request->nama_identitas,
            'nama_ijazah' => $request->nama_ijazah,
            'jenis_identitas' => $request->jenis_identitas,
            'nomor_identitas' => $request->nomor_identitas,
            'kewarganegaraan' => $request->kewarganegaraan,
            'jenis_kelamin' => $request->jenis_kelamin,
            'tanggal_lahir' => $request->tanggal_lahir,
            'alamat_tetap' => $request->alamat_tetap,
            'negara' => $request->negara,
            'provinsi' => $request->provinsi,
            'kabupaten' => $request->kabupaten,
            'alamat_saat_ini' => $request->alamat_saat_ini,
            'no_telepon' => $request->no_telepon,
            'no_hp' => $request->no_hp,
        ]);

        event(new Registered($user));

        // Send to Google Sheets
        $this->googleSheetsService->sendRegistrationData([
            'username' => $user->username,
            'email' => $user->email,
            'nama_identitas' => $user->nama_identitas,
            'nama_ijazah' => $user->nama_ijazah,
            'jenis_kelamin' => $user->jenis_kelamin,
            'tanggal_lahir' => $user->tanggal_lahir,
            'no_hp' => $user->no_hp,
        ]);

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}