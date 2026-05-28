import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SanghaviNxLogo() {
  const [isHovered, setIsHovered] = useState(false);
  const [isSplashing, setIsSplashing] = useState(false);
  const splashTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sparkle stars inside the logo lettering
  const [logoSparkles, setLogoSparkles] = useState<
    Array<{
      id: number;
      top: string;
      left: string;
      size: number;
      delay: number;
    }>
  >([]);

  useEffect(() => {
    // Generate a few random logo stars at render time
    const sparkles = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 90 + 5}%`,
      size: Math.random() * 4 + 3, // 3px to 7px star size
      delay: Math.random() * 2,
    }));
    setLogoSparkles(sparkles);
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Trigger screen splash immediately
    setIsSplashing(true);
    if (splashTimeoutRef.current) {
      clearTimeout(splashTimeoutRef.current);
    }
    // Hold the splash for a premium cinematic sweep duration
    splashTimeoutRef.current = setTimeout(() => {
      setIsSplashing(false);
    }, 2800);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Generate a collection of screen-splash particles only when splash starts
  const splashParticles = useMemo(() => {
    if (!isSplashing) return [];
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const count = isMobile ? 22 : 45;

    return Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const distanceVal =
        (isMobile ? 60 : 120) + Math.random() * (isMobile ? 140 : 320);
      return {
        id: i,
        x: Math.cos(angle) * distanceVal,
        y: Math.sin(angle) * distanceVal,
        size: Math.random() * (isMobile ? 4 : 6) + 1.5,
        duration:
          (isMobile ? 1.0 : 1.5) + Math.random() * (isMobile ? 0.8 : 1.2),
        delay: Math.random() * 0.25,
      };
    });
  }, [isSplashing]);

  return (
    <div
      id="brand-logo-container"
      className="relative select-none cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glint & Sparkle Area wrapper */}
      <div className="relative inline-block py-1 pr-4">
        {/* Subtle, soft dynamic background luxury glow behind heading only during hover */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.25 : 0.08,
            scale: isHovered ? 1.15 : 1.0,
          }}
          className="absolute -inset-2 bg-gradient-to-r from-pink-400/20 via-yellow-300/30 to-rose-400/20 rounded-full blur-xl pointer-events-none"
        />

        <div
          className="relative text-[#fdf2f5] font-heading font-bold"
          style={{
            fontSize: "1.55rem",
            letterSpacing: "0.22em",
            textShadow: "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          {/* SANGHAVI letter-by-letter glittering reflection */}
          <span className="relative">
            SANGHAVI
            {/* Real-time shine swipe reflection glint effect */}
            <span className="absolute inset-0 overflow-hidden bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-heading-shine pointer-events-none" />
          </span>{" "}
          <span
            style={{ color: "#f4c2d0" }}
            className="relative font-bold inline-block"
          >
            NX
            {/* Soft pulsing glint dot */}
            <motion.span
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
              className="absolute -top-1 -right-2 w-1.5 h-1.5 rounded-full bg-yellow-300 shadow-[0_0_10px_#f5c542]"
            />
          </span>
        </div>

        {/* Subtitle with premium, wider gold spacing */}
        <div className="text-[9.5px] uppercase tracking-[0.45em] text-[#f4c2d0]/95 font-display italic mt-0.5 ml-0.5">
          complete family store
        </div>

        {/* Persistent, elegant twinkling gold embroidery stars flanking label */}
        {logoSparkles.map((star) => (
          <motion.svg
            key={star.id}
            viewBox="0 0 24 24"
            className="absolute text-yellow-300 pointer-events-none fill-current"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [0.15, 0.9, 0.15],
              scale: [0.6, 1.15, 0.6],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2.2 + star.delay,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          >
            <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
          </motion.svg>
        ))}
      </div>

      {/* FULL-SCREEN ROYAL LUXURY SILK EMBROIDERY SPLASH PORTAL */}
      <AnimatePresence>
        {isSplashing && (
          <motion.div
            id="fullscreen-screen-splash"
            className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 1.0, ease: "easeOut" },
            }}
          >
            {/* Cinematic background vignette blur */}
            <motion.div
              className="absolute inset-0 bg-[#1a0a10]/45 backdrop-blur-[3px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Sweep 1: Royal Crimson Ribbon/Wave */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[180vw] h-[65vh] bg-gradient-to-r from-transparent via-[#78142d]/95 to-transparent blur-[5px]"
              style={{ rotate: -22, originX: 0.5, originY: 0.5 }}
              initial={{ x: "-120vw", scaleY: 0.2 }}
              animate={{ x: "120vw", scaleY: 1.0 }}
              transition={{ duration: 2.2, ease: [0.25, 1, 0.5, 1] }}
            />

            {/* Sweep 2: Bridal Rose-Gold Luxury Silk Swirl */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[200vw] h-[50vh] bg-gradient-to-r from-transparent via-[#f4c2d0]/90 via-[#d4af37]/85 to-transparent opacity-95 blur-[4px]"
              style={{ rotate: 18, originX: 0.5, originY: 0.5 }}
              initial={{ x: "120vw", scaleY: 0.3 }}
              animate={{ x: "-120vw", scaleY: 1.1 }}
              transition={{
                duration: 2.5,
                ease: [0.25, 1, 0.5, 1],
                delay: 0.15,
              }}
            />

            {/* Dynamic centered popping logo text that occurs in sync with the sweep */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-50 px-4">
              <motion.div
                initial={{ scale: 0.45, opacity: 0, y: 35 }}
                animate={{
                  scale: [0.45, 1.12, 1.0, 1.0, 0.85, 0.4],
                  opacity: [0, 1, 1, 1, 0.25, 0],
                  y: [35, 0, 0, 0, -15, -45],
                  filter: [
                    "brightness(1) blur(2px)",
                    "brightness(1.6) blur(0px)",
                    "brightness(1.5) blur(0px)",
                    "brightness(1.4) blur(0px)",
                    "brightness(1) blur(1px)",
                    "brightness(0.5) blur(4px)",
                  ],
                }}
                transition={{
                  duration: 1.9,
                  times: [0, 0.2, 0.4, 0.75, 0.9, 1],
                  ease: "easeOut",
                  delay: 0.1,
                }}
                className="text-center"
              >
                {/* Bright white and pink gold double-shadowed glorious lettering */}
                <h1
                  className="font-heading font-extrabold text-[#fdf2f5] tracking-[0.25em] select-none text-5xl md:text-8xl"
                  style={{
                    textShadow:
                      "0 0 20px rgba(255,255,255,0.95), 0 0 45px rgba(244,194,208,0.8), 0 0 80px rgba(212,175,55,0.6)",
                  }}
                >
                  SANGHAVI <span className="text-[#f4c2d0]">NX</span>
                </h1>
                <p
                  className="text-yellow-300 text-xs md:text-lg tracking-[0.55em] uppercase font-display italic mt-4 select-none font-bold"
                  style={{
                    textShadow: "0 0 15px rgba(212,175,55,0.9)",
                  }}
                >
                  complete family store
                </p>
              </motion.div>
            </div>

            {/* Central explosion sparkle array */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {splashParticles.map((part) => (
                <motion.div
                  key={part.id}
                  className="absolute rounded-full"
                  style={{
                    width: part.size,
                    height: part.size,
                    background: part.id % 2 === 0 ? "#d4af37" : "#fdf2f5",
                    boxShadow: "0 0 12px #d4af37",
                  }}
                  initial={{ x: 0, y: 0, scale: 0.1, opacity: 0 }}
                  animate={{
                    x: part.x,
                    y: part.y,
                    scale: [1.5, 1, 0],
                    opacity: [0, 0.9, 0.8, 0],
                  }}
                  transition={{
                    duration: part.duration,
                    delay: part.delay,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>

            {/* Sparkle lines tracing across the screen */}
            <svg className="absolute inset-0 w-full h-full">
              <motion.path
                d="M -100 200 Q 300 500, 800 100 T 2000 600"
                fill="none"
                stroke="#d4af37"
                strokeWidth="2"
                strokeDasharray="8, 12"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.8, 0.8, 0] }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
              <motion.path
                d="M -100 800 Q 500 300, 1200 700 T 2000 200"
                fill="none"
                stroke="#f4c2d0"
                strokeWidth="1.5"
                strokeDasharray="6, 15"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.8, 0.8, 0] }}
                transition={{ duration: 2.1, ease: "easeInOut", delay: 0.2 }}
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes heading-shine {
          0% {
            transform: translateX(-100%);
          }
          15% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-heading-shine {
          animation: heading-shine 5.5s infinite ease-in-out;
        }
      `,
        }}
      />
    </div>
  );
}
