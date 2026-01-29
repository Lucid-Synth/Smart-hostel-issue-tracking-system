import { 
  AlertCircle, LayoutDashboard,User2
} from 'lucide-react';

function Sidebar() {
  return (
    <div><aside className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col p-6">
        <div className="flex items-center gap-2 text-emerald-600 font-bold text-xl mb-10 px-2">
          <div className="p-1.5 bg-emerald-600 rounded-lg text-white">
            <AlertCircle size={20} />
          </div>
          HostelDesk
        </div>
        
        <nav className="space-y-1 flex-1">
          <a href="/student/dashboard" className="flex items-center gap-3 px-4 py-3 bg-emerald-50 text-emerald-700 rounded-xl font-semibold">
            <LayoutDashboard size={20} /> Dashboard
          </a>
          <a href="/profile" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">
            <User2 size={20} /> Profile
          </a>
        </nav>

      </aside>
      </div>
  )
}

export default Sidebar