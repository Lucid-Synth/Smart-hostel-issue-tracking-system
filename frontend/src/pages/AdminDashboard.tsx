import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import { BadgeInfo } from 'lucide-react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Base_url } from '../config/config'
import Sidebar from '../components/Sidebar'


function AdminDashboard() {
  type Issue = {
    id: string;
    title: string;
    category: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED';
    priority: string;
    description: string;
    visibility: string;
    };


    const [issues,setIssues] = useState<Issue[]>([])

  
    const getStatusStyle = (status: Issue['status']) => {
        switch (status) {
        case 'PENDING':
            return 'bg-amber-50 text-amber-700 border-amber-100';
        case 'IN_PROGRESS':
            return 'bg-blue-50 text-blue-700 border-blue-100';
        case 'RESOLVED':
            return 'bg-emerald-50 text-emerald-700 border-emerald-100';
        default:
            return 'bg-slate-50 text-slate-700 border-slate-100';
        }
    };

        const getPriorityStyle = (priority: Issue['priority']) => {
        switch (priority) {
        case 'LOW':
            return 'bg-amber-50 text-green-500 border-amber-100';
        case 'MEDIUM':
            return 'bg-amber-50 text-yellow-500 border-blue-100';
        case 'HIGH':
            return 'bg-amber-50 text-red-700 border-emerald-100';
        default:
            return 'bg-slate-50 text-slate-700 border-slate-100';
        }
    };

    useEffect(() => {
        const fetchAllIssues = async () => {
            try{
                const token = localStorage.getItem("token");

                const { data } = await axios.get(Base_url+'/issues',{
                    headers:{
                        Authorization: token
                    }
                })

                setIssues(data.issues || [])

            }catch(error){
                console.error("Failed to fetch issues",error);
            }
        }

        fetchAllIssues();
    },[])

  
  return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
            <Sidebar />

      <main className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <div className="p-6 sm:p-10 max-w-6xl w-full mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                All Complaints
              </h1>
              <p className="text-slate-500 mt-1">
                Track and manage hostel maintenance requests.
              </p>
            </div>

          </div>

          {/* Issues Grid */}
          {issues.length === 0 ? (
            <p className="text-slate-500 text-center mt-20">
              No issues reported yet...
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {issues.map((issue, idx) => (
                <motion.div
                  key={issue.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-6 rounded-3xl border border-slate-300 shadow-lg hover:shadow-md relative"
                >
                  <div
                    className={`absolute top-0 left-0 w-1.5 h-full ${
                      issue.status === 'RESOLVED'
                        ? 'bg-emerald-500'
                        : issue.status === 'PENDING'
                        ? 'bg-amber-400'
                        : 'bg-blue-500'
                    }`}
                  />

                  <div className="flex justify-between items-start mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bolder border ${getStatusStyle(
                        issue.status
                      )}`}
                    >
                      {issue.status}
                    </span>

                    <span className= {`text-xs flex items-center gap-1 ${getPriorityStyle(issue.priority)}`}>
                      <BadgeInfo size={12} />
                      {issue.priority}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-800 mb-1 line-clamp-1">
                    {issue.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-400 mb-6">
                    {issue.category}
                  </p>

                  <p className="text-gray-800 text-sm font-light">
                    {issue.description}
                  </p>
                  <button className="text-emerald-600 text-sm font-bold hover:underline mt-4">
                    View Details →
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard