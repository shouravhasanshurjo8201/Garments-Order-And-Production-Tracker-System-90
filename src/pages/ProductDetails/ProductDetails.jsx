import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineBadgeCheck, HiOutlineCube, HiOutlineTruck, HiChevronLeft,
  HiOutlineShieldCheck, HiOutlineCash, HiStar, HiOutlineShoppingBag
} from "react-icons/hi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import Container from "../../components/Shared/Container";
import Button from "../../components/Shared/Button/Button";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import ProductNotFound from "./ProductNotFound";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Card from "../../components/Home/Card";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userData, setUserData] = useState(null);
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeImage, setActiveImage] = useState(0);
  const canOrder = userData?.role === "Buyer";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productRes = await axiosSecure.get(`/products/${id}`);
        setProduct(productRes.data);

        if (user?.email) {
          const userRes = await axiosSecure.get(`/user?email=${user.email}`);
          setUserData(userRes.data);
        }

        const relatedRes = await axiosSecure.get(`/products?category=${productRes.data.category}`);
        setRelated(relatedRes.data?.filter(p => p._id !== id).slice(0, 4));
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [id, user?.email, axiosSecure]);

  if (loading) return <div className="min-h-[80vh] flex items-center justify-center"><LoadingSpinner /></div>;
  if (!product) return <ProductNotFound />;

  const images = product.images?.length ? product.images : [product.image];

  return (
    <div className="-mt-20 overflow-x-hidden">
      <Container>
        <nav className="py-6">
          <Link to="/products" className="group flex items-center gap-2 text-gray-400 hover:text-lime-600 transition-all font-semibold text-sm">
            <HiChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Collection
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:gap-12 items-start ">
          <div className="space-y-4 ">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square rounded-2xl  overflow-hidden border border-gray-500/50 shadow shadow-gray-200/50"
            >
              <img
                src={images[activeImage]}
                className="w-full h-full transition-transform duration-700 hover:scale-110"
                alt={product.name}
              />
            </motion.div>

            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-14 h-16 sm:w-16 sm:h-20 rounded-2xl overflow-hidden border-2 transition-all ${activeImage === i ? "border-lime-500 scale-105" : "border-transparent opacity-60 hover:opacity-100"}`}
                  >
                    <img src={img} className="w-full h-full" alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-8">
            <header className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-black leading-tight">
                {product.name}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-gray-400">
                <span className="flex items-center gap-1.5"><HiOutlineCube className="text-lime-500" /> ID: {product._id.toUpperCase()}</span>
                <span className="flex items-center gap-1.5"><MdOutlineProductionQuantityLimits className="text-lime-500" /> MOQ: {product.minimumOrder} Pcs</span>
                <span className="flex items-center gap-1.5"><HiStar className="text-yellow-400" /> 4.8 (24 Reviews)</span>
              </div>
            </header>

            {/* Price Card */}
            <div className=" rounded-3xl p-8 flex items-center justify-between border border-lime-100/50 shadow-sm">
              <div>
                <p className="text-lime-700 font-black text-xs uppercase tracking-[0.2em] mb-1 text-nowrap">Wholesale Price</p>
                <h2 className="text-5xl font-black text-lime-600 tracking-tighter">${product.price}</h2>
              </div>
              <div className="text-right hidden sm:block border-l-2 border-lime-200 pl-8">
                <p className="text-gray-500 font-bold text-xs uppercase mb-1">Estimated Bulk</p>
                <p className="font-black text-gray-500 text-2xl">${(product.price * product.minimumOrder).toLocaleString()}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {product.quantity === 0 ? (
                <Button disabled label="Restocking Soon" className="w-full py-5 opacity-50" />
              ) : userData?.status === "Suspended" ? (
                <div className="bg-red-50 p-4 rounded-2xl border border-red-100 text-red-600 text-center text-sm font-bold uppercase tracking-widest italic">Access Restricted: Account Suspended</div>
              ) : canOrder ? (
                <Button
                  label="Place Order Booking"
                  icon={HiOutlineShoppingBag}
                  onClick={() => navigate(`/products/booking/${product._id}`, { state: { product } })}
                  className="w-full py-5 shadow-2xl shadow-lime-500/20"
                />
              ) : (
                <div className="bg-gray-900 p-6 rounded-xl shadow-xl">
                  <p className="text-white text-xs font-bold text-center leading-relaxed">
                    Wholesale pricing & booking is restricted to <span className="text-lime-400">Verified Buyers</span> only.
                  </p>
                  <Link to="/login" className="block text-center mt-3 text-lime-400 font-black uppercase text-xs hover:underline tracking-widest">Login as Buyer</Link>
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <HiOutlineTruck />, label: "Express Shipping" },
                { icon: <HiOutlineShieldCheck />, label: "SGS Verified" },
                { icon: <HiOutlineCash />, label: "Secure Escrow" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 text-center p-3 rounded-2xl  border border-gray-500/50">
                  <span className="text-lime-500 text-xl">{item.icon}</span>
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <div className="flex gap-10 border-b border-gray-500/50 mb-5 py-2">
                {["overview", "specifications", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === tab ? "text-gray-500" : "text-gray-400 hover:text-gray-600"
                      }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-lime-500 rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[200px]">
                <AnimatePresence mode="wait">
                  {activeTab === "overview" && (
                    <motion.div key="ov" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-4xl">
                      <p className="text-gray-500 leading-relaxed text-lg whitespace-pre-line">{product.description}</p>
                    </motion.div>
                  )}

                  {activeTab === "specifications" && (
                    <motion.div key="sp" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid md:grid-cols-2 gap-4">
                      {product.features?.map((f, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-gray-600 font-bold  p-4 rounded-2xl border border-gray-500/50 shadow-sm">
                          <HiOutlineBadgeCheck className="text-lime-500" size={22} /> {f}
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === "reviews" && (
                    <motion.div key="rv" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                      {product.reviews?.length > 0 ? (
                        product.reviews.map((r, i) => (
                          <div key={i} className=" p-6 rounded-2xl border border-gray-500/50 shadow-sm">
                            <div className="flex items-center gap-1 text-yellow-400 mb-2">
                              {[...Array(5)].map((_, i) => <HiStar key={i} />)}
                            </div>
                            <p className="font-black text-gray-800">{r.name || "Verified Buyer"}</p>
                            <p className="text-gray-500 mt-1 italic">"{r.comment}"</p>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-10  rounded-3xl border-2 border-dashed border-gray-500/50">
                          <p className="text-gray-400 font-bold uppercase tracking-widest">No reviews for this product yet.</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {related.length > 0 && (
          <div className="mt-5">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-black">Related <span className="text-lime-500">Items</span></h2>
                <p className="text-gray-400 font-bold text-sm">You might also be interested in these products</p>
              </div>
              <Link to="/products" className="text-lime-600 font-black text-xs uppercase border-b-2 border-lime-500 pb-1">View All</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(p => (
                <Card key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ProductDetails;
