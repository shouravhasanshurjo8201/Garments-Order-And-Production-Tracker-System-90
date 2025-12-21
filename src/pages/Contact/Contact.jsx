import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Container from "../../components/Shared/Container";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { 
    FaPhoneAlt, 
    FaEnvelope, 
    FaMapMarkerAlt, 
    FaClock, 
    FaFacebook, 
    FaLinkedin, 
    FaTwitter,
    FaPaperPlane,
    FaHeadset
} from "react-icons/fa";

const Contact = () => {
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        document.title = "Contact | Garments Production System";
        window.scrollTo(0, 0);
    }, []);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        setTimeout(() => {
            console.log(data);
            setLoading(false);
            reset();
            toast.success("Message sent successfully! Our team will contact you soon.");
        }, 1500);
    };

    return (
        <div className="bg-[#fcfdfd] py-12 md:py-20">
            <Container>
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 bg-lime-100 text-lime-700 px-4 py-2 rounded-full text-sm font-bold mb-4"
                    >
                        <FaHeadset /> 24/7 CUSTOMER SUPPORT
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight"
                    >
                        Let’s Build Something <br /> 
                        <span className="text-lime-600 italic">Great Together</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-gray-500 text-lg max-w-2xl mx-auto"
                    >
                        Garments production management niye kono proshno thakle ba collaboration korte chaile amader jante paren.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-3 gap-10 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1 space-y-6"
                    >
                        <div className="bg-white p-8 rounded-[3rem] shadow-xl shadow-gray-100/50 border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-lime-50 rounded-full -mr-16 -mt-16 z-0" />
                            
                            <h2 className="text-2xl font-bold text-gray-800 mb-8 relative z-10">Contact Info</h2>
                            
                            <div className="space-y-8 relative z-10">
                                <ContactInfoItem 
                                    icon={<FaPhoneAlt />} 
                                    color="bg-lime-100 text-lime-600" 
                                    label="Call Us" 
                                    value="+880 1934-567890" 
                                />
                                <ContactInfoItem 
                                    icon={<FaEnvelope />} 
                                    color="bg-blue-100 text-blue-600" 
                                    label="Email Us" 
                                    value="support@gptsystem.com" 
                                />
                                <ContactInfoItem 
                                    icon={<FaMapMarkerAlt />} 
                                    color="bg-orange-100 text-orange-600" 
                                    label="Our Location" 
                                    value="Jamalpur, Dhaka, Bangladesh" 
                                />
                                <ContactInfoItem 
                                    icon={<FaClock />} 
                                    color="bg-purple-100 text-purple-600" 
                                    label="Office Hours" 
                                    value="Sat - Thu (9AM - 7PM)" 
                                />
                            </div>

                            <div className="mt-12 pt-8 border-t border-gray-100">
                                <p className="text-gray-800 font-bold mb-4">Connect with us:</p>
                                <div className="flex gap-4">
                                    <SocialIcon icon={<FaFacebook />} link="#" />
                                    <SocialIcon icon={<FaLinkedin />} link="#" />
                                    <SocialIcon icon={<FaTwitter />} link="#" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2"
                    >
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-gray-200/50 border border-gray-50"
                        >
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                                    <input
                                        {...register("name", { required: "Name is required" })}
                                        className={`w-full bg-gray-50 border-2 ${errors.name ? 'border-red-400' : 'border-gray-50'} p-4 rounded-2xl focus:bg-white focus:border-lime-500 transition-all outline-none`}
                                        placeholder="Type your name"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        defaultValue={user?.email}
                                        {...register("email", { required: "Email is required" })}
                                        className="w-full bg-gray-50 border-2 border-gray-50 p-4 rounded-2xl focus:bg-white focus:border-lime-500 transition-all outline-none"
                                        placeholder="example@mail.com"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Phone Number</label>
                                    <input
                                        {...register("phone")}
                                        className="w-full bg-gray-50 border-2 border-gray-50 p-4 rounded-2xl focus:bg-white focus:border-lime-500 transition-all outline-none"
                                        placeholder="+880 1XXX-XXXXXX"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Subject</label>
                                    <select 
                                        {...register("subject")}
                                        className="w-full bg-gray-50 border-2 border-gray-50 p-4 rounded-2xl focus:bg-white focus:border-lime-500 transition-all outline-none appearance-none"
                                    >
                                        <option value="Production Inquiry">Production Inquiry</option>
                                        <option value="Order Tracking">Order Tracking</option>
                                        <option value="Technical Support">Technical Support</option>
                                        <option value="Feedback">Feedback</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2 mb-8">
                                <label className="text-sm font-bold text-gray-700 ml-1">Message</label>
                                <textarea
                                    rows="5"
                                    {...register("message", { required: "Message is required" })}
                                    className="w-full bg-gray-50 border-2 border-gray-50 p-4 rounded-2xl focus:bg-white focus:border-lime-500 transition-all outline-none resize-none"
                                    placeholder="Tell us how we can help you..."
                                ></textarea>
                                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                            </div>

                            <button
                                disabled={loading}
                                type="submit"
                                className={`w-full ${loading ? 'bg-gray-400' : 'bg-lime-600 hover:bg-gray-500'} text-white py-4 rounded-2xl font-bold transition-all shadow-lg flex items-center justify-center gap-3 group`}
                            >
                                {loading ? (
                                    <span className="animate-pulse">Sending Message...</span>
                                ) : (
                                    <>
                                        Send Message Now 
                                        <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>

                <div className="mt-24 relative">
                    <div className="absolute inset-0 bg-lime-600/5 blur-3xl rounded-full scale-75" />
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="relative rounded-md overflow-hidden border-2 border-white shadow-xl"
                    >
                        <iframe
                            title="location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116833.83187881!2d90.33728812448373!3d23.780887457116773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd"
                            width="100%"
                            height="500"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </motion.div>
                </div>
            </Container>
        </div>
    );
};

const ContactInfoItem = ({ icon, color, label, value }) => (
    <div className="flex items-center gap-5 group">
        <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm`}>
            {icon}
        </div>
        <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{label}</p>
            <p className="text-gray-800 font-extrabold">{value}</p>
        </div>
    </div>
);

const SocialIcon = ({ icon, link }) => (
    <a 
        href={link} 
        className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-500 hover:bg-lime-600 hover:text-white hover:-translate-y-1 transition-all duration-300"
    >
        {icon}
    </a>
);

export default Contact;