// Isi dua nilai ini setelah membuat project Supabase.
// Jangan masukkan service_role key di website. Gunakan ANON/PUBLISHABLE key saja.
const SUPABASE_URL = "GANTI_DENGAN_SUPABASE_URL";
const SUPABASE_ANON_KEY = "GANTI_DENGAN_SUPABASE_ANON_KEY";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
