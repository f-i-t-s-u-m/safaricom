
import { createClient } from '@supabase/supabase-js'



// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.SUBABASE_URL, process.env.SUBABASE_ANON)


export default supabase