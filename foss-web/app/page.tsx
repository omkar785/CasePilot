import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#E8E1DB] relative overflow-hidden font-serif">
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#E8E1DB]/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E8E1DB]/10 to-transparent" />

      <div className="container mx-auto px-6 py-8">
        {/* Header/Logo */}
        <Card className="bg-transparent border-none shadow-none">
          <CardContent className="p-0">
            <h1 className="text-[#634419] text-3xl tracking-wide">CasePilot</h1>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-24 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-12">
            {/* Main Headings */}
            <div className="space-y-6">
              <h2 className="text-[#634419] text-5xl lg:text-6xl leading-tight">
                Your Case.
                <br />
                Our Network.
                <br />
                Effortless Law.
              </h2>
              <p className="text-[#634419]/80 text-lg max-w-lg leading-relaxed">
                Connect with lawyers, access historical insights, and navigate your
                case with confidence. Legal intelligence, at your fingertips.
              </p>
            </div>

            {/* Call to Action Section */}
            <div className="space-y-6">
              <p className="text-[#634419]/70 text-sm uppercase tracking-wider">
                join us now as
              </p>
              <div className="flex gap-4">
                <Button 
                  variant="default" 
                  size="lg"
                  className="bg-[#634419] hover:bg-[#3F372C] text-white px-8 py-6 rounded text-lg"
                >
                  Advocate
                </Button>
                <Button 
                  variant="default" 
                  size="lg"
                  className="bg-[#634419] hover:bg-[#3F372C] text-white px-8 py-6 rounded text-lg"
                >
                  Client
                </Button>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <Separator className="mb-8 bg-[#634419]/20" />
              <div className="flex items-center gap-8">
                <a href="#" className="hover:scale-110 transition-transform">
                  <Twitter className="w-6 h-6 text-[#634419] hover:text-[#3F372C]" />
                </a>
                <a href="#" className="hover:scale-110 transition-transform">
                  <Instagram className="w-6 h-6 text-[#634419] hover:text-[#3F372C]" />
                </a>
                <a href="#" className="hover:scale-110 transition-transform">
                  <Youtube className="w-6 h-6 text-[#634419] hover:text-[#3F372C]" />
                </a>
                <a href="#" className="hover:scale-110 transition-transform">
                  <Linkedin className="w-6 h-6 text-[#634419] hover:text-[#3F372C]" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Statue Image */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#E8E1DB]/10" />
            <img
              src="/api/placeholder/700/900"
              alt="Lady Justice Statue"
              className="w-full h-auto max-w-2xl ml-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;