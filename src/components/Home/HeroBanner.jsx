
import { motion } from "framer-motion";
import { Link } from "react-router";
import heroImage from "../../assets/images/Production.jpeg";

const HeroBanner = () => {

    return (
        <motion.section
            className="relative rounded flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, }}
        >
            <motion.div className="text-center py-12 w-full bg-black/40 rounded">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                    Welcome to G. O. P. T. S.

                </h1>
                <p className="text-lg md:text-2xl mb-6 text-white">
                    Efficiently Manage Orders, Track Production, And Streamline Your Garment Business.
                </p>
                <Link to="/products" className="bg-lime-600 hover:bg-lime-500 text-white font-semibold py-3 px-6 rounded shadow hover:scale-110 transition">View Products</Link>
            </motion.div>
        </motion.section>
    );
};

export default HeroBanner;
