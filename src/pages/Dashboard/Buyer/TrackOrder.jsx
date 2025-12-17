import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const TrackOrder = () => {
  const { orderId } = useParams();
  const axiosSecure = useAxiosSecure();
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosSecure
      .get(`/order/${orderId}`)
      .then(res => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load order tracking");
        setLoading(false);
      });
  }, [axiosSecure, orderId]);

  if (loading) {
    return <LoadingSpinner/>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl text-center font-bold mb-6">
        Track Order
      </h2>

      {/* Order Info */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Product:</strong> {order.product}</p>
        <p><strong>Quantity:</strong> {order.quantity}</p>
        <p><strong>Price:</strong> {order.total}</p>
        <p>
          <strong>Status:</strong>{" "}
          <span className="font-medium text-blue-600">
            {order.status}
          </span>
        </p>
      </div>

      {/* Timeline */}
      <div className="bg-white shadow rounded p-6">
        <h3 className="text-xl font-semibold mb-4">
          Order Timeline
        </h3>

        <ol className="relative border-l border-gray-300">
          {order.trackingHistory?.map((step, index) => (
            <li key={index} className="mb-6 ml-6">
              <span
                className={`absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full
                ${
                  step.isLatest
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                ✓
              </span>

              <h4 className="font-semibold text-lg">
                {step.status}
              </h4>

              <p className="text-sm text-gray-500">
                {new Date(step.time).toLocaleString()}
              </p>

              <p className="text-sm">
                📍 {step.location}
              </p>

              {step.note && (
                <p className="text-sm text-gray-700 mt-1">
                  📝 {step.note}
                </p>
              )}

              
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default TrackOrder;
