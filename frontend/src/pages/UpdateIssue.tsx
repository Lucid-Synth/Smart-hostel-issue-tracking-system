import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, CheckCircle2, PlayCircle, 
  XCircle, History, Send, AlertCircle
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Base_url } from '../config/config';

const UpdateIssue = () => {
  const { issueId } = useParams<{ issueId: string }>();

  const [currentStatus, setCurrentStatus] = useState<string>("OPEN");
  const [loading, setLoading] = useState(false);

  const statuses = [
    { id: 'OPEN', label: 'Open', color: 'bg-slate-500', icon: AlertCircle },
    { id: 'IN_PROGRESS', label: 'In Progress', color: 'bg-blue-500', icon: PlayCircle },
    { id: 'RESOLVED', label: 'Resolved', color: 'bg-emerald-500', icon: CheckCircle2 },
    { id: 'CLOSED', label: 'Closed', color: 'bg-red-500', icon: XCircle },
  ];

  const handleStatusUpdate = async (newStatus: string) => {
    if (newStatus === currentStatus) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await axios.patch(
        `${Base_url}/issue/${issueId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setCurrentStatus(newStatus);
    } catch (error) {
      console.error("Failed to update issue status", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          `${Base_url}/issue/${issueId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (data?.status) {
            setCurrentStatus(data.status);
        }

      } catch (error) {
        console.error("Failed to fetch issue status", error);
      }
    };

    if (issueId) fetchStatus();
  }, [issueId]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-slate-900 pb-20">
      <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-30 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
          to={`/issue/${issueId}`}>
          <button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-500">
            <ArrowLeft size={22} />
          </button>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black bg-slate-900 text-white px-2 py-0.5 rounded tracking-tighter">STAFF</span>
            <span className="font-bold text-slate-800 tracking-tight">HostelDesk Admin</span>
          </div>
          <div className="w-10" />
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 mt-10">
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Manage Ticket #{issueId}
          </h1>
          <p className="text-slate-500 font-medium">Update status</p>
        </div>

        <div className="grid gap-8">
          <div className="bg-white rounded-4xl border border-slate-200 p-8 shadow-xl shadow-slate-200/50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl text-white shadow-lg ${statuses.find(s => s.id === currentStatus)?.color}`}>
                  {React.createElement(
                    statuses.find(s => s.id === currentStatus)?.icon || AlertCircle,
                    { size: 32 }
                  )}
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    Current Status
                  </p>
                  <h2 className="text-2xl font-black text-slate-800">
                    {currentStatus ? currentStatus.replace('_', ' ') : '—'}
                  </h2>

                </div>
              </div>

              {loading && (
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full"
                />
              )}
            </div>

            {/* Status Selection */}
            <div className="mt-10">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-4 block">
                Select New Status
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {statuses.map((status) => (
                  <button
                    key={status.id}
                    onClick={() => handleStatusUpdate(status.id)}
                    disabled={loading}
                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 group ${
                      currentStatus === status.id 
                        ? 'border-emerald-500 bg-emerald-50/50 ring-4 ring-emerald-500/5' 
                        : 'border-slate-100 bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <status.icon
                      size={20}
                      className={currentStatus === status.id ? 'text-emerald-600' : 'text-slate-400'}
                    />
                    <span className={`text-[10px] font-black uppercase tracking-tighter ${
                      currentStatus === status.id ? 'text-emerald-700' : 'text-slate-500'
                    }`}>
                      {status.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Log (UI only, backend-ready) */}
          <section className="bg-white rounded-4xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
              <History size={18} className="text-slate-400" />
              <h3 className="font-bold text-slate-800">Status History Log</h3>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="relative pl-8 border-l-2 border-slate-100 space-y-8">
                <div className="relative">
                  <div className="absolute -left-10.25 top-1 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Status changed to {currentStatus}
                    </p>
                    <p className="text-xs text-slate-400 font-medium">
                      Updated by Admin • Just now
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="relative">
            <textarea 
              placeholder="Add a private remark about this change..."
              className="w-full p-6 bg-white border border-slate-200 rounded-4xl focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all font-medium text-slate-600 resize-none shadow-sm"
              rows={3}
            />
            <button className="absolute bottom-4 right-4 p-3 bg-slate-900 text-white rounded-xl hover:bg-emerald-600 transition-all shadow-lg">
              <Send size={18} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UpdateIssue;
