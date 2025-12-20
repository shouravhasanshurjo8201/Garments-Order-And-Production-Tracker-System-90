import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Container from "../../components/Shared/Container";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

const Contact = () => {
    useEffect(() => {
        document.title = "Contact Page | Garments Production System";
    }, []);
    const { user } = useAuth();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        reset();
        toast.success("Successfully Send Message")
    };

    return (
        <div className="my-10">
            <Container>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-extrabold text-lime-600 text-center mb-6"
                >
                    Contact Us
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-8"
                >
                    Have any questions about our Garments Order & Production System?
                    Feel free to reach out — we're here to help!
                </motion.p>

                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="bg-blue-50 p-8 rounded-2xl shadow"
                    >
                        <h2 className="text-2xl font-bold text-green-700 mb-6">Get in Touch</h2>

                        <ul className="space-y-5 text-lg text-gray-700">
                            <li>
                                📞 <span className="font-semibold">Phone:</span> +880 1934-567890
                            </li>
                            <li>
                                📞 <span className="font-semibold">Phone:</span> +880 1834-597830
                            </li>
                            <li>
                                📧 <span className="font-semibold">Email:</span> support@gptsystem.com
                            </li>
                            <li>
                                📍 <span className="font-semibold">Address:</span> Jamalpur, Dhaka, Bangladesh
                            </li>
                            <li>
                                🕒 <span className="font-semibold">Office Hours:</span> 9 AM – 7 PM
                            </li>
                        </ul>

                        <hr className="my-6" />

                        <p className="text-gray-600">
                            Need help with orders, production updates or dashboard access?
                            Our team will get back to you as soon as possible!
                        </p>
                    </motion.div>

                    <motion.form
                        onSubmit={handleSubmit(onSubmit)}
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="bg-blue-50 p-8 rounded-2xl shadow"
                    >
                        <h2 className="text-2xl font-bold text-green-700 mb-6">Send Us a Message</h2>

                        <div className="grid gap-5">

                            <div>
                                <label className="block mb-1 text-gray-700 font-medium">Your Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    {...register("name", { required: "Name is required" })}
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                {errors.name && (
                                    <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-1 text-gray-700 font-medium">Email Address</label>
                                <input
                                    type="email"
                                    readOnly
                                    value={user?.email}
                                    {...register("email")}
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                {errors.email && (
                                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-1 text-gray-700 font-medium">Message</label>
                                <textarea
                                    rows="5"
                                    placeholder="Write your message..."
                                    {...register("message", { required: "Message cannot be empty" })}
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                ></textarea>
                                {errors.message && (
                                    <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
                                )}
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                            >
                                Send Message
                            </motion.button>
                        </div>
                    </motion.form>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mt-16"
                >
                    <h2 className="text-3xl text-center font-bold text-green-700 mb-8">
                        Find Us on Map
                    </h2>

                    <div className="rounded-xl overflow-hidden shadow-xl">
                        <iframe
                            title="location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.7698164690733!2d89.9322374!3d24.9268464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fd7f432d79ab59%3A0xba4e9a6ed6f6682c!2sJamalpur!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                            width="100%"
                            height="300"
                            allowFullScreen=""
                            loading="lazy"
                            className="border-0"
                        ></iframe>
                    </div>
                </motion.div>
            </Container>
        </div>
    );
};

export default Contact;
