// app/components/LawyerProfile.tsx
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

export default function lawyerProfile() {
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
    // Handle file upload logic here
    console.log("File uploaded:", event.target.files?.[0]);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=" mx-auto space-y-8"
      >
        {/* Header Section */}
        <Card className="w-full overflow-hidden">
          <CardHeader className="relative h-48 bg-[#DDD0C8]">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute -bottom-16 left-8"
            >
              <div className="relative w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden">
                <img
                  src={profile.photo}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <label 
                  htmlFor="photo-upload" 
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Upload className="w-6 h-6 text-white" />
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

          <CardContent className="pt-20 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <h1 className="text-3xl font-bold">{profile.name}</h1>
              {profile.isVerified && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </motion.div>
              )}
            </div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <span>{profile.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <span>{profile.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span>{profile.contact.address}</span>
                  </div>
                </CardContent>
              </Card>

              {/* License Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">License Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Bar License Number</Label>
                    <div className="flex items-center gap-2">
                      <Input value={profile.barLicense.number} readOnly />
                      <Badge variant="secondary">
                        {profile.barLicense.verificationStatus}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label>Enrollment Number</Label>
                    <Input value={profile.enrollmentNumber} readOnly />
                  </div>
                  
                </CardContent>
              </Card>
            </motion.div>

            {/* Experience Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Past Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {profile.experiences.map((exp, index) => (
                    <div key={index} className="mb-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <h3 className="font-semibold">{exp.position}</h3>
                      <p className="text-gray-600">{exp.company} • {exp.duration}</p>
                      <p className="mt-2">{exp.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Specializations & Areas of Practice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Specializations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.specializations.map((spec, index) => (
                      <Badge key={index} variant="secondary">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Areas of Practice
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.areasOfPractice.map((area, index) => (
                      <Badge key={index} variant="outline">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}