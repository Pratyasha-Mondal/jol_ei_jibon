import { Activity } from 'lucide-react';

interface ScoreProps {
  location: string;
}

export const WaterQualityScore = ({ location }: ScoreProps) => {
  // Mock data derivation
  const getScoreData = () => {
    switch(location) {
      case 'Howrah Ghat': return { score: 35, classInfo: 'Poor', color: 'text-brand-pollution', bar: 'w-1/3 bg-brand-pollution' };
      case 'Babughat': return { score: 65, classInfo: 'Moderate', color: 'text-brand-warning', bar: 'w-2/3 bg-brand-warning' };
      default: return { score: 92, classInfo: 'Excellent', color: 'text-[#06d6a0]', bar: 'w-11/12 bg-[#06d6a0]' };
    }
  };

  const { score, classInfo, color, bar } = getScoreData();

  return (
    <div className="clay-card p-8 h-full flex flex-col justify-between">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800">AI Water Quality Score</h3>
          <p className="text-gray-500 text-sm mt-1">Real-time analytical assessment for {location}</p>
        </div>
        <div className="p-3 clay-card-inset rounded-xl text-brand-primary">
          <Activity size={24} />
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center py-6">
        <div className="relative">
          <svg className="w-48 h-48 transform -rotate-90">
            <circle
              cx="96" cy="96" r="80"
              className="stroke-gray-200 fill-transparent"
              strokeWidth="16"
            />
            <circle
              cx="96" cy="96" r="80"
              className={`stroke-current ${color} fill-transparent transition-all duration-1000 ease-out`}
              strokeWidth="16"
              strokeDasharray="502"
              strokeDashoffset={502 - (502 * score) / 100}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-5xl font-black ${color}`}>{score}</span>
            <span className="text-gray-500 text-sm font-bold uppercase tracking-widest mt-1">WQI</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <div className="flex justify-between items-center text-sm font-bold">
          <span className="text-gray-600">Classification</span>
          <span className={`px-3 py-1 rounded-full text-white bg-current ${color.replace('text-', 'bg-')} bg-opacity-90`}>
            {classInfo}
          </span>
        </div>
        <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden clay-card-inset">
          <div className={`h-full ${bar} rounded-full transition-all duration-1000`} />
        </div>
        <p className="text-xs text-center text-gray-500 mt-2">Prediction Confidence Indicator: 94.2%</p>
      </div>
    </div>
  );
};
