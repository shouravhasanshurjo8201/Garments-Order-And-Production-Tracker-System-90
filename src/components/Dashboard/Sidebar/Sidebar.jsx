
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import logo from '../../../assets/images/logo-flat.png'
import { GrLogout } from 'react-icons/gr'
import { RiSettings3Line, RiDashboardFill } from 'react-icons/ri'
import { AiOutlineBars, AiOutlineClose } from 'react-icons/ai'
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
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [isActive, setActive] = useState(true)
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const role = userData?.role

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

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')
  const handleToggle = () => setActive(!isActive)

  const handleLogOut = async () => {
    await logOut()
    navigate('/')
  }

  if (loading) return <LoadingSpinner />

  return (
    <>
      {/* Mobile Navbar */}
      <div className='bg-base-100/80 backdrop-blur-md text-base-content flex justify-between md:hidden border-b border-base-300 sticky top-0 z-20 px-4 py-3'>
        <Link to='/' className='flex items-center gap-2'>
          <img src={logo} alt='logo' className='h-8 w-auto' />
        </Link>
        <button
          onClick={handleToggle}
          className='p-2 hover:bg-base-200 rounded-lg transition'
        >
          {isActive ? <AiOutlineBars size={24} /> : <AiOutlineClose size={24} />}
        </button>
      </div>

      <div
        className={`z-30 md:fixed flex flex-col justify-between bg-base-100 border-r border-base-200 w-64 px-4 py-4 absolute inset-y-0 left-0 transform
        ${isActive ? '-translate-x-full' : ''}
        md:translate-x-0 transition-all duration-300 ease-in-out shadow-2xl md:shadow-none`}
      >
        <div className='flex flex-col h-full'>
          <div className='flex flex-col items-center mb-2'>
            <Link to='/' className='flex items-center gap-2'>
              <img src={logo} alt='logo' className='h-10' />
            </Link>
            <div className='mt-2 px-3 py-1 bg-lime-100 text-lime-700 text-[10px] font-bold rounded-full uppercase tracking-widest'>
              {role} Panel
            </div>
          </div>

          <nav className='flex-1 space-y-1 overflow-y-auto no-scrollbar'>
            <MenuItem
              icon={RiDashboardFill}
              label='Dashboard'
              address='/dashboard'
            />

            <div className=' border-t border-base-200'>
              {role === 'Admin' && <AdminMenu />}
              {role === 'Manager' && <ManagerMenu />}
              {role === 'Buyer' && <CustomerMenu />}
            </div>
          </nav>

          <div className='mt-2 space-y-2'>
            <hr className='border-base-200 mb-2' />

            <div className='flex items-center gap-3 px-3 py-3 bg-base-200/50 rounded-2xl mb-2'>
              <img
                src={user?.photoURL}
                className='h-10 w-10 rounded-xl object-cover border-2 border-white shadow-sm'
                alt="user"
              />
              <div className='overflow-hidden'>
                <p className='text-sm font-bold truncate'>{user?.displayName}</p>
                <p className='text-[10px] text-gray-500 truncate'>{user?.email}</p>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-2'>
              <button
                onClick={toggleTheme}
                className='flex flex-col items-center justify-center p-3 bg-base-200 hover:bg-base-300 rounded-2xl transition duration-200 group'
                title="Toggle Theme"
              >
                {theme === 'light' ? (
                  <MdDarkMode className='w-5 h-5 group-hover:rotate-12 transition-transform' />
                ) : (
                  <MdLightMode className='w-5 h-5 group-hover:rotate-45 transition-transform' />
                )}
                <span className='text-[10px] mt-1 font-bold uppercase tracking-tighter'>Theme</span>
              </button>

              <Link
                to='/dashboard/profile'
                className='flex flex-col items-center justify-center p-3 bg-base-200 hover:bg-base-300 rounded-2xl transition duration-200'
              >
                <RiSettings3Line className='w-5 h-5' />
                <span className='text-[10px] mt-1 font-bold uppercase tracking-tighter'>Settings</span>
              </Link>
            </div>

            <button
              onClick={handleLogOut}
              className='flex w-full items-center justify-center gap-2 px-4 py-3 mt-2 text-white bg-error hover:bg-red-600 rounded-2xl transition-all shadow-lg shadow-error/20 font-bold text-sm'
            >
              <GrLogout className='w-4 h-4 invert' />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {!isActive && (
        <div
          onClick={handleToggle}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 md:hidden"
        />
      )}
    </>
  )
}

export default Sidebar