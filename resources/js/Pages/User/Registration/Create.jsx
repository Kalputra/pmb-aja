import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react'; // Tambahkan Link di sini
import { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

export default function Create({ auth, studyPrograms }) {
    const { data, setData, post, processing, errors } = useForm({
        study_program_id: '',
        second_choice_id: '',
    });

    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [selectedSecondFaculty, setSelectedSecondFaculty] = useState('');

    const faculties = Object.keys(studyPrograms);

    const submit = (e) => {
        e.preventDefault();
        post(route('registration.store'));
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getSelectedProgram = (id) => {
        if (!id) return null;
        for (const faculty in studyPrograms) {
            const program = studyPrograms[faculty].find(p => p.id === parseInt(id));
            if (program) return program;
        }
        return null;
    };

    const firstChoice = getSelectedProgram(data.study_program_id);
    const secondChoice = getSelectedProgram(data.second_choice_id);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Buat Pendaftaran Baru</h2>}
        >
            <Head title="Buat Pendaftaran" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-gray-900">Formulir Pendaftaran</h3>
                                <p className="mt-1 text-sm text-gray-600">
                                    Silakan pilih program studi yang Anda minati. Anda dapat memilih hingga 2 program studi.
                                </p>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                {/* First Choice */}
                                <div className="border-b pb-6">
                                    <h4 className="text-md font-semibold text-gray-800 mb-4">Pilihan Pertama *</h4>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <InputLabel htmlFor="faculty_1" value="Fakultas" />
                                            <select
                                                id="faculty_1"
                                                className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                                value={selectedFaculty}
                                                onChange={(e) => {
                                                    setSelectedFaculty(e.target.value);
                                                    setData('study_program_id', '');
                                                }}
                                            >
                                                <option value="">-- Pilih Fakultas --</option>
                                                {faculties.map((faculty) => (
                                                    <option key={faculty} value={faculty}>
                                                        {faculty}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {selectedFaculty && (
                                            <div>
                                                <InputLabel htmlFor="study_program_id" value="Program Studi" />
                                                <select
                                                    id="study_program_id"
                                                    className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                                    value={data.study_program_id}
                                                    onChange={(e) => setData('study_program_id', e.target.value)}
                                                    required
                                                >
                                                    <option value="">-- Pilih Program Studi --</option>
                                                    {studyPrograms[selectedFaculty].map((program) => (
                                                        <option key={program.id} value={program.id}>
                                                            {program.name} - {program.class_type} ({program.level})
                                                        </option>
                                                    ))}
                                                </select>
                                                <InputError message={errors.study_program_id} className="mt-2" />
                                            </div>
                                        )}

                                        {firstChoice && (
                                            <div className="bg-blue-50 p-4 rounded-lg">
                                                <h5 className="font-semibold text-blue-900 mb-2">Detail Program Studi</h5>
                                                <dl className="space-y-1 text-sm">
                                                    <div className="flex justify-between">
                                                        <dt className="text-gray-600">Nama:</dt>
                                                        <dd className="font-medium">{firstChoice.name}</dd>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <dt className="text-gray-600">Fakultas:</dt>
                                                        <dd className="font-medium">{firstChoice.faculty}</dd>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <dt className="text-gray-600">Jenjang:</dt>
                                                        <dd className="font-medium">{firstChoice.level}</dd>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <dt className="text-gray-600">Kelas:</dt>
                                                        <dd className="font-medium">{firstChoice.class_type}</dd>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <dt className="text-gray-600">Kuota:</dt>
                                                        <dd className="font-medium">{firstChoice.quota} mahasiswa</dd>
                                                    </div>
                                                    <div className="flex justify-between pt-2 border-t border-blue-200">
                                                        <dt className="text-gray-600 font-semibold">Biaya Pendidikan:</dt>
                                                        <dd className="font-bold text-blue-900">{formatCurrency(firstChoice.tuition_fee)}</dd>
                                                    </div>
                                                </dl>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Second Choice */}
                                <div>
                                    <h4 className="text-md font-semibold text-gray-800 mb-4">Pilihan Kedua (Opsional)</h4>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <InputLabel htmlFor="faculty_2" value="Fakultas" />
                                            <select
                                                id="faculty_2"
                                                className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                                value={selectedSecondFaculty}
                                                onChange={(e) => {
                                                    setSelectedSecondFaculty(e.target.value);
                                                    setData('second_choice_id', '');
                                                }}
                                            >
                                                <option value="">-- Pilih Fakultas --</option>
                                                {faculties.map((faculty) => (
                                                    <option key={faculty} value={faculty}>
                                                        {faculty}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {selectedSecondFaculty && (
                                            <div>
                                                <InputLabel htmlFor="second_choice_id" value="Program Studi" />
                                                <select
                                                    id="second_choice_id"
                                                    className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                                    value={data.second_choice_id}
                                                    onChange={(e) => setData('second_choice_id', e.target.value)}
                                                >
                                                    <option value="">-- Pilih Program Studi --</option>
                                                    {studyPrograms[selectedSecondFaculty]
                                                        .filter(p => p.id !== parseInt(data.study_program_id))
                                                        .map((program) => (
                                                            <option key={program.id} value={program.id}>
                                                                {program.name} - {program.class_type} ({program.level})
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                                <InputError message={errors.second_choice_id} className="mt-2" />
                                            </div>
                                        )}

                                        {secondChoice && (
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h5 className="font-semibold text-gray-900 mb-2">Detail Program Studi</h5>
                                                <dl className="space-y-1 text-sm">
                                                    <div className="flex justify-between">
                                                        <dt className="text-gray-600">Nama:</dt>
                                                        <dd className="font-medium">{secondChoice.name}</dd>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <dt className="text-gray-600">Fakultas:</dt>
                                                        <dd className="font-medium">{secondChoice.faculty}</dd>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <dt className="text-gray-600">Jenjang:</dt>
                                                        <dd className="font-medium">{secondChoice.level}</dd>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <dt className="text-gray-600">Kelas:</dt>
                                                        <dd className="font-medium">{secondChoice.class_type}</dd>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <dt className="text-gray-600">Kuota:</dt>
                                                        <dd className="font-medium">{secondChoice.quota} mahasiswa</dd>
                                                    </div>
                                                    <div className="flex justify-between pt-2 border-t border-gray-200">
                                                        <dt className="text-gray-600 font-semibold">Biaya Pendidikan:</dt>
                                                        <dd className="font-bold text-gray-900">{formatCurrency(secondChoice.tuition_fee)}</dd>
                                                    </div>
                                                </dl>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-yellow-700">
                                                <strong>Penting:</strong> Pastikan pilihan sudah benar. Pilihan tidak dapat diubah setelah melakukan verifikasi.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Buttons - FIXED SECTION */}
                                <div className="flex justify-end space-x-3 pt-6 border-t">
                                    <Link
                                        href={route('dashboard')}
                                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing || !data.study_program_id}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                                    >
                                        {processing ? 'Memproses...' : 'Simpan Pendaftaran'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}