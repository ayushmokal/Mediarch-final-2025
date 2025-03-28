
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { motion } from "framer-motion";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error, success } = await signIn(email, password);
      
      if (success) {
        toast({
          title: "Success",
          description: "Logged in successfully!",
        });
        navigate("/admin/dashboard");
      } else {
        toast({
          title: "Error",
          description: error?.message || "Failed to login. Please check your credentials.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-mediarch-dark">
      <Navbar />
      
      <div className="relative">
        <div className="absolute inset-0 z-0 bg-mediarch-dark">
          <BackgroundPaths title="Admin Login" />
        </div>
        
        <div className="relative z-10 pt-32 pb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="container mx-auto px-4 mt-20 mb-16 max-w-md"
          >
            <Card className="backdrop-blur-md bg-white/5 border border-white/10">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-mediarch">Admin Login</CardTitle>
                <CardDescription className="text-gray-300">
                  Login to access the admin dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-md border border-white/10 bg-mediarch-dark/80 px-4 py-2 text-white placeholder-gray-500 focus:border-mediarch focus:outline-none"
                      placeholder="admin@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-md border border-white/10 bg-mediarch-dark/80 px-4 py-2 text-white placeholder-gray-500 focus:border-mediarch focus:outline-none"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-mediarch text-mediarch-dark hover:bg-mediarch/90"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging in...' : 'Login'}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center border-t border-white/10 pt-4">
                <p className="text-sm text-gray-400">
                  Admin access only. Contact system administrator if you need access.
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminLogin;
