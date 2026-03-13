import { useOutletContext } from 'react-router-dom';
import { ThermometerSun, Droplets, Activity, Zap, Beaker, Factory, Bug, AlertTriangle } from 'lucide-react';
import { MetricCard } from '../components/dashboard/MetricCard';
import { WaterQualityScore } from '../components/dashboard/WaterQualityScore';
import { PredictionPanel } from '../components/dashboard/PredictionPanel';

const metricsData = [
  { id: 'temp', label: 'Temperature', value: '25°C', icon: ThermometerSun, color: 'text-orange-500' },
  { id: 'do', label: 'Dissolved Oxygen', value: '7.8 mg/L', icon: Droplets, color: 'text-blue-500' },
  { id: 'ph', label: 'pH Level', value: '7.2', icon: Activity, color: 'text-green-500' },
  { id: 'cond', label: 'Conductivity', value: '450 µS/cm', icon: Zap, color: 'text-yellow-500' },
  { id: 'bod', label: 'B.O.D.', value: '2.1 mg/L', icon: Beaker, color: 'text-purple-500' },
  { id: 'nitrate', label: 'Nitrate', value: '12 mg/L', icon: Factory, color: 'text-pink-500' },
  { id: 'fc', label: 'Fecal Coliform', value: '150 MPN/100ml', icon: Bug, color: 'text-red-500' },
  { id: 'tc', label: 'Total Coliform', value: '450 MPN/100ml', icon: AlertTriangle, color: 'text-rose-500' },
];

export const Dashboard = () => {
  const { currentLocation } = useOutletContext<{ currentLocation: string }>();

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsData.map((metric) => (
          <MetricCard key={metric.id} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WaterQualityScore location={currentLocation} />
        </div>
        <div className="lg:col-span-1">
          <PredictionPanel location={currentLocation} />
        </div>
      </div>
    </div>
  );
};
