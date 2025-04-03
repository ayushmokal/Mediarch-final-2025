import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { motion } from "framer-motion";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const Contact = () => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isMobile = useIsMobile();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit to Supabase
      const { error } = await supabase
        .from('contacts')
        .insert({
          name: `${formState.firstName} ${formState.lastName}`,
          email: formState.email,
          message: formState.message,
          read: false,
          status: 'pending'
        });
        
      if (error) throw error;
        
      // Success state
      setIsSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "Thanks for contacting us. We'll get back to you soon.",
      });
      
      // Reset form
      setFormState({
        firstName: "",
        lastName: "",
        email: "",
        message: ""
      });
      
      // Reset submission status after a delay
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col bg-mediarch-dark">
      <Navbar />
      
      {/* Hero Section with Background Paths - Increased height for better visibility */}
      <div className="relative h-[55vh] md:h-[65vh] lg:h-[75vh]">
        <div className="absolute inset-0 z-0 bg-mediarch-dark">
          <BackgroundPaths title="Contact Us" />
        </div>
      </div>
      
      {/* Content Section - Added more padding for better spacing */}
      <div className="relative z-10 bg-mediarch-dark/95 py-10 md:py-14 lg:py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="container mx-auto px-4"
        >
          <div className="grid grid-cols-1 gap-8 md:gap-12 md:grid-cols-2 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 md:p-8 border border-white/10 h-full">
                <h2 className="mb-4 md:mb-6 text-xl md:text-2xl font-bold text-mediarch">Get In Touch</h2>
                <p className="mb-6 text-sm md:text-base text-gray-300">
                  Have questions about Mediarch? We're here to help! Fill out the form
                  and our team will get back to you as soon as possible.
                </p>
                
                <div className="mb-6 md:mb-8">
                  <h3 className="mb-3 md:mb-4 text-lg md:text-xl font-semibold text-white">Our Information</h3>
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 md:h-10 w-8 md:w-10 items-center justify-center rounded-full bg-mediarch/10 text-mediarch">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4 md:h-5 md:w-5" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                          />
                        </svg>
                      </div>
                      <span className="text-sm md:text-base text-gray-300">contact@mediarch.com</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 md:h-10 w-8 md:w-10 items-center justify-center rounded-full bg-mediarch/10 text-mediarch">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4 md:h-5 md:w-5" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                          />
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                          />
                        </svg>
                      </div>
                      <span className="text-sm md:text-base text-gray-300">123 Gaming Street, Suite 100, Esports City, EC 12345</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="rounded-lg border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-md h-full">
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="mb-1 md:mb-2 block text-xs md:text-sm text-gray-300">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={formState.firstName}
                        onChange={handleChange}
                        className="w-full rounded-md border border-white/10 bg-mediarch-dark/80 px-3 py-2 text-sm md:text-base text-white placeholder-gray-500 focus:border-mediarch focus:outline-none"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="mb-1 md:mb-2 block text-xs md:text-sm text-gray-300">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        value={formState.lastName}
                        onChange={handleChange}
                        className="w-full rounded-md border border-white/10 bg-mediarch-dark/80 px-3 py-2 text-sm md:text-base text-white placeholder-gray-500 focus:border-mediarch focus:outline-none"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="mb-1 md:mb-2 block text-xs md:text-sm text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full rounded-md border border-white/10 bg-mediarch-dark/80 px-3 py-2 text-sm md:text-base text-white placeholder-gray-500 focus:border-mediarch focus:outline-none"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="mb-1 md:mb-2 block text-xs md:text-sm text-gray-300">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={isMobile ? 3 : 4}
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full rounded-md border border-white/10 bg-mediarch-dark/80 px-3 py-2 text-sm md:text-base text-white placeholder-gray-500 focus:border-mediarch focus:outline-none"
                      placeholder="How can we help you?"
                      required
                    ></textarea>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-mediarch text-mediarch-dark hover:bg-mediarch/90 text-sm md:text-base"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : isSubmitted ? 'Message Sent!' : 'Send Message'}
                  </Button>
                  
                  {isSubmitted && (
                    <div className="rounded-md bg-green-500/10 p-3 text-center text-green-400">
                      Thanks for reaching out! We'll be in touch soon.
                    </div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
