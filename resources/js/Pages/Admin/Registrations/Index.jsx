import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function RegistrationsIndex({ auth, registrations }) {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    // Biar search-nya delay dikit biar nggak sering render
    const [debouncedSearch, setDebouncedSearch] = useState("");

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
                className={`px-3 py-1 rounded-full text-xs font-semibold ${badges[status]}`}
            >
                {labels[status]}
            </span>
        );
    };

    // Biar search-nya delay dikit biar nggak sering render
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("admin.registrations.index"), {
            search: debouncedSearch,
            status: statusFilter,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Manajemen Pendaftaran
                    </h2>
                </div>
            }
        >
            <Head title="Manajemen Pendaftaran" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Filters */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form
                                onSubmit={handleSearch}
                                className="flex flex-col md:flex-row gap-4"
                            >
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="Cari berdasarkan nama atau nomor pendaftaran..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    />
                                </div>
                                <div className="w-full md:w-48">
                                    <select
                                        value={statusFilter}
                                        onChange={(e) =>
                                            setStatusFilter(e.target.value)
                                        }
                                        className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    >
                                        <option value="">Semua Status</option>
                                        <option value="draft">Draft</option>
                                        <option value="verified">
                                            Terverifikasi
                                        </option>
                                        <option value="documents_uploaded">
                                            Dokumen Terupload
                                        </option>
                                        <option value="paid">
                                            Sudah Bayar
                                        </option>
                                        <option value="exam_card_generated">
                                            Kartu Ujian Tersedia
                                        </option>
                                        <option value="exam_completed">
                                            Ujian Selesai
                                        </option>
                                        <option value="accepted">
                                            Diterima
                                        </option>
                                        <option value="rejected">
                                            Ditolak
                                        </option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                                >
                                    Cari
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Registrations Table */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Daftar Pendaftaran ({registrations.total})
                            </h3>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                No. Pendaftaran
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nama Mahasiswa
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Program Studi
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Pembayaran
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tanggal
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {registrations.data.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan="7"
                                                    className="px-6 py-12 text-center text-gray-500"
                                                >
                                                    <svg
                                                        className="mx-auto h-12 w-12 text-gray-400"
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
                                                    <p className="mt-2">
                                                        Tidak ada data
                                                        pendaftaran
                                                    </p>
                                                </td>
                                            </tr>
                                        ) : (
                                            registrations.data.map((reg) => (
                                                <tr
                                                    key={reg.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {
                                                                reg.registration_number
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {reg.user
                                                                .nama_identitas ||
                                                                reg.user.name}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {reg.user.email}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-900">
                                                            {
                                                                reg
                                                                    .study_program
                                                                    .name
                                                            }
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {
                                                                reg
                                                                    .study_program
                                                                    .faculty
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {reg.payment ? (
                                                            <span
                                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                                    reg.payment
                                                                        .status ===
                                                                    "paid"
                                                                        ? "bg-green-100 text-green-800"
                                                                        : reg
                                                                                .payment
                                                                                .status ===
                                                                            "pending"
                                                                          ? "bg-yellow-100 text-yellow-800"
                                                                          : "bg-red-100 text-red-800"
                                                                }`}
                                                            >
                                                                {reg.payment
                                                                    .status ===
                                                                    "paid" &&
                                                                    "✓ Lunas"}
                                                                {reg.payment
                                                                    .status ===
                                                                    "pending" &&
                                                                    "⏳ Pending"}
                                                                {reg.payment
                                                                    .status ===
                                                                    "cancelled" &&
                                                                    "✗ Ditolak"}
                                                            </span>
                                                        ) : (
                                                            <span className="text-xs text-gray-400">
                                                                Belum bayar
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {getStatusBadge(
                                                            reg.status,
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(
                                                            reg.created_at,
                                                        ).toLocaleDateString(
                                                            "id-ID",
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <Link
                                                            href={route(
                                                                "admin.registrations.show",
                                                                reg.id,
                                                            )}
                                                            className="text-blue-600 hover:text-blue-900 font-medium"
                                                        >
                                                            Detail
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {registrations.last_page > 1 && (
                                <div className="mt-6 flex items-center justify-between">
                                    <div className="text-sm text-gray-700">
                                        Menampilkan {registrations.from} -{" "}
                                        {registrations.to} dari{" "}
                                        {registrations.total} data
                                    </div>
                                    <div className="flex space-x-2">
                                        {registrations.links.map(
                                            (link, index) => (
                                                <Link
                                                    key={index}
                                                    href={link.url || "#"}
                                                    className={`px-3 py-2 text-sm rounded-lg ${
                                                        link.active
                                                            ? "bg-blue-600 text-white font-semibold"
                                                            : link.url
                                                              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                    }`}
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            ),
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
