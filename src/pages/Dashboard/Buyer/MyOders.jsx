import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

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
    
    // Fetch user orders
    useEffect(() => {
        if (!email) return;
        setLoading(true);
        setError("");
        axiosSecure
            .get(`/orders?email=${email}`)
            .then(res => {
                setOrders(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Failed to load orders");
                setLoading(false);
            });
    }, [axiosSecure, email]);

    // Cancel order
    const handleCancel = async () => {
        if (!cancelOrderId) return;
        try {
            await axiosSecure.delete(`/order/${cancelOrderId}`);
            setOrders(prev => prev.filter(order => order._id !== cancelOrderId));
            setCancelOrderId(null);
            toast.success("Order canceled successfully!");
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Failed to cancel order");
        }
    };

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (error) {
        return <p className="text-center mt-10 text-red-500">{error}</p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl text-center text-lime-500 font-bold mb-4">My Orders</h2>

            <div className="overflow-x-auto">
                <table className="table w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>Order ID</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Payment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.product}</td>
                                <td>{order.quantity}</td>
                                <td>
                                    <span
                                        className={`px-2 py-1 rounded text-sm
                                            ${order.status === "Pending" && "bg-yellow-100 text-yellow-700"}
                                            ${order.status === "Processing" && "bg-blue-100 text-blue-700"}
                                            ${order.status === "Shipped" && "bg-purple-100 text-purple-700"}
                                            ${order.status === "Delivered" && "bg-green-100 text-green-700"}
                                        `}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    {order.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                                </td>
                                <td className="space-x-2">
                                    <button
                                        onClick={() =>
                                            navigate(`/dashboard/track-order/${order._id}`)
                                        }
                                        className="btn btn-sm btn-outline"
                                    >
                                        View
                                    </button>

                                    {order.status === "Pending" && (
                                        <button
                                            onClick={() => setCancelOrderId(order._id)}
                                            className="btn btn-sm btn-error"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {orders.length === 0 && (
                    <p className="text-center mt-6 text-red-500">
                        No orders found
                    </p>
                )}
            </div>

            {/* Cancel Confirmation Modal */}
            {cancelOrderId && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded w-96">
                        <h3 className="text-lg font-semibold mb-4">
                            Are you sure?
                        </h3>
                        <p className="mb-6">
                            Do you really want to cancel this order?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setCancelOrderId(null)}
                                className="btn btn-outline"
                            >
                                No
                            </button>
                            <button
                                onClick={handleCancel}
                                className="btn btn-error"
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
