import Container from '../Container'
import { useState, useEffect } from 'react'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'
import logo from '../../../assets/images/logo-flat.png'
import { Link, NavLink } from 'react-router-dom'
import { RiMenuAddLine } from "react-icons/ri";
import { MdDarkMode, MdLightMode, MdClose } from 'react-icons/md'

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  // publicLinks
  const publicLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
  ]

  // privateLinks
  const privateLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Dashboard', path: '/dashboard' },
  ]

  const currentLinks = user ? privateLinks : publicLinks

  return (
    <div className={`sticky top-0 z-50 w-full shadow transition-all duration-300 ${theme === 'dark' ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-700 text-white' : 'bg-white/90 backdrop-blur-md text-gray-800'
      }`}>
      <Container>
        <div className="flex justify-between items-center py-3">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-9 w-auto" />
          </Link>

          {/* Desktop Menu  */}
          <div className="hidden md:flex items-center gap-8">
            {currentLinks.map(link => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-bold  transition-colors hover:text-lime-500 ${isActive ? 'text-lime-500 border-b-2 border-lime-500' : ''
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right Section  */}
          <div className="flex items-center gap-4">

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              title="Toggle Theme"
            >
              {theme === 'light' ? <MdDarkMode size={22} /> : <MdLightMode size={22} className="text-yellow-400" />}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 py-1  px-3 border border-gray-500 dark:border-gray-600 rounded-full cursor-pointer hover:shadow-md transition"
              >
                {isOpen ?
                  <MdClose size={22} className="ml-2 md:block " /> :
                  <RiMenuAddLine size={20} className="ml-2 md:block " />}
                {user && (<img
                  src={user?.photoURL || avatarImg}
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover"
                />)}
              </div>

              {isOpen && (
                <div className={`absolute right-0 top-12 w-50  rounded-b-xl shadow-xl  animate-in fade-in zoom-in text-center duration-200 ${theme === 'dark' ? 'bg-gray-900/95 backdrop-blur-md text-white' : 'bg-white backdrop-blur-md text-gray-800'
                  }`}>

                  {user && (
                    <div className="px-2 py-3 border-b dark:border-gray-700 mb-2">
                      <p className="text-sm font-bold truncate">{user?.displayName || 'User Name'}</p>
                    </div>
                  )}

                  {/* Mobile Links  */}
                  <div className="md:hidden pt-2">
                    {currentLinks.map(link => (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className="block px-4  font-bold py-2 tex text-sm hover:text-lime-500"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                  {user ? (
                    <>
                      <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-4 font-bold py-2 tex text-sm hover:text-lime-500">Dashboard</Link>
                      <Link to="/dashboard/profile" onClick={() => setIsOpen(false)} className="block px-4  font-bold py-2 tex text-sm hover:text-lime-500"> Profile</Link>
                      <hr className=" dark:border-gray-700" />
                      <button
                        onClick={() => { logOut(); setIsOpen(false); }}
                        className="w-full font-bold px-4 py-2 text-sm text-red-500 text-center rounded-b-xl hover:bg-red-100 "
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setIsOpen(false)} className="block px-4 font-bold py-2 tex text-sm hover:text-lime-500">Login</Link>
                      <Link to="/signup" onClick={() => setIsOpen(false)} className="block px-4  font-bold py-2 tex text-sm hover:text-lime-500">Sign Up</Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Navbar