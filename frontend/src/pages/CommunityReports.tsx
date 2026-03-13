import { useState } from 'react';
import { Camera, ImagePlus, HeartPulse, Send, CheckCircle2 } from 'lucide-react';

export const CommunityReports = () => {
  const [reportType, setReportType] = useState<'pollution' | 'health'>('pollution');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000); // reset mock submit
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-20">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Community & Health Reporting</h2>
        <p className="text-gray-500 font-medium mt-1">Empowering citizens to protect local waters and public health.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3 flex flex-col gap-4">
          <button 
            onClick={() => setReportType('pollution')}
            className={`p-6 text-left transition-all ${reportType === 'pollution' ? 'clay-card border-l-4 border-brand-pollution' : 'clay-card-inset opacity-70 hover:opacity-100'}`}
          >
            <Camera className="text-brand-pollution mb-3" size={28} />
            <h3 className="text-lg font-bold text-gray-800 mb-1">Report Pollution</h3>
            <p className="text-sm text-gray-500 font-medium">Spotted an illegal discharge, dead fish, or sewage leak? Report to local authorities instantly.</p>
          </button>
          
          <button 
            onClick={() => setReportType('health')}
            className={`p-6 text-left transition-all ${reportType === 'health' ? 'clay-card border-l-4 border-brand-danger' : 'clay-card-inset opacity-70 hover:opacity-100'}`}
          >
            <HeartPulse className="text-brand-danger mb-3" size={28} />
            <h3 className="text-lg font-bold text-gray-800 mb-1">Health Symptoms</h3>
            <p className="text-sm text-gray-500 font-medium">Workers and citizens can log waterborne disease symptoms like fever or skin infection for the digital twin mapping.</p>
          </button>
        </div>

        <div className="lg:w-2/3 clay-card p-8">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center py-20 animate-in zoom-in duration-300">
              <div className="p-4 bg-[#06d6a0]/20 rounded-full mb-4">
                <CheckCircle2 size={48} className="text-[#06d6a0]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Report Submitted!</h3>
              <p className="text-gray-500 font-medium text-center max-w-md">Thank you for contributing to safer communities. Your report has been logged and integrated into the AI prediction model.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 animate-in fade-in">
              <h3 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-4">
                Submit {reportType === 'pollution' ? 'Environmental Incident' : 'Health Symptoms'}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-600">Location near the river</label>
                  <input required type="text" placeholder="E.g., Howrah Ghat Steps" className="clay-card-inset w-full py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-gray-700" />
                </div>
                
                {reportType === 'health' ? (
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-600">Patient Type</label>
                    <select className="clay-card-inset w-full py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-gray-700 appearance-none">
                      <option>Community Member</option>
                      <option>Fisherman / River Worker</option>
                      <option>Industrial Worker</option>
                    </select>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-600">Incident Category</label>
                    <select className="clay-card-inset w-full py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-gray-700 appearance-none">
                      <option>Industrial Effluent</option>
                      <option>Dead Fish / Animal</option>
                      <option>Sewage Leak</option>
                      <option>Illegal Dumping</option>
                      <option>Abnormal Color/Smell</option>
                    </select>
                  </div>
                )}
              </div>

              {reportType === 'health' && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-600">Symptoms Observed (Select all that apply)</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Diarrhea', 'Vomiting', 'Fever', 'Skin Infection', 'Eye Irritation', 'Stomach Pain'].map((symptom) => (
                      <label key={symptom} className="flex items-center gap-2 cursor-pointer p-3 clay-card-inset rounded-xl hover:bg-white/40">
                        <input type="checkbox" className="accent-brand-primary w-4 h-4" />
                        <span className="text-sm font-medium text-gray-700">{symptom}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-600">Description</label>
                <textarea required rows={4} placeholder="Please describe what you observed..." className="clay-card-inset w-full py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-gray-700 resize-none" />
              </div>

              {reportType === 'pollution' && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-600">Photo Evidence (Optional)</label>
                  <div className="clay-card-inset w-full p-8 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-white/30 hover:border-brand-primary/50 transition-colors">
                    <ImagePlus size={32} className="mb-2" />
                    <span className="font-medium">Click to upload or drag and drop</span>
                    <span className="text-xs mt-1">JPG, PNG up to 10MB</span>
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-4 mt-2 border-t border-gray-100">
                <button type="submit" className="clay-btn px-8 py-3 flex items-center gap-2 font-bold text-lg">
                  <Send size={18} />
                  Submit Report
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
