import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const AdminAllOrders = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        document.title = "All Orders | Dashboard";
    }, []);

    // Fetch all orders
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axiosSecure.get("/orders");
            setOrders(res.data);
        } catch (err) {
            toast.error("Failed to load orders");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Filtered & searched orders
    const filteredOrders = orders.filter((order) => {
        const matchesStatus =
            statusFilter === "" || order.status === statusFilter;
        const matchesSearch =
            order.user?.toLowerCase().includes(search.toLowerCase()) ||
            order.product?.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-4">
            <h2 className="text-2xl text-center text-lime-500 font-bold mb-4">
                All Orders
            </h2>

            {/* Search & Filter */}
            <div className="flex flex-wrap justify-between mb-4 gap-2">
                <input
                    type="text"
                    placeholder="Search by user or product"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border px-3 py-2 rounded w-1/2 md:w-1/3"
                />

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border px-3 py-2 rounded w-1/3 md:w-1/6"
                >
                    <option value="">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
                <table className="table w-full border">
                    <thead className="bg-gray-200">
                        <tr>
                            <th>Order ID</th>
                            <th>User</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {filteredOrders.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-4">
                                    No orders found
                                </td>
                            </tr>
                        )}

                        {filteredOrders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user}</td>
                                <td>{order.product}</td>
                                <td>{order.quantity}</td>
                                <td>{order.status}</td>
                                <td className="space-x-2">
                                    <button
                                        onClick={() => setSelectedOrder(order)}
                                        className="px-3 py-1 bg-blue-500 text-white rounded"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
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
        </div>
    );
};

export default AdminAllOrders;
