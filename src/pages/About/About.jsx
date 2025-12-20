import { motion } from "framer-motion";
import Container from "../../components/Shared/Container";
import { Link } from "react-router";
import { useEffect } from "react";

const About = () => {
    useEffect(() => {
        document.title = "About  | Garments Production System";
    }, []);
    return (
        <div className="my-10">
            <Container>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className=" bg-blue-50 shadow-md p-8 rounded-2xl mb-12"
                >
                    <h2 className="text-2xl font-bold text-lime-600 mb-4">
                        Garments Order & Production Tracker System
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-lg">
                        This system is designed to simplify and digitalize the entire garments order
                        and production management process. From receiving customer orders to production
                        tracking, updates, and delivery — everything is handled in a fast, organized,
                        and professional way.
                        <br /><br />
                        Our goal is to make the workflow smooth for both customers and managers by
                        providing an efficient online platform.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-10">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-green-50 p-8 rounded-2xl shadow"
                    >
                        <h3 className="text-2xl font-bold text-green-700 mb-4">Our Mission</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Our mission is to provide a modern, fast, and secure garments management
                            experience. We want to help factories, managers, and customers by reducing
                            manual work and increasing productivity through automation.
                        </p>
                    </motion.div>

                    {/* Vision */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-green-50 p-8 rounded-2xl shadow"
                    >
                        <h3 className="text-2xl font-bold text-green-700 mb-4">Our Vision</h3>
                        <p className="text-gray-700 leading-relaxed">
                            We aim to become a leading digital platform for garments order and production
                            tracking. With constant improvements, we want to support businesses in achieving
                            better workflow, transparency, and customer satisfaction.
                        </p>
                    </motion.div>

                </div>

                <div className="grid md:grid-cols-3 gap-8 mt-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="bg-amber-50 p-8 rounded-2xl shadow-md"
                    >
                        <h3 className="text-2xl font-bold text-green-700 mb-4">Our Team</h3>
                        <p className="text-gray-700 leading-relaxed">
                            We have a dedicated and skilled team working to provide the best digital
                            solutions for the garments industry. From developers to system planners —
                            everyone works together to ensure a smooth user experience.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-amber-50  p-8 rounded-2xl shadow-md"
                    >
                        <h3 className="text-2xl font-bold text-green-700 mb-4">Our Factory</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Our system is specially designed by analyzing real garments factory
                            workflows. We focus on real-time production updates, worker coordination,
                            and order accuracy to support factory teams.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9 }}
                        className="bg-amber-50  p-8 rounded-2xl shadow-md"
                    >
                        <h3 className="text-2xl font-bold text-green-700 mb-4">Our Journey</h3>
                        <p className="text-gray-700 leading-relaxed">
                            We started this project with the mission to digitalize garment management.
                            Step by step, with improvements and user feedback, the system has grown into
                            a complete workflow solution.
                        </p>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="bg-pink-50 shadow-md p-10 rounded-2xl mt-10"
                >
                    <h2 className="text-3xl font-bold text-lime-600 mb-6">Why Choose Our System?</h2>

                    <ul className="grid md:grid-cols-2 gap-4 text-gray-700 text-lg">
                        <li>✔ Fast & User-Friendly Interface</li>
                        <li>✔ Real-time Order & Production Tracking</li>
                        <li>✔ Secure Authentication System</li>
                        <li>✔ Role-based Dashboard (Admin / Manager / Buyer)</li>
                        <li>✔ Smooth Data Management</li>
                        <li>✔ Fully Mobile Responsive</li>
                    </ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mt-12"
                >
                    <h2 className="text-3xl font-bold text-green-500 mb-3">
                        Want to Explore More?
                    </h2>
                    <p className="text-gray-600 mb-6">Check out our products and enjoy smooth ordering experience.</p>
                    <Link to="/products" className="bg-green-600 text-white px-8 py-3 rounded-lg shadow hover:bg-green-700 transition font-semibold">View Products</Link>
                </motion.div>
            </Container>
        </div>
    );
};

export default About;
