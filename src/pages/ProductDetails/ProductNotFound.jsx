
import { TbAlertCircle, TbSearch } from "react-icons/tb";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import Container from "../../components/Shared/Container";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const ProductNotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Product Not Found | G.O.P.T.S.";
  }, []);

  return (
    <Container>
      <div className="min-h-[70vh] flex flex-col justify-center items-center text-center py-20">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-8"
        >
          <div className="absolute inset-0 bg-red-100 rounded-full blur-2xl opacity-50 scale-150 animate-pulse"></div>
          <div className="relative bg-white p-6 rounded-full shadow-xl border border-red-50">
            <TbSearch className="text-7xl text-gray-300" />
            <TbAlertCircle className="text-3xl text-red-500 absolute bottom-4 right-4 bg-white rounded-full" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">
            Item <span className="text-red-500">Not Found</span>
          </h2>
          <p className="text-gray-500 max-w-sm mx-auto leading-relaxed font-medium">
            We couldn't find the product you're looking for. It might have been removed or the ID is incorrect.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => navigate('/products')}
            className="flex items-center justify-center gap-2 bg-gray-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-lime-600 transition-all shadow-lg active:scale-95"
          >
            <HiOutlineArrowNarrowLeft size={20} />
            Back
          </button>

          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 rounded-2xl font-bold text-gray-600 border-2 border-gray-100 hover:bg-gray-50 transition-all active:scale-95"
          >
            Go to Home
          </button>
        </motion.div>

        <p className="mt-16 text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">
          Garments Production Management
        </p>
      </div>
    </Container>
  );
};

export default ProductNotFound;