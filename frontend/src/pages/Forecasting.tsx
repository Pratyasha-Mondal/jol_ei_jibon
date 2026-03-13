import { useOutletContext } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const mockForecastData = [
  { month: 'Jan', wqi: 65, historical: 62 },
  { month: 'Feb', wqi: 59, historical: 58 },
  { month: 'Mar', wqi: 80, historical: 75 },
  { month: 'Apr', wqi: 81, historical: 78 },
  { month: 'May', wqi: 75, historical: 76 },
  { month: 'Jun', wqi: 60, historical: 65 },
  { month: 'Jul', wqi: 45, historical: 55 }, // Monsoon drop
  { month: 'Aug', wqi: 48, historical: 52 },
  { month: 'Sep', wqi: 50, historical: 58 },
  { month: 'Oct', wqi: 72, historical: 65 },
  { month: 'Nov', wqi: 85, historical: 75 },
  { month: 'Dec', wqi: 88, historical: 80 },
  { month: 'Next Jan (Predicted)', predicted: 68 }, // Prediction
];

const mockParamData = [
  { month: 'Jan', do: 7.2, bod: 2.1, nit: 12 },
  { month: 'Feb', do: 6.8, bod: 2.5, nit: 15 },
  { month: 'Mar', do: 8.1, bod: 1.8, nit: 10 },
  { month: 'Apr', do: 7.9, bod: 1.5, nit: 11 },
  { month: 'May', do: 6.5, bod: 3.2, nit: 18 },
  { month: 'Jun', do: 5.5, bod: 4.5, nit: 25 },
  { month: 'Jul', do: 4.2, bod: 6.8, nit: 35 },
  { month: 'Aug', do: 4.5, bod: 6.0, nit: 30 },
  { month: 'Next Month (Predicted)', do_pred: 5.2, bod_pred: 4.2, nit_pred: 22 },
];

export const Forecasting = () => {
  const { currentLocation } = useOutletContext<{ currentLocation: string }>();

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="clay-card p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Water Quality Forecast at {currentLocation}</h2>
        <p className="text-gray-500 mb-6 font-medium">12-Month Historical & Next Month Prediction</p>
        
        <div className="h-80 w-full ml-[-20px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockForecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Line type="monotone" dataKey="wqi" name="Current WQI" stroke="#3aa6b9" strokeWidth={4} dot={{ r: 4, fill: '#3aa6b9' }} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="historical" name="Historical Avg" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              <Line type="step" dataKey="predicted" name="AI Prediction" stroke="#ffd166" strokeWidth={4} dot={{ r: 6, fill: '#ffd166' }} strokeDasharray="4 4" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="clay-card p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Parameter Forecast Trends</h2>
        <p className="text-gray-500 mb-6 font-medium">Dissolved Oxygen (DO), B.O.D, and Nitrates Forecast</p>
        
        <div className="h-80 w-full ml-[-20px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockParamData}>
              <defs>
                <linearGradient id="colorDo" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3aa6b9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3aa6b9" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorBod" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f77f00" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f77f00" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              
              <Area type="monotone" dataKey="do" stroke="#3aa6b9" fillOpacity={1} fill="url(#colorDo)" strokeWidth={3} name="DO (mg/L)" />
              <Area type="monotone" dataKey="bod" stroke="#f77f00" fillOpacity={1} fill="url(#colorBod)" strokeWidth={3} name="BOD (mg/L)" />
              <Area type="monotone" dataKey="nit" stroke="#d62828" fill="none" strokeWidth={2} name="Nitrates (mg/L)" />
              
              {/* Predicted overlays */}
              <Line type="monotone" dataKey="do_pred" stroke="#3aa6b9" strokeWidth={3} strokeDasharray="5 5" name="Predicted DO" />
              <Line type="monotone" dataKey="bod_pred" stroke="#f77f00" strokeWidth={3} strokeDasharray="5 5" name="Predicted BOD" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
