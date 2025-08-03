'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type Question = {
  id: number
  question: string
  options: string[]
  answer: string
}

type Quiz = {
  id: number
  title: string
  questions: Question[]
}

interface QuizPlayerProps {
  quiz: Quiz
}

export default function QuizPlayer({ quiz }: QuizPlayerProps) {
  const router = useRouter()
  const supabase = createClient()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const [userAnswers, setUserAnswers] = useState<string[]>([])

  const currentQuestion = quiz.questions[currentQuestionIndex]

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      // Check if answer is correct
      const isCorrect = selectedAnswer === currentQuestion.answer
      if (isCorrect) {
        setScore(score + 1)
      }

      // Store user's answer
      const newUserAnswers = [...userAnswers]
      newUserAnswers[currentQuestionIndex] = selectedAnswer
      setUserAnswers(newUserAnswers)



      // Move to next question or show results
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedAnswer(null)
      } else {
        setShowResults(true)
      }
    }
  }

  const handleFinishQuiz = async () => {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      
      console.log('Current user:', user)
      console.log('Quiz data:', { quiz_id: quiz.id, score, answers: userAnswers, total_questions: quiz.questions.length })
      
      if (user) {
        // Save result to database
        const { data: result, error } = await supabase
          .from('results')
          .insert({
            quiz_id: quiz.id,
            user_id: user.id,
            score: score,
            answers: userAnswers
          })
          .select()
          .single()

        console.log('Save result response:', { data: result, error })

        if (error) {
          console.error('Error saving result:', error)
          // Try alternative approach - save to localStorage as fallback
          try {
                         const fallbackData = {
               quiz_id: quiz.id,
               user_id: user.id,
               score: score,
               answers: userAnswers,
               created_at: new Date().toISOString()
             }
            localStorage.setItem('quiz_result_fallback', JSON.stringify(fallbackData))
            console.log('Saved to localStorage as fallback')
          } catch (localError) {
            console.error('LocalStorage error:', localError)
          }
          // Still redirect even if save fails
          router.push(`/quiz/result/${quiz.id}`)
        } else {
          console.log('Result saved successfully:', result)
          // Redirect to result page
          router.push(`/quiz/result/${quiz.id}`)
        }
      } else {
        console.log('No user found, redirecting without saving')
        // If no user, just redirect to result page
        router.push(`/quiz/result/${quiz.id}`)
      }
    } catch (error) {
      console.error('Error finishing quiz:', error)
      router.push(`/quiz/result/${quiz.id}`)
    }
  }

  const getProgressPercentage = () => {
    return ((currentQuestionIndex + 1) / quiz.questions.length) * 100
  }

  if (showResults) {
    const percentage = Math.round((score / quiz.questions.length) * 100)
    let resultMessage = ''
    let resultColor = ''

    if (percentage >= 80) {
      resultMessage = 'Excellent! 🎉'
      resultColor = 'text-green-600'
    } else if (percentage >= 60) {
      resultMessage = 'Good Job! 👍'
      resultColor = 'text-blue-600'
    } else if (percentage >= 40) {
      resultMessage = 'Not Bad! 😊'
      resultColor = 'text-yellow-600'
    } else {
      resultMessage = 'Keep Trying! 💪'
      resultColor = 'text-red-600'
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">🎯</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Selesai!</h1>
            <p className={`text-xl font-semibold ${resultColor}`}>{resultMessage}</p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-6 mb-6">
            <div className="text-4xl font-bold mb-2">
              {score}/{quiz.questions.length}
            </div>
            <div className="text-2xl font-semibold">
              {percentage}%
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-600">
              Anda menjawab benar {score} dari {quiz.questions.length} pertanyaan.
            </p>
            
            <button
              onClick={handleFinishQuiz}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition duration-300 transform hover:scale-105"
            >
              Lihat Hasil Detail
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{quiz.title}</h1>
                             <div className="flex items-center space-x-4 text-sm text-gray-600">
                 <span>Pertanyaan {currentQuestionIndex + 1} dari {quiz.questions.length}</span>
               </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round((score / quiz.questions.length) * 100)}%
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-3">
                {currentQuestionIndex + 1}
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                {currentQuestion.question}
              </h2>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {Array.isArray(currentQuestion.options) && currentQuestion.options.map((option, index) => {
              // Handle different option formats
              const optionText = typeof option === 'string' 
                ? option 
                : option.text || JSON.stringify(option)
              
              const isSelected = selectedAnswer === optionText
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(optionText)}
                                     className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                     isSelected
                       ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg'
                       : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-800'
                   }`}
                >
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm mr-4 ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-500 text-white' 
                        : 'border-gray-300 text-gray-600'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="font-medium text-gray-800">{optionText}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200 font-semibold"
          >
            ← Sebelumnya
          </button>

          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">
              {currentQuestionIndex + 1} dari {quiz.questions.length}
            </div>
            <div className="text-xs text-gray-400">
              {Math.round(getProgressPercentage())}% selesai
            </div>
          </div>

          <button
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
            className={`px-8 py-3 rounded-xl font-semibold transition duration-200 transform hover:scale-105 ${
              selectedAnswer
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentQuestionIndex === quiz.questions.length - 1 ? 'Selesai →' : 'Selanjutnya →'}
          </button>
        </div>
      </div>
    </div>
  )
}