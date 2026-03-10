import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function Show({ auth, registration }) {
    const [showDocumentModal, setShowDocumentModal] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState({});
    const [uploading, setUploading] = useState(false);

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

    const getStatusInfo = (status) => {
        const statuses = {
            draft: {
                color: "bg-gray-100 text-gray-800",
                label: "Draft",
                description:
                    "Pendaftaran masih dalam draft. Silakan verifikasi untuk melanjutkan.",
            },
            verified: {
                color: "bg-blue-100 text-blue-800",
                label: "Terverifikasi",
                description:
                    "Pendaftaran sudah diverifikasi. Silakan upload dokumen persyaratan.",
            },
            documents_uploaded: {
                color: "bg-yellow-100 text-yellow-800",
                label: "Dokumen Terupload",
                description:
                    "Dokumen sedang dalam proses review. Silakan lakukan pembayaran.",
            },
            paid: {
                color: "bg-green-100 text-green-800",
                label: "Sudah Bayar",
                description:
                    "Pembayaran berhasil. Menunggu kartu ujian digenerate.",
            },
            exam_card_generated: {
                color: "bg-purple-100 text-purple-800",
                label: "Kartu Ujian Tersedia",
                description:
                    "Kartu ujian sudah tersedia. Silakan download dan ikuti ujian sesuai jadwal.",
            },
            exam_completed: {
                color: "bg-indigo-100 text-indigo-800",
                label: "Ujian Selesai",
                description:
                    "Ujian sudah dilaksanakan. Menunggu pengumuman hasil.",
            },
            accepted: {
                color: "bg-green-500 text-white",
                label: "Diterima",
                description: "Selamat! Anda diterima di program studi ini.",
            },
            rejected: {
                color: "bg-red-500 text-white",
                label: "Ditolak",
                description:
                    "Mohon maaf, Anda belum berhasil pada program studi ini.",
            },
        };
        return statuses[status] || statuses.draft;
    };

    const statusInfo = getStatusInfo(registration.status);

    const handleVerify = () => {
        if (
            confirm(
                "Apakah Anda yakin ingin memverifikasi pendaftaran ini? Setelah diverifikasi, data tidak dapat diubah lagi.",
            )
        ) {
            router.post(route("registration.verify", registration.id));
        }
    };

    const handleFileSelect = (docType, file) => {
        setSelectedFiles((prev) => ({
            ...prev,
            [docType]: file,
        }));
    };

    const handleUploadDocuments = () => {
        if (Object.keys(selectedFiles).length === 0) {
            alert("Silakan pilih minimal satu dokumen!");
            return;
        }

        setUploading(true);

        const formData = new FormData();
        Object.keys(selectedFiles).forEach((key) => {
            if (selectedFiles[key]) {
                formData.append("documents[]", selectedFiles[key]);
            }
        });

        router.post(
            route("registration.upload-documents", registration.id),
            formData,
            {
                onSuccess: () => {
                    setUploading(false);
                    setShowDocumentModal(false);
                    setSelectedFiles({});
                },
                onError: () => {
                    setUploading(false);
                    alert("Gagal mengupload dokumen!");
                },
            },
        );
    };

    const canEdit = registration.status === "draft";
    const canVerify = registration.status === "draft";

    // Document upload is only required for: S2, S3, Profesi, Spesialis, S1 Ekstensi, S1 International
    const requiresDocumentUpload =
        registration.study_program.level === "S2" ||
        registration.study_program.level === "S3" ||
        registration.study_program.level === "Profesi" ||
        registration.study_program.level === "Spesialis" ||
        (registration.study_program.level === "S1" &&
            registration.study_program.class_type === "International") ||
        (registration.study_program.level === "S1" &&
            registration.study_program.class_type === "Ekstensi");

    const canUploadDocuments =
        requiresDocumentUpload &&
        ["verified", "documents_uploaded"].includes(registration.status);
    const canDownloadExamCard = registration.exam_card;
    const canViewResult = registration.exam_result;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Detail Pendaftaran
                    </h2>
                    <Link
                        href={route("dashboard")}
                        className="text-sm text-blue-600 hover:text-blue-800"
                    >
                        Kembali ke Dashboard
                    </Link>
                </div>
            }
        >
            <Head title="Detail Pendaftaran" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Status Card */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">
                                        {registration.registration_number}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Dibuat:{" "}
                                        {formatDate(registration.created_at)}
                                    </p>
                                </div>
                                <span
                                    className={`px-4 py-2 rounded-full text-sm font-semibold ${statusInfo.color}`}
                                >
                                    {statusInfo.label}
                                </span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-700">
                                    {statusInfo.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Program Studi Info */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Program Studi yang Dipilih
                            </h3>

                            <div className="space-y-4">
                                {/* First Choice */}
                                <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
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
                                                {
                                                    registration.study_program
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
                                                    registration.study_program
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
                                                {
                                                    registration.second_choice
                                                        .name
                                                }
                                            </h4>
                                        </div>
                                        <dl className="grid grid-cols-2 gap-2 text-sm mt-3">
                                            <div>
                                                <dt className="text-gray-600">
                                                    Fakultas:
                                                </dt>
                                                <dd className="font-medium">
                                                    {
                                                        registration
                                                            .second_choice
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
                                                        registration
                                                            .second_choice.level
                                                    }
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="text-gray-600">
                                                    Kelas:
                                                </dt>
                                                <dd className="font-medium">
                                                    {
                                                        registration
                                                            .second_choice
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
                                                        registration
                                                            .second_choice
                                                            .tuition_fee,
                                                    )}
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Timeline Pendaftaran
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

                                {registration.registered_at && (
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center">
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
                                                Daftar Ulang Selesai
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {formatDate(
                                                    registration.registered_at,
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Aksi
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {canEdit && (
                                    <Link
                                        href={route(
                                            "registration.edit",
                                            registration.id,
                                        )}
                                        className="flex items-center justify-center px-4 py-3 border border-blue-600 rounded-lg text-blue-600 hover:bg-blue-50 font-semibold"
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
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                            />
                                        </svg>
                                        Edit Pendaftaran
                                    </Link>
                                )}

                                {canVerify && (
                                    <button
                                        onClick={handleVerify}
                                        className="flex items-center justify-center px-4 py-3 bg-green-600 rounded-lg text-white hover:bg-green-700 font-semibold"
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
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        Verifikasi Pendaftaran
                                    </button>
                                )}

                                {canUploadDocuments && (
                                    <button
                                        onClick={() =>
                                            setShowDocumentModal(true)
                                        }
                                        className="flex items-center justify-center px-4 py-3 bg-yellow-600 rounded-lg text-white hover:bg-yellow-700 font-semibold"
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
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                            />
                                        </svg>
                                        Upload Dokumen
                                    </button>
                                )}

                                {(registration.status === "verified" ||
                                    registration.status ===
                                        "documents_uploaded") &&
                                    !registration.payment && (
                                        <Link
                                            href={route(
                                                "registration.payment",
                                                registration.id,
                                            )}
                                            className="flex items-center justify-center px-4 py-3 bg-green-600 rounded-lg text-white hover:bg-green-700 font-semibold"
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
                                                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                                />
                                            </svg>
                                            Bayar Biaya Pendaftaran
                                        </Link>
                                    )}

                                {registration.payment &&
                                    registration.payment.status === "pending" &&
                                    registration.status !== "verified" && (
                                        <Link
                                            href={route(
                                                "registration.payment",
                                                registration.id,
                                            )}
                                            className="flex items-center justify-center px-4 py-3 bg-yellow-600 rounded-lg text-white hover:bg-yellow-700 font-semibold"
                                        >
                                            Upload Bukti Pembayaran
                                        </Link>
                                    )}

                                {registration.payment &&
                                    registration.payment.status === "paid" && (
                                        <div className="flex items-center justify-center px-4 py-3 bg-green-100 text-green-800 rounded-lg font-semibold">
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
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            Pembayaran Terverifikasi
                                        </div>
                                    )}

                                {canDownloadExamCard && (
                                    <Link
                                        href={route(
                                            "registration.exam-card",
                                            registration.id,
                                        )}
                                        className="flex items-center justify-center px-4 py-3 bg-purple-600 rounded-lg text-white hover:bg-purple-700 font-semibold"
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
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                                            />
                                        </svg>
                                        Download Kartu Ujian
                                    </Link>
                                )}

                                {canViewResult && (
                                    <Link
                                        href={route(
                                            "registration.result",
                                            registration.id,
                                        )}
                                        className="flex items-center justify-center px-4 py-3 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 font-semibold"
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
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                        Lihat Hasil Ujian
                                    </Link>
                                )}

                                {registration.status ===
                                    "exam_card_generated" &&
                                    !registration.exam_result && (
                                        <Link
                                            href={route(
                                                "registration.exam.start",
                                                registration.id,
                                            )}
                                            className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg text-white hover:from-green-700 hover:to-blue-700 font-semibold shadow-lg"
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
                                                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                                />
                                            </svg>
                                            🎯 Mulai Ujian Sekarang
                                        </Link>
                                    )}

                                {registration.status === "accepted" && (
                                    <Link
                                        href={route(
                                            "registration.daftar-ulang",
                                            registration.id,
                                        )}
                                        className="flex items-center justify-center px-4 py-3 bg-emerald-600 rounded-lg text-white hover:bg-emerald-700 font-semibold"
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
                                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                            />
                                        </svg>
                                        Daftar Ulang
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Document Upload Modal - Only shown if document upload is required */}
            {showDocumentModal && requiresDocumentUpload && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900">
                                Upload Dokumen Persyaratan
                            </h3>
                            <button
                                onClick={() => setShowDocumentModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Silakan upload dokumen persyaratan berikut. File
                                harus berformat PDF, JPG, JPEG, atau PNG dengan
                                ukuran maksimal 5MB.
                            </p>

                            {/* Document Type 1: KK */}
                            <div className="border border-gray-200 rounded-lg p-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Kartu Keluarga (KK){" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) =>
                                        handleFileSelect(
                                            "kk",
                                            e.target.files[0],
                                        )
                                    }
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                {selectedFiles.kk && (
                                    <p className="text-sm text-green-600 mt-1">
                                        ✓ {selectedFiles.kk.name}
                                    </p>
                                )}
                            </div>

                            {/* Document Type 2: Akta Kelahiran */}
                            <div className="border border-gray-200 rounded-lg p-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Akta Kelahiran{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) =>
                                        handleFileSelect(
                                            "akta_kelahiran",
                                            e.target.files[0],
                                        )
                                    }
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                {selectedFiles.akta_kelahiran && (
                                    <p className="text-sm text-green-600 mt-1">
                                        ✓ {selectedFiles.akta_kelahiran.name}
                                    </p>
                                )}
                            </div>

                            {/* Document Type 3: KTP Orang Tua */}
                            <div className="border border-gray-200 rounded-lg p-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    KTP Orang Tua{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) =>
                                        handleFileSelect(
                                            "ktp_orang_tua",
                                            e.target.files[0],
                                        )
                                    }
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                {selectedFiles.ktp_orang_tua && (
                                    <p className="text-sm text-green-600 mt-1">
                                        ✓ {selectedFiles.ktp_orang_tua.name}
                                    </p>
                                )}
                            </div>

                            {/* Document Type 4: Ijazah */}
                            <div className="border border-gray-200 rounded-lg p-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ijazah Terakhir{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) =>
                                        handleFileSelect(
                                            "ijazah",
                                            e.target.files[0],
                                        )
                                    }
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                {selectedFiles.ijazah && (
                                    <p className="text-sm text-green-600 mt-1">
                                        ✓ {selectedFiles.ijazah.name}
                                    </p>
                                )}
                            </div>

                            {/* Document Type 5: Pas Photo */}
                            <div className="border border-gray-200 rounded-lg p-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Pas Photo{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    onChange={(e) =>
                                        handleFileSelect(
                                            "pas_photo",
                                            e.target.files[0],
                                        )
                                    }
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                {selectedFiles.pas_photo && (
                                    <p className="text-sm text-green-600 mt-1">
                                        ✓ {selectedFiles.pas_photo.name}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowDocumentModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleUploadDocuments}
                                disabled={
                                    uploading ||
                                    Object.keys(selectedFiles).length === 0
                                }
                                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {uploading ? "Mengupload..." : "Upload Dokumen"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
