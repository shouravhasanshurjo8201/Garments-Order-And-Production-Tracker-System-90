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
        <section className="py-8  overflow-hidden">
            <div className="container mx-auto p-2">
                
                <div className="flex flex-col items-center mb-8 text-center">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[11px] font-black uppercase tracking-[0.4em] text-lime-600 mb-3"
                    >
                        Industry Leaders
                    </motion.span>
                    <motion.h2
                        className="text-2xl md:text-3xl font-black text-gray-700 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                    >
                        Our Global Partners
                    </motion.h2>
                    <div className="h-1.5 w-80 bg-lime-400 mt-4 rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
                    {partners.map((p, i) => (
                        <motion.div
                            key={i}
                            className="group relative flex items-center justify-center p-8 bg-gray-50/50 rounded-2xl border border-transparent hover:border-lime-200 hover:bg-white hover:shadow transition-all duration-500"
                            
                            animate={{ 
                                scale: [1, 1.1, 1], 
                            }}
                            transition={{
                                duration: 2,       
                                repeat: Infinity,
                                repeatDelay: 3,      
                                delay: i * 0.2,    
                                ease: "easeInOut"
                            }}
                        >
                            <img
                                src={p.logo}
                                alt={p.name}
                                className="w-full h-12 md:h-14 object-contain filter grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-500"
                            />
                            
                            <div className="absolute inset-x-0 -bottom-2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-6 h-1 bg-lime-500 rounded-full"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GlobalPartner;