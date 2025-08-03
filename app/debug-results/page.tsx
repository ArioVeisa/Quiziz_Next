import { createClient } from "@/lib/supabase/server";

export default async function DebugResultsPage() {
  const supabase = await createClient();

  // Get all results
  const { data: results, error } = await supabase
    .from('results')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Debug Results Table</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            Error: {error.message}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">All Results ({results?.length || 0})</h2>
          
          {results && results.length > 0 ? (
            <div className="space-y-4">
              {results.map((result) => (
                <div key={result.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <strong>ID:</strong> {result.id}
                    </div>
                    <div>
                      <strong>Quiz ID:</strong> {result.quiz_id}
                    </div>
                    <div>
                      <strong>User ID:</strong> {result.user_id}
                    </div>
                                         <div>
                       <strong>Score:</strong> {result.score}
                     </div>
                     <div>
                       <strong>Answers Count:</strong> {result.answers?.length || 0}
                     </div>
                    <div>
                      <strong>Created:</strong> {new Date(result.created_at).toLocaleString()}
                    </div>
                  </div>
                  
                  {result.answers && (
                    <div className="mt-4">
                      <strong>Answers:</strong>
                      <div className="mt-2 space-y-1">
                        {result.answers.map((answer: string, index: number) => (
                          <div key={index} className="text-sm text-gray-600">
                            Q{index + 1}: {answer}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-center py-8">
              No results found in database.
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 