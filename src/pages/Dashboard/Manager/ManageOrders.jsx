import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const ManageOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await axiosSecure.get("/orders?status=Pending");
      setOrders(res.data);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  //  Approve Order
  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/orders/${id}`, {
        status: "Approved",
        approvedAt: new Date(),
      });
      setOrders(prev => prev.filter(o => o._id !== id));
      toast.success("Order Approved");
    } catch {
      toast.error("Approve failed");
    }
  };

  //  Reject Order
  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(`/orders/${id}`, {
        status: "Rejected",
      });
      setOrders(prev => prev.filter(o => o._id !== id));
      toast.success("Order Rejected");
    } catch {
      toast.error("Reject failed");
    }
  };

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <>
      <table className="w-full border table">
        <thead className="bg-gray-200">
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Order Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-4">
                No Pending Orders Found.
              </td>
            </tr>
          )}

          {orders.map(o => (
            <tr key={o._id} className="border-t">
              <td className="text-xs">{o._id}</td>
              <td>{o.email}</td>
              <td>{o.productName}</td>
              <td>{o.quantity}</td>
              <td>{new Date(o.createdAt).toLocaleDateString()}</td>
              <td className="space-x-2">
                <button
                  onClick={() => setSelectedOrder(o)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  View
                </button>

                <button
                  onClick={() => handleApprove(o._id)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(o._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/*  View Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-lg">
            <h2 className="text-xl font-bold mb-3 text-lime-600">
              Order Details
            </h2>

            <p><strong>Order ID:</strong> {selectedOrder._id}</p>
            <p><strong>User:</strong> {selectedOrder.email}</p>
            <p><strong>Product:</strong> {selectedOrder.productName}</p>
            <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p>
              <strong>Order Date:</strong>{" "}
              {new Date(selectedOrder.createdAt).toLocaleString()}
            </p>

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 w-full bg-gray-300 p-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageOrders;
