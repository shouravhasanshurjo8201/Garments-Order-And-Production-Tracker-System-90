import { motion } from "framer-motion";
import { Factory, CheckCircle, PackageSearch, ArrowRight, Zap, Target, Activity } from "lucide-react";
import { Link } from "react-router";

const GarmentsProductionSection = () => {
    return (
        <section className="py-5 overflow-hidden">
            <div className="container mx-auto px-2">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24">

                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-500"></span>
                            </span>
                            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">
                                Real-time Intelligence
                            </span>
                        </div>

                        <h2 className="text-2xl lg:text-3xl font-black  leading-[1.05] mb-4 tracking-tighter">
                            Production
                            <span className="text-lime-400 ml-2">
                                Control Center
                            </span>
                        </h2>

                        <p className="text-xl text-gray-400 mb-5 leading-relaxed font-medium max-w-lg">
                            Ditch the spreadsheets. Orchestrate your factory floor with a unified system designed for speed, precision, and zero waste.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            {[
                                { icon: <Activity size={22} />, title: "Live Tracking", color: "bg-blue-50 text-blue-600" },
                                { icon: <Target size={22} />, title: "Smart Planning", color: "bg-orange-50 text-orange-600" },
                                { icon: <PackageSearch size={22} />, title: "Inventory AI", color: "bg-purple-50 text-purple-600" },
                                { icon: <CheckCircle size={22} />, title: "QC Mastery", color: "bg-lime-50 text-lime-600" }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ x: 10 }}
                                    className="flex items-center gap-4 group cursor-pointer"
                                >
                                    <div className={`p-4 rounded-2xl ${item.color} transition-all duration-300 group-hover:scale-110 shadow-sm`}>
                                        {item.icon}
                                    </div>
                                    <span className="font-bold text-gray-400 tracking-tight">{item.title}</span>
                                </motion.div>
                            ))}
                        </div>

                        <Link to="/dashboard">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="group flex items-center gap-4 bg-lime-700 text-white px-10 py-5 rounded-2xl font-bold text-sm tracking-widest uppercase transition-all shadow hover:bg-lime-600 shadow-lime-100"
                            >
                                Start Dashboard
                                <div className="bg-white/10 p-1 rounded-full group-hover:translate-x-1 transition-transform">
                                    <ArrowRight size={20} />
                                </div>
                            </motion.button>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 relative"
                    >
                        {/* Subtle Background Glow */}
                        <div className="absolute inset-0 rounded-full  scale-110"></div>

                        <div className="relative">
                            <img
                                src="https://i.postimg.cc/NMjj9fcW/download.jpg"
                                alt="Garments Factory"
                                className="rounded-[3rem]  w-full object-cover border border-white/20 opacity-70"
                            />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default GarmentsProductionSection;