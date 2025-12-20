import { useEffect } from 'react'
import GlobalPartner from '../../components/Home/ExtraSection'
import WhyChooseUs from '../../components/Home/Features'
import CustomerFeedback from '../../components/Home/feedbacks'
import GarmentsProductionSection from '../../components/Home/GarmentsProductionSection'
import HeroBanner from '../../components/Home/HeroBanner'
import HowItWorks from '../../components/Home/HowWorks'
import LatestProducts from '../../components/Home/LatestProducts'
import SpecialOffer from '../../components/Home/SpecialOffer'
import Container from '../../components/Shared/Container'

const Home = () => {
  useEffect(() => {
    document.title = "Home | Garments Production System";
  }, []);
  return (
    <Container>
      <HeroBanner />
      <LatestProducts />
      <HowItWorks />
      <SpecialOffer />
      <WhyChooseUs />
      <CustomerFeedback />
      <GlobalPartner />
      <GarmentsProductionSection />
    </Container>
  )
}

export default Home
