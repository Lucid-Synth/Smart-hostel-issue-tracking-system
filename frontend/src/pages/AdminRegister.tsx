import { motion } from 'framer-motion';
import { 
  ShieldCheck, Mail, Lock, User,Fingerprint
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Base_url } from '../config/config';
import axios from 'axios';

const AdminRegister = () => {

  const [formData,setFormData] = useState({
    name:"",
    email:"",
    password:"",
    role:"MANAGEMENT",
    hostel:"X",
    block:"X",
    room:"X"
  })

  const navigate = useNavigate()

  const handleChange = (field:any,value:any) => {
    setFormData(prev => ({...prev,[field]:value}));
  }

  const handleSignup = async() => {
    const res = await axios.post(Base_url+'/register',formData);

    const {token,user} = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user",JSON.stringify(user))
    navigate('/admin/dashboard');
  }
  return (
    <div className="min-h-screen bg-[#FFFDF5] flex font-sans text-slate-900">
      
      <div className="hidden lg:flex w-[40%] bg-[#EAB308] p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 border-40 border-white rounded-full" />
          <div className="absolute bottom-[-5%] left-[-5%] w-64 h-64 border-20 border-white rounded-full" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 text-slate-900 mb-12">
            <div className="p-2 bg-slate-900 rounded-xl text-yellow-500 shadow-xl">
              <ShieldCheck size={28} />
            </div>
            <span className="text-2xl font-black tracking-tighter">HostelDesk <span className="text-white">HQ</span></span>
          </div>

          <h1 className="text-5xl font-black text-slate-900 leading-tight">
            Central <br />
            <span className="text-white underline decoration-slate-900 underline-offset-8">Management</span> <br />
            Portal.
          </h1>
          <p className="mt-8 text-slate-800 text-lg max-w-sm font-medium leading-relaxed">
            Gain full oversight of hostel operations, staff assignments, and incident resolutions.
          </p>
        </div>
      </div>

      {/* --- Right Side: Registration Form --- */}
      <div className="w-full lg:w-[60%] flex flex-col items-center justify-center p-6 sm:p-16">
        
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-2 mb-10">
          <div className="p-2 bg-yellow-500 rounded-lg text-slate-900">
            <ShieldCheck size={24} />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900">HostelDesk <span className="text-yellow-600 font-black italic">HQ</span></span>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-lg bg-white p-8 sm:p-12 rounded-[2.5rem] border border-yellow-100 shadow-2xl shadow-yellow-100/50"
        >
          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-900">Administrator Signup</h2>
            <p className="text-slate-500 mt-2 font-medium">Register your management account to begin oversight.</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="relative group sm:col-span-2">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-yellow-600 transition-colors" size={18} />
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name',e.target.value)}
                  placeholder="Full Admin Name"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-yellow-500 outline-none transition-all font-semibold"
                />
              </div>

              {/* Email */}
              <div className="relative group sm:col-span-2">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-yellow-600 transition-colors" size={18} />
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email',e.target.value)}
                  placeholder="Official Email Address"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-yellow-500 outline-none transition-all font-semibold"
                />
              </div>

              {/* Password */}
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-yellow-600 transition-colors" size={18} />
                <input 
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange('password',e.target.value)}
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-yellow-500 outline-none transition-all font-semibold"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                onClick={handleSignup}
                className="w-full py-5 bg-slate-900 hover:bg-yellow-500 text-white hover:text-slate-900 font-black rounded-2xl shadow-xl shadow-yellow-200/50 transition-all flex items-center justify-center gap-3 group active:scale-[0.98]"
              >
                Initialize Admin Access
                <Fingerprint className="group-hover:rotate-12 transition-transform" size={20} />
              </button>
            </div>

            <p className="text-center text-slate-500 text-sm mt-8 font-medium">
              Already have an admin account? <a href="/" className="text-yellow-600 font-black hover:underline underline-offset-4">Sign In</a>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminRegister;