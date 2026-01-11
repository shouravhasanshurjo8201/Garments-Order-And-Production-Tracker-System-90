import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { HiArrowRight, HiOutlineLightningBolt } from "react-icons/hi";

const SpecialOffer = () => {
    const [timeLeft, setTimeLeft] = useState({
        hours: 23,
        minutes: 59,
        seconds: 59,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59);
            const diff = endOfDay - now;

            if (diff > 0) {
                setTimeLeft({
                    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((diff / 1000 / 60) % 60),
                    seconds: Math.floor((diff / 1000) % 60),
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);
    return (
        <section className="py-10 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 border border-lime-500/10 rounded-[2.5rem] p-10 md:p-14 relative shadow shadow-lime-500/5"
                    >
                        {/* Flash Badge */}
                        <div className="flex items-center gap-2 mb-6 text-lime-600 font-bold text-sm tracking-wider uppercase">
                            <HiOutlineLightningBolt className="animate-bounce" size={25} />
                            <span>Limited Weekly Deal</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                            Special Offer <br />
                            <span className="text-lime-500 italic">Just For You!</span>
                        </h2>

                        <p className="text-lg text-gray-400 mb-10 leading-relaxed font-medium">
                            Refresh your home atmosphere with our premium
                            <span className=" text-lime-600 font-bold px-1 italic">Indoor Collection</span>.
                            Buy now and claim a massive
                            <span className="text-3xl font-black text-lime-600 block mt-2">60% DISCOUNT!</span>
                        </p>

                        <div className="flex flex-wrap items-center gap-8">
                            <Link to="/products">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: "0px 10px 25px rgba(132, 204, 22, 0.3)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-3 bg-lime-700 hover:bg-lime-600 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow shadow-lime-500/20"
                                >
                                    Explore Offers <HiArrowRight size={25} />
                                </motion.button>
                            </Link>

                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Ending Soon</span>
                                <div className="flex gap-2 text-2xl font-black tabular-nums">
                                    <div className="flex flex-col items-center">
                                        <span>{timeLeft.hours.toString().padStart(2, '0')}</span>
                                        <span className="text-[8px] -mt-1 text-gray-400">HRS</span>
                                    </div>
                                    <span className="text-lime-500">:</span>
                                    <div className="flex flex-col items-center">
                                        <span>{timeLeft.minutes.toString().padStart(2, '0')}</span>
                                        <span className="text-[8px] -mt-1 text-gray-400">MIN</span>
                                    </div>
                                    <span className="text-lime-500">:</span>
                                    <div className="flex flex-col items-center">
                                        <span>{timeLeft.seconds.toString().padStart(2, '0')}</span>
                                        <span className="text-[8px] -mt-1 text-gray-400">SEC</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 relative w-full group"
                    >
                        <div className="absolute inset-0 rounded-full blur-[100px]  transition-all duration-700"></div>

                        <div className="relative backdrop-blur-sm rounded-[3.5rem] p-10   overflow-hidden">
                            <motion.img
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                src="https://i.postimg.cc/8cMZgG03/images-2-removebg-preview.png"
                                alt="Plant Offer"
                                className="w-full h-auto max-h-[450px] object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                            />

                            <motion.div
                                initial={{ rotate: 12 }}
                                whileHover={{ rotate: 0, scale: 1.1 }}
                                className="absolute bottom-10 right-10 p-5 rounded-3xl shadow border border-lime-500/50 flex flex-col items-center cursor-default"
                            >
                                <span className="text-gray-400 text-sm line-through font-bold">$120.00</span>
                                <span className="text-3xl font-black text-lime-600 leading-none">$48.00</span>
                                <span className="text-[10px] font-black text-white bg-lime-500 px-2 py-0.5 rounded-full mt-2">SAVE 60%</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SpecialOffer;