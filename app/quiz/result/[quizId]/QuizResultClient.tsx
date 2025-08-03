'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"

interface QuizResultClientProps {
  quiz: { id: number; title: string; share_code: string; creator_name?: string }
  questions: { id: number; question: string; options: string[]; answer: string }[]
  existingResult: { score: number; answers: string[] } | null
}

export default function QuizResultClient({ quiz, questions, existingResult }: QuizResultClientProps) {
  const [fallbackResult, setFallbackResult] = useState<{ score: number; answers: string[] } | null>(null)

  useEffect(() => {
    // Try to get from localStorage if no result in database
    if (!existingResult) {
      try {
        const fallbackData = localStorage.getItem('quiz_result_fallback')
        if (fallbackData) {
          const parsed = JSON.parse(fallbackData)
          if (parsed.quiz_id === quiz.id) {
            setFallbackResult(parsed)
          }
        }
      } catch {
        console.error('Error reading from localStorage')
      }
    }
  }, [existingResult, quiz.id])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">📊</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Hasil Detail Quiz</h1>
            <p className="text-lg text-gray-600">{quiz.title}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-6 text-center">
              <div className="text-2xl font-bold mb-2">Total Pertanyaan</div>
              <div className="text-4xl font-bold">{questions?.length || 0}</div>
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-6 text-center">
              <div className="text-2xl font-bold mb-2">Share Code</div>
              <div className="text-4xl font-bold font-mono">{quiz.share_code}</div>
            </div>
            
                         <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl p-6 text-center">
               <div className="text-2xl font-bold mb-2">Dibuat Oleh</div>
               <div className="text-sm font-mono">{quiz.creator_name || 'Unknown User'}</div>
             </div>
          </div>
        </div>

        {/* Questions List with User Answers */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Daftar Pertanyaan & Jawaban</h2>
          
          <div className="space-y-6">
            {questions?.map((question, index) => {
              // Get user's answer for this question (if exists)
              const userAnswer = existingResult?.answers?.[index] || fallbackResult?.answers?.[index] || null;
              const isCorrect = userAnswer === question.answer;
              
              return (
                <div key={question.id} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-start mb-4">
                    <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 mt-1">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        {question.question}
                      </h3>
                      
                      {/* User's Answer */}
                      {userAnswer && (
                        <div className={`p-3 rounded-lg border-2 mb-3 ${
                          isCorrect 
                            ? 'border-green-500 bg-green-50 text-green-700' 
                            : 'border-red-500 bg-red-50 text-red-700'
                        }`}>
                          <div className="flex items-center">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold text-xs mr-3 ${
                              isCorrect 
                                ? 'border-green-500 bg-green-500 text-white' 
                                : 'border-red-500 bg-red-500 text-white'
                            }`}>
                              ✓
                            </div>
                            <span className="font-medium">Jawaban Anda: {userAnswer}</span>
                            {isCorrect && (
                              <span className="ml-auto text-green-600 font-bold">Benar!</span>
                            )}
                            {!isCorrect && (
                              <span className="ml-auto text-red-600 font-bold">Salah</span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* All Options */}
                      <div className="space-y-2">
                        {Array.isArray(question.options) && question.options.map((option: any, optIndex: number) => {
                          const optionText = typeof option === 'string' 
                            ? option 
                            : option.text || JSON.stringify(option);
                          
                          const isCorrectAnswer = optionText === question.answer;
                          const isUserAnswer = optionText === userAnswer;
                          
                          let borderClass = 'border-gray-200 bg-gray-50 text-gray-700';
                          if (isCorrectAnswer) {
                            borderClass = 'border-green-500 bg-green-50 text-green-700';
                          } else if (isUserAnswer && !isCorrect) {
                            borderClass = 'border-red-500 bg-red-50 text-red-700';
                          }
                          
                          return (
                            <div 
                              key={optIndex}
                              className={`p-3 rounded-lg border-2 ${borderClass}`}
                            >
                              <div className="flex items-center">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold text-xs mr-3 ${
                                  isCorrectAnswer 
                                    ? 'border-green-500 bg-green-500 text-white' 
                                    : isUserAnswer && !isCorrect
                                    ? 'border-red-500 bg-red-500 text-white'
                                    : 'border-gray-300 text-gray-500'
                                }`}>
                                  {String.fromCharCode(65 + optIndex)}
                                </div>
                                <span className="font-medium">{optionText}</span>
                                {isCorrectAnswer && (
                                  <span className="ml-auto text-green-600 font-bold">✓ Jawaban Benar</span>
                                )}
                                {isUserAnswer && !isCorrect && (
                                  <span className="ml-auto text-red-600 font-bold">✗ Jawaban Anda</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <Link 
            href={`/quiz/play/${quiz.share_code}`}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition duration-300 transform hover:scale-105"
          >
            Mainkan Lagi
          </Link>
          
          <Link 
            href="/dashboard"
            className="px-8 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition duration-300 transform hover:scale-105"
          >
            Kembali ke Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
} 