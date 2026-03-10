import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const isAdmin = user.role === "admin";

    // User Navigation Items
    const userNavItems = [
        {
            name: "Dashboard",
            href: route("dashboard"),
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                </svg>
            ),
            current: route().current("dashboard"),
        },
    ];

    // Admin Navigation Items
    const adminNavItems = [
        {
            name: "Dashboard",
            href: route("admin.dashboard"),
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
                    />
                </svg>
            ),
            current: route().current("admin.dashboard"),
        },
        {
            name: "Pendaftaran",
            href: route("admin.registrations.index"),
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>
            ),
            current: route().current("admin.registrations.*"),
        },
        {
            name: "Program Studi",
            href: route("admin.study-programs.index"),
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                </svg>
            ),
            current: route().current("admin.study-programs.*"),
        },
    ];

    const navItems = isAdmin ? adminNavItems : userNavItems;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar - Desktop */}
            <div
                className={`hidden md:fixed md:inset-y-0 md:flex md:flex-col transition-all duration-300 ease-in-out z-30 ${
                    isHovered ? "md:w-64" : "md:w-20"
                }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="flex flex-col flex-grow bg-white border-r border-gray-200 overflow-hidden shadow-lg">
                    {/* Logo Section */}
                    <div className="flex items-center flex-shrink-0 px-4 py-6 border-b border-gray-200">
                        <Link
                            href="/"
                            className="flex items-center space-x-3 group"
                        >
                            <div className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 flex-shrink-0">
                                <img
                                    src="/images/ui-logo.png"
                                    alt="UI Logo"
                                    className="w-6 h-6"
                                />
                            </div>
                            <div
                                className={`transition-all duration-300 ${isHovered ? "opacity-100 w-auto" : "opacity-0 w-0"} overflow-hidden`}
                            >
                                <h1 className="text-lg font-bold text-gray-900 whitespace-nowrap">
                                    PMB UI
                                </h1>
                                <p className="text-xs text-gray-500 whitespace-nowrap">
                                    Universitas Indonesia
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 group ${
                                    item.current
                                        ? "bg-blue-50 text-blue-700 shadow-sm"
                                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                }`}
                            >
                                <span
                                    className={`flex-shrink-0 ${item.current ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700"}`}
                                >
                                    {item.icon}
                                </span>
                                <span
                                    className={`ml-3 transition-all duration-300 ${isHovered ? "opacity-100 w-auto" : "opacity-0 w-0"} overflow-hidden whitespace-nowrap`}
                                >
                                    {item.name}
                                </span>
                                {item.current && isHovered && (
                                    <span className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></span>
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Bottom Menu */}
                    <div className="flex-shrink-0 px-3 py-4 space-y-1 border-t border-gray-200">
                        {/* User Info */}
                        <div
                            className={`px-3 py-3 bg-gray-50 rounded-lg mb-2 transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0 h-0 py-0"} overflow-hidden`}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-900 truncate">
                                        {user.nama_identitas || user.name}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {isAdmin
                                            ? "Administrator"
                                            : "Mahasiswa"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Collapsed User Avatar */}
                        {!isHovered && (
                            <div className="flex justify-center mb-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            </div>
                        )}

                        <Link
                            href={route("profile.edit")}
                            className="flex items-center px-3 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
                        >
                            <svg
                                className="w-5 h-5 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            <span
                                className={`ml-3 transition-all duration-300 ${isHovered ? "opacity-100 w-auto" : "opacity-0 w-0"} overflow-hidden whitespace-nowrap`}
                            >
                                Profile
                            </span>
                        </Link>
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="flex items-center w-full px-3 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 hover:text-red-700 transition-all duration-200"
                        >
                            <svg
                                className="w-5 h-5 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                            <span
                                className={`ml-3 transition-all duration-300 ${isHovered ? "opacity-100 w-auto" : "opacity-0 w-0"} overflow-hidden whitespace-nowrap`}
                            >
                                Logout
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className="md:hidden">
                {/* Mobile Top Bar */}
                <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-30">
                    <div className="flex items-center justify-between px-4 py-3">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                                <img
                                    src="/images/ui-logo.png"
                                    alt="UI Logo"
                                    className="w-6 h-6"
                                />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-gray-900">
                                    PMB UI
                                </h1>
                                <p className="text-xs text-gray-500 -mt-1">
                                    Universitas Indonesia
                                </p>
                            </div>
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {sidebarOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Sidebar Overlay */}
                {sidebarOpen && (
                    <>
                        <div
                            className="fixed inset-0 bg-black/50 z-40"
                            onClick={() => setSidebarOpen(false)}
                        />
                        <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300">
                            <div className="flex flex-col h-full">
                                {/* Mobile Logo */}
                                <div className="flex items-center px-6 py-6 border-b border-gray-200 mt-16">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                                        <img
                                            src="/images/logo-fakultas1.png"
                                            alt="UI Logo"
                                            className="w-8 h-8"
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <h1 className="text-lg font-bold text-gray-900">
                                            PMB UI
                                        </h1>
                                        <p className="text-xs text-gray-500">
                                            Universitas Indonesia
                                        </p>
                                    </div>
                                </div>

                                {/* Mobile Navigation */}
                                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() =>
                                                setSidebarOpen(false)
                                            }
                                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                                                item.current
                                                    ? "bg-blue-50 text-blue-700 shadow-sm"
                                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            }`}
                                        >
                                            {item.icon}
                                            <span className="ml-3">
                                                {item.name}
                                            </span>
                                        </Link>
                                    ))}
                                </nav>

                                {/* Mobile Bottom Menu */}
                                <div className="px-4 py-4 space-y-1 border-t border-gray-200">
                                    {/* User Info - Mobile */}
                                    <div className="px-4 py-3 bg-gray-50 rounded-lg mb-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                                                {user.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-gray-900 truncate">
                                                    {user.nama_identitas ||
                                                        user.name}
                                                </p>
                                                <p className="text-xs text-gray-500 truncate">
                                                    {isAdmin
                                                        ? "Administrator"
                                                        : "Mahasiswa"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <Link
                                        href={route("profile.edit")}
                                        onClick={() => setSidebarOpen(false)}
                                        className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                        <span className="ml-3">Profile</span>
                                    </Link>
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        onClick={() => setSidebarOpen(false)}
                                        className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 hover:text-red-700"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                            />
                                        </svg>
                                        <span className="ml-3">Logout</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Main Content */}
            <div
                className={`transition-all duration-300 ease-in-out ${isHovered ? "md:pl-64" : "md:pl-20"}`}
            >
                {/* Top spacing for mobile */}
                <div className="md:hidden h-16"></div>

                {/* Page Header */}
                {header && (
                    <header className="bg-white shadow-sm sticky top-0 md:top-0 z-20 border-b border-gray-200">
                        <div className="px-4 py-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                {/* Main Content */}
                <main className="flex-1 bg-gray-50">{children}</main>

                {/* Footer */}
                <footer className="bg-white border-t border-gray-200 py-4">
                    <div className="px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
                        © {new Date().getFullYear()} Universitas Indonesia. For
                        Educational Purposes Only
                    </div>
                </footer>
            </div>
        </div>
    );
}
