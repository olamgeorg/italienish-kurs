-- Create Supabase Table 'lernfortschritt' for storing user learning progress
-- Run this SQL command inside your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.lernfortschritt (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    course_level VARCHAR(10) NOT NULL CHECK (course_level IN ('A1', 'A2')),
    progress_percent INTEGER DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (user_id, course_level)
);

-- Enable Row Level Security (RLS) for EU DSGVO / GDPR Compliance
ALTER TABLE public.lernfortschritt ENABLE ROW LEVEL SECURITY;

-- Policy 1: Users can read their own learning progress data
CREATE POLICY "Users can view own data only" 
ON public.lernfortschritt 
FOR SELECT 
USING (auth.uid() = user_id);

-- Policy 2: Users can insert their own learning progress data
CREATE POLICY "Users can insert own data only" 
ON public.lernfortschritt 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Policy 3: Users can update their own learning progress data
CREATE POLICY "Users can update own data only" 
ON public.lernfortschritt 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Policy 4: Users can delete their own learning progress data
CREATE POLICY "Users can delete own data only" 
ON public.lernfortschritt 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create index for performance
CREATE INDEX IF NOT EXISTS lernfortschritt_user_id_idx ON public.lernfortschritt(user_id);
