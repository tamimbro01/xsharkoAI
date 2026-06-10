import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Coins, LogOut, ChevronDown } from "lucide-react";
import { LoginModal } from "./LoginModal";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openLogin, setOpenLogin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const { userData } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      setShowDropdown(false);

    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 backdrop-blur-xl bg-black/80 border-b border-white/5 z-50"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          {/* LOGO */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5 cursor-pointer bg-white/5 p-2 px-4 rounded-2xl border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300"
          >
            <img
              src="logo.png"
              alt="logo"
              className="w-8 h-8 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <span className="font-semibold text-lg bg-linear-to-r from-purple-400 to-indigo-200 bg-clip-text text-transparent">
              xsharko
            </span>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/pricing")}
              className="hidden md:block text-sm font-medium text-zinc-300 hover:text-white transition-all cursor-pointer"
            >
              Pricing
            </button>

            {/* Credits */}
            {userData && (
              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer border border-white/10 text-sm bg-white/5 hover:bg-white/10 transition-all duration-300">
                <Coins size={18} className="text-yellow-400" />
                <span className="text-white font-medium">
                  {userData.credits}
                </span>
                <span className="text-zinc-400">Credits</span>
                <span className="font-semibold text-purple-400 ml-1">+</span>
              </div>
            )}

            {/* Profile or Login */}
            {userData ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 focus:outline-none bg-white/5 hover:bg-white/10 p-1.5 px-3 rounded-full border border-white/10 transition-all duration-300 cursor-pointer"
                >
                  <img
                    referrerPolicy="no-referrer"
                    src={userData?.avatar || userData?.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData?.name || userData?.user?.name || "User")}&background=6366f1&color=fff`}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border border-white/20 object-cover"
                  />
                  <span className="hidden md:block text-sm font-medium text-zinc-300">
                    {userData?.name || userData?.user?.name || "Profile"}
                  </span>
                  <ChevronDown size={14} className={`text-zinc-400 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowDropdown(false)}
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-64 rounded-2xl border border-white/10 bg-[#0e0e11]/95 backdrop-blur-xl p-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50 flex flex-col gap-3"
                    >
                      {/* User Info Header */}
                      <div className="flex items-center gap-3 pb-3 border-b border-white/5">
                        <img
                          referrerPolicy="no-referrer"
                          src={userData?.avatar || userData?.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData?.name || userData?.user?.name || "User")}&background=6366f1&color=fff`}
                          alt="avatar"
                          className="w-10 h-10 rounded-full border border-white/20 object-cover"
                        />
                        <div className="overflow-hidden">
                          <h4 className="font-semibold text-white text-sm truncate">
                            {userData?.name || userData?.user?.name || "User"}
                          </h4>
                          <p className="text-xs text-zinc-400 truncate">
                            {userData?.email || userData?.user?.email || ""}
                          </p>
                        </div>
                      </div>

                      {/* Dashbord */}

                      <div onClick={() => navigate("/dashboard")} className="flex items-center gap-3 pb-3 border-b border-white/5 bg-white/5 px-4 py-2 rounded-xl cursor-pointer hover:bg-white/10 transition-all duration-300 hover:text-white">
                        <button className="text-zinc-300 font-semibold text-sm cursor-pointer">Dashboard</button>
                      </div>




                      {/* Credits Info */}
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5   cursor-pointer hover:bg-white/10 transition-all duration-300 hover:text-white  ">
                        <div className="flex items-center gap-2">
                          <Coins size={16} className="text-yellow-400" />
                          <span className="text-xs text-zinc-300">Credits Balance</span>
                        </div>
                        <span className="font-bold text-sm text-white">
                          {userData.credits}
                        </span>
                      </div>

                      {/* Logout Button */}
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full p-2.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 text-sm font-medium cursor-pointer"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </motion.div>
                  </>
                )}
              </div>
            ) : (
              <button onClick={() => setOpenLogin(true)} className="px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm transition-all duration-300 text-white cursor-pointer shadow-lg shadow-indigo-600/25">
                Login
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {
        openLogin && (
          <LoginModal open={openLogin} onClick={() => setOpenLogin(false)} />
        )
      }
    </>
  );
};

export default Navbar;
