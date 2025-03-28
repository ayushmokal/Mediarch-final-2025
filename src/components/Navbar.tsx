
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out",
      scrolled ? "bg-mediarch-dark/95 backdrop-blur-lg py-4" : "bg-transparent py-4 sm:py-6"
    )}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link 
          to="/"
          className="text-2xl sm:text-3xl font-bold text-mediarch transition-all duration-300 hover:text-mediarch/80"
        >
          MEDIARCH
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden sm:block">
          <ul className="flex items-center space-x-1">
            <li>
              <NavLink to="/">HOME</NavLink>
            </li>
            <li>
              <NavLink to="/about">ABOUT</NavLink>
            </li>
            <li>
              <NavLink to="/contact">CONTACT</NavLink>
            </li>
          </ul>
        </nav>
        
        {/* Mobile Navigation */}
        <div className="block sm:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="text-white hover:text-mediarch">
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-mediarch-dark/95 backdrop-blur-lg border-mediarch/20 p-0">
              <div className="flex flex-col h-full justify-center items-center space-y-6 px-4 py-8">
                <MobileNavLink to="/">HOME</MobileNavLink>
                <MobileNavLink to="/about">ABOUT</MobileNavLink>
                <MobileNavLink to="/contact">CONTACT</MobileNavLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function NavLink({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      to={to}
      className={cn(
        "rounded-full border border-mediarch/20 px-6 py-2 font-medium text-white transition-all duration-300 hover:border-mediarch hover:text-mediarch",
        className
      )}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="text-2xl font-medium text-white transition-all duration-300 hover:text-mediarch px-8 py-3 w-full text-center"
    >
      {children}
    </Link>
  );
}
