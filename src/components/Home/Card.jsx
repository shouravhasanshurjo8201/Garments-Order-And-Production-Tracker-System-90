
import { Link } from 'react-router'
import { motion } from "framer-motion";
import { FaEye, FaBoxOpen } from "react-icons/fa";

const Card = ({ product }) => {
  const { name, category, quantity, price, image, _id } = product;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-gray-100 group cursor-pointer shadow-sm hover:shadow-2xl p-4 rounded-3xl flex flex-col transition-all duration-300"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 mb-4">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-md text-gray-800 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
            {category}
          </span>
        </div>

        <Link 
          to={`/products/${_id}`}
          className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          <div className="bg-lime-500 text-white p-4 rounded-full scale-50 group-hover:scale-100 transition-transform duration-300 shadow-xl">
            <FaEye size={20} />
          </div>
        </Link>
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-bold text-gray-800 text-lg leading-tight group-hover:text-lime-600 transition-colors">
            {name}
          </h3>
          <div className="text-right">
             <p className="text-lime-600 font-black text-xl">${price}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
          <div className="flex items-center gap-1">
            <FaBoxOpen className="text-gray-400" />
            <span className={`${quantity > 0 ? 'text-gray-600' : 'text-red-500'}`}>
               {quantity > 0 ? `${quantity} in Stock` : 'Out of Stock'}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <Link
          to={`/products/${_id}`}
          className="w-full flex items-center justify-center gap-2 py-3 bg-gray-50 text-gray-700 font-bold rounded-2xl group-hover:bg-lime-500 group-hover:text-white transition-all duration-300"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default Card;