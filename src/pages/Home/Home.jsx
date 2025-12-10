import HeroBanner from '../../components/Home/HeroBanner'
import LatestProducts from '../../components/Home/LatestProducts'
import Container from '../../components/Shared/Container'

const Home = () => {
  return (
    <Container>
      <HeroBanner/>
      <LatestProducts />
      {/* More components */}
    </Container>
  )
}

export default Home
