import { useEffect, useState } from "react";
import { useParams } from "react-router"; 
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import Container from "../../../components/Shared/Container";
import { TbAlertCircle, TbTruckDelivery, TbPackage, TbCheckupList, TbScissors, TbShirt } from "react-icons/tb";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const TrackOrder = () => {
  const { orderId } = useParams();
  const axiosSecure = useAxiosSecure();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Track Order | Dashboard";
  }, []);

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get(`/order/${orderId}`)
      .then((res) => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load order tracking details.");
        setLoading(false);
      });
  }, [axiosSecure, orderId]);

  const getStatusIcon = (status) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("cutting")) return <TbScissors />;
    if (s.includes("sewing")) return <TbShirt />;
    if (s.includes("qc") || s.includes("check")) return <TbCheckupList />;
    if (s.includes("pack")) return <TbPackage />;
    if (s.includes("ship") || s.includes("delivery")) return <TbTruckDelivery />;
    return "✓";
  };

  if (loading) return <LoadingSpinner />;

  if (error || !order) {
    return (
      <Container>
        <div className="min-h-[60vh] flex flex-col justify-center items-center text-center">
          <TbAlertCircle className="text-6xl text-red-500 mb-4 animate-pulse" />
          <h2 className="text-3xl font-bold text-gray-700 mb-2">Tracking Not Found!</h2>
          <p className="text-gray-500 max-w-md">{error || "The requested order ID does not exist."}</p>
        </div>
      </Container>
    );
  }

  const reversedHistory = order?.trackingHistory ? [...order.trackingHistory].reverse() : [];
{console.log(reversedHistory);
}
  const lat = parseFloat(order?.coordinates?.lat);
  const lng = parseFloat(order?.coordinates?.lng);
  const isValidLocation = !isNaN(lat) && !isNaN(lng);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-lime-600 mb-2">Track Order</h2>
        <p className="text-gray-500"> Order ID — {order._id}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-5">
            <h3 className="font-bold text-gray-700 mb-4 border-b pb-2">Order Summary</h3>
            <div className="space-y-3">
              <p className="flex justify-between text-sm">
                <span className="text-gray-500">Product:</span>
                <span className="font-medium text-gray-800">{order.product}</span>
              </p>
              <p className="flex justify-between text-sm">
                <span className="text-gray-500">Quantity:</span>
                <span className="font-medium text-gray-800">{order.quantity}</span>
              </p>
              <p className="flex justify-between text-sm">
                <span className="text-gray-500">Total Price:</span>
                <span className="font-medium text-gray-800">${order.total}</span>
              </p>
              <div className="pt-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 uppercase">
                  {order.status}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-2 h-64 overflow-hidden">
             <h3 className="font-bold text-gray-700 p-2 text-sm">Current Location</h3>
             {isValidLocation ? (
                <MapContainer center={[lat, lng]} zoom={13} className="h-50 w-full rounded-lg ">
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[lat, lng]}>
                    <Popup>{order.location || "Product Location"}</Popup>
                  </Marker>
                </MapContainer>
             ) : (
               <div className="h-full flex items-center justify-center bg-gray-50 text-gray-400 text-sm italic">
                 Map location not updated yet
               </div>
             )}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white shadow-sm border border-gray-100 rounded-xl p-6">
          <h3 className="text-xl font-bold text-lime-600 mb-8">Tracking Timeline</h3>
          <div className="relative border-l-2 border-gray-200 ml-4">
            {reversedHistory.map((step, index) => (
              <div key={index} className="mb-10 ml-6 relative">
                <div className={`absolute -left-[35px] w-8 h-8 rounded-full border-4 border-white flex items-center justify-center text-white shadow-sm
                  ${index === 0 ? "bg-blue-600 scale-110" : "bg-gray-300"}`}>
                  {getStatusIcon(step.status)}
                </div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <h4 className={`font-bold text-lg ${index === 0 ? "text-blue-600" : "text-gray-700"}`}>
                    {step.status}
                    {index === 0 && <span className="ml-2 text-[10px] bg-blue-100 text-blue-600 px-2 py-1 rounded-md uppercase">Latest</span>}
                  </h4>
                  <span className="text-xs text-gray-400 font-medium">
                    {step.time ? new Date(step.time).toLocaleString() : "Time N/A"}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1 italic">📍 {step.location || "Location Update Pending"}</p>
                {step.note && <p className="mt-2 text-sm text-gray-500 bg-gray-50 p-2 rounded border-l-2 border-blue-200">{step.note}</p>}
                {step.image && <img src={step.image} className="mt-3 w-40 h-24 object-cover rounded-lg border shadow-sm" alt="Update" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;