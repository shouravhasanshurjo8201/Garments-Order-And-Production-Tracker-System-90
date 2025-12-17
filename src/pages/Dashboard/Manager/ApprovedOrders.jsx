import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import TrackingModal from "../../../components/Modal/TrackingModal";

const ApprovedOrders = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [openTracking, setOpenTracking] = useState(false);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const res = await axiosSecure.get("/orders?status=Approved");
            setOrders(res.data);
        } catch {
            toast.error("Failed to load approved orders");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl text-center font-bold text-lime-500 mb-4">
                Approved Orders
            </h2>

            <table className="w-full border table">
                <thead className="bg-gray-200">
                    <tr>
                        <th>Order ID</th>
                        <th>User</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Approved Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map(o => (
                        <tr key={o._id} className="border-t">
                            <td>{o._id}</td>
                            <td>{o.email}</td>
                            <td>{o.productName}</td>
                            <td>{o.quantity}</td>
                            <td>{new Date(o.approvedAt).toLocaleDateString()}</td>
                            <td className="space-x-2">
                                <button
                                    onClick={() => {
                                        setSelectedOrder(o);
                                        setOpenTracking(true);
                                    }}
                                    className="bg-blue-500 text-white px-2 py-1 my-2 rounded"
                                >
                                    Add Tracking
                                </button>

                                <button
                                    onClick={() => navigate(`/dashboard/track-order/${o._id}`)}
                                    className="bg-lime-600 text-white px-2 py-1 rounded"
                                >
                                    View Tracking
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Tracking Modal */}
            {openTracking && (
                <TrackingModal
                    order={selectedOrder}
                    close={() => setOpenTracking(false)}
                    reload={loadOrders}
                />
            )}
        </div>
    );
};

export default ApprovedOrders;
