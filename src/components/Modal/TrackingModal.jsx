import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import { TbLoaderQuarter, TbMapPin } from "react-icons/tb";

const TrackingModal = ({ order, close, reload }) => {
  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      lat: order?.coordinates?.lat || "",
      lng: order?.coordinates?.lng || ""
    }
  });

  const onSubmit = async (data) => {
    setUploading(true);
    try {
      const payload = {
        tracking: {
          location: data.location,
          status: data.status,
          note: data.note || "",
          time: new Date().toISOString(),
          isLatest: true,

        },
        coordinates: {
          lat: parseFloat(data.lat),
          lng: parseFloat(data.lng)
        }

      };

      await axiosSecure.patch(`/orders/${order._id}`, payload);

      toast.success("Tracking & Coordinates updated!");
      reset();
      reload();
      close();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update tracking");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="bg-lime-500 p-4 sticky top-0 z-10">
          <h3 className="text-white font-bold text-lg text-center">
            Update Tracking Status
          </h3>
          <p className="text-lime-100 text-xs text-center">Order ID: {order._id}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Status Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              {...register("status", { required: "Status is required" })}
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-lime-500 outline-none"
            >
              <option value="">Select current stage</option>
              <option>Cutting Started</option>
              <option>Cutting Completed</option>
              <option>Sewing in Progress</option>
              <option>QC (Quality Check)</option>
              <option>Finishing & Ironing</option>
              <option>Packing Completed</option>
              <option>Ready for Shipment</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
            {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
          </div>

          {/* Location Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location Name</label>
            <input
              {...register("location", { required: "Location name is required" })}
              placeholder="e.g. Factory"
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-lime-500 outline-none"
            />
          </div>

          {/* Coordinates */}
          <div className="bg-gray-50 p-3 rounded-lg border border-dashed border-gray-300">
            <label className="flex items-center gap-1 text-sm font-bold text-gray-700 mb-2">
              <TbMapPin className="text-lime-600" /> Map Coordinates
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="number"
                  step="any"
                  {...register("lat", { required: "Lat is required" })}
                  placeholder="Latitude (e.g. .. ..)"
                  className="w-full border border-gray-300 p-2 rounded-lg text-sm outline-none focus:ring-1 focus:ring-lime-500"
                />
              </div>
              <div>
                <input
                  type="number"
                  step="any"
                  {...register("lng", { required: "Lng is required" })}
                  placeholder="Longitude (e.g. .. ..)"
                  className="w-full border border-gray-300 p-2 rounded-lg text-sm outline-none focus:ring-1 focus:ring-lime-500"
                />
              </div>
            </div>
            {(errors.lat || errors.lng) && (
              <p className="text-red-500 text-[10px] mt-1">Both coordinates are required for the map marker.</p>
            )}
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
            <textarea
              {...register("note")}
              placeholder="Any specific details..."
              rows="2"
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-lime-500 outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={close}
              className="flex-1 bg-gray-100 text-gray-700 font-semibold py-2.5 rounded-lg hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="flex-1 bg-lime-600 text-white font-semibold py-2.5 rounded-lg hover:bg-lime-700 transition-all flex justify-center items-center gap-2"
            >
              {uploading ? <TbLoaderQuarter className="animate-spin" /> : "Update Tracking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrackingModal;