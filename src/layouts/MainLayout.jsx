import { Outlet } from 'react-router'
import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer/Footer'
import ScrollProgress from '../components/Shared/ScrollProgress'
const MainLayout = () => {
  return (
    <ScrollProgress>
      <Navbar />
      <div className='pt-24 min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
      <Footer />
    </ScrollProgress>
  )
}

export default MainLayout
