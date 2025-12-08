import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import Button from "../../components/Shared/Button/Button";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router";
import ProductNotFound from "./ProductNotFound";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

 const products = [
  {
    id: 1,
    name: "Money Plant 1",
    category: "Indoor",
    quantity: 10,
    minimumOrder: 2,
    price: 15,
    features: ["Fresh & healthy", "Easy to grow", "Low maintenance"],
    paymentOptions: ["Cash", "Online Payment", "Bkash"],
    image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
    description: "A Money Plant is known for bringing prosperity and positive vibes."
  },
  {
    id: 2,
    name: "Money Plant 2",
    category: "Indoor",
    quantity: 8,
    minimumOrder: 1,
    price: 12,
    features: ["Air purifier", "Brings positivity", "Low water needed"],
    paymentOptions: ["Cash", "Bank Payment"],
    image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
    description: "A beautiful money plant to enhance positivity in your home."
  },
  {
    id: 3,
    name: "Money Plant 3",
    category: "Indoor",
    quantity: 5,
    minimumOrder: 2,
    price: 10,
    features: ["Lucky plant", "Easy maintenance"],
    paymentOptions: ["Cash", "Bkash"],
    image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
    description: "Bring prosperity and luck with this money plant."
  },
  {
    id: 4,
    name: "Money Plant 4",
    category: "Indoor",
    quantity: 7,
    minimumOrder: 3,
    price: 14,
    features: ["Home decor friendly", "Low sunlight needed"],
    paymentOptions: ["Cash", "Online Payment"],
    image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
    description: "A perfect indoor plant to decorate your room."
  },
  {
    id: 5,
    name: "Money Plant 5",
    category: "Indoor",
    quantity: 6,
    minimumOrder: 1,
    price: 16,
    features: ["Positive energy", "Easy to maintain"],
    paymentOptions: ["Cash", "Bkash", "Nagad"],
    image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
    description: "Easy to maintain and brings positive energy."
  },
  {
    id: 6,
    name: "Money Plant 6",
    category: "Indoor",
    quantity: 9,
    minimumOrder: 2,
    price: 18,
    features: ["Work desk friendly", "Fresh look"],
    paymentOptions: ["Cash", "Online Payment", "Bank Payment"],
    image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
    description: "Enhance your workspace with this lucky plant."
  },
  {
    id: 7,
    name: "Money Plant 7",
    category: "Indoor",
    quantity: 4,
    minimumOrder: 1,
    price: 20,
    features: ["Premium quality", "Healthy growth"],
    paymentOptions: ["Cash", "Bkash"],
    image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
    description: "Adds beauty and positive vibes to your home."
  },
  {
    id: 8,
    name: "Money Plant 8",
    category: "Indoor",
    quantity: 3,
    minimumOrder: 1,
    price: 22,
    features: ["Best for gifting", "Fresh & beautiful"],
    paymentOptions: ["Cash", "Nagad", "Online Payment"],
    image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
    description: "A perfect gift for friends and family."
  },
  {
    id: 9,
    name: "Money Plant 9",
    category: "Indoor",
    quantity: 8,
    minimumOrder: 2,
    price: 17,
    features: ["Healthy leaves", "Long-lasting plant"],
    paymentOptions: ["Cash", "Bkash", "Bank Payment"],
    image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
    description: "Brings prosperity and happiness wherever placed."
  },
  {
    id: 10,
    name: "Money Plant 10",
    category: "Indoor",
    quantity: 5,
    minimumOrder: 1,
    price: 19,
    features: ["Strong roots", "Fast growing"],
    paymentOptions: ["Cash", "Bkash", "Online Payment"],
    image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
    description: "A symbol of wealth and positive energy."
  },
  {
    id: 11,
    name: "Money Plant 11",
    category: "Indoor",
    quantity: 6,
    minimumOrder: 3,
    price: 21,
    features: ["Premium leaves", "Air purifier"],
    paymentOptions: ["Cash", "Bank Payment"],
    image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
    description: "Enhance your interior with this indoor plant."
  },
  {
    id: 12,
    name: "Money Plant 12",
    category: "Indoor",
    quantity: 7,
    minimumOrder: 2,
    price: 25,
    features: ["Attractive look", "Healthy & big size"],
    paymentOptions: ["Cash", "Bkash", "Nagad", "Online Payment"],
    image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
    description: "A beautiful lucky plant to decorate your home or office."
  },
];

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <ProductNotFound></ProductNotFound>
    );
  }

  // Role Check → Buyers only can order
  
  const canOrder = user && user.role !== "admin" && user.role !== "manager";

  // Booking page redirect
  const handleOrder = () => {
    navigate(`/booking/${product.id}`, { state: { product } });
  };

  return (
    <Container>
      <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12">

        {/* Product Image */}
        <div className="flex-1">
          <img
            src={product.image}
            className="rounded-xl h-80 md:h-96 w-full object-cover"
            alt={product.name}
          />
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <Heading title={product.name} subtitle={`Category: ${product.category}`} />

          <hr className="my-3" />

          <p className="text-lg text-neutral-700">{product.description}</p>

          <hr className="my-3" />

          <p className="text-neutral-700">
            <strong>Available Quantity:</strong> {product.quantity}
          </p>

          <p className="text-neutral-700">
            <strong>Minimum Order:</strong> {product.minimumOrder}
          </p>

          <hr className="my-3" />

          <p className="text-neutral-700">
            <strong>Payment Options:</strong> {product.paymentOptions.join(", ")}
          </p>

          <hr className="my-3" />

          <h3 className="font-semibold text-lg mb-2">Features</h3>
          <ul className="list-disc ml-6 text-neutral-700">
            {product.features?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <hr className="my-3" />

          {/* Price & Button */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-3xl font-bold w-full">Price: ${product.price}</p>

            <div className="w-full flex justify-end">
              {canOrder ? (
                <Button label="Order Now" onClick={handleOrder} />
              ) : (
                <Button disabled label="Order Only Buyer" />
              )}
            </div>
          </div>

        </div>
      </div>
    </Container>
  );
};

export default ProductDetails;
