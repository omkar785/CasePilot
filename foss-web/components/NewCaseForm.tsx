
"use client"

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BookOpen, X, Twitter, Instagram, Youtube, Linkedin, Compass, Filter, ChevronRight, User, Calendar, Gavel, Building2, Clock, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { createClient } from '@supabase/supabase-js';
import { CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';


export const NewCaseForm = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {

    const [formData, setFormData] = useState({
      title: '',
      lawyer_id: '',
      client_id: '',
      status: '',
      case_type: '',
      plaintiff: '',
      defendant: '',
      next_date: '',
      court: '',
      file_date: ''
    });
  
    const [message, setMessage] = useState({ type: '', content: '' });
  
    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleSelectChange = (value: string, name: string) => {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      
      try {
        // Initialize Supabase client
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL as string,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
        );
  
        const { data, error } = await supabase
          .from('cases')
          .insert([formData])
          .select();
  
        if (error) throw error;
  
        setMessage({
          type: 'success',
          content: 'Case created successfully!'
        });
  
        // Reset form
        setFormData({
          title: '',
          lawyer_id: '',
          client_id: '',
          status: '',
          case_type: '',
          plaintiff: '',
          defendant: '',
          next_date: '',
          court: '',
          file_date: ''
        });
  
      } catch (error) {
        setMessage({
          type: 'error',
          content: (error as any).message
        });
      }
    };
  
    return (
      
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="bg-[#E8E1DB] border-l border-[#513F31]/20 w-full max-w-lg overflow-y-auto">
          <SheetHeader className="border-b border-[#513F31]/10 pb-6">
            <SheetTitle className="text-3xl font-serif text-[#694E37]">New Case</SheetTitle>
            <p className="text-[#694E37]/60 text-sm">Enter the details for the new case below</p>
          </SheetHeader>
  
          <form onSubmit={handleSubmit} className="mt-8 space-y-8">
            <div className="p-6 bg-white/40 rounded-xl border border-[#694E37]/20 space-y-6">
              <h3 className="text-lg font-medium text-[#694E37] border-b border-[#513F31]/10 pb-2">Basic Information</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-[#694E37] font-medium">Case Title</Label>
                  <Input 
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="bg-white border-[#694E37]/20 focus:border-[#694E37] focus:ring-[#694E37]/20"
                    placeholder="Enter case title"
                  />
                </div>
  
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lawyer_id" className="text-[#694E37] font-medium">Lawyer ID</Label>
                    <Input
                      id="lawyer_id"
                      name="lawyer_id"
                      type="number"
                      value={formData.lawyer_id}
                      onChange={handleInputChange}
                      required
                      className="bg-white border-[#694E37]/20 focus:border-[#694E37] focus:ring-[#694E37]/20"
                    />
                  </div>
  
                  <div className="space-y-2">
                    <Label htmlFor="client_id" className="text-[#694E37] font-medium">Client ID</Label>
                    <Input
                      id="client_id"
                      name="client_id"
                      type="number"
                      value={formData.client_id}
                      onChange={handleInputChange}
                      required
                      className="bg-white border-[#694E37]/20 focus:border-[#694E37] focus:ring-[#694E37]/20"
                    />
                  </div>
                </div>
  
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-[#694E37] font-medium">Status</Label>
                  <Select name="status" onValueChange={(value) => handleSelectChange(value, 'status')} required>
                    <SelectTrigger className="bg-white border-[#694E37]/20 focus:border-[#694E37] focus:ring-[#694E37]/20">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
  
                <div className="space-y-2">
                  <Label htmlFor="case_type" className="text-[#694E37] font-medium">Case Type</Label>
                  <Select name="case_type" onValueChange={(value) => handleSelectChange(value, 'case_type')} required>
                    <SelectTrigger className="bg-white border-[#694E37]/20 focus:border-[#694E37] focus:ring-[#694E37]/20">
                      <SelectValue placeholder="Select case type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="civil">Civil Litigation</SelectItem>
                      <SelectItem value="criminal">Criminal</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="family">Family Law</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
  
            <div className="p-6 bg-white/40 rounded-xl border border-[#694E37]/20 space-y-6">
              <h3 className="text-lg font-medium text-[#694E37] border-b border-[#513F31]/10 pb-2">Parties Involved</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plaintiff" className="text-[#694E37] font-medium">Plaintiff</Label>
                  <Input
                    id="plaintiff"
                    name="plaintiff"
                    value={formData.plaintiff}
                    onChange={handleInputChange}
                    required
                    className="bg-white border-[#694E37]/20 focus:border-[#694E37] focus:ring-[#694E37]/20"
                    placeholder="Enter plaintiff name"
                  />
                </div>
  
                <div className="space-y-2">
                  <Label htmlFor="defendant" className="text-[#694E37] font-medium">Defendant</Label>
                  <Input
                    id="defendant"
                    name="defendant"
                    value={formData.defendant}
                    onChange={handleInputChange}
                    required
                    className="bg-white border-[#694E37]/20 focus:border-[#694E37] focus:ring-[#694E37]/20"
                    placeholder="Enter defendant name"
                  />
                </div>
              </div>
            </div>
  
            <div className="p-6 bg-white/40 rounded-xl border border-[#694E37]/20 space-y-6">
              <h3 className="text-lg font-medium text-[#694E37] border-b border-[#513F31]/10 pb-2">Important Dates</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="next_date" className="text-[#694E37] font-medium">Next Date</Label>
                  <Input
                    id="next_date"
                    name="next_date"
                    type="date"
                    value={formData.next_date}
                    onChange={handleInputChange}
                    className="bg-white border-[#694E37]/20 focus:border-[#694E37] focus:ring-[#694E37]/20"
                  />
                </div>
  
                <div className="space-y-2">
                  <Label htmlFor="file_date" className="text-[#694E37] font-medium">File Date</Label>
                  <Input
                    id="file_date"
                    name="file_date"
                    type="date"
                    value={formData.file_date}
                    onChange={handleInputChange}
                    required
                    className="bg-white border-[#694E37]/20 focus:border-[#694E37] focus:ring-[#694E37]/20"
                  />
                </div>
              </div>
  
              <div className="space-y-2">
                <Label htmlFor="court" className="text-[#694E37] font-medium">Court</Label>
                <Input
                  id="court"
                  name="court"
                  value={formData.court}
                  onChange={handleInputChange}
                  required
                  className="bg-white border-[#694E37]/20 focus:border-[#694E37] focus:ring-[#694E37]/20"
                  placeholder="Enter court name"
                />
              </div>
            </div>
  
            {message.content && (
              <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
                <AlertTitle>{message.type === 'error' ? 'Error' : 'Success'}</AlertTitle>
                <AlertDescription>{message.content}</AlertDescription>
              </Alert>
            )}
  
            <div className="sticky bottom-0 pt-4 pb-6 bg-[#E8E1DB] border-t border-[#513F31]/10">
              <div className="flex gap-3">
                <Button 
                  type="button"
                  variant="outline"
                  className="flex-1 border-[#694E37] text-[#694E37] hover:bg-[#694E37]/10"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="flex-1 bg-[#694E37] text-white hover:bg-[#513F31]"
                >
                  Create Case
                </Button>
              </div>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    );
  };