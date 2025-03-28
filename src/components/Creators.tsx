
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Creators() {
  return (
    <section className="relative overflow-hidden bg-mediarch-red py-12 sm:py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-tr from-mediarch-dark via-mediarch-red to-mediarch-red/80"></div>
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 sm:mb-8 text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            FOR CREATORS
          </h2>
          <p className="mb-8 sm:mb-12 text-lg sm:text-xl text-white/80">
            BOOST YOUR CONTENT'S IMPACT
          </p>
          
          <div className="mb-10 sm:mb-16 mx-auto max-w-3xl rounded-xl bg-white/10 p-6 sm:p-8 backdrop-blur-sm">
            <h3 className="mb-2 bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-xl sm:text-2xl font-bold text-transparent">
              Unlock your potential
            </h3>
            <p className="mb-2 text-lg sm:text-xl text-white">
              and join our community of creators
            </p>
            <p className="text-lg sm:text-xl font-semibold text-mediarch">
              making waves in the gaming industry
            </p>
          </div>
          
          <Link to="/about">
            <Button className="bg-white text-mediarch-red hover:bg-white/90 text-sm md:text-base" size="lg">
              Learn More
              <Icons.ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
