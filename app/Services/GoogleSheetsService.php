<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class GoogleSheetsService
{
    protected $scriptUrl;

    public function __construct()
    {
        
        $this->scriptUrl = env('GOOGLE_SHEETS_SCRIPT_URL');
    }

    public function sendRegistrationData($data)
    {
        try {
            $response = Http::timeout(30)->post($this->scriptUrl, [
                'username' => $data['username'],
                'email' => $data['email'],
                'nama_identitas' => $data['nama_identitas'],
                'nama_ijazah' => $data['nama_ijazah'],
                'jenis_kelamin' => $data['jenis_kelamin'],
                'tanggal_lahir' => $data['tanggal_lahir'],
                'no_hp' => $data['no_hp'],
            ]);

            return $response->json();
        } catch (\Exception $e) {
            \Log::error('Google Sheets Error: ' . $e->getMessage());
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }
}