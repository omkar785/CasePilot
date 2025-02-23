"use client"
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, FileText } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

const ClientDash = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    case_type: '',
    status: 'Pending',
    plaintiff: '',
    defendant: '',
    court: '',
    urgency: '',
    description: ''
  });

  // Sample case data (keeping this for initial render before DB data loads)
  const [cases] = useState([
    {
      id: 1,
      subject: "Property Dispute",
      type: "Civil",
      urgency: "High",
      progress: 75,
      description: "Boundary dispute with neighboring property",
      date: "2025-02-20"
    },
    {
      id: 2,
      subject: "Contract Review",
      type: "Commercial",
      urgency: "Medium",
      progress: 30,
      description: "Annual vendor agreement review",
      date: "2025-02-15"
    },
    {
      id: 3,
      subject: "Employment Matter",
      type: "Labor",
      urgency: "Low",
      progress: 90,
      description: "Employee handbook update",
      date: "2025-02-10"
    }
  ]);

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase
        .from('cases')
        .insert([
          {
            title: formData.title,
            case_type: formData.case_type,
            status: formData.status,
            plaintiff: formData.plaintiff,
            defendant: formData.defendant,
            court: formData.court,
            description: formData.description,
            urgency: formData.urgency,
            file_date: new Date().toISOString().split('T')[0],
            progress: 0, // Initial progress for new cases
            client_id: 1, // Replace with actual client_id
            lawyer_id: null // This can be assigned later by the law firm
          }
        ])
        .select();

      if (error) throw error;

      toast.success('Case request submitted successfully');

      setIsOpen(false);
      setFormData({
        title: '',
        case_type: '',
        status: 'Pending',
        plaintiff: '',
        defendant: '',
        court: '',
        urgency: '',
        description: ''
      });

    } catch (error) {
      toast.error('Failed to submit case request');
      console.error('Error submitting case:', error);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-[#DDD0C8] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#3F372C]">Case Dashboard</h1>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#A77532] hover:bg-[#634419] text-white">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Case
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#DDD0C8]">
              <DialogHeader>
                <DialogTitle>Create New Case</DialogTitle>
                <DialogDescription>
                  Fill in the details for your new case
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#3F372C]">Case Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-md border border-[#B99364] p-2"
                    placeholder="Enter case title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3F372C]">Case Type</label>
                  <Select name="case_type" onValueChange={(value) => handleSelectChange('case_type', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select case type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Civil">Civil</SelectItem>
                      <SelectItem value="Criminal">Criminal</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                      <SelectItem value="Labor">Labor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3F372C]">Plaintiff</label>
                  <input
                    type="text"
                    name="plaintiff"
                    value={formData.plaintiff}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-md border border-[#B99364] p-2"
                    placeholder="Enter plaintiff name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3F372C]">Defendant</label>
                  <input
                    type="text"
                    name="defendant"
                    value={formData.defendant}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-md border border-[#B99364] p-2"
                    placeholder="Enter defendant name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3F372C]">Court</label>
                  <input
                    type="text"
                    name="court"
                    value={formData.court}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-md border border-[#B99364] p-2"
                    placeholder="Enter court name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3F372C]">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-md border border-[#B99364] p-2"
                    rows={4}
                    placeholder="Enter case description"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3F372C]">Urgency</label>
                  <Select name="urgency" onValueChange={(value) => handleSelectChange('urgency', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select urgency level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full bg-[#A77532] hover:bg-[#634419] text-white">
                  Submit Case Request
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((case_) => (
            <Card key={case_.id} className="bg-white">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold text-[#3F372C]">
                    {case_.subject}
                  </CardTitle>
                  <span className={`px-2 py-1 rounded-full text-xs text-white ${getUrgencyColor(case_.urgency)}`}>
                    {case_.urgency}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-[#323232]">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>{case_.type}</span>
                  </div>
                  <p className="text-sm text-[#323232]">{case_.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{case_.progress}%</span>
                    </div>
                    <div className="w-full bg-[#DDD0C8] rounded-full h-2">
                      <div
                        className="bg-[#A77532] h-2 rounded-full"
                        style={{ width: `${case_.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-xs text-[#323232]">
                    Opened on: {case_.date}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientDash;