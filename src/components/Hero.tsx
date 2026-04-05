import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const childVariant = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease, delay: i * 0.12 } },
});

function AnimatedCycleSVG() {
  const [hovered, setHovered] = useState<number | null>(null);

  const nodes = [
    { cx: 150, cy: 50, label: "Thermal Input", labelX: 150, labelY: 30 },
    { cx: 240, cy: 200, label: "Conversion", labelX: 275, labelY: 205 },
    { cx: 60, cy: 200, label: "Grid Output", labelX: 25, labelY: 205 },
  ];

  return (
    <svg
      viewBox="0 0 300 300"
      className="w-full h-full"
      role="img"
      aria-label="Thermo-chemical cycle diagram showing thermal input, conversion, and grid output"
    >
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10" fill="none" stroke="hsl(var(--ink-faint))" strokeWidth="1.5" />
        </marker>
        <marker id="arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" />
        </marker>
      </defs>

      {/* Animated rotating circle */}
      <circle cx="150" cy="150" r="100" fill="none" stroke="hsl(var(--rule))" strokeWidth="0.5" />
      <motion.circle
        cx="150" cy="150" r="100"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="1.5"
        strokeDasharray="628"
        initial={{ strokeDashoffset: 628 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 2.5, ease: "easeOut", delay: 0.6 }}
      />

      {/* Animated paths */}
      {[
        "M150 50 Q220 50 240 130",
        "M240 200 Q220 270 150 260",
        "M60 200 Q70 110 150 50",
      ].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="hsl(var(--ink-faint))"
          strokeWidth="1"
          markerEnd="url(#arrow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 + i * 0.3, ease: "easeOut" }}
        />
      ))}

      {/* Pulsing energy dot traveling along the cycle */}
      <motion.circle
        r="3"
        fill="hsl(var(--accent))"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2.5 }}
      >
        <animateMotion
          dur="4s"
          repeatCount="indefinite"
          begin="2.5s"
          path="M150,50 Q220,50 240,130 L240,200 Q220,270 150,260 L60,200 Q70,110 150,50"
        />
      </motion.circle>

      {/* Interactive nodes */}
      {nodes.map((node, i) => (
        <g
          key={i}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          className="cursor-pointer"
        >
          <motion.circle
            cx={node.cx}
            cy={node.cy}
            r={hovered === i ? 8 : 5}
            fill={hovered === i ? "hsl(var(--accent))" : "hsl(var(--ink-faint))"}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 1.5 + i * 0.15 }}
            style={{ transition: "r 0.3s ease, fill 0.3s ease" }}
          />
          {hovered === i && (
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r="14"
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="0.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
            />
          )}
          <text
            x={node.labelX}
            y={node.labelY}
            textAnchor="middle"
            className="font-sans text-[10px] select-none"
            fill={hovered === i ? "hsl(var(--accent))" : "hsl(var(--ink-faint))"}
            style={{ transition: "fill 0.3s ease" }}
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function FloatingParticles() {
  const [particles] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 5,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-accent/10"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center px-[8vw] py-24 bg-background overflow-hidden">
      <FloatingParticles />
      
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--ink)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--ink)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <div className="relative flex flex-col lg:flex-row items-center w-full gap-12 lg:gap-0">
        {/* Left */}
        <motion.div className="lg:w-[60%] w-full" initial="initial" animate="animate">
          <motion.p
            variants={childVariant(0)}
            className="text-[11px] font-sans uppercase tracking-[0.16em] text-accent mb-6"
          >
            Zero-Emission Energy Technology
          </motion.p>
          <motion.h1
            variants={childVariant(1)}
            className="font-serif text-[42px] md:text-[68px] leading-[1.1] text-foreground"
          >
            Power the grid.{" "}
            <br className="hidden md:block" />
            Leave <em>nothing</em> behind.
          </motion.h1>
          <motion.p
            variants={childVariant(2)}
            className="text-ink-muted text-lg leading-[1.75] max-w-[520px] mt-6"
          >
            deMITasse Energies builds thermo-chemical engines that generate power and
            store energy at grid scale — with zero emissions, zero combustion, and
            one-tenth the cost of lithium batteries. Founded in Ghaziabad. Backed by
            IIT Bombay, IIM Bangalore, and Tata Trusts.
          </motion.p>
          <motion.div variants={childVariant(3)} className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() => scrollTo("#technology")}
              className="group text-accent font-sans text-[15px] font-medium inline-flex items-center gap-2"
            >
              Explore our technology
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </button>
            <button
              onClick={() => scrollTo("#team")}
              className="text-ink-muted font-sans text-[15px] font-medium hover:text-foreground transition-colors duration-300"
            >
              Meet the team →
            </button>
          </motion.div>
        </motion.div>

        {/* Right */}
        <motion.div
          className="lg:w-[40%] w-full max-w-[380px]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: ease, delay: 0.4 }}
        >
          <div className="border border-rule p-10 aspect-square bg-background/50 backdrop-blur-sm hover:border-accent/30 transition-colors duration-500">
            <AnimatedCycleSVG />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-ink-faint">Scroll</span>
        <motion.div
          className="w-[1px] h-6 bg-ink-faint/50"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
