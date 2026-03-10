import { Head, router } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function ExamStart({ registration, questions, duration }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert to seconds
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Timer countdown
    useEffect(() => {
        if (timeLeft <= 0) {
            handleSubmit();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const handleAnswer = (questionId, answer) => {
        setAnswers({ ...answers, [questionId]: answer });
    };

    const handleSubmit = () => {
        if (isSubmitting) return;

        if (Object.keys(answers).length < questions.length) {
            if (
                !confirm(
                    "Masih ada soal yang belum dijawab. Yakin ingin submit?",
                )
            ) {
                return;
            }
        }

        setIsSubmitting(true);
        router.post(route("registration.exam.submit", registration.id), {
            answers,
        });
    };

    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
        <>
            <Head title="Ujian Seleksi" />

            <div className="min-h-screen bg-gray-100">
                {/* Header */}
                <div className="bg-white shadow-md sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Ujian Seleksi Masuk UI
                                </h1>
                                <p className="text-sm text-gray-600">
                                    {registration.study_program.name}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-600">
                                    Waktu Tersisa
                                </p>
                                <p
                                    className={`text-3xl font-bold ${timeLeft < 300 ? "text-red-600" : "text-blue-900"}`}
                                >
                                    {formatTime(timeLeft)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-600">
                                Soal {currentQuestion + 1} dari{" "}
                                {questions.length}
                            </p>
                            <p className="text-sm text-gray-600">
                                Dijawab: {Object.keys(answers).length}/
                                {questions.length}
                            </p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Question */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="mb-6">
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-4">
                                {question.category}
                            </span>
                            <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
                                {currentQuestion + 1}. {question.question}
                            </h2>
                        </div>

                        <div className="space-y-3">
                            {["A", "B", "C", "D", "E"].map((option) => (
                                <label
                                    key={option}
                                    className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                        answers[question.id] === option
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name={`question-${question.id}`}
                                        value={option}
                                        checked={
                                            answers[question.id] === option
                                        }
                                        onChange={() =>
                                            handleAnswer(question.id, option)
                                        }
                                        className="mt-1 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-3 text-gray-900">
                                        <strong className="mr-2">
                                            {option}.
                                        </strong>
                                        {
                                            question[
                                                `option_${option.toLowerCase()}`
                                            ]
                                        }
                                    </span>
                                </label>
                            ))}
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center justify-between mt-8 pt-6 border-t">
                            <button
                                onClick={() =>
                                    setCurrentQuestion(
                                        Math.max(0, currentQuestion - 1),
                                    )
                                }
                                disabled={currentQuestion === 0}
                                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                            >
                                ← Sebelumnya
                            </button>

                            {currentQuestion < questions.length - 1 ? (
                                <button
                                    onClick={() =>
                                        setCurrentQuestion(currentQuestion + 1)
                                    }
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                                >
                                    Selanjutnya →
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50"
                                >
                                    {isSubmitting
                                        ? "Mengirim..."
                                        : "✓ Selesai & Submit"}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Question Navigator */}
                    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
                        <h3 className="font-bold text-gray-900 mb-4">
                            Navigasi Soal
                        </h3>
                        <div className="grid grid-cols-10 gap-2">
                            {questions.map((q, index) => (
                                <button
                                    key={q.id}
                                    onClick={() => setCurrentQuestion(index)}
                                    className={`w-10 h-10 rounded-lg font-semibold ${
                                        currentQuestion === index
                                            ? "bg-blue-600 text-white"
                                            : answers[q.id]
                                              ? "bg-green-100 text-green-800 border-2 border-green-500"
                                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center space-x-4 mt-4 text-sm">
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-green-100 border-2 border-green-500 rounded mr-2"></div>
                                <span className="text-gray-600">Terjawab</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-gray-100 rounded mr-2"></div>
                                <span className="text-gray-600">
                                    Belum dijawab
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
