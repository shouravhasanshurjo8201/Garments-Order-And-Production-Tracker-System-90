import GlobalPartner from '../../components/Home/ExtraSection'
import CustomerFeedback from '../../components/Home/feedbacks'
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
      <CustomerFeedback/>
      <GlobalPartner/>
      {/* More components */}
    </Container>
  )
}

export default Home
