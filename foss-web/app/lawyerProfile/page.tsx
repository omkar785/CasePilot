"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  Upload,
  Building,
  Clock,
  Award,
  BookOpen
} from 'lucide-react';

interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface LawyerProfile {
  name: string;
  isVerified: boolean;
  photo: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  experiences: Experience[];
  barLicense: {
    number: string;
    verificationStatus: 'pending' | 'verified' | 'rejected';
  };
  enrollmentNumber: string;
  specializations: string[];
  areasOfPractice: string[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

export default function LawyerProfile() {
  const [profile, setProfile] = React.useState<LawyerProfile>({
    name: "Sarah Johnson",
    isVerified: true,
    photo: "/api/placeholder/150/150",
    contact: {
      email: "sarah.johnson@law.com",
      phone: "+1 (555) 123-4567",
      address: "123 Legal Street, New York"
    },
    experiences: [
      {
        company: "Johnson & Associates",
        position: "Senior Partner",
        duration: "2018-Present",
        description: "Leading corporate law division"
      }
    ],
    barLicense: {
      number: "NY123456",
      verificationStatus: 'verified'
    },
    enrollmentNumber: "ENR789012",
    specializations: ["Corporate Law", "Mergers & Acquisitions"],
    areasOfPractice: ["Business Law", "Contract Law", "Securities"]
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File uploaded:", event.target.files?.[0]);
  };

  return (
    <div className="min-h-screen w-full bg-[#DDD0C8] p-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto space-y-8"
      >
        <Card className="w-full overflow-hidden shadow-xl bg-[#DDD0C8]">
          <CardHeader className="relative h-56">
            <motion.div
              initial={{ scale: 0, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="absolute -bottom-20 left-8"
            >
              <div className="relative w-40 h-40 rounded-full border-4 border-[#DDD0C8] bg-[#DDD0C8] overflow-hidden shadow-lg">
                <img
                  src={profile.photo}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <label 
                  htmlFor="photo-upload" 
                  className="absolute inset-0 bg-[#3F372C] bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                >
                  <Upload className="w-6 h-6 text-[#DDD0C8] transform hover:scale-110 transition-transform" />
                </label>
                <input 
                  id="photo-upload" 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </div>
            </motion.div>
          </CardHeader>

          <CardContent className="pt-24 pb-8">
            <motion.div 
              variants={fadeInUp}
              className="flex items-center gap-3 mb-6"
            >
              <h1 className="text-4xl font-bold text-[#3F372C]">
                {profile.name}
              </h1>
              {profile.isVerified && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  <CheckCircle2 className="w-7 h-7 text-[#A77532]" />
                </motion.div>
              )}
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <motion.div variants={cardVariants}>
                <Card className="hover:shadow-lg transition-shadow duration-300 bg-[#DDD0C8]">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold flex items-center gap-2 text-[#3F372C]">
                      <Mail className="w-5 h-5 text-[#A77532]" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 hover:bg-[#CBB296] p-2 rounded-lg transition-colors">
                      <Mail className="w-5 h-5 text-[#634419]" />
                      <span className="text-[#323232]">{profile.contact.email}</span>
                    </div>
                    <div className="flex items-center gap-3 hover:bg-[#CBB296] p-2 rounded-lg transition-colors">
                      <Phone className="w-5 h-5 text-[#634419]" />
                      <span className="text-[#323232]">{profile.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 hover:bg-[#CBB296] p-2 rounded-lg transition-colors">
                      <MapPin className="w-5 h-5 text-[#634419]" />
                      <span className="text-[#323232]">{profile.contact.address}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={cardVariants}>
                <Card className="hover:shadow-lg transition-shadow duration-300 bg-[#DDD0C8]">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold flex items-center gap-2 text-[#3F372C]">
                      <Award className="w-5 h-5 text-[#A77532]" />
                      License Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-[#634419]">Bar License Number</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input 
                          value={profile.barLicense.number} 
                          readOnly 
                          className="bg-[#CBB296] text-[#323232] border-[#B99364]"
                        />
                        <Badge 
                          variant="secondary"
                          className="capitalize bg-[#A77532] text-[#DDD0C8]"
                        >
                          {profile.barLicense.verificationStatus}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Label className="text-[#634419]">Enrollment Number</Label>
                      <Input 
                        value={profile.enrollmentNumber} 
                        readOnly 
                        className="bg-[#CBB296] text-[#323232] border-[#B99364] mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-8">
              <Card className="hover:shadow-lg transition-shadow duration-300 bg-[#DDD0C8]">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold flex items-center gap-2 text-[#3F372C]">
                    <Clock className="w-5 h-5 text-[#A77532]" />
                    Past Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {profile.experiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="mb-4 p-4 border border-[#B99364] rounded-lg hover:shadow-md transition-all duration-300 hover:bg-[#CBB296]"
                    >
                      <h3 className="font-semibold text-lg text-[#3F372C]">{exp.position}</h3>
                      <p className="text-[#634419] font-medium">{exp.company} • {exp.duration}</p>
                      <p className="mt-2 text-[#323232]">{exp.description}</p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8"
            >
              <motion.div variants={cardVariants}>
                <Card className="hover:shadow-lg transition-shadow duration-300 bg-[#DDD0C8]">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold flex items-center gap-2 text-[#3F372C]">
                      <Award className="w-5 h-5 text-[#A77532]" />
                      Specializations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profile.specializations.map((spec, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Badge 
                            variant="secondary"
                            className="bg-[#B99364] text-[#DDD0C8] hover:bg-[#A77532] transition-colors cursor-default"
                          >
                            {spec}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={cardVariants}>
                <Card className="hover:shadow-lg transition-shadow duration-300 bg-[#DDD0C8]">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold flex items-center gap-2 text-[#3F372C]">
                      <BookOpen className="w-5 h-5 text-[#A77532]" />
                      Areas of Practice
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profile.areasOfPractice.map((area, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Badge 
                            variant="outline"
                            className="border-[#B99364] text-[#634419] hover:bg-[#CBB296] transition-colors cursor-default"
                          >
                            {area}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}