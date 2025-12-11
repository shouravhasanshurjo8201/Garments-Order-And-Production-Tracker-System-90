import { useEffect, useState } from 'react'
import Card from './Card'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { Link } from 'react-router'
import { motion } from "framer-motion";

const LatestProducts = () => {
  const axiosSecure = useAxiosSecure()
  const [products, setProducts] = useState([])

  // Fetch Products 
  useEffect(() => {
    axiosSecure
      .get('/latest-products')
      .then(res => {
        setProducts(res.data)
      })
      .catch(err => {
        console.error('Error fetching products:', err)
      })
  }, [axiosSecure])

  return (
    <motion.section className=''
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, }}
    >
      <div className="my-8 ">
        <h2 className="text-4xl font-bold">
          <span className="text-lime-500">Latest Products</span>
        </h2>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.length > 0 &&
          products.map(product => (
            <Card key={product._id} product={product} />
          ))}
      </div>
      <div className='flex justify-center md:justify-end mt-5'>
        <Link to="Products" className="text-lime-500 hover:text-blue-600 text-2xl hover:underline text-center">View All Products</Link>
      </div>
    </motion.section>
  )
}

export default LatestProducts
