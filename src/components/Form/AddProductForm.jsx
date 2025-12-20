import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import {  TbPhotoPlus, TbVideo, TbAlertTriangle, TbChecks } from "react-icons/tb";

const AddProductForm = ({ onSuccess }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      showOnHome: false,
      paymentOptions: "Cash on Delivery"
    }
  });

  // ইমেজ ইনপুট ফিল্ড ওয়াচ করা হচ্ছে প্রিভিউ দেখানোর জন্য
  const imageInput = watch("images");

  useEffect(() => {
    if (imageInput) {
      const urls = imageInput
        .split(",")
        .map((url) => url.trim())
        .filter((url) => url !== "");
      setImagePreviews(urls);
    } else {
      setImagePreviews([]);
    }
  }, [imageInput]);

  // ইউজার ডাটা লোড করা (সাসপেন্ডেড কি না চেক করার জন্য)
  useEffect(() => {
    if (!user?.email) return;
    const fetchData = async () => {
      try {
        const userRes = await axiosSecure.get(`/user?email=${user.email}`);
        setUserData(userRes.data);
      } catch (error) {
        console.error("User fetch error:", error);
      }
    };
    fetchData();
  }, [user?.email, axiosSecure]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        name: data.name,
        category: data.category,
        quantity: Number(data.quantity),
        minimumOrder: Number(data.minimumOrder),
        price: Number(data.price),
        description: data.description,
        images: data.images.split(",").map((img) => img.trim()), // স্ট্রিং থেকে অ্যারে করা হচ্ছে
        demoVideo: data.demoVideo || "",
        showOnHome: data.showOnHome || false,
        features: data.features ? data.features.split(",").map((f) => f.trim()) : [],
        paymentOptions: [data.paymentOptions], // ড্রপডাউন থেকে ভ্যালু নেওয়া হচ্ছে
        createdBy: user?.email,
        createdAt: new Date(),
      };

      await axiosSecure.post("/products", payload);
      toast.success("Product successfully added!");
      reset();
      setImagePreviews([]);
      if (onSuccess) onSuccess(); // যদি কোনো সাকসেস হ্যান্ডলার থাকে
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add product!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 border-b pb-4">
        <div>
          <h2 className="text-3xl font-black text-lime-600 tracking-tight">Add New Product</h2>
          <p className="text-gray-500 text-sm italic">Create a pro listing for your inventory</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Row 1: Title & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-600 ml-1">Product Name *</label>
            <input
              {...register("name", { required: "Product name is required" })}
              placeholder="Enter Product Name"
              className={`border p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500 transition-all ${errors.name ? 'border-red-400' : 'border-gray-200'}`}
            />
            {errors.name && <span className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-1">{errors.name.message}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-600 ml-1">Category *</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500 bg-white"
            >
              <option value="">Select Category</option>
              <option value="Shirt">Shirt</option>
              <option value="Pant">Pant</option>
              <option value="Jacket">Jacket</option>
              <option value="Accessories">Accessories</option>
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
            </select>
          </div>
        </div>

        {/* Row 2: Description */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-gray-600 ml-1">Product Description *</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            placeholder="Enter Product Description"
            rows="4"
            className="border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500"
          />
        </div>

        {/* Row 3: Pricing & Stock */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-600 ml-1">Price (Tk) *</label>
            <input
              {...register("price", { required: true, min: 1 })}
              type="number"
              placeholder="0"
              className="border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-600 ml-1">Stock Qty *</label>
            <input
              {...register("quantity", { required: true, min: 0 })}
              type="number"
              placeholder="Total Units"
              className="border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-600 ml-1">Min Order *</label>
            <input
              {...register("minimumOrder", { required: true, min: 1 })}
              type="number"
              placeholder="MOQ"
              className="border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>
        </div>

        {/* Row 4: Visuals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-600 flex items-center gap-1 ml-1">
              <TbPhotoPlus className="text-lime-600" /> Images * (Comma separated URLs)
            </label>
            <input
              {...register("images", { required: "At least one image URL is required" })}
              placeholder="url1, url2, url3"
              className="border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500"
            />
            {/* Image Preview Box */}
            <div className="flex flex-wrap gap-2 mt-2 bg-gray-50 p-2 rounded-lg">
              {imagePreviews.length > 0 ? (
                imagePreviews.map((url, idx) => (
                  <img key={idx} src={url} alt="Preview" className="w-12 h-12 object-cover rounded-md border" onError={(e) => { e.target.style.display='none' }} />
                ))
              ) : (
                <span className="text-[10px] text-gray-400">Previews will appear here</span>
              )}
            </div>
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-600 flex items-center gap-1 ml-1">
              <TbVideo className="text-blue-500" /> Demo Video Link
            </label>
            <input
              {...register("demoVideo")}
              placeholder="YouTube URL"
              className="border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>
        </div>

        {/* Row 5: Payment & Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-600 ml-1">Payment Options *</label>
            <select
              {...register("paymentOptions", { required: true })}
              className="border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500 bg-white"
            >
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="PayFirst">PayFirst (Advance)</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-600 ml-1">Key Features (comma separated)</label>
            <input
              {...register("features")}
              placeholder="100% Cotton, Breathable"
              className="border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>
        </div>

        {/* Show on Home Page */}
        <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between border border-gray-200">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="showOnHome"
              {...register("showOnHome")}
              className="w-5 h-5 accent-lime-600"
            />
            <label htmlFor="showOnHome" className="text-gray-700 font-bold cursor-pointer">
              Featured Product (Show on Home Page)
            </label>
          </div>
          <TbChecks className="text-gray-300" size={24} />
        </div>

        {/* Action Button */}
        {userData?.status === "Suspended" ? (
          <div className="bg-red-50 border border-red-200 text-red-600 font-black flex items-center justify-center gap-2 p-4 w-full rounded-xl uppercase">
            <TbAlertTriangle size={20} /> Account Suspended
          </div>
        ) : (
          <button
            disabled={loading}
            className={`w-full font-black py-4 rounded-xl transition-all duration-300 shadow-lg active:scale-[0.98] flex items-center justify-center gap-2
              ${loading ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-lime-400 hover:bg-lime-500 text-white'}`}
          >
            {loading ? "Adding Product..." : "Create Product Now"}
          </button>
        )}
      </form>
    </div>
  );
};

export default AddProductForm;