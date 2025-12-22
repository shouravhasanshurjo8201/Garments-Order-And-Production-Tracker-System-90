
import { TbAlertCircle } from 'react-icons/tb';
import { HiOutlineHome, HiOutlineArrowLeft } from 'react-icons/hi';
import Button from '../components/Shared/Button/Button';
import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const ErrorPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const errorMessage = state?.message || "Oops! The page you're looking for doesn't exist.";

  useEffect(() => {
    document.title = "404 Error | Garments Production System";
  }, []);

  return (
    <section className="bg-white min-h-screen flex items-center justify-center">
      <div className="container px-6 py-12 mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center max-w-lg mx-auto text-center"
        >
          <div className="relative mb-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="p-4 bg-red-50 rounded-full inline-block"
            >
              <TbAlertCircle className="text-7xl text-red-500" />
            </motion.div>
          </div>

          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-3">
            Something is <span className="text-red-500">Missing.</span>
          </h1>

          <p className="text-gray-500 mb-8 max-w-xs mx-auto leading-relaxed">
            The link might be broken, or the page has been moved. Let's get you back on track.
          </p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full bg-gray-50 border border-dashed border-gray-200 p-6 rounded-xl mb-10 group"
          >
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Technical Details</p>
            <p className="text-gray-700 font-bold italic group-hover:text-red-500 transition-colors">
              "{errorMessage}"
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-sm font-black text-gray-700 uppercase tracking-widest transition-all duration-300 bg-white border-2 border-gray-100 rounded-2xl hover:bg-gray-50 hover:border-gray-300 active:scale-95 gap-2"
            >
              <HiOutlineArrowLeft size={20} className="text-lime-500" />
              Go Back
            </button>

            <div className="w-full sm:w-56 shadow-xl shadow-lime-500/20 rounded-2xl overflow-hidden active:scale-95 transition-transform">
              <Button
                label={
                  <span className="flex items-center justify-center gap-2">
                    <HiOutlineHome size={18} /> Take Me Home
                  </span>
                }
                onClick={() => navigate('/')}
              />
            </div>
          </div>

          <p className="mt-12 text-gray-300 text-[10px] font-bold uppercase tracking-[0.3em]">
            G.O.P.T.S Management System
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ErrorPage;