import { motion } from "framer-motion";
import {
  Megaphone,
  Calendar,
  Pin,
  ChevronRight,
  Plus
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Base_url } from "../config/config";
import { Link } from "react-router-dom";

interface AnnouncementType {
  id: string;
  title: string;
  message: string;
  block: string | null;
  createdAt: string;
}

const Announcement = () => {
  const [announcements, setAnnouncements] = useState<AnnouncementType[]>([]);
  const [loading, setLoading] = useState(true);

  const user:any = localStorage.getItem("user")
  // NEW badge logic (last 24 hours)
  const isNewAnnouncement = (dateString: string) => {
    const created = new Date(dateString);
    const now = new Date();
    const diffHours = (now.getTime() - created.getTime()) / (1000 * 60 * 60);
    return diffHours < 24;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get(
          `${Base_url}/announcement`,
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`
            }
          }
        );

        setAnnouncements(res.data);
        console.log(announcements)
      } catch (err) {
        console.error("Failed to fetch announcements", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      <Sidebar />

      {/* --- Main Content --- */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <Navbar />

        <div className="p-6 sm:p-10 max-w-4xl mx-auto w-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Megaphone className="text-emerald-600" size={20} />
                <span className="text-xs font-black tracking-widest text-emerald-600 uppercase">
                  Official
                </span>
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                Announcements
              </h1>
              <p className="text-slate-500 font-medium">
                Stay updated with the latest news from hostel management.
              </p>
            </div>

            <div className="hidden sm:flex h-12 w-12 bg-white rounded-2xl border border-slate-200 items-center justify-center text-slate-400 relative">
              {user.role === 'MANAGEMENT' && (
                <Link
              to={'/announcement/add'}>
                <Plus size={20} />
              </Link>
              )}
              {announcements.length > 0 && (
                <div className="absolute top-3 right-3 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white"></div>
              )}
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center text-slate-400 font-semibold">
              Loading announcements...
            </div>
          )}

          {/* Empty State */}
          {!loading && announcements.length === 0 && (
            <div className="text-center text-slate-400 font-semibold">
              No announcements available.
            </div>
          )}

          {/* Announcement Feed */}
          <div className="space-y-6">
            {announcements.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white rounded-4xl border border-slate-200 p-6 sm:p-8 hover:shadow-xl hover:shadow-emerald-500/5 hover:border-emerald-200 transition-all cursor-default"
              >
                {/* Pin first announcement */}
                {idx === 0 && (
                  <div className="absolute -left-3 top-8 bg-emerald-600 text-white p-1.5 rounded-lg shadow-lg rotate-[-15deg]">
                    <Pin size={14} fill="currentColor" />
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {isNewAnnouncement(item.createdAt) && (
                        <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                          New
                        </span>
                      )}

                      <span className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                        <Calendar size={14} />
                        {formatDate(item.createdAt)}
                      </span>

                      {item.block && (
                        <span className="text-xs font-bold text-slate-400">
                          • Block {item.block}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-black text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-slate-600 leading-relaxed font-medium">
                      {item.message}
                    </p>
                  </div>

                  <div className="flex items-center sm:self-center">
                    <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          {!loading && announcements.length > 0 && (
            <div className="mt-12 text-center">
              <p className="text-sm font-bold text-slate-400">
                Showing latest {announcements.length} announcements
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Announcement;
