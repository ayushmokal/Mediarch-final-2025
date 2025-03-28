
import Navbar from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Creators } from "@/components/Creators";
import { YouTubeStats } from "@/components/YouTubeStats";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { ServiceCard } from "@/components/ui/service-card";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col bg-mediarch-dark">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Creators />
        
        {/* Services Section */}
        <div className="bg-mediarch-dark/90 py-10 md:py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-mediarch mb-4">Our Services</h2>
              <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto">
                We provide a range of services designed to elevate your streaming career:
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex h-full"
              >
                <ServiceCard 
                  title="Renting Pods" 
                  description="Private, high-tech spaces for professional streaming."
                  icon="rocket"
                  variant="default"
                  className="w-full"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex h-full"
              >
                <ServiceCard 
                  title="Bronze Package" 
                  description="Learn the basics of streaming."
                  icon="badge"
                  variant="bronze"
                  className="w-full"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex h-full"
              >
                <ServiceCard 
                  title="Silver Package" 
                  description="Grow your skills with 24/7 support and field-specific guidance."
                  icon="star"
                  variant="silver"
                  className="w-full"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="sm:col-span-2 lg:col-span-1 flex h-full"
              >
                <ServiceCard 
                  title="Gold Package" 
                  description="Advanced mentorship, analytics, and community support."
                  icon="gem"
                  variant="gold"
                  className="w-full"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="sm:col-span-2 lg:col-span-2 flex h-full"
              >
                <ServiceCard 
                  title="Diamond Package" 
                  description="Personalized coaching, industry exposure, and full-time guidance."
                  icon="diamond"
                  variant="diamond"
                  className="w-full"
                />
              </motion.div>
            </div>
          </div>
        </div>
        
        <YouTubeStats />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
