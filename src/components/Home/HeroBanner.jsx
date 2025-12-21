import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import heroImage1 from "../../assets/images/Production.jpeg";

const slides = [
    {
        id: 1,
        heading: "Welcome to G.O.P.T.S.",
        description: "Efficiently manage orders and track production in real-time.",
        image: heroImage1,
        color: "text-lime-500"
    },
    {
        id: 2,
        heading: "Monitor Every Stitch",
        description: "Live updates from the production floor to your dashboard.",
        image: heroImage1,
        color: "text-blue-400"
    },
    {
        id: 3,
        heading: "Supply Chain Mastered",
        description: "Handle bulk orders and delivery schedules effortlessly.",
        image: heroImage1,
        color: "text-orange-400"
    },
    {
        id: 4,
        heading: "Quality Assurance",
        description: "Maintain high standards with automated quality modules.",
        image: heroImage1,
        color: "text-red-400"
    }
];

const HeroBanner = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 7000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-[400px] w-full overflow-hidden md:rounded-xl z-0 shadow-2xl bg-black">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <motion.div
                        initial={{ scale: 1.15 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 5, ease: "linear" }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slides[current].image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                </motion.div>
            </AnimatePresence>

            <div className="relative z-10 h-full flex items-center container mx-auto px-6 md:px-16">
                <div className="max-w-3xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 30 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-4xl md:text-5xl font-black mb-4 text-white leading-tight">
                                {slides[current].heading.split(" ").map((word, i) => (
                                    <span key={i} className={word === "G.O.P.T.S." ? slides[current].color : ""}>
                                        {word}{" "}
                                    </span>
                                ))}
                            </h1>

                            <p className="text-base md:text-lg mb-8 text-gray-200 leading-relaxed max-w-xl">
                                {slides[current].description}
                            </p>

                            <Link
                                to="/products"
                                className="inline-flex items-center gap-2 bg-lime-600 hover:bg-lime-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg active:scale-95"
                            >
                                Explore Now
                                <FaArrowRight size={14} />
                            </Link>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-16 md:translate-x-0 flex gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`h-2 transition-all duration-500 rounded-full ${current === index ? "w-10 bg-lime-500" : "w-2 bg-white/40 hover:bg-white/60"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;