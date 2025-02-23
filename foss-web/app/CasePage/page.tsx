'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Plus, Share2, X, Twitter, Instagram, Youtube, Linkedin, Upload } from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const CaseDetailsPage = () => {
  return (
    <motion.div 
      className="min-h-screen bg-[#f5efea]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <main className="max-w-4xl mx-auto p-8">
        <motion.div 
          className="flex items-start gap-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="w-32 h-32 bg-white rounded-lg p-4 flex items-center justify-center"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />

          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h2 
              className="text-xl font-medium text-[#6b4f34]"
              {...fadeIn}
            >
              #248703
            </motion.h2>
            
            <div className="space-y-4 mt-4">
              {[
                { title: "Description", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
                { title: "Parties", content: "John Michael Smith v. Jane Elizabeth Doe" },
                { title: "Judge", content: "Troy Barnes" },
                { title: "Next Hearing Date", content: "22-02-2025" }
              ].map((item, index) => (
                <motion.section
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <h3 className="text-[#6b4f34] font-medium">{item.title}</h3>
                  <p className="text-gray-600 mt-1">{item.content}</p>
                </motion.section>
              ))}
            </div>

            <motion.div 
              className="flex gap-4 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {[Plus, CalendarDays].map((Icon, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="outline" size="icon">
                    <Icon className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.section 
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.h2 
            className="text-2xl font-serif text-[#6b4f34] mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Case History
          </motion.h2>
          
          <div className="space-y-4">
            {[1, 2].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + item * 0.2 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="bg-white">
                    <CardContent className="p-6">
                      <h3 className="font-medium text-[#6b4f34] mb-2">Subject</h3>
                      <p className="text-gray-600">
                        Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.
                      </p>
                      <motion.div 
                        className="flex justify-between items-center mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        <motion.div whileHover={{ scale: 1.05 }}>
                          <Button variant="ghost" className="text-gray-600">
                            See More
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05, rotate: 180 }}>
                          <Button variant="ghost" size="icon">
                            <Upload className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.footer 
          className="flex justify-center space-x-4 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {[Twitter, Instagram, Youtube, Linkedin].map((Icon, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
            >
              <Icon className="w-5 h-5 text-gray-600" />
            </motion.div>
          ))}
        </motion.footer>
      </main>
    </motion.div>
  );
};

export default CaseDetailsPage;