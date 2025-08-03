'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function TestAuthPage() {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [testResult, setTestResult] = useState<{ type: string; data: any; error?: any } | null>(null)
  const supabase = createClient()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      console.log('User check:', { user, error })
      setUser(user)
      setLoading(false)
    } catch {
      console.error('Error checking user')
      setLoading(false)
    }
  }

  const testDatabaseAccess = async () => {
    try {
      // Test insert
             const { data: insertData, error: insertError } = await supabase
         .from('results')
         .insert({
           quiz_id: 17,
           user_id: user?.id,
           score: 3,
           answers: ['test1', 'test2', 'test3']
         })
         .select()
         .single()

      console.log('Test insert result:', { insertData, insertError })
      setTestResult({ type: 'insert', data: insertData, error: insertError })

      if (!insertError) {
        // Test select
        const { data: selectData, error: selectError } = await supabase
          .from('results')
          .select('*')
          .eq('user_id', user?.id)
          .order('created_at', { ascending: false })
          .limit(5)

        console.log('Test select result:', { selectData, selectError })
        setTestResult(prev => ({ ...prev, select: { data: selectData, error: selectError } }))
      }
    } catch {
      console.error('Test error')
      setTestResult({ type: 'error', error: 'Unknown error' })
    }
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Test Authentication & Database</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">User Status</h2>
          {user ? (
            <div className="space-y-2">
              <p><strong>Logged in:</strong> Yes</p>
              <p><strong>User ID:</strong> {user.id}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          ) : (
            <p className="text-red-600">Not logged in</p>
          )}
        </div>

        {user && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Database Test</h2>
            <button
              onClick={testDatabaseAccess}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Test Database Access
            </button>
            
            {testResult && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Test Results:</h3>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                  {JSON.stringify(testResult, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Make sure you&apos;re logged in</li>
            <li>Click &quot;Test Database Access&quot; to test insert/select operations</li>
            <li>Check console for detailed logs</li>
            <li>If insert fails, you may need to set up RLS policies in Supabase</li>
          </ol>
        </div>
      </div>
    </div>
  )
} 