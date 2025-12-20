import { TbAlertCircle } from "react-icons/tb";
import Container from "../../components/Shared/Container";
import { useEffect } from "react";

const ProductNotFound = () => {
  useEffect(() => {
    document.title = "Product NotFound | Garments Production System";
  }, []);
  return (
    <Container>
      <div className="min-h-[50vh] flex flex-col justify-center items-center text-center">
        <TbAlertCircle className="text-6xl text-red-500 mb-4 animate-pulse" />
        <h2 className="text-3xl font-bold text-gray-700 mb-2">Product Not Found!</h2>
        <p className="text-gray-500 max-w-md">Sorry, the item you are looking for is not available.</p>
      </div>
    </Container>
  );
};

export default ProductNotFound;
