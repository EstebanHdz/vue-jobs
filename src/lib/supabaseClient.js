import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://pkzltjzpkwotdpncdwiy.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBremx0anpwa3dvdGRwbmNkd2l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA5MzI2MDgsImV4cCI6MjAzNjUwODYwOH0.1bk_2CaB2q6ZCxM_F2Lc-c6fYMY-PyQ8XyR5fBvnuPM')