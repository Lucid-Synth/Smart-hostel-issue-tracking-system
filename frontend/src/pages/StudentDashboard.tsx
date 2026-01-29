import { motion } from 'framer-motion';
import { 
  Plus, Clock, 
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const StudentDashboard = () => {
  // Mock data for issues
  const issues = [
    { id: '1', title: 'Water Leakage in Bathroom', category: 'Plumbing', status: 'PENDING', date: '2 hours ago' },
    { id: '2', title: 'Ceiling Fan Not Working', category: 'Electrical', status: 'IN_PROGRESS', date: '1 day ago' },
    { id: '3', title: 'Wi-Fi Connection Dropping', category: 'Internet', status: 'RESOLVED', date: '3 days ago' },
  ];

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'PENDING': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'IN_PROGRESS': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'RESOLVED': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };
  const navigate = useNavigate();
  const issueButtonHandler = () => {
    navigate('/issues/add')
  }

  

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      <Sidebar />

      {/* --- Main Content --- */}
      <main className="flex-1 flex flex-col min-w-0">
        <Navbar />

        {/* Content Area */}
        <div className="p-6 sm:p-10 max-w-6xl w-full mx-auto">
          
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Your Complaints</h1>
              <p className="text-slate-500 mt-1">Track and manage your hostel maintenance requests.</p>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={issueButtonHandler}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all"
            >
              <Plus size={20} />
              New Issue
            </motion.button>
          </div>

          {/* Stats/Filters Row */}
          <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-6 no-scrollbar">
            {['All Issues', 'Pending', 'In-Progress', 'Resolved'].map((filter, idx) => (
              <button key={filter} className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                idx === 0 ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-600'
              }`}>
                {filter}
              </button>
            ))}
          </div>

          {/* Issues Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {issues.map((issue, idx) => (
              <motion.div 
                key={issue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
              >
                {/* Visual Accent */}
                <div className={`absolute top-0 left-0 w-1.5 h-full ${
                  issue.status === 'RESOLVED' ? 'bg-emerald-500' : issue.status === 'PENDING' ? 'bg-amber-400' : 'bg-blue-500'
                }`} />

                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider border ${getStatusStyle(issue.status)}`}>
                    {issue.status}
                  </span>
                  <span className="text-slate-400 text-xs flex items-center gap-1">
                    <Clock size={12} /> {issue.date}
                  </span>
                </div>

                <h3 className="font-bold text-slate-800 mb-1 group-hover:text-emerald-700 transition-colors line-clamp-1">
                  {issue.title}
                </h3>
                <p className="text-xs font-medium text-slate-400 mb-6">{issue.category}</p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex -space-x-2">
                    <div className="h-7 w-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">
                      M1
                    </div>
                  </div>
                  <button className="text-emerald-600 text-sm font-bold hover:underline">
                    View Details →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;