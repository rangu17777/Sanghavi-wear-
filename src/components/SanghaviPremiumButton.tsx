import React, { useState } from "react";
import { motion } from "framer-motion";

interface PremiumButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary";
  shape?: "gold-capsule" | "arch-de-couture";
  className?: string;
  id?: string;
}

export function SanghaviPremiumButton({
  children,
  onClick,
  href,
  variant = "primary",
  shape = "gold-capsule",
  className = "",
  id,
}: PremiumButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Border and background configurations based on variant
  const isPrimary = variant === "primary";

  // Class names for different shape options
  const shapeClasses =
    shape === "gold-capsule"
      ? "rounded-full shadow-[0_4px_20px_rgba(26,10,16,0.15)] hover:shadow-[0_12px_28px_rgba(212,175,55,0.35)]"
      : "rounded-tl-[24px] rounded-br-[24px] rounded-tr-[5px] rounded-bl-[5px] shadow-[0_5px_15px_rgba(26,10,16,0.10)] hover:shadow-[0_10px_25px_rgba(196,69,105,0.25)]";

  const baseStyles = `
    relative inline-flex items-center justify-center px-8 py-3.5
    font-body font-semibold text-xs md:text-sm tracking-[0.2em] uppercase
    transition-all duration-500 ease-out overflow-hidden cursor-pointer select-none
    ${shapeClasses}
    ${className}
  `;

  // Internal color rules to emulate luxurious zari embroidery fabric
  const themeStyles = isPrimary
    ? {
        background: isHovered ? "#c44569" : "#1a0a10",
        color: "#fdf2f5",
        border: "1px solid " + (isHovered ? "#c44569" : "#d4af37"),
      }
    : {
        background: isHovered ? "rgba(253, 242, 245, 0.15)" : "transparent",
        color: "#fdf2f5",
        border: "1px solid #fdf2f5",
      };

  const content = (
    <>
      {/* Interactive golden thread weaving slide sweep reflection */}
      <span
        className="absolute inset-0 block bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full pointer-events-none"
        style={{
          transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
          transition: "transform 1.0s cubic-bezier(0.19, 1, 0.22, 1)",
        }}
      />

      {/* Floating golden particle sparkles inside the boundary on hover */}
      {isHovered && (
        <span className="absolute inset-x-0 bottom-0 top-0 pointer-events-none overflow-hidden">
          <span className="absolute w-1 h-1 bg-yellow-300 rounded-full bottom-1 left-1/4 animate-sparkle-float opacity-75" />
          <span className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full bottom-2 left-2/3 animate-sparkle-float opacity-50 [animation-delay:0.3s]" />
          <span className="absolute w-1 h-1 bg-white rounded-full top-2 left-1/2 animate-sparkle-float opacity-90 [animation-delay:0.6s]" />
        </span>
      )}

      {/* Actual button text */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
        {shape === "arch-de-couture" && isHovered && (
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "12px", opacity: 1 }}
            className="h-[1px] bg-white inline-block"
          />
        )}
      </span>

      {/* Micro embedded css styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes sparkleFloat {
          0% {
            transform: translateY(15px) scale(0.5);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-25px) scale(0.2);
            opacity: 0;
          }
        }
        .animate-sparkle-float {
          animation: sparkleFloat 1.2s infinite ease-out;
        }
      `,
        }}
      />
    </>
  );

  if (href) {
    const isExternal =
      href.startsWith("http://") || href.startsWith("https://");
    return (
      <a
        id={id || `premium-btn-${variant}-${shape}`}
        href={href}
        className={baseStyles}
        style={themeStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      id={id || `premium-btn-${variant}-${shape}`}
      onClick={onClick}
      className={baseStyles}
      style={themeStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {content}
    </button>
  );
}
