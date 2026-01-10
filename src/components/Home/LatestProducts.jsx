import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import Card from './Card';
import CardSkeleton from './CardSkeleton';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Container from '../Shared/Container';

const LatestProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosSecure.get('/latest-products');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [axiosSecure]);

  return (
    <Container>
      <motion.section
        className="py-16" 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Title Section */}
        <div className="flex justify-between items-end mb-10 px-2">
          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight ">
              Latest <span className="text-lime-500">Products</span>
            </h2>
            <div className="h-1.5 w-16 bg-lime-500 mt-3 rounded-full"></div>
          </div>
          
          {/* Desktop Link */}
          <Link 
            to="/products" 
            className="hidden md:flex items-center gap-2 text-lime-600 font-bold hover:text-lime-700 transition-all group"
          >
            View All Products 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {loading ? (
            // Skeleton Loader while fetching
            Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)
          ) : products.length > 0 ? (
            // Render Products
            products.map(product => (
              <Card key={product._id} product={product} />
            ))
          ) : (
            // Empty State
            <div className="col-span-full text-center py-20 text-gray-400 font-medium bg-gray-50 rounded-3xl border-2 border-dashed">
              No products found at the moment.
            </div>
          )}
        </div>

        {/* Mobile View All Button */}
        <div className='flex justify-center mt-12 md:hidden px-4'>
          <Link 
            to="/products" 
            className="w-full text-center bg-lime-500 hover:bg-lime-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-lime-500/20 active:scale-95 transition-all"
          >
            Explore All Products
          </Link>
        </div>
      </motion.section>
    </Container>
  );
};

export default LatestProducts;