const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
    console.log("Testing select...");
    const { data: sData, error: sError } = await supabase.from('leads').select('*').limit(1);
    console.log("Select Data:", sData);
    console.log("Select Error:", sError);
}

test();
