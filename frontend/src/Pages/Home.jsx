import Navbar from "../Components/Navbar"

import { ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion";


const Home = () => {
  return (
    <>
      <Navbar />
      <section className="relative min-h-screen bg-black text-white overflow-hidden font-sans">

        {/* Glow Background */}
        <div className="absolute inset-0 pointer-events-none">

          {/* Top Left Glow */}
          <div className="absolute top-0 left-0 w-[40%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full" />

          {/* Bottom Right Glow */}
          <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />

        </div>

        {/* Grid Backround */}

        <div className="absolute inset-0 opacity-60"

          style={
            {
              backgroundImage: "linear-gradient(to right , #ffffff15 1px , transparent 1px) , linear-gradient(to bottom , #ffffff15 1px , transparent 1px)",
              backgroundSize: "40px 40px",
            }
          }


        >

        </div>

        {/*  Content Part */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 text-center">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-white/10 rounded-full bg-white/5 backdrop-blur-xl "
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* <span className="text-purple-400 font-semibold">✨</span> */}


            <Sparkles className="text-purple-400 size-5" />


            <span className="text-white text-sm">AI Powered Instant Websites</span>
          </motion.div>



          {/* Heading */}


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-6 mb-4">
              Build Your Dream Website <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-500"> with AI in Seconds.</span>
            </h1>
          </motion.div>


          {/* Description  */}


          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto"
          >
            Describe your business idea, and our AI will turn it into a beautiful, fully functional website in seconds — complete with design, content, and layout.
          </motion.p>



          {/* Buttons  */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-6 mt-10"
          >
            <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500  text-white font-semibold text-lg transition-all duration-300 cursor-pointer shadow-lg shadow-purple-600/30">
              Start Building  < ArrowRight size={20} />
            </button>
            <button className="px-6 py-3 rounded-full text-white font-semibold text-lg transition-all duration-300 cursor-pointer border border-white/10 hover:bg-white/10 hover:border-purple-500 ">Watch Demo</button>
          </motion.div>



          {/* Feature Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">

            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="bg-linear-to-br from-white/5 to-white/10 border border-white/10 rounded-2xl p-8 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10 transition-all"
            >
              <div className="w-12 h-12 bg-linear-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white mb-4">
                <Sparkles size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI Design Assistant</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Get unique, professional designs generated instantly based on your ideas. Our AI analyzes your needs and creates stunning layouts tailored to your brand.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1 }}
              className="bg-linear-to-br from-white/5 to-white/10 border border-white/10 rounded-2xl p-8 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10 transition-all"
            >
              <div className="w-12 h-12 bg-linear-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Instant Content Creation</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                AI generates high-quality copy, headlines, and descriptions for your site. Get everything you need to communicate your message effectively.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.2 }}
              className="bg-linear-to-br from-white/5 to-white/10 border border-white/10 rounded-2xl p-8 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10 transition-all"
            >
              <div className="w-12 h-12 bg-linear-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">One-Click Publishing</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Launch your professional website instantly with just one click — no technical skills required.            </p>
            </motion.div>



          </div>









        </div>












      </section>

    </>
  )
}

export default Home
