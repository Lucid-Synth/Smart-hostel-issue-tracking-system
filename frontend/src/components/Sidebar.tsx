import { 
  AlertCircle, LayoutDashboard, User2, LogOut
} from 'lucide-react';


function Sidebar() {

  const currentPath = window.location.pathname;

  const linkStyles = (path: string) => {
    const isActive = currentPath === path;
    return `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
      isActive 
        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-100' 
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
    }`;
  };

  return (
    <aside className="hidden md:flex h-screen w-64 bg-white border-r border-slate-200 flex-col p-6 sticky top-0">
      {/* Brand Logo */}
      <div className="flex items-center gap-2 text-emerald-600 font-bold text-xl mb-10 px-2">
        <div className="p-1.5 bg-emerald-600 rounded-lg text-white">
          <AlertCircle size={20} />
        </div>
        <span>HostelDesk</span>
      </div>
      
      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        <a href="/student/dashboard" className={linkStyles('/student/dashboard')}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </a>
        
        <a href="/profile" className={linkStyles('/profile')}>
          <User2 size={20} />
          <span>Profile</span>
        </a>
      </nav>

      {/* Logout at bottom */}
      <div className="pt-6 border-t border-slate-100">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;