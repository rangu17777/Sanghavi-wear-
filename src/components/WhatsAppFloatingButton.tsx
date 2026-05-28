import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppFloatingButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Monitor scroll height to show button after passing the primary hero block
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 220) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappNumber = "918432143431";
  const defaultText = encodeURIComponent(
    "Hello Sanghavi NX, I would like to make an enquiry about your premium collections.",
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultText}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 pointer-events-auto"
        >
          {/* Elegant Floating Tooltip Indicator */}
          <AnimatePresence>
            {isHovered && (
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="hidden md:flex items-center bg-[#1a0a10] text-[#fdf2f5] px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase border border-[#d4af37]/30 shadow-xl"
              >
                Let's Chat on WhatsApp
              </motion.a>
            )}
          </AnimatePresence>

          {/* Core Floating Button Sphere representing premium bridal gold + WA Green */}
          <motion.a
            id="floating-whatsapp-trigger"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="relative flex items-center justify-center text-white bg-[#25D366] rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.35)] hover:shadow-[0_15px_35px_rgba(37,211,102,0.5)] border-2 border-white/90 p-3.5 md:p-4 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 overflow-hidden"
            style={{
              width: "min(60px, 14vw)",
              height: "min(60px, 14vw)",
              minWidth: 48,
              minHeight: 48,
            }}
            aria-label="Direct Enquiry on WhatsApp"
          >
            {/* Glowing ripple background rings */}
            <span className="absolute inset-0 rounded-full bg-ping-wave animate-ping duration-3000 opacity-20 pointer-events-none" />

            <MessageCircle className="w-6 h-6 md:w-7 md:h-7 drop-shadow-md stroke-[2]" />

            {/* Premium Golden Corner Zari Accent */}
            <div className="absolute right-0 top-0 w-3 h-3 bg-gradient-to-br from-[#d4af37] to-[#aa7c11] rotate-45 transform translate-x-1.5 -translate-y-1.5 origin-center border border-white" />
          </motion.a>

          <style
            dangerouslySetInnerHTML={{
              __html: `
              @keyframes pingWave {
                0% { transform: scale(1); opacity: 0.4; }
                100% { transform: scale(1.6); opacity: 0; }
              }
              .bg-ping-wave {
                animation: pingWave 2.2s infinite ease-out;
                border: 2px solid #25D366;
              }
            `,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
