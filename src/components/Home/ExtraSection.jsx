import { motion } from "framer-motion";

const partners = [
    { name: "Google", logo: "https://i.postimg.cc/tTtNTJ2h/download-3-removebg-preview.png" },
    { name: "Amazon", logo: "https://i.postimg.cc/PqJLgx8v/download-15-removebg-preview.png" },
    { name: "Microsoft", logo: "https://i.postimg.cc/FFMj0jkn/download-14-removebg-preview.png" },
    { name: "Meta", logo: "https://i.postimg.cc/s2T2Dcyw/download-2-removebg-preview.png" },
    { name: "Airbnb", logo: "https://i.postimg.cc/KY2TgQ6m/download-13-removebg-preview.png" },
    { name: "Spotify", logo: "https://i.postimg.cc/wM02wnp8/download-1-removebg-preview.png" },
];

const GlobalPartner = () => {
    return (
        <section className="my-5 mt-10">
            <motion.h2
                className="text-3xl font-bold text-lime-500 text-center mb-10"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                 Our Global Partners
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {partners.map((p, i) => (
                    <motion.div
                        key={i}
                        className="bg-pink-50 p-4 rounded-xl shadow flex items-center justify-center hover:shadow-lg transition"
                        initial={{ opacity: 0, scale: 0.7 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                    >
                        <img
                            src={p.logo}
                            alt={p.name}
                            className="w-full h-20 object-contain"
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default GlobalPartner;
