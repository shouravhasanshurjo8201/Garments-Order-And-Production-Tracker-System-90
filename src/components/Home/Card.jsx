import { Link } from 'react-router'
import { motion } from "framer-motion";


const Card = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, }}
      className="col-span-1 bg-blue-50 cursor-pointer group shadow-sm p-3 rounded-xl flex flex-col">
      <div className="aspect-square w-full relative overflow-hidden rounded-xl mb-2">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover h-full w-full group-hover:scale-110 transition"
        />
      </div>
      <div className="font-semibold text-lg">{product.name}</div>
      <div className="text-sm text-gray-600">Category: {product.category}</div>
      <div className="text-sm text-gray-600">Quantity: {product.quantity}</div>
      <div className="font-semibold mt-1">Price: ${product.price}</div>
      <Link
        to={`/products/${product._id}`}
        className="mt-2 px-3 py-1 bg-lime-500 text-white hover:font-bold rounded hover:bg-lime-600 text-center"
      >
        View Details
      </Link>
    </motion.div>
  )
}

export default Card
