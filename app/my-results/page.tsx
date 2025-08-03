'use client';

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";

type QuizResult = {
  id: number;
  quiz_id: number;
  user_id: string;
  score: number;
  answers: string[];
  created_at: string;
  quiz_title?: string;
  total_questions?: number;
};

export default function MyResultsPage() {
  const supabase = createClient();
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        
        const { data: resultsData } = await supabase
          .from('results')
          .select(`
            id, quiz_id, user_id, score, answers, created_at,
            quizzes(title)
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (resultsData) {
          const resultsWithDetails = resultsData.map((result) => ({
            ...result,
            quiz_title: (result.quizzes as { title?: string })?.title,
            total_questions: result.answers?.length || 0
          })) as QuizResult[];
          setResults(resultsWithDetails);
        }
      }
      setLoading(false);
    };

    fetchResults();
  }, [supabase]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return 'Excellent! 🎉';
    if (score >= 60) return 'Good Job! 👍';
    if (score >= 40) return 'Not Bad! 😊';
    return 'Keep Trying! 💪';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat hasil quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">📊 Hasil Quiz Saya</h1>
              <p className="text-lg text-gray-600">
                Selamat datang, {user?.email?.split('@')[0] || 'User'}! 👋
              </p>
            </div>
            <Link 
              href="/dashboard"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-300"
            >
              ← Kembali ke Dashboard
            </Link>
          </div>
          
          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-6 text-center">
              <div className="text-3xl font-bold mb-2">{results.length}</div>
              <div className="text-lg">Total Quiz</div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-6 text-center">
              <div className="text-3xl font-bold mb-2">
                {results.length > 0 
                  ? Math.round(results.reduce((sum, result) => sum + result.score, 0) / results.length)
                  : 0
                }
              </div>
              <div className="text-lg">Rata-rata Skor</div>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-xl p-6 text-center">
              <div className="text-3xl font-bold mb-2">
                {results.length > 0 ? Math.max(...results.map(r => r.score)) : 0}
              </div>
              <div className="text-lg">Skor Tertinggi</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl p-6 text-center">
              <div className="text-3xl font-bold mb-2">
                {results.filter(r => r.score >= 80).length}
              </div>
              <div className="text-lg">Excellent Score</div>
            </div>
          </div>
        </div>

        {/* Results List */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Riwayat Lengkap</h2>
            <div className="text-sm text-gray-500">
              {results.length} hasil ditemukan
            </div>
          </div>
          
          {results.length > 0 ? (
            <div className="space-y-6">
              {results.map((result) => (
                <div key={result.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-gray-800 mb-2">
                        {result.quiz_title || `Quiz ID: ${result.quiz_id}`}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {formatDate(result.created_at)}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>📝 {result.total_questions} pertanyaan</span>
                        <span>📊 {result.answers?.length || 0} jawaban</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-4xl font-bold ${getScoreColor(result.score)}`}>
                        {result.score}
                      </div>
                      <div className="text-sm text-gray-600">poin</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {getScoreMessage(result.score)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Link 
                      href={`/quiz/result/${result.quiz_id}`}
                      className="flex-1 bg-blue-100 text-blue-700 py-3 px-4 rounded-lg font-semibold hover:bg-blue-200 transition duration-300 text-center"
                    >
                      📋 Lihat Detail Jawaban
                    </Link>
                    <Link 
                      href={`/quiz/play/${result.quiz_id}`}
                      className="flex-1 bg-green-100 text-green-700 py-3 px-4 rounded-lg font-semibold hover:bg-green-200 transition duration-300 text-center"
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
              <Link 
                href="/dashboard"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-300"
              >
                Kembali ke Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 