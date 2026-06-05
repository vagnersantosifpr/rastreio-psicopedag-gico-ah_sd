import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Chaves do Supabase não configuradas no arquivo .env');
}

// Cria a instância de conexão com o banco
export const supabase = createClient(supabaseUrl, supabaseAnonKey);