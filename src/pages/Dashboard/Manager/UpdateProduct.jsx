import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";

const UpdateProduct = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axiosSecure.get("/products");
      setProducts(res.data);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const loadUser = async () => {
    try {
      const userRes = await axiosSecure.get(`/user?email=${user.email}`)
      setUserData(userRes.data)
    } catch {
      toast.error("Failed to load User Data");
    }
  };

  useEffect(() => {
    fetchProducts();
    loadUser();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    if (!confirm("Are you sure to delete this product?")) return;
    try {
      await axiosSecure.delete(`/product/${id}`);
      setProducts((prev) => prev.filter(p => p._id !== id));
      toast.success("Deleted!");
    } catch {
      toast.error("Delete failed");
    }
  };

  // Open Update Modal
  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    reset({
      name: product.name,
      category: product.category,
      price: product.price,
      quantity: product.quantity,
      minimumOrder: product.minimumOrder,
      description: product.description,
      image: product.image,
      demoVideo: product.demoVideo || "",
      showOnHome: product.showOnHome,
      features: product.features?.join(",") || "",
      paymentOptions: product.paymentOptions?.join(",") || "",
    });
    setOpenUpdate(true);
  };

  // Handle Update
  const onUpdate = async (data) => {
    try {
      const payload = {
        name: data.name,
        category: data.category,
        price: Number(data.price),
        quantity: Number(data.quantity),
        minimumOrder: Number(data.minimumOrder),
        description: data.description,
        image: data.image,
        demoVideo: data.demoVideo || "",
        showOnHome: data.showOnHome || false,
        features: data.features ? data.features.split(",").map(f => f.trim()) : [],
        paymentOptions: data.paymentOptions ? data.paymentOptions.split(",").map(p => p.trim()) : [],
      };

      await axiosSecure.patch(`/product/${selectedProduct._id}`, payload);
      toast.success("Product updated successfully!");

      setProducts((prev) =>
        prev.map(p => p._id === selectedProduct._id ? { ...p, ...payload } : p)
      );
      setOpenUpdate(false);
    } catch (err) {
      console.error(err);
      toast.error("Update failed!");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border table">
          <thead className="bg-gray-200 ">
            <tr >
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id} className="border-t">
                <td><img src={p.image} className="w-12 h-12 rounded" /></td>
                <td>{p.name}</td>
                <td>{p.price} Tk</td>
                <td>{p.category}</td>
                {userData?.status === "Suspended" ? <td className="text-red-600 text-sm ">Your Account Suspended</td> :
                  <td className="space-x-2">
                    <button onClick={() => openUpdateModal(p)} className="bg-blue-500 text-white px-3 py-1 rounded">Update</button>
                    <button onClick={() => handleDelete(p._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                  </td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* UPDATE MODAL */}
      {openUpdate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded" style={{ width: "580px", maxHeight: "90vh", overflowY: "auto" }}>
            <h2 className="text-xl font-bold text-lime-500 mb-4">Update Product</h2>

            <form onSubmit={handleSubmit(onUpdate)} className="space-y-2">
              <input {...register("name", { required: true })} placeholder="Product Name" className="border p-2 w-full rounded" />
              <textarea {...register("description", { required: true })} placeholder="Description" className="border p-2 w-full rounded" />
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
              <input {...register("quantity", { required: true })} type="number" placeholder="Quantity" className="border p-2 w-full rounded" />
              <input {...register("minimumOrder", { required: true })} type="number" placeholder="Minimum Order" className="border p-2 w-full rounded" />
              <input {...register("image")} placeholder="Image URL" className="border p-2 w-full rounded" />
              <input {...register("demoVideo")} placeholder="Demo Video URL" className="border p-2 w-full rounded" />
              <input {...register("features")} placeholder="Features (comma separated)" className="border p-2 w-full rounded" />
              <input {...register("paymentOptions")} placeholder="Payment Options (comma separated)" className="border p-2 w-full rounded" />
              <label className="flex items-center space-x-2">
                <input type="checkbox" {...register("showOnHome")} />
                <span>Show on Home Page</span>
              </label>
              <div className="flex justify-baseline items-center gap-5">
                <button type="submit" className="bg-lime-500 text-white p-2 w-full rounded">Update</button>
                <button type="button" onClick={() => setOpenUpdate(false)} className="mt-2 w-full bg-gray-300 p-2 rounded">Cancel</button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
