import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Payment({ auth, registration, payment }) {
    const [selectedMethod, setSelectedMethod] = useState('bank_transfer');
    const [proofFile, setProofFile] = useState(null);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleCreatePayment = () => {
        router.post(route('registration.create-payment', registration.id), {
            payment_method: selectedMethod,
        });
    };

    const handleUploadProof = (e) => {
        e.preventDefault();
        if (!proofFile) {
            alert('Pilih file bukti pembayaran!');
            return;
        }

        const formData = new FormData();
        formData.append('payment_proof', proofFile);

        router.post(route('registration.upload-payment-proof', registration.id), formData, {
            onSuccess: () => {
                setProofFile(null);
                alert('Bukti pembayaran berhasil diupload!');
            },
        });
    };

    const registrationFee = 300000; // Biaya pendaftaran 300rb

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Pembayaran Pendaftaran
                    </h2>
                    <Link
                        href={route('registration.show', registration.id)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                    >
                        ← Kembali
                    </Link>
                </div>
            }
        >
            <Head title="Pembayaran" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Info Pendaftaran */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Informasi Pendaftaran</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Nomor Pendaftaran</p>
                                    <p className="font-semibold text-gray-900">{registration.registration_number}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Program Studi</p>
                                    <p className="font-semibold text-gray-900">{registration.study_program.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Biaya Pendaftaran</p>
                                    <p className="font-bold text-blue-900 text-xl">{formatCurrency(registrationFee)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Status */}
                    {!payment ? (
                        /* Create Payment */
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Pilih Metode Pembayaran</h3>
                                
                                <div className="space-y-3 mb-6">
                                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            value="bank_transfer"
                                            checked={selectedMethod === 'bank_transfer'}
                                            onChange={(e) => setSelectedMethod(e.target.value)}
                                            className="text-blue-600 focus:ring-blue-500"
                                        />
                                        <div className="ml-3">
                                            <p className="font-semibold text-gray-900">Transfer Bank</p>
                                            <p className="text-sm text-gray-600">BCA, Mandiri, BNI, BRI</p>
                                        </div>
                                    </label>

                                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            value="virtual_account"
                                            checked={selectedMethod === 'virtual_account'}
                                            onChange={(e) => setSelectedMethod(e.target.value)}
                                            className="text-blue-600 focus:ring-blue-500"
                                        />
                                        <div className="ml-3">
                                            <p className="font-semibold text-gray-900">Virtual Account</p>
                                            <p className="text-sm text-gray-600">Nomor VA otomatis</p>
                                        </div>
                                    </label>

                                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            value="credit_card"
                                            checked={selectedMethod === 'credit_card'}
                                            onChange={(e) => setSelectedMethod(e.target.value)}
                                            className="text-blue-600 focus:ring-blue-500"
                                        />
                                        <div className="ml-3">
                                            <p className="font-semibold text-gray-900">Kartu Kredit/Debit</p>
                                            <p className="text-sm text-gray-600">Visa, Mastercard</p>
                                        </div>
                                    </label>
                                </div>

                                <button
                                    onClick={handleCreatePayment}
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
                                >
                                    Lanjutkan Pembayaran
                                </button>
                            </div>
                        </div>
                    ) : payment.status === 'pending' ? (
                        /* Payment Instructions */
                        <div className="space-y-6">
                            {/* Payment Code */}
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-3 flex-1">
                                        <h3 className="text-lg font-bold text-yellow-800">Menunggu Pembayaran</h3>
                                        <p className="text-sm text-yellow-700 mt-2">
                                            Selesaikan pembayaran sebelum: <strong>{formatDate(payment.expires_at)}</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Instructions */}
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Instruksi Pembayaran</h3>
                                    
                                    {payment.payment_method === 'bank_transfer' && (
                                        <div className="space-y-4">
                                            <div className="bg-blue-50 p-4 rounded-lg">
                                                <p className="text-sm text-gray-600 mb-2">Transfer ke rekening:</p>
                                                <p className="font-bold text-gray-900">Bank BCA</p>
                                                <p className="text-2xl font-bold text-blue-900 mt-1">1234567890</p>
                                                <p className="text-sm text-gray-600 mt-1">a.n. Universitas Indonesia</p>
                                            </div>
                                            
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <p className="text-sm text-gray-600 mb-2">Jumlah Transfer:</p>
                                                <p className="text-3xl font-bold text-gray-900">{formatCurrency(payment.amount)}</p>
                                                <p className="text-sm text-red-600 mt-2">*Transfer sesuai nominal untuk verifikasi otomatis</p>
                                            </div>

                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <p className="text-sm text-gray-600 mb-2">Kode Pembayaran:</p>
                                                <div className="flex items-center">
                                                    <p className="text-xl font-bold text-gray-900">{payment.payment_code}</p>
                                                    <button
                                                        onClick={() => navigator.clipboard.writeText(payment.payment_code)}
                                                        className="ml-2 text-blue-600 hover:text-blue-800 text-sm"
                                                    >
                                                        Salin
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {payment.payment_method === 'virtual_account' && (
                                        <div className="space-y-4">
                                            <div className="bg-blue-50 p-4 rounded-lg">
                                                <p className="text-sm text-gray-600 mb-2">Nomor Virtual Account:</p>
                                                <div className="flex items-center">
                                                    <p className="text-2xl font-bold text-blue-900">{payment.payment_code}</p>
                                                    <button
                                                        onClick={() => navigator.clipboard.writeText(payment.payment_code)}
                                                        className="ml-2 text-blue-600 hover:text-blue-800 text-sm"
                                                    >
                                                        Salin
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <p className="text-sm text-gray-600 mb-2">Jumlah:</p>
                                                <p className="text-3xl font-bold text-gray-900">{formatCurrency(payment.amount)}</p>
                                            </div>

                                            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                                                <li>Pilih menu Transfer/Pembayaran</li>
                                                <li>Pilih Virtual Account</li>
                                                <li>Masukkan nomor VA di atas</li>
                                                <li>Konfirmasi jumlah dan detail pembayaran</li>
                                                <li>Selesaikan transaksi</li>
                                            </ol>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Upload Bukti */}
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Upload Bukti Pembayaran</h3>
                                    <form onSubmit={handleUploadProof} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Pilih file bukti transfer (JPG, PNG, PDF - Max 2MB)
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*,application/pdf"
                                                onChange={(e) => setProofFile(e.target.files[0])}
                                                className="block w-full text-sm text-gray-500
                                                    file:mr-4 file:py-2 file:px-4
                                                    file:rounded-lg file:border-0
                                                    file:text-sm file:font-semibold
                                                    file:bg-blue-50 file:text-blue-700
                                                    hover:file:bg-blue-100"
                                            />
                                        </div>
                                        {proofFile && (
                                            <button
                                                type="submit"
                                                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold"
                                            >
                                                Upload Bukti Pembayaran
                                            </button>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                    ) : payment.status === 'paid' ? (
                        /* Payment Success */
                        <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <svg className="h-6 w-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-lg font-bold text-green-800">Pembayaran Berhasil!</h3>
                                    <p className="text-sm text-green-700 mt-2">
                                        Pembayaran Anda telah diverifikasi pada {formatDate(payment.paid_at)}
                                    </p>
                                    <Link
                                        href={route('registration.show', registration.id)}
                                        className="inline-block mt-4 text-green-700 hover:text-green-900 font-semibold"
                                    >
                                        Kembali ke Detail Pendaftaran 
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}