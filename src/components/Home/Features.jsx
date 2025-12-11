import { motion } from "framer-motion";
import { ShieldCheck, Clock, ThumbsUp, Users } from "lucide-react";

const features = [
    {
        title: "Trusted by Thousands",
        desc: "We serve customers with honesty and transparency.",
        icon: <Users size={40} className="text-green-600" />,
    },
    {
        title: "Premium Quality Products",
        desc: "We provide the best indoor and outdoor plants with guaranteed freshness.",
        icon: <ShieldCheck size={40} className="text-green-600" />,
    },
    {
        title: "Fast & Safe Delivery",
        desc: "Get your product delivered quickly with safe packaging.",
        icon: <Clock size={40} className="text-green-600" />,
    },
    {
        title: "Customer Satisfaction",
        desc: "Your happiness is our first priority.",
        icon: <ThumbsUp size={40} className="text-green-600" />,
    },
];

const WhyChooseUs = () => {
    return (
        <section className="my-10"> 
            <div className="flex flex-col md:flex-row justify-between items-center gap-5">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, }}
                    className="w-full md:w-8/12   flex justify-center items-center">
                    <img src="https://i.postimg.cc/x8NxdnJ7/why-choose-flat-questions-concept-260nw-2301728081-removebg-preview.png" className="w-full h-92 rounded-xl shadow bg-cyan-50" alt="" />
                </motion.div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            className="bg-cyan-50 p-6 rounded-xl shadow hover:shadow-lg transition text-center"
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="flex justify-center mb  -3">{f.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                            <p className="text-gray-700">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
