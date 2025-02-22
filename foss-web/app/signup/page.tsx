"use client";

import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import type { Lawyer, Client } from '@/types/database';

const RegistrationPage = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    location: '',
    languages: '',
    // Lawyer specific
    experience: '',
    specialty: '',
    jurisdiction: '',
    clientType: '',
    hourlyRate: '',
    // Client specific
    phone: '',
    budget: '',
    preferredContact: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (userType: 'lawyer' | 'client') => {
    const commonFields = ['email', 'password', 'name', 'location'];
    const lawyerFields = ['experience', 'specialty', 'jurisdiction', 'clientType', 'hourlyRate'];
    const clientFields = ['phone', 'preferredContact'];

    const requiredFields = userType === 'lawyer' 
      ? [...commonFields, ...lawyerFields]
      : [...commonFields, ...clientFields];

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        throw new Error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
      }
    }
  };

  const handleRegistration = async (userType: 'lawyer' | 'client') => {
    try {
      setLoading(true);
      setError('');

      // Validate form
      validateForm(userType);

      // 1. Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/${userType}-dashboard`,
        }
      });

      if (authError) throw authError;
      if (!authData.user?.id) throw new Error('No user ID returned from authentication');

      // 2. Create profile based on user type
      const profileData = userType === 'lawyer' 
        ? {
            auth_id: authData.user.id,
            name: formData.name,
            email: formData.email,
            experience: parseInt(formData.experience),
            specialty: formData.specialty,
            location: formData.location,
            jurisdiction: formData.jurisdiction,
            client_type: formData.clientType,
            hourly_rate: parseFloat(formData.hourlyRate),
            languages: formData.languages,
            rating: 0,
            avg_days_completion: 0
          } as Partial<Lawyer>
        : {
            auth_id: authData.user.id,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            location: formData.location,
            budget: formData.budget ? parseFloat(formData.budget) : null,
            languages: formData.languages,
            preferred_contact_method: formData.preferredContact
          } as Partial<Client>;

      const { error: profileError } = await supabase
        .from(userType === 'lawyer' ? 'lawyers' : 'clients')
        .insert([profileData]);

      if (profileError) throw profileError;

      // 3. Redirect to verification page
      router.push('/auth/verify');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const specialties = [
    'Criminal Law',
    'Family Law',
    'Corporate Law',
    'Civil Litigation',
    'Real Estate Law',
    'Intellectual Property',
    'Immigration Law',
    'Tax Law'
  ];

  const contactMethods = ['Email', 'Phone', 'Text', 'WhatsApp'];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <Card className="w-full max-w-2xl mx-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Legal Portal Registration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="lawyer" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="lawyer">Lawyer Registration</TabsTrigger>
              <TabsTrigger value="client">Client Registration</TabsTrigger>
            </TabsList>

            {/* Lawyer Registration Form */}
            <TabsContent value="lawyer">
              <form onSubmit={(e) => {
                e.preventDefault();
                handleRegistration('lawyer');
              }}>
                <div className="space-y-4">
                  <Input
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="experience"
                    type="number"
                    placeholder="Years of Experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                  />
                  <Select 
                    onValueChange={(value) => handleSelectChange('specialty', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {/* Add other lawyer-specific fields */}
                  
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Registering...' : 'Register as Lawyer'}
                  </Button>
                </div>
              </form>
            </TabsContent>

            {/* Client Registration Form */}
            <TabsContent value="client">
              <form onSubmit={(e) => {
                e.preventDefault();
                handleRegistration('client');
              }}>
                <div className="space-y-4">
                  <Input
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  <Select 
                    onValueChange={(value) => handleSelectChange('preferredContact', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Preferred Contact Method" />
                    </SelectTrigger>
                    <SelectContent>
                      {contactMethods.map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {/* Add other client-specific fields */}

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Registering...' : 'Register as Client'}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationPage;