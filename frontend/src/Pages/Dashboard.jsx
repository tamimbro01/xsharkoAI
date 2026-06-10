
import { ArrowLeft, Check,  RocketIcon, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useEffect, useState } from "react";
import { motion } from "framer-motion"
import { useSelector } from "react-redux";




const Dashboard = () => {

  const [loading, setLoading] = useState(false);
  const [websites, setWebsites] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [error, setError] = useState("");


  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.user);

  
    const handleCopy = async (site) => {
        try {
          await navigator.clipboard.writeText(site.deploymentUrl)
          setCopiedId(site._id);

          setTimeout(() => {
            setCopiedId(null);
          }, 3000)

            
        } catch (error) {
            console.error("Failed to copy to clipboard:", error);

        }
    }


  
    const handleDeploy = async (id) => {

        try {
            const result = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/website/deploy/${id}`, { withCredentials: true }); 

            

            setWebsites((prev) => prev.map((w) => w._id === id ? {...w , deployed:true , deploymentUrl:result.data.deploymentUrl} : w))


            window.open(`${result.data.deploymentUrl}`, "_blank")

        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong");
        }


    }






  const handleGetAllWebsites = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/website/getall`, { withCredentials: true });

      if (result.data.success) {
        setWebsites(result.data.websites || []);
      } else {
        setWebsites([]);
      }

    } catch (error) {
      setError(error.response?.data?.message || error.response?.data?.error || "Failed to load websites");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleGetAllWebsites();
  }, []);

  return (
    <div
      className="min-h-screen bg-[#050505fa] text-white"

    >
      {/* Header  */}
      <div className="sticky top-0 z-40 backdrop-blur-1xl bg-black/50 border-b border-white/10  ">
        <div className="max-w-7xl  mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">

            <button onClick={() => navigate("/")} className="p-2 rounded-lg hover:bg-white/10 transition">

              <ArrowLeft className="cursor-pointer" size={24} />

            </button>
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>

          <button onClick={() => navigate("/generate")} className="px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:scale-105 transition cursor-pointer"  >
            + New Website
          </button>

        </div>
      </div>

      {/* main content  */}

      <div className="px-6 py-10 max-w-7xl mx-auto">

        <motion.div

          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10"


        >

          <p className="text-sm text-zinc-400 mb-1 font-bold">Welcome Back</p>

          <h1 className="text-xl font-bold">{userData?.name}</h1>

        </motion.div>


        {loading && <div className="mt-24 text-zinc-400 text-center">
          Loading Your websites...  </div>}
        {error && !loading && <div className="mt-24 text-center text-red-400">  {error} </div>}

        {!loading && websites && websites.length === 0 && <div className="mt-24 text-center text-zinc-500"> You Have No Website </div>}

        {!loading && websites && websites.length > 0 &&

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {websites.map((w, i) => {
              const copied = copiedId === w._id;
              return <motion.div

                key={w._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -6 }}
                onClick={() => navigate(`/editor/${w._id}`)}
                className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/20 transition flex flex-col  "
              >


                <div className="relative h-40 bg-black cursor-pointer">
                  <iframe srcDoc={w.latestCode} className="absolute inset-0 w-[140%]  scale-[0.72] origin-top-left pointer-events-none bg-white" />

                  <div className="absolute inset-0 bg-black/30" />
                </div>

                <div className="p-5 flex flex-col  gap-4
             flex-1  ">
                  <h3 className="text-base font-semibold line-clamp-2">{w.title}</h3>

                  <p className="text-xs text-zinc-400 ">Last Updated :- {" "}
                    {new Date(w.updatedAt).toLocaleDateString()}
                  </p>

                  {!w.deployed ?

                    <div >
                      <button onClick={(e) => { e.stopPropagation(); handleDeploy(w._id); }} className="flex items-center gap-2  cursor-pointer bg-blue-600 px-3 py-1.5 rounded-lg">
                        <RocketIcon size={18} />  Deploy
                      </button>
                    </div>


                    : <motion.button  
                    
                    
                    onClick={(e) => {e.stopPropagation(), handleCopy(w)}}
                    
                    whileTap={{scale:0.9}}
                    className={`mt-auto flex items-center justify-center  gap-4 cursor-pointer rounded-xl text-sm font-medium  transition-all py-2  ${copied ? "bg-emerald-500/20  text-emerald-400 border border-emerald-400/30 "  : "bg-white/10  hover:bg-white/30 border border-white/10  " } `}
                    


                    >

                      {copied ? <><Check size={14} /> Link Copied</> : <><Share2 size={14} /> Share Link</>}
                    </motion.button>
                  }



                </div>

              </motion.div>
            })}

          </div>

        }






      </div>



    </div>
  )
}

export default Dashboard


// 1:34:14