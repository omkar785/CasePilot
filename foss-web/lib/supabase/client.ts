// lib/supabase/client.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const createClientSupabaseClient = () =>
  createClientComponentClient()