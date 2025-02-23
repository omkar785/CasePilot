import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';


const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#E8E1DB] relative overflow-hidden font-serif">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#E8E1DB]/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E8E1DB]/10 to-transparent" />
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-[#634419] text-5xl lg:text-6xl leading-tight font-medium">
                Your Case. <br />
                Our Network. <br />
                Effortless Law.
              </h2>
              <p className="text-[#634419]/80 text-lg max-w-lg leading-relaxed">
                Connect with lawyers, access historical insights, and navigate your
                case with confidence. Legal intelligence, at your fingertips.
              </p>
            </div>

            <div className="space-y-4 flex flex-col items-center">
              <p className="text-[#634419]/70 text-sm tracking-wider font-medium">
                join us now as
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  size="sm"
                  variant="outline"
                  className={cn(
                    "border-2 border-[#634419] text-[#634419] text-sm rounded-md",
                    "transform transition-all duration-300 ease-out",
                    "hover:bg-[#634419] hover:text-white hover:shadow-lg hover:-translate-y-0.5",
                    "w-24 h-8"
                  )}
                >
                  <Link href="/signup">
                  Advocate
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className={cn(
                    "border-2 border-[#634419] text-[#634419] text-sm rounded-md",
                    "transform transition-all duration-300 ease-out",
                    "hover:bg-[#634419] hover:text-white hover:shadow-lg hover:-translate-y-0.5",
                    "w-24 h-8"
                  )}
                >
                  <Link href="/signup">
                  Client
                  </Link>
                </Button>
              </div>
            </div>

            <div className="pt-8 flex flex-col items-center">
              <Separator className="mb-8 bg-[#634419]/20" />
              <div className="flex items-center justify-center gap-8">
                {[
                  { Icon: Twitter, href: "#twitter" },
                  { Icon: Instagram, href: "#instagram" },
                  { Icon: Youtube, href: "#youtube" },
                  { Icon: Linkedin, href: "#linkedin" }
                ].map(({ Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    className={cn(
                      "group p-2 rounded-full",
                      "transition-all duration-300",
                      "hover:bg-[#634419]/10"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-6 h-6 text-[#634419]",
                        "transition-all duration-300",
                        "group-hover:scale-110 group-hover:text-[#3F372C]"
                      )}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 " />
            <div className="relative overflow-hidden rounded-2xl  translate-x-12">
              <img
                src="./tingey-injury-law-firm-L4YGuSg0fxs-unsplash-Photoroom.png"
                alt="Lady Justice Statue"
                className={cn(
                  "w-full h-auto max-w-2xl ml-auto",
                  "object-contain transform",
                  "transition-transform duration-700 ease-out",
                  "hover:scale-105",
                  "shadow-2xl",
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;