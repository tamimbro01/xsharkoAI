import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUserData } from "./redux/userSlice";
import Home from "./Pages/Home";
import Pricing from "./Pages/Pricing";
import Dashboard from "./Pages/Dashboard";
import Generate from "./Pages/Generate";
import WebsiteEditor from "./Pages/WebsiteEditor";
import LiveSite from "./Pages/LiveSite";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/me`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setUserData(res.data.user));
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchProfile();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/editor/:id" element={<WebsiteEditor />} />
        <Route path="/site/:id" element={ <LiveSite />  } />

      </Routes>                    
    </BrowserRouter>
  );
};

export default App; 
