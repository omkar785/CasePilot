// components/Navigation.tsx
'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#E8E1DB]/90 backdrop-blur-sm shadow-md py-4' : 'py-6'
      }`}
    >
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-[#634419] text-2xl font-semibold tracking-wide hover:opacity-80 transition-opacity"
          >
            CasePilot
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/about" 
              className="text-[#634419] hover:text-[#3F372C] transition-colors"
            >
              About
            </Link>
            <Link 
              href="/services" 
              className="text-[#634419] hover:text-[#3F372C] transition-colors"
            >
              Services
            </Link>
            <Link 
              href="/resources" 
              className="text-[#634419] hover:text-[#3F372C] transition-colors"
            >
              Resources
            </Link>
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                className="border-[#634419] text-[#634419] hover:bg-[#634419] hover:text-white"
              >
                Sign In
              </Button>
              <Button 
                className="bg-[#634419] text-white hover:bg-[#3F372C]"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-[#634419]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#E8E1DB] shadow-lg p-6 space-y-4">
            <Link 
              href="/about" 
              className="block text-[#634419] hover:text-[#3F372C] py-2"
            >
              About
            </Link>
            <Link 
              href="/services" 
              className="block text-[#634419] hover:text-[#3F372C] py-2"
            >
              Services
            </Link>
            <Link 
              href="/resources" 
              className="block text-[#634419] hover:text-[#3F372C] py-2"
            >
              Resources
            </Link>
            <div className="space-y-3 pt-4">
              <Button 
                variant="outline" 
                className="w-full border-[#634419] text-[#634419] hover:bg-[#634419] hover:text-white"
              >
                Sign In
              </Button>
              <Button 
                className="w-full bg-[#634419] text-white hover:bg-[#3F372C]"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;