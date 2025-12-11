import GlobalPartner from '../../components/Home/ExtraSection'
import WhyChooseUs from '../../components/Home/Features'
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
      <WhyChooseUs/>
      <GlobalPartner/>
      <CustomerFeedback/>
      {/* More components */}
    </Container>
  )
}

export default Home
