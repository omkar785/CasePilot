// components/Header.jsx
import { X, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Header = () => {
  return (
    <>
    <nav className="border-b border-[#694E37]/10 px-8 py-4 bg-[#DDD0C8] font-serif">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-4xl font-serif text-[#694E37]">
          CasePilot
        </h1>

        <div className="flex-1 max-w-xs mx-8">
          <div className="relative flex items-center">
            <Input
              type="search"
              placeholder="Search"
              className="bg-transparent border border-[#694E37]/20 rounded-full px-4 py-1 text-sm pr-8"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 text-[#694E37]/60 hover:text-[#694E37] p-0 h-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-6 text-[#694E37] text-sm">
            <Link href="/dashboard" className="hover:text-[#694E37]/80">
              Dashboard
            </Link>
            <Link href="#" className="hover:text-[#694E37]/80">
              Explore Cases
            </Link>
            <Link href="#" className="hover:text-[#694E37]/80">
              Resources
            </Link>
          </div>
          
          <Button variant="ghost" size="icon" className="rounded-full p-0">
            <User className="h-5 w-5 text-[#694E37]" />
          </Button>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Header;