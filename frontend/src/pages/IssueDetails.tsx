import axios from "axios";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Building,
  DoorOpen,
  Shield,
  ExternalLink,
  Image as ImageIcon,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { Base_url } from "../config/config";


interface Issue {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  visibility: string;
  createdAt: string;
  assignedTo: number;
  hostel: string;
  block: string;
  room: string;
  images: string[];
}



const IssueDetails = () => {
  const { issueId } = useParams<{ issueId: string }>();
  const token = localStorage.getItem("token");
  const user: any = JSON.parse(localStorage.getItem("user") || "null");

  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!issueId || !token) return;

    const fetchIssue = async () => {
      try {
        const response = await axios.get(
          `${Base_url}/issue/${issueId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        // backend returns array
        setIssue(response.data.issue[0]);
      } catch (error) {
        console.error("Failed to fetch issue:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
  }, [issueId, token]);


  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400 font-bold">
        Loading issue details…
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">
        Issue not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFBFC] pb-12">
      {/* Header */}
      <nav className="bg-white border-b px-6 py-4 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link
            to={
              user?.role === "MANAGEMENT"
                ? "/admin/dashboard"
                : "/student/dashboard"
            }
          >
            <button className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold text-sm">
              <ArrowLeft size={18} />
              Back to Dashboard
            </button>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-xs font-black text-slate-400 uppercase">
              Ticket ID: #{issue.id}
            </span>
            <span className="px-3 py-1 bg-amber-50 text-amber-600 border rounded-full text-[10px] font-black uppercase">
              {issue.status}
            </span>
            {user.role === "MANAGEMENT" && (
              <NavLink
              to={`status`}>
                <button className="px-3 py-1 bg-amber-50 text-indigo-600 text-[10px] font-black uppercase">
                  Update status
                </button>
              </NavLink>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 mt-8 grid lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border p-8 shadow-sm"
          >
            <div className="flex justify-between mb-6">
              <div>
                <h1 className="text-3xl font-black mb-2">{issue.title}</h1>
                <div className="flex gap-4 text-xs font-bold text-slate-400">
                  <span className="flex gap-1.5">
                    <Calendar size={14} /> {formatDate(issue.createdAt)}
                  </span>
                  <span className="flex gap-1.5">
                    <Shield size={14} /> {issue.visibility}
                  </span>
                </div>
              </div>

              <span
                className={`px-4 py-1.5 rounded-xl text-xs font-black border ${
                  issue.priority === "HIGH"
                    ? "bg-red-50 text-red-600"
                    : "bg-slate-50 text-green-600"
                }`}
              >
                {issue.priority} PRIORITY
              </span>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 mb-8">
              <p className="text-xs font-black text-slate-400 uppercase mb-3">
                Description
              </p>
              <p className="text-slate-700 font-medium">
                {issue.description || "No description provided."}
              </p>
            </div>

            {!issue.images.length ? (
              <div className="border-2 border-dashed rounded-2xl p-8 text-center text-slate-300">
                <ImageIcon size={32} />
                <p className="text-xs font-bold mt-2">
                  No images attached
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {issue.images.map((image, index) => (
                  <iframe key={index} src={image}></iframe>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {user?.role === 'STUDENT' && (
            <div className="bg-white rounded-3xl border p-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase mb-4">
              Assignment
            </h3>
            <p className="font-bold">Support Staff #{issue.assignedTo}</p>
            <button className="w-full mt-4 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold flex justify-center gap-2 hover:bg-emerald-600">
              Ping Staff <ExternalLink size={14} />
            </button>
          </div>
          )}

          <div className="bg-emerald-600 rounded-3xl p-6 text-white relative overflow-hidden">
            <h3 className="text-[10px] font-black text-emerald-200 uppercase mb-4">
              Location
            </h3>
            <div className="space-y-4">
              <p className="flex gap-3">
                <Building size={18} /> Hostel {issue.hostel} 
              </p>
              <p className="flex gap-3">
                <MapPin size={18} /> Block {issue.block}
              </p>
              <p className="flex gap-3">
                <DoorOpen size={18} /> Room {issue.room}
              </p>
            </div>
            <CheckCircle2 className="absolute -bottom-8 -right-8 opacity-10" size={100} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default IssueDetails;
