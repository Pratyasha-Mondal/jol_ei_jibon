import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface Props {
  pollution: number;
  rainfall: number;
}

export const ParameterInfluenceChart = ({ pollution, rainfall }: Props) => {
  // Generate mock data influenced by sliders
  const generateData = () => {
    const data = [];
    const baseWqi = 85;
    
    for (let i = 1; i <= 7; i++) {
      const dayFactor = i * 0.1;
      const severity = (pollution * 0.5 + rainfall * 0.3) * dayFactor;
      
      data.push({
        day: `Day ${i}`,
        wqiImpact: Math.max(0, 100 - (baseWqi - severity)),
        bodLevel: 2 + (pollution * 0.05 * dayFactor),
        fcCount: 150 + (rainfall * 5 * dayFactor),
      });
    }
    return data;
  };

  const chartData = generateData();

  return (
    <div className="clay-card p-6 h-full flex flex-col">
      <h3 className="text-xl font-bold text-gray-800 mb-2">Parameter Influence Over 7 Days</h3>
      <p className="text-gray-500 mb-6 font-medium text-sm">How simulated factors influence resulting parameters.</p>
      
      <div className="flex-1 w-full ml-[-20px] min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="day" stroke="#94a3b8" tickLine={false} axisLine={false} />
            <YAxis yAxisId="left" stroke="#94a3b8" tickLine={false} axisLine={false} />
            <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            
            <Bar yAxisId="left" dataKey="wqiImpact" name="WQI Drop (Index)" fill="#ffd166" radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="bodLevel" name="B.O.D. (mg/L)" stroke="#f77f00" strokeWidth={3} dot={{ r: 4 }} />
            <Line yAxisId="right" type="step" dataKey="fcCount" name="Fecal Coliform" stroke="#d62828" strokeWidth={2} strokeDasharray="5 5" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
