import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import { TbEdit, TbTrash, TbSearch, TbPackage, TbAlertTriangle } from "react-icons/tb";

const UpdateProduct = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { register, handleSubmit, reset } = useForm();

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axiosSecure.get("/products");
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const loadUser = async () => {
    try {
      const userRes = await axiosSecure.get(`/user?email=${user.email}`);
      setUserData(userRes.data);
    } catch {
      toast.error("Failed to load User Data");
    }
  };

  useEffect(() => {
    document.title = "Manage Products | Dashboard";
    fetchProducts();
    loadUser();
  }, [user?.email]);

  // Search Logic
  useEffect(() => {
    const results = products.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  // Delete product
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) return;
    try {
      await axiosSecure.delete(`/product/${id}`);
      setProducts((prev) => prev.filter(p => p._id !== id));
      toast.success("Product removed successfully");
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
      features: product.features?.join(", ") || "",
      paymentOptions: product.paymentOptions?.join(", ") || "",
    });
    setOpenUpdate(true);
  };

  // Handle Update
  const onUpdate = async (data) => {
    try {
      const payload = {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),
        minimumOrder: Number(data.minimumOrder),
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
      toast.error("Update failed!");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen">
      {/* Header & Search Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2">
            <TbPackage className="text-blue-500" /> My Products
          </h2>
          <p className="text-gray-500 text-sm">Manage your inventory and product listings</p>
        </div>

        <div className="relative w-full md:w-96">
          <TbSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or category..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
        <table className="table w-full border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200 uppercase text-[11px] tracking-widest text-gray-600">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Payment Mode</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4">
                    <img src={p.image} alt={p.name} className="w-14 h-14 object-cover rounded-lg border border-gray-100 shadow-sm" />
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-gray-800">{p.name}</p>
                    <p className="text-xs text-blue-500 font-medium">{p.category}</p>
                  </td>
                  <td className="p-4 font-bold text-gray-700">{p.price} <span className="text-xs font-normal">Tk</span></td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {p.paymentOptions?.map((opt, i) => (
                        <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full border border-gray-200 uppercase font-bold">
                          {opt}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    {userData?.status === "Suspended" ? (
                      <div className="flex items-center justify-center gap-1 text-red-500 text-[10px] font-black uppercase bg-red-50 py-1 px-3 rounded-full border border-red-100">
                        <TbAlertTriangle /> Account Suspended
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => openUpdateModal(p)}
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                          title="Edit Product"
                        >
                          <TbEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm"
                          title="Delete Product"
                        >
                          <TbTrash size={18} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-20 text-center text-gray-400 italic font-medium">
                  No products found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* UPDATE MODAL */}
      {openUpdate && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-black text-gray-800">Update Product</h2>
              <p className="text-sm text-gray-500 italic">Editing: {selectedProduct?.name}</p>
            </div>

            <form onSubmit={handleSubmit(onUpdate)} className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Product Name</label>
                  <input {...register("name", { required: true })} className="w-full border border-gray-200 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Category</label>
                  <select {...register("category", { required: true })} className="w-full border border-gray-200 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="Shirt">Shirt</option>
                    <option value="Pant">Pant</option>
                    <option value="Jacket">Jacket</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Description</label>
                <textarea {...register("description", { required: true })} rows="3" className="w-full border border-gray-200 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Price (Tk)</label>
                  <input {...register("price", { required: true })} type="number" className="w-full border border-gray-200 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Stock Qty</label>
                  <input {...register("quantity", { required: true })} type="number" className="w-full border border-gray-200 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Min Order</label>
                  <input {...register("minimumOrder", { required: true })} type="number" className="w-full border border-gray-200 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Image URL</label>
                <input {...register("image")} className="w-full border border-gray-200 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Features & Payment (Comma separated)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input {...register("features")} placeholder="Fast Delivery, Cotton" className="w-full border border-gray-200 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
                    <input {...register("paymentOptions")} placeholder="Cash on Delivery, Bkash" className="w-full border border-gray-200 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-xl">
                <input type="checkbox" {...register("showOnHome")} id="showHome" className="w-4 h-4 text-blue-600" />
                <label htmlFor="showHome" className="text-sm font-bold text-blue-700 cursor-pointer">Display this product on Home Page</label>
              </div>

              <div className="flex gap-4 pt-4 border-t">
                <button type="submit" className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg active:scale-95">
                  Save Changes
                </button>
                <button type="button" onClick={() => setOpenUpdate(false)} className="flex-1 bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 transition-all">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;