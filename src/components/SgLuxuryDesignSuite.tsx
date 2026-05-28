import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  HelpCircle,
  Palette,
  Calendar,
  MessageCircle,
  ArrowRight,
  Check,
  CheckCircle,
} from "lucide-react";
import { SilkLoomBackground } from "./SilkLoomBackground";
import { SanghaviPremiumButton } from "./SanghaviPremiumButton";

type SwatchTheme =
  | "gold-crimson"
  | "gold-rose"
  | "gold-emerald"
  | "royal-blue"
  | "magenta-grape"
  | "champagne-gold";

interface ColorSwatch {
  id: SwatchTheme;
  name: string;
  primaryBg: string;
  accentBg: string;
  textColor: string;
  description: string;
  heritage: string;
}

const COLOR_SWATCHES: ColorSwatch[] = [
  {
    id: "gold-crimson",
    name: "Royal Crimson Saree",
    primaryBg: "#78142d",
    accentBg: "#ecaf37",
    textColor: "#fdf2f5",
    description:
      "Deep crimson crimson silk masterfully intertwined with brilliant 24k gold tested Zari threads.",
    heritage:
      "A traditional powerhouse inspired by legacy Peshwai weaves, reflecting prosperity and timeless heritage.",
  },
  {
    id: "gold-emerald",
    name: "Imperial Emerald Silk",
    primaryBg: "#106c41",
    accentBg: "#ecaf37",
    textColor: "#fdf2f5",
    description:
      "Rich bottle green paired with an opulent radiant gold border.",
    heritage:
      "Symbolizing renewal and elegance, loved for wedding mahurthams and luxury bridal entries.",
  },
  {
    id: "royal-blue",
    name: "Peacock Royal Blue",
    primaryBg: "#1e50b4",
    accentBg: "#ecaf37",
    textColor: "#fdf2f5",
    description:
      "Dazzling twilight cobalt blue shifting under light with premium golden wefts.",
    heritage:
      "Captures the majestic hues of a peacock feather, presenting modern grace with supreme poise.",
  },
  {
    id: "magenta-grape",
    name: "Festive Paithani Violet",
    primaryBg: "#86105c",
    accentBg: "#df9bcf",
    textColor: "#fdf2f5",
    description:
      "Vibrant deep magenta grape silk matched with iridescent rose pink and gold details.",
    heritage:
      "Inspired by the classic peacock border motifs of Paithan, emitting vibrant warmth and joy.",
  },
  {
    id: "champagne-gold",
    name: "Ivory Elixir Satin",
    primaryBg: "#e6cda2",
    accentBg: "#ffffff",
    textColor: "#1a0a10",
    description:
      "Premium ivory silk woven into double-twist satin thread for a blinding sheen.",
    heritage:
      "For the contemporary luxury enthusiast — pure, clean, minimalist opulence at its highest peak.",
  },
];

export function SgLuxuryDesignSuite() {
  const [activeTab, setActiveTab] = useState<"loom" | "quiz" | "planner">(
    "loom",
  );

  // Loom Simulator state
  const [selectedTheme, setSelectedTheme] =
    useState<SwatchTheme>("gold-crimson");
  const selectedThemeData = useMemo(() => {
    return (
      COLOR_SWATCHES.find((s) => s.id === selectedTheme) || COLOR_SWATCHES[0]
    );
  }, [selectedTheme]);

  // Quiz States
  const [quizStep, setQuizStep] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [resultShown, setResultShown] = useState<boolean>(false);

  const quizQuestions = [
    {
      title: "Select your dream wedding or celebration vibe:",
      options: [
        {
          label: "Heritage Grandeur",
          desc: "Regal, ancient traditions, pure heavy silk zari",
        },
        {
          label: "Contemporary Minimalist",
          desc: "Sleek, chic lines, pastel hues with lightweight satin",
        },
        {
          label: "Bold & Celebrated",
          desc: "High contrast magenta, playful colors, peacock patterns",
        },
        {
          label: "Serene & Sophisticated",
          desc: "Soft champagne whites, subtle sheen, sheer luxury",
        },
      ],
    },
    {
      title: "Choose your primary styling color range:",
      options: [
        {
          label: "Warm & Traditional",
          desc: "Crimson Reds, Royal Maroons, Haldi Yellows",
        },
        {
          label: "Cool & Majestic",
          desc: "Ocean Blues, Emerald Greens, Lilac Purples",
        },
        {
          label: "Pastels & Ivories",
          desc: "Mint Greens, Champagne, Soft Blush Pinks",
        },
      ],
    },
    {
      title: "What represents your ultimate ethnic wear statement?",
      options: [
        {
          label: "Heavy Broad Borders",
          desc: "Classic traditional weaves with grand border aesthetics",
        },
        {
          label: "Intricate Self-Weave",
          desc: "Subtle patterns that reflect beautifully under chandelier lights",
        },
        {
          label: "Featherlight Flow",
          desc: "Modern georgette or organza with premium drape comfort",
        },
      ],
    },
  ];

  const handleAnswerSelect = (optionLabel: string) => {
    const updatedAnswers = [...answers, optionLabel];
    setAnswers(updatedAnswers);
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setResultShown(true);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setAnswers([]);
    setResultShown(false);
  };

  const calculatedVibeResult = useMemo(() => {
    if (answers.length === 0) return null;
    const ans1 = answers[0] || "";
    const ans2 = answers[1] || "";

    if (ans1.includes("Heritage") || ans2.includes("Traditional")) {
      return {
        title: "The Royal Peshwai Edit",
        subtitle: "Classic Grandeur & Heavy Gold Embellishments",
        description:
          "Your styling personality thrives on deep historic roots. We recommend our authentic Kanchipuram and pure Paithani silk sarees in Crimson and Emerald, paired with heavy gold Zari thread work.",
        colors: "Royal Crimson, Emerald Green & Matte Gold",
        whatsappMsg:
          "Hello Sanghavi NX, I took your styling quiz and matched with 'The Royal Peshwai Edit'. I would love to look at your bridal Paithanis!",
      };
    } else if (ans1.includes("Minimalist") || ans2.includes("Pastels")) {
      return {
        title: "The Elixir Pastel Suite",
        subtitle: "Sleek Contemporary Drape & Modern Silks",
        description:
          "You appreciate the elegance of silence. Lightweight silk collections, organzas, and dual-tone champagne-cream sarees with sleek, minimal borders fit your aesthetic profile flawlessly.",
        colors: "Champagne, Peony Blush & Pearlescent Ivory",
        whatsappMsg:
          "Hello Sanghavi NX, I took your styling quiz and matched with 'The Elixir Pastel Suite'. I am interested in seeing pastel bridal collection options.",
      };
    } else {
      return {
        title: "The Majestic Peacock Celebration",
        subtitle: "Vibrant Jewels & High-Sheen Party Wear",
        description:
          "You love setting trends. Deep peacock blue Georgettes, majestic Magenta Banarasis, and self-weave embroidery collections will make you stand out spectacularly.",
        colors: "Peacock Blue, Fuchsia Pink & Radiant Copper",
        whatsappMsg:
          "Hello Sanghavi NX, I took your styling quiz and matched with 'The Majestic Peacock Celebration'. Highlight your premium party wear designs for my family!",
      };
    }
  }, [answers]);

  // Event planner states
  const [selectedEvent, setSelectedEvent] = useState<string>(
    "Wedding (Mahurtham)",
  );
  const [plannerTheme, setPlannerTheme] = useState<{
    ladies: string;
    mens: string;
    kids: string;
  }>({
    ladies: "Royal Crimson & Gold Paithanis",
    mens: "Ivory Silk Kurta Sherwanis",
    kids: "Peach & Cream Kids Lehenga/Kurta",
  });

  const eventPresets = [
    {
      name: "Wedding (Mahurtham)",
      ladies: "Royal Crimson & Gold Paithanis",
      mens: "Ivory Silk Kurta Sherwanis",
      kids: "Peach & Cream Kids Lehenga/Kurta",
    },
    {
      name: "Grand Sangeet",
      ladies: "Magenta Grape Designer Gowns/Lehengas",
      mens: "Peacock Blue Indo-Western Suits",
      kids: "Bright Fuchsia Ethnic Dresses",
    },
    {
      name: "Haldi Ceremonials",
      ladies: "Mustard Silk Sarees or Yellow Salwars",
      mens: "Lemon Yellow Linen Kurtas",
      kids: "Marigold Yellow Dhoti-Kurta Sets",
    },
  ];

  const handleEventSelect = (eventName: string) => {
    setSelectedEvent(eventName);
    const found = eventPresets.find((e) => e.name === eventName);
    if (found) {
      setPlannerTheme({
        ladies: found.ladies,
        mens: found.mens,
        kids: found.kids,
      });
    }
  };

  const plannerWhatsAppUrl = useMemo(() => {
    const text = `Hello Sanghavi NX, I am planning family wardrobe ensembles for our ${selectedEvent} ceremony:
- Ladies: ${plannerTheme.ladies}
- Men's: ${plannerTheme.mens}
- Kids: ${plannerTheme.kids}
Can you suggest custom attire ideas suited for this template?`;
    return `https://wa.me/918432143431?text=${encodeURIComponent(text)}`;
  }, [selectedEvent, plannerTheme]);

  return (
    <section
      id="showroom-experience"
      className="py-24 px-6 md:px-12 bg-[#1a0a10] text-[#fdf2f5] overflow-hidden relative"
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          id="experience-overlay-matrix"
          className="w-full h-full bg-[radial-gradient(#ecaf37_1px,transparent_1px)] [background-size:16px_16px]"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.45em] text-xs text-[#df9bcf] mb-3 font-display italic">
            Interactive Experience
          </p>
          <h2 className="font-heading tracking-[0.05em] text-3xl md:text-5xl font-medium mb-3">
            The Digital Showroom Suíte
          </h2>
          <p className="text-xs md:text-sm text-[#fdf2f5]/70 max-w-xl mx-auto tracking-widest uppercase leading-relaxed">
            Co-design, styling matches, and unified wedding family dress logs in
            one touch.
          </p>
          <div className="w-16 h-[2px] bg-[#ecaf37] mx-auto mt-6" />
        </div>

        {/* Tab Controls */}
        <div className="flex flex-col sm:flex-row justify-center items-stretch gap-2 mb-12 max-w-3xl mx-auto">
          <button
            onClick={() => setActiveTab("loom")}
            className={`flex items-center justify-center gap-3 px-6 py-4 rounded-sm border transition-all text-xs tracking-[0.2em] uppercase cursor-pointer ${
              activeTab === "loom"
                ? "bg-[#c44569]/30 border-[#ecaf37] text-white shadow-lg"
                : "bg-black/20 border-white/10 hover:border-white/30 text-white/70"
            }`}
            style={{ flex: 1, minHeight: 48 }}
          >
            <Palette className="w-4 h-4 text-[#ecaf37]" />
            Loom Simulator
          </button>

          <button
            onClick={() => setActiveTab("quiz")}
            className={`flex items-center justify-center gap-3 px-6 py-4 rounded-sm border transition-all text-xs tracking-[0.2em] uppercase cursor-pointer ${
              activeTab === "quiz"
                ? "bg-[#c44569]/30 border-[#ecaf37] text-white shadow-lg"
                : "bg-black/20 border-white/10 hover:border-white/30 text-white/70"
            }`}
            style={{ flex: 1, minHeight: 48 }}
          >
            <HelpCircle className="w-4 h-4 text-[#ecaf37]" />
            Style Vibe Quiz
          </button>

          <button
            onClick={() => setActiveTab("planner")}
            className={`flex items-center justify-center gap-3 px-6 py-4 rounded-sm border transition-all text-xs tracking-[0.2em] uppercase cursor-pointer ${
              activeTab === "planner"
                ? "bg-[#c44569]/30 border-[#ecaf37] text-white shadow-lg"
                : "bg-black/20 border-white/10 hover:border-white/30 text-white/70"
            }`}
            style={{ flex: 1, minHeight: 48 }}
          >
            <Calendar className="w-4 h-4 text-[#ecaf37]" />
            Wedding Dress Planner
          </button>
        </div>

        {/* Content Box */}
        <div className="bg-[#241118]/80 border border-[#df9bcf]/20 rounded-md p-6 md:p-12 shadow-2xl relative min-h-[480px]">
          <AnimatePresence mode="wait">
            {/* TAB 1: WEAVE LOOM SIMULATOR */}
            {activeTab === "loom" && (
              <motion.div
                key="loom"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 flex flex-col gap-5">
                  <div>
                    <span className="text-[10px] text-[#ecaf37] font-semibold tracking-widest uppercase bg-[#ecaf37]/10 px-2.5 py-1 rounded-full">
                      Interactive Silk Loom
                    </span>
                    <h3 className="text-2xl md:text-3xl font-heading mt-3 text-white">
                      Woven Fabric Customizer
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-[#fdf2f5]/80 leading-relaxed font-sans">
                    Every handloom fabric carries a signature density of Zari.
                    Select a colorway below to watch our virtual threads weave
                    the rich fabric folds in real-time.
                  </p>

                  <div className="mt-2 flex flex-col gap-3">
                    <span className="text-xs uppercase tracking-wider text-rose-300">
                      Select Saree Color Theme:
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {COLOR_SWATCHES.map((swatch) => (
                        <button
                          key={swatch.id}
                          onClick={() => setSelectedTheme(swatch.id)}
                          className={`group relative flex items-center justify-between text-left p-3 rounded-md border text-xs cursor-pointer active:scale-95 transition-all ${
                            selectedTheme === swatch.id
                              ? "bg-white/15 border-[#ecaf37]"
                              : "bg-black/30 border-white/10 hover:border-white/20"
                          }`}
                          style={{
                            minWidth: "150px",
                            flex: "1 0 calc(50% - 10px)",
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="w-4 h-4 rounded-full border border-white/20 shadow-inner shrink-0"
                              style={{ background: swatch.primaryBg }}
                            />
                            <span className="font-medium tracking-wide text-white">
                              {swatch.name}
                            </span>
                          </div>
                          {selectedTheme === swatch.id && (
                            <Check className="w-3.5 h-3.5 text-[#ecaf37]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-1 p-4 bg-black/30 rounded border border-white/5">
                    <p className="text-xs text-[#ecaf37] uppercase font-bold tracking-widest">
                      Heritage Lineage
                    </p>
                    <p className="text-sm italic text-[#f4c2d0] mt-1 font-display">
                      {selectedThemeData.heritage}
                    </p>
                  </div>

                  <div className="mt-4">
                    <SanghaviPremiumButton
                      href={`https://wa.me/918432143431?text=${encodeURIComponent(
                        `Hello Sanghavi NX, I am interested in exploring your custom collections matching the ${selectedThemeData.name} style. Do you have ready fabrics or designs in this?`,
                      )}`}
                      variant="primary"
                      shape="gold-capsule"
                      className="w-full sm:w-auto"
                    >
                      <MessageCircle className="w-4 h-4" /> Enquire This Vibe
                    </SanghaviPremiumButton>
                  </div>
                </div>

                {/* Loom Simulation Preview Canvas Frame */}
                <div className="lg:col-span-6 relative aspect-video lg:aspect-square w-full rounded-md overflow-hidden bg-black/40 border border-white/10 flex flex-col justify-between p-6 shadow-xl min-h-[300px]">
                  {/* Embedded Loom background rendering based on active theme state */}
                  <SilkLoomBackground
                    colorTheme={selectedTheme}
                    density={6}
                    intensity={0.7}
                    transparentBg={false}
                    className="z-0"
                  />

                  <div className="relative z-10 self-start">
                    <span className="text-[10px] tracking-widest text-[#ecaf37] bg-black/50 backdrop-blur-md border border-[#ecaf37]/30 px-3 py-1.5 rounded-full uppercase">
                      ● Interactive Weaving Drafted
                    </span>
                  </div>

                  <div className="relative z-10 bg-black/60 backdrop-blur-md p-4 rounded border border-white/10 self-end w-full max-w-sm">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-heading font-semibold text-white tracking-wide">
                        {selectedThemeData.name}
                      </span>
                      <Sparkles className="w-3.5 h-3.5 text-[#ecaf37] animate-pulse" />
                    </div>
                    <p className="text-xs text-[#fdf2f5]/90 leading-relaxed font-sans">
                      {selectedThemeData.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: VIBE MATCHING STYLE QUIZ */}
            {activeTab === "quiz" && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="max-w-xl mx-auto text-center flex flex-col items-center justify-center min-h-[380px]"
              >
                {!resultShown ? (
                  <div className="w-full flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <span className="text-xs text-[#ecaf37] uppercase tracking-widest">
                        Perfect Match Assistant · Step {quizStep + 1} of{" "}
                        {quizQuestions.length}
                      </span>
                      <h3 className="text-xl md:text-2xl font-heading text-white">
                        {quizQuestions[quizStep].title}
                      </h3>
                      {/* Custom visual progress bar */}
                      <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mt-2">
                        <div
                          className="bg-gradient-to-r from-[#df9bcf] to-[#ecaf37] h-full transition-all duration-300"
                          style={{
                            width: `${((quizStep + 1) / quizQuestions.length) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-3.5 text-left mt-3">
                      {quizQuestions[quizStep].options.map((option, idx) => (
                        <button
                          key={idx}
                          id={`quiz-opt-${quizStep}-${idx}`}
                          onClick={() => handleAnswerSelect(option.label)}
                          className="w-full bg-black/20 hover:bg-white/10 text-white border border-white/10 hover:border-[#df9bcf]/50 p-4 rounded-sm text-left transition-all active:scale-98 group flex flex-col gap-1.5 focus:outline-none cursor-pointer"
                        >
                          <div className="flex justify-between items-center w-full">
                            <span className="text-sm font-semibold tracking-wide text-[#fdf2f5] group-hover:text-[#ecaf37] transition-colors">
                              {option.label}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-rose-300 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                          </div>
                          <span className="text-xs text-[#fdf2f5]/60">
                            {option.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  calculatedVibeResult && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full text-center flex flex-col gap-6 items-center p-4"
                    >
                      <div className="w-14 h-14 bg-[#ecaf37]/20 border border-[#ecaf37]/50 rounded-full flex items-center justify-center shadow-lg">
                        <Sparkles className="w-6 h-6 text-[#ecaf37] animate-pulse" />
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="text-xs tracking-widest text-[#ecaf37] uppercase font-bold">
                          Your Exclusive Style Match
                        </span>
                        <h3 className="text-2xl md:text-3xl font-heading text-white">
                          {calculatedVibeResult.title}
                        </h3>
                        <p className="text-sm text-[#df9bcf] font-medium font-sans">
                          {calculatedVibeResult.subtitle}
                        </p>
                      </div>

                      <div className="w-full bg-black/30 border border-white/5 rounded-md p-5 text-center">
                        <p className="text-sm text-[#fdf2f5] leading-relaxed max-w-sm mx-auto">
                          {calculatedVibeResult.description}
                        </p>

                        <div className="w-8 h-px bg-rose-400/20 mx-auto my-3" />

                        <p className="text-xs text-rose-300 uppercase tracking-widest">
                          Ideal Palette match:{" "}
                          <span className="text-white font-semibold">
                            {calculatedVibeResult.colors}
                          </span>
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 w-full">
                        <button
                          id="reset-quiz-button"
                          onClick={resetQuiz}
                          className="flex-1 bg-transparent hover:bg-white/5 border border-white/20 hover:border-white/40 text-xs text-[#fdf2f5] py-3.5 rounded-full tracking-widest uppercase transition-all active:scale-95 font-semibold cursor-pointer"
                        >
                          Retake Quiz
                        </button>
                        <SanghaviPremiumButton
                          href={`https://wa.me/918432143431?text=${encodeURIComponent(calculatedVibeResult.whatsappMsg)}`}
                          variant="primary"
                          shape="gold-capsule"
                          className="flex-1 !py-3.5 shadow-lg shadow-rose-950/40"
                        >
                          <MessageCircle className="w-4 h-4" /> Consult Designer
                        </SanghaviPremiumButton>
                      </div>
                    </motion.div>
                  )
                )}
              </motion.div>
            )}

            {/* TAB 3: DRESS CODE & WARDROBE PLANNER */}
            {activeTab === "planner" && (
              <motion.div
                key="planner"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid lg:grid-cols-12 gap-8 items-stretch"
              >
                <div className="lg:col-span-4 flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] tracking-widest text-[#ecaf37] uppercase font-bold bg-[#ecaf37]/15 self-start px-2 py-0.5 rounded">
                      Family Wardrobe Harmony
                    </span>
                    <h3 className="text-xl md:text-2xl font-heading text-white">
                      Celebration Coordinates
                    </h3>
                  </div>
                  <p className="text-xs md:text-sm text-[#fdf2f5]/80 leading-relaxed">
                    Make your wedding portraits grander by synchronizing
                    clothing colors across family sections. Select an event
                    ceremonials block to pre-populate look coordinates:
                  </p>

                  <div className="flex flex-col gap-2 mt-2">
                    {eventPresets.map((evt) => (
                      <button
                        key={evt.name}
                        onClick={() => handleEventSelect(evt.name)}
                        className={`flex items-center gap-3 p-3 rounded-md text-left transition-all active:scale-98 border cursor-pointer ${
                          selectedEvent === evt.name
                            ? "bg-[#c44569]/20 border-[#ecaf37] text-white"
                            : "bg-black/25 border-white/15 hover:border-white/30 text-white/80"
                        }`}
                      >
                        <CheckCircle
                          className={`w-4 h-4 ${selectedEvent === evt.name ? "text-[#ecaf37]" : "text-[#df9bcf]/40"}`}
                        />
                        <span className="text-xs uppercase font-semibold tracking-wider font-sans">
                          {evt.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-8 flex flex-col justify-between bg-black/30 border border-white/5 rounded-md p-6 relative">
                  <div className="absolute inset-0 bg-[#3a1520]/5 pointer-events-none rounded-md" />

                  <div className="relative z-10 flex flex-col gap-4">
                    <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                      <span className="text-xs text-[#df9bcf] uppercase tracking-widest font-heading font-medium">
                        Selected Event Wardrobe Grid
                      </span>
                      <span className="text-xs text-rose-300 italic font-display">
                        {selectedEvent}
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      {/* Ladies Picks */}
                      <div className="p-4 bg-white/5 border border-white/10 rounded-sm flex flex-col gap-2 relative group hover:border-[#df9bcf]/30 transition-all">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#ecaf37]">
                          Section: Ladies Wear
                        </span>
                        <input
                          id="pair-ladies-input"
                          type="text"
                          value={plannerTheme.ladies}
                          onChange={(e) =>
                            setPlannerTheme({
                              ...plannerTheme,
                              ladies: e.target.value,
                            })
                          }
                          className="bg-black/40 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white uppercase focus:outline-none focus:border-[#ecaf37] w-full"
                          placeholder="Ladies wear colors"
                        />
                        <span className="text-[10px] text-[#fdf2f5]/40 italic">
                          Suggested: Paithani / Saree / Gown
                        </span>
                      </div>

                      {/* Mens Picks */}
                      <div className="p-4 bg-white/5 border border-white/10 rounded-sm flex flex-col gap-2 relative group hover:border-[#df9bcf]/30 transition-all">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#ecaf37]">
                          Section: Men's Wear
                        </span>
                        <input
                          id="pair-mens-input"
                          type="text"
                          value={plannerTheme.mens}
                          onChange={(e) =>
                            setPlannerTheme({
                              ...plannerTheme,
                              mens: e.target.value,
                            })
                          }
                          className="bg-black/40 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white uppercase focus:outline-none focus:border-[#ecaf37] w-full"
                          placeholder="Men's wear colors"
                        />
                        <span className="text-[10px] text-[#fdf2f5]/40 italic">
                          Suggested: Kurta / Suit / Groom Sherwani
                        </span>
                      </div>

                      {/* Kids Picks */}
                      <div className="p-4 bg-white/5 border border-white/10 rounded-sm flex flex-col gap-2 relative group hover:border-[#df9bcf]/30 transition-all">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#ecaf37]">
                          Section: Kids Ethnic
                        </span>
                        <input
                          id="pair-kids-input"
                          type="text"
                          value={plannerTheme.kids}
                          onChange={(e) =>
                            setPlannerTheme({
                              ...plannerTheme,
                              kids: e.target.value,
                            })
                          }
                          className="bg-black/40 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white uppercase focus:outline-none focus:border-[#ecaf37] w-full"
                          placeholder="Kids wear colors"
                        />
                        <span className="text-[10px] text-[#fdf2f5]/40 italic">
                          Suggested: Kurtas / Mini-Lehengas
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 justify-between border-t border-white/10 pt-4 mt-8">
                    <p className="text-xs text-[#fdf2f5]/60 max-w-sm text-center md:text-left">
                      💡 Click edit lines above directly if you would like to
                      test your own theme palette combos before reaching store
                      guides.
                    </p>
                    <SanghaviPremiumButton
                      href={plannerWhatsAppUrl}
                      variant="primary"
                      shape="gold-capsule"
                      className="w-full md:w-auto text-xs !py-3 shadow-md active:scale-95"
                    >
                      <MessageCircle className="w-4.5 h-4.5" /> Synchronize over
                      WA
                    </SanghaviPremiumButton>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
