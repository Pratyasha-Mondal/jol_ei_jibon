import { useOutletContext } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, AlertTriangle, Droplets, Activity } from 'lucide-react';
import L from 'leaflet';

// Fix for default Leaflet marker icons in React
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const sensors = [
  { id: 'S-001', name: 'Dakshineswar', lat: 22.6521, lng: 88.3582, status: 'Safe', wqi: 92, do: 7.8 },
  { id: 'S-002', name: 'Babughat', lat: 22.5645, lng: 88.3375, status: 'Moderate', wqi: 65, do: 5.5 },
  { id: 'S-003', name: 'Howrah Ghat', lat: 22.5855, lng: 88.3425, status: 'Unsafe', wqi: 35, do: 3.2 },
  { id: 'S-004', name: 'Bally Bridge', lat: 22.6517, lng: 88.3498, status: 'Safe', wqi: 88, do: 7.5 },
];

export const RiverMap = () => {
  const { currentLocation } = useOutletContext<{ currentLocation: string }>();

  // Use selected location as map center, default to Dakshineswar
  const activeSensor = sensors.find(s => s.name === currentLocation) || sensors[0];
  const position: [number, number] = [activeSensor.lat, activeSensor.lng];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Safe': return '#06d6a0';
      case 'Moderate': return '#ffd166';
      case 'Unsafe': return '#d62828';
      default: return '#3aa6b9';
    }
  };

  const getPulseAnimation = (status: string) => {
    switch(status) {
      case 'Safe': return 'hotspot-pulse-green';
      case 'Moderate': return 'hotspot-pulse-yellow';
      case 'Unsafe': return 'hotspot-pulse-red';
      default: return '';
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full min-h-[600px] animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">River Network Digital Twin</h2>
          <p className="text-gray-500 font-medium mt-1">Live satellite feed with pollution hotspot overlay</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#06d6a0]"></span>
            <span className="text-sm font-medium text-gray-600">Safe</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-brand-warning"></span>
            <span className="text-sm font-medium text-gray-600">Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-brand-danger"></span>
            <span className="text-sm font-medium text-gray-600">Critical Hotspot</span>
          </div>
        </div>
      </div>

      <div className="flex-1 clay-card overflow-hidden p-2 relative z-0">
        <MapContainer 
          center={position} 
          zoom={13} 
          scrollWheelZoom={true} 
          style={{ height: '100%', width: '100%', borderRadius: '16px' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          
          {sensors.map((sensor) => (
            <div key={sensor.id}>
              {/* Hotspot Glowing Radius */}
              <CircleMarker
                center={[sensor.lat, sensor.lng]}
                pathOptions={{
                  fillColor: getStatusColor(sensor.status),
                  fillOpacity: 0.3,
                  color: 'transparent',
                }}
                radius={sensor.status === 'Unsafe' ? 60 : sensor.status === 'Moderate' ? 40 : 20}
                className={getPulseAnimation(sensor.status)}
              />
              
              {/* Actual Pin Marker */}
              <Marker position={[sensor.lat, sensor.lng]}>
                <Popup className="rounded-2xl">
                  <div className="p-1 min-w-[200px]">
                    <div className="flex items-center gap-2 mb-3 border-b pb-2">
                      <MapPin size={16} className="text-brand-primary" />
                      <span className="font-bold text-gray-800">{sensor.name}</span>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 font-medium">Sensor ID</span>
                        <span className="font-bold">{sensor.id}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 font-medium">Water Quality</span>
                        <span className="font-bold flex items-center gap-1">
                          <Activity size={14} className={sensor.status === 'Unsafe' ? 'text-brand-danger' : 'text-brand-primary'} />
                          {sensor.wqi}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 font-medium">DO Level</span>
                        <span className="font-bold flex items-center gap-1">
                          <Droplets size={14} className="text-blue-500" />
                          {sensor.do} mg/L
                        </span>
                      </div>
                      <div className="mt-3 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white ${sensor.status === 'Unsafe' ? 'bg-brand-danger' : sensor.status === 'Moderate' ? 'bg-brand-warning' : 'bg-[#06d6a0]'}`}>
                          {sensor.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </div>
          ))}
        </MapContainer>
        
        {/* Floating AI Insight Card */}
        <div className="absolute bottom-6 left-6 z-[1000] clay-card p-4 w-72 backdrop-blur-md bg-white/80">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-brand-danger/10 rounded-full shrink-0">
              <AlertTriangle className="text-brand-danger" size={20} />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-sm">AI Alert: Howrah Ghat</h4>
              <p className="text-xs text-gray-600 mt-1">High probability of industrial effluent discharge detected. WQI dropped to 35.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
