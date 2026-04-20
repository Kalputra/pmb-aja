import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function AdminDashboard({
    auth,
    stats,
    recentRegistrations,
    programStats,
}) {
    const getStatusBadge = (status) => {
        const badges = {
            draft: "bg-slate-100/80 text-slate-600 backdrop-blur-sm",
            verified: "bg-blue-100/80 text-blue-600 backdrop-blur-sm",
            documents_uploaded:
                "bg-amber-100/80 text-amber-600 backdrop-blur-sm",
            paid: "bg-emerald-100/80 text-emerald-600 backdrop-blur-sm",
            exam_card_generated:
                "bg-violet-100/80 text-violet-600 backdrop-blur-sm",
            exam_completed: "bg-indigo-100/80 text-indigo-600 backdrop-blur-sm",
            accepted:
                "bg-emerald-500/90 text-white backdrop-blur-sm shadow-lg shadow-emerald-500/30",
            rejected:
                "bg-red-500/90 text-white backdrop-blur-sm shadow-lg shadow-red-500/30",
        };

        const labels = {
            draft: "Draft",
            verified: "Verif",
            documents_uploaded: "Dokumen",
            paid: "Bayar",
            exam_card_generated: "Kartu",
            exam_completed: "Selesai",
            accepted: "Diterima",
            rejected: "Ditolak",
        };

        return (
            <span
                className={`px-2 py-1 rounded-md text-xs font-medium ${badges[status]}`}
            >
                {labels[status]}
            </span>
        );
    };

    const statCards = [
        {
            label: "Total",
            value: stats.total_registrations,
            icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
        },
        {
            label: "Menunggu",
            value: stats.pending_verifications,
            icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
        },
        {
            label: "Sudah Bayar",
            value: stats.paid,
            icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
        },
        {
            label: "Diterima",
            value: stats.accepted,
            icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-base font-medium text-slate-700">
                    Dashboard Admin
                </h2>
            }
        >
            <Head title="Admin Dashboard" />
            // Efek overlay gradient buat background
            <div className="relative min-h-[calc(100vh-4rem)]">
                {/* Efek gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-slate-900/90" />

                {/* Content */}
                <div className="relative z-10 py-8">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
                        {/* Card selamat datang glassmorphism */}
                        <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl p-6 sm:p-8">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                                <div>
                                    <h3 className="text-2xl sm:text-3xl font-bold text-white">
                                        Dashboard Admin
                                    </h3>
                                    <p className="text-slate-300 mt-2 text-sm sm:text-base">
                                        Sistem Penerimaan Mahasiswa Baru UI
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card statistik glassmorphism */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {statCards.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl p-5"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                                            <svg
                                                className="w-5 h-5 text-white/80"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d={stat.icon}
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-300">
                                                {stat.label}
                                            </p>
                                            <p className="text-2xl font-bold text-white">
                                                {stat.value}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Layout dua kolom */}
                        <div className="grid lg:grid-cols-2 gap-6">
                            {/* Program top glassmorphism */}
                            {programStats && programStats.length > 0 && (
                                <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
                                    <div className="p-5 border-b border-white/10">
                                        <h4 className="font-semibold text-white">
                                            Program Studi Terpopuler
                                        </h4>
                                    </div>
                                    <div className="p-5 space-y-3">
                                        {programStats
                                            .slice(0, 5)
                                            .map((item, index) => (
                                                <div
                                                    key={item.study_program_id}
                                                    className="flex items-center justify-between"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${
                                                                index === 0
                                                                    ? "bg-amber-400/20 text-amber-300"
                                                                    : index ===
                                                                        1
                                                                      ? "bg-slate-300/20 text-slate-300"
                                                                      : index ===
                                                                          2
                                                                        ? "bg-orange-400/20 text-orange-300"
                                                                        : "bg-white/10 text-slate-400"
                                                            }`}
                                                        >
                                                            {index + 1}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-white">
                                                                {
                                                                    item
                                                                        .study_program
                                                                        .name
                                                                }
                                                            </p>
                                                            <p className="text-xs text-slate-400">
                                                                {
                                                                    item
                                                                        .study_program
                                                                        .faculty
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <p className="text-lg font-bold text-emerald-400">
                                                        {item.total}
                                                    </p>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            )}

                            {/* Aksi cepat glassmorphism */}
                            <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
                                <div className="p-5 border-b border-white/10">
                                    <h4 className="font-semibold text-white">
                                        Menu Cepat
                                    </h4>
                                </div>
                                <div className="p-5 grid grid-cols-2 gap-3">
                                    <Link
                                        href={route(
                                            "admin.registrations.index",
                                        )}
                                        className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-center group"
                                    >
                                        <svg
                                            className="w-6 h-6 mx-auto text-slate-400 group-hover:text-white transition"
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
                                        <p className="text-sm font-medium text-slate-300 mt-2 group-hover:text-white">
                                            Pendaftaran
                                        </p>
                                    </Link>
                                    <Link
                                        href={route(
                                            "admin.study-programs.index",
                                        )}
                                        className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-center group"
                                    >
                                        <svg
                                            className="w-6 h-6 mx-auto text-slate-400 group-hover:text-white transition"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                            />
                                        </svg>
                                        <p className="text-sm font-medium text-slate-300 mt-2 group-hover:text-white">
                                            Program Studi
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Pendaftaran terbaru glassmorphism */}
                        {recentRegistrations &&
                            recentRegistrations.length > 0 && (
                                <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
                                    <div className="p-5 border-b border-white/10 flex items-center justify-between">
                                        <h4 className="font-semibold text-white">
                                            Pendaftaran Terbaru
                                        </h4>
                                        <Link
                                            href={route(
                                                "admin.registrations.index",
                                            )}
                                            className="text-sm text-emerald-400 hover:text-emerald-300 font-medium"
                                        >
                                            Lihat Semua →
                                        </Link>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-white/5">
                                                <tr>
                                                    <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase">
                                                        No. Daftar
                                                    </th>
                                                    <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase">
                                                        Nama
                                                    </th>
                                                    <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase">
                                                        Program Studi
                                                    </th>
                                                    <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase">
                                                        Status
                                                    </th>
                                                    <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase">
                                                        Tanggal
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {recentRegistrations.map(
                                                    (reg) => (
                                                        <tr
                                                            key={reg.id}
                                                            className="hover:bg-white/5 transition"
                                                        >
                                                            <td className="px-5 py-3 text-sm font-medium text-white">
                                                                {
                                                                    reg.registration_number
                                                                }
                                                            </td>
                                                            <td className="px-5 py-3 text-sm text-slate-300">
                                                                {reg.user
                                                                    .nama_identitas ||
                                                                    reg.user
                                                                        .name}
                                                            </td>
                                                            <td className="px-5 py-3 text-sm text-slate-300">
                                                                {
                                                                    reg
                                                                        .study_program
                                                                        .name
                                                                }
                                                            </td>
                                                            <td className="px-5 py-3">
                                                                {getStatusBadge(
                                                                    reg.status,
                                                                )}
                                                            </td>
                                                            <td className="px-5 py-3 text-sm text-slate-500">
                                                                {new Date(
                                                                    reg.created_at,
                                                                ).toLocaleDateString(
                                                                    "id-ID",
                                                                    {
                                                                        day: "numeric",
                                                                        month: "short",
                                                                        year: "numeric",
                                                                    },
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ),
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                        {/* State kosong */}
                        {(!recentRegistrations ||
                            recentRegistrations.length === 0) && (
                            <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl p-12 text-center">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                                    <svg
                                        className="w-8 h-8 text-slate-500"
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
                                <p className="mt-4 text-slate-400">
                                    Belum ada pendaftaran
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
