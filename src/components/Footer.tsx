import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const navLinks = ["Home", "Technology", "Impact", "Team", "Contact"];

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const scrollTo = (label: string) => {
    const map: Record<string, string> = {
      Home: "#hero",
      Technology: "#technology",
      Impact: "#impact",
      Team: "#team",
      Contact: "#contact",
    };
    document.querySelector(map[label] || "#hero")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="contact" ref={ref} className="bg-dark px-[8vw] pt-20 pb-10 relative overflow-hidden">
      {/* Subtle top accent */}
      <motion.div
        className="absolute top-0 left-[8vw] right-[8vw] h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--accent) / 0.3), transparent)' }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        {/* Col 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-baseline gap-1 mb-3">
            <span className="font-serif italic text-lg text-white">deMITasse</span>
            <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-white/60">
              Energies
            </span>
          </div>
          <p className="font-sans text-[13px] text-white/[0.45] leading-[2]">
            Zero-emission power. Grid-scale storage. Built in India.
          </p>
        </motion.div>

        {/* Col 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <p className="font-sans text-[13px] uppercase tracking-[0.1em] text-white/[0.45] mb-4">
            Navigate
          </p>
          {navLinks.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="block font-sans text-[13px] text-white/60 hover:text-white hover:translate-x-1 transition-all duration-200 leading-[2]"
            >
              {l}
            </button>
          ))}
        </motion.div>

        {/* Col 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <p className="font-sans text-[13px] uppercase tracking-[0.1em] text-white/[0.45] mb-4">
            Contact
          </p>
          <p className="font-sans text-[13px] text-white/60 leading-[2]">
            📍 A-60, Jeevan Vihar, Shastri Nagar,
            <br />
            Ghaziabad, UP 201002
          </p>
          <p className="font-sans text-[13px] text-white/60 leading-[2]">
            🔗{" "}
            <a
              href="https://www.linkedin.com/company/demitasse-energies"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              LinkedIn: deMITasse Energies
            </a>
          </p>
          <p className="font-sans text-[13px] text-white/60 leading-[2]">
            🌐{" "}
            <a
              href="https://demitasse.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              demitasse.tech
            </a>
          </p>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between">
        <p className="font-sans text-[12px] text-white/[0.3]">
          © 2024 deMITasse Energies Private Limited
        </p>
        <p className="font-sans text-[12px] text-white/[0.3]">Ghaziabad, India</p>
      </div>
    </footer>
  );
}
