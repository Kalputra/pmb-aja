import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <>
            <Head title="Login - PMB UI" />

            <div className="min-h-screen flex items-center justify-center p-4 relative">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/images/bg-pmb.jpg')" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400/80 via-pink-500/80 to-purple-600/80 backdrop-blur-sm"></div>
                </div>

                <div className="w-full max-w-md relative z-10">
                    <div className="bg-white rounded-2xl shadow-2xl p-8">
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
                                Sistem Penerimaan Mahasiswa Baru
                            </h1>
                            <p className="text-gray-600 text-sm mt-2">
                                Silakan login ke dalam akun
                            </p>
                        </div>

                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600 bg-green-50 p-3 rounded-lg">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-4">
                            {/* Username */}
                            <div>
                                <InputLabel
                                    htmlFor="username"
                                    value="Username"
                                    className="text-gray-700 font-medium text-sm"
                                />
                                <TextInput
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={data.username}
                                    className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("username", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.username}
                                    className="mt-2"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                    className="text-gray-700 font-medium text-sm"
                                />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            {/* Remember & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked,
                                            )
                                        }
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ms-2 text-sm text-gray-600">
                                        Ingat saya
                                    </span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="text-sm text-blue-600 hover:text-blue-700"
                                    >
                                        Lupa password?
                                    </Link>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? "Loading..." : "SIGN IN"}
                            </button>

                            {/* Register Link */}
                            <div className="text-center mt-6">
                                <span className="text-gray-600 text-sm">
                                    Belum punya akun?{" "}
                                </span>
                                <Link
                                    href={route("register")}
                                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                                >
                                    Daftar disini
                                </Link>
                            </div>
                        </form>
                    </div>

                    {/* Footer */}
                    <br />
                    <div className="pt-4 px-4 sm:px-6 lg:px-8 text-center text-sm text-white">
                        © {new Date().getFullYear()} Universitas Indonesia. For
                        Educational Purposes Only
                    </div>
                </div>
            </div>
        </>
    );
}
