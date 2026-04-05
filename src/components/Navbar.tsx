import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useScrollNav } from "@/hooks/useScrollNav";

const links = [
  { label: "Home", href: "#hero" },
  { label: "Technology", href: "#technology" },
  { label: "Impact", href: "#impact" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const scrolled = useScrollNav();
  const [open, setOpen] = useState(false);

  const handleClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-[400ms]"
      style={{
        backgroundColor: scrolled ? "hsl(var(--bg-dark))" : "transparent",
      }}
    >
      <div className="flex items-center justify-between px-[8vw] h-16">
        <Link to="/" className="flex items-baseline gap-1">
          <span
            className="font-serif italic text-lg"
            style={{ color: scrolled ? "#fff" : "hsl(var(--ink))" }}
          >
            deMITasse
          </span>
          <span
            className="font-sans text-[10px] font-500 uppercase tracking-[0.16em]"
            style={{ color: scrolled ? "rgba(255,255,255,0.6)" : "hsl(var(--ink-muted))" }}
          >
            Energies
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => handleClick(l.href)}
              className="nav-link text-[13px] font-sans font-medium tracking-[0.04em] transition-colors duration-200"
              style={{
                color: scrolled ? "rgba(255,255,255,0.6)" : "hsl(var(--ink-faint))",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = scrolled ? "#fff" : "hsl(var(--ink))";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = scrolled
                  ? "rgba(255,255,255,0.6)"
                  : "hsl(var(--ink-faint))";
              }}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? (
            <X size={18} style={{ color: scrolled ? "#fff" : "hsl(var(--ink))" }} />
          ) : (
            <Menu size={18} style={{ color: scrolled ? "#fff" : "hsl(var(--ink))" }} />
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: open ? "300px" : "0px",
          backgroundColor: scrolled ? "hsl(var(--bg-dark))" : "hsl(var(--bg))",
        }}
      >
        {links.map((l) => (
          <button
            key={l.label}
            onClick={() => handleClick(l.href)}
            className="block w-full text-left px-[8vw] py-3 text-[13px] font-sans border-b border-rule"
            style={{
              color: scrolled ? "rgba(255,255,255,0.6)" : "hsl(var(--ink-muted))",
            }}
          >
            {l.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
