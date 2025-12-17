import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import logo from '../../../assets/images/logo-flat.png'
// Icons
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'

// User Menu
import MenuItem from './Menu/MenuItem'
import AdminMenu from './Menu/AdminMenu'
import ManagerMenu from './Menu/ManagerMenu'
import CustomerMenu from './Menu/CustomerMenu'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../Shared/LoadingSpinner'

const Sidebar = () => {
  const axiosSecure = useAxiosSecure();
  const { user, logOut } = useAuth()
  const [userData, setUserData] = useState(null);
  const [isActive, setActive] = useState(false)
  const [loading, setLoading] = useState(true);
  const role = userData?.role;
  
  // Get user data from DB
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/user?email=${user.email}`)
        .then((res) => {
          setUserData(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user?.email, axiosSecure]);

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }
  if (loading) return <LoadingSpinner />;

  return (
    <>
      {/* Small Screen Navbar, only visible till md breakpoint */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div >
          <div className='block cursor-pointer p-4 font-bold'>
            <Link to='/'>
              <img src={logo} alt='logo' className='h-12 w-25' />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
          }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div className='flex flex-col h-full'>
          {/* Top Content */}
          <div>
            {/* Logo */}
            <div className='w-full hidden md:flex px-4 py-2 hover:shadow-lg rounded-lg justify-center items-center mx-auto'>
              <Link to='/'>
                <img src={logo} alt='logo' className='h-12 w-26' />
              </Link>
            </div>
          </div>

          {/* Middle Content */}
          <div className='flex flex-col justify-between  mt-6'>
            {/*  Menu Items */}
            <nav>
              {/* Common Menu */}
              
              <MenuItem
                icon={BsGraphUp}
                label='Statistics'
                address='/dashboard'
              />
              {/* Role-Based Menu */}
              
              {role === "Admin" && <AdminMenu />}
              {role === "Manager" && <ManagerMenu />}
              {role === "Buyer" && <CustomerMenu />}
            </nav>
          </div>

          {/* Bottom Content */}
          <div>
            <hr />

            <MenuItem
              icon={FcSettings}
              label='Profile'
              address='/dashboard/profile'
            />
            <button
              onClick={logOut}
              className='flex cursor-pointer w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
            >
              <GrLogout className='w-5 h-5' />

              <span className='mx-4 font-medium'>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
