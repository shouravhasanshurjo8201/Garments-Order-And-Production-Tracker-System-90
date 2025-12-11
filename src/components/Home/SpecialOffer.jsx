// src/components/Home/SpecialOffer.jsx
import { motion } from "framer-motion";
import { Link } from "react-router";

const SpecialOffer = () => {
    return (
        <section className="">
            <div className=" flex flex-col-reverse lg:flex-row items-center gap-10">
                <motion.div
                    className="flex-1 bg-indigo-50 rounded-xl p-10 md:p-12 shadow"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl pt-10 font-extrabold text-green-900 mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-green-600 to-green-400 text-transparent bg-clip-text">
                            Special Offer
                        </span>{" "}
                        Just For You!
                    </h2>
                    <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                        Buy any <span className="font-semibold text-green-700">Indoor Product</span> this week and enjoy
                        <span className="font-bold text-green-600"> 60% OFF</span>.
                        <br />
                        Add premium <span className="text-green-700 font-semibold">Indoor Product</span> and
                        <span className="text-green-700 font-semibold"> enjoy a fresh, peaceful environment </span> every day!
                    </p>
                    <link rel="stylesheet" href="" />
                    <Link to="/products" >
                        <motion.button
                            whileHover={{ scale: 1.07, boxShadow: "0px 8px 20px rgba(0, 128, 0, 0.25)" }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-sm transition-all"
                        >
                            Explore Offers
                        </motion.button>
                    </Link>


                </motion.div>
                <motion.div
                    className="flex-1"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <img
                        src="https://i.postimg.cc/8cMZgG03/images-2-removebg-preview.png"
                        alt="Special Offer Plant"
                        className="rounded-xl h-92 shadow  bg-indigo-50 w-full"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default SpecialOffer;
