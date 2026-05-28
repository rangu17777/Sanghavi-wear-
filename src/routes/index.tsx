const heroModels = "/assets/image.png";
const heroImg = "/assets/image.png";
const ladiesImg =
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80";
const mensImg =
  "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80";
const kidsImg =
  "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80";
const bridalImg =
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80";
import {
  MapPin,
  Phone,
  Clock,
  Instagram,
  MessageCircle,
  Menu,
  X,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import { SilkLoomBackground } from "@/components/SilkLoomBackground";
import TextHoverEffect from "@/components/ui/shimmer-bg-text";
import SanghaviNxLogo from "@/components/SanghaviNxLogo";
import { SanghaviPremiumButton } from "@/components/SanghaviPremiumButton";
import HoverBorderGradient from "@/components/ui/hover-border-gradient";
import { useIsMobile } from "@/hooks/use-mobile";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { SgLuxuryDesignSuite } from "@/components/SgLuxuryDesignSuite";

const newArrivals = [
  { img: ladiesImg, title: "Designer Sarees", tag: "Premium Collection" },
  { img: bridalImg, title: "Bridal Lehengas", tag: "Wedding Edit" },
  { img: mensImg, title: "Men's Kurta Sets", tag: "Festive Range" },
  { img: kidsImg, title: "Kids Ethnic Wear", tag: "New Arrivals" },
  { img: ladiesImg, title: "Salwar Suits", tag: "Daily Wear" },
  { img: bridalImg, title: "Party Wear Gowns", tag: "Premium Range" },
];

const varieties = [
  "Sarees",
  "Salwar Suits",
  "Lehengas",
  "Kurtis",
  "Men's Kurtas",
  "Men's Shirts",
  "Kids Wear",
  "Wedding Collection",
];

const familyPicks = [
  { img: ladiesImg, title: "Ladies Wear", tag: "Sarees & Suits" },
  { img: mensImg, title: "Men's Wear", tag: "Formal & Ethnic" },
  { img: kidsImg, title: "Kids Wear", tag: "All Ages" },
  { img: bridalImg, title: "Wedding Edit", tag: "Bridal Collection" },
  { img: ladiesImg, title: "Daily Essentials", tag: "Everyday Comfort" },
];

export default function Index() {
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax shifts. Keep them subtle on mobile or set to 0 to bypass performance hits.
  const heroBgY = useTransform(
    heroProgress,
    [0, 1],
    ["0%", isMobile ? "10%" : "30%"],
  );
  const heroBgScale = useTransform(
    heroProgress,
    [0, 1],
    [1, isMobile ? 1.05 : 1.15],
  );
  const archY = useTransform(
    heroProgress,
    [0, 1],
    ["0%", isMobile ? "0%" : "-15%"],
  );
  const textOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);

  // Framer Motion presets calibrated to look awesome yet lightweight on mobile
  const fromLeft = {
    initial: { opacity: 0, x: isMobile ? -15 : -80 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: isMobile ? "-20px" : "-80px" },
    transition: {
      duration: isMobile ? 0.6 : 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  };
  const fromRight = {
    initial: { opacity: 0, x: isMobile ? 15 : 80 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: isMobile ? "-20px" : "-80px" },
    transition: {
      duration: isMobile ? 0.6 : 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  };
  const fadeUp = {
    initial: { opacity: 0, y: isMobile ? 20 : 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: isMobile ? "-20px" : "-60px" },
    transition: {
      duration: isMobile ? 0.5 : 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  };

  return (
    <div style={{ background: "#fdf2f5" }}>
      {/* Navigation */}
      <nav
        id="main-navigation"
        className="absolute top-0 left-0 right-0 z-40 px-6 md:px-12 py-5 flex items-center justify-between"
      >
        <SanghaviNxLogo />

        {/* Desktop Menu */}
        <div
          id="desktop-menu"
          className="hidden md:flex items-center gap-2 text-[#fdf2f5] text-xs font-medium tracking-[0.25em] uppercase"
        >
          <a href="#collection" className="transition">
            <TextHoverEffect
              text="Collection"
              fontSizeClass="text-xs tracking-[0.25em] font-medium font-sans"
              textColorClass="from-[#fdf2f5] via-[#f4c2d0] to-[#fdf2f5]"
              isStandalone={false}
            />
          </a>
          <a href="#showroom-experience" className="transition">
            <TextHoverEffect
              text="Design Suite"
              fontSizeClass="text-xs tracking-[0.25em] font-medium font-sans"
              textColorClass="from-[#fdf2f5] via-[#f4c2d0] to-[#fdf2f5]"
              isStandalone={false}
            />
          </a>
          <a href="#varieties" className="transition">
            <TextHoverEffect
              text="Categories"
              fontSizeClass="text-xs tracking-[0.25em] font-medium font-sans"
              textColorClass="from-[#fdf2f5] via-[#f4c2d0] to-[#fdf2f5]"
              isStandalone={false}
            />
          </a>
          <a href="#family" className="transition">
            <TextHoverEffect
              text="Family"
              fontSizeClass="text-xs tracking-[0.25em] font-medium font-sans"
              textColorClass="from-[#fdf2f5] via-[#f4c2d0] to-[#fdf2f5]"
              isStandalone={false}
            />
          </a>
          <a href="#visit" className="transition">
            <TextHoverEffect
              text="Visit Us"
              fontSizeClass="text-xs tracking-[0.25em] font-medium font-sans"
              textColorClass="from-[#fdf2f5] via-[#f4c2d0] to-[#fdf2f5]"
              isStandalone={false}
            />
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center z-50">
          <button
            id="mobile-menu-hamburger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#fdf2f5] p-2 hover:text-[#f4c2d0] transition-colors focus:outline-none focus:ring-1 focus:ring-[#f4c2d0]/30 rounded-full"
            aria-label="Toggle mobile menu"
            style={{
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 stroke-[1.5]" />
            ) : (
              <Menu className="w-6 h-6 stroke-[1.5]" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Fullscreen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#1a0a10] z-30 flex flex-col justify-center items-center p-8 md:hidden text-[#fdf2f5]"
          >
            {/* Background fabric pattern inside menu */}
            <SilkLoomBackground
              density={3}
              intensity={0.4}
              transparentBg={true}
              className="opacity-30"
            />

            <div className="relative z-10 flex flex-col gap-6 text-center text-lg uppercase tracking-[0.2em] font-heading w-full max-w-xs mt-12">
              <span className="text-[10px] text-[#f4c2d0] tracking-[0.4em] block mb-2 opacity-50 uppercase">
                Explore Showroom
              </span>

              <a
                id="mob-link-collection"
                href="#collection"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#f4c2d0] transition-colors border-b border-[#f4c2d0]/10 py-3 active:bg-[#c44569]/10"
              >
                Collection
              </a>
              <a
                id="mob-link-experience"
                href="#showroom-experience"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#f4c2d0] transition-colors border-b border-[#f4c2d0]/10 py-3 active:bg-[#c44569]/10"
              >
                Design Suite
              </a>
              <a
                id="mob-link-categories"
                href="#varieties"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#f4c2d0] transition-colors border-b border-[#f4c2d0]/10 py-3 active:bg-[#c44569]/10"
              >
                Categories
              </a>
              <a
                id="mob-link-family"
                href="#family"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#f4c2d0] transition-colors border-b border-[#f4c2d0]/10 py-3 active:bg-[#c44569]/10"
              >
                Family
              </a>
              <a
                id="mob-link-visit"
                href="#visit"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#f4c2d0] transition-colors py-3 active:bg-[#c44569]/10"
              >
                Visit Us
              </a>

              <div className="w-12 h-[1px] bg-[#f4c2d0]/20 mx-auto my-3" />

              <div className="flex flex-col gap-3">
                <a
                  id="mob-enquiry-call"
                  href="tel:09545767616"
                  className="font-body text-xs tracking-[0.18em] flex items-center justify-center gap-2 text-[#f4c2d0] hover:text-[#fdf2f5] py-2.5 active:scale-95 transition-all"
                >
                  <Phone className="w-4 h-4 text-[#f4c2d0]" /> 095457 67616
                </a>
                <a
                  id="mob-enquiry-whatsapp"
                  href="https://wa.me/918432143431"
                  className="font-body text-xs tracking-[0.18em] flex items-center justify-center gap-2 text-[#fdf2f5] hover:text-white py-3 bg-[#c44569]/40 border border-[#f4c2d0]/30 rounded-full active:scale-95 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4 text-rose-300" /> WhatsApp
                  Store
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero - editorial arch composition with parallax */}
      <header
        ref={heroRef}
        className="relative min-h-[100vh] flex items-center justify-center text-center overflow-hidden animate-fade-in"
        style={{ background: "#1a0a10" }}
      >
        <motion.div
          style={{ y: heroBgY, scale: heroBgScale }}
          className="absolute inset-0"
        >
          <img
            src={heroModels}
            alt="Sanghavi NX bridal collection"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a10]/50 via-[#1a0a10]/30 to-[#1a0a10]/80" />
          <SilkLoomBackground
            density={6}
            intensity={0.8}
            transparentBg={true}
          />
        </motion.div>

        {/* Centered arch with copy */}
        <motion.div
          style={{ y: archY, opacity: textOpacity }}
          className="relative z-10 px-6"
        >
          <div
            className="relative mx-auto flex flex-col items-center justify-center text-[#fdf2f5]"
            style={{
              width: "min(560px, 88vw)",
              minHeight: "min(620px, 80vh)",
              padding: "4rem 2.5rem",
              background:
                "linear-gradient(180deg, rgba(120,20,45,0.85) 0%, rgba(60,8,22,0.92) 100%)",
              border: "1px solid rgba(244,194,208,0.4)",
              borderRadius: "50% 50% 8px 8px / 35% 35% 8px 8px",
              boxShadow:
                "0 30px 80px -20px rgba(0,0,0,0.6), inset 0 0 60px rgba(244,194,208,0.08)",
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="uppercase tracking-[0.45em] text-[10px] md:text-xs mb-6 text-[#f4c2d0]"
            >
              Talegaon Dabhade
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="font-heading leading-[1.05] mb-3"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
                fontWeight: 500,
                letterSpacing: "0.04em",
              }}
            >
              Celebrate
              <br />
              Weddings
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="font-display italic text-[#f4c2d0] mb-6"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
            >
              in style
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="font-display max-w-xs mx-auto mb-2 text-[#fdf2f5]/90"
              style={{ fontSize: "1.05rem", lineHeight: 1.5 }}
            >
              From serene vows to
              <br />
              sparkling nights
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="w-16 h-px bg-[#f4c2d0] my-6"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <SanghaviPremiumButton
                href="#collection"
                variant="primary"
                shape="arch-de-couture"
                className="!bg-[#fdf2f5] !text-[#1a0a10] !border-[#fdf2f5] hover:!bg-[#c44569] hover:!text-[#fdf2f5]"
              >
                Shop Now
              </SanghaviPremiumButton>
              <SanghaviPremiumButton
                href="https://wa.me/918432143431"
                variant="secondary"
                shape="gold-capsule"
              >
                WhatsApp
              </SanghaviPremiumButton>
            </motion.div>
          </div>
        </motion.div>
      </header>

      {/* New Arrivals */}
      <section
        id="collection"
        className="py-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
      >
        <motion.div
          {...fromLeft}
          className="flex items-end justify-between mb-14 flex-wrap gap-4"
        >
          <div>
            <p className="uppercase tracking-[0.4em] text-xs text-[#c44569] mb-3 font-display italic">
              Just In
            </p>
            <h2 className="section-title">New Arrivals</h2>
          </div>
          <a
            href="#visit"
            className="text-[#1a0a10] font-semibold text-xs tracking-[0.25em] uppercase border-b border-[#c44569] pb-1 hover:text-[#c44569]"
          >
            View All
          </a>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {newArrivals.map((item, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.8,
                delay: (i % 3) * 0.1,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              whileHover={{ y: -8 }}
              className="group overflow-hidden bg-white rounded-sm shadow-sm hover:shadow-2xl transition-shadow"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  width={800}
                  height={1024}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-5 text-center">
                <h3
                  className="text-lg text-[#1a0a10] font-heading"
                  style={{ fontWeight: 500 }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-[#c44569] mt-1 font-display italic">
                  {item.tag}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Luxury Design Suite Experience */}
      <SgLuxuryDesignSuite />

      {/* Varieties */}
      <section
        id="varieties"
        className="py-24 px-6 md:px-12 overflow-hidden"
        style={{ background: "#1a0a10", color: "#fdf2f5" }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.p
            {...fadeUp}
            className="uppercase tracking-[0.4em] text-xs text-[#f4c2d0] mb-3 font-display italic"
          >
            Shop By Category
          </motion.p>
          <motion.h2
            {...fadeUp}
            className="font-heading mb-3"
            style={{
              fontSize: "clamp(2rem, 3.4vw, 2.8rem)",
              fontWeight: 500,
              letterSpacing: "0.05em",
            }}
          >
            Our Collections
          </motion.h2>
          <div className="w-20 h-px bg-[#f4c2d0] mx-auto mb-14" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#3a1520]">
            {varieties.map((v, i) => (
              <motion.div
                key={v}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.05,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                className="bg-[#1a0a10] overflow-hidden"
              >
                <HoverBorderGradient
                  as="div"
                  containerClassName="w-full h-full cursor-pointer"
                  className="bg-[#1a0a10] hover:bg-[#2a1018]/60 py-12 px-4 transition-colors duration-500 select-none"
                  duration={2.2}
                >
                  <span
                    className="text-lg md:text-xl font-heading tracking-[0.08em] block text-center text-[#fdf2f5]"
                    style={{ fontWeight: 400 }}
                  >
                    {v}
                  </span>
                </HoverBorderGradient>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Family Picks */}
      <section
        id="family"
        className="py-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
      >
        <motion.div
          {...fromRight}
          className="flex items-end justify-between mb-14 flex-wrap gap-4"
        >
          <div>
            <p className="uppercase tracking-[0.4em] text-xs text-[#c44569] mb-3 font-display italic">
              For Every Member
            </p>
            <h2 className="section-title">Family Top Picks</h2>
          </div>
          <SanghaviPremiumButton
            href="https://wa.me/918432143431"
            variant="primary"
            shape="gold-capsule"
            className="!py-3 !px-6 !text-xs"
          >
            Bulk Enquiry
          </SanghaviPremiumButton>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {familyPicks.map((item, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? 60 : -60, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              whileHover={{ y: -6 }}
              className="group overflow-hidden bg-white rounded-sm shadow-sm hover:shadow-2xl transition-shadow"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  width={800}
                  height={1024}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-4 text-center">
                <h3
                  className="text-base text-[#1a0a10] font-heading"
                  style={{ fontWeight: 500 }}
                >
                  {item.title}
                </h3>
                <p className="text-xs text-[#c44569] mt-1 font-display italic">
                  {item.tag}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Visit Store */}
      <section
        id="visit"
        className="py-24 px-6 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #fdf2f5 0%, #fbe6ec 50%, #f4c2d0 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="uppercase tracking-[0.4em] text-xs text-[#c44569] mb-3 font-display italic">
              Come See Us
            </p>
            <h2 className="section-title">Visit The Store</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <motion.div
              {...fromLeft}
              className="bg-[#1a0a10] text-[#fdf2f5] p-10 md:p-12 rounded-sm shadow-xl"
            >
              <div className="text-3xl text-[#f4c2d0] mb-4 font-display italic">
                ❦
              </div>
              <h3
                className="text-3xl mb-6 font-heading"
                style={{ fontWeight: 500, letterSpacing: "0.05em" }}
              >
                Sanghavi NX
              </h3>
              <div className="space-y-5 mb-8 text-[#fdf2f5]/90">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#f4c2d0] mt-1 shrink-0" />
                  <p className="leading-relaxed">
                    Panchavati Colony, Opp. Bhandari Hospital,
                    <br />
                    Near More Mall, Talegaon Dabhade,
                    <br />
                    Pune — 410506, Maharashtra
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#f4c2d0]" />
                  <span>Open 10 AM – 9 PM, All Days</span>
                </div>
                <a
                  href="tel:09545767616"
                  className="flex items-center gap-3 hover:text-[#f4c2d0] transition"
                >
                  <Phone className="w-5 h-5 text-[#f4c2d0]" /> 095457 67616
                </a>
                <a
                  href="https://wa.me/918432143431"
                  className="flex items-center gap-3 hover:text-[#f4c2d0] transition"
                >
                  <MessageCircle className="w-5 h-5 text-[#f4c2d0]" /> 84321
                  43431
                </a>
                <a
                  href="https://instagram.com/sanghavinx"
                  className="flex items-center gap-3 hover:text-[#f4c2d0] transition"
                >
                  <Instagram className="w-5 h-5 text-[#f4c2d0]" /> @sanghavinx
                </a>
              </div>
              <SanghaviPremiumButton
                href="https://www.google.com/maps/search/?api=1&query=Sanghavi+NX+Talegaon+Dabhade"
                variant="primary"
                shape="arch-de-couture"
                className="!bg-[#fdf2f5] !text-[#1a0a10] !border-[#fdf2f5] hover:!bg-[#c44569] hover:!text-[#fdf2f5]"
              >
                Get Directions
              </SanghaviPremiumButton>
            </motion.div>

            <motion.div
              {...fromRight}
              className="rounded-sm overflow-hidden shadow-xl border-4 border-[#1a0a10] min-h-[420px]"
            >
              <iframe
                title="Sanghavi NX location on Google Maps"
                src="https://www.google.com/maps?q=Sanghavi+NX+Talegaon+Dabhade&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 420 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative py-16 px-6 text-center text-sm overflow-hidden border-t border-[#3a1520]"
        style={{ background: "#1a0a10", color: "#f4c2d0" }}
      >
        <SilkLoomBackground density={3} intensity={0.5} transparentBg={false} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div
            className="text-[#fdf2f5] mb-3 tracking-[0.3em] font-heading"
            style={{ fontWeight: 500, fontSize: "1.1rem" }}
          >
            SANGHAVI NX
          </div>
          <div className="font-display italic text-[#f4c2d0] mb-3 text-xs">
            complete family store
          </div>
          <p className="opacity-80">
            © {new Date().getFullYear()} Sanghavi NX · Complete Family Showroom
            · Talegaon Dabhade, Pune
          </p>
        </div>
      </footer>
      <WhatsAppFloatingButton />
    </div>
  );
}
