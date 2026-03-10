import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard({ auth, user, registrations, hasPhoto }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            draft: "bg-gray-100 text-gray-600",
            verified: "bg-blue-50 text-blue-700",
            documents_uploaded: "bg-amber-50 text-amber-700",
            paid: "bg-emerald-50 text-emerald-700",
            exam_card_generated: "bg-violet-50 text-violet-700",
            exam_completed: "bg-indigo-50 text-indigo-700",
            accepted: "bg-emerald-500 text-white",
            rejected: "bg-red-500 text-white",
        };

        const labels = {
            draft: "Draft",
            verified: "Terverifikasi",
            documents_uploaded: "Dokumen Terupload",
            paid: "Sudah Bayar",
            exam_card_generated: "Kartu Ujian Tersedia",
            exam_completed: "Ujian Selesai",
            accepted: "Diterima",
            rejected: "Ditolak",
        };

        return (
            <span
                className={`px-2.5 py-1 rounded-md text-xs font-medium ${badges[status]}`}
            >
                {labels[status]}
            </span>
        );
    };

    const steps = [
        { num: 1, label: "Buat Akun", done: !!auth.user },
        { num: 2, label: "Upload Foto", done: hasPhoto },
        { num: 3, label: "Isi Formulir", done: registrations.length > 0 },
        {
            num: 4,
            label: "Verifikasi",
            done: registrations.some((r) =>
                [
                    "verified",
                    "documents_uploaded",
                    "paid",
                    "exam_card_generated",
                    "exam_completed",
                    "accepted",
                    "rejected",
                ].includes(r.status),
            ),
        },
        {
            num: 5,
            label: "Upload Berkas",
            done: registrations.some((r) =>
                [
                    "documents_uploaded",
                    "paid",
                    "exam_card_generated",
                    "exam_completed",
                    "accepted",
                    "rejected",
                ].includes(r.status),
            ),
        },
        {
            num: 6,
            label: "Pembayaran",
            done: registrations.some((r) =>
                [
                    "paid",
                    "exam_card_generated",
                    "exam_completed",
                    "accepted",
                    "rejected",
                ].includes(r.status),
            ),
        },
        {
            num: 7,
            label: "Kartu Ujian",
            done: registrations.some((r) =>
                [
                    "exam_card_generated",
                    "exam_completed",
                    "accepted",
                    "rejected",
                ].includes(r.status),
            ),
        },
        {
            num: 8,
            label: "Ujian Seleksi",
            done: registrations.some((r) =>
                ["exam_completed", "accepted", "rejected"].includes(r.status),
            ),
        },
        {
            num: 9,
            label: "Pengumuman",
            done: registrations.some((r) =>
                ["accepted", "rejected"].includes(r.status),
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-lg font-semibold text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
                    {/* Welcome Section */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Halo, {user.nama_identitas || user.name}! 👋
                                </h3>
                                <p className="text-gray-500 mt-1">
                                    Selamat datang di PMB Universitas Indonesia
                                </p>
                            </div>
                            <div className="hidden sm:block">
                                <img
                                    src="/images/logo-fakultas1.png"
                                    alt="UI"
                                    className="h-12"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Photo Upload Alert */}
                    {!hasPhoto && (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-amber-100 rounded-lg">
                                    <svg
                                        className="w-5 h-5 text-amber-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-amber-900">
                                        Foto Diperlukan
                                    </h4>
                                    <p className="text-sm text-amber-700 mt-1">
                                        Upload foto 4x6 cm untuk dapat membuat
                                        pendaftaran.
                                    </p>
                                    <div className="mt-4 flex items-center gap-4">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200"
                                        />
                                        {selectedFile && (
                                            <button
                                                onClick={() => {
                                                    const formData =
                                                        new FormData();
                                                    formData.append(
                                                        "photo",
                                                        selectedFile,
                                                    );
                                                    router.post(
                                                        route("photo.upload"),
                                                        formData,
                                                        {
                                                            onSuccess: () => {
                                                                setSelectedFile(
                                                                    null,
                                                                );
                                                                alert(
                                                                    "Foto berhasil diupload!",
                                                                );
                                                            },
                                                        },
                                                    );
                                                }}
                                                className="px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600"
                                            >
                                                Upload
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Progress Steps - Minimalist */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6">
                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-5">
                            Tahapan Pendaftaran
                        </h4>
                        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3">
                            {steps.map((step) => (
                                <div
                                    key={step.num}
                                    className="flex flex-col items-center"
                                >
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                                            step.done
                                                ? "bg-emerald-500 text-white"
                                                : "bg-gray-100 text-gray-400"
                                        }`}
                                    >
                                        {step.done ? (
                                            <svg
                                                className="w-4 h-4"
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
                                        ) : (
                                            step.num
                                        )}
                                    </div>
                                    <span
                                        className={`text-xs mt-2 text-center ${step.done ? "text-gray-700" : "text-gray-400"}`}
                                    >
                                        {step.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Registrations */}
                    <div className="bg-white rounded-xl border border-gray-100">
                        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                            <h4 className="font-semibold text-gray-900">
                                Pendaftaran Saya
                            </h4>
                            {hasPhoto && (
                                <Link
                                    href={route("registration.create")}
                                    className="px-4 py-2 bg-[#005Ccc] text-white text-sm font-medium rounded-lg hover:bg-[#004ba0]"
                                >
                                    + Baru
                                </Link>
                            )}
                        </div>

                        {registrations.length === 0 ? (
                            <div className="p-12 text-center">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                                    <svg
                                        className="w-8 h-8 text-gray-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                                <p className="mt-4 text-gray-500">
                                    Belum ada pendaftaran
                                </p>
                                {!hasPhoto && (
                                    <p className="mt-1 text-sm text-gray-400">
                                        Upload foto terlebih dahulu
                                    </p>
                                )}
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {registrations.map((reg) => (
                                    <div
                                        key={reg.id}
                                        className="p-5 hover:bg-gray-50 transition"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3">
                                                    <p className="font-medium text-gray-900">
                                                        {
                                                            reg.registration_number
                                                        }
                                                    </p>
                                                    {getStatusBadge(reg.status)}
                                                </div>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {reg.study_program.name}
                                                    {reg.second_choice && (
                                                        <span className="text-gray-400">
                                                            {" "}
                                                            •{" "}
                                                            {
                                                                reg
                                                                    .second_choice
                                                                    .name
                                                            }
                                                        </span>
                                                    )}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {new Date(
                                                        reg.created_at,
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                            weekday: "long",
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        },
                                                    )}
                                                </p>
                                            </div>
                                            <Link
                                                href={route(
                                                    "registration.show",
                                                    reg.id,
                                                )}
                                                className="text-sm text-[#005Ccc] hover:text-[#004ba0] font-medium"
                                            >
                                                Detail
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
