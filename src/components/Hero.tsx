
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { renderCanvas } from "@/components/ui/canvas";
import { Icons } from "@/components/ui/icons";

export function Hero() {
  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <canvas
        className="pointer-events-none absolute inset-0 z-0"
        id="canvas"
      ></canvas>
      
      <div className="container relative z-10 mx-auto px-4 pt-20 md:pt-24 lg:pt-36">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="mb-6 md:mb-8 opacity-0 animate-fadeIn" style={{ animationDelay: "300ms" }}>
            <span className="block text-3xl font-bold text-mediarch sm:text-4xl md:text-5xl lg:text-7xl">
              Play the Part.
            </span>
            <span className="mt-2 block text-3xl font-bold bg-gradient-to-r from-mediarch to-mediarch-orange text-transparent bg-clip-text sm:text-4xl md:text-5xl lg:text-7xl" style={{ backgroundSize: "200% 200%" }}>
              Master the Art
            </span>
          </h1>
          
          <p className="mx-auto mt-4 md:mt-6 max-w-2xl text-base md:text-lg text-gray-300 opacity-0 animate-fadeIn" style={{ animationDelay: "600ms" }}>
            Join the next generation of streaming excellence with Mediarch's immersive events, expert-led courses, and personalized mentorship. Elevate your streaming career with cutting-edge resources, 24/7 support, and industry-leading guidance.
          </p>
          
          <div className="mt-8 md:mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 opacity-0 animate-fadeIn" style={{ animationDelay: "900ms" }}>
            <StatsCard 
              icon={<Icons.Server className="h-5 w-5 text-mediarch" />}
              value="100%"
              label="Seamless Backend Support"
            />
            <StatsCard 
              icon={<Icons.Clock className="h-5 w-5 text-mediarch" />}
              value="24/7"
              label="Always Available"
            />
            <StatsCard 
              icon={<Icons.Star className="h-5 w-5 text-mediarch" />}
              value="Pro"
              label="Industry-Leading Guidance"
            />
          </div>
          
          <div className="mt-8 md:mt-10 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 opacity-0 animate-fadeIn" style={{ animationDelay: "1200ms" }}>
            <Link to="/about">
              <Button 
                variant="outline" 
                className="w-full border-mediarch/30 text-white hover:border-mediarch hover:bg-mediarch-dark/10 sm:w-auto"
                size="lg"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsCard({ icon, value, label }: { 
  icon: React.ReactNode; 
  value: string; 
  label: string 
}) {
  return (
    <div className="flex items-center justify-center space-x-3 rounded-lg border border-white/10 bg-mediarch-dark/50 backdrop-blur-sm p-4 transition-all duration-300 hover:border-mediarch/30">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-mediarch/10">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold text-white">{value}</span>
        <span className="text-sm text-gray-400">{label}</span>
      </div>
    </div>
  );
}
