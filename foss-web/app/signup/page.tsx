"use client"

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Upload, ArrowRight, ArrowLeft } from 'lucide-react';

const SignupForm = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const formSections = [
    {
      title: "Personal Information",
      fields: (
        <div className="space-y-4">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="w-32 h-32 rounded-full bg-[#DDD0C8] flex items-center justify-center">
              <Upload className="w-8 h-8 text-[#3F372C]" />
            </div>
          </div>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border rounded bg-white/90 border-[#CBB296] focus:outline-none focus:ring-2 focus:ring-[#B99364]"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-2 border rounded bg-white/90 border-[#CBB296] focus:outline-none focus:ring-2 focus:ring-[#B99364]"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-2 border rounded bg-white/90 border-[#CBB296] focus:outline-none focus:ring-2 focus:ring-[#B99364]"
          />
        </div>
      )
    },
    {
      title: "Professional Details",
      fields: (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Bar Enrollment Number"
            className="w-full p-2 border rounded bg-white/90 border-[#CBB296] focus:outline-none focus:ring-2 focus:ring-[#B99364]"
          />
          <div className="border-2 border-dashed border-[#CBB296] p-4 rounded-lg text-center">
            <Upload className="w-8 h-8 mx-auto text-[#3F372C]" />
            <p className="mt-2 text-sm text-[#3F372C]">Upload Bar License</p>
          </div>
          <select className="w-full p-2 border rounded bg-white/90 border-[#CBB296] focus:outline-none focus:ring-2 focus:ring-[#B99364]">
            <option value="">Select Specialization</option>
            <option value="criminal">Criminal Law</option>
            <option value="civil">Civil Law</option>
            <option value="corporate">Corporate Law</option>
          </select>
        </div>
      )
    },
    {
      title: "Areas of Practice",
      fields: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {["Family Law", "Real Estate", "Immigration", "Tax Law", "Intellectual Property", "Employment Law"].map((area) => (
              <label key={area} className="flex items-center space-x-2 p-2 border rounded cursor-pointer hover:bg-[#DDD0C8]/20">
                <input type="checkbox" className="rounded border-[#CBB296]" />
                <span className="text-sm text-[#3F372C]">{area}</span>
              </label>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Declaration",
      fields: (
        <div className="space-y-6">
          <div className="p-4 bg-[#DDD0C8]/20 rounded-lg">
            <p className="text-sm text-[#3F372C] leading-relaxed">
              I hereby declare that all the information provided is true and accurate. 
              I understand that any false information may result in the rejection of my application 
              or termination of services.
            </p>
          </div>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded border-[#CBB296]" />
            <span className="text-sm text-[#3F372C]">I agree to the terms and conditions</span>
          </label>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#DDD0C8]/10 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Progress value={(step / totalSteps) * 100} className="mb-8" />
        
        <Card className="overflow-hidden shadow-xl transition-all duration-300">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-[#3F372C] mb-6">
              {formSections[step - 1].title}
            </h2>
            
            <div className="transition-all duration-300 transform">
              {formSections[step - 1].fields}
            </div>

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button
                  onClick={() => setStep(step - 1)}
                  className="bg-[#634419] hover:bg-[#3F372C] text-white flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
              )}
              
              <Button
                onClick={() => step < totalSteps ? setStep(step + 1) : null}
                className="bg-[#A77532] hover:bg-[#634419] text-white ml-auto flex items-center"
              >
                {step === totalSteps ? (
                  <>
                    Submit
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignupForm;