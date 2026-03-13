import { useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';

const mockHistoryData = [
  { id: 1, date: '2023-01-01', location: 'Howrah Ghat', do: 4.0808, bod: 8.725, nitrate: 0.5066, wqi: 73.58, class: 'Moderate' },
  { id: 2, date: '2023-01-02', location: 'Howrah Ghat', do: 1.4583, bod: 3.5666, nitrate: 0.9208, wqi: 68.36, class: 'Moderate' },
  { id: 3, date: '2023-01-03', location: 'Howrah Ghat', do: 7.1, bod: 1.775, nitrate: 0.13, wqi: 90.76, class: 'Safe' },
  { id: 4, date: '2023-01-04', location: 'Howrah Ghat', do: 9.3909, bod: 0.4909, nitrate: 0.1232, wqi: 96.02, class: 'Safe' },
  { id: 5, date: '2023-01-05', location: 'Howrah Ghat', do: 6.125, bod: 13.65, nitrate: 1.6045, wqi: 50.44, class: 'Polluted' },
  { id: 6, date: '2023-01-06', location: 'Howrah Ghat', do: 6.8, bod: 1.1333, nitrate: 0.4233, wqi: 92.85, class: 'Safe' },
  { id: 7, date: '2023-01-07', location: 'Howrah Ghat', do: 8.3285, bod: 0.9, nitrate: 0.0571, wqi: 86.80, class: 'Safe' },
  { id: 8, date: '2023-01-08', location: 'Howrah Ghat', do: 6.4625, bod: 3.675, nitrate: 2.2793, wqi: 87.54, class: 'Safe' },
  { id: 9, date: '2023-01-09', location: 'Howrah Ghat', do: 7.92, bod: 3.59, nitrate: 1.71, wqi: 67.06, class: 'Moderate' },
  { id: 10, date: '2023-01-11', location: 'Howrah Ghat', do: 8.0, bod: 2.7, nitrate: 1.9, wqi: 83.47, class: 'Safe' }
];

export const HistoricalData = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = mockHistoryData.filter(row => 
    row.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getClassStyle = (cls: string) => {
    switch(cls) {
      case 'Excellent': case 'Good': return 'bg-[#06d6a0]/20 text-[#06d6a0]';
      case 'Moderate': return 'bg-brand-warning/20 text-brand-pollution'; // Adjusting text for visibility
      case 'Unsafe': return 'bg-brand-danger/20 text-brand-danger';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 h-full">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Historical Data Logs</h2>
          <p className="text-gray-500 font-medium mt-1">Review past parameter values and Model Classifications</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by location..." 
              className="clay-card-inset w-full py-2 pl-10 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 font-medium text-gray-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="clay-card p-2 text-gray-600 hover:text-brand-primary">
            <Filter size={20} />
          </button>
          <button className="clay-btn px-4 py-2 flex items-center gap-2 text-sm font-bold">
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="flex-1 clay-card overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-500 font-bold text-sm">
                <th className="p-4">Date</th>
                <th className="p-4">Location</th>
                <th className="p-4">D.O (mg/L)</th>
                <th className="p-4">B.O.D (mg/L)</th>
                <th className="p-4">Nitrate (mg/L)</th>
                <th className="p-4">WQI Score</th>
                <th className="p-4">Water Class</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-gray-700">
              {filteredData.map((row) => (
                <tr key={row.id} className="border-b border-gray-50 hover:bg-white/40 transition-colors">
                  <td className="p-4 whitespace-nowrap">{row.date}</td>
                  <td className="p-4 font-bold">{row.location}</td>
                  <td className="p-4">{row.do}</td>
                  <td className="p-4">{row.bod}</td>
                  <td className="p-4">{row.nitrate}</td>
                  <td className="p-4">
                    <span className="font-black text-gray-800">{row.wqi}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getClassStyle(row.class)}`}>
                      {row.class}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    No historical records found for your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
