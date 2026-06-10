import { signInWithPopup } from "firebase/auth";
import { motion } from "framer-motion";
import { Sparkle, X } from "lucide-react";
import { auth, provider } from "../../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

export const LoginModal = ({ open, onClick }) => {

    const dispatch = useDispatch();


    const handleGoogleAuth = async () => {
        try {

            const result = await signInWithPopup(auth, provider)
            console.log(result)

            const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/google`,
                {
                    name: result.user.displayName,
                    email: result.user.email,
                    avatar: result.user.photoURL

                }, {
                withCredentials: true
            }
            )
            console.log("backend response : ", data)
            dispatch(setUserData(data.user))
            onClick(); // Close modal upon successful login

        } catch (error) {
            console.log(error)

        }


    }



    return (
        <div>
            {open ? (

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClick}

                    className="fixed inset-0 flex z-100 items-center  justify-center bg-black/80 backdrop-blur-xl px-4 "
                >

                    <motion.div
                        initial={{ scale: 0.88, opacity: 0, y: 60 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 40 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()}



                        className="relative w-full max-w-md p-px rounded-3xl bg-linear-to-br from-purple-500/40 via-purple-600/40 to-indigo-600/30"
                    >
                        <div className="relative rounded-3xl bg-[#0b0b0b] border border-white/10 shadow-[0_38px_112px_rgba(0,0,0,0.25)] overflow-hidden" >

                            {/*  Glow Baground */}

                            <motion.div

                                className="absolute -top-32 -left-32 w-80 h-80 bg-purple-500/30 rounded-full blur-[140px]" />
                            <motion.div

                                className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-500/25 rounded-full blur-[14px]" />

                            <button className="absolute top-6 right-6 z-10 text-zinc-400 hover:text-white transition-all cursor-pointer" onClick={onClick}> <X />

                            </button>

                            <div className="relative px-8 pt-14 pb-10 text-center">
                                <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-white/10 bg-white/5 rounded-full backdrop-blur">

                                    <Sparkle className="w-4 h-4 text-purple-400" /> <span className="font-medium text-white">AI Website Builder</span>
                                </div>



                                <h2 className="text-3xl font-semibold leading-tight mb-3 space-x-2 text-white">


                                    Welcome to {" "}
                                    <span className="bg-linear-to-r from-purple-400  to-blue-600 bg-clip-text 
                                   text-transparent" > Xsharko </span>
                                </h2>

                                <motion.button
                                    onClick={handleGoogleAuth}



                                    whileHover={{ scale: 1.04, transition: { duration: 0.3 } }}

                                    className="group relative w-full h-13 rounded-full bg-white text-black   font-semibold  shadow-xl overflow-hidden     cursor-pointer        "



                                >
                                    <div className=" relative flex items-center justify-center gap-3                     ">

                                        <img className="h-5 w-5" src="google.png" alt="" />
                                        Login with google
                                    </div>


                                </motion.button>



                                <div className="flex items-center gap-4 my-10">

                                    <div className="h-px flex-1 bg-white/20" />
                                    <span className="text-xs tracking-tight text-zinc-500"   >Secure Login</span>

                                    <div className="h-px flex-1 bg-white/20" />
                                </div>

                                <p className="text-xs text-zinc-500  leading-relaxed">


                                    By proceeding, you agree to our {""}

                                    <span className="cursor-pointer underline hover:text-white transition-all">Terms of Service</span> and {" "}
                                    <span className="cursor-pointer underline hover:text-white transition-all">Privacy Policy</span>

                                </p>

                            </div>

                        </div>


                    </motion.div>

                </motion.div>

            ) : null}
        </div>
    )
}
