import React from "react";

interface TextHoverEffectProps {
  text?: string;
  fontSizeClass?: string;
  textColorClass?: string;
  isStandalone?: boolean;
}

export default function TextHoverEffect({
  text = "Hover Me",
  fontSizeClass = "text-6xl",
  textColorClass = "from-black via-slate-700 to-black dark:from-white dark:via-slate-300 dark:to-white",
  isStandalone = true,
}: TextHoverEffectProps) {
  const innerContent = (
    <div
      id="text-shimmer-container"
      className="relative group cursor-pointer select-none px-2 py-1"
      style={{ perspective: 800 }}
    >
      <span
        className={`
          font-bold tracking-tight text-transparent bg-clip-text
          bg-gradient-to-r ${textColorClass}
          transition-all duration-700 ease-out
          inline-block
          ${fontSizeClass}
        `}
      >
        {text}
      </span>
      {/* Shimmer overlay only */}
      <span
        className="pointer-events-none absolute inset-0 rounded bg-gradient-to-r from-black/0 via-black/20 to-black/0 dark:from-white/0 dark:via-white/20 dark:to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer"
        style={{
          mixBlendMode: "overlay",
        }}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 2.2s linear infinite;
        }
      `,
        }}
      />
    </div>
  );

  if (isStandalone) {
    return (
      <div
        id="text-shimmer-standalone"
        className="h-screen w-full flex justify-center items-center bg-gradient-to-br from-white to-slate-200 dark:from-black/90 dark:to-black transition-colors duration-500"
      >
        {innerContent}
      </div>
    );
  }

  return innerContent;
}
