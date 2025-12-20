import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import TrackingModal from "../../../components/Modal/TrackingModal";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { TbTruckDelivery, TbEye, TbAlertTriangle, TbChecks } from "react-icons/tb";

const ApprovedOrders = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [openTracking, setOpenTracking] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch only Approved orders
    const loadOrders = async () => {
        try {
            const res = await axiosSecure.get("/orders?status=Approved");
            setOrders(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load approved orders");
        }
    };

    // Fetch manager/admin data to check for suspension
    const loadUser = async () => {
        if (!user?.email) return;
        try {
            const userRes = await axiosSecure.get(`/user?email=${user.email}`);
            setUserData(userRes.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        document.title = "Approved Orders | Dashboard";
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([loadOrders(), loadUser()]);
            setLoading(false);
        };
        fetchData();
    }, [axiosSecure, user?.email]);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100 gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2">
                        <TbChecks className="text-lime-500" /> Approved Orders
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">Manage production steps and add tracking updates</p>
                </div>
                <div className="bg-lime-50 px-6 py-2 rounded-full border border-lime-100 text-lime-700 font-bold shadow-sm">
                    Total Approved: {orders.length}
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
                            <th className="p-4 text-left">Approved Date</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {orders.length > 0 ? (
                            orders.map((o) => (
                                <tr key={o._id} className="hover:bg-gray-50/80 transition-colors">
                                    {/* Order ID */}
                                    <td className="p-4 font-mono text-xs text-blue-600 font-bold">
                                        #{o._id.slice(-8)}
                                    </td>
                                    
                                    {/* User Email */}
                                    <td className="p-4">
                                        <span className="text-sm text-gray-700 block max-w-[150px] truncate" title={o.email}>
                                            {o.email}
                                        </span>
                                    </td>

                                    {/* Product Name */}
                                    <td className="p-4 text-sm font-semibold text-gray-800">
                                        {o.product}
                                    </td>

                                    {/* Quantity */}
                                    <td className="p-4 text-center">
                                        <span className="bg-gray-100 px-2 py-1 rounded text-xs font-black text-gray-600">
                                            {o.quantity} Pcs
                                        </span>
                                    </td>

                                    {/* Approved Date */}
                                    <td className="p-4 text-sm text-gray-500">
                                        {o.approvedAt ? new Date(o.approvedAt).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        }) : "N/A"}
                                    </td>

                                    {/* Actions */}
                                    <td className="p-4">
                                        {userData?.status === "Suspended" ? (
                                            <div className="flex items-center justify-center gap-1 text-red-500 text-[10px] font-black uppercase bg-red-50 py-1 px-3 rounded-full border border-red-100">
                                                <TbAlertTriangle /> Suspended
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center gap-3">
                                                <button
                                                    onClick={() => {
                                                        setSelectedOrder(o);
                                                        setOpenTracking(true);
                                                    }}
                                                    title="Add Tracking Update"
                                                    className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-all shadow-md active:scale-95"
                                                >
                                                    <TbTruckDelivery size={18} />
                                                </button>

                                                {/* View Timeline Button */}
                                                <button
                                                    onClick={() => navigate(`/dashboard/track-order/${o._id}`)}
                                                    title="View Full Tracking Timeline"
                                                    className="flex items-center justify-center bg-lime-600 hover:bg-lime-700 text-white p-2 rounded-lg transition-all shadow-md active:scale-95"
                                                >
                                                    <TbEye size={18} />
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
                                        <TbTruckDelivery size={50} className="text-gray-200" />
                                        <p className="text-gray-400 font-medium italic">No approved orders found to track.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Tracking Modal Component */}
            {openTracking && (
                <TrackingModal
                    order={selectedOrder}
                    close={() => {
                        setOpenTracking(false);
                        setSelectedOrder(null);
                    }}
                    reload={loadOrders}
                />
            )}
        </div>
    );
};

export default ApprovedOrders;