import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import QuizResultClient from "./QuizResultClient";

export default async function QuizResultPage({ params }: { params: Promise<{ quizId: string }> }) {
  const supabase = await createClient();
  const { quizId } = await params;

  // Fetch quiz data
  const { data: quiz, error: quizError } = await supabase
    .from('quizzes')
    .select('*')
    .eq('id', quizId)
    .single();

  if (quizError || !quiz) {
    return notFound();
  }

  // Fetch questions for this quiz
  const { data: questions, error: questionsError } = await supabase
    .from('questions')
    .select('*')
    .eq('quiz_id', quizId);

  if (questionsError) {
    return notFound();
  }

  // Get user data
  const { data: { user } } = await supabase.auth.getUser();

  // Get quiz creator info
  const { data: quizCreator } = await supabase.auth.admin.getUserById(quiz.created_by);

  // Check if there's an existing result for this user and quiz
  const { data: existingResult } = await supabase
    .from('results')
    .select('*')
    .eq('quiz_id', quizId)
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  // Add creator name to quiz object
  const quizWithCreator = {
    ...quiz,
    creator_name: quizCreator?.user?.email?.split('@')[0] || 'Unknown User'
  };

  return <QuizResultClient quiz={quizWithCreator} questions={questions} existingResult={existingResult} />;
}
