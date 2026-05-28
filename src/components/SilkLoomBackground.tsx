import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SilkLoomBackgroundProps {
  intensity?: number; // 0 to 1
  density?: number; // 1 to 10
  colorTheme?:
    | "gold-crimson"
    | "gold-rose"
    | "dark-luxury"
    | "gold-emerald"
    | "royal-blue"
    | "magenta-grape"
    | "champagne-gold";
  className?: string;
  isInteractive?: boolean;
  transparentBg?: boolean;
}

export function SilkLoomBackground({
  intensity = 1.0,
  density = 5,
  colorTheme = "gold-crimson",
  className = "",
  isInteractive = true,
  transparentBg = false,
}: SilkLoomBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    active: false,
  });

  // Access viewport scrolling for dynamic parallex and weaving drift
  const { scrollY } = useScroll();
  const scrollOffset = useTransform(scrollY, [0, 1000], [0, 150]);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const unsubscribe = scrollOffset.on("change", (latest) => {
      lastScrollY.current = latest;
    });
    return () => unsubscribe();
  }, [scrollOffset]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use IntersectionObserver to halt calculations and rendering if canvas is out of view
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.01 },
    );
    observer.observe(canvas);

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Dynamic style definitions based on chosen color theme
    const colors = {
      gold: "rgba(212, 175, 55, rgbVal)",
      crimson: "rgba(196, 69, 105, rgbVal)",
      pink: "rgba(244, 194, 208, rgbVal)",
      ink: "rgba(26, 10, 16, rgbVal)",
    };

    // Responsive budget configurations
    const isMobileDevice = window.innerWidth < 768;
    const activeDensity = isMobileDevice ? Math.min(density, 3) : density;
    const activeSparkleCount = isMobileDevice
      ? Math.min(20, Math.floor(40 * intensity))
      : Math.floor(60 * intensity);

    // Particles representing premium Zari/Brocade gold sparkles
    interface Sparkle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      alpha: number;
      phase: number;
      color: string;
      threadId?: number;
    }

    const sparkles: Sparkle[] = [];

    for (let i = 0; i < activeSparkleCount; i++) {
      sparkles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (isMobileDevice ? 1.5 : 2) + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.3 - 0.1,
        alpha: Math.random() * 0.6 + 0.2,
        phase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.3 ? "gold" : "crimson",
        threadId: Math.floor(Math.random() * activeDensity),
      });
    }

    // Threads definition (the physical simulation curves)
    interface SilkThread {
      id: number;
      baseY: number;
      amplitude: number;
      frequency: number;
      speed: number;
      phase: number;
      thickness: number;
      color: string;
      direction: "horizontal" | "vertical";
    }

    const getThemeColors = (theme: string): { main: string; alt: string } => {
      switch (theme) {
        case "gold-crimson":
          return { main: "crimson", alt: "gold" };
        case "gold-emerald":
          return { main: "emerald", alt: "gold" };
        case "royal-blue":
          return { main: "blue", alt: "gold" };
        case "magenta-grape":
          return { main: "magenta", alt: "gold" };
        case "champagne-gold":
          return { main: "champagne", alt: "gold" };
        case "gold-rose":
          return { main: "pink", alt: "gold" };
        case "dark-luxury":
          return { main: "charcoal", alt: "gold" };
        default:
          return { main: "crimson", alt: "gold" };
      }
    };

    const palette = getThemeColors(colorTheme || "gold-crimson");
    const threads: SilkThread[] = [];

    // Horizontal silk folds (warp threads)
    for (let i = 0; i < activeDensity; i++) {
      threads.push({
        id: i,
        baseY: (height / (activeDensity + 1)) * (i + 1),
        amplitude:
          (isMobileDevice ? 15 : 25) +
          Math.random() * (isMobileDevice ? 20 : 35),
        frequency: 0.0012 + Math.random() * 0.0015,
        speed: 0.001 + Math.random() * 0.0015,
        phase: (i * Math.PI) / 3,
        thickness: Math.random() * 1.5 + 0.5,
        color: i % 2 === 0 ? palette.alt : palette.main,
        direction: "horizontal",
      });
    }

    // Elegant curving weft vertical or diagonal folds
    const verticalDensity = isMobileDevice
      ? 1
      : Math.max(2, Math.floor(activeDensity / 2));
    for (let i = 0; i < verticalDensity; i++) {
      threads.push({
        id: activeDensity + i,
        baseY: (width / (verticalDensity + 1)) * (i + 1), // x-coordinate instead
        amplitude:
          (isMobileDevice ? 15 : 30) +
          Math.random() * (isMobileDevice ? 20 : 40),
        frequency: 0.001 + Math.random() * 0.001,
        speed: 0.0008 + Math.random() * 0.001,
        phase: (i * Math.PI) / 2 + Math.PI / 4,
        thickness: Math.random() * 1.2 + 0.4,
        color: i % 2 === 0 ? palette.main : palette.alt,
        direction: "vertical",
      });
    }

    let time = 0;

    // Render loop
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      ctx.clearRect(0, 0, width, height);

      if (!transparentBg) {
        // Create subtle luxury metallic / fabric satin background gradients
        const bgGrad = ctx.createLinearGradient(0, 0, width, height);
        bgGrad.addColorStop(0, "rgba(26, 10, 16, 0.95)");
        bgGrad.addColorStop(0.5, "rgba(42, 14, 24, 0.96)");
        bgGrad.addColorStop(1, "rgba(22, 8, 14, 0.98)");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Dappled fabric light (light reflection shifting in 3D space)
      const sheenX = width / 2 + Math.sin(time * 0.01) * (width * 0.2);
      const sheenY = height / 2 + Math.cos(time * 0.008) * (height * 0.2);
      const lightRadial = ctx.createRadialGradient(
        sheenX,
        sheenY,
        50,
        sheenX,
        sheenY,
        width * 0.65,
      );
      lightRadial.addColorStop(0, "rgba(244, 194, 208, 0.035)");
      lightRadial.addColorStop(0.5, "rgba(196, 69, 105, 0.015)");
      lightRadial.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = lightRadial;
      ctx.fillRect(0, 0, width, height);

      // Interpolate mouse coordinates smoothly (spring inertia)
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      time += 0.45;

      // Draw the deep weave background matrix (ultra-fine parallel lines)
      ctx.strokeStyle = "rgba(244, 194, 208, 0.02)";
      ctx.lineWidth = 0.5;
      const weaveSpacing = 16;
      ctx.beginPath();
      for (let x = 0; x < width; x += weaveSpacing) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x + height * 0.1, height);
      }
      for (let y = 0; y < height; y += weaveSpacing) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y + width * 0.05);
      }
      ctx.stroke();

      // Render Silk folds (bezier threads)
      threads.forEach((thread) => {
        ctx.beginPath();

        const isHoriz = thread.direction === "horizontal";
        const steps = isHoriz ? 45 : 35;
        const stepSize = (isHoriz ? width : height) / steps;

        for (let i = 0; i <= steps; i++) {
          const coord = i * stepSize;
          let wave =
            Math.sin(
              coord * thread.frequency + thread.phase + time * thread.speed,
            ) * thread.amplitude;

          // Additional secondary high-frequency ripple
          wave += Math.sin(coord * 0.012 - time * 0.015) * 5;

          // Parallax slide based on actual page scroll
          if (isHoriz) {
            wave += lastScrollY.current * 0.08 * (1 - thread.id * 0.1);
          }

          let px = isHoriz ? coord : thread.baseY + wave;
          let py = isHoriz ? thread.baseY + wave : coord;

          // Mouse warp reaction (interactive ripple)
          if (isInteractive && mouse.active) {
            const dx = px - mouse.x;
            const dy = py - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 220;

            if (distance < maxDistance) {
              const force = (1 - distance / maxDistance) * 35;
              const angle = Math.atan2(dy, dx);
              // Push cloth threads realistically away from finger or cursor
              px += Math.cos(angle) * force;
              py += Math.sin(angle) * force;
            }
          }

          if (i === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }

        // Elegant gradient for threads mimicking metallic silk
        const grad = isHoriz
          ? ctx.createLinearGradient(0, 0, width, 0)
          : ctx.createLinearGradient(0, 0, 0, height);

        const getColorRGB = (colorName: string) => {
          switch (colorName) {
            case "gold":
              return "212, 175, 55";
            case "crimson":
              return "196, 69, 105";
            case "emerald":
              return "16, 124, 65";
            case "blue":
              return "30, 80, 180";
            case "magenta":
              return "156, 16, 92";
            case "champagne":
              return "230, 205, 170";
            case "pink":
              return "244, 150, 175";
            case "charcoal":
              return "60, 60, 64";
            default:
              return "196, 69, 105";
          }
        };

        const getAltColorRGB = (colorName: string) => {
          switch (colorName) {
            case "gold":
              return "244, 194, 208";
            case "crimson":
              return "212, 175, 55";
            case "emerald":
              return "212, 175, 55";
            case "blue":
              return "212, 175, 55";
            case "magenta":
              return "230, 205, 170";
            case "champagne":
              return "255, 255, 255";
            case "pink":
              return "212, 175, 55";
            case "charcoal":
              return "212, 175, 55";
            default:
              return "212, 175, 55";
          }
        };

        const threadColorVal = getColorRGB(thread.color);
        const altColorVal = getAltColorRGB(thread.color);

        grad.addColorStop(0, `rgba(${threadColorVal}, 0.05)`);
        grad.addColorStop(0.3, `rgba(${threadColorVal}, 0.28)`);
        grad.addColorStop(0.5, `rgba(${altColorVal}, 0.42)`); // Shiny reflection highlight in center
        grad.addColorStop(0.7, `rgba(${threadColorVal}, 0.28)`);
        grad.addColorStop(1, `rgba(${threadColorVal}, 0.05)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth =
          thread.thickness * (isInteractive && mouse.active ? 1.25 : 1.0);
        ctx.stroke();
      });

      // Render glowing zari brocade sparkles
      ctx.globalCompositeOperation = "screen";
      sparkles.forEach((sparkle) => {
        // Move sparkles gently
        sparkle.x += sparkle.speedX;
        sparkle.y += sparkle.speedY;

        // Reset if they float of screen boundaries
        if (sparkle.x < 0) sparkle.x = width;
        if (sparkle.x > width) sparkle.x = 0;
        if (sparkle.y < 0) sparkle.y = height;
        if (sparkle.y > height) sparkle.y = 0;

        // Attract sparkles to mouse pointer
        if (isInteractive && mouse.active) {
          const dx = mouse.x - sparkle.x;
          const dy = mouse.y - sparkle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            sparkle.x += (dx / dist) * 1.8;
            sparkle.y += (dy / dist) * 1.8;
          }
        }

        // Twinkle effect using wave maths
        const twinkle = Math.sin(time * 0.05 + sparkle.phase) * 0.35 + 0.65;
        const currentAlpha = sparkle.alpha * twinkle;

        const pRadius = sparkle.size * twinkle * 1.5;
        const radGrad = ctx.createRadialGradient(
          sparkle.x,
          sparkle.y,
          0,
          sparkle.x,
          sparkle.y,
          pRadius * 3,
        );

        const clrVal =
          sparkle.color === "gold" ? "236, 194, 91" : "244, 194, 208";
        radGrad.addColorStop(0, `rgba(${clrVal}, ${currentAlpha})`);
        radGrad.addColorStop(0.3, `rgba(${clrVal}, ${currentAlpha * 0.5})`);
        radGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(sparkle.x, sparkle.y, pRadius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Little dynamic star cores
        if (sparkle.size > 1.8) {
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.95})`;
          ctx.beginPath();
          ctx.arc(sparkle.x, sparkle.y, sparkle.size * 0.45, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalCompositeOperation = "source-over"; // Reset compositing code

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Mouse events mapping
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.targetX = e.touches[0].clientX - rect.left;
        mouseRef.current.targetY = e.touches[0].clientY - rect.top;
        mouseRef.current.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.active = false;
    };

    const parentElement = canvas.parentElement;
    if (parentElement) {
      parentElement.addEventListener("mousemove", handleMouseMove);
      parentElement.addEventListener("mouseleave", handleMouseLeave);
      parentElement.addEventListener("touchmove", handleTouchMove, {
        passive: true,
      });
      parentElement.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      if (parentElement) {
        parentElement.removeEventListener("mousemove", handleMouseMove);
        parentElement.removeEventListener("mouseleave", handleMouseLeave);
        parentElement.removeEventListener("touchmove", handleTouchMove);
        parentElement.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [intensity, density, colorTheme, isInteractive, transparentBg]);

  return (
    <canvas
      id={`canvas-loom-${intensity.toString().replace(".", "-")}`}
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full block pointer-events-none ${className}`}
      style={{ mixBlendMode: "normal" }}
    />
  );
}
