import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { FooterLinks } from "./FooterLinks"; // Adjusted import path
import { ChevronRight } from "lucide-react"; // Fixed missing import

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from("newsletter_subscriptions")
        .insert([{ 
          email, 
          status: "active",
          created_at: new Date().toISOString() 
        }])
        .select();
        
      if (error) {
        if (error.code === "23505") { // Fixed error code check
          toast({
            title: "Already Subscribed",
            description: "This email is already subscribed to our newsletter",
          });
        } else {
          throw error;
        }
      } else if (data) { // Ensure data exists
        toast({
          title: "Success!",
          description: "You've been subscribed to our newsletter",
        });
        setEmail("");
      }
    } catch (error: any) {
      console.error("Newsletter subscription error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to subscribe. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative mt-20 overflow-hidden border-t border-white/10 bg-mediarch-dark py-20">
      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-mediarch/5 to-mediarch-red/5 backdrop-blur-xl"></div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-5">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-mediarch">MEDIARCH</h2>
            <p className="mt-4 max-w-md text-sm text-gray-400">
              Connect with top industry experts, mentors, and a vibrant community to accelerate your growth and success.
            </p>
            <a 
              href="http://discord.gg/adeft" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-md bg-mediarch px-4 py-2 text-sm font-semibold text-white hover:bg-mediarch-red"
            >
              Join Our Community
            </a>
          </div>
          
          {/* Quick Links (Previously Platform) */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Quick Links
            </h3>
            <FooterLinks 
              links={[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" },
                { name: "Discord", href: "http://discord.gg/adeft" },
              ]} 
            />
          </div>
          
          {/* Services (Previously Company) */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Services
            </h3>
            <FooterLinks 
              links={[
                { name: "Renting Pods", href: "/about" },
                { name: "Bronze Package", href: "/about" },
                { name: "Silver Package", href: "/about" },
                { name: "Gold Package", href: "/about" },
                { name: "Diamond Package", href: "/about" },
              ]} 
            />
          </div>
          
          {/* Newsletter Signup */}
          <div className="md:col-span-1">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Join Our Newsletter
            </h3>
            <p className="text-sm text-gray-400">
              Stay updated with our latest tournaments and community events.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-l-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder-gray-500 backdrop-blur-sm focus:border-mediarch focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
              <Button 
                type="submit"
                className="rounded-l-none rounded-r-md bg-mediarch hover:bg-mediarch-red"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </form>
          </div>
        </div>
        
        {/* Divider */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Mediarch. All rights reserved.
            </p>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <a href="#" className="text-xs text-gray-500 hover:text-mediarch">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-gray-500 hover:text-mediarch">
                Terms of Service
              </a>
              <a href="#" className="text-xs text-gray-500 hover:text-mediarch">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

