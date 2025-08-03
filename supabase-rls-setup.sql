-- Enable RLS on results table
ALTER TABLE results ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to insert their own results
CREATE POLICY "Users can insert their own results" ON results
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to view their own results
CREATE POLICY "Users can view their own results" ON results
FOR SELECT USING (auth.uid() = user_id);

-- Policy to allow users to update their own results
CREATE POLICY "Users can update their own results" ON results
FOR UPDATE USING (auth.uid() = user_id);

-- Policy to allow users to delete their own results
CREATE POLICY "Users can delete their own results" ON results
FOR DELETE USING (auth.uid() = user_id);

-- Optional: Allow public read access to results (for sharing)
-- CREATE POLICY "Public can view results" ON results
-- FOR SELECT USING (true); 