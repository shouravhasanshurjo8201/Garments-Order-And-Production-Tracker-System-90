import HeroBanner from '../../components/Home/HeroBanner'
import HowItWorks from '../../components/Home/HowWorks'
import LatestProducts from '../../components/Home/LatestProducts'
import Container from '../../components/Shared/Container'

const Home = () => {
  return (
    <Container>
      <HeroBanner/>
      <LatestProducts />
      <HowItWorks/>
      {/* More components */}
    </Container>
  )
}

export default Home
