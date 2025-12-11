import { motion } from "framer-motion";
import { Factory, CheckCircle, PackageSearch } from "lucide-react";
import { Link } from "react-router";

const GarmentsProductionSection = () => {
    return (
        <section className="my-10">
            <div className=" flex flex-col-reverse lg:flex-row items-center gap-10">

                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex-1"
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight mb-4">
                        Garments Production 
                        <br/>
                        <span className="text-transparent bg-clip-text bg-green-600">
                            Management System
                        </span>
                    </h2>

                    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                        Manage orders, track production, view progress, assign tasks,
                        and monitor delivery schedules — all in one smart automated system.
                        A clean and powerful solution designed for modern garments industries.
                    </p>

                    <div className="space-y-5 ">
                        <div className="flex items-start gap-4">
                            <Factory className="text-green-600 w-8 h-8" />
                            <p className="text-gray-700 text-lg">
                                Real-time production tracking & factory status monitoring.
                            </p>
                        </div>

                        <div className="flex items-start gap-4">
                            <PackageSearch className="text-green-600 w-8 h-8" />
                            <p className="text-gray-700 text-lg">
                                Order breakdown, fabric usage, cutting to finishing workflow.
                            </p>
                        </div>

                        <div className="flex items-start gap-4">
                            <CheckCircle className="text-green-600 w-8 h-8" />
                            <p className="text-gray-700 text-lg">
                                Ensure on-time delivery with accurate production analytics.
                            </p>
                        </div>
                    </div>
                    <Link to="/dashboard" >
                        <motion.button
                            whileHover={{ scale: 1.07, boxShadow: "0px 8px 20px rgba(0, 128, 0, 0.25)" }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 mt-4 rounded-xl font-semibold shadow-sm transition-all"
                        >
                        Explore Dashboard
                            
                        </motion.button>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex  flex-1 justify-center"
                >
                    <img
                        src="https://i.postimg.cc/NMjj9fcW/download.jpg"
                        alt="Garments Factory"
                        className="rounded-2xl shadow-2xl w-full max-w-lg"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default GarmentsProductionSection;
