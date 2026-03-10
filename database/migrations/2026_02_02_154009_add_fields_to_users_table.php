<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('username')->unique()->after('id');
            $table->enum('role', ['admin', 'user'])->default('user')->after('email');
            $table->string('photo')->nullable()->after('role');
            
            // Data Identitas
            $table->string('nama_identitas')->nullable()->after('photo');
            $table->string('nama_ijazah')->nullable();
            $table->enum('jenis_identitas', ['KTP', 'SIM', 'Paspor', 'Kartu Pelajar'])->nullable();
            $table->string('nomor_identitas')->nullable();
            $table->string('kewarganegaraan')->default('Indonesia');
            $table->enum('jenis_kelamin', ['Pria', 'Wanita'])->nullable();
            $table->date('tanggal_lahir')->nullable();
            
            // Data Kontak
            $table->text('alamat_tetap')->nullable();
            $table->string('negara')->default('Indonesia');
            $table->string('provinsi')->nullable();
            $table->string('kabupaten')->nullable();
            $table->text('alamat_saat_ini')->nullable();
            $table->string('no_telepon')->nullable();
            $table->string('no_hp')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'username', 'role', 'photo', 'nama_identitas', 'nama_ijazah',
                'jenis_identitas', 'nomor_identitas', 'kewarganegaraan',
                'jenis_kelamin', 'tanggal_lahir', 'alamat_tetap', 'negara',
                'provinsi', 'kabupaten', 'alamat_saat_ini', 'no_telepon', 'no_hp'
            ]);
        });
    }
};