import { Outlet } from 'react-router'
import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer/Footer'
import ScrollProgress from '../components/Shared/ScrollProgress'
import ChatBot from '../components/ChatBot/ChatBot'
const MainLayout = () => {
  return (
    <ScrollProgress>
      <Navbar />
      <div className='pt-24 min-h-[calc(100vh-68px)]'>
        <Outlet />
        <ChatBot />
      </div>
      <Footer />
    </ScrollProgress>
  )
}

export default MainLayout
