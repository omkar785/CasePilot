"use client"
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BookOpen, X, User, Calendar, Gavel, Building2, Clock, Plus } from "lucide-react";
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
    className="relative bg-transparent border-2 border-[#513F31]/20 rounded-lg transition-all duration-300 cursor-pointer 
             hover:bg-white/40 hover:border-[#513F31]/70 hover:shadow-lg hover:-translate-y-1
             before:absolute before:inset-0 before:border-2 before:border-[#513F31]/10 before:rounded-lg
             before:transition-all before:duration-300 hover:before:scale-105 hover:before:border-[#513F31]/40
             after:absolute after:inset-0 after:border-2 after:border-[#513F31]/5 after:rounded-lg
             after:transition-all after:duration-300 hover:after:scale-110 hover:after:border-[#513F31]/20"
  >
    <CardContent className="flex items-start gap-3 p-4">
      <BookOpen className="h-5 w-5 text-[#694E37] mt-1 transition-transform group-hover:scale-110" />
      <div>
        <p className="text-sm text-[#694E37]/60">#{case_.id}</p>
        <p className="text-[#694E37] mt-1 font-medium">{case_.title}</p>
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
    <div className="min-h-screen bg-[#E8E1DB] relative overflow-hidden font-serif">
      <nav className="border-b border-[#694E37]/10 px-8 py-3 bg-[#EDE7E2]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-5xl font-serif text-[#694E37]">
            CasePilot
          </h1>

          <div className="flex-1 flex justify-center max-w-xs mx-8">
            <div className="flex items-center gap-2">
              <Input
                type="search"
                placeholder="Search"
                className="bg-transparent border border-[#694E37]/20 focus:border-[#694E37] rounded-full px-3 py-1 text-sm h-8"
              />
              <Button
                variant="ghost"
                size="sm"
                className="text-[#694E37]/60 hover:text-[#694E37] h-8 w-8 p-0 flex items-center justify-center"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-6 text-[#694E37] text-sm">
              <a href="#" className="hover:text-[#694E37]/80">My Cases</a>
              <a href="#" className="hover:text-[#694E37]/80">Available Cases</a>
              <a href="#" className="hover:text-[#694E37]/80">Requests</a>
              <a href="#" className="hover:text-[#694E37]/80">Resources</a>
            </div>

            <Button variant="ghost" size="icon" className="rounded-full p-0">
              <User className="h-5 w-5 text-[#694E37]" />
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-10">
        <h2 className="text-5xl font-serif text-[#694E37] mb-8">Dashboard</h2>

        <div className="mb-8">
          <Tabs defaultValue="current">
            <TabsList className="bg-transparent space-x-4 p-0">
              <TabsTrigger
                value="current"
                className="text-sm text-[#694E37] data-[state=active]:border-b-2 data-[state=active]:border-[#694E37] hover:text-[#694E37] transition-colors duration-200 hover:bg-white/20 px-4 py-2 rounded-md"
              >
                Current Cases
              </TabsTrigger>
              <TabsTrigger
                value="requests"
                className="text-sm text-[#694E37]/60 data-[state=active]:border-b-2 data-[state=active]:border-[#694E37] hover:text-[#694E37] transition-colors duration-200 hover:bg-white/20 px-4 py-2 rounded-md"
              >
                Requests
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="text-sm text-[#694E37]/60 data-[state=active]:border-b-2 data-[state=active]:border-[#694E37] hover:text-[#694E37] transition-colors duration-200 hover:bg-white/20 px-4 py-2 rounded-md"
              >
                Past Cases
              </TabsTrigger>
            </TabsList>
            <TabsContent value="current">
              <div className="bg-white/40 rounded-lg p-6 border border-[#694E37]/20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cases.map((case_) => (
                    <Sheet key={case_.id}>
                      <SheetTrigger>
                        <CaseCard case_={case_} />
                      </SheetTrigger>
                      <SheetContent side="right" className="bg-[#E8E1DB] border-l border-[#513F31]/20 w-full max-w-lg">
                        <SheetHeader>
                          <SheetTitle className="text-2xl font-serif text-[#694E37]">Case #{case_.id}</SheetTitle>
                          <div className="mt-2">
                            <p className="text-xl font-medium text-[#694E37]">{case_.title}</p>
                            <div className="mt-6 space-y-6">
                              <div className="p-4 bg-white/40 rounded-lg border border-[#694E37]/20">
                                <p className="font-medium text-[#694E37] mb-3">Case Overview</p>
                                <p className="text-sm text-[#694E37]/80">{case_.description}</p>
                              </div>
                              
                              <div className="space-y-4">
                                <div className="flex items-center gap-2 text-[#694E37]/80">
                                  <Clock className="h-4 w-4" />
                                  <span className="text-sm font-medium">Status:</span>
                                  <span className="text-sm">{case_.status}</span>
                                </div>
                                
                                <div className="flex items-center gap-2 text-[#694E37]/80">
                                  <Calendar className="h-4 w-4" />
                                  <span className="text-sm font-medium">Filed:</span>
                                  <span className="text-sm">{case_.filed}</span>
                                </div>
                                
                                <div className="flex items-center gap-2 text-[#694E37]/80">
                                  <Building2 className="h-4 w-4" />
                                  <span className="text-sm font-medium">Court:</span>
                                  <span className="text-sm">{case_.court}</span>
                                </div>
                                
                                <div className="flex items-center gap-2 text-[#694E37]/80">
                                  <Gavel className="h-4 w-4" />
                                  <span className="text-sm font-medium">Judge:</span>
                                  <span className="text-sm">{case_.judge}</span>
                                </div>
                              </div>

                              <div className="p-4 bg-white/40 rounded-lg border border-[#694E37]/20">
                                <p className="font-medium text-[#694E37] mb-3">Parties</p>
                                <div className="space-y-2">
                                  <p className="text-sm">
                                    <span className="font-medium">Plaintiff: </span>
                                    {case_.plaintiff}
                                  </p>
                                  <p className="text-sm">
                                    <span className="font-medium">Defendant: </span>
                                    {case_.defendant}
                                  </p>
                                </div>
                              </div>

                              <div className="p-4 bg-white/40 rounded-lg border border-[#694E37]/20">
                                <p className="font-medium text-[#694E37] mb-3">Next Steps</p>
                                <p className="text-sm">
                                  <span className="font-medium">Next Hearing: </span>
                                  {case_.nextHearing}
                                </p>
                              </div>

                              <div className="pt-4">
                                <Button 
                                  className="bg-[#694E37] text-white hover:bg-[#513F31] w-full"
                                >
                                  View Full Case Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        </SheetHeader>
                      </SheetContent>
                    </Sheet>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="requests">
              <div className="text-center text-[#694E37]/60 py-8">
                No pending requests to display
              </div>
            </TabsContent>
            <TabsContent value="past">
              <div className="text-center text-[#694E37]/60 py-8">
                No past cases to display
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Button 
        variant="ghost" 
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-[#694E37] hover:bg-[#513F31] text-white shadow-lg"
        onClick={() => setNewCaseSheetOpen(true)}
      >
        <Plus className="h-6 w-6" />
      </Button>

      <NewCaseForm 
        open={newCaseSheetOpen} 
        onOpenChange={setNewCaseSheetOpen}
      />

      <footer className="mt-10 py-6 text-center">
        <div className="flex justify-center gap-6">
          <a href="#" aria-label="Twitter" className="text-[#694E37]/60 hover:text-[#694E37]">𝕏</a>
          <a href="#" aria-label="Instagram" className="text-[#694E37]/60 hover:text-[#694E37]">◯</a>
          <a href="#" aria-label="YouTube" className="text-[#694E37]/60 hover:text-[#694E37]">▶</a>
          <a href="#" aria-label="LinkedIn" className="text-[#694E37]/60 hover:text-[#694E37]">in</a>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;