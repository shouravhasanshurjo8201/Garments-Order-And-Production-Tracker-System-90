import { Link } from 'react-router-dom'
import { motion } from "framer-motion";
import { FaEye, FaBoxOpen } from "react-icons/fa";

const Card = ({ product }) => {
  const { name, category, quantity, price, image, _id, description } = product;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className=" border border-gray-500/40 shadow-sm hover:shadow-xl p-4 rounded-2xl flex flex-col h-full transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/4] w-full overflow-hidden rounded-xl bg-gray-100 mb-4">
        <img
          src={image}
          alt={name}
          className="h-full w-full  group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category badge */}
        <div className="absolute top-3 left-3 bg-white/90 text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow">
          {category}
        </div>

        {/* Hover overlay */}
        <Link
          to={`/products/${_id}`}
          className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          <div className="bg-lime-500 text-white p-3 rounded-full shadow-xl">
            <FaEye size={18} />
          </div>
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-2">
        <h3 className="font-bold  text-lg leading-snug line-clamp-1">
          {name}
        </h3>

        {/* Short description */}
        <p className="text-sm text-gray-500 line-clamp-2">
          {description || "High quality garments product with professional manufacturing standards."}
        </p>

        {/* Meta info */}
        <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
          <div className="flex items-center gap-1 font-bold">
            <FaBoxOpen className="text-gray-500" />
            <span className={quantity > 0 ? "text-gray-500" : "text-red-500"}>
              {quantity > 0 ? `${quantity} in stock` : "Out of stock"}
            </span>
          </div>

          <p className="text-lime-600 font-extrabold text-lg">${price}</p>
        </div>
      </div>

      {/* Button */}
      <div className="mt-4">
        <Link
          to={`/products/${_id}`}
          className="w-full flex items-center justify-center gap-2 py-3 bg-lime-600 text-white/70 font-bold rounded-xl hover:bg-lime-500 hover:text-white transition-all duration-300"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default Card;
