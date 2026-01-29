import { motion } from 'framer-motion';
import { Mail, Lock, AlertTriangle, Fingerprint } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Base_url } from '../config/config';

const Login = () => {
    const [error, setError] = useState("");
    const [loggedIn,setLoggedIn] = useState(false)
    const [formData,setFormData] = useState({
        email:"",
        password:""
    })

    const handleChange = (field:any,value:any) => {
        setFormData(prev => ({...prev,[field]:value}))
    }

  const handleLogin = async () => {
    try {
      setError(""); // clear old error

      const res = await axios.post(Base_url + '/login', formData);
      const { token,user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user",JSON.stringify(user))
      setLoggedIn(true);
      if(user.role === "STUDENT"){
        navigate('/student/dashboard');
      }
      else{
        navigate('/admin/dashboard');
      }

    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Invalid credentials");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

    const navigate = useNavigate();
    function handleNavigate(){
        navigate('/register');
    }

  return (
    <div className="min-h-screen bg-[#fafafa] flex font-sans text-slate-900">
      
      {/* --- Left Side: Matching Sidebar --- */}
      <div className="hidden lg:flex w-1/2 bg-emerald-600 p-12 flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-white mb-8">
            <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg">
              <AlertTriangle size={28} />
            </div>
            <span className="text-2xl font-bold tracking-tight">HostelDesk</span>
          </div>
          <h1 className="text-5xl font-extrabold text-white leading-tight">
            Welcome back <br />
            <span className="text-emerald-200">to your portal.</span>
          </h1>
          <p className="mt-6 text-emerald-50 text-lg max-w-md font-medium">
            Log in to check your issue status or raise a new request.
          </p>
        </div>

        {/* Unique Decorative Shape for Login */}
        <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" />
      </div>

      {/* --- Right Side: Login Form --- */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12">
        
        {/* Mobile Header */}
        <div className="lg:hidden flex flex-col items-center gap-2 mb-12">
          <div className="p-3 bg-emerald-600 rounded-2xl text-white shadow-xl shadow-emerald-100">
            <AlertTriangle size={32} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-emerald-800">HostelDesk</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-800 italic">Sign In</h2>
            <p className="text-slate-500 mt-2">Access your student dashboard</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-4">
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email',e.target.value)}
                  placeholder="University Email"
                  className="w-full pl-10 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input 
                  type="password" 
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleChange('password',e.target.value)}
                  className="w-full pl-10 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              onClick={handleLogin}
              className="w-full py-4 mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
            >
              Secure Login
              <Fingerprint className="group-hover:rotate-12 transition-transform" size={20} />
            </button>

            {loggedIn && (
                <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-blue-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm font-medium"
                >
                    You have Logged In
                </motion.div>
            )}

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm font-medium"
                >
                    {error}
                </motion.div>
                )}


            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#fafafa] px-2 text-slate-400 font-medium">New to the hostel?</span></div>
            </div>

            <button
              type="button"
              onClick={handleNavigate}
              className="w-full py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              Create an Account
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;