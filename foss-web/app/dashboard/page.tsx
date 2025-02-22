"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Calendar, Scale, Clock, Filter, Search, 
  CreditCard, AlertCircle, CheckCircle, ChevronDown 
} from 'lucide-react';

const CaseDashboard = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [showFilters, setShowFilters] = useState(false);

  const cases = {
    current: [
      {
        id: 1,
        title: "Smith vs. Johnson",
        category: "Civil Litigation",
        subCategory: "Property Dispute",
        nextHearing: "2025-03-15",
        judge: "Hon. Sarah Williams",
        purpose: "Final Arguments",
        status: "In Progress",
        urgency: "High",
        parties: {
          plaintiff: "John Smith",
          defendant: "Robert Johnson"
        },
        hearings: [
          {
            date: "2025-02-01",
            purpose: "Initial Hearing",
            order: "Preliminary evidence to be submitted",
            completed: true
          },
          {
            date: "2025-03-15",
            purpose: "Final Arguments",
            order: "Pending",
            completed: false
          }
        ],
        payment: {
          method: "Credit Card",
          status: "Paid"
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#DDD0C8]/10">
      <nav className="bg-[#323232] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-semibold">LegalPro</h1>
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search cases..."
                  className="w-64 px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-[#A77532]"
                />
                <Search className="w-4 h-4 absolute right-3 top-3 opacity-50" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-white">
                Notifications
              </Button>
              <div className="relative">
                <img
                  src="/api/placeholder/40/40"
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-[#A77532]"
                />
                <CheckCircle className="w-4 h-4 text-[#A77532] absolute -bottom-1 -right-1 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-[#3F372C]">Case Management</h2>
          <Button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-[#634419] hover:bg-[#3F372C] text-white"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {showFilters && (
          <Card className="mb-8 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <label className="text-sm text-[#634419] block mb-2">Urgency</label>
                  <select className="w-full p-2 border rounded-lg border-[#CBB296]">
                    <option>All</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-[#634419] block mb-2">Payment Status</label>
                  <select className="w-full p-2 border rounded-lg border-[#CBB296]">
                    <option>All</option>
                    <option>Paid</option>
                    <option>Pending</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-[#634419] block mb-2">Date Range</label>
                  <input 
                    type="date" 
                    className="w-full p-2 border rounded-lg border-[#CBB296]"
                  />
                </div>
                <div>
                  <label className="text-sm text-[#634419] block mb-2">Case Type</label>
                  <select className="w-full p-2 border rounded-lg border-[#CBB296]">
                    <option>All Types</option>
                    <option>Civil</option>
                    <option>Criminal</option>
                    <option>Family</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="current" className="space-y-8">
          <TabsList className="bg-[#3F372C] p-1 rounded-lg">
            <TabsTrigger 
              value="current" 
              className="text-white data-[state=active]:bg-[#A77532]"
            >
              Current Cases
            </TabsTrigger>
            <TabsTrigger 
              value="available" 
              className="text-white data-[state=active]:bg-[#A77532]"
            >
              Available Cases
            </TabsTrigger>
            <TabsTrigger 
              value="requests" 
              className="text-white data-[state=active]:bg-[#A77532]"
            >
              Case Requests
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.current.map(caseItem => (
                <Card key={caseItem.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-[#634419] text-white">
                    <CardTitle className="flex items-center justify-between">
                      <span>{caseItem.title}</span>
                      <Scale className="w-5 h-5" />
                    </CardTitle>
                    <div className="text-sm opacity-90">{caseItem.category}</div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-[#3F372C]">
                        <Calendar className="w-4 h-4" />
                        <span>{caseItem.nextHearing}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        caseItem.urgency === 'High' 
                          ? 'bg-[#A77532] text-white' 
                          : 'bg-[#DDD0C8] text-[#3F372C]'
                      }`}>
                        {caseItem.urgency}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-[#3F372C]">
                      <Clock className="w-4 h-4" />
                      <span>{caseItem.purpose}</span>
                    </div>
                    <div className="text-sm text-[#634419]">
                      Judge: {caseItem.judge}
                    </div>
                    <div className="border-t border-[#DDD0C8] pt-4 mt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#3F372C]">Next Hearing</span>
                        <span className="text-[#634419] font-medium">{caseItem.nextHearing}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CaseDashboard;