







import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import Button from "../../components/Shared/Button/Button";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router";

const ProductDetails = () => {
  const { id } = useParams(); // product ID from URL
  const navigate = useNavigate();
  const { user } = useAuth();

  // Demo Product Data (Later load from server)
  const product = {
    _id: id,
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

  // who can order?
  const canOrder = user && user.role !== "admin" && user.role !== "manager";

  const handleOrder = () => {
    navigate(`/booking/${product._id}`, { state: { product } });
  };

  return (
    <Container>
      <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12">

        {/* Image */}
        <div className="flex-1">
          <img
            src={product.images[0]}
            className="rounded-xl h-50 md:h-120  w-full"
            alt={product.title}
          />
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <Heading title={product.title} subtitle={`Category: ${product.category}`} />

          <hr className="my-2" />

          <p className="text-lg text-neutral-600">{product.description}</p>

          <hr className="my-2" />

          <p className="text-neutral-600">Available Quantity: {product.quantity}</p>
          <p className="text-neutral-600">Minimum Order: {product.minOrder}</p>

          <hr className="my-2" />

          <p className="text-neutral-700">
            Payment Options: {product.paymentOptions.join(", ")}
          </p>

          <hr className="my-2" />

          <h3 className="font-semibold text-lg mb-2">Features</h3>
          <ul className="list-disc ml-6 text-neutral-700">
            {product.features.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <hr className="my-2" />

          <div className="flex justify-between items-center">
            <p className="text-3xl font-bold w-full">Price: ${product.price}</p>

            <div className="w-full">{canOrder ? (
              <Button label="Order Now" onClick={handleOrder} />
            ) : (
              <Button disabled label="Order Only Buyer" />
            )}</div>
          </div>
          <hr className="mt-5" />
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails;

