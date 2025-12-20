
import Container from '../Container'
import { useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'
import logo from '../../../assets/images/logo-flat.png'
import { Link, NavLink } from 'react-router'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  )

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <div className={`fixed w-full z-10 shadow-sm transition-all duration-300
      ${theme === 'dark'
      ? 'bg-white/10 backdrop-blur-md border-b  border-white/20'
      : 'bg-white'}`
    }>
      <div className="py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">

            {/* Logo */}
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className="h-8 w-15 hover:bg-blue-50 rounded-sm transition"
              />
            </Link>

            {/* Nav Links (Desktop) */}
            <div className="hidden md:flex gap-6 items-center">
              {navLinks.map(link => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? 'font-semibold text-lime-500'
                      : 'font-semibold text-gray-500 hover:text-lime-500 transition-colors duration-200'
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              {user && (
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? 'font-semibold text-lime-500'
                      : 'font-semibold text-gray-500 hover:text-lime-500 transition-colors duration-200'
                  }
                >
                  Dashboard
                </NavLink>
              )}
            </div>

            {/* Dropdown Menu / Avatar */}
            <div className="relative flex justify-between items-center gap-2">
              {/* Dark/Light Mode Toggle (Desktop) */}
              <button
                onClick={toggleTheme}
                className='flex items-center px-3 py-2 text-gray-500 hover:bg-lime-300 rounded-full transition'
              >
                {theme === 'light' ? (
                  <MdDarkMode className='w-6 h-6' />
                ) : (
                  <MdLightMode className='w-6 h-6' />
                )}
              </button>
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 md:py-1 md:px-2  flex items-center gap-3 rounded-full cursor-pointer hover:bg-lime-200 hover:shadow-md transition"
              >
                <img
                  className="rounded-full w-8 h-8"
                  referrerPolicy="no-referrer"
                  src={user && user.photoURL ? user.photoURL : avatarImg}
                  alt="profile"
                />
              </div>

              {isOpen && (
                <div className="absolute rounded-b-xl shadow-md w-[40vw] md:w-[12vw] bg-gray-400 overflow-hidden right-0 top-14 text-center text-sm z-20">
                  <div className="flex flex-col cursor-pointer">

                    {/* Mobile nav links */}
                    <div className="block md:hidden">
                      {navLinks.map(link => (
                        <NavLink
                          key={link.name}
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                          className={({ isActive }) =>
                            isActive
                              ? 'px-4 py-3 bg-lime-100 font-semibold block'
                              : 'px-4 py-3 hover:bg-neutral-100 font-semibold block transition'
                          }
                        >
                          {link.name}
                        </NavLink>
                      ))}
                    </div>

                    {/* User options */}
                    {user ? (
                      <>
                        <NavLink
                          to="/dashboard"
                          onClick={() => setIsOpen(false)}
                          className={({ isActive }) =>
                            isActive
                              ? 'px-4 py-3 bg-lime-100 font-semibold block'
                              : 'px-4 py-3 hover:bg-gray-500 hover:text-black  font-bold transition'
                          }
                        >
                          Dashboard
                        </NavLink>
                        <NavLink
                          to="/dashboard/profile"
                          onClick={() => setIsOpen(false)}
                          className="px-4 py-3 hover:bg-gray-500 hover:text-black  font-bold block transition"
                        >
                          Profile
                        </NavLink>

                        {/*  Dark/Light Mode Toggle (Mobile) */}
                        <button
                          onClick={() => {
                            toggleTheme()
                            setIsOpen(false)
                          }}
                          className='flex items-center justify-center px-4 py-3 hover:bg-gray-500 hover:text-black  font-bold rounded transition'
                        >
                          <span className=' text-sm hover:bg-gray-500 hover:text-black  font-bold'>
                            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                          </span>
                        </button>

                        <div
                          onClick={() => {
                            logOut()
                            setIsOpen(false)
                          }}
                          className="px-4 py-3 hover:bg-gray-500 hover:text-black  font-bold block cursor-pointer transition"
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <NavLink
                          to="/login"
                          onClick={() => setIsOpen(false)}
                          className={({ isActive }) =>
                            isActive
                              ? 'px-4 py-3 bg-lime-100 font-semibold block'
                              : 'px-4 py-3 hover:bg-neutral-100 font-semibold block transition'
                          }
                        >
                          Login
                        </NavLink>
                        <NavLink
                          to="/signup"
                          onClick={() => setIsOpen(false)}
                          className={({ isActive }) =>
                            isActive
                              ? 'px-4 py-3 bg-lime-100 font-semibold block'
                              : 'px-4 py-3 hover:bg-neutral-100 font-semibold block transition'
                          }
                        >
                          Sign Up
                        </NavLink>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
