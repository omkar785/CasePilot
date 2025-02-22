"use client"
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BookOpen,X, Twitter, Instagram, Youtube, Linkedin, Compass, Filter,  ChevronRight, User, Calendar, Gavel, Building2, Clock, Plus } from "lucide-react";
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

interface Case {
  id: string;
  title: string;
  status: string;
  filed: string;
  court: string;
  judge: string;
  nextHearing: string;
  plaintiff: string;
  defendant: string;
  caseType: string;
  description: string;
}

const CaseCard = ({ case_ }: { case_: Case }) => (
  <Card 
    className="relative bg-[#DDD0C8] border-2 border-[#634419]/20 rounded-lg transition-all duration-300 cursor-pointer 
             hover:bg-[#CBB296]/40 hover:border-[#634419]/70 hover:shadow-lg hover:-translate-y-1
             before:absolute before:inset-0 before:border-2 before:border-[#634419]/10 before:rounded-lg
             before:transition-all before:duration-300 hover:before:scale-105 hover:before:border-[#634419]/40
             after:absolute after:inset-0 after:border-2 after:border-[#634419]/5 after:rounded-lg
             after:transition-all after:duration-300 hover:after:scale-110 hover:after:border-[#634419]/20"
  >
    <CardContent className="flex items-start gap-4 p-5 text-left">
      <BookOpen className="h-6 w-6 text-[#634419] mt-1 transition-transform group-hover:scale-110 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm text-[#3F372C]/70 font-medium">#{case_.id}</p>
        <h3 className="text-[#3F372C] mt-1 font-semibold text-lg">{case_.title}</h3>
        <p className="text-[#634419]/80 mt-2 text-sm">{case_.description}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs px-2 py-1 bg-[#B99364]/20 text-[#634419] rounded-full">{case_.status}</span>
          <span className="text-xs text-[#3F372C]/60">{case_.nextHearing}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const NewCaseForm = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="bg-[#E8E1DB] border-l border-[#513F31]/20 w-full max-w-lg overflow-y-auto">
        <SheetHeader className="border-b border-[#513F31]/10 pb-6">
          <SheetTitle className="text-3xl font-serif text-[#694E37]">New Case</SheetTitle>
          <p className="text-[#694E37]/60 text-sm">Enter the details for the new case below</p>
        </SheetHeader>
        
        <div className="mt-8 space-y-8">
          <div className="p-6 bg-white/40 rounded-xl border border-[#694E37]/20 space-y-6">
            <h3 className="text-lg font-medium text-[#694E37] border-b border-[#513F31]/10 pb-2">Basic Information</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-[#694E37] font-medium">Case Title</Label>
                <Input 
                  id="title" 
                  className="bg-white border-[#694E37]/20 focus:border-[#694E37] focus:ring-[#694E37]/20" 
                  placeholder="Enter case title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type" className="text-[#694E37] font-medium">Case Type</Label>
                <Select>
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

              <div className="space-y-2">
                <Label htmlFor="court" className="text-[#694E37] font-medium">Court</Label>
                <Input 
                  id="court" 
                  className="bg-white border-[#694E37]/20 focus:border-[#694E37] focus:ring-[#694E37]/20" 
                  placeholder="Enter court name"
                />
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
                  className="bg-white border-[#694E37]/20 focus:border-[#694E37] focus:ring-[#694E37]/20" 
                  placeholder="Enter plaintiff name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="defendant" className="text-[#694E37] font-medium">Defendant</Label>
                <Input 
                  id="defendant" 
                  className="bg-white border-[#694E37]/20 focus:border-[#694E37] focus:ring-[#694E37]/20" 
                  placeholder="Enter defendant name"
                />
              </div>
            </div>
          </div>

          <div className="p-6 bg-white/40 rounded-xl border border-[#694E37]/20 space-y-6">
            <h3 className="text-lg font-medium text-[#694E37] border-b border-[#513F31]/10 pb-2">Case Details</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description" className="text-[#694E37] font-medium">Case Description</Label>
                <Textarea 
                  id="description" 
                  className="bg-white border-[#694E37]/20 focus:border-[#694E37] focus:ring-[#694E37]/20 min-h-[120px]" 
                  placeholder="Enter a detailed description of the case"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nextHearing" className="text-[#694E37] font-medium">Next Hearing Date</Label>
                <Input 
                  id="nextHearing" 
                  type="date" 
                  className="bg-white border-[#694E37]/20 focus:border-[#694E37] focus:ring-[#694E37]/20"
                />
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 pt-4 pb-6 bg-[#E8E1DB] border-t border-[#513F31]/10">
            <div className="flex gap-3">
              <Button 
                variant="outline"
                className="flex-1 border-[#694E37] text-[#694E37] hover:bg-[#694E37]/10"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-[#694E37] text-white hover:bg-[#513F31]"
                onClick={() => onOpenChange(false)}
              >
                Create Case
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const Dashboard = () => {
  const [newCaseSheetOpen, setNewCaseSheetOpen] = useState(false);
  
  const cases = [
    { 
      id: "248703", 
      title: "Smith v. Jones",
      status: "Active",
      filed: "January 15, 2024",
      court: "Superior Court",
      judge: "Hon. Sarah Martinez",
      nextHearing: "March 15, 2024",
      plaintiff: "John Smith",
      defendant: "David Jones",
      caseType: "Civil Litigation",
      description: "Contract dispute regarding construction services"
    },
    { 
      id: "894829", 
      title: "The People v. Miller",
      status: "Active",
      filed: "December 5, 2023",
      court: "Criminal Court",
      judge: "Hon. Michael Chen",
      nextHearing: "March 20, 2024",
      plaintiff: "State of California",
      defendant: "Robert Miller",
      caseType: "Criminal",
      description: "Criminal charges related to financial fraud"
    },
    { 
      id: "878703", 
      title: "Williams v. Brown",
      status: "Active",
      filed: "February 1, 2024",
      court: "District Court",
      judge: "Hon. Patricia Wilson",
      nextHearing: "April 5, 2024",
      plaintiff: "Emma Williams",
      defendant: "James Brown",
      caseType: "Civil Litigation",
      description: "Employment discrimination lawsuit"
    },
    { 
      id: "830220", 
      title: "Miller Enterprises v. Davidson Holdings",
      status: "Pending",
      filed: "January 30, 2024",
      court: "Commercial Court",
      judge: "Hon. Robert Lee",
      nextHearing: "March 28, 2024",
      plaintiff: "Miller Enterprises LLC",
      defendant: "Davidson Holdings Inc.",
      caseType: "Commercial",
      description: "Breach of contract in software development agreement"
    },
    { 
      id: "198349", 
      title: "The State v. Davis",
      status: "Active",
      filed: "January 10, 2024",
      court: "Criminal Court",
      judge: "Hon. Elizabeth Taylor",
      nextHearing: "March 25, 2024",
      plaintiff: "State of New York",
      defendant: "Thomas Davis",
      caseType: "Criminal",
      description: "Criminal prosecution for cyber security breach"
    },
    { 
      id: "277494", 
      title: "Commonwealth v. Taylor",
      status: "Active",
      filed: "January 20, 2024",
      court: "Superior Court",
      judge: "Hon. David Anderson",
      nextHearing: "April 2, 2024",
      plaintiff: "Commonwealth",
      defendant: "Sarah Taylor",
      caseType: "Criminal",
      description: "Criminal charges related to tax evasion"
    }
  ];

  return (
    <div className="min-h-screen bg-[#DDD0C8] relative overflow-hidden font-serif">
      <main className="max-w-7xl mx-auto px-8 py-12">
        <h2 className="text-6xl font-serif text-[#634419] mb-12 font-bold">Dashboard</h2>

        <div className="mb-10">
          <Tabs defaultValue="current">
            <TabsList className="bg-transparent space-x-6 p-0 border-b border-[#634419]/20">
              <TabsTrigger
                value="current"
                className="text-base data-[state=active]:text-[#634419] data-[state=active]:font-bold 
                           data-[state=inactive]:text-[#634419]/40 hover:text-[#634419] transition-colors 
                           duration-200 hover:bg-transparent px-4 py-3 rounded-none relative
                           after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5
                           after:bg-[#634419] after:transform after:scale-x-0 data-[state=active]:after:scale-x-100
                           after:transition-transform after:duration-300"
              >
                Current Cases
              </TabsTrigger>
              <TabsTrigger
                value="requests"
                className="text-base data-[state=active]:text-[#634419] data-[state=active]:font-bold 
                           data-[state=inactive]:text-[#634419]/40 hover:text-[#634419] transition-colors 
                           duration-200 hover:bg-transparent px-4 py-3 rounded-none relative
                           after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5
                           after:bg-[#634419] after:transform after:scale-x-0 data-[state=active]:after:scale-x-100
                           after:transition-transform after:duration-300"
              >
                Requests
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="text-base data-[state=active]:text-[#634419] data-[state=active]:font-bold 
                           data-[state=inactive]:text-[#634419]/40 hover:text-[#634419] transition-colors 
                           duration-200 hover:bg-transparent px-4 py-3 rounded-none relative
                           after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5
                           after:bg-[#634419] after:transform after:scale-x-0 data-[state=active]:after:scale-x-100
                           after:transition-transform after:duration-300"
              >
                Past Cases
              </TabsTrigger>
            </TabsList>
            <TabsContent value="current">
              <div className="bg-[#CBB296]/10 rounded-xl p-8 border border-[#634419]/20 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cases.map((case_) => (
                    <Sheet key={case_.id}>
                      <SheetTrigger className="w-full">
                        <CaseCard case_={case_} />
                      </SheetTrigger>
                      <SheetContent side="right" className="bg-[#DDD0C8] border-l border-[#634419]/20 w-full max-w-lg">
                        {/* ... [Sheet content remains the same with updated colors] ... */}
                      </SheetContent>
                    </Sheet>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="requests">
              <div className="text-center text-[#634419]/60 py-12 bg-[#CBB296]/10 rounded-xl mt-6">
                No pending requests to display
              </div>
            </TabsContent>
            <TabsContent value="past">
              <div className="text-center text-[#634419]/60 py-12 bg-[#CBB296]/10 rounded-xl mt-6">
                No past cases to display
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Button 
        variant="ghost" 
        className="fixed bottom-8 right-8 h-16 w-16 rounded-full bg-[#634419] hover:bg-[#3F372C] text-white shadow-xl
                   transition-all duration-300 hover:scale-105"
        onClick={() => setNewCaseSheetOpen(true)}
      >
        <Plus className="h-8 w-8" />
      </Button>

      <NewCaseForm 
        open={newCaseSheetOpen} 
        onOpenChange={setNewCaseSheetOpen}
      />

<footer className="py-8">
        <div className="flex justify-center gap-6">
          <a href="#" aria-label="Twitter" className="text-[#694E37]/60 hover:text-[#694E37]">
            <Twitter className="h-5 w-5" />
          </a>
          <a href="#" aria-label="Instagram" className="text-[#694E37]/60 hover:text-[#694E37]">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="#" aria-label="YouTube" className="text-[#694E37]/60 hover:text-[#694E37]">
            <Youtube className="h-5 w-5" />
          </a>
          <a href="#" aria-label="LinkedIn" className="text-[#694E37]/60 hover:text-[#694E37]">
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;