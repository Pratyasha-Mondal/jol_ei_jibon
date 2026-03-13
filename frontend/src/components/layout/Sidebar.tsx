import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Map, 
  History, 
  MessageSquareWarning, 
  Activity,
  Settings,
  Droplets
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/prediction', label: 'Prediction', icon: Activity },
  { path: '/forecasting', label: 'Forecasting', icon: TrendingUp },
  { path: '/map', label: 'River Map', icon: Map },
  { path: '/historical', label: 'Historical Data', icon: History },
  { path: '/reports', label: 'Community Reports', icon: MessageSquareWarning },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 h-full hidden md:flex flex-col clay-card m-4 shrink-0 transition-all duration-300">
      <div className="p-6 flex items-center justify-center border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className="p-2 clay-card-inset rounded-full text-brand-primary">
            <Droplets size={28} />
          </div>
          <h1 className="text-xl font-bold text-gray-800 leading-tight">Jol Ei<br />Jibon</h1>
        </div>
      </div>
      
      <nav className="flex-1 py-8 px-4 overflow-y-auto flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'clay-card-inset text-brand-primary font-semibold' 
                  : 'text-gray-500 hover:text-gray-800 hover:bg-white/40 hover:translate-x-1'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-6">
        <div className="clay-card-inset p-4 rounded-xl">
          <p className="text-xs text-center text-gray-500 font-medium">
            AI Water Quality &<br />Health Monitoring
          </p>
        </div>
      </div>
    </aside>
  );
};
