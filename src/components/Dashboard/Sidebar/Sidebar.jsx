
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import logo from '../../../assets/images/logo-flat.png'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import MenuItem from './Menu/MenuItem'
import AdminMenu from './Menu/AdminMenu'
import ManagerMenu from './Menu/ManagerMenu'
import CustomerMenu from './Menu/CustomerMenu'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../Shared/LoadingSpinner'

const Sidebar = () => {
  const axiosSecure = useAxiosSecure()
  const { user, logOut } = useAuth()
  const [userData, setUserData] = useState(null)
  const [isActive, setActive] = useState(false)
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const role = userData?.role

  // Get user data
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/user?email=${user.email}`)
        .then(res => {
          setUserData(res.data)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [user?.email, axiosSecure])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const handleToggle = () => setActive(!isActive)

  if (loading) return <LoadingSpinner />

  return (
    <>
      {/* Mobile Navbar */}
      <div className='bg-base-100 text-base-content flex justify-between md:hidden'>
        <div className='p-4'>
          <Link to='/'>
            <img src={logo} alt='logo' className='h-12' />
          </Link>
        </div>

        <button onClick={handleToggle} className='p-4'>
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between bg-base-100 w-64 px-2 py-4 absolute inset-y-0 left-0 transform
        ${isActive ? '-translate-x-full' : ''}
        md:translate-x-0 transition duration-200`}
      >
        <div className='flex flex-col h-full'>
          {/* Logo */}
          <div className='hidden md:flex justify-center py-4'>
            <Link to='/'>
              <img src={logo} alt='logo' className='h-12' />
            </Link>
          </div>

          {/* Menu */}
          <nav className='mt-6 flex-1'>
            {/* Common Menu */}
            <MenuItem icon={BsGraphUp} label='Statistics' address='/dashboard' />

            {/* Role-Based Menu */}
            {role === 'Admin' && <AdminMenu />}
            {role === 'Manager' && <ManagerMenu />}
            {role === 'Buyer' && <CustomerMenu />}
          </nav>

          {/* Bottom Controls */}
          <div className='mt-auto'>
            <hr className='my-3' />

            {/*  Theme Toggle */}
            <button
              onClick={toggleTheme}
              className='flex w-full items-center px-4 py-2 text-base-content hover:bg-base-200 rounded transition mb-2'
            >
              {theme === 'light' ? (
                <MdDarkMode className='w-5 h-5' />
              ) : (
                <MdLightMode className='w-5 h-5' />
              )}
              <span className='ml-4 font-medium'>
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </span>
            </button>

            {/* Profile */}
            <MenuItem icon={FcSettings} label='Profile' address='/dashboard/profile' />

            {/* Logout */}
            <button
              onClick={logOut}
              className='flex w-full items-center px-4 py-2 mt-2 text-error hover:bg-error/10 rounded'
            >
              <GrLogout className='w-5 h-5' />
              <span className='ml-4 font-medium'>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
