// utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js';
import { useAuth } from '@clerk/clerk-react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Public client
export const supabasePublic = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Custom hook for authenticated client
export const useSupabaseAuth = () => {
  const { getToken } = useAuth();

  const createClientWithToken = async () => {
    const token = await getToken();
    // console.log(token)
    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
  };

  return { createClientWithToken };
};
