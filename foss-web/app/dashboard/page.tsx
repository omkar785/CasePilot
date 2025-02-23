"use client"

import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BookOpen, Plus, Twitter, Instagram, Youtube, Linkedin, ChevronRight, Gavel, Calendar, Clock, Building2, Check, X } from "lucide-react";
import { createClient } from '@supabase/supabase-js';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from 'next/navigation';
import { NewCaseForm } from '@/components/NewCaseForm';
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

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

interface Request {
  id: string;
  title: string;
  status: string;
  filed: string;
  description: string;
  plaintiff: string;
  defendant: string;
  caseType: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const CaseCard = ({ case_ }: { case_: Case }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Sheet>
      <SheetTrigger asChild>
        <Card className="relative bg-[#DDD0C8] border-2 border-[#634419]/20 rounded-lg transition-all duration-300 cursor-pointer hover:bg-[#CBB296]/40 hover:border-[#634419]/70 hover:shadow-lg">
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
      </SheetTrigger>
      <SheetContent side="right" className="bg-[#E8E1DB] border-l border-[#513F31]/20 w-full max-w-md p-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="border-b border-[#694E37]/10 pb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-[#694E37]/60">Case #{case_.id}</p>
              <Button 
                variant="ghost"
                size="sm"
                className="text-[#694E37] hover:text-[#513F31] p-0 h-auto flex items-center gap-1"
              >
                View Details
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <h2 className="text-xl font-medium text-[#694E37]">{case_.title}</h2>
          </div>

          <div className="space-y-2 text-sm">
            <p className="text-[#694E37]/80 leading-relaxed">{case_.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#694E37]/60" />
              <span className="text-[#694E37]/60">Status:</span>
              <span className="text-[#694E37]">{case_.status}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#694E37]/60" />
              <span className="text-[#694E37]/60">Filed:</span>
              <span className="text-[#694E37]">{case_.filed}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[#694E37]/60" />
              <span className="text-[#694E37]/60">Court:</span>
              <span className="text-[#694E37]">{case_.court}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Gavel className="h-4 w-4 text-[#694E37]/60" />
              <span className="text-[#694E37]/60">Judge:</span>
              <span className="text-[#694E37]">{case_.judge}</span>
            </div>
          </div>

          <div className="border-t border-[#694E37]/10 pt-4 space-y-3">
            <div>
              <p className="text-sm mb-2 text-[#694E37]/60">Parties</p>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="text-[#694E37]/60">Plaintiff:</span>
                  <span className="text-[#694E37]">{case_.plaintiff}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[#694E37]/60">Defendant:</span>
                  <span className="text-[#694E37]">{case_.defendant}</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex gap-2 text-sm">
                <span className="text-[#694E37]/60">Next Hearing:</span>
                <span className="text-[#694E37]">{case_.nextHearing}</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
  <Link href="/CasePage">
    <Button className="w-full bg-[#694E37] text-white hover:bg-[#513F31]">
      Read More
    </Button>
  </Link>
</div>
        </motion.div>
      </SheetContent>
    </Sheet>
  </motion.div>
);

const RequestCard = ({ request, onAccept, onReject }: { 
  request: Request; 
  onAccept: (id: string) => void; 
  onReject: (id: string) => void; 
}) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Card className="relative bg-[#DDD0C8] border-2 border-[#634419]/20 rounded-lg">
      <CardContent className="flex items-start gap-4 p-5">
        <BookOpen className="h-6 w-6 text-[#634419] mt-1 flex-shrink-0" />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-[#3F372C]/70 font-medium">#{request.id}</p>
              <h3 className="text-[#3F372C] mt-1 font-semibold text-lg">{request.title}</h3>
            </div>
            <div className="flex gap-2">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => onAccept(request.id)}
                >
                  <Check className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => onReject(request.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
          <p className="text-[#634419]/80 mt-2 text-sm">{request.description}</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs px-2 py-1 bg-[#B99364]/20 text-[#634419] rounded-full">{request.status}</span>
            <span className="text-xs text-[#3F372C]/60">{request.filed}</span>
          </div>
          <div className="mt-3 text-sm">
            <div className="flex gap-2">
              <span className="text-[#634419]/60">Plaintiff:</span>
              <span className="text-[#634419]">{request.plaintiff}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#634419]/60">Defendant:</span>
              <span className="text-[#634419]">{request.defendant}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const Dashboard = () => {
  const router = useRouter();
  const [newCaseSheetOpen, setNewCaseSheetOpen] = useState(false);
  const [cases, setCases] = useState<Case[]>([]);
  const [requests, setRequests] = useState<Request[]>([
    {
      id: "REQ001",
      title: "Civil Dispute Resolution",
      status: "Pending",
      filed: "2024-02-20",
      description: "Request for legal representation in a property dispute case",
      plaintiff: "John Smith",
      defendant: "Property Corp Ltd",
      caseType: "Civil"
    },
    {
      id: "REQ002",
      title: "Corporate Contract Review",
      status: "Pending",
      filed: "2024-02-21",
      description: "Legal consultation needed for merger agreement review",
      plaintiff: "Tech Startup Inc",
      defendant: "Big Tech Corp",
      caseType: "Corporate"
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const { data, error: casesError } = await supabase
        .from('cases')
        .select('*')
        .order('file_date', { ascending: false });

      if (casesError) throw casesError;

      const transformedCases = data.map(caseData => ({
        id: caseData.id,
        title: caseData.title,
        status: caseData.status,
        filed: new Date(caseData.file_date).toLocaleDateString(),
        court: caseData.court,
        judge: caseData.judge || 'Not assigned',
        nextHearing: caseData.next_date ? new Date(caseData.next_date).toLocaleDateString() : 'Not scheduled',
        plaintiff: caseData.plaintiff,
        defendant: caseData.defendant,
        caseType: caseData.case_type,
        description: caseData.description || 'No description available'
      }));

      setCases(transformedCases);
      
      const subscription = supabase
        .channel('cases_channel')
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'cases'
          }, 
          () => fetchCases()
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching cases');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = (requestId: string) => {
    setRequests(prevRequests => {
      const newRequests = prevRequests.filter(req => req.id !== requestId);
      return newRequests;
    });
  };

  const handleRejectRequest = (requestId: string) => {
    setRequests(prevRequests => {
      const newRequests = prevRequests.filter(req => req.id !== requestId);
      return newRequests;
    });
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-[#634419]/60 py-12"
      >
        Loading...
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-red-600 py-12"
      >
        {error}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#DDD0C8] relative overflow-hidden font-serif"
    >
      <main className="max-w-7xl mx-auto px-8 py-12">
        <motion.h2
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-serif text-[#634419] mb-12 font-bold"
        >
          Dashboard
        </motion.h2>

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
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-[#CBB296]/10 rounded-xl p-8 border border-[#634419]/20 mt-6"
              >
                {cases.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-[#634419]/60 py-12"
                  >
                    No current cases to display
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                      {cases.map((case_) => (
                        <CaseCard key={case_.id} case_={case_} />
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            </TabsContent>

            <TabsContent value="requests">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-[#CBB296]/10 rounded-xl p-8 border border-[#634419]/20 mt-6"
              >
                {requests.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-[#634419]/60 py-12"
                  >
                    No pending requests to display
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AnimatePresence>
                      {requests.map((request) => (
                        <RequestCard
                          key={request.id}
                          request={request}
                          onAccept={handleAcceptRequest}
                          onReject={handleRejectRequest}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            </TabsContent>

            <TabsContent value="past">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-[#634419]/60 py-12 bg-[#CBB296]/10 rounded-xl mt-6"
              >
                No past cases to display
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        <Button 
          variant="ghost" 
          className="fixed bottom-8 right-8 h-16 w-16 rounded-full bg-[#634419] hover:bg-[#3F372C] text-white shadow-xl
                     transition-all duration-300 hover:scale-105"
          onClick={() => setNewCaseSheetOpen(true)}
        >
          <Plus className="h-8 w-8" />
        </Button>
      </motion.div>

      <NewCaseForm 
        open={newCaseSheetOpen} 
        onOpenChange={setNewCaseSheetOpen}
      />

      <motion.footer
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="py-8"
      >
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
      </motion.footer>
    </motion.div>
  );
};

export default Dashboard;