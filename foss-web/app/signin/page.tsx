"use client";
import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async (userType: 'lawyer' | 'client') => {
    try {
      setLoading(true);
      setError('');

      // Sign in with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;
      if (!authData.user?.id) throw new Error('No user ID returned from authentication');

      // Verify user type in respective table
      const { data: userData, error: userError } = await supabase
        .from(userType === 'lawyer' ? 'lawyers' : 'clients')
        .select('*')
        .eq('auth_id', authData.user.id)
        .single();

      if (userError || !userData) {
        // If wrong user type, sign out and show error
        await supabase.auth.signOut();
        throw new Error(`Invalid ${userType} credentials. Please make sure you're signing in with the correct account type.`);
      }

      // Route to appropriate dashboard based on user type
      router.push(userType === 'client' ? '/clientDash' : '/dashboard');
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#DDD0C8] py-12">
      <Card className="w-full max-w-md mx-4 border-2 border-[#634419]/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-[#634419]">
            Legal Portal Sign In
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="lawyer" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-[#CBB296]/10">
              <TabsTrigger
                value="lawyer"
                className="data-[state=active]:bg-[#634419] data-[state=active]:text-white"
              >
                Lawyer Sign In
              </TabsTrigger>
              <TabsTrigger
                value="client"
                className="data-[state=active]:bg-[#634419] data-[state=active]:text-white"
              >
                Client Sign In
              </TabsTrigger>
            </TabsList>
            {(['lawyer', 'client'] as const).map((userType) => (
              <TabsContent key={userType} value={userType}>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleSignIn(userType);
                }}>
                  <div className="space-y-4">
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="border-[#634419]/20 focus:border-[#634419] focus:ring-[#634419]"
                    />
                    <Input
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="border-[#634419]/20 focus:border-[#634419] focus:ring-[#634419]"
                    />
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    <Button
                      type="submit"
                      className="w-full bg-[#634419] hover:bg-[#3F372C]"
                      disabled={loading}
                    >
                      {loading ? 'Signing in...' : `Sign in as ${userType}`}
                    </Button>
                    <div className="text-center text-sm">
                      <a
                        href="/signup"
                        className="text-[#634419] hover:underline"
                      >
                        Don't have an account? Register as a {userType}
                      </a>
                    </div>
                  </div>
                </form>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}