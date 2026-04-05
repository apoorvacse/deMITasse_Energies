import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Linkedin, ArrowUpRight } from "lucide-react";

const team = [
  {
    initials: "VP",
    name: "Vijay Prateik",
    role: "Founder & CEO",
    bio: "Ex-IIT Bombay, MIT. Chief architect of the thermo-chemical engine. Backed by IIM-Bangalore, Tata Trusts, and government partnerships.",
    tags: ["IIT Bombay", "MIT", "Founder"],
  },
  {
    initials: "MR",
    name: "Megha Rawat",
    role: "Former COO, 2021–2023",
    bio: "Focused on operations and sustainability across deMITasse's early growth phase. Entrepreneur in green technology and clean energy transitions.",
    tags: ["Operations", "Sustainability"],
  },
  {
    initials: "HG",
    name: "Harikrishnan G",
    role: "Senior Chemical Engineer",
    bio: "Core technical team member. Leads catalyst research and cycle optimization, supported by IIT Bombay research interns.",
    tags: ["Catalysts", "R&D"],
  },
];

function TeamCard({ member, index, inView }: { member: typeof team[0]; index: number; inView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.15 * index, ease: "easeOut" }}
      className="border border-rule p-8 transition-all duration-300 hover:border-accent group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover accent bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-accent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: "left" }}
      />

      <div className="flex items-start justify-between mb-4">
        <motion.div
          className="w-12 h-12 rounded-full bg-accent-pale flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <span className="font-sans text-sm font-semibold text-accent">{member.initials}</span>
        </motion.div>
        <motion.div
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ArrowUpRight size={16} className="text-accent" />
        </motion.div>
      </div>

      <p className="font-sans text-base font-medium text-foreground">{member.name}</p>
      <p className="font-sans text-[13px] text-ink-muted">{member.role}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {member.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-sans uppercase tracking-[0.08em] px-2 py-0.5 border border-rule text-ink-faint group-hover:border-accent/30 group-hover:text-accent transition-all duration-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="border-t border-rule my-4" />
      <p className="font-sans text-[13px] text-ink-muted leading-[1.7]">{member.bio}</p>
    </motion.div>
  );
}

export default function TeamSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="team" ref={ref} className="bg-surface px-[8vw] py-24 md:py-[100px]">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
      >
        <div>
          <p className="text-[11px] font-sans uppercase tracking-[0.16em] text-accent mb-4">
            Leadership
          </p>
          <h2 className="font-serif text-[32px] md:text-[42px] text-foreground leading-[1.15]">
            Built by researchers. Run by builders.
          </h2>
        </div>
        <p className="text-[13px] text-ink-faint font-sans mt-4 md:mt-0">
          3 leaders · Ghaziabad, India
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {team.map((m, i) => (
          <TeamCard key={m.initials} member={m} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}
