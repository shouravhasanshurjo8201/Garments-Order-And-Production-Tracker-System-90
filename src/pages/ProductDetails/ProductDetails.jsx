import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineBadgeCheck, HiOutlineCube, HiOutlineTruck, HiChevronLeft,
  HiOutlineShieldCheck, HiOutlineCash
} from "react-icons/hi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

import Container from "../../components/Shared/Container";
import Button from "../../components/Shared/Button/Button";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import ProductNotFound from "./ProductNotFound";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userData, setUserData] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const canOrder = userData?.role === "Buyer";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, userRes] = await Promise.all([
          axiosSecure.get(`/products/${id}`),
          user?.email ? axiosSecure.get(`/user?email=${user.email}`) : Promise.resolve({ data: null })
        ]);
        setProduct(productRes.data);
        setUserData(userRes.data);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, user?.email, axiosSecure]);

  if (loading) return <Container><LoadingSpinner /></Container>;
  if (!product) return <ProductNotFound />;

  const handleOrder = () => {
    navigate(`/products/booking/${product._id}`, { state: { product } });
  };

  return (
    <div className="bg-[#fcfdfd] min-h-screen pb-20">
      <Container>
        <nav className="py-8">
          <Link to="/products" className="group flex items-center gap-2 text-gray-400 hover:text-lime-600 transition-all font-semibold text-sm w-fit">
            <HiChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Return
          </Link>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12">

          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="sticky top-18 bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200/50 p-3 border border-gray-100"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50">
                <img src={product.image} className="w-full h-full object-cover" alt={product.name} />

                <div className="absolute top-5 left-5 flex flex-col gap-2">
                  <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                    {product.category}
                  </span>
                  {product.quantity > 0 ? (
                    <span className="bg-lime-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">In Stock</span>
                  ) : (
                    <span className="bg-red-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Sold Out</span>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 space-y-8">
            <header className="space-y-4">
              <h1 className="text-5xl font-black text-gray-900 leading-[1.1] tracking-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-6 text-sm font-bold text-gray-400">
                <span className="flex items-center gap-1.5"><HiOutlineCube className="text-lime-500" /> ID: {product._id?.slice(-6).toUpperCase()}</span>
                <span className="flex items-center gap-1.5"><MdOutlineProductionQuantityLimits className="text-lime-500" /> Min Order: {product.minimumOrder} Pcs</span>
              </div>
            </header>

            <div className="bg-lime-50 rounded-3xl p-8 flex items-center justify-between border border-lime-100/50">
              <div>
                <p className="text-lime-700 font-black text-xs uppercase tracking-[0.2em] mb-1">Wholesale Unit Price</p>
                <h2 className="text-5xl font-black text-lime-600 tracking-tighter">${product.price}</h2>
              </div>
              <div className="h-12 w-2 bg-lime-200 hidden md:block"></div>
              <div className="text-right hidden md:block">
                <p className="text-lime-700 font-bold text-xs uppercase mb-1">Bulk Value (MOQ)</p>
                <p className="font-black text-gray-700 text-2xl">${(product.price * product.minimumOrder).toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-8 border-b border-gray-100">
                {["description", "specifications"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === tab ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
                      }`}
                  >
                    {tab}
                    {activeTab === tab && <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-1 bg-lime-500 rounded-full" />}
                  </button>
                ))}
              </div>

              <div className="min-h-[120px] py-4">
                <AnimatePresence mode="wait">
                  {activeTab === "description" ? (
                    <motion.p key="desc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-gray-500 leading-relaxed text-lg">
                      {product.description}
                    </motion.p>
                  ) : (
                    <motion.div key="spec" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-2 gap-4">
                      {product.features?.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-600 font-medium bg-gray-50 p-3 rounded-xl">
                          <HiOutlineShieldCheck className="text-lime-500" size={18} /> {f}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { icon: <HiOutlineTruck />, label: "Express Shipping" },
                { icon: <HiOutlineBadgeCheck />, label: "Quality Assured" },
                { icon: <HiOutlineCash />, label: product.paymentOptions || "Secure Payment" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 text-center p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
                  <span className="text-lime-500 text-xl">{item.icon}</span>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{item.label}</span>
                </div>
              ))}
            </div>

            <footer className="pt-8 flex flex-col gap-4">
              {product.quantity === 0 ? (
                <Button disabled label="Restocking Soon" className="w-full  shadow-xl" />
              ) : userData?.status === "Suspended" ? (
                <div className="bg-red-50 p-4 rounded-2xl border border-red-100 text-red-600 text-center text-sm font-bold uppercase tracking-widest">Account Suspended</div>
              ) : canOrder ? (
                <Button label="Order Booking" onClick={handleOrder} className="w-full  shadow-2xl shadow-lime-500/20" />
              ) : (
                <div className="bg-red-600 p-6 rounded-xl shadow-xl">
                  <p className="text-white text-xs font-bold text-center leading-relaxed">
                    Wholesale access is restricted to verified Buyer accounts only.
                  </p>
                  <Link to="/login" className="block text-center mt-3 text-lime-400 font-black uppercase text-xs hover:underline tracking-[0.2em]">Switch to Buyer Account</Link>
                </div>
              )}
              <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Official G.O.P.T.S. Production-Ready Inventory
              </p>
            </footer>
          </div>

        </div>
      </Container>
    </div>
  );
};

export default ProductDetails;