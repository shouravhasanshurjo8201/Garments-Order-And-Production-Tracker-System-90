import { motion } from "framer-motion";
import Container from "../../components/Shared/Container";
import { Link } from "react-router";
import { useEffect } from "react";
import { 
    TbTargetArrow, 
    TbEye, 
    TbUsers, 
    TbTimeline, 
    TbCircleCheck, 
    TbRocket,
    TbSettingsAutomation,
    TbTruckDelivery,
    TbChartBar,
    TbShieldCheck
} from "react-icons/tb";

const About = () => {
    useEffect(() => {
        document.title = "About | Garments Production System";
    }, []);

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <div className="py-16 bg-gray-50/50 overflow-hidden">
            <Container>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                    className="bg-white border border-gray-100 shadow-xl shadow-blue-100/50 p-10 rounded-[2.5rem] mb-16 text-center relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <span className="bg-lime-100 text-lime-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-4 inline-block">
                            Digitalized Workflow
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-6 leading-tight">
                            Garments Order & <br />
                            <span className="text-lime-600 underline decoration-lime-200 decoration-4">Production Tracker System</span>
                        </h2>
                        <p className="text-gray-500 leading-relaxed text-lg max-w-3xl mx-auto">
                            This system is designed to simplify and digitalize the entire garments order
                            and production management process. From receiving customer orders to production
                            tracking, updates, and delivery — everything is handled in a fast, organized,
                            and professional way.
                        </p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {[
                        { label: "Efficiency", value: "99%", icon: <TbChartBar /> },
                        { label: "Real-time Tracking", value: "24/7", icon: <TbTimeline /> },
                        { label: "Secure Data", value: "100%", icon: <TbShieldCheck /> },
                        { label: "Automation", value: "Fast", icon: <TbSettingsAutomation /> },
                    ].map((stat, i) => (
                        <motion.div 
                            key={i} {...fadeInUp} transition={{delay: i * 0.1}}
                            className="bg-white p-6 rounded-3xl border border-gray-100 text-center shadow-sm"
                        >
                            <div className="text-lime-600 text-3xl mb-2 flex justify-center">{stat.icon}</div>
                            <div className="text-2xl font-black text-gray-800">{stat.value}</div>
                            <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <motion.div
                        {...fadeInUp}
                        className="bg-gradient-to-b from-green-50 to-white p-10 rounded-[3rem] shadow-sm border border-green-100 group"
                    >
                        <div className="w-14 h-14 bg-green-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-200 group-hover:rotate-12 transition-transform">
                            <TbTargetArrow size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-gray-800 mb-4">Our Mission</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Our mission is to provide a modern, fast, and secure garments management
                            experience. We want to help factories, managers, and customers by reducing
                            manual work and increasing productivity through automation.
                        </p>
                    </motion.div>

                    <motion.div
                        {...fadeInUp}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-blue-50 to-white p-10 rounded-[3rem] shadow-sm border border-blue-100 group"
                    >
                        <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200 group-hover:rotate-12 transition-transform">
                            <TbEye size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-gray-800 mb-4">Our Vision</h3>
                        <p className="text-gray-600 leading-relaxed">
                            We aim to become a leading digital platform for garments order and production
                            tracking. With constant improvements, we want to support businesses in achieving
                            better workflow, transparency, and customer satisfaction.
                        </p>
                    </motion.div>
                </div>

                <div className="mb-20">
                    <h2 className="text-3xl font-black text-center text-gray-800 mb-12">How Our System Works</h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            { step: "01", title: "Order Placement", text: "Buyers place orders through our secure portal with detailed specifications.", icon: <TbTargetArrow /> },
                            { step: "02", title: "Live Production", text: "Managers update status real-time from cutting to sewing and finishing.", icon: <TbSettingsAutomation /> },
                            { step: "03", title: "Fast Delivery", text: "System automatically tracks shipment and ensures timely delivery to buyers.", icon: <TbTruckDelivery /> }
                        ].map((item, i) => (
                            <motion.div key={i} {...fadeInUp} transition={{delay: i * 0.2}} className="relative text-center group">
                                <div className="text-6xl font-black text-gray-100 absolute -top-10 left-1/2 -translate-x-1/2 group-hover:text-lime-50 transition-colors">{item.step}</div>
                                <div className="relative z-10">
                                    <div className="text-lime-600 text-4xl mb-4 flex justify-center">{item.icon}</div>
                                    <h4 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h4>
                                    <p className="text-gray-500 text-sm">{item.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {[
                        { title: "Our Team", icon: <TbUsers />, text: "A dedicated team of developers and planners ensuring a smooth user experience.", color: "bg-amber-100 text-amber-600" },
                        { title: "Our Accuracy", icon: <TbCircleCheck />, text: "We focus on precision in every data entry to avoid production mismatches.", color: "bg-purple-100 text-purple-600" },
                        { title: "Our Journey", icon: <TbTimeline />, text: "Started with a vision to digitize, now growing with global industry standards.", color: "bg-pink-100 text-pink-600" }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            {...fadeInUp}
                            className="bg-white p-8 rounded-[3rem] shadow-md border border-gray-50 hover:-translate-y-2 transition-all"
                        >
                            <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-6 text-2xl`}>
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-black text-gray-800 mb-3">{item.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{item.text}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    {...fadeInUp}
                    className="bg-lime-700 text-white p-10 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-black mb-10 text-lime-400 text-center md:text-left">Why Choose Our System?</h2>
                        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                "Fast & User-Friendly Interface",
                                "Real-time Production Tracking",
                                "Secure Authentication System",
                                "Role-based Dashboards",
                                "Smooth Data Management",
                                "Fully Mobile Responsive"
                            ].map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-300 font-medium group">
                                    <TbCircleCheck className="text-lime-500 shrink-0 group-hover:scale-125 transition-transform" size={24} />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center mt-20"
                >
                    <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-6 animate-bounce">
                        <TbRocket size={40} className="text-green-500" />
                    </div>
                    <h2 className="text-4xl font-black text-gray-800 mb-4">
                        Ready to Transform Your Workflow?
                    </h2>
                    <p className="text-gray-500 mb-10 max-w-xl mx-auto italic">
                        Check out our products and enjoy a seamless ordering experience with real-time tracking.
                    </p>
                    <Link 
                        to="/products" 
                        className="bg-green-600 text-white px-10 py-4 rounded-2xl shadow-xl shadow-green-100 hover:bg-gray-900 transition-all font-black uppercase text-xs tracking-widest inline-block active:scale-95"
                    >
                        Explore Products
                    </Link>
                </motion.div>
            </Container>
        </div>
    );
};

export default About;