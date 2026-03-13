import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { Prediction } from './pages/Prediction';
import { Forecasting } from './pages/Forecasting';
import { RiverMap } from './pages/RiverMap';
import { HistoricalData } from './pages/HistoricalData';
import { CommunityReports } from './pages/CommunityReports';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="prediction" element={<Prediction />} />
        <Route path="forecasting" element={<Forecasting />} />
        <Route path="map" element={<RiverMap />} />
        <Route path="historical" element={<HistoricalData />} />
        <Route path="reports" element={<CommunityReports />} />
        <Route path="settings" element={<div className="p-8"><h1 className="text-2xl font-bold">Settings (Coming Soon)</h1></div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
