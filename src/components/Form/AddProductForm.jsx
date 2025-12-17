import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";

const AddProductForm = ({ onSuccess }) => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Prepare payload according to your backend format
      const payload = {
        name: data.name,
        category: data.category,
        quantity: Number(data.quantity),
        minimumOrder: Number(data.minimumOrder),
        price: Number(data.price),
        description: data.description,
        image: data.image,
        demoVideo: data.demoVideo || "",
        showOnHome: data.showOnHome || false,
        features: data.features ? data.features.split(",").map(f => f.trim()) : [],
        paymentOptions: data.paymentOptions ? data.paymentOptions.split(",").map(p => p.trim()) : [],
      };

      await axiosSecure.post("/products", payload);
      toast.success("Product added successfully!");
      reset();
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-4 border rounded shadow">
      <h2 className="text-xl font-bold text-lime-500">Add New Product</h2>

      <input {...register("name", { required: true })} placeholder="Product Name" className="border p-2 w-full rounded" />
      <textarea {...register("description", { required: true })} placeholder="Product Description" className="border p-2 w-full rounded" />
      
      <select {...register("category", { required: true })} className="border p-2 w-full rounded">
        <option value="">Select Category</option>
        <option value="Shirt">Shirt</option>
        <option value="Pant">Pant</option>
        <option value="Jacket">Jacket</option>
        <option value="Accessories">Accessories</option>
        <option value="Indoor">Indoor</option>
        <option value="Outdoor">Outdoor</option>
      </select>

      <input {...register("price", { required: true })} type="number" placeholder="Price" className="border p-2 w-full rounded" />
      <input {...register("quantity", { required: true })} type="number" placeholder="Available Quantity" className="border p-2 w-full rounded" />
      <input {...register("minimumOrder", { required: true })} type="number" placeholder="Minimum Order Quantity" className="border p-2 w-full rounded" />

      <input {...register("image", { required: true })} placeholder="Image URL" className="border p-2 w-full rounded" />
      <input {...register("demoVideo")} placeholder="Demo Video URL" className="border p-2 w-full rounded" />

      <input {...register("features")} placeholder="Features (comma separated)" className="border p-2 w-full rounded" />
      <input {...register("paymentOptions")} placeholder="Payment Options (comma separated)" className="border p-2 w-full rounded" />

      <label className="flex items-center space-x-2">
        <input type="checkbox" {...register("showOnHome")} />
        <span>Show on Home Page</span>
      </label>

      <button disabled={loading} className="bg-lime-500 text-white p-2 w-full rounded">
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
};

export default AddProductForm;
