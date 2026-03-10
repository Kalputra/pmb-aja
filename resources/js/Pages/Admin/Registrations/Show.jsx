import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function RegistrationShow({ auth, registration }) {
    const [showResultForm, setShowResultForm] = useState(false);
    const [resultData, setResultData] = useState({
        score: "",
        rank: "",
        status: "passed",
        remarks: "",
    });

    const handleInputResult = (e) => {
        e.preventDefault();
        router.post(
            route("admin.registrations.input-result", registration.id),
            resultData,
            {
                onSuccess: () => {
                    setShowResultForm(false);
                    setResultData({
                        score: "",
                        rank: "",
                        status: "passed",
                        remarks: "",
                    });
                },
            },
        );
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (date) => {
        if (!date) return "-";
        return new Date(date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const getStatusBadge = (status) => {
        const badges = {
            draft: "bg-gray-100 text-gray-800",
            verified: "bg-blue-100 text-blue-800",
            documents_uploaded: "bg-yellow-100 text-yellow-800",
            paid: "bg-green-100 text-green-800",
            exam_card_generated: "bg-purple-100 text-purple-800",
            exam_completed: "bg-indigo-100 text-indigo-800",
            accepted: "bg-green-500 text-white",
            rejected: "bg-red-500 text-white",
        };

        const labels = {
            draft: "Draft",
            verified: "Pendaftaran Terverifikasi",
            documents_uploaded: "Dokumen Terupload",
            paid: "Terverifikasi",
            exam_card_generated: "Kartu Ujian Tersedia",
            exam_completed: "Ujian Selesai",
            accepted: "Diterima",
            rejected: "Ditolak",
        };

        return (
            <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${badges[status]}`}
            >
                {labels[status]}
            </span>
        );
    };

    const handleGenerateExamCard = () => {
        if (confirm("Generate kartu ujian untuk pendaftar ini?")) {
            router.post(
                route(
                    "admin.registrations.generate-exam-card",
                    registration.id,
                ),
            );
        }
    };

    const handleAccept = () => {
        if (confirm("Terima pendaftar ini?")) {
            router.post(route("admin.registrations.approve", registration.id));
        }
    };

    const handleReject = () => {
        const reason = prompt("Alasan penolakan:");
        if (reason) {
            router.post(route("admin.registrations.reject", registration.id), {
                reason: reason,
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Detail Pendaftaran
                    </h2>
                    <Link
                        href={route("admin.registrations.index")}
                        className="text-sm text-blue-600 hover:text-blue-800"
                    >
                        Kembali 
                    </Link>
                </div>
            }
        >
            <Head title="Detail Pendaftaran" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Status & Actions Card */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        {registration.registration_number}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Dibuat:{" "}
                                        {formatDate(registration.created_at)}
                                    </p>
                                </div>
                                {getStatusBadge(registration.status)}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3">
                                {registration.status === "paid" &&
                                    !registration.exam_card && (
                                        <button
                                            onClick={handleGenerateExamCard}
                                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold"
                                        >
                                            📝 Generate Kartu Ujian
                                        </button>
                                    )}

                                {registration.status === "exam_completed" && (
                                    <>
                                        <button
                                            onClick={handleAccept}
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                                        >
                                            Terima
                                        </button>
                                        <button
                                            onClick={handleReject}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
                                        >
                                            Tolak
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Data Mahasiswa
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                        Email
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                        {registration.user.email}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">
                                        Jenis Kelamin
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                        {registration.user.jenis_kelamin || "-"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">
                                        Tanggal Lahir
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                        {formatDate(
                                            registration.user.tanggal_lahir,
                                        )}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">
                                        No. HP
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                        {registration.user.no_hp || "-"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">
                                        No. Telepon
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                        {registration.user.no_telepon || "-"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Program Studi Info */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Program Studi
                            </h3>

                            {/* First Choice */}
                            <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg mb-4">
                                <div className="flex items-center mb-2">
                                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold mr-2">
                                        Pilihan 1
                                    </span>
                                    <h4 className="font-semibold text-gray-900">
                                        {registration.study_program.name}
                                    </h4>
                                </div>
                                <dl className="grid grid-cols-2 gap-2 text-sm mt-3">
                                    <div>
                                        <dt className="text-gray-600">
                                            Fakultas:
                                        </dt>
                                        <dd className="font-medium">
                                            {registration.study_program.faculty}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-gray-600">
                                            Jenjang:
                                        </dt>
                                        <dd className="font-medium">
                                            {registration.study_program.level}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-gray-600">
                                            Kelas:
                                        </dt>
                                        <dd className="font-medium">
                                            {
                                                registration.study_program
                                                    .class_type
                                            }
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-gray-600">
                                            Biaya Pendidikan:
                                        </dt>
                                        <dd className="font-bold text-blue-900">
                                            {formatCurrency(
                                                registration.study_program
                                                    .tuition_fee,
                                            )}
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            {/* Second Choice */}
                            {registration.second_choice && (
                                <div className="border-l-4 border-gray-400 bg-gray-50 p-4 rounded-r-lg">
                                    <div className="flex items-center mb-2">
                                        <span className="bg-gray-400 text-white px-2 py-1 rounded text-xs font-semibold mr-2">
                                            Pilihan 2
                                        </span>
                                        <h4 className="font-semibold text-gray-900">
                                            {registration.second_choice.name}
                                        </h4>
                                    </div>
                                    <dl className="grid grid-cols-2 gap-2 text-sm mt-3">
                                        <div>
                                            <dt className="text-gray-600">
                                                Fakultas:
                                            </dt>
                                            <dd className="font-medium">
                                                {
                                                    registration.second_choice
                                                        .faculty
                                                }
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-gray-600">
                                                Jenjang:
                                            </dt>
                                            <dd className="font-medium">
                                                {
                                                    registration.second_choice
                                                        .level
                                                }
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-gray-600">
                                                Kelas:
                                            </dt>
                                            <dd className="font-medium">
                                                {
                                                    registration.second_choice
                                                        .class_type
                                                }
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-gray-600">
                                                Biaya Pendidikan:
                                            </dt>
                                            <dd className="font-bold text-gray-900">
                                                {formatCurrency(
                                                    registration.second_choice
                                                        .tuition_fee,
                                                )}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Payment Info */}
                    {registration.payment && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">
                                    Informasi Pembayaran
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Kode Pembayaran
                                        </p>
                                        <p className="font-semibold text-gray-900">
                                            {registration.payment.payment_code}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Metode Pembayaran
                                        </p>
                                        <p className="font-semibold text-gray-900">
                                            {registration.payment
                                                .payment_method ===
                                                "bank_transfer" &&
                                                "Transfer Bank"}
                                            {registration.payment
                                                .payment_method ===
                                                "virtual_account" &&
                                                "Virtual Account"}
                                            {registration.payment
                                                .payment_method ===
                                                "credit_card" && "Kartu Kredit"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Jumlah
                                        </p>
                                        <p className="font-bold text-blue-900 text-lg">
                                            {formatCurrency(
                                                registration.payment.amount,
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Status
                                        </p>
                                        <span
                                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                                registration.payment.status ===
                                                "paid"
                                                    ? "bg-green-100 text-green-800"
                                                    : registration.payment
                                                            .status ===
                                                        "pending"
                                                      ? "bg-yellow-100 text-yellow-800"
                                                      : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {registration.payment.status ===
                                                "paid" && "Lunas"}
                                            {registration.payment.status ===
                                                "pending" && "Menunggu"}
                                            {registration.payment.status ===
                                                "cancelled" && "Dibatalkan"}
                                        </span>
                                    </div>
                                    {registration.payment.paid_at && (
                                        <div>
                                            <p className="text-sm text-gray-600">
                                                Tanggal Bayar
                                            </p>
                                            <p className="font-semibold text-gray-900">
                                                {formatDate(
                                                    registration.payment
                                                        .paid_at,
                                                )}
                                            </p>
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Batas Waktu
                                        </p>
                                        <p className="font-semibold text-gray-900">
                                            {formatDate(
                                                registration.payment.expires_at,
                                            )}
                                        </p>
                                    </div>
                                </div>

                                {/* Payment Proof */}
                                {registration.payment.payment_proof && (
                                    <div className="border-t pt-4">
                                        <p className="text-sm text-gray-600 mb-2">
                                            Bukti Pembayaran:
                                        </p>
                                        <div className="flex items-center space-x-4">
                                            <a
                                                href={`/${registration.payment.payment_proof}`}
                                                target="_blank"
                                                className="flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
                                            >
                                                <svg
                                                    className="w-5 h-5 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    />
                                                </svg>
                                                Lihat Bukti Transfer
                                            </a>

                                            {registration.payment.status ===
                                                "pending" &&
                                                registration.status !==
                                                    "paid" && (
                                                    <>
                                                        <button
                                                            onClick={() => {
                                                                const adminNotes =
                                                                    prompt(
                                                                        "Catatan admin (opsional):",
                                                                    );
                                                                if (
                                                                    confirm(
                                                                        "Verifikasi pembayaran ini?",
                                                                    )
                                                                ) {
                                                                    router.post(
                                                                        route(
                                                                            "admin.registrations.verify-payment",
                                                                            registration.id,
                                                                        ),
                                                                        {
                                                                            admin_notes:
                                                                                adminNotes,
                                                                        },
                                                                    );
                                                                }
                                                            }}
                                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                                                        >
                                                            Verifikasi
                                                            Pembayaran
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                const reason =
                                                                    prompt(
                                                                        "Alasan penolakan:",
                                                                    );
                                                                if (reason) {
                                                                    router.post(
                                                                        route(
                                                                            "admin.registrations.reject-payment",
                                                                            registration.id,
                                                                        ),
                                                                        {
                                                                            reason: reason,
                                                                        },
                                                                    );
                                                                }
                                                            }}
                                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
                                                        >
                                                            Tolak Pembayaran
                                                        </button>
                                                    </>
                                                )}
                                        </div>
                                    </div>
                                )}

                                {registration.payment.status === "pending" &&
                                    !registration.payment.payment_proof && (
                                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4 rounded">
                                            <p className="text-sm text-yellow-700">
                                                Menunggu user upload bukti
                                                pembayaran.
                                            </p>
                                        </div>
                                    )}

                                {registration.payment.status === "cancelled" &&
                                    registration.payment.notes && (
                                        <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-4 rounded">
                                            <p className="text-sm text-red-700">
                                                <strong>
                                                    Alasan Penolakan:
                                                </strong>{" "}
                                                {registration.payment.notes}
                                            </p>
                                        </div>
                                    )}
                            </div>
                        </div>
                    )}

                    {/* Documents */}
                    {registration.documents &&
                        registration.documents.length > 0 && (
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                                        Dokumen
                                    </h3>
                                    <div className="space-y-3">
                                        {registration.documents.map((doc) => (
                                            <div
                                                key={doc.id}
                                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                            >
                                                <div>
                                                    <p className="font-semibold text-gray-900">
                                                        {doc.file_name}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {doc.document_type} -{" "}
                                                        {(
                                                            doc.file_size / 1024
                                                        ).toFixed(2)}{" "}
                                                        KB
                                                    </p>
                                                </div>
                                                href={`/${doc.file_path}`}
                                                target="_blank"
                                                className="text-blue-600
                                                hover:text-blue-800 font-medium"
                                                <a>Lihat </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                    {/* Exam Result */}
                    {registration.exam_card && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">
                                        Hasil Ujian
                                    </h3>
                                    {!registration.exam_result &&
                                        registration.status ===
                                            "exam_card_generated" && (
                                            <button
                                                onClick={() =>
                                                    setShowResultForm(
                                                        !showResultForm,
                                                    )
                                                }
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                                            >
                                                {showResultForm
                                                    ? "Tutup Form"
                                                    : "+ Input Hasil Ujian"}
                                            </button>
                                        )}
                                </div>

                                {showResultForm && (
                                    <form
                                        onSubmit={handleInputResult}
                                        className="bg-gray-50 p-4 rounded-lg space-y-4"
                                    >
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Nilai Ujian (0-100) *
                                                </label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    max="100"
                                                    value={resultData.score}
                                                    onChange={(e) =>
                                                        setResultData({
                                                            ...resultData,
                                                            score: e.target
                                                                .value,
                                                        })
                                                    }
                                                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Peringkat (Opsional)
                                                </label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={resultData.rank}
                                                    onChange={(e) =>
                                                        setResultData({
                                                            ...resultData,
                                                            rank: e.target
                                                                .value,
                                                        })
                                                    }
                                                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Status Kelulusan *
                                            </label>
                                            <div className="flex space-x-4">
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        value="passed"
                                                        checked={
                                                            resultData.status ===
                                                            "passed"
                                                        }
                                                        onChange={(e) =>
                                                            setResultData({
                                                                ...resultData,
                                                                status: e.target
                                                                    .value,
                                                            })
                                                        }
                                                        className="text-green-600 focus:ring-green-500"
                                                    />
                                                    <span className="ml-2 text-gray-700">
                                                        Lulus
                                                    </span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        value="failed"
                                                        checked={
                                                            resultData.status ===
                                                            "failed"
                                                        }
                                                        onChange={(e) =>
                                                            setResultData({
                                                                ...resultData,
                                                                status: e.target
                                                                    .value,
                                                            })
                                                        }
                                                        className="text-red-600 focus:ring-red-500"
                                                    />
                                                    <span className="ml-2 text-gray-700">
                                                        Tidak Lulus
                                                    </span>
                                                </label>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Catatan (Opsional)
                                            </label>
                                            <textarea
                                                value={resultData.remarks}
                                                onChange={(e) =>
                                                    setResultData({
                                                        ...resultData,
                                                        remarks: e.target.value,
                                                    })
                                                }
                                                rows="3"
                                                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                                placeholder="Catatan tambahan untuk peserta..."
                                            />
                                        </div>

                                        <div className="flex justify-end space-x-3">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowResultForm(false)
                                                }
                                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                            >
                                                Batal
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                                            >
                                                Simpan Hasil
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {registration.exam_result && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="bg-blue-50 p-4 rounded-lg">
                                                <p className="text-sm text-gray-600">
                                                    Nilai
                                                </p>
                                                <p className="text-3xl font-bold text-blue-900">
                                                    {
                                                        registration.exam_result
                                                            .score
                                                    }
                                                </p>
                                            </div>
                                            {registration.exam_result.rank && (
                                                <div className="bg-purple-50 p-4 rounded-lg">
                                                    <p className="text-sm text-gray-600">
                                                        Peringkat
                                                    </p>
                                                    <p className="text-3xl font-bold text-purple-900">
                                                        #
                                                        {
                                                            registration
                                                                .exam_result
                                                                .rank
                                                        }
                                                    </p>
                                                </div>
                                            )}
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <p className="text-sm text-gray-600">
                                                    Status
                                                </p>
                                                <span
                                                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-2 ${
                                                        registration.exam_result
                                                            .status === "passed"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-red-100 text-red-800"
                                                    }`}
                                                >
                                                    {registration.exam_result
                                                        .status === "passed"
                                                        ? "✓ Lulus"
                                                        : "✗ Tidak Lulus"}
                                                </span>
                                            </div>
                                        </div>

                                        {registration.exam_result.remarks && (
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <p className="text-sm text-gray-600 mb-1">
                                                    Catatan:
                                                </p>
                                                <p className="text-gray-900">
                                                    {
                                                        registration.exam_result
                                                            .remarks
                                                    }
                                                </p>
                                            </div>
                                        )}

                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <p className="text-sm text-blue-700">
                                                Hasil diumumkan pada:{" "}
                                                {formatDate(
                                                    registration.exam_result
                                                        .announced_at,
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Timeline */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Timeline
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                                            <svg
                                                className="h-5 w-5 text-white"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-900">
                                            Pendaftaran Dibuat
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {formatDate(
                                                registration.created_at,
                                            )}
                                        </p>
                                    </div>
                                </div>

                                {registration.verified_at && (
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                                                <svg
                                                    className="h-5 w-5 text-white"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-900">
                                                Diverifikasi
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {formatDate(
                                                    registration.verified_at,
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {registration.paid_at && (
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                                                <svg
                                                    className="h-5 w-5 text-white"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-900">
                                                Pembayaran Berhasil
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {formatDate(
                                                    registration.paid_at,
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {registration.exam_date && (
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center">
                                                <svg
                                                    className="h-5 w-5 text-white"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-900">
                                                Jadwal Ujian
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {formatDate(
                                                    registration.exam_date,
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
