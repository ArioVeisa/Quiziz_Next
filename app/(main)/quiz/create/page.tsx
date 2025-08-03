'use client'

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function CreateQuizPage() {
    const [title, setTitle] = useState('');
    const [isPublic] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    const supabase = createClient();
    const router = useRouter();

    // Hanya modifikasi fungsi handleCreateQuiz, sisanya biarkan sama

const handleCreateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 1. Dapatkan data user yang sedang login
    const { data: { user } } = await supabase.auth.getUser();

    // --- TAMBAHKAN DEBUGGING DI SINI ---
    console.log('User object from Supabase:', user);
    // ------------------------------------

    if (!user) {
        setError("You must be logged in to create a quiz.");
        setLoading(false);
        return;
    }

    // 2. Buat kode unik untuk dibagikan
    const shareCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // Siapkan data untuk diinsert
    const dataToInsert = {
        title: title,
        created_by: user.id,
        share_code: shareCode,
        is_public: isPublic,
    };

    // --- TAMBAHKAN DEBUGGING LAGI DI SINI ---
    console.log('Data to be inserted:', dataToInsert);
    // ------------------------------------------


    // 3. Simpan data ke tabel 'quizzes'
    const { data: newQuiz, error: insertError } = await supabase
        .from('quizzes')
        .insert(dataToInsert) // Gunakan variabel yang sudah kita log
        .select()
        .single();

    if (insertError) {
        setError(insertError.message);
        setLoading(false);
    } else if (newQuiz) {
        router.push(`/quiz/${newQuiz.id}`);
    }
};
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Buat Kuis Baru</h1>
                <form onSubmit={handleCreateQuiz}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Judul Kuis</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Contoh: Kuis Pengetahuan Umum"
                            required
                        />
                    </div>
                    {/* Opsi untuk kuis publik/privat bisa ditambahkan di sini jika perlu */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-blue-400"
                    >
                        {loading ? 'Membuat...' : 'Buat Kuis & Lanjut Tambah Soal'}
                    </button>
                    {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                </form>
            </div>
        </div>
    );
}