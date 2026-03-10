import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function StudyProgramCreate({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        name: '',
        faculty: '',
        level: 'S1',
        class_type: 'Regular',
        tuition_fee: '',
        quota: '',
        is_active: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.study-programs.store'));
    };

    const faculties = [
        'Fakultas Ilmu Komputer',
        'Fakultas Teknik',
        'Fakultas Ekonomi dan Bisnis',
        'Fakultas Kedokteran',
        'Fakultas Hukum',
        'Fakultas Ilmu Sosial dan Ilmu Politik',
        'Fakultas Psikologi',
        'Fakultas Matematika dan Ilmu Pengetahuan Alam',
        'Fakultas Ilmu Pengetahuan Budaya',
        'Fakultas Kesehatan Masyarakat',
        'Fakultas Farmasi',
        'Fakultas Kedokteran Gigi',
        'Fakultas Keperawatan',
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Tambah Program Studi
                    </h2>
                    <Link
                        href={route('admin.study-programs.index')}
                        className="text-sm text-blue-600 hover:text-blue-800"
                    >
                        ← Kembali
                    </Link>
                </div>
            }
        >
            <Head title="Tambah Program Studi" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-6">
                                {/* Code */}
                                <div>
                                    <InputLabel htmlFor="code" value="Kode Program Studi *" />
                                    <p className="text-xs text-gray-500 mb-2">Contoh: S1-TI-REG</p>
                                    <TextInput
                                        id="code"
                                        type="text"
                                        value={data.code}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('code', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.code} className="mt-2" />
                                </div>

                                {/* Name */}
                                <div>
                                    <InputLabel htmlFor="name" value="Nama Program Studi *" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                {/* Faculty */}
                                <div>
                                    <InputLabel htmlFor="faculty" value="Fakultas *" />
                                    <select
                                        id="faculty"
                                        value={data.faculty}
                                        onChange={(e) => setData('faculty', e.target.value)}
                                        className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        required
                                    >
                                        <option value="">-- Pilih Fakultas --</option>
                                        {faculties.map((faculty) => (
                                            <option key={faculty} value={faculty}>
                                                {faculty}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.faculty} className="mt-2" />
                                </div>

                                {/* Level & Class Type */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="level" value="Jenjang *" />
                                        <select
                                            id="level"
                                            value={data.level}
                                            onChange={(e) => setData('level', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            required
                                        >
                                            <option value="S1">S1</option>
                                            <option value="S2">S2</option>
                                            <option value="S3">S3</option>
                                            <option value="Profesi">Profesi</option>
                                            <option value="Spesialis">Spesialis</option>
                                        </select>
                                        <InputError message={errors.level} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="class_type" value="Tipe Kelas *" />
                                        <select
                                            id="class_type"
                                            value={data.class_type}
                                            onChange={(e) => setData('class_type', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            required
                                        >
                                            <option value="Regular">Regular</option>
                                            <option value="International">International</option>
                                            <option value="Extension">Extension</option>
                                        </select>
                                        <InputError message={errors.class_type} className="mt-2" />
                                    </div>
                                </div>

                                {/* Tuition Fee & Quota */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="tuition_fee" value="Biaya Pendidikan (Rp) *" />
                                        <TextInput
                                            id="tuition_fee"
                                            type="number"
                                            value={data.tuition_fee}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('tuition_fee', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.tuition_fee} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="quota" value="Kuota Mahasiswa *" />
                                        <TextInput
                                            id="quota"
                                            type="number"
                                            value={data.quota}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('quota', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.quota} className="mt-2" />
                                    </div>
                                </div>

                                {/* Active Status */}
                                <div>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.checked)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">
                                            Program studi aktif (dapat dipilih oleh pendaftar)
                                        </span>
                                    </label>
                                </div>

                                {/* Submit Buttons */}
                                <div className="flex justify-end space-x-3 pt-6 border-t">
                                    <Link
                                        href={route('admin.study-programs.index')}
                                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan'}
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