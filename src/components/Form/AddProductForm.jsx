import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { TbPhotoPlus, TbVideo, TbAlertTriangle, TbChecks } from "react-icons/tb";

// Job Description Generator Component
const JobDescriptionGenerator = ({ onGenerateSuccess }) => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    department: "",
    skills: "",
    experience: "",
    jobType: "Full-time"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosSecure.post("/generate-job-description", formData);
      if (res.data.success) {
        const description = res.data.description;
        
        if (onGenerateSuccess) {
          onGenerateSuccess(description);
          toast.success("AI Description applied successfully!");
        }
      }
    } catch (error) {
      console.error("Error generating description:", error);
      toast.error(error.response?.data?.error || "Failed to generate description");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-6 p-6 bg-slate-50/60 rounded-[2.5rem] border border-slate-200/60 shadow-inner">
      <h2 className="text-xl md:text-2xl font-black text-center mb-4 tracking-tight">
        AI Job Description <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-600 to-green-500">Generator</span>
      </h2> 

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Job Title *</label>
            <input required type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="e.g., MERN Stack Developer" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-lime-500 bg-white transition-all" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Department / Sector</label>
            <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="e.g., IT, Production" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-lime-500 bg-white transition-all" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Experience Required</label>
            <input type="text" name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g., 2+ Years" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-lime-500 bg-white transition-all" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Job Type</label>
            <select name="jobType" value={formData.jobType} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none cursor-pointer focus:border-lime-500 bg-white transition-all">
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">Required Skills *</label>
          <textarea required name="skills" value={formData.skills} onChange={handleChange} placeholder="React.js, Node.js (comma separated)" rows="2" className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-lime-500 bg-white transition-all"></textarea>
        </div>

        <button type="submit" disabled={loading} className="w-full py-3 bg-linear-to-r from-slate-800 to-slate-900 hover:opacity-95 text-white text-sm font-bold rounded-xl shadow-md transition-all disabled:opacity-50">
          {loading ? "Generating with Gemini..." : "Generate & Autofill Description"}
        </button>
      </form>
    </div>
  );
};

// Main Add Product Form Component
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
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      showOnHome: false,
      paymentOptions: "Cash on Delivery",
      price: "",
      quantity: "",
      minimumOrder: "",
      description: ""
    }
  });

  const imageInput = watch("images");

  useEffect(() => {
    if (imageInput && typeof imageInput === "string") {
      const urls = imageInput
        .split(",")
        .map((url) => url.trim())
        .filter((url) => url.startsWith("http://") || url.startsWith("https://"));
      setImagePreviews(urls);
    } else {
      setImagePreviews([]);
    }
  }, [imageInput]);

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

  const handleAiDescriptionSync = (text) => {
    setValue("description", text, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const cleanedImages = data.images
        .split(",")
        .map((img) => img.trim())
        .filter((img) => img !== "");

      const cleanedFeatures = data.features
        ? data.features.split(",").map((f) => f.trim()).filter((f) => f !== "")
        : [];

      const payload = {
        name: data.name,
        category: data.category,
        quantity: Number(data.quantity),
        minimumOrder: Number(data.minimumOrder),
        price: Number(data.price),
        description: data.description,
        images: cleanedImages, 
        demoVideo: data.demoVideo || "",
        showOnHome: data.showOnHome || false,
        features: cleanedFeatures,
        paymentOptions: [data.paymentOptions], 
        createdBy: user?.email,
        createdAt: new Date(),
      };

      const response = await axiosSecure.post("/products", payload);
      
      if (response.data) {
        toast.success("Product successfully added!");
        reset();
        setImagePreviews([]);
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      console.error("Product creation error:", err);
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

      <JobDescriptionGenerator onGenerateSuccess={handleAiDescriptionSync} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
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
              className={`border p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500 bg-white ${errors.category ? 'border-red-400' : 'border-gray-200'}`}
            >
              <option value="">Select Category</option>
              <option value="Shirt">Shirt</option>
              <option value="Pant">Pant</option>
              <option value="Jacket">Jacket</option>
              <option value="Accessories">Accessories</option>
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
            </select>
            {errors.category && <span className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-1">{errors.category.message}</span>}
          </div>
        </div>

        {/* Row 2: Description */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-gray-600 ml-1">Product Description *</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            placeholder="Enter Product Description or use the AI Generator above"
            rows="6"
            className={`border p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500 ${errors.description ? 'border-red-400' : 'border-gray-200'}`}
          />
          {errors.description && <span className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-1">{errors.description.message}</span>}
        </div>

        {/* Row 3: Pricing & Stock */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-600 ml-1">Price (Tk) *</label>
            <input
              {...register("price", { required: "Price is required", min: { value: 1, message: "Price must be greater than 0" } })}
              type="number"
              placeholder="0"
              className={`border p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500 ${errors.price ? 'border-red-400' : 'border-gray-200'}`}
            />
            {errors.price && <span className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-1">{errors.price.message}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-600 ml-1">Stock Qty *</label>
            <input
              {...register("quantity", { required: "Stock quantity is required", min: { value: 0, message: "Cannot be negative" } })}
              type="number"
              placeholder="Total Units"
              className={`border p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500 ${errors.quantity ? 'border-red-400' : 'border-gray-200'}`}
            />
            {errors.quantity && <span className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-1">{errors.quantity.message}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-600 ml-1">Min Order *</label>
            <input
              {...register("minimumOrder", { required: "Minimum order is required", min: { value: 1, message: "Minimum 1 unit required" } })}
              type="number"
              placeholder="MOQ"
              className={`border p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500 ${errors.minimumOrder ? 'border-red-400' : 'border-gray-200'}`}
            />
            {errors.minimumOrder && <span className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-1">{errors.minimumOrder.message}</span>}
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
              className={`border p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500 ${errors.images ? 'border-red-400' : 'border-gray-200'}`}
            />
            {errors.images && <span className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-1">{errors.images.message}</span>}
            
            <div className="flex flex-wrap gap-2 mt-2 bg-gray-50 p-2 rounded-lg min-h-12.5 items-center">
              {imagePreviews.length > 0 ? (
                imagePreviews.map((url, idx) => (
                  <img key={idx} src={url} alt="Preview" className="w-12 h-12 object-cover rounded-md border border-gray-200" onError={(e) => { e.target.style.display='none' }} />
                ))
              ) : (
                <span className="text-[10px] text-gray-400 pl-1">Valid previews will appear here</span>
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
              className="w-5 h-5 accent-lime-600 cursor-pointer"
            />
            <label htmlFor="showOnHome" className="text-gray-700 font-bold cursor-pointer select-none">
              Featured Product (Show on Home Page)
            </label>
          </div>
          <TbChecks className={watch("showOnHome") ? "text-lime-600" : "text-gray-300"} size={24} />
        </div>

        {/* Action Button */}
        {userData?.status === "Suspended" ? (
          <div className="bg-red-50 border border-red-200 text-red-600 font-black flex items-center justify-center gap-2 p-4 w-full rounded-xl uppercase tracking-wider animate-pulse">
            <TbAlertTriangle size={20} /> Account Suspended
          </div>
        ) : (
          <button
            disabled={loading}
            type="submit"
            className={`w-full font-black py-4 rounded-xl transition-all duration-300 shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 text-white
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-lime-500 hover:bg-lime-600 shadow-lime-500/20'}`}
          >
            {loading ? "Adding Product..." : "Create Product Now"}
          </button>
        )}
      </form>
    </div>
  );
};

export default AddProductForm;




// import { useForm } from "react-hook-form";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import toast from "react-hot-toast";
// import { useEffect, useState } from "react";
// import useAuth from "../../hooks/useAuth";
// import {  TbPhotoPlus, TbVideo, TbAlertTriangle, TbChecks } from "react-icons/tb";

// const AddProductForm = ({ onSuccess }) => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [imagePreviews, setImagePreviews] = useState([]);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     watch,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       showOnHome: false,
//       paymentOptions: "Cash on Delivery"
//     }
//   });

//   const imageInput = watch("images");

//   useEffect(() => {
//     if (imageInput) {
//       const urls = imageInput
//         .split(",")
//         .map((url) => url.trim())
//         .filter((url) => url !== "");
//       setImagePreviews(urls);
//     } else {
//       setImagePreviews([]);
//     }
//   }, [imageInput]);

//   useEffect(() => {
//     if (!user?.email) return;
//     const fetchData = async () => {
//       try {
//         const userRes = await axiosSecure.get(`/user?email=${user.email}`);
//         setUserData(userRes.data);
//       } catch (error) {
//         console.error("User fetch error:", error);
//       }
//     };
//     fetchData();
//   }, [user?.email, axiosSecure]);

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       const payload = {
//         name: data.name,
//         category: data.category,
//         quantity: Number(data.quantity),
//         minimumOrder: Number(data.minimumOrder),
//         price: Number(data.price),
//         description: data.description,
//         images: data.images.split(",").map((img) => img.trim()), 
//         demoVideo: data.demoVideo || "",
//         showOnHome: data.showOnHome || false,
//         features: data.features ? data.features.split(",").map((f) => f.trim()) : [],
//         paymentOptions: [data.paymentOptions], 
//         createdBy: user?.email,
//         createdAt: new Date(),
//       };

//       await axiosSecure.post("/products", payload);
//       toast.success("Product successfully added!");
//       reset();
//       setImagePreviews([]);
//       if (onSuccess) onSuccess(); 
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Failed to add product!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100">
//       {/* Header */}
//       <div className="flex items-center gap-3 mb-8 border-b pb-4">
//         <div>
//           <h2 className="text-3xl font-black text-lime-600 tracking-tight">Add New Product</h2>
//           <p className="text-gray-500 text-sm italic">Create a pro listing for your inventory</p>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* Row 1: Title & Category */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="flex flex-col gap-1">
//             <label className="text-sm font-bold text-gray-600 ml-1">Product Name *</label>
//             <input
//               {...register("name", { required: "Product name is required" })}
//               placeholder="Enter Product Name"
//               className={`border p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500 transition-all ${errors.name ? 'border-red-400' : 'border-gray-200'}`}
//             />
//             {errors.name && <span className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-1">{errors.name.message}</span>}
//           </div>

//           <div className="flex flex-col gap-1">
//             <label className="text-sm font-bold text-gray-600 ml-1">Category *</label>
//             <select
//               {...register("category", { required: "Category is required" })}
//               className="border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500 bg-white"
//             >
//               <option value="">Select Category</option>
//               <option value="Shirt">Shirt</option>
//               <option value="Pant">Pant</option>
//               <option value="Jacket">Jacket</option>
//               <option value="Accessories">Accessories</option>
//               <option value="Indoor">Indoor</option>
//               <option value="Outdoor">Outdoor</option>
//             </select>
//           </div>
//         </div>

//         {/* Row 2: Description */}
//         <div className="flex flex-col gap-1">
//           <label className="text-sm font-bold text-gray-600 ml-1">Product Description *</label>
//           <textarea
//             {...register("description", { required: "Description is required" })}
//             placeholder="Enter Product Description"
//             rows="4"
//             className="border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500"
//           />
//         </div>

//         {/* Row 3: Pricing & Stock */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="flex flex-col gap-1">
//             <label className="text-sm font-bold text-gray-600 ml-1">Price (Tk) *</label>
//             <input
//               {...register("price", { required: true, min: 1 })}
//               type="number"
//               placeholder="0"
//               className="border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500"
//             />
//           </div>
//           <div className="flex flex-col gap-1">
//             <label className="text-sm font-bold text-gray-600 ml-1">Stock Qty *</label>
//             <input
//               {...register("quantity", { required: true, min: 0 })}
//               type="number"
//               placeholder="Total Units"
//               className="border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500"
//             />
//           </div>
//           <div className="flex flex-col gap-1">
//             <label className="text-sm font-bold text-gray-600 ml-1">Min Order *</label>
//             <input
//               {...register("minimumOrder", { required: true, min: 1 })}
//               type="number"
//               placeholder="MOQ"
//               className="border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500"
//             />
//           </div>
//         </div>

//         {/* Row 4: Visuals */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="flex flex-col gap-1">
//             <label className="text-sm font-bold text-gray-600 flex items-center gap-1 ml-1">
//               <TbPhotoPlus className="text-lime-600" /> Images * (Comma separated URLs)
//             </label>
//             <input
//               {...register("images", { required: "At least one image URL is required" })}
//               placeholder="url1, url2, url3"
//               className="border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500"
//             />
//             {/* Image Preview Box */}
//             <div className="flex flex-wrap gap-2 mt-2 bg-gray-50 p-2 rounded-lg">
//               {imagePreviews.length > 0 ? (
//                 imagePreviews.map((url, idx) => (
//                   <img key={idx} src={url} alt="Preview" className="w-12 h-12 object-cover rounded-md border" onError={(e) => { e.target.style.display='none' }} />
//                 ))
//               ) : (
//                 <span className="text-[10px] text-gray-400">Previews will appear here</span>
//               )}
//             </div>
//           </div>
          
//           <div className="flex flex-col gap-1">
//             <label className="text-sm font-bold text-gray-600 flex items-center gap-1 ml-1">
//               <TbVideo className="text-blue-500" /> Demo Video Link
//             </label>
//             <input
//               {...register("demoVideo")}
//               placeholder="YouTube URL"
//               className="border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500"
//             />
//           </div>
//         </div>

//         {/* Row 5: Payment & Features */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="flex flex-col gap-1">
//             <label className="text-sm font-bold text-gray-600 ml-1">Payment Options *</label>
//             <select
//               {...register("paymentOptions", { required: true })}
//               className="border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500 bg-white"
//             >
//               <option value="Cash on Delivery">Cash on Delivery</option>
//               <option value="PayFirst">PayFirst (Advance)</option>
//             </select>
//           </div>
//           <div className="flex flex-col gap-1">
//             <label className="text-sm font-bold text-gray-600 ml-1">Key Features (comma separated)</label>
//             <input
//               {...register("features")}
//               placeholder="100% Cotton, Breathable"
//               className="border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500"
//             />
//           </div>
//         </div>

//         {/* Show on Home Page */}
//         <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between border border-gray-200">
//           <div className="flex items-center space-x-3">
//             <input
//               type="checkbox"
//               id="showOnHome"
//               {...register("showOnHome")}
//               className="w-5 h-5 accent-lime-600"
//             />
//             <label htmlFor="showOnHome" className="text-gray-700 font-bold cursor-pointer">
//               Featured Product (Show on Home Page)
//             </label>
//           </div>
//           <TbChecks className="text-gray-300" size={24} />
//         </div>

//         {/* Action Button */}
//         {userData?.status === "Suspended" ? (
//           <div className="bg-red-50 border border-red-200 text-red-600 font-black flex items-center justify-center gap-2 p-4 w-full rounded-xl uppercase">
//             <TbAlertTriangle size={20} /> Account Suspended
//           </div>
//         ) : (
//           <button
//             disabled={loading}
//             className={`w-full font-black py-4 rounded-xl transition-all duration-300 shadow-lg active:scale-[0.98] flex items-center justify-center gap-2
//               ${loading ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-lime-400 hover:bg-lime-500 text-white'}`}
//           >
//             {loading ? "Adding Product..." : "Create Product Now"}
//           </button>
//         )}
//       </form>
//     </div>
//   );
// };

// export default AddProductForm;