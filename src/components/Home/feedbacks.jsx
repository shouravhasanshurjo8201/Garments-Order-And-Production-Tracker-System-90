import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HiOutlineChatAlt2, HiBadgeCheck } from "react-icons/hi";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const feedbacks = [
    { 
        name: "Ayesha Rahman", 
        role: "Procurement Manager", 
        company: "Global Trends Ltd.",
        comment: "The bulk quality exceeded our expectations. The production timeline was perfectly maintained and stitching is flawless!", 
        rating: 5 
    },
    { 
        name: "Rafiqul Islam", 
        role: "Retail Chain Owner", 
        company: "Urban Wear",
        comment: "Fast delivery and very transparent communication. Their automated tracking made the whole process stress-free.", 
        rating: 5 
    },
    { 
        name: "Sohana Karim", 
        role: "Fashion Designer", 
        company: "Karim Designs",
        comment: "I love the variety of fabrics and the precision of their production line. Highly recommended for high-end boutique orders.", 
        rating: 4 
    },
];

const CustomerFeedback = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4500,
        fade: true,
        arrows: false,
        appendDots: dots => (
            <div style={{ bottom: "-40px" }}>
                <ul className="flex justify-center gap-2"> {dots} </ul>
            </div>
        ),
        customPaging: i => (
            <div className="w-3 h-3 rounded-full bg-gray-200 hover:bg-lime-400 transition-all duration-300 border border-transparent dot-active:bg-lime-600 dot-active:w-8"></div>
        )
    };

    return (
        <section className="py-5 bg-white overflow-hidden">
            <div className="container mx-auto px-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    <div className="order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="mb-5"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="p-2 bg-lime-100 text-lime-600 rounded-lg">
                                    <HiOutlineChatAlt2 size={24} />
                                </span>
                                <span className="text-sm font-black text-lime-600 uppercase tracking-widest">Success Stories</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                                What Our Global  <span className="text-lime-500 decoration-gray-200">Clients Say</span>
                            </h2>
                        </motion.div>

                        <div className="relative">
                            <FaQuoteLeft className="absolute -top-10 -left-6 text-gray-50 opacity-50" size={120} />
                            
                            <Slider {...settings} className="feedback-slider">
                                {feedbacks.map((fb, i) => (
                                    <div key={i} className="outline-none py-4">
                                        <div className="bg-gray-50/50 backdrop-blur-sm border border-gray-100 p-8 md:p-10 rounded-xl shadow-sm">
                                            <div className="flex gap-1 mb-6">
                                                {[...Array(5)].map((_, idx) => (
                                                    <FaStar key={idx} className={idx < fb.rating ? "text-amber-400" : "text-gray-200"} size={18} />
                                                ))}
                                            </div>

                                            <p className="text-lg  text-gray-600 font-medium leading-relaxed italic mb-8">
                                                "{fb.comment}"
                                            </p>

                                            <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                                                <div className="w-14 h-14 bg-lime-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-lime-200">
                                                    {fb.name[0]}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                                        {fb.name} <HiBadgeCheck className="text-blue-500" />
                                                    </h4>
                                                    <p className="text-xs text-gray-500 font-semibold">{fb.role} @ <span className="text-lime-600">{fb.company}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>

                    <motion.div
                        className="relative order-1 lg:order-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-lime-50 rounded-full -z-10 blur-3xl opacity-60"></div>
                        
                        <div className="relative group">
                            <img
                                src="https://i.postimg.cc/pLbkrGCW/download-12-removebg-preview.png"
                                className="w-full max-w-lg mx-auto transform transition-transform duration-700 group-hover:rotate-2 group-hover:scale-105"
                                alt="Client Success"
                            />

                            <motion.div 
                                animate={{ y: [0, 15, 0] }}
                                transition={{ repeat: Infinity, duration: 4 }}
                                className="absolute top-10 -right-4 bg-white p-4 rounded-2xl shadow border border-gray-50 hidden md:flex items-center gap-3"
                            >
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                    <HiBadgeCheck size={24} />
                                </div>
                                <div className="pr-4">
                                    <p className="text-[10px] font-black text-gray-400 uppercase leading-none mb-1">Status</p>
                                    <p className="text-sm font-bold text-gray-800">Verified Client</p>
                                </div>
                            </motion.div>

                            <motion.div 
                                animate={{ y: [0, -15, 0] }}
                                transition={{ repeat: Infinity, duration: 5 }}
                                className="absolute bottom-10 -left-10 bg-white p-5 rounded-xl shadow-2xl border border-gray-50 flex items-center gap-4"
                            >
                                <div className="w-12 h-12 bg-lime-100 text-lime-600 rounded-full flex items-center justify-center font-black">
                                    4.9
                                </div>
                                <div className="pr-2">
                                    <p className="text-sm font-black text-gray-900">Average Rating</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">From 500+ Reviews</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                </div>
            </div>

            <style>{`
                .feedback-slider .slick-dots li.slick-active div {
                    background-color: #84cc16 !important;
                    width: 30px !important;
                }
            `}</style>
        </section>
    );
};

export default CustomerFeedback;