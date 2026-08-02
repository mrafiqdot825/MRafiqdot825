import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ICON_CLASS } from "@/lib/constants";
import { useGlassCursor } from "@/hooks/useGlassCursor";
import {
  AppleHome,
  AppleUser,
  AppleBriefcase,
  AppleLayers,
  AppleBook,
  AppleTerminal,
  AppleMessage,
} from "@/components/ui/AppleIcons";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "#home", icon: AppleHome },
  { label: "About", href: "#about", icon: AppleUser },
  { label: "Experience", href: "#experience", icon: AppleBriefcase },
  {
    label: "Projects",
    href: "#projects",
    icon: AppleLayers,
  },
  { label: "Prompts", href: "/prompts", icon: AppleTerminal },
  { label: "Blog", href: "/blog", icon: AppleBook },
];

const Navbar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [activeHref, setActiveHref] = useState<string>("");
  const glassRef = useGlassCursor<HTMLElement>();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const [tooltipX, setTooltipX] = useState<number>(0);
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!isHomePage) {
      if (pathname.startsWith("/blog")) {
        setActiveHref("/blog");
      } else if (pathname.startsWith("/services")) {
        setActiveHref("/services");
      } else if (pathname.startsWith("/prompts")) {
        setActiveHref("/prompts");
      } else {
        setActiveHref("");
      }
      return;
    }

    const sections = NAV_ITEMS.filter((item) => item.href.startsWith("#") && item.href !== "#home")
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((section): section is HTMLElement => section !== null);

    const updateActiveSection = () => {
      if (window.scrollY < 150) {
        setActiveHref("#home");
        return;
      }

      if (!sections.length) {
        return;
      }

      const triggerLine = window.scrollY + window.innerHeight * 0.35;
      let current = sections[0];

      for (const section of sections) {
        if (section.offsetTop <= triggerLine) {
          current = section;
        }
      }

      setActiveHref(`#${current.id}`);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [isHomePage, pathname]);

  const getHref = (href: string) => {
    if (href.startsWith("/")) {
      return href;
    }
    return isHomePage ? href : `/${href}`;
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href === "#home") {
      if (isHomePage) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        setActiveHref("#home");
      }
    }
  };

  return (
    <header className="fixed inset-x-0 bottom-4 z-50 px-4 transition-all duration-300 translate-y-0 opacity-100">
      <nav
        ref={glassRef}
        className="relative mx-auto flex w-full max-w-4xl items-center justify-between rounded-full px-3.5 sm:px-4 py-2 transition-all duration-300 liquid-glass-nav focus-within:ring-2 focus-within:ring-accent-100"
        aria-label="Main navigation"
      >
        <div className="liquid-glass-cursor-glow" aria-hidden="true" />

        {/* Left: Brand / Logo */}
        <div className="flex items-center justify-start md:flex-1">
          <a
            href={isHomePage ? "#home" : "/"}
            onClick={(e) => handleNavClick(e, "#home")}
            className="relative inline-flex items-center gap-1.5 sm:gap-2 rounded-full p-1 sm:pr-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-600"
            aria-label="Go to home"
          >

            <span className="hidden sm:inline text-base font-bold tracking-tight text-text-primary font-heading">
              mrafiqdot825
            </span>
          </a>
        </div>

        {/* Center: Nav Items */}
        <div className="flex items-center justify-center">
          <ul
            ref={ulRef}
            onMouseLeave={() => {
              setHoveredIndex(null);
              setDirection(0);
            }}
            className="relative flex items-center gap-1 md:gap-2"
          >
            <li className="pointer-events-none absolute top-0 left-0 z-30">
              <AnimatePresence>
                {hoveredIndex !== null && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.92, y: 12 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: -54,
                      x: tooltipX,
                    }}
                    exit={{ opacity: 0, scale: 0.92, y: 12 }}
                    transition={{ type: "spring", stiffness: 120, damping: 18 }}
                    className="absolute top-0 left-0 pointer-events-none z-30"
                  >
                    <div
                      className={cn(
                        "-translate-x-1/2 px-5 py-2 rounded-lg",
                        "bg-text-primary text-offwhite",
                        "shadow-md flex items-center justify-center",
                        "border border-text-primary",
                        "min-w-25",
                      )}
                    >
                      <div className="relative h-4 flex items-center justify-center overflow-hidden w-full">
                        <AnimatePresence mode="popLayout" custom={direction}>
                          <motion.span
                            key={NAV_ITEMS[hoveredIndex].label}
                            custom={direction}
                            initial={{
                              x: direction > 0 ? 35 : -35,
                              opacity: 0,
                              filter: "blur(6px)",
                            }}
                            animate={{
                              x: 0,
                              opacity: 1,
                              filter: "blur(0px)",
                            }}
                            exit={{
                              x: direction > 0 ? -35 : 35,
                              opacity: 0,
                              filter: "blur(6px)",
                            }}
                            transition={{
                              duration: 0.3,
                              ease: "easeOut",
                            }}
                            className="text-sm font-medium tracking-wide whitespace-nowrap text-current"
                          >
                            {NAV_ITEMS[hoveredIndex].label}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {NAV_ITEMS.map((item, index) => {
              const IconComponent = item.icon;
              const itemHref = getHref(item.href);
              const isItemHovered = hoveredIndex === index;

              const handleMouseEnter = (
                e: React.MouseEvent<HTMLAnchorElement>,
              ) => {
                if (hoveredIndex !== null && index !== hoveredIndex) {
                  setDirection(index > hoveredIndex ? 1 : -1);
                }
                setHoveredIndex(index);

                const target = e.currentTarget;
                const container = ulRef.current;
                if (container) {
                  const targetRect = target.getBoundingClientRect();
                  const containerRect = container.getBoundingClientRect();
                  const x =
                    targetRect.left - containerRect.left + targetRect.width / 2;
                  setTooltipX(x);
                }
              };

              return (
                <li key={item.href}>
                  <a
                    href={itemHref}
                    onClick={(e) => handleNavClick(e, item.href)}
                    onMouseEnter={handleMouseEnter}
                    aria-label={item.label}
                    aria-current={activeHref === item.href ? "page" : undefined}
                    className={`inline-flex items-center justify-center rounded-full p-2.5 md:px-5 md:py-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-600 focus:ring-offset-2 ${activeHref === item.href
                      ? "liquid-glass-active-item text-text-primary font-bold shadow-sm"
                      : "text-text-primary font-medium hover:bg-rose/15 hover:text-(--color-rose-deep)"
                      }`}
                  >
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        scale: isItemHovered ? 1.15 : 1,
                        y: isItemHovered ? -3 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 24 }}
                      className="flex items-center justify-center w-5.5 h-5.5"
                    >
                      <IconComponent className={ICON_CLASS.nav} />
                    </motion.div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right: CTA Button */}
        <div className="hidden items-center justify-end md:flex md:flex-1">
          <a
            href={isHomePage ? "#contact" : "/#contact"}
            className="relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-accent-600 focus:ring-offset-2 liquid-glass-accent-button text-text-primary"
          >
            <AppleMessage className={ICON_CLASS.action} />
            Let's Talk
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
