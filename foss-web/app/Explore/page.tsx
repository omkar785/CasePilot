"use client"
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { X, Twitter, Instagram, Youtube, Linkedin, Compass, Filter, Calendar, User, Clock, ChevronRight } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const ExplorePage = () => {
  const cases = [
    {
      id: 1,
      image: "/placeholder/150/150",
      subject: "Subject",
      body: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
      author: "John Doe",
      date: "Feb 22, 2025",
      readTime: "5 min read",
      fullDescription: "This is a more detailed description of the case study that appears in the hover card. It can include additional context, methodology, results, and key learnings from the case study."
    },
    {
      id: 2,
      image: "/placeholder/150/150",
      subject: "Subject",
      body: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
      author: "Jane Smith",
      date: "Feb 21, 2025",
      readTime: "7 min read",
      fullDescription: "This is a more detailed description of the case study that appears in the hover card. It can include additional context, methodology, results, and key learnings from the case study."
    },
    {
      id: 3,
      image: "/placeholder/150/150",
      subject: "Subject",
      body: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
      author: "Alex Johnson",
      date: "Feb 20, 2025",
      readTime: "4 min read",
      fullDescription: "This is a more detailed description of the case study that appears in the hover card. It can include additional context, methodology, results, and key learnings from the case study."
    },
  ];

  return (
    <div className="min-h-screen bg-[#E2DBD7] font-serif">
      {/* Navigation */}
      <nav className="border-b border-[#694E37]/10 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-4xl font-serif text-[#694E37]">
            CasePilot
          </h1>

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
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-6 text-[#694E37] text-sm">
              <a href="/dashboard" className="hover:text-[#694E37]/80">Dashboard</a>
              <a href="#" className="hover:text-[#694E37]/80">Explore Cases</a>
              <a href="#" className="hover:text-[#694E37]/80">Resources</a>
            </div>
            
            <Avatar className="h-8 w-8">
              <AvatarImage src="/api/placeholder/32/32" alt="Profile" />
            </Avatar>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-10">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <Compass className="h-12 w-12 text-[#694E37]" />
            <h2 className="text-5xl font-serif text-[#694E37]">Explore Cases</h2>
          </div>
          <Button
            variant="outline"
            className="text-[#694E37] border-[#694E37]/20 hover:bg-[#694E37]/10 flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="space-y-6">
          {cases.map((case_) => (
            <Card key={case_.id} className="p-6 border-[#694E37]/20 bg-transparent hover:bg-white/5 transition-colors">
              <CardContent className="p-0 flex gap-6">
                <img
                  src={case_.image}
                  alt="Case thumbnail"
                  className="w-[150px] h-[150px] object-cover rounded-md bg-white/20"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-[#694E37] mb-2">{case_.subject}</h3>
                  <p className="text-[#694E37]/80 mb-4">{case_.body}</p>
                  <HoverCard openDelay={0} closeDelay={0}>
                    <HoverCardTrigger>
                      <span className="flex items-center text-[#694E37] hover:text-[#694E37]/80 transition-colors font-medium cursor-pointer group">
                        See more
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent 
                      className="w-80 bg-white border-[#694E37]/20" 
                      sideOffset={5}
                      align="start"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-[#694E37]/60" />
                            <span className="text-sm text-[#694E37]">{case_.author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-[#694E37]/60" />
                            <span className="text-sm text-[#694E37]">{case_.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-[#694E37]/60" />
                          <span className="text-sm text-[#694E37]">{case_.readTime}</span>
                        </div>
                        <p className="text-sm text-[#694E37]/80">
                          {case_.fullDescription}
                        </p>
                        <Button 
                          className="w-full bg-[#694E37] text-white hover:bg-[#694E37]/90"
                        >
                          Read Full Case
                        </Button>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
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

export default ExplorePage;