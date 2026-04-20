import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Penerimaan Mahasiswa Baru | Universitas Indonesia" />

            <div className="min-h-screen bg-white">
                // Navigasi minimal\n{" "}
                <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="flex justify-between items-center h-16">
                            // Logo UI fakultas\n{" "}
                            <Link href="/" className="flex items-center gap-3">
                                <img
                                    src="/images/logo-fakultas1.png"
                                    alt="Universitas Indonesia"
                                    className="h-12"
                                />
                            </Link>
                            {/* Simple Navigation - Functional */}
                            <div className="flex items-center gap-8">
                                <Link
                                    href="#beranda"
                                    className="text-sm text-gray-600 hover:text-[#005Ccc] transition-colors"
                                >
                                    Beranda
                                </Link>
                                <Link
                                    href="#informasi"
                                    className="text-sm text-gray-600 hover:text-[#005Ccc] transition-colors"
                                >
                                    Informasi
                                </Link>
                                <Link
                                    href="#kontak"
                                    className="text-sm text-gray-600 hover:text-[#005Ccc] transition-colors"
                                >
                                    Kontak
                                </Link>
                            </div>
                            {/* Auth Buttons - Minimal */}
                            <div className="flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={
                                            auth.user.role === "admin"
                                                ? route("admin.dashboard")
                                                : route("dashboard")
                                        }
                                        className="px-5 py-2 text-sm font-medium text-white bg-[#005Ccc] hover:bg-[#004ba0] rounded transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route("login")}
                                            className="text-sm font-medium text-gray-700 hover:text-[#005Ccc] transition-colors"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="px-5 py-2 text-sm font-medium text-white bg-[#005Ccc] hover:bg-[#004ba0] rounded transition-colors"
                                        >
                                            Daftar
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
                {/* Hero Section - Clean & Elegant */}
                <section
                    id="beranda"
                    className="relative bg-gradient-to-b from-blue-50/50 to-white"
                >
                    <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            {/* Left Content */}
                            <div className="max-w-xl">
                                {/* Badge */}
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#005Ccc]/10 text-[#005Ccc] text-xs font-medium rounded-full mb-6">
                                    <span className="w-2 h-2 bg-[#005Ccc] rounded-full animate-pulse"></span>
                                    Pendaftaran Dibuka untuk Tahun Ajaran
                                    2026/2027
                                </div>

                                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                                    Wujudkan Impian
                                    <br />
                                    <span className="text-[#005Ccc]">
                                        Kuliah di Universitas Indonesia
                                    </span>
                                </h1>

                                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                    Bergabunglah dengan komunitas akademik
                                    terbaik di Indonesia. Daftar sekarang
                                    melalui sistem penerimaan mahasiswa baru
                                    online kami.
                                </p>

                                {!auth.user && (
                                    <div className="flex flex-wrap gap-4">
                                        <Link
                                            href={route("register")}
                                            className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-[#005Ccc] hover:bg-[#004ba0] rounded transition-colors"
                                        >
                                            Daftar Sekarang
                                            <svg
                                                className="w-4 h-4 ml-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </Link>
                                        <Link
                                            href={route("login")}
                                            className="inline-flex items-center px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:border-[#005Ccc] hover:text-[#005Ccc] rounded transition-colors"
                                        >
                                            Sudah Punya Akun?
                                        </Link>
                                    </div>
                                )}

                                {/* Stats - Subtle */}
                                <div className="flex gap-12 pt-10 mt-10 border-t border-gray-200">
                                    <div>
                                        <p className="text-2xl font-bold text-[#005Ccc]">
                                            100+
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Program Studi
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-[#005Ccc]">
                                            47rb+
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Mahasiswa Aktif
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-[#005Ccc]">
                                            #1
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Universitas Terbaik Di Indonesia
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right - Clean Image */}
                            <div className="relative">
                                <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
                                    <img
                                        src="/images/bg-pmb.jpg"
                                        alt="Kampus Universitas Indonesia"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = "none";
                                        }}
                                    />
                                </div>
                                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded">
                                    <p className="text-xs font-medium text-gray-600">
                                        Kampus UI, Depok
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Info Section - Cara Pendaftaran */}
                <section id="informasi" className="py-20 bg-gray-50">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                Cara Pendaftaran
                            </h2>
                            <p className="text-gray-600">
                                Proses pendaftaran Universitas Indonesia terdiri
                                dari 9 tahap
                            </p>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 p-8">
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-[#005Ccc] text-white rounded-full flex items-center justify-center text-sm font-bold">
                                        1
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Membuat account di situs penerimaan
                                            UI
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Klik link Buat Account di kanan atas
                                            lalu isi formulir yang muncul
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-[#005Ccc] text-white rounded-full flex items-center justify-center text-sm font-bold">
                                        2
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Mengunggah foto berwarna ukuran 4x6
                                            cm
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Anda harus mengunggah foto sebelum
                                            dapat membuat pendaftaran
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-[#005Ccc] text-white rounded-full flex items-center justify-center text-sm font-bold">
                                        3
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Membuat pendaftaran
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Anda dapat login menggunakan
                                            username dan password Anda, lalu
                                            pilih menu Buat Pendaftaran untuk
                                            membuat pendaftaran baru.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-[#005Ccc] text-white rounded-full flex items-center justify-center text-sm font-bold">
                                        4
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Melakukan verifikasi pendaftaran
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Verifikasi dilakukan untuk
                                            memastikan Anda telah mengecek bahwa
                                            isian formulir pendaftaran dan
                                            pilihan program studi Anda telah
                                            terisi dengan data yang benar serta
                                            telah mengetahui biaya pendidikan
                                            untuk program studi yang dipilih
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-[#005Ccc] text-white rounded-full flex items-center justify-center text-sm font-bold">
                                        5
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Meng-upload berkas persyaratan
                                            pendaftaran
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Khusus untuk pendaftar Program
                                            Pascasarjana (S2, S3), Profesi,
                                            Spesialis, S1 Ekstensi dan yang
                                            memilih S1 Kelas Internasional
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-[#005Ccc] text-white rounded-full flex items-center justify-center text-sm font-bold">
                                        6
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Membayar biaya pendaftaran
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Biaya pendaftaran hanya dapat
                                            dibayarkan setelah Anda
                                            menyelesaikan semua tahapan
                                            pendaftaran di atas. Formulir
                                            pendaftaran dan pilihan program
                                            studi tidak dapat diubah lagi
                                            setelah Anda membayar biaya
                                            pendaftaran.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-[#005Ccc] text-white rounded-full flex items-center justify-center text-sm font-bold">
                                        7
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Meng-download kartu ujian masuk
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Kartu ini harus dibawa ketika ujian
                                            seleksi masuk
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-[#005Ccc] text-white rounded-full flex items-center justify-center text-sm font-bold">
                                        8
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Mengikuti ujian seleksi masuk pada
                                            waktu yang telah ditentukan
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Setelah mengikuti ujian seleksi
                                            masuk, Anda dapat melihat hasil
                                            seleksi pada tanggal pengumuman
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-[#005Ccc] text-white rounded-full flex items-center justify-center text-sm font-bold">
                                        9
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Melihat pengumuman hasil seleksi
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Setelah ujian seleksi masuk, Anda
                                            dapat melihat hasil seleksi pada
                                            tanggal pengumuman
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* CTA Section - Minimal */}
                {!auth.user && (
                    <section className="py-20 bg-[#FFDE21]">
                        <div className="max-w-4xl mx-auto px-6 text-center">
                            <h2 className="text-3xl font-bold text-black mb-4">
                                Siap Menjadi Bagian dari UI?
                            </h2>
                            <p className="text-black-100 mb-8 max-w-2xl mx-auto">
                                Daftar sekarang dan raih kesempatan untuk
                                menuntut ilmu di universitas terbaik Indonesia
                            </p>
                            <Link
                                href={route("register")}
                                className="inline-block px-8 py-3 text-sm font-medium text-black bg-white hover:bg-gray-50 rounded transition-colors"
                            >
                                Mulai Pendaftaran
                            </Link>
                        </div>
                    </section>
                )}
                {/* Footer - Light Background */}
                <footer id="kontak" className="bg-[#efefef] py-12">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Brand & Contact */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <img
                                        src="/images/logo-fakultas1.png"
                                        alt="UI"
                                        className="h-10"
                                    />
                                </div>

                                {/* Hubungi Kami */}
                                <h4 className="text-black-900 font-medium mb-3">
                                    Hubungi Kami
                                </h4>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>Telp: +62 (021) 7864126</li>
                                    <li>Email: penerimaan@ui.ac.id</li>
                                    <li>Kampus UI, Depok 16424</li>
                                </ul>
                            </div>

                            {/* Operasional */}
                            <div>
                                <h4 className="text-black-900 font-medium mb-3">
                                    Operasional
                                </h4>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>Jam Layanan :</li>
                                    <li>Senin - Jumat: 08.00 - 16.00 WIB</li>
                                    <li>(istirahat 12.00 - 13.00 WIB)</li>
                                </ul>

                                <div className="mt-6">
                                    <h4 className="text-black-900 font-medium mb-3">
                                        Official Web
                                    </h4>
                                    <ul className="space-y-2 text-sm">
                                        <li>
                                            <a
                                                href="https://ui.ac.id"
                                                className="text-gray-600 hover:text-[#005Ccc] transition-colors"
                                            >
                                                Website UI
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <br />
                        <div className="pt-4 px-4 sm:px-6 lg:px-8 text-center text-sm text-black">
                            © {new Date().getFullYear()} Universitas Indonesia.
                            For Educational Purposes Only
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
