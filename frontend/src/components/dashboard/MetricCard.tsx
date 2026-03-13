import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export const MetricCard = ({ label, value, icon: Icon, color }: MetricCardProps) => {
  return (
    <div className="clay-card p-6 flex items-center justify-between group cursor-default">
      <div className="flex flex-col gap-1">
        <span className="text-gray-500 text-sm font-medium">{label}</span>
        <span className="text-2xl font-bold text-gray-800 tracking-tight">{value}</span>
      </div>
      <div className={`p-4 clay-card-inset rounded-2xl ${color} bg-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
        <Icon size={24} />
      </div>
    </div>
  );
};
