
import React from "react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const teamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    designation: "CEO & Founder",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Sarah Miller",
    designation: "Creative Director",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Michael Chen",
    designation: "Head of Marketing",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

export function Team() {
  return (
    <section className="bg-mediarch-dark py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-mediarch sm:text-4xl">OUR TEAM</h2>
        <div className="flex flex-col items-center justify-center">
          <p className="text-white/80 text-center max-w-3xl mb-10">
            Our talented team combines streaming expertise with technical innovation, 
            helping content creators build engaging live experiences that captivate audiences 
            and grow their communities.
          </p>
          <AnimatedTooltip items={teamMembers} className="gap-8" />
        </div>
      </div>
    </section>
  );
}
