import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { setUserData } from "../redux/userSlice";




const PHASES = [
    "Analyzing your idea...",
    "Designing layout and structure...",
    "Writing HTML and CSS & JS...",
    "Adding animation and interaction...",
    "Final quality checks..."
]


const Generate = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.user);
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const [progress, setProgress] = useState(0)
    const [phasesIndex, setPhaseIndex] = useState(0);



    const handleGenerateWebsite = async () => {
        try {
            setLoading(true);

            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/website/generate`, { prompt }, { withCredentials: true });

            setProgress(100);

            console.log("res", res)
            dispatch(setUserData({ ...userData, credits: res.data.reamingCredit }))


            navigate(`/editor/${res.data.websiteId}`)



        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong")
        }
        finally {
            setLoading(false)
        }

    }



    const handleBack = () => {
        navigate("/dashboard")
    }



    useEffect(() => {
        if (!loading) {
            setPhaseIndex(0);
            setProgress(0);
            return;
        }

        let value = 0;
        let phase = 0;
        const interval = setInterval(() => {
            const increment = value < 20 ? Math.random() * 1.5 : value < 50 ? Math.random() * 1.2 : Math.random() * 0.6;
            value += increment;

            if (value >= 93) {
                value = 93;
            }

            phase = Math.floor((value / 100) * PHASES.length);

            setProgress(value);
            setPhaseIndex(phase);
        }, 1200);

        return () => clearInterval(interval);
    }, [loading])






    return (
        <div
            className="relative min-h-screen bg-[#050505] text-white overflow-hidden" >

            {/* Falling Light Effect */}
            <div className='pointer-events-none absolute inset-0 overflow-hidden'>
                {/* beam */}
                <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] 
                bg-linear-to-b from-white/15 via-white/5 to-transparent 
                blur-3xl opacity-50'/>

                {/* center glow */}
                <div className='absolute -top-40 left-1/2 -translate-x-1/2 w-[350px] h-[350px] 
                bg-white/15 rounded-full blur-[120px]' />
            </div>

            {/* Header */}
            <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10" >
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4 ">
                        <button onClick={handleBack} className="p-2 -ml-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                            <ArrowLeft size={22} />
                        </button>
                        <h1 className="font-semibold text-lg ">X Sharko AI</h1>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-current mb-16 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
                        Build Website with{" "}
                        <span className="block bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                            Real AI Power
                        </span>
                    </h1>

                    <p className='text-zinc-400 max-w-2xl mx-auto leading-relaxed'>
                        This process may take several minutes. X Sharko AI focuses on quality not shortcuts
                    </p>
                </motion.div>

                {/* Prompt area constrained for readability */}
                <div className="max-w-3xl mx-auto mt-10">
                    <h1 className="text-xl font-semibold mb-5 text-center"> Describe Your Website </h1>

                    <div className="relative z-10">
                        {/* Textarea */}
                        <textarea

                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Discribe Your idea"
                            className="w-full h-56 p-6 rounded-3xl 
                            bg-zinc-950/60 border border-white/10 outline-none resize-none text-base leading-relaxed 
                            focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all duration-300 placeholder-zinc-600"
                        />



                    </div>
                    {error && (
                        <p className="text-red-500 mt-4 text-sm ">{error}</p>
                    )}



                </div>

                {/* GENERATE BUTTON */}
                <div className="flex items-center justify-center mt-10">
                    <motion.div
                        whileHover={{ y: -5 }}
                    >
                        <motion.button
                            onClick={() => handleGenerateWebsite()}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={!prompt.trim() || loading}
                            className={`px-14 cursor-pointer py-3.5 rounded-2xl font-semibold text-lg transition  shadow-md shadow-white/5 active:scale-95 duration-200 ${prompt.trim() && !loading ? "bg-white text-black" : "bg-white/20 text-zinc-400 cursor-not-allowed"}`}
                        >
                            Generate Website
                        </motion.button>

                    </motion.div>
                </div>


                {/* PROGRESS BAR  */}


                {
                    loading && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="max-w-xl mx-auto mt-12"
                        >
                            <div className="flex justify-between mb-2 text-xs text-zinc-400">
                                <span>
                                    {PHASES[phasesIndex] || "Generating..."}
                                </span>
                                <span>{progress.toFixed(1)}%</span>
                            </div>

                            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    animate={{ width: `${progress}%` }}
                                    transition={{ ease: "easeOut", duration: 0.7 }}
                                    className="h-full bg-linear-to-r from-white to-zinc-400 rounded-full"
                                />
                            </div>

                            <div className="text-xs text-zinc-400 mt-4 text-center">
                                Estimated time remaining:{" "}
                                <span className="text-white font-medium"> ~1 to 3 minutes </span>
                            </div>
                        </motion.div>
                    )
                }
            </div>
        </div>
    )
}

export default Generate;






// 1: 01: 21