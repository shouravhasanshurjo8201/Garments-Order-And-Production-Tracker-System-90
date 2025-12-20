
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import { TbEye, TbCheck, TbX, TbAlertTriangle, TbClipboardList } from "react-icons/tb";

const ManageOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
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

  const loadUser = async () => {
    try {
      const userRes = await axiosSecure.get(`/user?email=${user.email}`);
      setUserData(userRes.data);
    } catch {
      toast.error("Failed to load User Data");
    }
  };

  useEffect(() => {
    document.title = "Manage Orders | Dashboard";
    fetchOrders();
    loadUser();
  }, [user?.email]);

  // Approve Order
  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/orders/${id}`, {
        status: "Approved",
        approvedAt: new Date(),
      });
      setOrders((prev) => prev.filter((o) => o._id !== id));
      toast.success("Order Approved Successfully");
    } catch {
      toast.error("Approve failed");
    }
  };

  // Reject Order
  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(`/orders/${id}`, {
        status: "Rejected",
      });
      setOrders((prev) => prev.filter((o) => o._id !== id));
      toast.success("Order Rejected");
    } catch {
      toast.error("Reject failed");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-lime-600 flex items-center gap-2">
            <TbClipboardList className="text-amber-500" /> Pending Approval
          </h2>
          <p className="text-gray-500 text-sm mt-1">Review and approve incoming order requests</p>
        </div>
        <div className="bg-amber-50 px-6 py-2 rounded-full border border-amber-100 text-amber-700 font-bold shadow-sm">
          Pending: {orders.length}
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
        <table className="table w-full border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200 uppercase text-[11px] tracking-widest text-gray-600">
            <tr>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-center">Quantity</th>
              <th className="p-4 text-left">Order Date</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {orders.length > 0 ? (
              orders.map((o) => (
                <tr key={o._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-mono text-xs text-blue-600 font-bold">
                    #{o._id.slice(-8)}
                  </td>
                  <td className="p-4 text-sm text-gray-700">{o.email}</td>
                  <td className="p-4 text-sm font-semibold text-gray-800">{o.product}</td>
                  <td className="p-4 text-center">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs font-black text-gray-600">
                      {o.quantity} Pcs
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(o.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-4">
                    {userData?.status === "Suspended" ? (
                      <div className="flex items-center justify-center gap-1 text-red-500 text-[10px] font-black uppercase bg-red-50 py-1 px-3 rounded-full border border-red-100">
                        <TbAlertTriangle /> Account Suspended
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedOrder(o)}
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                          title="View Details"
                        >
                          <TbEye size={18} />
                        </button>
                        <button
                          onClick={() => handleApprove(o._id)}
                          className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all shadow-sm"
                          title="Approve Order"
                        >
                          <TbCheck size={18} />
                        </button>
                        <button
                          onClick={() => handleReject(o._id)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm"
                          title="Reject Order"
                        >
                          <TbX size={18} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-20 text-center">
                   <div className="flex flex-col items-center gap-2">
                    <TbClipboardList size={50} className="text-gray-200" />
                    <p className="text-gray-400 font-medium italic">No pending orders to review.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-black mb-6 text-lime-600 border-b pb-4">
              Order Details
            </h2>

            <div className="space-y-4 text-gray-700">
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="font-bold text-gray-500">Order ID:</span>
                <span className="font-mono text-blue-600">{selectedOrder._id}</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="font-bold text-gray-500">User Email:</span>
                <span>{selectedOrder.email}</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="font-bold text-gray-500">Product:</span>
                <span className="font-semibold">{selectedOrder.product}</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="font-bold text-gray-500">Quantity:</span>
                <span className="bg-gray-100 px-2 py-0.5 rounded font-bold">{selectedOrder.quantity} Pcs</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="font-bold text-gray-500">Order Date:</span>
                <span>{new Date(selectedOrder.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-gray-500">Initial Status:</span>
                <span className="text-amber-600 font-bold uppercase text-xs bg-amber-50 px-2 py-1 rounded border border-amber-100">
                    {selectedOrder.status}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-8 w-full bg-gray-400 text-white font-bold py-3 rounded-xl hover:bg-gray-600 transition-all shadow-lg"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;