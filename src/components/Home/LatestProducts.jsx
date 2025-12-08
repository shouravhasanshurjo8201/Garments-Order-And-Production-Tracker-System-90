import { useEffect, useState } from 'react'
import Card from './Card'
import Container from '../Shared/Container'
import useAxiosSecure from '../../hooks/useAxiosSecure'

const LatestProducts = () => {
  const axiosSecure = useAxiosSecure()
  const [products, setProducts] = useState([])

  // Fetch Products 
  useEffect(() => {
    axiosSecure
      .get('/latest-products') 
      .then(res => {
        setProducts(res.data)
      })
      .catch(err => {
        console.error('Error fetching products:', err)
      })
  }, [axiosSecure])

  return (
    <Container>
      <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.length > 0 &&
          products.map(product => (
            <Card key={product._id } product={product} />
          ))}
      </div>
    </Container>
  )
}

export default LatestProducts
