import { useEffect, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const [step, setStep] = useState(1);
    const [passwordError, setPasswordError] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        // Login
        username: "",
        password: "",
        password_confirmation: "",

        // Identitas
        nama_identitas: "",
        nama_ijazah: "",
        jenis_identitas: "KTP",
        nomor_identitas: "",
        kewarganegaraan: "Indonesia",
        jenis_kelamin: "Pria",
        tanggal_lahir: "",

        // Kontak
        alamat_tetap: "",
        negara: "Indonesia",
        provinsi: "",
        kabupaten: "",
        alamat_saat_ini: "",
        no_telepon: "",
        no_hp: "",
        email: "",
        email_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("register"));
    };

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const isStep1Valid = () => {
        return (
            data.username &&
            data.password &&
            data.password_confirmation &&
            !passwordError
        );
    };

    const isStep2Valid = () => {
        return (
            data.nama_identitas &&
            data.nama_ijazah &&
            data.jenis_identitas &&
            data.nomor_identitas &&
            data.jenis_kelamin &&
            data.tanggal_lahir
        );
    };

    const isStep3Valid = () => {
        return (
            data.alamat_tetap &&
            data.provinsi &&
            data.kabupaten &&
            data.alamat_saat_ini &&
            data.no_telepon &&
            data.email &&
            data.email_confirmation
        );
    };

    const provinces = [
        "Aceh",
        "Bali",
        "Banten",
        "Bengkulu",
        "DI Yogyakarta",
        "DKI Jakarta",
        "Gorontalo",
        "Jambi",
        "Jawa Barat",
        "Jawa Tengah",
        "Jawa Timur",
        "Kalimantan Barat",
        "Kalimantan Selatan",
        "Kalimantan Tengah",
        "Kalimantan Timur",
        "Kalimantan Utara",
        "Kepulauan Bangka Belitung",
        "Kepulauan Riau",
        "Lampung",
        "Maluku",
        "Maluku Utara",
        "Nusa Tenggara Barat",
        "Nusa Tenggara Timur",
        "Papua",
        "Papua Barat",
        "Riau",
        "Sulawesi Barat",
        "Sulawesi Selatan",
        "Sulawesi Tengah",
        "Sulawesi Tenggara",
        "Sulawesi Utara",
        "Sumatera Barat",
        "Sumatera Selatan",
        "Sumatera Utara",
    ];

    return (
        <>
            <Head title="Registrasi - PMB UI" />

            {/* Outer container with background */}
            <div className="min-h-screen flex items-center justify-center p-4 relative">
                {/* Background Image Layer */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/images/bg-pmb.jpg')" }}
                >
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400/80 via-pink-500/80 to-purple-600/80 backdrop-blur-sm"></div>
                </div>

                {/* Content */}
                <div className="w-full max-w-2xl relative z-10">
                    <div className="bg-white rounded-2xl shadow-2xl p-8">
                        {/* Logo & Header */}
                        <div className="text-center mb-8">
                            <div className="flex justify-center mb-4">
                                <img
                                    src="/images/ui-logo.png"
                                    alt="Logo UI"
                                    className="w-24 h-24 object-contain"
                                />
                            </div>
                            <div className="mb-2">
                                <p className="text-sm text-gray-600 font-medium">
                                    UNIVERSITAS
                                </p>
                                <p className="text-2xl font-bold text-gray-800">
                                    INDONESIA
                                </p>
                            </div>
                            <h1 className="text-xl font-bold text-gray-800 mt-4">
                                Registrasi Mahasiswa Baru
                            </h1>
                            <p className="text-gray-600 text-sm mt-2">
                                Silakan lengkapi data pendaftaran
                            </p>
                        </div>

                        {/* Progress Indicator */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center">
                                <div
                                    className={`flex items-center ${step >= 1 ? "text-blue-600" : "text-gray-400"}`}
                                >
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                                    >
                                        1
                                    </div>
                                    <span className="ml-2 text-sm font-medium hidden sm:inline">
                                        Login
                                    </span>
                                </div>
                                <div className="flex-1 h-1 mx-2 bg-gray-200">
                                    <div
                                        className={`h-full ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`}
                                        style={{
                                            width: step >= 2 ? "100%" : "0%",
                                            transition: "width 0.3s",
                                        }}
                                    ></div>
                                </div>
                                <div
                                    className={`flex items-center ${step >= 2 ? "text-blue-600" : "text-gray-400"}`}
                                >
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                                    >
                                        2
                                    </div>
                                    <span className="ml-2 text-sm font-medium hidden sm:inline">
                                        Identitas
                                    </span>
                                </div>
                                <div className="flex-1 h-1 mx-2 bg-gray-200">
                                    <div
                                        className={`h-full ${step >= 3 ? "bg-blue-600" : "bg-gray-200"}`}
                                        style={{
                                            width: step >= 3 ? "100%" : "0%",
                                            transition: "width 0.3s",
                                        }}
                                    ></div>
                                </div>
                                <div
                                    className={`flex items-center ${step >= 3 ? "text-blue-600" : "text-gray-400"}`}
                                >
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                                    >
                                        3
                                    </div>
                                    <span className="ml-2 text-sm font-medium hidden sm:inline">
                                        Kontak
                                    </span>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            {/* STEP 1: Login Info */}
                            {step === 1 && (
                                <div className="space-y-4">
                                    <h2 className="text-lg font-bold text-gray-800 mb-4">
                                        Informasi Login
                                    </h2>

                                    <div>
                                        <InputLabel
                                            htmlFor="username"
                                            value="Username *"
                                            className="text-gray-700 font-medium text-sm"
                                        />
                                        <p className="text-xs text-gray-500 mb-1">
                                            Username hanya dapat terdiri dari
                                            huruf, angka, dan _{" "}
                                        </p>
                                        <TextInput
                                            id="username"
                                            type="text"
                                            value={data.username}
                                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            onChange={(e) =>
                                                setData(
                                                    "username",
                                                    e.target.value,
                                                )
                                            }
                                            required
                                            placeholder="Contoh: budi_tarmiji123"
                                        />
                                        <InputError
                                            message={errors.username}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="password"
                                            value="Password *"
                                            className="text-gray-700 font-medium text-sm"
                                        />
                                        <TextInput
                                            id="password"
                                            type="password"
                                            value={data.password}
                                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            onChange={(e) => {
                                                setData(
                                                    "password",
                                                    e.target.value,
                                                );
                                                if (e.target.value.length < 8) {
                                                    setPasswordError(
                                                        "Password harus minimal 8 karakter",
                                                    );
                                                } else {
                                                    setPasswordError(null);
                                                }
                                            }}
                                            required
                                            placeholder="Minimal 8 karakter dan satu karakter khusus"
                                        />
                                        <InputError
                                            message={errors.password}
                                            className="mt-2"
                                        />
                                        <InputError
                                            message={passwordError}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="password_confirmation"
                                            value="Ulangi Password *"
                                            className="text-gray-700 font-medium text-sm"
                                        />
                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            value={data.password_confirmation}
                                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value,
                                                )
                                            }
                                            required
                                            placeholder="Masukkan kembali password"
                                        />
                                        <InputError
                                            message={
                                                errors.password_confirmation
                                            }
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex justify-end mt-6">
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            disabled={!isStep1Valid()}
                                            className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Selanjutnya
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* STEP 2: Identitas */}
                            {step === 2 && (
                                <div className="space-y-4">
                                    <h2 className="text-lg font-bold text-gray-800 mb-4">
                                        Data Identitas
                                    </h2>

                                    <div>
                                        <InputLabel
                                            htmlFor="nama_identitas"
                                            value="Nama sesuai identitas *"
                                            className="text-gray-700 font-medium text-sm"
                                        />
                                        <p className="text-xs text-gray-500 mb-1">
                                            Nama diawali huruf besar, contoh:
                                            Budi Santoso
                                        </p>
                                        <TextInput
                                            id="nama_identitas"
                                            type="text"
                                            value={data.nama_identitas}
                                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            onChange={(e) =>
                                                setData(
                                                    "nama_identitas",
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.nama_identitas}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="nama_ijazah"
                                            value="Nama sesuai ijazah *"
                                            className="text-gray-700 font-medium text-sm"
                                        />
                                        <TextInput
                                            id="nama_ijazah"
                                            type="text"
                                            value={data.nama_ijazah}
                                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            onChange={(e) =>
                                                setData(
                                                    "nama_ijazah",
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.nama_ijazah}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="jenis_identitas"
                                            value="Jenis identitas *"
                                            className="text-gray-700 font-medium text-sm"
                                        />
                                        <select
                                            id="jenis_identitas"
                                            value={data.jenis_identitas}
                                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            onChange={(e) =>
                                                setData(
                                                    "jenis_identitas",
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        >
                                            <option value="KTP">KTP</option>
                                            <option value="SIM">SIM</option>
                                            <option value="Paspor">
                                                Paspor
                                            </option>
                                            <option value="Kartu Pelajar">
                                                Kartu Pelajar (Berfoto)
                                            </option>
                                        </select>
                                        <InputError
                                            message={errors.jenis_identitas}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="nomor_identitas"
                                            value="Nomor identitas *"
                                            className="text-gray-700 font-medium text-sm"
                                        />
                                        <TextInput
                                            id="nomor_identitas"
                                            type="text"
                                            value={data.nomor_identitas}
                                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            onChange={(e) =>
                                                setData(
                                                    "nomor_identitas",
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.nomor_identitas}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="jenis_kelamin"
                                            value="Jenis kelamin *"
                                            className="text-gray-700 font-medium text-sm"
                                        />
                                        <div className="mt-2 flex space-x-4">
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    value="Pria"
                                                    checked={
                                                        data.jenis_kelamin ===
                                                        "Pria"
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "jenis_kelamin",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="ml-2 text-gray-700">
                                                    Pria
                                                </span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    value="Wanita"
                                                    checked={
                                                        data.jenis_kelamin ===
                                                        "Wanita"
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "jenis_kelamin",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="ml-2 text-gray-700">
                                                    Wanita
                                                </span>
                                            </label>
                                        </div>
                                        <InputError
                                            message={errors.jenis_kelamin}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="tanggal_lahir"
                                            value="Tanggal lahir *"
                                            className="text-gray-700 font-medium text-sm"
                                        />
                                        <TextInput
                                            id="tanggal_lahir"
                                            type="date"
                                            value={data.tanggal_lahir}
                                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            onChange={(e) =>
                                                setData(
                                                    "tanggal_lahir",
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.tanggal_lahir}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex justify-between mt-6">
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-400 focus:outline-none transition-all"
                                        >
                                            Kembali
                                        </button>
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            disabled={!isStep2Valid()}
                                            className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Selanjutnya
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: Kontak */}
                            {step === 3 && (
                                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                                    <h2 className="text-lg font-bold text-gray-800 mb-4">
                                        Data Kontak
                                    </h2>

                                    <div>
                                        <InputLabel
                                            htmlFor="alamat_tetap"
                                            value="Alamat tetap *"
                                            className="text-gray-700 font-medium text-sm"
                                        />
                                        <textarea
                                            id="alamat_tetap"
                                            value={data.alamat_tetap}
                                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            onChange={(e) =>
                                                setData(
                                                    "alamat_tetap",
                                                    e.target.value,
                                                )
                                            }
                                            rows="2"
                                            required
                                        />
                                        <InputError
                                            message={errors.alamat_tetap}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="provinsi"
                                            value="Provinsi *"
                                            className="text-gray-700 font-medium text-sm"
                                        />
                                        <select
                                            id="provinsi"
                                            value={data.provinsi}
                                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            onChange={(e) =>
                                                setData(
                                                    "provinsi",
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        >
                                            <option value="">
                                                --- Pilih ---
                                            </option>
                                            {provinces.map((prov) => (
                                                <option key={prov} value={prov}>
                                                    {prov}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.provinsi}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="kabupaten"
                                            value="Kabupaten/Kotamadya *"
                                            className="text-gray-700 font-medium text-sm"
                                        />
                                        <TextInput
                                            id="kabupaten"
                                            type="text"
                                            value={data.kabupaten}
                                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            onChange={(e) =>
                                                setData(
                                                    "kabupaten",
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.kabupaten}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="alamat_saat_ini"
                                            value="Alamat saat ini *"
                                            className="text-gray-700 font-medium text-sm"
                                        />
                                        <textarea
                                            id="alamat_saat_ini"
                                            value={data.alamat_saat_ini}
                                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            onChange={(e) =>
                                                setData(
                                                    "alamat_saat_ini",
                                                    e.target.value,
                                                )
                                            }
                                            rows="2"
                                            required
                                        />
                                        <InputError
                                            message={errors.alamat_saat_ini}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="no_telepon"
                                            value="No. telepon *"
                                            className="text-gray-700 font-medium text-sm"
                                        />
                                        <p className="text-xs text-gray-500 mb-1">
                                            Pisahkan dengan koma jika ada
                                            beberapa nomor
                                        </p>
                                        <TextInput
                                            id="no_telepon"
                                            type="text"
                                            value={data.no_telepon}
                                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            onChange={(e) =>
                                                setData(
                                                    "no_telepon",
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.no_telepon}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="no_hp"
                                            value="No. H.P."
                                            className="text-gray-700 font-medium text-sm"
                                        />
                                        <TextInput
                                            id="no_hp"
                                            type="text"
                                            value={data.no_hp}
                                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            onChange={(e) =>
                                                setData("no_hp", e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.no_hp}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="email"
                                            value="Email *"
                                            className="text-gray-700 font-medium text-sm"
                                        />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.email}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="email_confirmation"
                                            value="Ulangi email *"
                                            className="text-gray-700 font-medium text-sm"
                                        />
                                        <TextInput
                                            id="email_confirmation"
                                            type="email"
                                            value={data.email_confirmation}
                                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            onChange={(e) =>
                                                setData(
                                                    "email_confirmation",
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.email_confirmation}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex justify-between mt-6 pt-4">
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-400 focus:outline-none transition-all"
                                        >
                                            Kembali
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={
                                                processing || !isStep3Valid()
                                            }
                                            className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all disabled:opacity-50"
                                        >
                                            {processing
                                                ? "Memproses..."
                                                : "DAFTAR"}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>

                        {/* Login Link */}
                        <div className="text-center mt-6 pt-4 border-t">
                            <span className="text-gray-600 text-sm">
                                Sudah punya akun?{" "}
                            </span>
                            <Link
                                href={route("login")}
                                className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                            >
                                Login di sini
                            </Link>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
