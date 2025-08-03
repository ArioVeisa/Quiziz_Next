'use client';

import { createClient } from "@/lib/supabase/client";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState, useCallback, use } from "react";
import FormModal from "@/components/FormModal";

// --- Tipe Data ---
type Question = {
  id: number;
  question: string;
  options: string[] | any[];
  answer: string;
};

type Quiz = {
  id: number;
  title: string;
  questions: Question[];
};

export default function QuizDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const supabase = createClient();
    
    // Unwrap params using React.use()
    const { id } = use(params);
    
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(true);

    // State untuk modal & form
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [answer, setAnswer] = useState('');
    const [formError, setFormError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Logika fetch data
    const fetchData = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('quizzes')
                .select('*, questions(*)')
                .eq('id', id)
                .single();
            
            if (error || !data) {
                return notFound();
            }
            setQuiz(data as Quiz);
        } catch {
            console.error('Error fetching quiz');
        } finally {
            setLoading(false);
        }
    }, [id, supabase]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleAddQuestion = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);
        setIsSubmitting(true);

        // Validasi
        if (!question.trim()) {
            setFormError('Pertanyaan tidak boleh kosong.');
            setIsSubmitting(false);
            return;
        }

        if (options.some(opt => !opt.trim())) {
            setFormError('Semua opsi jawaban harus diisi.');
            setIsSubmitting(false);
            return;
        }

        if (!answer) {
            setFormError('Pilih jawaban yang benar.');
            setIsSubmitting(false);
            return;
        }

        try {
            const { error } = await supabase.from('questions').insert({
                quiz_id: id,
                question: question.trim(),
                options,
                answer,
            });

            if (error) {
                setFormError(error.message);
            } else {
                // Reset form dan tutup modal
                setQuestion('');
                setOptions(['', '', '', '']);
                setAnswer('');
                setIsModalOpen(false);
                
                // Refresh data
                await fetchData();
            }
        } catch {
            setFormError('Terjadi kesalahan saat menyimpan pertanyaan.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        // Reset form saat modal ditutup
        setQuestion('');
        setOptions(['', '', '', '']);
        setAnswer('');
        setFormError(null);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Memuat data kuis...</p>
                </div>
            </div>
        );
    }

    if (!quiz) {
        return notFound();
    }

    return (
        <>
            <div className="flex flex-col items-center min-h-screen bg-gray-50 pt-10">
                <div className="w-full max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Kelola Kuis</h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Judul: <span className="font-semibold text-blue-600">{quiz.title}</span>
                    </p>
                    
                    <div className="mt-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800">Daftar Pertanyaan</h2>
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
                            >
                                + Tambah Pertanyaan
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            {quiz.questions && quiz.questions.length > 0 ? (
                                quiz.questions.map((q, index) => (
                                    <div key={q.id} className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-200">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <p className="text-gray-800 font-medium mb-2">
                                                    {index + 1}. {q.question}
                                                </p>
                                                <div className="text-sm text-gray-600">
                                                    <p className="mb-1"><strong>Opsi:</strong></p>
                                                    <ul className="list-disc list-inside space-y-1">
                                                        {Array.isArray(q.options) && q.options.map((option, optIndex) => (
                                                            <li key={optIndex} className={option === q.answer ? 'text-green-600 font-semibold' : ''}>
                                                                {typeof option === 'string' ? option : JSON.stringify(option)} {option === q.answer && '(Jawaban Benar)'}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 border-dashed border-2 border-gray-300 rounded-lg text-center">
                                    <p className="text-gray-500 mb-4">Belum ada pertanyaan untuk kuis ini.</p>
                                    <button 
                                        onClick={() => setIsModalOpen(true)}
                                        className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
                                    >
                                        + Tambah Pertanyaan Pertama
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <FormModal 
                isOpen={isModalOpen} 
                onClose={handleModalClose} 
                title="Tambah Pertanyaan Baru"
            >
                <form onSubmit={handleAddQuestion} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Pertanyaan</label>
                        <textarea 
                            value={question} 
                            onChange={(e) => setQuestion(e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            rows={3} 
                            required 
                            disabled={isSubmitting}
                            placeholder="Masukkan pertanyaan Anda di sini..."
                        />
                    </div>
                    
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Opsi Jawaban</label>
                        {options.map((option, index) => (
                            <div key={index} className="mb-3">
                                <label className="block text-gray-700 mb-1">
                                    Opsi {String.fromCharCode(65 + index)}
                                </label>
                                <input 
                                    type="text" 
                                    value={option} 
                                    onChange={(e) => handleOptionChange(index, e.target.value)} 
                                    className="w-full px-3 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                    required 
                                    disabled={isSubmitting}
                                    placeholder={`Masukkan opsi ${String.fromCharCode(65 + index)}...`}
                                />
                            </div>
                        ))}
                    </div>
                    
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Jawaban Benar</label>
                        <select 
                            value={answer} 
                            onChange={(e) => setAnswer(e.target.value)} 
                            className="w-full px-3 py-2 border rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            required 
                            disabled={isSubmitting}
                        >
                            <option value="">Pilih Jawaban Benar</option>
                            {options.map((option, index) => (
                                option.trim() && (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                )
                            ))}
                        </select>
                    </div>
                    
                    {formError && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm">{formError}</p>
                        </div>
                    )}
                    
                    <div className="flex gap-3 pt-4">
                        <button 
                            type="button"
                            onClick={handleModalClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
                            disabled={isSubmitting}
                        >
                            Batal
                        </button>
                        <button 
                            type="submit" 
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Menyimpan...' : 'Simpan Pertanyaan'}
                        </button>
                    </div>
                </form>
            </FormModal>
        </>
    );
}