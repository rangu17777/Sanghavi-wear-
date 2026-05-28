import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: unknown[]) {
  return twMerge(clsx(inputs));
}

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

const movingMap: Record<Direction, string> = {
  TOP: "radial-gradient(20.7% 50% at 50% 0%, rgb(244, 194, 208) 0%, rgba(244, 194, 208, 0) 100%)",
  LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, rgb(212, 175, 55) 0%, rgba(212, 175, 55, 0) 100%)",
  BOTTOM:
    "radial-gradient(20.7% 50% at 50% 100%, rgb(244, 194, 208) 0%, rgba(244, 194, 208, 0) 100%)",
  RIGHT:
    "radial-gradient(16.2% 41.2% at 100% 50%, rgb(212, 175, 55) 0%, rgba(212, 175, 55, 0) 100%)",
};

const highlight =
  "radial-gradient(75% 181.16% at 50% 50%, #c44569 0%, rgba(212, 175, 55, 0.4) 50%, rgba(255, 255, 255, 0) 100%)";

export default function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Element = "button",
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("BOTTOM");
  const elementRef = React.useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Check if touch-enabled or mobile-sized screen to bypass loop rotations on idle state
    const isTouchOnly =
      window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;

    if (isTouchOnly) {
      return;
    }

    const rotateDirection = (currentDirection: Direction): Direction => {
      const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
      const currentIndex = directions.indexOf(currentDirection);
      const nextIndex = clockwise
        ? (currentIndex - 1 + directions.length) % directions.length
        : (currentIndex + 1) % directions.length;
      return directions[nextIndex];
    };

    const element = elementRef.current;
    if (!element) return;

    let intervalId: NodeJS.Timeout | undefined;
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !hovered && !intervalId) {
          intervalId = setInterval(() => {
            setDirection((prevState) => rotateDirection(prevState));
          }, duration * 1000);
        } else if (!isVisible && intervalId) {
          clearInterval(intervalId);
          intervalId = undefined;
        }
      },
      { threshold: 0.01 },
    );

    observer.observe(element);

    if (!hovered && isVisible) {
      intervalId = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      observer.disconnect();
    };
  }, [hovered, duration, clockwise]);

  return (
    <Element
      ref={elementRef as React.Ref<HTMLButtonElement>}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex h-full w-full flex-col flex-nowrap content-center items-center justify-center gap-10 overflow-visible rounded-none border border-transparent bg-transparent p-px box-decoration-clone transition duration-500",
        containerClassName,
      )}
      {...props}
    >
      <div
        className={cn(
          "z-10 w-full h-full rounded-[inherit] bg-[#1a0a10] px-4 py-12 flex items-center justify-center text-[#fdf2f5] transition-colors duration-500",
          className,
        )}
      >
        {children}
      </div>
      <motion.div
        className={cn(
          "absolute inset-0 z-0 flex-none overflow-hidden rounded-[inherit]",
        )}
        style={{
          filter: "blur(2px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration ?? 1 }}
      />
      <div className="absolute inset-0.5 z-1 flex-none rounded-[inherit] bg-[#1a0a10]" />
    </Element>
  );
}
