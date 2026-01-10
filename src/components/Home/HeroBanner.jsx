import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import heroImage1 from "../../assets/images/Production1.jpeg";
import heroImage2 from "../../assets/images/Production2.jpeg";
import heroImage3 from "../../assets/images/Production3.jpeg";
import heroImage4 from "../../assets/images/Production.jpeg";

const slides = [
    {
        id: 1,
        heading: "Welcome to G.O.P.T.S.",
        description: "Efficiently manage orders and track production in real-time with our advanced tracking system.",
        image: heroImage1,
        accent: "text-lime-500"
    },
    {
        id: 2,
        heading: "Monitor Every Stitch",
        description: "Get live updates from the production floor directly to your dashboard. Stay informed, always.",
        image: heroImage2,
        accent: "text-blue-400"
    },
    {
        id: 3,
        heading: "Supply Chain Mastered",
        description: "Handle bulk orders and complex delivery schedules effortlessly with automated logistics.",
        image: heroImage3,
        accent: "text-orange-400"
    },
    {
        id: 4,
        heading: "Quality Assurance",
        description: "Maintain international standards with our integrated automated quality control modules.",
        image: heroImage4,
        accent: "text-red-400"
    },
];

const HeroBanner = () => {
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full h-70 md:h-[70vh] -mt-20 overflow-hidden bg-black/90 rounded-xl">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0"
                >
                    <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 7, ease: "easeOut" }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slides[current].image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                    <div className="absolute inset-0 bg-black/20" />
                </motion.div>
            </AnimatePresence>

            <div className="relative z-10 h-full container mx-auto px-6 flex items-center">
                <div className="max-w-3xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <h1 className="text-2xl md:text-5xl font-black leading-tight text-white/70 mb-5 tracking-tight">
                                {slides[current].heading.split(" ").map((word, i) => (
                                    <span key={i} className={word === "G.O.P.T.S." ? "text-lime-500" : ""}>
                                        {word}{" "}
                                    </span>
                                ))}
                            </h1>

                            <p className="text-gray-300 text-base md:text-2xl mb-4 max-w-xl leading-relaxed font-medium">
                                {slides[current].description}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link
                                    to="/products"
                                    className="bg-lime-600 hover:bg-lime-500 text-white font-bold px-5 py-2 rounded-xl shadow-xl transition-all flex items-center gap-2 active:scale-95"
                                >
                                    Explore Products
                                    <FaArrowRight size={14} />
                                </Link>

                                <Link
                                    to="/about"
                                    className="bg-white/10 backdrop-blur-md border border-white/20 hidden md:flex text-white px-8 py-3.5 rounded-xl hover:bg-white/20 transition-all font-semibold"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <div className="absolute bottom-2 -right-10 -translate-x-1/2 flex gap-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${current === index ? "w-12 bg-lime-500" : "w-3 bg-white/30 hover:bg-white/60"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-1 z-20">
                <span className="text-[12px] uppercase tracking-widest font-bold">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <FaChevronDown size={22} />
                </motion.div>
            </div>
        </section>
    );
};

export default HeroBanner;