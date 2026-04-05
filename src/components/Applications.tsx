import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Factory, Radio, Shield, Zap } from "lucide-react";

const tiles = [
  {
    icon: Factory,
    title: "Textile Industry",
    desc: "Waste heat recovery, cutting operational energy costs by up to 30%",
    stat: "30%",
    statLabel: "cost reduction",
  },
  {
    icon: Radio,
    title: "Telecom Infrastructure",
    desc: "Reliable off-grid power for towers across India's remote regions",
    stat: "24/7",
    statLabel: "uptime",
  },
  {
    icon: Shield,
    title: "Indian Defense",
    desc: "Mission-critical, emission-free power generation in active collaboration with the Indian military",
    stat: "0",
    statLabel: "emissions",
  },
  {
    icon: Zap,
    title: "Grid-Scale Renewables",
    desc: "Long-duration thermochemical storage enabling full renewable grid integration",
    stat: "18mo",
    statLabel: "storage",
  },
];

function ApplicationTile({ tile, index, inView }: { tile: typeof tiles[0]; index: number; inView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 * index, ease: "easeOut" }}
      className="relative pt-6 group cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated top border */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] bg-accent"
        initial={{ width: "0%" }}
        animate={inView ? { width: isHovered ? "100%" : "40px" } : { width: "0%" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      <div className="flex items-start justify-between mb-3">
        <motion.div
          animate={{ rotate: isHovered ? 10 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <tile.icon size={20} className="text-accent" />
        </motion.div>
        
        {/* Stat badge revealed on hover */}
        <motion.div
          className="text-right"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
          transition={{ duration: 0.25 }}
        >
          <span className="font-serif text-lg text-accent">{tile.stat}</span>
          <p className="text-[9px] font-sans uppercase tracking-[0.1em] text-ink-faint">{tile.statLabel}</p>
        </motion.div>
      </div>

      <p className="font-sans text-sm font-semibold text-foreground mb-1 group-hover:text-accent transition-colors duration-300">
        {tile.title}
      </p>
      <p className="font-sans text-[13px] text-ink-muted leading-[1.6]">{tile.desc}</p>
    </motion.div>
  );
}

export default function Applications() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="impact" ref={ref} className="bg-background px-[8vw] py-24 md:py-[100px]">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <p className="text-[11px] font-sans uppercase tracking-[0.16em] text-accent mb-4">
          Sectors We Serve
        </p>
        <h2 className="font-serif text-[32px] md:text-[42px] text-foreground leading-[1.15] mb-12">
          Energy where it's needed most.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {tiles.map((t, i) => (
          <ApplicationTile key={t.title} tile={t} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}
