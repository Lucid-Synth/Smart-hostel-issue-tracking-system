import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Upload, AlertTriangle, 
  Eye, EyeOff, Send, HelpCircle
} from 'lucide-react';

const AddIssue = () => {
  const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');
  const [visibility, setVisibility] = useState<'PUBLIC' | 'PRIVATE'>('PRIVATE');

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12 font-sans text-slate-900">
      {/* --- Top Header --- */}
      <nav className="h-16 bg-white border-lg border-slate-400 sticky top-0 z-10 flex items-center px-6 justify-between">
        <button className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors font-medium">
          <ArrowLeft size={20} />
          <span className="hidden sm:inline">Back to Dashboard</span>
        </button>
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-600 rounded-lg text-white">
            <AlertTriangle size={18} />
          </div>
          <span className="font-bold text-slate-800">HostelDesk</span>
        </div>
        <div className="w-20" /> {/* Spacer for balance */}
      </nav>

      <main className="max-w-3xl mx-auto mt-8 px-6">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900">Report an Issue</h1>
          <p className="text-slate-500 mt-2">Provide details about the maintenance required in your room or block.</p>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-slate-300 shadow-2xl shadow-slate-200/40 p-6 sm:p-10"
        >
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            
            {/* Title & Description */}
            <div className="space-y-4">
              <div className="group">
                <label className="block text-sm font-bold text-slate-700 mb-2">Issue Title</label>
                <input 
                  type="text" 
                  placeholder="e.g., Broken fan capacitor or leaking tap"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                <textarea 
                  rows={4}
                  placeholder="Tell us more about the problem..."
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400 resize-none"
                />
              </div>
            </div>

            {/* Category & Priority Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                <select className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all appearance-none cursor-pointer">
                  <option>Electrical</option>
                  <option>Plumbing</option>
                  <option>Furniture</option>
                  <option>Internet/Wi-Fi</option>
                  <option>Cleaning</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Priority Level</label>
                <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-200">
                  {(['LOW', 'MEDIUM', 'HIGH'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`flex-1 py-2 text-[11px] font-black rounded-xl transition-all ${
                        priority === p 
                        ? 'bg-white text-emerald-600 shadow-sm' 
                        : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Image Upload Area */}
            <div>
              <label className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                Upload Images <span className="text-slate-400 font-normal">(Max 3)</span>
              </label>
              <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-emerald-50/30 hover:border-emerald-200 transition-all group cursor-pointer">
                <div className="p-4 bg-white rounded-2xl shadow-sm text-slate-400 group-hover:text-emerald-500 transition-colors mb-3">
                  <Upload size={24} />
                </div>
                <p className="text-sm font-bold text-slate-600">Click to upload or drag and drop</p>
                <p className="text-xs text-slate-400 mt-1">PNG, JPG or WEBP</p>
              </div>
            </div>

            {/* Visibility Toggle */}
            <div className="bg-emerald-50/50 p-5 rounded-3xl border border-emerald-100/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-600 rounded-xl text-white">
                  {visibility === 'PUBLIC' ? <Eye size={18} /> : <EyeOff size={18} />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Visibility: {visibility}</h4>
                  <p className="text-xs text-slate-500">
                    {visibility === 'PUBLIC' 
                      ? "Other students in your hostel can see this." 
                      : "Only management can see this report."}
                  </p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setVisibility(v => v === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC')}
                className="text-xs font-bold text-emerald-600 hover:underline"
              >
                Change
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-slate-900 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 group"
            >
              Submit Ticket
              <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </motion.div>

        <p className="mt-8 text-center text-slate-400 text-sm flex items-center justify-center gap-1">
          <HelpCircle size={14} /> Need urgent help? Contact hostel warden directly.
        </p>
      </main>
    </div>
  );
};

export default AddIssue;