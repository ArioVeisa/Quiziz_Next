'use client';

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

// Tipe data untuk kuis
type Quiz = {
  id: number;
  title: string;
  share_code: string;
  created_at: string;
};

// Tipe data untuk hasil quiz
type QuizResult = {
  id: number;
  quiz_id: number;
  user_id: string;
  score: number;
  answers: string[];
  created_at: string;
  quiz_title?: string;
};

export default function DashboardPage() {
    const supabase = createClient();
    const router = useRouter();
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
    const [copiedCode, setCopiedCode] = useState<string | null>(null);
    const [searchCode, setSearchCode] = useState('');
    const [searchError, setSearchError] = useState<string | null>(null);
    const [searchLoading, setSearchLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
                
                // Fetch quizzes
                const { data: quizzesData } = await supabase
                    .from('quizzes')
                    .select('id, title, share_code, created_at')
                    .eq('created_by', user.id)
                    .order('created_at', { ascending: false });
                
                if (quizzesData) {
                    setQuizzes(quizzesData);
                }
                
                // Fetch quiz results
                const { data: resultsData } = await supabase
                    .from('results')
                    .select(`
                        id, quiz_id, user_id, score, answers, created_at,
                        quizzes(title)
                    `)
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });
                
                if (resultsData) {
                    const resultsWithQuizTitle = resultsData.map((result) => ({
                        ...result,
                        quiz_title: (result.quizzes as { title?: string })?.title
                    })) as QuizResult[];
                    setQuizResults(resultsWithQuizTitle);
                }
            }
            setLoading(false);
        };

        fetchData();
    }, [supabase]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
        router.refresh();
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const copyShareCode = async (shareCode: string) => {
        try {
            await navigator.clipboard.writeText(shareCode);
            setCopiedCode(shareCode);
            setTimeout(() => setCopiedCode(null), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const handleSearchCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setSearchError(null);
        setSearchLoading(true);

        if (!searchCode.trim()) {
            setSearchError('Masukkan kode quiz');
            setSearchLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('quizzes')
                .select('share_code')
                .eq('share_code', searchCode.toUpperCase())
                .single();

            if (error || !data) {
                setSearchError('Kode quiz tidak ditemukan');
            } else {
                // Redirect ke halaman play quiz
                router.push(`/quiz/play/${searchCode.toUpperCase()}`);
            }
        } catch {
            setSearchError('Terjadi kesalahan saat mencari quiz');
        } finally {
            setSearchLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-6xl mx-auto p-6">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
                            <p className="text-lg text-gray-600">
                                Selamat datang, {user?.email?.split('@')[0] || 'User'}! 👋
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition duration-300 transform hover:scale-105"
                        >
                            Logout
                        </button>
                    </div>
                    
                    {/* Search Quiz Code */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">🔍 Cari Quiz dengan Kode</h3>
                        <form onSubmit={handleSearchCode} className="flex gap-4">
                            <input
                                type="text"
                                value={searchCode}
                                onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
                                placeholder="Masukkan kode quiz (contoh: 9Y7I5G)"
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-600 text-gray-900"
                                maxLength={6}
                            />
                            <button
                                type="submit"
                                disabled={searchLoading}
                                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
                            >
                                {searchLoading ? 'Mencari...' : 'Cari Quiz'}
                            </button>
                        </form>
                        {searchError && (
                            <p className="text-red-600 mt-2 text-sm">{searchError}</p>
                        )}
                    </div>
                    
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-6 text-center">
                            <div className="text-3xl font-bold mb-2">{quizzes.length}</div>
                            <div className="text-lg">Total Kuis</div>
                        </div>
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-6 text-center">
                            <div className="text-3xl font-bold mb-2">{quizzes.filter(q => q.share_code).length}</div>
                            <div className="text-lg">Kuis Aktif</div>
                        </div>
                        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl p-6 text-center">
                            <div className="text-3xl font-bold mb-2">{quizResults.length}</div>
                            <div className="text-lg">Quiz Selesai</div>
                        </div>
                        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-xl p-6 text-center">
                            <div className="text-3xl font-bold mb-2">
                                {quizResults.length > 0 
                                    ? Math.round(quizResults.reduce((sum, result) => sum + result.score, 0) / quizResults.length)
                                    : 0
                                }
                            </div>
                            <div className="text-lg">Rata-rata Skor</div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl p-6 text-center">
                            <div className="text-3xl font-bold mb-2">
                                {quizResults.length > 0 ? Math.max(...quizResults.map(r => r.score)) : 0}
                            </div>
                            <div className="text-lg">Skor Tertinggi</div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link 
                            href="/quiz/create" 
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition duration-300 transform hover:scale-105 inline-block text-center py-4 text-lg"
                        >
                            <div className="flex items-center justify-center">
                                <span className="text-2xl mr-3">+</span>
                                Buat Kuis Baru
                            </div>
                        </Link>
                        
                        {quizzes.length > 0 && (
                            <Link 
                                href={`/quiz/play/${quizzes[0].share_code}`}
                                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transition duration-300 transform hover:scale-105 inline-block text-center py-4 text-lg"
                            >
                                <div className="flex items-center justify-center">
                                    <span className="text-2xl mr-3">🎮</span>
                                    Play Quiz Terbaru
                                </div>
                            </Link>
                        )}
                        
                        <Link 
                            href="/my-results"
                            className="bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-xl hover:from-purple-600 hover:to-pink-700 transition duration-300 transform hover:scale-105 inline-block text-center py-4 text-lg"
                        >
                            <div className="flex items-center justify-center">
                                <span className="text-2xl mr-3">📊</span>
                                Lihat Semua Hasil
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Quiz Results History */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">📊 Riwayat Hasil Quiz</h2>
                        <div className="text-sm text-gray-500">
                            {quizResults.length} hasil ditemukan
                        </div>
                    </div>
                    
                    {quizResults.length > 0 ? (
                        <div className="space-y-4">
                            {quizResults.slice(0, 5).map((result) => (
                                <div key={result.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg text-gray-800 mb-1">
                                                {result.quiz_title || `Quiz ID: ${result.quiz_id}`}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {formatDate(result.created_at)}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className={`text-2xl font-bold ${
                                                result.score >= 80 ? 'text-green-600' :
                                                result.score >= 60 ? 'text-blue-600' :
                                                result.score >= 40 ? 'text-yellow-600' : 'text-red-600'
                                            }`}>
                                                {result.score} poin
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {result.answers?.length || 0} pertanyaan
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-3 flex gap-2">
                                        <Link 
                                            href={`/quiz/result/${result.quiz_id}`}
                                            className="flex-1 bg-blue-100 text-blue-700 py-2 px-3 rounded-lg text-sm font-semibold hover:bg-blue-200 transition duration-300 text-center"
                                        >
                                            📋 Lihat Detail
                                        </Link>
                                        <Link 
                                            href={`/quiz/play/${quizzes.find(q => q.id === result.quiz_id)?.share_code}`}
                                            className="flex-1 bg-green-100 text-green-700 py-2 px-3 rounded-lg text-sm font-semibold hover:bg-green-200 transition duration-300 text-center"
                                        >
                                            🎮 Main Lagi
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📊</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Belum Ada Hasil Quiz</h3>
                            <p className="text-gray-600 mb-6">Mulai main quiz untuk melihat hasil di sini!</p>
                            <div className="flex gap-4 justify-center">
                                <Link 
                                    href="/quiz/create"
                                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-300"
                                >
                                    Buat Quiz Pertama
                                </Link>
                                {quizzes.length > 0 && (
                                    <Link 
                                        href={`/quiz/play/${quizzes[0].share_code}`}
                                        className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition duration-300"
                                    >
                                        Main Quiz Terbaru
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                    
                    {quizResults.length > 5 && (
                        <div className="text-center mt-6">
                            <p className="text-gray-600">
                                Menampilkan 5 hasil terbaru dari {quizResults.length} total
                            </p>
                        </div>
                    )}
                </div>

                {/* Quiz List */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Kuis Anda</h2>
                        <div className="text-sm text-gray-500">
                            {quizzes.length} kuis ditemukan
                        </div>
                    </div>
                    
                    {loading ? (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-2 text-gray-600">Memuat kuis...</p>
                        </div>
                    ) : quizzes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {quizzes.map((quiz) => (
                                <div key={quiz.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 transform hover:scale-105">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
                                            📝
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {formatDate(quiz.created_at)}
                                        </div>
                                    </div>
                                    <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                                        {quiz.title}
                                    </h3>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-mono">
                                                {quiz.share_code}
                                            </div>
                                            <button
                                                onClick={() => copyShareCode(quiz.share_code)}
                                                className="text-blue-600 hover:text-blue-800 transition-colors"
                                                title="Copy share code"
                                            >
                                                {copiedCode === quiz.share_code ? '✓' : '📋'}
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <div className="flex gap-2 mb-3">
                                        <Link 
                                            href={`/quiz/play/${quiz.share_code}`}
                                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:from-green-600 hover:to-emerald-700 transition duration-300 text-center"
                                        >
                                            🎮 Play
                                        </Link>
                                        <Link 
                                            href={`/quiz/${quiz.id}`}
                                            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:from-blue-600 hover:to-purple-700 transition duration-300 text-center"
                                        >
                                            ⚙️ Kelola
                                        </Link>
                                    </div>
                                    
                                    {/* Share Button */}
                                    <button
                                        onClick={() => {
                                            const shareUrl = `${window.location.origin}/quiz/play/${quiz.share_code}`;
                                            const shareText = `Mainkan quiz "${quiz.title}" di sini: ${shareUrl}`;
                                            if (navigator.share) {
                                                navigator.share({
                                                    title: quiz.title,
                                                    text: shareText,
                                                    url: shareUrl
                                                });
                                            } else {
                                                // Fallback untuk browser yang tidak support Web Share API
                                                copyShareCode(shareUrl);
                                            }
                                        }}
                                        className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:from-yellow-600 hover:to-orange-700 transition duration-300 text-center"
                                    >
                                        📤 Share Quiz
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📝</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Belum Ada Kuis</h3>
                            <p className="text-gray-600 mb-6">Mulai buat kuis pertama Anda!</p>
                            <Link 
                                href="/quiz/create"
                                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-300"
                            >
                                Buat Kuis Pertama
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}