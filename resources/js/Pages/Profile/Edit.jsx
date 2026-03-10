import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Pengaturan Profile
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Kelola informasi akun dan keamanan Anda
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Profile" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* User Info Card */}
                    <div className="mb-8 overflow-hidden bg-yellow-400 rounded-lg shadow-sm">
                        <div className="px-6 py-8 sm:px-8">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl">
                                        {auth.user.photo ? (
                                            <img
                                                src={`/${auth.user.photo}`}
                                                alt="Profile"
                                                className="w-24 h-24 rounded-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-4xl font-bold text-blue-600">
                                                {auth.user.name.charAt(0).toUpperCase()}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* User Details */}
                                <div className="flex-1 text-center sm:text-left">
                                    <h3 className="text-2xl font-bold text-white">
                                        {auth.user.nama_identitas || auth.user.name}
                                    </h3>
                                    <p className="mt-1 text-blue-100">
                                        {auth.user.email}
                                    </p>
                                    <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                            {auth.user.role === 'admin' ? 'Administrator' : 'Mahasiswa'}
                                        </span>
                                        {auth.user.username && (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                                                </svg>
                                                @{auth.user.username}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Settings Sections */}
                    <div className="space-y-6">
                        {/* Profile Information */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-gray-200">
                            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Informasi Profile
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Update informasi akun dan email Anda
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 sm:p-8">
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                    className="max-w-2xl"
                                />
                            </div>
                        </div>

                        {/* Update Password */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-gray-200">
                            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Keamanan Password
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Pastikan akun Anda menggunakan password yang kuat
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 sm:p-8">
                                <UpdatePasswordForm className="max-w-2xl" />
                            </div>
                        </div>

                        {/* Delete Account */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-red-200">
                            <div className="border-b border-red-200 bg-red-50 px-6 py-4">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Hapus Akun
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Hapus akun Anda secara permanen
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 sm:p-8">
                                <DeleteUserForm className="max-w-2xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}