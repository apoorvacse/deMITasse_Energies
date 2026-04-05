import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface ContentBlockProps {
  id?: string;
  overline: string;
  heading: string;
  children: ReactNode;
  card: ReactNode;
  side: "left" | "right";
  bgClass?: string;
}

export default function ContentBlock({
  id,
  overline,
  heading,
  children,
  card,
  side,
  bgClass = "bg-surface",
}: ContentBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const textBlock = (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -32 : 32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="w-full lg:w-[55%]"
    >
      <p className="text-[11px] font-sans uppercase tracking-[0.16em] text-accent mb-4">
        {overline}
      </p>
      <h2 className="font-serif text-[32px] md:text-[42px] text-foreground leading-[1.15] mb-6">
        {heading}
      </h2>
      <div className="text-ink-muted text-base leading-[1.75] space-y-4">{children}</div>
    </motion.div>
  );

  const cardBlock = (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? 32 : -32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
      className="w-full lg:w-[45%]"
    >
      {card}
    </motion.div>
  );

  return (
    <section id={id} ref={ref} className={`${bgClass} px-[8vw] py-24 md:py-[120px]`}>
      <div
        className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-start ${
          side === "right" ? "lg:flex-row-reverse" : ""
        }`}
      >
        {textBlock}
        {cardBlock}
      </div>
    </section>
  );
}
