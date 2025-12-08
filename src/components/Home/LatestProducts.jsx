import Card from './Card'
import Container from '../Shared/Container'

const LatestProducts = () => {
  const products = [
    {
      id: 1,
      name: "Money Plant 1",
      category: "Indoor",
      quantity: 10,
      price: 15,
      image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
      description: "A Money Plant is known for bringing prosperity and positive vibes."
    },
    {
      id: 2,
      name: "Money Plant 2",
      category: "Indoor",
      quantity: 8,
      price: 12,
      image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
      description: "A beautiful money plant to enhance positivity in your home."
    },
    {
      id: 3,
      name: "Money Plant 3",
      category: "Indoor",
      quantity: 5,
      price: 10,
      image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
      description: "Bring prosperity and luck with this money plant."
    },
    {
      id: 4,
      name: "Money Plant 4",
      category: "Indoor",
      quantity: 7,
      price: 14,
      image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
      description: "A perfect indoor plant to decorate your room."
    },
    {
      id: 5,
      name: "Money Plant 5",
      category: "Indoor",
      quantity: 6,
      price: 16,
      image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
      description: "Easy to maintain and brings positive energy."
    },
    {
      id: 6,
      name: "Money Plant 6",
      category: "Indoor",
      quantity: 9,
      price: 18,
      image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
      description: "Enhance your workspace with this lucky plant."
    },
    {
      id: 7,
      name: "Money Plant 7",
      category: "Indoor",
      quantity: 4,
      price: 20,
      image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
      description: "Adds beauty and positive vibes to your home."
    },
    {
      id: 8,
      name: "Money Plant 8",
      category: "Indoor",
      quantity: 3,
      price: 22,
      image: "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg",
      description: "A perfect gift for friends and family."
    },
  ]
  return (
    <Container>
      <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </Container>
  )
}

export default LatestProducts
