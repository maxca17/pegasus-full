// supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nflnbqnrvuulmkysyawx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mbG5icW5ydnV1bG1reXN5YXd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAwNjIxNTEsImV4cCI6MjAzNTYzODE1MX0.WH-_jPV4YJZCKw6W4aOD-_zglcBrufBnPUoRNXcKu34'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
