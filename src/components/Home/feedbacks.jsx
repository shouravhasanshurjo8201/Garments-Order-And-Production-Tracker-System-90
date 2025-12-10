import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const feedbacks = [
    { name: "Ayesha", comment: "Amazing plants, brought positivity to my home!", rating: 5 },
    { name: "Rafiq", comment: "Fast delivery and healthy plants.", rating: 4 },
    { name: "Sohana", comment: "I love the variety and quality!", rating: 5 },
];

const CustomerFeedback = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <section className="mt-5 bg-white">
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <motion.div
                    className="order-2 md:order-1 bg-lime-50 pb-10 px-10 rounded-xl shadow"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-2xl font-bold text-lime-400 text-center my-4">
                        Customer Feedback
                    </h2>

                    <Slider {...settings}>
                        {feedbacks.map((fb, i) => (
                            <motion.div
                                key={i}
                                className="bg-green-100 p-12 rounded-xl shadow text-center"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <p className="text-neutral-700">"{fb.comment}"</p>
                                <h4 className="font-semibold text-lg my-2">{fb.name}</h4>
                                <p>{"⭐".repeat(fb.rating)}</p>
                            </motion.div>
                        ))}
                    </Slider>
                </motion.div>

                <motion.div
                    className="flex justify-center order-1 md:order-2"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <img
                        src="https://i.postimg.cc/pLbkrGCW/download-12-removebg-preview.png"
                        className="w-full h-73 object-contain rounded-xl shadow bg-lime-50"
                        alt=""
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default CustomerFeedback;
