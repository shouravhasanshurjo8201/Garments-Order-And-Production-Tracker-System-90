
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { TbEye, TbSearch, TbFilter, TbX } from "react-icons/tb";

const AdminAllOrders = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        document.title = "All Orders | Dashboard";
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

    // Filtered & searched orders logic
    const filteredOrders = orders.filter((order) => {
        const matchesStatus = statusFilter === "" || order.status === statusFilter;
        const userName = order.user || order.email || "";
        const productName = order.product || order.productName || "";
        
        const matchesSearch =
            userName.toLowerCase().includes(search.toLowerCase()) ||
            productName.toLowerCase().includes(search.toLowerCase());
            
        return matchesStatus && matchesSearch;
    });

    if (loading) return <LoadingSpinner />;

    return (
        <div className=" md:p-5 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm p-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-lime-600">All Orders</h2>
                        <p className="text-gray-500 text-sm">Manage and track all customer purchases</p>
                    </div>

                    {/* Search & Filter Section */}
                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80">
                            <TbSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search user or product..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lime-500 outline-none transition-all"
                            />
                        </div>

                        <div className="relative flex-1 md:w-44">
                            <TbFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lime-500 outline-none bg-white appearance-none cursor-pointer"
                            >
                                <option value="">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="overflow-x-auto border border-gray-100 rounded-xl">
                    <table className="table w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
                            <tr>
                                <th className="p-4">Order ID</th>
                                <th className="p-4">Customer</th>
                                <th className="p-4">Product</th>
                                <th className="p-4 text-center">Quantity</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-10 text-gray-400 italic">
                                        No matching orders found in the records.
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr key={order._id} className="hover:bg-lime-50/30 transition-colors group">
                                        <td className="p-4 font-mono text-xs text-gray-500">#{order._id.slice(-8)}</td>
                                        <td className="p-4 font-medium text-gray-700">{order.user || order.email}</td>
                                        <td className="p-4 text-gray-600">{order.product }</td>
                                        <td className="p-4 text-center font-bold text-gray-800">{order.quantity} Pcs</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider
                                                ${order.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                                                  order.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                                                  'bg-red-100 text-red-700'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-all shadow-md active:scale-95"
                                            >
                                                <TbEye size={16} /> View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Order Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="bg-lime-500 p-6 flex justify-between items-center text-white">
                            <h2 className="text-xl font-black">Order Info</h2>
                            <button onClick={() => setSelectedOrder(null)} className="hover:rotate-90 transition-transform">
                                <TbX size={24} />
                            </button>
                        </div>

                        <div className="p-8 space-y-4 text-gray-700">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-gray-400">Order ID</p>
                                    <p className="font-mono text-sm">{selectedOrder._id}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-gray-400">Order Status</p>
                                    <p className="font-bold text-lime-600">{selectedOrder.status}</p>
                                </div>
                            </div>
                            
                            <hr className="border-gray-100" />
                            
                            <div>
                                <p className="text-[10px] uppercase font-bold text-gray-400">Customer Email</p>
                                <p className="font-medium">{selectedOrder.email}</p>
                            </div>
                            
                            <div>
                                <p className="text-[10px] uppercase font-bold text-gray-400">Product Ordered</p>
                                <p className="font-medium">{selectedOrder.product}</p>
                            </div>

                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-gray-400">Quantity</p>
                                    <p className="text-2xl font-black">{selectedOrder.quantity} Pcs</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] uppercase font-bold text-gray-400">Placed On</p>
                                    <p className="text-sm">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="mt-6 w-full bg-gray-300 hover:bg-gray-400 text-black py-3 rounded-2xl font-bold transition-all"
                            >
                                Done & Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminAllOrders;