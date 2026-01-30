import { useEffect, useState } from "react";
import { Base_url } from "../config/config";
import axios from "axios";
import { User2 } from "lucide-react";


function Navbar() {


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

  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div>
        
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 sm:px-10">
          <div className="relative w-full max-w-md hidden sm:block">
            
          </div>
          
          <div className="flex items-center gap-4 ml-auto">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-800">{data?.name}</p>
              {user?.role === "STUDENT" && (
                <p className="text-xs text-slate-500">Block {data?.block}, Room {data?.room}</p>
              )}

              {user?.role === "MANAGEMENT" && (
                <p className="text-xs text-slate-500">ADMIN</p>
              )}
            </div>
            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold border-2 border-white shadow-sm">
                <User2 />
            </div>
          </div>
        </header>
        
        </div>
  )
}

export default Navbar