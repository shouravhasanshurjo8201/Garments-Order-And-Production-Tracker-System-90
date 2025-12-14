import { useLocation, useNavigate } from "react-router";
import Container from "../../components/Shared/Container";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BookingPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { state } = useLocation();
  const navigate = useNavigate();

  const product = state?.product;

  // If product not available, show loading/error
  if (!product) return <Container><p className="text-center mt-20">Product not found!</p></Container>;

  // React Hook Form setup
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      productId: product._id, 
      email: user?.email || "",
      product: product.name,
      price: product.price,
      quantity: product.minimumOrder,
      total: product.price * product.minimumOrder,
      status : "Pending",
      firstName: "",
      lastName: "",
      contact: "",
      address: "",
      notes: ""
    }
  });

  const watchQuantity = watch("quantity");

  // Auto-update total price & quantity validation
  useEffect(() => {
    let qty = Number(watchQuantity);

    if (qty < product.minimumOrder) qty = product.minimumOrder;
    if (qty > product.quantity) qty = product.quantity;

    setValue("quantity", qty);
    setValue("total", qty * product.price);
  }, [watchQuantity, product, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axiosSecure.post("/orders", data);
      console.log("Booking saved:", response.data);
      toast.success("Booking Saved Successfully!");
      navigate("/dashboard/my-orders");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Booking failed!");
    }
};


  return (
    <Container>
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl text-lime-500 font-semibold mb-4">Complete Your Order</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label>Email</label>
            <input
              type="text"
              readOnly
              {...register("email")}
              className="w-full border p-2 rounded bg-gray-200"
            />
          </div>

          {/* Product */}
          <div>
            <label>Product</label>
            <input
              type="text"
              readOnly
              {...register("product")}
              className="w-full border p-2 rounded bg-gray-200"
            />
          </div>

          {/* Unit Price */}
          <div>
            <label>Price</label>
            <input
              type="text"
              readOnly
              {...register("price")}
              className="w-full border p-2 rounded bg-gray-200"
            />
          </div>

          {/* Quantity */}
          <div>
            <label>Order Quantity</label> <br></br>
            <label className="text-[10px]">Total Quantity -- {product.quantity} And  Minimum Order -- {product.minimumOrder} </label>

            <input
              type="number"
              {...register("quantity", {
                required: "Quantity is required",
                min: { value: product.minimumOrder, message: `Minimum order is ${product.minimumOrder}` },
                max: { value: product.quantity, message: `Cannot order more than ${product.quantity}` }
              })}
              className="w-full border p-2 rounded"
            />
            {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
          </div>

          {/* Total */}
          <div>
            <label>Total Price</label>
            <input
              type="text"
              readOnly
              {...register("total")}
              className="w-full border p-2 rounded bg-gray-200"
            />
          </div>

          {/* First Name */}
          <div>
            <input
              type="text"
              placeholder="First Name"
              {...register("firstName", { required: "First name is required" })}
              className="w-full border p-2 rounded"
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
          </div>

          {/* Last Name */}
          <div>
            <input
              type="text"
              placeholder="Last Name"
              {...register("lastName", { required: "Last name is required" })}
              className="w-full border p-2 rounded"
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          </div>

          {/* Contact */}
          <div>
            <input
              type="text"
              placeholder="Contact Number"
              {...register("contact", { required: "Contact number is required" })}
              className="w-full border p-2 rounded"
            />
            {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
          </div>

          {/* Address */}
          <div>
            <textarea
              placeholder="Delivery Address"
              {...register("address", { required: "Delivery address is required" })}
              className="w-full border p-2 rounded"
            ></textarea>
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>

          {/* Notes */}
          <div>
            <textarea
              placeholder="Additional Notes"
              {...register("notes")}
              className="w-full border p-2 rounded"
            ></textarea>
          </div>

          <button
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            type="submit"
          >
            Submit Order
          </button>

        </form>
      </div>
    </Container>
  );
};

export default BookingPage;
