
import { cn } from "@/lib/utils";

export function Stats() {
  return (
    <section className="bg-mediarch-red py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-white sm:text-4xl">OUR IMPACT</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard value="28M" label="Followers" />
          <StatCard value="364M" label="Total Views per Month" />
          <StatCard value="18K" label="Total Hours of Content Created" />
          <StatCard value="170" label="Brand Campaigns Executed" />
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="group flex flex-col items-center justify-center rounded-lg bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
      <span className="block text-center text-4xl font-bold text-white">{value}</span>
      <span className="mt-2 text-center text-sm text-white/70">{label}</span>
    </div>
  );
}
