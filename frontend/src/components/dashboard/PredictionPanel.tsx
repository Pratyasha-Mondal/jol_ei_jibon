import { TrendingUp, Sparkles } from 'lucide-react';

export const PredictionPanel = ({ location }: { location: string }) => {
  const getPrediction = () => {
    if (location === 'Howrah Ghat') return { status: 'Unsafe', color: 'text-brand-danger', bg: 'bg-brand-danger' };
    if (location === 'Babughat') return { status: 'Poor', color: 'text-brand-pollution', bg: 'bg-brand-pollution' };
    return { status: 'Moderate', color: 'text-brand-warning', bg: 'bg-brand-warning' };
  };

  const { status, color } = getPrediction();

  return (
    <div className="clay-card p-8 h-full flex flex-col bg-gradient-to-br from-brand-card to-[#e2ebfa]">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Sparkles className="text-brand-primary" size={20} />
          AI Forecast
        </h3>
        <TrendingUp className="text-gray-400" />
      </div>

      <div className="flex-1 flex flex-col justify-center gap-8">
        <div className="text-center">
          <p className="text-gray-500 font-medium mb-3">Next Month Status</p>
          <div className="inline-block">
            <span className={`text-3xl font-black ${color} tracking-tight drop-shadow-sm`}>
              {status}
            </span>
            <div className={`mt-2 h-1 w-full rounded-full bg-current ${color.replace('text-', 'bg-')} bg-opacity-30 mx-auto`}></div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="clay-card-inset p-4 rounded-2xl flex justify-between items-center">
            <span className="text-sm font-bold text-gray-600">Predicted WQI</span>
            <span className="text-lg font-black text-gray-800">
              {status === 'Unsafe' ? '28' : status === 'Poor' ? '42' : '65'}
            </span>
          </div>
          
          <div className="clay-card-inset p-4 rounded-2xl flex justify-between items-center">
            <span className="text-sm font-bold text-gray-600">Confidence</span>
            <span className="text-sm font-black text-brand-primary flex items-center gap-1">
              89% ML XGBoost
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
