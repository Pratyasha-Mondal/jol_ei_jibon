import { useState } from 'react';
import { MapPin, Clock, ChevronDown, Bell } from 'lucide-react';

const locations = [
  'Dakshineswar',
  'Babughat',
  'Howrah Ghat',
  'Bally Bridge'
];

type WaterStatus = 'Safe' | 'Moderate' | 'Polluted';

interface HeaderProps {
  currentLocation: string;
  onLocationChange: (loc: string) => void;
  status: WaterStatus;
  lastUpdate: string;
}

export const Header = ({ currentLocation, onLocationChange, status, lastUpdate }: HeaderProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const statusColors = {
    Safe: 'bg-[#06d6a0] text-white',
    Moderate: 'bg-brand-warning text-gray-800',
    Polluted: 'bg-brand-pollution text-white'
  };

  return (
    <header className="h-20 w-full flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-6">
        <h2 className="text-2xl font-bold text-gray-800 hidden lg:block tracking-tight">
          Overview
        </h2>
        
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="clay-card px-4 py-2 flex items-center gap-2 hover:bg-white/50"
          >
            <MapPin size={18} className="text-brand-primary" />
            <span className="font-semibold text-gray-700">{currentLocation}</span>
            <ChevronDown size={16} className="text-gray-500" />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute top-14 left-0 w-48 clay-card p-2 z-50 flex flex-col gap-1">
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    onLocationChange(loc);
                    setIsDropdownOpen(false);
                  }}
                  className={`text-left px-4 py-2 rounded-lg transition-colors ${
                    loc === currentLocation ? 'clay-card-inset text-brand-primary font-medium' : 'hover:bg-white/50 text-gray-600'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex clay-card px-4 py-2 items-center gap-2">
          <Clock size={16} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-600">Updated: {lastUpdate}</span>
        </div>
        
        <div className={`clay-card px-4 py-2 flex items-center gap-2 ${statusColors[status]} font-bold rounded-xl shadow-none border-4 border-white`}>
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          {status}
        </div>
        
        <button className="clay-card p-3 text-gray-600 relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-danger"></span>
        </button>
      </div>
    </header>
  );
};
