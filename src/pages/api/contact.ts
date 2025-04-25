import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.SUPABASE_SECRET_KEY
);

export async function POST({ request }) {
  const body = await request.json();

  const { name, email, message } = body;

  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ error: 'Missing required fields' }),
      { status: 400 }
    );
  }

  const { data, error } = await supabase.from('messages').insert([{ name, email, message }]);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true, data }), { status: 200 });
}
