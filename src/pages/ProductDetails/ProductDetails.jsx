import { useEffect, useState } from "react";
import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import Button from "../../components/Shared/Button/Button";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router";
import ProductNotFound from "./ProductNotFound";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Single Product by ID
  useEffect(() => {
    axiosSecure
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch(() => {
        setProduct(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [axiosSecure, id]);

  if (loading) {
    return (
      <Container>
        <p className="text-center text-xl font-semibold mt-20">Loading...</p>
      </Container>
    );
  }

  if (!product) {
    return <ProductNotFound />;
  }

  // Buyers only can order
  const canOrder = user && user.role !== "admin" && user.role !== "manager";

  
  const handleOrder = () => {
    navigate(`/booking/${product._id}`, { state: { product } });
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
