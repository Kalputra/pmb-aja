import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Result({ auth, registration }) {
    // Check if exam result exists
    const hasResult =
        registration.exam_result && registration.exam_result.status !== null;
    const isPassed = hasResult && registration.exam_result.status === "passed";

    const formatDate = (date) => {
        if (!date) return "-";
        return new Date(date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // If no result yet, show waiting message
    if (!hasResult) {
        return (
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <div className="flex justify-between items-center">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Hasil Ujian Seleksi
                        </h2>
                        <Link
                            href={route("registration.show", registration.id)}
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            ← Kembali
                        </Link>
                    </div>
                }
            >
                <Head title="Hasil Ujian" />

                <div className="py-12">
                    <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
                        {/* Waiting for Result Banner */}
                        <div className="bg-yellow-50 border-2 border-yellow-500 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-8 text-center">
                                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 bg-yellow-500">
                                    <svg
                                        className="w-16 h-16 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>

                                <h1 className="text-4xl font-bold mb-2 text-yellow-900">
                                    MENUNGGU HASIL
                                </h1>
                                <p className="text-xl text-yellow-800">
                                    Hasil ujian seleksi belum diumumkan
                                </p>
                            </div>
                        </div>

                        {/* Candidate Info */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">
                                    Data Peserta
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Nama Lengkap
                                        </p>
                                        <p className="font-semibold text-gray-900">
                                            {registration.user.nama_identitas}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Nomor Pendaftaran
                                        </p>
                                        <p className="font-semibold text-gray-900">
                                            {registration.registration_number}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Program Studi
                                        </p>
                                        <p className="font-semibold text-gray-900">
                                            {registration.study_program.name}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Fakultas
                                        </p>
                                        <p className="font-semibold text-gray-900">
                                            {registration.study_program.faculty}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Info Message */}
                        <div className="bg-blue-50 border border-blue-200 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">
                                    Informasi
                                </h3>
                                <div className="text-gray-700 space-y-3">
                                    <p>
                                        Terima kasih telah mengikuti ujian
                                        seleksi masuk Universitas Indonesia.
                                    </p>
                                    <p>
                                        Hasil seleksi akan diumumkan pada
                                        tanggal yang telah ditentukan oleh
                                        panitia. Silakan kembali lagi nanti
                                        untuk melihat hasil seleksi Anda.
                                    </p>
                                    <p className="font-semibold">
                                        Pantau terus informasi terbaru dari
                                        pihak universitas.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Back Button */}
                        <div className="text-center">
                            <Link
                                href={route("dashboard")}
                                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold inline-block"
                            >
                                ← Kembali ke Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    // Show result when available
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Hasil Ujian Seleksi
                    </h2>
                    <Link
                        href={route("registration.show", registration.id)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                    >
                        ← Kembali
                    </Link>
                </div>
            }
        >
            <Head title="Hasil Ujian" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Status Banner */}
                    <div
                        className={`overflow-hidden shadow-sm sm:rounded-lg ${
                            isPassed
                                ? "bg-green-50 border-2 border-green-500"
                                : "bg-red-50 border-2 border-red-500"
                        }`}
                    >
                        <div className="p-8 text-center">
                            <div
                                className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${
                                    isPassed ? "bg-green-500" : "bg-red-500"
                                }`}
                            >
                                {isPassed ? (
                                    <svg
                                        className="w-16 h-16 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="w-16 h-16 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                            </div>

                            <h1
                                className={`text-4xl font-bold mb-2 ${isPassed ? "text-green-900" : "text-red-900"}`}
                            >
                                {isPassed ? "SELAMAT!" : "MOHON MAAF"}
                            </h1>
                            <p
                                className={`text-xl ${isPassed ? "text-green-800" : "text-red-800"}`}
                            >
                                {isPassed
                                    ? "Anda DITERIMA di Universitas Indonesia"
                                    : "Anda belum berhasil pada seleksi kali ini"}
                            </p>
                        </div>
                    </div>

                    {/* Candidate Info */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Data Peserta
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">
                                        Nama Lengkap
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                        {registration.user.nama_identitas}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">
                                        Nomor Pendaftaran
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                        {registration.registration_number}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">
                                        Program Studi
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                        {registration.study_program.name}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">
                                        Fakultas
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                        {registration.study_program.faculty}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Exam Result Details */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Detail Hasil Ujian
                            </h3>

                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="bg-blue-50 p-6 rounded-lg text-center">
                                    <p className="text-sm text-gray-600 mb-2">
                                        Nilai Ujian
                                    </p>
                                    <p className="text-5xl font-bold text-blue-900">
                                        {registration.exam_result.score || "-"}
                                    </p>
                                </div>

                                {registration.exam_result.rank && (
                                    <div className="bg-purple-50 p-6 rounded-lg text-center">
                                        <p className="text-sm text-gray-600 mb-2">
                                            Peringkat
                                        </p>
                                        <p className="text-5xl font-bold text-purple-900">
                                            #{registration.exam_result.rank}
                                        </p>
                                    </div>
                                )}

                                <div className="bg-gray-50 p-6 rounded-lg text-center">
                                    <p className="text-sm text-gray-600 mb-2">
                                        Status
                                    </p>
                                    <span
                                        className={`inline-block px-4 py-2 rounded-full text-lg font-semibold ${
                                            isPassed
                                                ? "bg-green-500 text-white"
                                                : "bg-red-500 text-white"
                                        }`}
                                    >
                                        {isPassed ? "LULUS" : "TIDAK LULUS"}
                                    </span>
                                </div>
                            </div>

                            {registration.exam_result.remarks && (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-2">
                                        Catatan Panitia:
                                    </p>
                                    <p className="text-gray-900">
                                        {registration.exam_result.remarks}
                                    </p>
                                </div>
                            )}

                            <div className="mt-6 pt-6 border-t">
                                <p className="text-sm text-gray-600">
                                    Hasil diumkan pada:{" "}
                                    <strong>
                                        {formatDate(
                                            registration.exam_result
                                                .announced_at,
                                        )}
                                    </strong>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Next Steps */}
                    <div
                        className={`overflow-hidden shadow-sm sm:rounded-lg ${
                            isPassed
                                ? "bg-green-50 border border-green-200"
                                : "bg-blue-50 border border-blue-200"
                        }`}
                    >
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                {isPassed ? "Langkah Selanjutnya" : "Informasi"}
                            </h3>
                            {isPassed ? (
                                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                                    <li>Unduh Surat Keputusan Penerimaan</li>
                                    <li>
                                        Daftar ulang sesuai jadwal yang
                                        ditentukan
                                    </li>
                                    <li>
                                        Lengkapi berkas persyaratan administrasi
                                    </li>
                                    <li>
                                        Bayar biaya pendidikan sesuai ketentuan
                                    </li>
                                    <li>Ikuti orientasi mahasiswa baru</li>
                                </ol>
                            ) : (
                                <div className="text-gray-700 space-y-3">
                                    <p>
                                        Terima kasih atas partisipasi Anda dalam
                                        ujian seleksi masuk Universitas
                                        Indonesia.
                                    </p>
                                    <p>
                                        Kami menghargai usaha dan dedikasi Anda.
                                        Jangan berkecil hati, terus berusaha dan
                                        tingkatkan kemampuan Anda.
                                    </p>
                                    <p className="font-semibold">
                                        Anda dapat mencoba lagi pada periode
                                        pendaftaran berikutnya.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Print Button */}
                    <div className="text-center">
                        <button
                            onClick={() => window.print()}
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold"
                        >
                            🖨️ Cetak Hasil
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
