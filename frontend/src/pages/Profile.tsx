
import axios from 'axios';
import { 
  User, Building, MapPin, DoorOpen, 
  ShieldCheck,
  User2,
} from 'lucide-react';
import { Base_url } from '../config/config';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Profile = () => {
const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(`${Base_url}/profile`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        setData(data.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (

    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      <Sidebar />

      {/* --- Main Content --- */}
      <main className="flex-1 flex flex-col min-w-0">
        <Navbar />

        {/* Content Area */}
        <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-900 pb-12">
      {/* Header / Cover Area */}
      <div className="h-40 bg-emerald-600 w-full relative">
        <div className="absolute -bottom-16 left-6 sm:left-12 flex items-end gap-6">
          <div className="h-32 w-32 rounded-3xl bg-white p-1.5 shadow-xl">
            <div className="h-full w-full rounded-[1.2rem] bg-emerald-100 flex items-center justify-center text-emerald-700 text-4xl font-black border-2 border-emerald-50">
              <User2 />
            </div>
          </div>
          <div className=" hidden sm:block">
            <h1 className="text-2xl font-black text-slate-900 leading-none">{data?.name}</h1>
            <p className="text-slate-500 font-medium mt-1">{data?.role}</p>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Essential Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <User size={20} className="text-emerald-600" />
                Personal Information
              </h2> 
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Full Name</p>
                <p className="font-bold text-slate-700">{data?.name}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Email Address</p>
                <p className="font-bold text-slate-700">{data?.email}</p>
              </div>
              <div>
              </div>
            </div>
          </div>

          {/* Residence Bento Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
              <Building className="text-emerald-600 mb-3" size={24} />
              <p className="text-[10px] font-black uppercase text-emerald-700/60 tracking-tight">Hostel</p>
              <p className="text-lg font-black text-emerald-900">{data?.hostel}</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <MapPin className="text-slate-400 mb-3" size={24} />
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-tight">Block</p>
              <p className="text-lg font-black text-slate-800">{data?.block}</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <DoorOpen className="text-slate-400 mb-3" size={24} />
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-tight">Room No</p>
              <p className="text-lg font-black text-slate-800">{data?.room}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Settings & Security */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Need Help?</h3>
              <p className="text-slate-400 text-sm mb-6">Contact the warden or technical support for urgent issues.</p>
              <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-bold transition-all">
                Contact Warden
              </button>
            </div>
            <ShieldCheck size={120} className="absolute -bottom-8 -right-8 text-white/5 rotate-12" />
          </div>
        </div>
      </main>
    </div>
      </main>
    </div>
    
  );
};

export default Profile;