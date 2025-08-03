import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import QuizPlayer from "./QuizPlayer"; // Komponen yang akan kita buat selanjutnya

export default async function PlayQuizPage({ params }: { params: Promise<{ code: string }> }) {
    const supabase = await createClient();
    
    // Await params instead of using React.use()
    const { code } = await params;

    // Query quiz terlebih dahulu
    const { data: quiz, error: quizError } = await supabase
        .from('quizzes')
        .select('*')
        .eq('share_code', code.toUpperCase())
        .single();

    if (quizError || !quiz) {
        return notFound();
    }

    // Query questions terpisah
    const { data: questions, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .eq('quiz_id', quiz.id);

    if (questionsError) {
        return notFound();
    }

    // Gabungkan data
    const quizWithQuestions = {
        ...quiz,
        questions: questions || []
    };

    if (!quizWithQuestions.questions || quizWithQuestions.questions.length === 0) {
        return notFound();
    }

    return <QuizPlayer quiz={quizWithQuestions} />;
}