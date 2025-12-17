import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const AdminAllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // Load all products
  useEffect(() => {
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
  const handleShowHome = async (id, value) => {
    console.log(id, value);
    
    try {
      await axiosSecure.patch(`/products/show-home/${id}`, {
        showOnHome: value,
      });

      setProducts((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, showOnHome: value } : p
        )
      );

      toast.success("Updated Home visibility");
    } catch {
      toast.error("Update failed");
    }
  };

  // Delete product
  const handleDelete = async () => {
    try {
      await axiosSecure.delete(`/product/${selectedProduct._id}`);
      toast.success("Product deleted");
      setProducts((prev) =>
        prev.filter((p) => p._id !== selectedProduct._id)
      );
      setOpenDelete(false);
    } catch {
      toast.error("Delete failed");
    }
  };

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;
    const updated = {
      name: form.name.value,
      price: form.price.value,
      category: form.category.value,
    };

    try {
      await axiosSecure.patch(
        `/product/${selectedProduct._id}`,
        updated
      );

      toast.success("Product updated");

      setProducts((prev) =>
        prev.map((p) =>
          p._id === selectedProduct._id
            ? { ...p, ...updated }
            : p
        )
      );

      setOpenUpdate(false);
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h2 className="text-2xl text-center text-lime-500 font-bold mb-4">All Products</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-200">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Created By</th>
              <th>Show on Home</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={product.image}
                    className="w-12 h-12 rounded"
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.price} Tk.</td>
                <td>{product.category}</td>
                <td>{product.createdBy}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={product.showOnHome}
                    onChange={(e) =>
                      handleShowHome(
                        product._id,
                        e.target.checked
                      )
                    }
                  />
                </td>
                <td className="space-x-2">
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setOpenUpdate(true);
                    }}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setOpenDelete(true);
                    }}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* UPDATE MODAL */}
      {openUpdate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="font-bold mb-3">Update Product</h3>

            <form onSubmit={handleUpdate}>
              <input
                name="name"
                defaultValue={selectedProduct.name}
                className="border w-full p-2 mb-2"
              />
              <input
                name="price"
                defaultValue={selectedProduct.price}
                className="border w-full p-2 mb-2"
              />
              <input
                name="category"
                defaultValue={selectedProduct.category}
                className="border w-full p-2 mb-3"
              />

              <button className="bg-green-500 text-white px-4 py-2 rounded w-full">
                Save
              </button>
            </form>

            <button
              onClick={() => setOpenUpdate(false)}
              className="mt-2 w-full bg-gray-300 p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {openDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-80">
            <h3 className="font-bold mb-4">
              Are you sure?
            </h3>

            <div className="flex justify-between">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setOpenDelete(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAllProducts;
