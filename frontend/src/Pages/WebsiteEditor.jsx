import { useEffect, useRef, useState } from "react"
import { Code2, Monitor, RocketIcon, Send, X, Copy, Check, ArrowLeft, MessageSquare } from "lucide-react"
import axios from 'axios'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Editor from '@monaco-editor/react';



const WebsiteEditor = () => {
    const [websites, setWebsites] = useState(null);
    const [code, setCode] = useState(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState([]);
    const [showChart, setShowChart] = useState(false);
    const [ShowFullPreview, setShowFullPreview] = useState(false);
    const [showCode, setShowCode] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [updateLoading, setUpdateLoading] = useState(false);
    const [thinkingIndex, setThinkingIndex] = useState(0);
    const [copied, setCopied] = useState(false);
    const iframeRef = useRef(null);
    const { id } = useParams();
    const navigate = useNavigate();


    const handleDeploy = async () => {

        try {
            const result = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/website/deploy/${websites?._id}`, { withCredentials: true });

            setWebsites((prev) => ({ ...prev, deployed: true }));
            window.open(`${result.data.deploymentUrl}`, "_blank")

        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong");
        }


    }



    const handleCopy = async () => {
        try {
            if (code) {
                await navigator.clipboard.writeText(code);
                setCopied(true);

                setTimeout(() => {
                    setCopied(false);
                }, 3000)

            }
        } catch (error) {
            setError("Failed to copy code to clipboard.");
        }
    }




    const thinkingSteps = [
        "Analyzing your prompt for code modifications...",
        "Scanning existing HTML tags and layout structure...",
        "Injecting updated CSS and Tailwind classes...",
        "Optimizing responsive layouts for mobile and desktop...",
        "Injecting JavaScript interactions and event listeners...",
        "Validating HTML tag closing and script tags...",
        "Compiling entire package into a live web view...",
        "Rendering updated website inside the canvas..."
    ]

    useEffect(() => {
        if (!updateLoading) return;

        const interval = setInterval(() => {
            setThinkingIndex((i) => (i + 1) % thinkingSteps.length);
        }, 1200);

        return () => clearInterval(interval);
    }, [updateLoading])




    useEffect(() => {
        const handleWebsite = async () => {
            if (!id) return;


            try {
                const result = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/website/getbyid/${id}`, { withCredentials: true })

                setWebsites(result.data.website);

                setCode(result.data.website.latestCode);
                setMessage(result.data.website.conversation);



            } catch (error) {
                setError(error.response?.data?.message || "Something went wrong")

            }
        }
        handleWebsite()
    }, [id])



    useEffect(() => {

        if (!iframeRef.current || !code) return;
        const blob = new Blob([code], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        iframeRef.current.src = url;

        return () => {
            URL.revokeObjectURL(url);
        }



    }, [code])



    const handleUpdate = async () => {
        setMessage((m) => [...m, { role: "user", content: prompt }]);
        setUpdateLoading(true);

        try {
            const result = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/website/update/${id}`, { prompt }, { withCredentials: true });

            setMessage((m) => [...m, { role: "ai", content: result.data.message }]);
            setCode(result.data.code);
        } catch (error) {
            setError(error.response?.data?.message || "Failed to update website.");
        } finally {
            setUpdateLoading(false);
            setPrompt("")
        }

    }


    function Header() {
        return (
            <div className="h-14 flex items-center justify-between border-b border-white/10">
                <span className="font-semibold truncate">{websites?.title}</span>
                <button className="lg:hidden" onClick={() => setShowChart(false)}>
                    <X />
                </button>
            </div>
        )
    }

    return (
        <div className=" flex h-screen w-screen bg-black text-white overflow-hidden">


            <aside className="hidden lg:flex w-95 h-screen flex-col border-r border-white/10 bg-black/80">
                <button onClick={() => navigate("/dashboard")} className="p-2 rounded-lg hover:bg-white/10 transition"><ArrowLeft className="cursor-pointer" size={24} /> </button>


                <Header />



                <div className="flex flex-col flex-1 min-h-0">


                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                        {
                            message.map((m, i) => {
                                return <div key={i} className={`max-w-[85%] ${m.role === "user" ? "ml-auto " : "mr-auto"}`}>
                                    <div className={`px-4 py-4  rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? "bg-white text-black" : "bg-white/5 border border-white/10 text-zinc-200 "}`}>
                                        {m.content}
                                    </div>
                                </div>
                            })
                        }
                        {updateLoading && <div className="max-w-[85%] mr-auto" >
                            <div className="px-4 py-2.5 rounded-2xl text-xs bg-white/5 border border-white/10 text-zinc-400  italic ">
                                {thinkingSteps[thinkingIndex]}
                            </div>
                        </div>}
                    </div>

                    <div className="p-3 border-t border-white/10 ">
                        <div className="flex gap-2 ">
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                rows={1}
                                placeholder="Discrive You changes ...."
                                className="flex-1 resize-none rounded-2xl px-4  py-3 bg-white/5 border border-white/10 focus:outline-none"
                            />
                            <button disabled={updateLoading} onClick={handleUpdate} className="cursor-pointer px-4 py-4 rounded-xl bg-white text-black"><Send size={19} /> </button>
                        </div>
                    </div>
                </div>

            </aside>



            {/* Site Previews */}
            <div className="flex-1 flex flex-col  ">

                <div className="h-14 px-4 flex justify-between items-center border border-white/10 bg-black/80  ">
                    <button onClick={() => navigate("/dashboard")} className="p-2 lg:hidden hover:bg-white/10 transition"><ArrowLeft className="cursor-pointer" size={24} /> </button>

                    <span className="text-xs text-zinc-400 "> Live Preview</span>
                    <div className="flex gap-4 ">
                        {websites?.deployed ? " " : <button onClick={handleDeploy} className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-linear-to-r from-indigo-500 to-purple-500  text-sm font-semibold hover:scale-105 transition cursor-pointer"> <RocketIcon size={19} /> Deploy </button>}

                        <button onClick={() => setShowChart(true)} className="p-2 lg:hidden " > <MessageSquare size={19} /> </button>

                        <button onClick={() => setShowCode(true)} className="cursor-pointer"> <Code2 size={19} />  </button>

                        <button className="cursor-pointer" onClick={() => setShowFullPreview(true)}  > <Monitor size={19} />  </button>


                    </div>
                </div>


                <iframe ref={iframeRef} sandbox="allow-scripts allow-same-origin allow-forms" className="flex-1  w-full  bg-white " />







            </div>


            {/* Moble Chate Previews */}

            <AnimatePresence >
                {showChart && (
                    < motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: "0" }}
                        exit={{ y: "100%" }}
                        className="fixed inset-y-0 right-0 w-full lg:w-[45%] z-9999 flex flex-col bg-[#1e1e1e]"
                    >
                        <Header />
                        <div className="flex flex-col flex-1 min-h-0">


                            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                                {
                                    message.map((m, i) => {
                                        return <div key={i} className={`max-w-[85%] ${m.role === "user" ? "ml-auto " : "mr-auto"}`}>
                                            <div className={`px-4 py-4  rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? "bg-white text-black" : "bg-white/5 border border-white/10 text-zinc-200 "}`}>
                                                {m.content}
                                            </div>
                                        </div>
                                    })
                                }
                                {updateLoading && <div className="max-w-[85%] mr-auto" >
                                    <div className="px-4 py-2.5 rounded-2xl text-xs bg-white/5 border border-white/10 text-zinc-400  italic ">
                                        {thinkingSteps[thinkingIndex]}
                                    </div>
                                </div>}
                            </div>

                            <div className="p-3 border-t border-white/10 ">
                                <div className="flex gap-2 ">
                                    <textarea
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        rows={1}
                                        placeholder="Discrive You changes ...."
                                        className="flex-1 resize-none rounded-2xl px-4  py-3 bg-white/5 border border-white/10 focus:outline-none"
                                    />
                                    <button disabled={updateLoading} onClick={handleUpdate} className="cursor-pointer px-4 py-4 rounded-xl bg-white text-black"><Send size={19} /> </button>
                                </div>
                            </div>
                        </div>



                    </motion.div>
                )}
            </AnimatePresence >
















            {/* Show Code  */}

            <AnimatePresence >
                {
                    showCode && (
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: "0" }}
                            exit={{ x: "100%" }}

                            className="fixed inset-y-0 right-0 w-full lg:w-[45%] z-9999 flex flex-col bg-[#1e1e1e]"
                        >
                            <div className="h-12 px-4 flex justify-between items-center  border-b border-white/10  bg-[#1e1e1e] ">
                                <span className="text-sm font-medium ">index.html</span>
                                <button className={` flex items-center gap-2  px-3 py-1.5 rounded-md border border-white/10  transition-all duration-200 cursor-pointer
                                       ${copied
                                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                                        : "bg-white/5 text-gray-300 hover:bg-white/10"
                                    }  `}
                                    onClick={handleCopy}
                                >
                                    {copied ? <Check size={17} /> : <Copy size={17} />}
                                    {copied ? " Copied" : " Copy"}
                                </button>
                                <button> <X className="cursor-pointer" size={19} onClick={() => setShowCode(false)} /> </button>


                            </div>

                            <Editor
                                theme="vs-dark" value={code} language="html"
                                onChange={(v) => setCode(v)}

                            />


                        </motion.div>
                    )
                }

            </ AnimatePresence>


            {/* Full Scenan Site  */}

            <AnimatePresence>
                {ShowFullPreview && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.95,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.95,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 120,
                            damping: 18,
                        }}
                        className="fixed inset-0 bg-black z-9999"
                    >
                        <iframe
                            srcDoc={code}
                            className="w-full h-full bg-white"
                            sandbox="allow-scripts allow-same-origin allow-forms"
                        />

                        <button
                            onClick={() => setShowFullPreview(false)}
                            className="cursor-pointer absolute top-4 right-4 p-2 bg-black/70 rounded-lg hover:bg-black transition-colors"
                        >
                            <X size={19} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
















        </div>
    )





}

export default WebsiteEditor



// 2:13:49