import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function DebugPage() {
    const supabase = await createClient();

    // Ambil semua kuis untuk debugging
    const { data: quizzes, error } = await supabase
        .from('quizzes')
        .select('*');

    if (error) {
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Debug Error</h1>
                <pre className="bg-red-100 p-4 rounded">{JSON.stringify(error, null, 2)}</pre>
            </div>
        );
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Debug Data Kuis</h1>
            
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Total Kuis: {quizzes?.length || 0}</h2>
            </div>

            {quizzes && quizzes.length > 0 ? (
                <div className="space-y-4">
                    {quizzes.map((quiz) => (
                        <div key={quiz.id} className="border p-4 rounded-lg bg-gray-50">
                            <h3 className="font-semibold">ID: {quiz.id}</h3>
                            <p><strong>Title:</strong> {quiz.title}</p>
                            <p><strong>Share Code:</strong> {quiz.share_code || 'NULL'}</p>
                            <p><strong>Created By:</strong> {quiz.created_by}</p>
                            <p><strong>Is Public:</strong> {quiz.is_public ? 'Yes' : 'No'}</p>
                            <p><strong>Created At:</strong> {quiz.created_at}</p>
                            
                            {quiz.share_code && (
                                <div className="mt-2">
                                    <Link 
                                        href={`/quiz/play/${quiz.share_code}`}
                                        className="text-blue-600 hover:text-blue-800 underline"
                                    >
                                        Test Play: /quiz/play/{quiz.share_code}
                                    </Link>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-gray-600">Tidak ada data kuis di database.</p>
                    <p className="text-sm text-gray-500 mt-2">
                        Buat kuis baru di <a href="/quiz/create" className="text-blue-600">halaman create</a>
                    </p>
                </div>
            )}
        </div>
    );
} 