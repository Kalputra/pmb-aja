import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function ExamCard({ auth, registration }) {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center no-print">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Kartu Ujian Masuk
                    </h2>
                    <div className="flex space-x-3">
                        <button
                            onClick={handlePrint}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold"
                        >
                            Cetak Kartu
                        </button>
                        <Link
                            href={route('registration.show', registration.id)}
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            Kembali
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Kartu Ujian" />

            <style>{`
                @media print {
                    .no-print {
                        display: none !important;
                    }
                    body {
                        background: white;
                    }
                    .print-card {
                        box-shadow: none !important;
                        page-break-inside: avoid;
                    }
                }
            `}</style>

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* Warning */}
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 no-print">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-yellow-700">
                                    <strong>Penting:</strong> Cetak kartu ujian ini dan bawa saat ujian seleksi masuk. Kartu yang tidak dicetak atau rusak tidak akan diterima.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Exam Card */}
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg print-card">
                        {/* Header */}
                        <div className="bg-yellow-400  p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                                        <span className="text-yellow-600 text-2xl font-bold">UI</span>
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold">UNIVERSITAS INDONESIA</h1>
                                        <p className="text-sm">Kartu Peserta Ujian Seleksi Masuk</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm">Tahun Akademik</p>
                                    <p className="text-xl font-bold">{new Date().getFullYear()}/{new Date().getFullYear() + 1}</p>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            <div className="grid grid-cols-3 gap-6">
                                {/* Left: User Info */}
                                <div className="col-span-2 space-y-4">
                                    <div className="border-b pb-4">
                                        <h3 className="text-sm text-gray-600 mb-2">NOMOR KARTU UJIAN</h3>
                                        <p className="text-3xl font-bold text-blue-900">{registration.exam_card.card_number}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-600">Nama Lengkap</p>
                                            <p className="font-bold text-gray-900 text-lg">{registration.user.nama_identitas}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Tanggal Lahir</p>
                                            <p className="font-semibold text-gray-900">{formatDate(registration.user.tanggal_lahir)}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-600">Program Studi Pilihan</p>
                                        <p className="font-bold text-gray-900 text-lg">{registration.study_program.name}</p>
                                        <p className="text-sm text-gray-600">{registration.study_program.faculty}</p>
                                    </div>

                                    <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                                        <h4 className="font-bold text-blue-900 mb-3">JADWAL UJIAN</h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <p className="text-xs text-gray-600">Tanggal</p>
                                                <p className="font-bold text-gray-900">{formatDate(registration.exam_card.exam_date)}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600">Waktu</p>
                                                <p className="font-bold text-gray-900">{registration.exam_card.exam_time} WIB</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600">Lokasi</p>
                                                <p className="font-bold text-gray-900">{registration.exam_card.exam_location}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600">Ruang</p>
                                                <p className="font-bold text-gray-900">{registration.exam_card.exam_room}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600">Nomor Kursi</p>
                                                <p className="font-bold text-blue-900 text-2xl">{registration.exam_card.seat_number}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: QR Code & Photo */}
                                <div className="space-y-4">
                                    {/* Photo */}
                                    <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                                        {registration.user.photo ? (
                                            <img
                                                src={`/${registration.user.photo}`}
                                                alt="Foto Peserta"
                                                className="w-full h-48 object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                                <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    {/* QR Code */}
                                    <div className="bg-white border-2 border-gray-300 rounded-lg p-3">
                                        <img
                                            src={`/${registration.exam_card.qr_code}`}
                                            alt="QR Code"
                                            className="w-full h-auto"
                                        />
                                        <p className="text-xs text-center text-gray-600 mt-2">Scan untuk verifikasi</p>
                                    </div>
                                </div>
                            </div>

                            {/* Instructions */}
                            <div className="mt-6 pt-6 border-t">
                                <h4 className="font-bold text-gray-900 mb-3">KETENTUAN UJIAN:</h4>
                                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                                    <li>Harap datang 30 menit sebelum ujian dimulai</li>
                                    <li>Bawa kartu ujian ini beserta identitas asli (KTP/SIM/Paspor)</li>
                                    <li>Peserta yang terlambat tidak diperkenankan mengikuti ujian</li>
                                    <li>Dilarang membawa alat komunikasi elektronik ke dalam ruang ujian</li>
                                    <li>Pakaian sopan dan rapi</li>
                                </ol>
                            </div>

                            {/* Footer */}
                            <div className="mt-6 pt-6 border-t flex justify-between items-end">
                                <div>
                                    <p className="text-xs text-gray-600">Dicetak pada:</p>
                                    <p className="text-sm font-semibold text-gray-900">
                                        {new Date().toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold">Panitia Penerimaan Mahasiswa Baru</p>
                                    <p className="text-xs text-gray-600">Universitas Indonesia</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Download Button */}
                    <div className="mt-6 text-center no-print">
                        <button
                            onClick={handlePrint}
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold text-lg"
                        >
                            Cetak Kartu Ujian
                        </button>
                        <p className="text-sm text-gray-600 mt-3">
                            Gunakan browser Chrome atau Firefox untuk hasil cetak terbaik
                        </p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}