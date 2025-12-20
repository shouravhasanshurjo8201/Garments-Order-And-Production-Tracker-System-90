import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { TbEye, TbTrash, TbAlertCircle } from "react-icons/tb";

const MyOrders = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const email = user?.email || user?.user?.email;
    const [orders, setOrders] = useState([]);
    const [cancelOrderId, setCancelOrderId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "My Orders | Dashboard";
    }, []);

    // Fetch order data
    useEffect(() => {
        if (!email) return;
        setLoading(true);
        axiosSecure
            .get(`/orders?email=${email}`)
            .then(res => {
                setOrders(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Something went wrong while loading orders.");
                setLoading(false);
            });
    }, [axiosSecure, email]);

    // Function to cancel order
    const handleCancel = async () => {
        if (!cancelOrderId) return;
        try {
            await axiosSecure.delete(`/order/${cancelOrderId}`);
            setOrders(prev => prev.filter(order => order._id !== cancelOrderId));
            setCancelOrderId(null);
            toast.success("Order canceled successfully!");
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Failed to cancel order.");
        }
    };

    // Dynamic class generator based on status
    const getStatusClass = (status) => {
        const s = status?.toLowerCase();
        if (s.includes("pending")) return "bg-amber-100 text-amber-700 border-amber-200";
        if (s.includes("process") || s.includes("cut") || s.includes("sew")) return "bg-blue-100 text-blue-700 border-blue-200";
        if (s.includes("ship")) return "bg-purple-100 text-purple-700 border-purple-200";
        if (s.includes("deliver")) return "bg-green-100 text-green-700 border-green-200";
        return "bg-gray-100 text-gray-700 border-gray-200";
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto bg-white min-h-screen rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b pb-6">
                <div>
                    <h2 className="text-3xl font-extrabold  text-lime-600 mb-2">My Orders</h2>
                    <p className="text-gray-500 text-sm mt-1">View the details and status of all your orders here</p>
                </div>
                <div className="bg-lime-50 px-4 py-2 rounded-lg border border-lime-100 text-lime-700 font-bold">
                    Total Orders: {orders.length}
                </div>
            </div>

            {error ? (
                <div className="flex flex-col items-center py-20 text-red-500">
                    <TbAlertCircle size={50} className="mb-2" />
                    <p className="font-medium text-lg">{error}</p>
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-20">
                    <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                         <TbEye size={40} />
                    </div>
                    <p className="text-gray-400 font-medium italic">You haven't placed any orders yet!</p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="table w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-700 border-b border-gray-200 uppercase text-[11px] tracking-widest">
                                <th className="p-4 text-left">Order ID</th>
                                <th className="text-left">Product</th>
                                <th className="text-left">Quantity</th>
                                <th className="text-left">Status</th>
                                <th className="text-left">Payment</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {orders.map(order => (
                                <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 font-mono text-xs text-blue-600 font-bold">#{order._id.slice(-8)}</td>
                                    <td className="font-semibold text-gray-800">{order.product}</td>
                                    <td>
                                        <span className="bg-gray-100 px-2 py-1 rounded text-gray-600 font-bold text-xs">{order.quantity} Pcs</span>
                                    </td>
                                    <td>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${getStatusClass(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${order.paymentStatus === "paid" ? "bg-green-500" : "bg-red-500 animate-pulse"}`}></div>
                                            <span className="text-sm font-medium">{order.paymentStatus === "paid" ? "Paid" : "Unpaid"}</span>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <div className="flex justify-center items-center gap-3">
                                            <button
                                                onClick={() => navigate(`/dashboard/track-order/${order._id}`)}
                                                className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-bold hover:bg-gray-50 text-gray-700 shadow-sm"
                                            >
                                                <TbEye /> View
                                            </button>

                                            {order.status === "Pending" && (
                                                <button
                                                    onClick={() => setCancelOrderId(order._id)}
                                                    className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 border border-red-100 rounded-lg text-xs font-bold hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                                >
                                                    <TbTrash /> Cancel
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Cancel Confirmation Modal */}
            {cancelOrderId && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center  p-4">
                    <div className="bg-white p-8 rounded-2xl w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="text-red-500 bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                             <TbAlertCircle size={40} />
                        </div>
                        <h3 className="text-xl font-black text-gray-800 text-center mb-2">Are you sure?</h3>
                        <p className="text-gray-500 text-center text-sm mb-8 leading-relaxed">
                            Do you really want to cancel this order? This action cannot be undone.
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setCancelOrderId(null)}
                                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all"
                            >
                                Go Back
                            </button>
                            <button
                                onClick={handleCancel}
                                className="flex-1 px-4 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 transition-all"
                            >
                                Yes, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyOrders;