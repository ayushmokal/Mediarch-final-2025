import React from "react";
import { motion } from "framer-motion";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import catImage from "../images/channels4_profile.jpg";

export function YouTubeStats() {
  return (
    <section className="bg-gradient-to-br from-mediarch-dark to-black py-16 sm:py-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-mediarch-orange blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-mediarch blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        {/* Add floating particles for a more dynamic background */}
        <div className="absolute top-1/3 right-1/3 w-16 h-16 rounded-full bg-white/10 blur-xl animate-pulse" style={{ animationDelay: "1.5s" }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 rounded-full bg-mediarch-red/20 blur-xl animate-pulse" style={{ animationDelay: "0.7s" }}></div>
        <div className="absolute top-2/3 right-1/2 w-20 h-20 rounded-full bg-mediarch-orange/20 blur-xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">
            MY YOUTUBE JOURNEY
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto text-lg">
            Building a thriving community through consistent quality content and engagement
          </p>
        </motion.div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative group"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-mediarch to-mediarch-orange blur-md opacity-50 group-hover:opacity-80 transition-opacity"></div>
            <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-mediarch to-mediarch-orange rounded-full flex items-center justify-center relative">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="w-[95%] h-[95%] rounded-full overflow-hidden border-4 border-mediarch-orange flex items-center justify-center"
              >
                <a 
                  href="https://www.youtube.com/@Adeftwastaken" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block relative z-10 w-full h-full"
                >
                  <img 
                    src={catImage} 
                    alt="Cat profile" 
                    className="w-full h-full object-cover"
                  />
                  <span className="sr-only">Visit @Adeftwastaken YouTube Channel</span>
                </a>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-2 -right-2 bg-mediarch-red text-white text-sm px-3 py-1 rounded-full shadow-lg"
            >
              @Adeftwastaken
            </motion.div>
          </motion.div>
          
          <div className="space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(239, 182, 43, 0.2)" }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl relative overflow-hidden button-glow"
            >
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-mediarch/20 p-3 relative">
                  <div className="absolute inset-0 bg-mediarch/10 rounded-full animate-ping"></div>
                  <Icons.Users className="h-6 w-6 text-mediarch" />
                </div>
                <div>
                  <motion.p 
                    className="text-3xl md:text-4xl font-bold text-white"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    100K+
                  </motion.p>
                  <p className="text-gray-400">YouTube subscribers under 1 year</p>
                </div>
              </div>
              <a 
                href="https://www.youtube.com/@Adeftwastaken" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute top-2 right-3 text-mediarch hover:text-mediarch-orange transition-colors"
              >
                <Icons.ArrowRight className="h-4 w-4" />
                <span className="sr-only">Visit Channel</span>
              </a>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(239, 182, 43, 0.2)" }}
              className={cn(
                "bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl relative overflow-hidden button-glow"
              )}
            >
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-mediarch/20 p-3 relative">
                  <div className="absolute inset-0 bg-mediarch/10 rounded-full animate-pulse"></div>
                  <Icons.Target className="h-6 w-6 text-mediarch" />
                </div>
                <div>
                  <motion.p 
                    className="text-3xl md:text-4xl font-bold text-white"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    "Adeft"
                  </motion.p>
                  <p className="text-gray-400">Co-Founder</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex justify-end"
            >
              <a 
                href="https://www.youtube.com/@Adeftwastaken" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center space-x-2 text-white/70 hover:text-mediarch transition-colors py-2"
              >
                <span>Visit my channel</span>
                <Icons.ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>
        </div>
        
        {/* Stats bars section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Subscribers Stats Card */}
            <motion.div 
              className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl overflow-hidden button-glow"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Icons.Users className="h-5 w-5 text-mediarch-orange" />
                  <h3 className="text-xl font-bold text-white">Subscribers</h3>
                </div>
                <span className="text-2xl font-bold text-mediarch">100K+</span>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Beginning of Year</span>
                    <span>Current</span>
                  </div>
                  <div className="relative h-7">
                    <div className="absolute inset-0 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "95%" }}
                        transition={{ 
                          delay: 0.9, 
                          duration: 1.5, 
                          ease: "easeOut"
                        }}
                        className="h-full bg-gradient-to-r from-mediarch via-mediarch-orange to-mediarch-red rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTUiIGN5PSIxNSIgcj0iMTIiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjIpIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=')] animate-pulse opacity-20" />
                      </motion.div>
                    </div>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2.4 }}
                      className="absolute right-0 -top-1 bg-white rounded-full w-9 h-9 flex items-center justify-center shadow-lg shadow-mediarch/20 border-2 border-mediarch-orange"
                    >
                      <Icons.ChartLine className="h-4 w-4 text-mediarch-dark" />
                    </motion.div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Growth Rate</span>
                    <span className="text-mediarch">Exceptional</span>
                  </div>
                  <div className="flex space-x-1 h-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: "20%" }}
                        animate={{ height: `${20 + i * 15}%` }}
                        transition={{ 
                          delay: 1 + (i * 0.1), 
                          duration: 0.4, 
                          type: "spring" 
                        }}
                        className={`w-1/5 bg-gradient-to-t ${
                          i <= 2 ? "from-mediarch/70 to-mediarch" : 
                          i <= 4 ? "from-mediarch-orange/70 to-mediarch-orange" : 
                          "from-mediarch-red/70 to-mediarch-red"
                        } rounded-t-sm`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Views Stats Card */}
            <motion.div 
              className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl overflow-hidden button-glow"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Icons.Eye className="h-5 w-5 text-mediarch" />
                  <h3 className="text-xl font-bold text-white">Video Views</h3>
                </div>
                <span className="text-2xl font-bold text-mediarch">5M+</span>
              </div>
              
              <div className="space-y-6">
                <div className="relative pt-5">
                  <div className="absolute -left-2 -right-2 h-24">
                    <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                      <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ 
                          pathLength: 1, 
                          opacity: 1,
                          d: "M0,90 C60,40 140,80 200,50 C260,20 340,70 400,30"
                        }}
                        transition={{ 
                          delay: 1.2, 
                          duration: 1.5, 
                          ease: "easeInOut" 
                        }}
                        stroke="url(#gradientPath)"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="0 1"
                      />
                      <defs>
                        <linearGradient id="gradientPath" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#EFB62B" />
                          <stop offset="50%" stopColor="#F97316" />
                          <stop offset="100%" stopColor="#DD2C2C" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Animated dots along the path */}
                    {[0, 1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 bg-white rounded-full shadow-lg shadow-mediarch/30"
                        initial={{ left: `${i * 25}%`, top: "100%", opacity: 0 }}
                        animate={{ 
                          top: i % 2 === 0 ? "30%" : "60%",
                          opacity: 1,
                          scale: [1, 1.3, 1]
                        }}
                        transition={{ 
                          delay: 1.5 + (i * 0.15), 
                          duration: 0.6,
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="mt-8">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Monthly Views</span>
                    <span className="text-mediarch-orange">Trending Up</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 h-8 items-end">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                      <div key={day} className="flex flex-col items-center">
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${30 + Math.sin(i / 2) * 20 + i * 5}%` }}
                          transition={{ delay: 1.3 + (i * 0.1), duration: 0.6 }}
                          className="w-full bg-gradient-to-t from-mediarch/30 to-mediarch-orange/60 rounded-t-sm"
                          style={{
                            backgroundImage: i === 6 ? "linear-gradient(to top, rgba(239, 182, 43, 0.3), rgba(221, 44, 44, 0.8))" : ""
                          }}
                        />
                        <span className="text-[10px] mt-1 text-gray-500">{day.charAt(0)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Engagement score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-8 text-center"
          >
            <p className="text-white/70 mb-2">Engagement Score</p>
            <div className="relative h-4 bg-white/10 rounded-full max-w-xs mx-auto">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "87%" }}
                transition={{ delay: 1.7, duration: 1 }}
                className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-mediarch via-mediarch-orange to-mediarch-red"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ delay: 2.7, duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-white/20"
                />
              </motion.div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
                className="absolute -right-2 -top-8 bg-mediarch text-black text-xs font-bold px-2 py-1 rounded-md"
              >
                87%
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
