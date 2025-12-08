import Container from "../../components/Shared/Container"
import useAuth from "../../hooks/useAuth";

const BookingPage = () => {
    const { user } = useAuth();

    const product = {
        _id: '1',
        title: "Money Plant",
        category: "Succulent",
        description:
            "A fresh money plant with attractive green leaves. Best for indoor decoration.",
        price: 10,
        quantity: 10,
        minOrder: 2,
        paymentOptions: ["Cash on Delivery", "Stripe"],
        features: ["Fresh & Healthy", "Indoor Plant", "Long-lasting"],
        images: [
            "https://i.ibb.co/DDnw6j9/1738597899-golden-money-plant.jpg"
        ],
    };

    return (
        <Container>
            <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
                <h2 className="text-2xl font-semibold mb-4">Complete Your Order</h2>

                <form className="space-y-4">

                    {/* Email */}
                    <div>
                        <label>Email</label>
                        <input
                            type="text"
                            readOnly
                            value={user?.email}
                            className="w-full border p-2 rounded bg-gray-200"
                        />
                    </div>

                    {/* Product */}
                    <div>
                        <label>Product</label>
                        <input
                            type="text"
                            readOnly
                            value={product.title}
                            className="w-full border p-2 rounded bg-gray-200"
                        />
                    </div>

                    {/* Unit Price */}
                    <div>
                        <label>Unit Price</label>
                        <input
                            type="text"
                            readOnly
                              value={`$${product.price}`}
                            className="w-full border p-2 rounded bg-gray-200"
                        />
                    </div>

                    {/* Quantity */}
                    <div>
                        <label>Quantity</label>
                        <input
                            type="number"
                              value={product.quantity}
                            //   onChange={(e) => handleQuantity(Number(e.target.value))}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    {/* Total Price */}
                    <div>
                        <label>Total Price</label>
                        <input
                            type="text"
                            readOnly
                              value={`$${product.price}`}
                            className="w-full border p-2 rounded bg-gray-200"
                        />
                    </div>

                    {/* First Name */}
                    <input
                        required
                        placeholder="First Name"
                        className="w-full border p-2 rounded"
                    // onChange={(e) => setData({ ...data, firstName: e.target.value })}
                    />

                    {/* Last Name */}
                    <input
                        required
                        placeholder="Last Name"
                        className="w-full border p-2 rounded"
                    // onChange={(e) => setData({ ...data, lastName: e.target.value })}
                    />

                    {/* Contact */}
                    <input
                        required
                        placeholder="Contact Number"
                        className="w-full border p-2 rounded"
                    // onChange={(e) => setData({ ...data, phone: e.target.value })}
                    />

                    {/* Address */}
                    <textarea
                        required
                        placeholder="Delivery Address"
                        className="w-full border p-2 rounded"
                    // onChange={(e) => setData({ ...data, address: e.target.value })}
                    ></textarea>

                    {/* Notes */}
                    <textarea
                        placeholder="Additional Notes"
                        className="w-full border p-2 rounded"
                    // onChange={(e) => setData({ ...data, notes: e.target.value })}
                    ></textarea>

                    <button className="w-full border p-2 bg-amber-200 rounded" value='submit' type="submit" >submit</button>
                </form>
            </div>
        </Container>

    )
}

export default BookingPage