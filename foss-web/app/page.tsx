"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';
import Link from 'next/link';

const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

// Animation variants remain the same
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const buttonHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.2,
      type: "tween",
      ease: "easeInOut"
    }
  }
};

const imageVariant = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100
    }
  }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8E1DB] to-[#F2EBE5] relative overflow-hidden font-serif">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-[url('/noise.png')] opacity-5"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#E8E1DB]/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E8E1DB]/10 to-transparent" />
      
      <div className="container mx-auto px-6 py-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-6rem)]"
        >
          <div className="space-y-12">
            <motion.div 
              variants={fadeInUp} 
              className="space-y-6"
            >
              <h2 className="text-[#634419] text-5xl lg:text-7xl leading-tight font-medium tracking-tight">
                Your Case. <br />
                Our Network. <br />
                <span className="bg-gradient-to-r from-[#634419] to-[#8B5E24] bg-clip-text text-transparent">
                  Effortless Law.
                </span>
              </h2>
              <p className="text-[#634419]/80 text-lg max-w-lg leading-relaxed">
                Connect with lawyers, access historical insights, and navigate your
                case with confidence. Legal intelligence, at your fingertips.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="space-y-6 flex flex-col items-center"
            >
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-[#634419]/70 text-sm tracking-wider font-medium uppercase"
              >
                join us now as
              </motion.p>
              <div className="flex gap-6 justify-center">
                {['Advocate', 'Client'].map((role, index) => (
                  <motion.div
                    key={role}
                    variants={buttonHover}
                    initial="rest"
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className={cn(
                        "border-2 border-[#634419] text-[#634419] text-sm rounded-md",
                        "transform transition-all duration-300 ease-out",
                        "hover:bg-[#634419] hover:text-white hover:shadow-xl",
                        "w-32 h-12 font-medium tracking-wide"
                      )}
                      onClick={() => window.location.href = '/signup'}
                    >
                      {role}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="pt-8 flex flex-col items-center"
            >
              <Separator className="mb-8 bg-[#634419]/20" />
              <div className="flex items-center justify-center gap-8">
                {[
                  { Icon: Twitter, href: "#twitter" },
                  { Icon: Instagram, href: "#instagram" },
                  { Icon: Youtube, href: "#youtube" },
                  { Icon: Linkedin, href: "#linkedin" }
                ].map(({ Icon, href }, index) => (
                  <motion.a
                    key={index}
                    href={href}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={cn(
                      "group p-3 rounded-full bg-white/30 backdrop-blur-sm",
                      "transition-all duration-300",
                      "hover:bg-[#634419]/10 hover:shadow-lg"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5 text-[#634419]",
                        "transition-all duration-300",
                        "group-hover:text-[#3F372C]"
                      )}
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div 
            variants={imageVariant}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#E8E1DB]/20 to-transparent" />
            <motion.div 
              className="relative overflow-hidden rounded-2xl translate-x-12"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="./tingey-injury-law-firm-L4YGuSg0fxs-unsplash-Photoroom.png"
                alt="Lady Justice Statue"
                className={cn(
                  "w-full h-auto max-w-2xl ml-auto",
                  "object-contain",
                  "transition-all duration-700 ease-out",
                )}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}