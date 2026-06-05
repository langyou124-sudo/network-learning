export { createClient as createServerClient } from '@/lib/supabase/server';
export { createClient as createBrowserClient } from '@/lib/supabase/client';

import { createClient as createServer } from '@/lib/supabase/server';

export function getSupabaseClient() {
  return createServer();
}
