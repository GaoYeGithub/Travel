import { createBrowserClient } from "@supabase/ssr";

export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '' ;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createBrowserClient(supabaseUrl, supabaseKey);
}
