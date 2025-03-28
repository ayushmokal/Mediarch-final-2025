
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";

export function About() {
  return (
    <section id="about" className="relative py-12 md:py-16 lg:py-32">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video 
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://videos.pexels.com/video-files/2930943/2930943-hd_1920_1080_25fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-mediarch-dark/60"></div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Image on the left - takes 4 columns on medium screens and above */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="rounded-lg overflow-hidden shadow-xl border-2 border-mediarch/20">
              <img 
                src="https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Streaming setup" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          
          {/* Content shifted to the right - takes 8 columns on medium screens and above */}
          <div className="md:col-span-7 lg:col-span-8">
            <div className="mb-6 text-center md:text-left">
              <h2 className="mb-4 text-3xl font-bold text-mediarch md:text-4xl">
                About Mediarch
              </h2>
              <p className="text-lg text-gray-300">
                At Mediarch, we're redefining the streaming landscape by combining expert mentorship, 24/7 support, and immersive events. Our platform bridges the gap between aspiring creators and professional streamers, empowering them with the skills and tools to succeed. 🚀
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              <FeatureCard 
                icon={<Icons.User />}
                title="Personalized Mentorship" 
              />
              <FeatureCard 
                icon={<Icons.Shapes />}
                title="Custom Branding & Merchandising" 
              />
              <FeatureCard 
                icon={<Icons.Community />}
                title="Community Support" 
              />
              <FeatureCard 
                icon={<Icons.Target />}
                title="Skill Development" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ 
  icon, 
  title 
}: { 
  icon: React.ReactNode; 
  title: string;
}) {
  return (
    <div className="group flex items-center space-x-3 rounded-lg border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-mediarch/30 hover:bg-white/10">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-mediarch/10 text-mediarch transition-all duration-300 group-hover:bg-mediarch/20">
        {icon}
      </div>
      <h3 className="font-medium text-white">{title}</h3>
    </div>
  );
}
