"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (userType: 'lawyer' | 'client') => {
    try {
      setLoading(true);
      setError('');

      // Sign in with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // After successful sign-in, verify user type in respective table
      const table = userType === 'lawyer' ? 'lawyers' : 'clients';
      const { data: userData, error: userError } = await supabase
        .from(table)
        .select('*')
        .eq('email', email)
        .single();

      if (userError || !userData) {
        throw new Error(`Invalid ${userType} credentials`);
      }

      // Redirect based on user type
      router.push(`/${userType}-dashboard`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Legal Portal Sign In
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="lawyer" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="lawyer">Lawyer Sign In</TabsTrigger>
              <TabsTrigger value="client">Client Sign In</TabsTrigger>
            </TabsList>

            {(['lawyer', 'client'] as const).map((userType) => (
              <TabsContent key={userType} value={userType}>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleSignIn(userType);
                }}>
                  <div className="space-y-4">
                    <div>
                      <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? 'Signing in...' : `Sign in as ${userType}`}
                    </Button>

                    <div className="text-center text-sm">
                      <a href={`/${userType}-registration`} className="text-blue-600 hover:underline">
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
};

export default SignInPage;