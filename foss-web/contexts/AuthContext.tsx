'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  session: Session | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
});

export function AuthProvider({
  children,
  initialSession,
}: {
  children: React.ReactNode;
  initialSession: Session | null;
}) {
  const [session, setSession] = useState<Session | null>(initialSession);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  // Only redirect for protected routes, not for public routes
  useEffect(() => {
    const protectedRoutes = ['/dashboard', '/clientDash'];
    const authRoutes = ['/signin', '/signup'];
    
    if (!loading) {
      if (protectedRoutes.includes(pathname) && !session) {
        router.push('/signin');
      } else if (authRoutes.includes(pathname) && session) {
        // Handle redirect based on user type if needed
        router.push('/dashboard'); // or determine based on user type
      }
    }
  }, [session, loading, pathname, router]);

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};