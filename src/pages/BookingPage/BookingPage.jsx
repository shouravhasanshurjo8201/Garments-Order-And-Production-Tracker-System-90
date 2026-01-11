
import { useLocation, useNavigate } from "react-router";
import Container from "../../components/Shared/Container";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { 
  HiOutlinePhone, 
  HiOutlineLocationMarker, 
  HiOutlineClipboardList, 
  HiOutlineUser, 
  HiOutlineDocumentText,
  HiOutlineCurrencyDollar 
} from "react-icons/hi";
import { motion } from "framer-motion";

const BookingPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { state } = useLocation();
  const navigate = useNavigate();

  const product = state?.product;

  if (!product) return <Container><p className="text-center mt-20 font-bold text-red-500">Product not found!</p></Container>;

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      productId: product._id,
      email: user?.email || "",
      product: product.name,
      price: product.price,
      quantity: product.minimumOrder,
      total: product.price * product.minimumOrder,
      status: "Pending",
      firstName: "",
      lastName: "",
      contact: "",
      address: "",
      notes: ""
    }
  });

  const watchQuantity = watch("quantity");

  useEffect(() => {
    document.title = "Secure Checkout | G.O.P.T.S.";
  }, []);

  useEffect(() => {
    let qty = Number(watchQuantity);
    if (qty < product.minimumOrder) qty = product.minimumOrder;
    if (qty > product.quantity) qty = product.quantity;

    setValue("quantity", qty);
    setValue("total", qty * product.price);
  }, [watchQuantity, product, setValue]);

  const onSubmit = async (data) => {
    const loadingToast = toast.loading("Processing your order...");
    try {
      await axiosSecure.post("/orders", data);
      toast.success("Order Placed Successfully!", { id: loadingToast });
      navigate("/dashboard/my-orders");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Booking failed!", { id: loadingToast });
    }
  };

  return (
    <div className="-mt-16">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto flex flex-col lg:flex-row shadow rounded-[2.5rem] overflow-hidden  border border-gray-500/50"
        >
          
          <div className="flex-1 p-8 md:p-12">
            <div className="mb-10">
              <h2 className="text-3xl font-black flex items-center gap-3">
                <HiOutlineClipboardList className="text-lime-600" /> Complete Booking
              </h2>
              <p className="text-gray-400 mt-2 text-sm">Please provide accurate shipping details for bulk production.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-lime-600 border-b border-lime-100/50 pb-2">1. Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="First Name"
                      {...register("firstName", { required: "First name is required" })}
                      className="w-full  border border-gray-500/50 p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-lime-500 transition shadow-inner"
                    />
                    {errors.firstName && <p className="text-red-500 text-[10px] mt-1 ml-2 font-bold">{errors.firstName.message}</p>}
                  </div>
                  <div className="relative">
                    <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Last Name"
                      {...register("lastName", { required: "Last name is required" })}
                      className="w-full border-gray-500/50 border p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-lime-500 transition shadow-inner"
                    />
                    {errors.lastName && <p className="text-red-500 text-[10px] mt-1 ml-2 font-bold">{errors.lastName.message}</p>}
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-lime-600 border-b border-lime-100/50 pb-2">2. Communication & Shipping</h4>
                <div className="relative">
                  <HiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Contact Number (WhatsApp preferred)"
                    {...register("contact", { required: "Contact number is required" })}
                    className="w-full border-gray-500/50 border p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-lime-500 transition shadow-inner"
                  />
                  {errors.contact && <p className="text-red-500 text-[10px] mt-1 ml-2 font-bold">{errors.contact.message}</p>}
                </div>
                <div className="relative">
                  <HiOutlineLocationMarker className="absolute left-4 top-4 text-gray-400" />
                  <textarea
                    rows="3"
                    placeholder="Complete Delivery Address..."
                    {...register("address", { required: "Address is required" })}
                    className="w-full border-gray-500/50 border p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-lime-500 transition shadow-inner"
                  ></textarea>
                  {errors.address && <p className="text-red-500 text-[10px] mt-1 ml-2 font-bold">{errors.address.message}</p>}
                </div>
              </div>

              <div className="relative pt-4">
                <HiOutlineDocumentText className="absolute left-4 top-4 text-gray-400" />
                <textarea
                  rows="2"
                  placeholder="Additional notes for production or delivery team..."
                  {...register("notes")}
                  className="w-full border-gray-500/50 border p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-lime-500 transition shadow-inner"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-lime-700 text-white py-5 rounded-xl font-black uppercase tracking-widest hover:bg-lime-600 transition-all duration-300 shadow-xl active:scale-[0.98] mt-6"
              >
                Place Final Order
              </button>
            </form>
          </div>

          <div className="w-full lg:w-80  p-8 border-l border-gray-500/50 flex flex-col">
            <h3 className="text-lg font-black mb-8 border-b border-gray-300/50 pb-4">Order Insight</h3>
            
            <div className="space-y-6 flex-row">
              <div className=" p-4 rounded-3xl shadow-sm border border-gray-500/50">
                <p className="text-[10px] font-black text-lime-600 uppercase mb-2">Target Product</p>
                <p className="text-sm font-bold text-gray-700 leading-tight">{product.name}</p>
                <div className="mt-4 flex justify-between items-center text-xs">
                  <span className="text-gray-400">Unit Price</span>
                  <span className="font-bold text-lime-500">${product.price}</span>
                </div>
              </div>

              <div className=" p-4 rounded-3xl shadow-sm border border-gray-500/50">
                <p className="text-[10px] font-black text-lime-600 uppercase mb-3">Adjust Quantity</p>
                <input
                  type="number"
                  {...register("quantity")}
                  className="w-full text-center text-2xl font-black py-2 rounded-xl focus:outline-none border-2 border-transparent focus:border-lime-500"
                />
                <div className="flex justify-between mt-2 text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                  <span>Min: {product.minimumOrder}</span>
                  <span>Max: {product.quantity}</span>
                </div>
              </div>

              <div className="pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className=" font-bold">${watch("total")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Tax/Vat</span>
                  <span className=" font-bold text-xs uppercase italic">Calculated later</span>
                </div>
                <hr className="border-dashed border-gray-200" />
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm font-black  uppercase">Grand Total</span>
                  <span className="text-3xl font-black text-lime-500 tracking-tighter">${watch("total")}</span>
                </div>
              </div>
            </div>

            <div className="mt-10 p-4 bg-lime-300/50 rounded-2xl flex items-center gap-3">
              <HiOutlineCurrencyDollar className="text-lime-700 text-2xl shrink-0" />
              <p className="text-[9px] font-bold text-lime-800 leading-tight uppercase">
                Payment process will be initiated after manager approval.
              </p>
            </div>
          </div>

        </motion.div>
      </Container>
    </div>
  );
};

export default BookingPage;