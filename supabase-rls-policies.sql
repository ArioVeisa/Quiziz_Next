-- Aktifkan Row Level Security untuk setiap tabel
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;

-- ===== POLICIES UNTUK TABEL QUIZZES =====

-- Policy untuk INSERT: User bisa membuat quiz sendiri
CREATE POLICY "Users can create their own quizzes" ON quizzes
FOR INSERT WITH CHECK (auth.uid() = created_by);

-- Policy untuk SELECT: User bisa lihat quiz yang mereka buat + quiz public
CREATE POLICY "Users can view their own quizzes and public quizzes" ON quizzes
FOR SELECT USING (
  auth.uid() = created_by OR is_public = true
);

-- Policy untuk UPDATE: User bisa update quiz mereka sendiri
CREATE POLICY "Users can update their own quizzes" ON quizzes
FOR UPDATE USING (auth.uid() = created_by);

-- Policy untuk DELETE: User bisa hapus quiz mereka sendiri
CREATE POLICY "Users can delete their own quizzes" ON quizzes
FOR DELETE USING (auth.uid() = created_by);

-- ===== POLICIES UNTUK TABEL QUESTIONS =====

-- Policy untuk INSERT: User bisa tambah pertanyaan ke quiz mereka
CREATE POLICY "Users can add questions to their own quizzes" ON questions
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM quizzes 
    WHERE quizzes.id = questions.quiz_id 
    AND quizzes.created_by = auth.uid()
  )
);

-- Policy untuk SELECT: User bisa lihat pertanyaan dari quiz mereka + quiz public
CREATE POLICY "Users can view questions from their own quizzes and public quizzes" ON questions
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM quizzes 
    WHERE quizzes.id = questions.quiz_id 
    AND (quizzes.created_by = auth.uid() OR quizzes.is_public = true)
  )
);

-- Policy untuk UPDATE: User bisa update pertanyaan di quiz mereka
CREATE POLICY "Users can update questions in their own quizzes" ON questions
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM quizzes 
    WHERE quizzes.id = questions.quiz_id 
    AND quizzes.created_by = auth.uid()
  )
);

-- Policy untuk DELETE: User bisa hapus pertanyaan di quiz mereka
CREATE POLICY "Users can delete questions in their own quizzes" ON questions
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM quizzes 
    WHERE quizzes.id = questions.quiz_id 
    AND quizzes.created_by = auth.uid()
  )
);

-- ===== POLICIES UNTUK TABEL RESULTS =====

-- Policy untuk INSERT: User bisa simpan hasil quiz mereka
CREATE POLICY "Users can insert their own results" ON results
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy untuk SELECT: User bisa lihat hasil quiz mereka
CREATE POLICY "Users can view their own results" ON results
FOR SELECT USING (auth.uid() = user_id);

-- Policy untuk UPDATE: User bisa update hasil quiz mereka
CREATE POLICY "Users can update their own results" ON results
FOR UPDATE USING (auth.uid() = user_id);

-- Policy untuk DELETE: User bisa hapus hasil quiz mereka
CREATE POLICY "Users can delete their own results" ON results
FOR DELETE USING (auth.uid() = user_id);

-- Optional: Allow quiz creators to view results for their quizzes
CREATE POLICY "Quiz creators can view results for their quizzes" ON results
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM quizzes 
    WHERE quizzes.id = results.quiz_id 
    AND quizzes.created_by = auth.uid()
  )
); 