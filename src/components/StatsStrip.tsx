import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

interface StatProps {
  end: number;
  suffix: string;
  label: string;
  index: number;
}

function Stat({ end, suffix, label, index }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const value = useCountUp(end, 1800, inView);

  return (
    <motion.div
      ref={ref}
      className="text-center py-8 group relative"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
    >
      {/* Accent line on top */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] bg-accent"
        initial={{ width: 0 }}
        animate={inView ? { width: 40 } : {}}
        transition={{ duration: 0.8, delay: 0.3 + index * 0.15, ease: "easeOut" }}
      />
      <p className="font-serif text-[40px] md:text-[52px] text-white tabular-nums">
        {value}{suffix}
      </p>
      <p className="font-sans text-[13px] uppercase tracking-[0.1em] text-white/[0.45] mt-2">
        {label}
      </p>
      {/* Subtle hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, hsl(var(--accent) / 0.05) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  );
}

export default function StatsStrip() {
  return (
    <section className="bg-dark px-[8vw] py-16 relative overflow-hidden">
      {/* Subtle animated background line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--accent) / 0.3), transparent)' }}
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.1]">
        <Stat end={80} suffix="%" label="Round-trip efficiency" index={0} />
        <Stat end={18} suffix=" mo+" label="Energy storage duration" index={1} />
        <Stat end={10} suffix="× lower" label="Cost vs lithium batteries" index={2} />
      </div>
    </section>
  );
}
