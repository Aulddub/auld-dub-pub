import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: sessionStorage, // Use sessionStorage instead of localStorage
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});

// Database table types
export interface Match {
  id: string;
  sport: string;
  league: string;
  team1: string;
  team2: string;
  date: string;
  time: string;
  created_at?: string;
}

export interface Band {
  id: string;
  name: string;
  genre: string;
  date: string;
  time: string;
  created_at?: string;
}

export interface MenuPDF {
  id: string;
  name: string;
  type: 'food' | 'drinks';
  file_url: string;
  file_name: string;
  is_active: boolean;
  upload_date: string;
  created_at?: string;
}