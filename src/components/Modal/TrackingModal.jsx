import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TrackingModal = ({ order, close, reload }) => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const payload = {
        tracking: {
          location: data.location,
          status: data.status,
          note: data.note || "",
          time: new Date()
        }
      };

      await axiosSecure.patch(`/orders/${order._id}`, payload);

      toast.success("Tracking added successfully");
      reset();
      reload();
      close();
    } catch {
      toast.error("Failed to add tracking");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-5 w-96 rounded shadow">
        <h3 className="font-bold mb-4 text-lime-500">
          Add Tracking Info
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

          {/* Location */}
          <input
            {...register("location", { required: "Location is required" })}
            placeholder="Location"
            className="border p-2 w-full rounded"
          />
          {errors.location && (
            <p className="text-red-500 text-sm">
              {errors.location.message}
            </p>
          )}

          {/* Status */}
          <select
            {...register("status", { required: "Status is required" })}
            className="border p-2 w-full rounded"
          >
            <option value="">Select Status</option>
            <option>Cutting Completed</option>
            <option>Sewing Started</option>
            <option>Finishing</option>
            <option>QC Checked</option>
            <option>Packed</option>
            <option>Shipped</option>
            <option>Out for Delivery</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm">
              {errors.status.message}
            </p>
          )}

          {/* Note */}
          <textarea
            {...register("note")}
            placeholder="Optional Note"
            className="border p-2 w-full rounded"
          />

          {/* Buttons */}
          <div className="flex justify-between pt-2">
            <button
              type="submit"
              className="bg-lime-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>

            <button
              type="button"
              onClick={close}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrackingModal;
