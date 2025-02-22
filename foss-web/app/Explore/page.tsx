"use client"
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { X, Twitter, Instagram, Youtube, Linkedin, Compass, Filter, Calendar, User, Clock, ChevronRight, MapPin, Star , ArrowUpDown, Tags} from "lucide-react";
import { motion } from "framer-motion";

const ExplorePage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("recent");
  const [distance, setDistance] = useState([50]);
  const [rating, setRating] = useState([0]);
  const [specialization, setSpecialization] = useState("all");

  const cases = [
    {
      id: 1,
      image: "/placeholder/150/150",
      subject: "Intellectual Property Dispute",
      body: "A landmark case involving software patent infringement between two major tech companies, setting new precedents for digital innovation protection.",
      author: "John Doe",
      date: "Feb 22, 2025",
      rating: 4.8,
      distance: 2.5,
      specialization: "IP Law",
      fullDescription: "This case study examines the intricate details of modern intellectual property law in the digital age, focusing on software patents and their enforcement."
    },
    {
      id: 2,
      image: "/placeholder/150/150",
      subject: "Environmental Law Case",
      body: "Groundbreaking environmental protection case that established new standards for corporate responsibility in sustainable practices.",
      author: "Jane Smith",
      date: "Feb 21, 2025",
      rating: 4.5,
      distance: 5.1,
      specialization: "Environmental Law",
      fullDescription: "An in-depth analysis of corporate environmental responsibility and its intersection with modern environmental protection laws."
    },
    {
      id: 3,
      image: "/placeholder/150/150",
      subject: "Constitutional Rights",
      body: "A pivotal case addressing digital privacy rights and government surveillance in the modern technological era.",
      author: "Alex Johnson",
      date: "Feb 20, 2025",
      rating: 4.9,
      distance: 1.8,
      specialization: "Constitutional Law",
      fullDescription: "This case explores the delicate balance between national security interests and individual privacy rights in the digital age."
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-[#DDD0C8] font-serif">
      <main className="max-w-7xl mx-auto px-8 py-10">
        <motion.div 
          className="flex items-center justify-between mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <Compass className="h-12 w-12 text-[#634419]" />
            <h2 className="text-5xl font-serif text-[#634419]">Explore Cases</h2>
          </div>
          <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <Button
                  variant="outline"
                  className="text-[#634419] border-[#634419]/20 hover:bg-[#634419]/10 flex items-center gap-2 px-4 py-6 text-lg"
                >
                  <Filter className="h-5 w-5" />
                  Filter
                </Button>
              </HoverCardTrigger>
              <HoverCardContent 
                className="w-80 bg-[#DDD0C8] border-[#634419]/20 p-6"
                align="end"
              >
                <div className="space-y-6">
                  <div>
                    <label className="text-[#634419] font-medium flex items-center gap-2 mb-2">
                      <ArrowUpDown className="h-4 w-4" /> Sort By
                    </label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="bg-white/50 border-[#634419]/20">
                        <SelectValue placeholder="Select sorting" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="distance">Nearest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-[#634419] font-medium flex items-center gap-2 mb-2">
                      <Tags className="h-4 w-4" /> Specialization
                    </label>
                    <Select value={specialization} onValueChange={setSpecialization}>
                      <SelectTrigger className="bg-white/50 border-[#634419]/20">
                        <SelectValue placeholder="Select area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Areas</SelectItem>
                        <SelectItem value="healthcare">Healthcare Law</SelectItem>
                        <SelectItem value="tech">Technology Law</SelectItem>
                        <SelectItem value="financial">Financial Law</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-[#634419] font-medium flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4" /> Distance
                    </label>
                    <Slider
                      value={distance}
                      onValueChange={setDistance}
                      max={100}
                      step={1}
                      className="[&_[role=slider]]:bg-[#634419]"
                    />
                    <p className="text-sm text-[#634419]/60 mt-2">Within {distance} miles</p>
                  </div>

                  <div>
                    <label className="text-[#634419] font-medium flex items-center gap-2 mb-2">
                      <Star className="h-4 w-4" /> Minimum Rating
                    </label>
                    <Slider
                      value={rating}
                      onValueChange={setRating}
                      max={5}
                      step={0.5}
                      className="[&_[role=slider]]:bg-[#634419]"
                    />
                    <p className="text-sm text-[#634419]/60 mt-2">{rating} stars and above</p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
        </motion.div>

        <div className="space-y-6">
          {cases.map((case_, index) => (
            <motion.div
              key={case_.id}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0, transition: { delay: index * 0.1 } }
              }}
            >
              <Card className="p-6 border-[#634419]/20 bg-transparent hover:bg-white/5 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-0 flex gap-6">
                  <img
                    src={case_.image}
                    alt="Case thumbnail"
                    className="w-[150px] h-[150px] object-cover rounded-md bg-white/20"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-medium text-[#634419]">{case_.subject}</h3>
                      <div className="flex items-center gap-2 text-sm text-[#634419]/60">
                        <Star className="h-4 w-4 fill-[#A77532]" />
                        <span>{case_.rating}</span>
                        <span>•</span>
                        <MapPin className="h-4 w-4" />
                        <span>{case_.distance} mi</span>
                      </div>
                    </div>
                    <p className="text-[#634419]/80 mb-4">{case_.body}</p>
                    <HoverCard openDelay={0} closeDelay={0}>
                      <HoverCardTrigger>
                        <span className="flex items-center text-[#634419] hover:text-[#634419]/80 transition-colors font-medium cursor-pointer group">
                          See more
                          <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent 
                        className="w-80 bg-[#DDD0C8] border-[#634419]/20" 
                        sideOffset={5}
                        align="start"
                      >
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-[#634419]/60" />
                              <span className="text-sm text-[#634419]">{case_.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-[#634419]/60" />
                              <span className="text-sm text-[#634419]">{case_.date}</span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-[#634419]/80">
                            {case_.fullDescription}
                          </p>
                          <Button 
                            className="w-full bg-[#634419] text-white hover:bg-[#3F372C]"
                          >
                            Read Full Case
                          </Button>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="py-8 border-t border-[#634419]/10">
        <div className="flex justify-center gap-6">
          <a href="#" aria-label="Twitter" className="text-[#634419]/60 hover:text-[#634419] transition-colors">
            <Twitter className="h-5 w-5" />
          </a>
          <a href="#" aria-label="Instagram" className="text-[#634419]/60 hover:text-[#634419] transition-colors">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="#" aria-label="YouTube" className="text-[#634419]/60 hover:text-[#634419] transition-colors">
            <Youtube className="h-5 w-5" />
          </a>
          <a href="#" aria-label="LinkedIn" className="text-[#634419]/60 hover:text-[#634419] transition-colors">
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default ExplorePage;