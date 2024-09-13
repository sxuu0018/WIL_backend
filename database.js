import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const { SUPABASE_URL, SUPABASE_ANON_KEY } = JSON.parse(fs.readFileSync('db-secrets.json'));
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const db = {
	getAllPosts: async function () {
		const { data } = await supabase.from('posts').select('*');
		return data;
	},
	getAllApprovedPosts: async function () {
		const { data } = await supabase.from('posts').select('*').is('is_approved', true);
		return data;
	},
	getProfile: async function () {
		const { data } = await supabase.from('profiles').select('*');
		return data;
	},
	postNewPost: async function (body) {
		const { data } = await supabase.from('posts').insert([{ body }]).select('*');
		return data;
	},
	approvePost: async function (postId) {
		const { data } = await supabase.from('posts').update({ is_approved: true }).eq('id', postId);
		return data;
	},
};

export default db;
