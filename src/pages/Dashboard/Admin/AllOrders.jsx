import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useNavigate } from "react-router";

const AdminAllOrders = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

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
                                        onClick={() =>
                                            navigate(`/dashboard/track-order/${order._id}`)
                                        }
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
        </div>
    );
};

export default AdminAllOrders;
