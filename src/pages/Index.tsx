import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import ContentBlock from "@/components/ContentBlock";
import TeamSection from "@/components/TeamSection";
import Applications from "@/components/Applications";
import Footer from "@/components/Footer";
import { Flame, Settings, Zap, Leaf } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

function AnimatedBar({ width, color, delay }: { width: string; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="h-3 rounded-none overflow-hidden" style={{ backgroundColor: 'hsl(var(--rule) / 0.3)' }}>
      <motion.div
        className="h-full"
        style={{ backgroundColor: color }}
        initial={{ width: "0%" }}
        animate={inView ? { width } : {}}
        transition={{ duration: 1.2, delay, ease: "easeOut" }}
      />
    </div>
  );
}

function EfficiencyCard() {
  return (
    <div className="border border-rule bg-background p-10 hover:border-accent/30 transition-colors duration-500">
      <div className="space-y-6">
        <div>
          <p className="font-sans text-[13px] text-ink-muted mb-2">Conventional Plant</p>
          <AnimatedBar width="40%" color="hsl(var(--rule))" delay={0.2} />
          <p className="font-sans text-[11px] text-ink-faint mt-1">40% useful output</p>
        </div>
        <div>
          <p className="font-sans text-[13px] text-ink-muted mb-2">deMITasse Engine</p>
          <AnimatedBar width="78%" color="hsl(var(--accent))" delay={0.5} />
          <p className="font-sans text-[11px] text-ink-faint mt-1">75–80% useful output</p>
        </div>
      </div>
      <p className="font-sans text-[12px] text-ink-faint mt-8">Comparative round-trip efficiency</p>
    </div>
  );
}

const techTiles = [
  { icon: Flame, label: "Thermal Input", desc: "Solar, geothermal, waste heat, exhaust" },
  { icon: Settings, label: "Proprietary Catalyst", desc: "Engineered fluids, no combustion" },
  { icon: Zap, label: "Grid-Scale Output", desc: "Dispatchable, reliable, always-on" },
  { icon: Leaf, label: "Zero Emissions", desc: "No CO₂, no particulates, no byproducts" },
];

function TechCard() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="border border-rule bg-background p-6 grid grid-cols-2 gap-0 hover:border-accent/30 transition-colors duration-500">
      {techTiles.map((t, i) => (
        <motion.div
          key={t.label}
          className="border-t border-rule pt-4 pb-4 pr-4 cursor-default"
          onHoverStart={() => setHoveredIndex(i)}
          onHoverEnd={() => setHoveredIndex(null)}
          animate={{
            backgroundColor: hoveredIndex === i ? 'hsl(var(--accent-pale))' : 'transparent',
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ rotate: hoveredIndex === i ? 15 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <t.icon size={16} className="text-accent mb-2" />
          </motion.div>
          <p className="font-sans text-[13px] uppercase tracking-[0.08em] font-semibold text-foreground mb-1">
            {t.label}
          </p>
          <p className="font-sans text-[12px] text-ink-muted">{t.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default function Index() {
  return (
    <main>
      <Navbar />
      <Hero />
      <StatsStrip />

      <ContentBlock
        id="problem"
        overline="The Problem"
        heading="The world wastes more energy than it uses."
        side="left"
        bgClass="bg-surface"
        card={<EfficiencyCard />}
      >
        <p>
          Conventional thermal power plants lose up to 60% of input energy as exhaust heat.
          Lithium-ion batteries degrade, require rare earth imports, and can hold energy for
          hours — not weeks or months.
        </p>
        <p>
          We built deMITasse's engine to address both failures simultaneously. Our closed-loop,
          non-combusting thermo-chemical cycle captures energy from solar thermal, geothermal,
          and industrial waste heat — converting it into reliable, dispatchable power at a
          fraction of today's cost.
        </p>
        <p className="font-medium text-foreground">No combustion. No rare earths. No carbon.</p>
        <div className="space-y-3 mt-4 border-t border-rule pt-4">
          <p className="text-[13px]">─── Validated at 70% efficiency in IIT Bombay lab demonstrations</p>
          <p className="text-[13px]">─── 25–30% efficiency gain over existing power cycles</p>
          <p className="text-[13px]">─── Reuses standard industrial components — no bespoke manufacturing</p>
        </div>
      </ContentBlock>

      <ContentBlock
        id="technology"
        overline="The Technology"
        heading="A closed loop that never burns."
        side="right"
        bgClass="bg-background"
        card={<TechCard />}
      >
        <p>
          Our engine uses a proprietary thermochemical cycle — a sequence of reactions driven
          by heat, not fire. Specially engineered catalysts and working fluids extract maximum
          useful energy from any thermal source, storing it chemically for 18 months or more
          with negligible losses.
        </p>
        <p>
          The result: grid-scale energy storage at one-tenth the cost of lithium-ion, with no
          degradation, no rare earth dependency, and no emissions at any stage of the cycle.
        </p>
        <p className="font-medium text-foreground">
          This is not a battery. It is an entirely new class of energy system.
        </p>
      </ContentBlock>

      <TeamSection />
      <Applications />
      <Footer />
    </main>
  );
}
