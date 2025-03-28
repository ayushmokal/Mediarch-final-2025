
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Diamond, Star, Gem, Rocket, BadgeDollarSign } from "lucide-react";

type ServiceCardProps = {
  title: string;
  description: string;
  price?: string; // Keep this optional but ensure the component works without it
  icon: "diamond" | "star" | "gem" | "rocket" | "badge";
  variant?: "default" | "gold" | "silver" | "bronze" | "diamond";
  className?: string;
};

const iconComponents = {
  diamond: Diamond,
  star: Star,
  gem: Gem,
  rocket: Rocket,
  badge: BadgeDollarSign,
};

const cardVariants = {
  default: "bg-white/10 border-white/10 hover:bg-white/15",
  bronze: "bg-gradient-to-br from-amber-700/20 to-amber-900/30 border-amber-700/40 hover:border-amber-700/60",
  silver: "bg-gradient-to-br from-slate-400/20 to-slate-600/30 border-slate-400/40 hover:border-slate-400/60",
  gold: "bg-gradient-to-br from-yellow-400/20 to-amber-600/30 border-yellow-400/40 hover:border-yellow-400/60",
  diamond: "bg-gradient-to-br from-blue-400/20 to-purple-600/30 border-blue-400/40 hover:border-blue-400/60",
};

const iconVariants = {
  default: "text-mediarch",
  bronze: "text-amber-700",
  silver: "text-slate-400",
  gold: "text-yellow-400",
  diamond: "text-blue-400",
};

export function ServiceCard({
  title,
  description,
  price,
  icon,
  variant = "default",
  className,
}: ServiceCardProps) {
  const IconComponent = iconComponents[icon];

  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={cn("h-full", className)}
    >
      <Card className={cn(
        "h-full backdrop-blur-md border transition-all duration-300",
        cardVariants[variant]
      )}>
        <CardHeader className="relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <IconComponent 
              className={cn(
                "h-8 w-8", 
                iconVariants[variant]
              )} 
              strokeWidth={1.5} 
            />
          </div>
          <CardTitle className="text-lg md:text-xl text-white">{title}</CardTitle>
          {/* Only render the price if it exists */}
          {price && (
            <CardDescription className="text-white/70 font-medium">
              {price}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="text-gray-300 text-sm">
          <p>{description}</p>
        </CardContent>
        {variant !== "default" && (
          <CardFooter className="pt-2">
            <div className={cn(
              "w-12 h-1 rounded",
              variant === "bronze" && "bg-amber-700",
              variant === "silver" && "bg-slate-400",
              variant === "gold" && "bg-yellow-400",
              variant === "diamond" && "bg-blue-400",
            )} />
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}
