import { motion } from 'framer-motion';
import { 
  User, Mail, Lock, Building, MapPin, DoorOpen, 
  ShieldCheck, ArrowRight 
} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Base_url } from '../config/config';

const Register = () => {
  const [formData,setFormData] = useState({
    name:"",
    email:"",
    password:"",
    role:"STUDENT",
    hostel:"",
    block:"",
    room:""
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
    setSignedUp(true);
    if(user === "STUDENT"){
      navigate('/student/dashboard');
    }
    else{
      navigate('/admin/dashboard');
    }
  }

  const [signedUp,setSignedUp] = useState(false)

  return (
    <div className="min-h-screen bg-[#fafafa] flex font-sans text-slate-900">
      
      <div className="hidden lg:flex w-1/2 bg-emerald-600 p-12 flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-white mb-8">
            <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg">
              <ShieldCheck size={28} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">HostelDesk</span>
          </div>
          <h1 className="text-5xl font-extrabold text-white leading-tight">
            Your room, <br />
            <span className="text-emerald-200">sorted.</span>
          </h1>
          <p className="mt-6 text-emerald-50 text-lg max-w-md font-medium">
            Report issues, track repairs, and communicate with management—all from your student portal.
          </p>
        </div>

        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12">
        
        {/* Mobile Header */}
        <div className="lg:hidden flex flex-col items-center gap-2 mb-10">
          <div className="p-3 bg-emerald-600 rounded-2xl text-white shadow-lg shadow-emerald-200">
            <ShieldCheck size={32} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-emerald-800">HostelDesk</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-800 italic">Student Registration</h2>
            <p className="text-slate-500 mt-2">Join your hostel's digital ecosystem</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Primary Details */}
            <div className="space-y-3">
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input 
                  type="text" placeholder="Full Name" 
                  value={formData.name}
                  onChange={(e) => handleChange('name',e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input 
                  type="email" placeholder="University Email"
                  value={formData.email}
                  onChange={(e) => handleChange('email',e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input 
                  type="password" placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleChange('password',e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Hostel Specifics Section */}
            <div>
              <div className="space-y-3">
                <div className="relative group">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                  <input 
                    type="text" placeholder="Hostel Name"
                    value={formData.hostel}
                    onChange={(e) => handleChange('hostel',e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative group">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                    <input 
                      type="text" placeholder="Block"
                      value={formData.block}
                      onChange={(e) => handleChange('block',e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400" 
                    />
                  </div>
                  <div className="relative group">
                    <DoorOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                    <input 
                      type="text" placeholder="Room No" 
                      value={formData.room}
                      onChange={(e) => handleChange('room',e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400" 
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              onClick={handleSignup}
              className="w-full py-4 mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xl shadow-emerald-200/50 transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
            >
              Create Student Account
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>

            {signedUp && (
              <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-blue-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm font-medium"
                >
                    You have Registered
                </motion.div>
            )}

            <p className="text-center text-slate-500 text-sm mt-8">
              Already registered? <Link className='text-blue-500' to="/">Login</Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;