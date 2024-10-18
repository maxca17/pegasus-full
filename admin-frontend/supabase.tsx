import { createClient } from '@supabase/supabase-js'

// TODO: Replace these with environment variables before committing
const supabaseUrl = 'https://nflnbqnrvuulmkysyawx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mbG5icW5ydnV1bG1reXN5YXd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAwNjIxNTEsImV4cCI6MjAzNTYzODE1MX0.WH-_jPV4YJZCKw6W4aOD-_zglcBrufBnPUoRNXcKu34'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
