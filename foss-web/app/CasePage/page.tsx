import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Plus, Share2, X, Twitter, Instagram, Youtube, Linkedin, Upload } from "lucide-react";

const CaseDetailsPage = () => {
  return (
    <div className="min-h-screen bg-[#f5efea]">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm">
        <h1 className="text-2xl font-serif text-[#6b4f34]">CasePilot</h1>
        
        <div className="flex items-center space-x-4">
          <input 
            type="search"
            placeholder="Search"
            className="px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#6b4f34]"
          />
          <X className="w-4 h-4 text-gray-500" />
        </div>
        
        <nav className="flex items-center space-x-6">
          <a href="#" className="text-[#6b4f34]">Dashboard</a>
          <a href="#" className="text-[#6b4f34]">Explore Cases</a>
          <a href="#" className="text-[#6b4f34]">Resources</a>
          <div className="w-8 h-8 rounded-full bg-gray-200" /> {/* Avatar placeholder */}
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-8">
        <div className="flex items-start gap-8">
          {/* Case Icon */}
          <div className="w-32 h-32 bg-white rounded-lg p-4 flex items-center justify-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-gray-300 transform rotate-45" />
              <div className="w-12 h-12 bg-gray-300" />
              <div className="w-12 h-12 bg-gray-300 rounded-full" />
            </div>
          </div>

          {/* Case Details */}
          <div className="flex-1">
            <h2 className="text-xl font-medium text-[#6b4f34]">#248703</h2>
            
            <div className="space-y-4 mt-4">
              <section>
                <h3 className="text-[#6b4f34] font-medium">Description</h3>
                <p className="text-gray-600 mt-1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </section>

              <section>
                <h3 className="text-[#6b4f34] font-medium">Parties</h3>
                <p className="text-gray-600 mt-1">John Michael Smith v. Jane Elizabeth Doe</p>
              </section>

              <section>
                <h3 className="text-[#6b4f34] font-medium">Judge</h3>
                <p className="text-gray-600 mt-1">Troy Barnes</p>
              </section>

              <section>
                <h3 className="text-[#6b4f34] font-medium">Next Hearing Date</h3>
                <p className="text-gray-600 mt-1">22-02-2025</p>
              </section>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <Button variant="outline" size="icon">
                <Plus className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <CalendarDays className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Case History */}
        <section className="mt-12">
          <h2 className="text-2xl font-serif text-[#6b4f34] mb-6">Case History</h2>
          
          <div className="space-y-4">
            {[1, 2].map((item) => (
              <Card key={item} className="bg-white">
                <CardContent className="p-6">
                  <h3 className="font-medium text-[#6b4f34] mb-2">Subject</h3>
                  <p className="text-gray-600">
                    Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <Button variant="ghost" className="text-gray-600">
                      See More
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="flex justify-center space-x-4 mt-12">
          <Twitter className="w-5 h-5 text-gray-600" />
          <Instagram className="w-5 h-5 text-gray-600" />
          <Youtube className="w-5 h-5 text-gray-600" />
          <Linkedin className="w-5 h-5 text-gray-600" />
        </footer>
      </main>
    </div>
  );
};

export default CaseDetailsPage;