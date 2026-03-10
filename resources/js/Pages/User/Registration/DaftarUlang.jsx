import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function DaftarUlang({ auth, registration }) {
    const { data, setData, post, processing, errors } = useForm({
        ijazah: null,
        akta_kelahiran: null,
        kartu_keluarga: null,
        ktp: null,
        pas_photo: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("registration.submit-daftar-ulang", registration.id));
    };

    const documentRequirements = [
        {
            key: "ijazah",
            label: "Ijazah SMA/SMK/MA",
            desc: "Scan ijazah asli atau legalisir (PDF/JPG/PNG)",
            required: true,
        },
        {
            key: "akta_kelahiran",
            label: "Akta Kelahiran",
            desc: "Scan akta kelahiran (PDF/JPG/PNG)",
            required: true,
        },
        {
            key: "kartu_keluarga",
            label: "Kartu Keluarga (KK)",
            desc: "Scan Kartu Keluarga (PDF/JPG/PNG)",
            required: true,
        },
        {
            key: "ktp",
            label: "KTP Orang Tua/Wali",
            desc: "Scan KTP orang tua atau wali (PDF/JPG/PNG)",
            required: true,
        },
        {
            key: "pas_photo",
            label: "Pas Photo Terbaru",
            desc: "Photo 4x6 cm background merah (JPG/PNG)",
            required: true,
        },
    ];

    const isSubmitted =
        registration.registration_status === "documents_submitted" ||
        registration.registration_status === "verified" ||
        registration.registration_status === "completed";

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Daftar Ulang
                    </h2>
                    <Link
                        href={route("registration.show", registration.id)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                    >
                        Kembali
                    </Link>
                </div>
            }
        >
            <Head title="Daftar Ulang" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Header Info */}
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-emerald-100 rounded-full">
                                <svg
                                    className="w-6 h-6 text-emerald-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-emerald-900">
                                    Selamat! Anda Diterima di UI 🎉
                                </h3>
                                <p className="text-emerald-700 mt-1">
                                    Silakan melengkapi dokumen daftar ulang di
                                    bawah ini.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Registration Info */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6">
                        <h4 className="font-medium text-gray-900 mb-3">
                            Informasi Pendaftaran
                        </h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">No. Pendaftaran</p>
                                <p className="font-medium text-gray-900">
                                    {registration.registration_number}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500">Program Studi</p>
                                <p className="font-medium text-gray-900">
                                    {registration.study_program.name}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Status */}
                    {isSubmitted && (
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <svg
                                        className="w-5 h-5 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-blue-900">
                                        Dokumen Submitted
                                    </p>
                                    <p className="text-sm text-blue-700">
                                        Dokumen daftar ulang Anda sedang dalam
                                        proses verifikasi.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Upload Form */}
                    {!isSubmitted ? (
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white rounded-xl border border-gray-100 p-6"
                        >
                            <h4 className="font-semibold text-gray-900 mb-5">
                                Upload Dokumen
                            </h4>

                            <div className="space-y-5">
                                {documentRequirements.map((doc) => (
                                    <div
                                        key={doc.key}
                                        className="border border-gray-200 rounded-lg p-4"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {doc.label}
                                                    {doc.required && (
                                                        <span className="text-red-500 ml-1">
                                                            *
                                                        </span>
                                                    )}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {doc.desc}
                                                </p>
                                            </div>
                                        </div>
                                        <input
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={(e) =>
                                                setData(
                                                    doc.key,
                                                    e.target.files[0],
                                                )
                                            }
                                            className="mt-2 block w-full text-sm text-gray-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-lg file:border-0
                                                file:text-sm file:font-medium
                                                file:bg-blue-50 file:text-blue-700
                                                hover:file:bg-blue-100"
                                        />
                                        {errors[doc.key] && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors[doc.key]}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-4">
                                <Link
                                    href={route(
                                        "registration.show",
                                        registration.id,
                                    )}
                                    className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium disabled:opacity-50"
                                >
                                    {processing
                                        ? "Mengupload..."
                                        : "Submit Dokumen"}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="bg-white rounded-xl border border-gray-100 p-6">
                            <h4 className="font-semibold text-gray-900 mb-4">
                                Dokumen yang Diupload
                            </h4>
                            <div className="space-y-3">
                                {documentRequirements.map((doc) => (
                                    <div
                                        key={doc.key}
                                        className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                                    >
                                        <span className="text-gray-700">
                                            {doc.label}
                                        </span>
                                        <span className="flex items-center text-emerald-600 text-sm">
                                            <svg
                                                className="w-4 h-4 mr-1"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Terupload
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Notes */}
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
                        <p>
                            <strong>Catatan:</strong>
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            <li>
                                Semua dokumen wajib diupload dalam format PDF,
                                JPG, atau PNG
                            </li>
                            <li>Ukuran file maksimal 5MB per dokumen</li>
                            <li>Pastikan dokumen jelas dan dapat dibaca</li>
                            <li>
                                Admin akan memverifikasi dokumen dalam 2-3 hari
                                kerja
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
