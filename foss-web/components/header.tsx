"use client";

import { X, LogOut, Settings, User as LucideUser } from 'lucide-react';
import { User } from '@supabase/auth-helpers-nextjs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (session?.user) {
          setUser(session.user);
          
          // Check user type and redirect accordingly
          const { data: lawyer } = await supabase
            .from('lawyers')
            .select('*')
            .eq('auth_id', session.user.id)
            .single();
          
          if (lawyer) {
            setUserType('lawyer');
            router.push('/dashboard');
          } else {
            const { data: client } = await supabase
              .from('clients')
              .select('*')
              .eq('auth_id', session.user.id)
              .single();
            
            if (client) {
              setUserType('client');
              router.push('/clientDash');
            }
          }
        } 
        // else {
        //   // If no user is logged in, redirect to signin page
        //   router.push('/');
        // }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      // Re-run user type check and redirection when auth state changes
      if (session?.user) {
        getUser();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Helper function to get dashboard link based on user type
  const getDashboardLink = () => {
    if (!user) return '/signin';
    return userType === 'lawyer' ? '/dashboard' : '/clientDash';
  };

  return (
    <nav className="border-b border-[#694E37]/10 px-8 py-4 bg-[#DDD0C8] font-serif">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-4xl font-serif text-[#694E37]">
          CasePilot
        </Link>
        
        <div className="flex-1 max-w-xs mx-8">
          <div className="relative flex items-center">
            <Input
              type="search"
              placeholder="Search"
              className="bg-transparent border border-[#694E37]/20 rounded-full px-4 py-1 text-sm pr-8"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 text-[#694E37]/60 hover:text-[#694E37] p-0 h-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-6 text-[#694E37] text-sm">
            <Link href={getDashboardLink()} className="hover:text-[#694E37]/80">
              Dashboard
            </Link>
            <Link href="/Explore" className="hover:text-[#694E37]/80">
              Explore Cases
            </Link>
            <Link href="#" className="hover:text-[#694E37]/80">
              Resources
            </Link>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full p-0">
                <LucideUser className="h-5 w-5 text-[#694E37]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {!loading && (
                <>
                  {user ? (
                    <>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <LucideUser className="h-4 w-4" />
                        <span>Signed in as {userType}</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="flex items-center gap-2"
                        onClick={() => router.push('/lawyerProfile')}
                      >
                        <Settings className="h-4 w-4" />
                        <span>Profile Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="flex items-center gap-2 text-red-600"
                        onClick={handleSignOut}
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem 
                      className="flex items-center gap-2"
                      onClick={() => router.push('/signin')}
                    >
                      <LucideUser className="h-4 w-4" />
                      <span>Sign In</span>
                    </DropdownMenuItem>
                  )}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Header;