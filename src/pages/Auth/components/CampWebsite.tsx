import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import campHero from '@/assets/camp-hero.jpg';
import campLogo from '@/assets/camp-tall-pines-logo.svg';

interface CampWebsiteProps {
  onPortalClick: () => void;
}

export const CampWebsite: React.FC<CampWebsiteProps> = ({ onPortalClick }) => {
  return (
    <div className="min-h-dvh flex flex-col bg-[#fafaf8] font-sans">
      {/* Top announcement bar */}
      <div className="flex items-center justify-between px-6 py-2 bg-[#2d6a4f] text-white text-sm">
        <span className="font-medium">Summer 2026 Registration Open</span>
        <button
          className="text-white/90 hover:text-white underline underline-offset-2 text-sm font-medium transition-colors"
          onClick={onPortalClick}
        >
          myTallPines Login &rarr;
        </button>
      </div>

      {/* Navigation */}
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
        <button className="flex items-center gap-3" onClick={onPortalClick}>
          <img src={campLogo} alt="Camp Tall Pines" className="w-11 h-11" />
          <div className="flex flex-col leading-none">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#2d6a4f] uppercase">Camp</span>
            <span className="text-[18px] font-extrabold tracking-[0.12em] text-[#2d6a4f] uppercase">Tall Pines</span>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-6">
          {['About', 'Programs', 'Life at Camp', 'Gallery', 'Contact'].map((item) => (
            <span key={item} className="text-sm font-medium text-gray-600 hover:text-[#2d6a4f] cursor-pointer transition-colors">
              {item}
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            className="hidden sm:inline-flex bg-[#2d6a4f] hover:bg-[#245c44] text-white"
            size="sm"
            onClick={onPortalClick}
          >
            myTallPines
          </Button>
          <button className="md:hidden flex flex-col gap-1.5 p-1" aria-label="Menu">
            <span className="block w-5 h-0.5 bg-[#2d6a4f]" />
            <span className="block w-5 h-0.5 bg-[#2d6a4f]" />
            <span className="block w-5 h-0.5 bg-[#2d6a4f]" />
          </button>
        </div>
      </header>

      {/* Hero */}
      <div
        className="relative flex-1 min-h-[70dvh] bg-cover bg-[center_45%] flex items-end"
        style={{ backgroundImage: `url(${campHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/60 pointer-events-none" />
        <div className="relative z-10 p-8 md:p-12 w-full max-w-3xl">
          <p className="text-white/90 text-base font-medium mb-3">
            Est. 1962 &bull; Adirondack Mountains, NY
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.05] tracking-tight mb-6 drop-shadow-lg">
            Where Summers<br />Become Stories
          </h1>
          <p className="text-white/85 text-lg mb-8 max-w-md leading-relaxed">
            A tradition of adventure, friendship, and growth for boys and girls ages 7&ndash;16.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="bg-[#2d6a4f] hover:bg-[#245c44] text-white text-base px-7 py-3 h-auto">
              Explore Programs
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/60 text-white bg-white/10 hover:bg-white/20 hover:text-white backdrop-blur-sm text-base px-7 py-3 h-auto"
              onClick={onPortalClick}
            >
              Parent Portal
            </Button>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 bg-white border-b border-gray-200">
        {[
          { number: '60+', label: 'Years of Tradition' },
          { number: '350', label: 'Campers Each Summer' },
          { number: '40+', label: 'Activities & Sports' },
          { number: '96%', label: 'Camper Return Rate' },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col items-center py-6 px-4 border-r border-gray-100 last:border-r-0">
            <span className="text-2xl font-bold text-[#2d6a4f]">{stat.number}</span>
            <span className="text-xs font-medium text-gray-500 mt-1">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 py-12 max-w-5xl mx-auto w-full">
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="text-3xl mb-3">🏕️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Summer 2026</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Registration is now open for new and returning families. Secure your spot today.
            </p>
            <span className="text-sm font-medium text-[#2d6a4f] hover:underline cursor-pointer">
              Learn more &rarr;
            </span>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="text-3xl mb-3">👨‍👩‍👧</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Returning Families</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Log in to your parent portal to manage enrollment, view forms, and stay connected.
            </p>
            <button
              className="text-sm font-medium text-[#2d6a4f] hover:underline cursor-pointer"
              onClick={onPortalClick}
            >
              myTallPines &rarr;
            </button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="text-3xl mb-3">✨</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">New Families</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Start the enrollment process and learn what makes Tall Pines a home away from home.
            </p>
            <span className="text-sm font-medium text-[#2d6a4f] hover:underline cursor-pointer">
              Get started &rarr;
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-5xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between gap-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img src={campLogo} alt="Camp Tall Pines" className="w-12 h-12 rounded-full bg-white/10" />
              <span className="text-white font-bold text-lg tracking-wide">CAMP TALL PINES</span>
            </div>
            <p className="text-sm leading-relaxed">
              1247 Pine Ridge Road<br />
              Lake Placid, NY 12946
            </p>
            <p className="text-sm">
              (518) 555-0142 &bull; info@camptallpines.com
            </p>
          </div>
          <div className="grid grid-cols-3 gap-8 text-sm">
            <div className="flex flex-col gap-2">
              <h4 className="text-white font-semibold mb-1">Camp</h4>
              <span className="hover:text-white cursor-pointer transition-colors">About Us</span>
              <span className="hover:text-white cursor-pointer transition-colors">Our Team</span>
              <span className="hover:text-white cursor-pointer transition-colors">Facilities</span>
              <span className="hover:text-white cursor-pointer transition-colors">Employment</span>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-white font-semibold mb-1">Programs</h4>
              <span className="hover:text-white cursor-pointer transition-colors">Day Camp</span>
              <span className="hover:text-white cursor-pointer transition-colors">Overnight</span>
              <span className="hover:text-white cursor-pointer transition-colors">Teen Leadership</span>
              <span className="hover:text-white cursor-pointer transition-colors">Specialty Camps</span>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-white font-semibold mb-1">Families</h4>
              <button className="text-left hover:text-white cursor-pointer transition-colors" onClick={onPortalClick}>Parent Portal</button>
              <span className="hover:text-white cursor-pointer transition-colors">What to Pack</span>
              <span className="hover:text-white cursor-pointer transition-colors">FAQs</span>
              <span className="hover:text-white cursor-pointer transition-colors">Health &amp; Safety</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500 max-w-5xl mx-auto w-full">
          <span>&copy; 2026 Camp Tall Pines. All rights reserved.</span>
          <span>Powered by CampMinder</span>
        </div>
      </footer>
    </div>
  );
};
