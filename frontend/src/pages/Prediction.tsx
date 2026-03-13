import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { SlidersHorizontal, Settings2 } from 'lucide-react';
import { ParameterInfluenceChart } from '../components/charts/ParameterInfluenceChart';

export const Prediction = () => {
  const { currentLocation } = useOutletContext<{ currentLocation: string }>();
  
  const [rainfall, setRainfall] = useState(50);
  const [pollutionFactor, setPollutionFactor] = useState(30);

  // Derive mock values based on sliders to show interaction
  const simulatedWqi = Math.max(10, 85 - (pollutionFactor * 0.6) - (rainfall * 0.2)).toFixed(1);
  const simulatedBod = (2.1 + (pollutionFactor * 0.1)).toFixed(2);
  const simulatedDo = Math.max(2.0, 7.8 - (pollutionFactor * 0.05)).toFixed(2);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="clay-card p-6 border-l-4 border-brand-primary">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Settings2 className="text-brand-primary" />
          Interactive XGBoost Simulation
        </h2>
        <p className="text-gray-500 mt-2 font-medium">Use the sliders below to simulate environmental changes and observe AI-predicted impact on {currentLocation}.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="clay-card p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <SlidersHorizontal size={20} className="text-gray-500"/>
              Environment Variables
            </h3>
            
            <div className="flex flex-col gap-8">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-bold text-gray-600 text-sm">Industrial Pollution Increase</label>
                  <span className="text-brand-pollution font-bold">{pollutionFactor}%</span>
                </div>
                <div className="h-6 w-full clay-card-inset rounded-full p-1 relative">
                  <input 
                    type="range" 
                    min="0" max="100" 
                    value={pollutionFactor} 
                    onChange={(e) => setPollutionFactor(parseInt(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                  />
                  <div 
                    className="h-full bg-brand-pollution rounded-full transition-all duration-200"
                    style={{ width: `${pollutionFactor}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-bold text-gray-600 text-sm">Rainfall Intensity (Monsoon)</label>
                  <span className="text-brand-primary font-bold">{rainfall} mm/hr</span>
                </div>
                <div className="h-6 w-full clay-card-inset rounded-full p-1 relative">
                  <input 
                    type="range" 
                    min="0" max="100" 
                    value={rainfall} 
                    onChange={(e) => setRainfall(parseInt(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                  />
                  <div 
                    className="h-full bg-brand-primary rounded-full transition-all duration-200"
                    style={{ width: `${rainfall}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="clay-card p-6 bg-brand-primary text-white">
            <h3 className="text-lg font-bold mb-4 opacity-90">Simulated Results</h3>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-white/20 pb-2">
                <span className="opacity-90 font-medium">Predicted WQI</span>
                <span className="text-3xl font-black">{simulatedWqi}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-90 text-sm">B.O.D. Level</span>
                <span className="font-bold">{simulatedBod} mg/L</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-90 text-sm">Dissolved Oxygen</span>
                <span className="font-bold">{simulatedDo} mg/L</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <ParameterInfluenceChart pollution={pollutionFactor} rainfall={rainfall} />
        </div>
      </div>
    </div>
  );
};
