import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const { SUPABASE_URL, SUPABASE_ANON_KEY } = JSON.parse(fs.readFileSync('db-secrets.json'));
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// console.log(supabase.from('posts').select('*').throwOnError());

export default supabase;
