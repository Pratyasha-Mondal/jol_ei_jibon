import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const MainLayout = () => {
  const [currentLocation, setCurrentLocation] = useState('Dakshineswar');
  const [time, setTime] = useState(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-brand-bg relative">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header 
          currentLocation={currentLocation}
          onLocationChange={setCurrentLocation}
          status={currentLocation === 'Howrah Ghat' ? 'Polluted' : currentLocation === 'Babughat' ? 'Moderate' : 'Safe'}
          lastUpdate={time}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto px-6 pb-6 relative no-scrollbar">
           {/* Allow Outlet components to read context about current location */}
           <Outlet context={{ currentLocation }} />
        </main>
      </div>
    </div>
  );
};
