
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { TbEdit, TbTrash, TbHomeCheck, TbHomeX, TbX, TbAlertCircle } from "react-icons/tb";

const AdminAllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    document.title = "Manage Products | Dashboard";
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axiosSecure.get("/products");
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // Show on Home toggle
  const handleShowHome = async (id, currentStatus) => {
    const newValue = !currentStatus;
    try {
      await axiosSecure.patch(`/products/show-home/${id}`, {
        showOnHome: newValue,
      });

      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, showOnHome: newValue } : p))
      );
      toast.success(newValue ? "Added to Home Page" : "Removed from Home Page");
    } catch {
      toast.error("Status update failed");
    }
  };

  // Delete product
  const handleDelete = async () => {
    try {
      await axiosSecure.delete(`/product/${selectedProduct._id}`);
      toast.success("Product permanent deleted");
      setProducts((prev) => prev.filter((p) => p._id !== selectedProduct._id));
      setOpenDelete(false);
    } catch {
      toast.error("Delete failed");
    }
  };

  // Full Update Handler
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    const updated = {
      name: form.name.value,
      price: Number(form.price.value),
      category: form.category.value,
      description: form.description.value,
      images: form.images.value.split(",").map(img => img.trim()),
      demoVideo: form.demoVideo.value,
      paymentOptions: form.paymentOptions.value.split(",").map(p => p.trim()),
    };

    try {
      await axiosSecure.patch(`/product/${selectedProduct._id}`, updated);
      toast.success("Product details updated");
      fetchProducts(); 
      setOpenUpdate(false);
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black text-lime-600">All Products</h2>
          <span className="bg-lime-100 text-lime-700 px-4 py-1 rounded-full text-sm font-bold">
            Total: {products.length} Products
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="table w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-xs font-black uppercase tracking-widest">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Listed By</th>
                <th className="p-4 text-center">Home Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images?.[0] || product.image}
                        className="w-12 h-12 rounded-lg object-cover shadow-sm"
                        alt="prod"
                      />
                      <span className="font-bold text-gray-700 truncate max-w-[150px]">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-500">{product.category}</td>
                  <td className="p-4 font-black text-lime-600">{product.price} Tk</td>
                  <td className="p-4 text-xs text-gray-400">{product.createdBy || "Admin"}</td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => handleShowHome(product._id, product.showOnHome)}
                      className={`p-2 rounded-full transition-all ${product.showOnHome ? 'text-lime-500 bg-lime-50' : 'text-gray-300 bg-gray-50 hover:bg-gray-100'}`}
                    >
                      {product.showOnHome ? <TbHomeCheck size={24} /> : <TbHomeX size={24} />}
                    </button>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => { setSelectedProduct(product); setOpenUpdate(true); }}
                      className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                    >
                      <TbEdit size={18} />
                    </button>
                    <button
                      onClick={() => { setSelectedProduct(product); setOpenDelete(true); }}
                      className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm"
                    >
                      <TbTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAILED UPDATE MODAL */}
      {openUpdate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="bg-lime-600 text-white p-6 flex justify-between items-center">
              <h3 className="text-xl font-black ">Modify Product Info</h3>
              <button onClick={() => setOpenUpdate(false)}><TbX size={24}/></button>
            </div>
            
            <form onSubmit={handleUpdate} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-[70vh]">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Product Name</label>
                <input name="name" defaultValue={selectedProduct.name} className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500" required />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Price (Tk)</label>
                <input name="price" type="number" defaultValue={selectedProduct.price} className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500" required />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Category</label>
                <select name="category" defaultValue={selectedProduct.category} className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500 bg-white">
                  <option value="Shirt">Shirt</option>
                  <option value="Pant">Pant</option>
                  <option value="Jacket">Jacket</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Demo Video URL</label>
                <input name="demoVideo" defaultValue={selectedProduct.demoVideo} className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500" />
              </div>
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Description</label>
                <textarea name="description" defaultValue={selectedProduct.description} className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500" rows="3"></textarea>
              </div>
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Image URLs (comma separated)</label>
                <input name="images" defaultValue={selectedProduct.images?.join(", ")} className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500 font-mono text-xs" />
              </div>
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Payment Options (comma separated)</label>
                <input name="paymentOptions" defaultValue={selectedProduct.paymentOptions?.join(", ")} className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-lime-500" />
              </div>

              <div className="md:col-span-2 pt-4">
                <button className="bg-lime-500 hover:bg-lime-600 text-white font-black py-4 w-full rounded-2xl transition-all shadow-lg shadow-lime-100">
                   Updates 
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRMATION DELETE MODAL */}
      {openDelete && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl w-full max-w-sm text-center shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <TbAlertCircle size={44} />
            </div>
            <h3 className="text-2xl font-black text-gray-800 mb-2">Are you sure?</h3>
            <p className="text-gray-500 text-sm mb-8">This action is irreversible. The product data will be wiped from servers.</p>

            <div className="flex gap-3">
              <button onClick={() => setOpenDelete(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3 rounded-xl transition-all">
                Keep Product
              </button>
              <button onClick={handleDelete} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-red-100">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAllProducts;