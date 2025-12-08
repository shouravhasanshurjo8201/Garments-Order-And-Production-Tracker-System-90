import Container from '../Container'
import { useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'
import logo from '../../../assets/images/logo-flat.png'
import { Link, NavLink } from 'react-router'

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">

            {/* Logo */}
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className="h-8 w-15 hover:bg-blue-50 rounded-sm"
                width="100"
                height="100"
              />
            </Link>

            {/* Nav Links (Desktop) */}
            <div className="hidden md:flex gap-6">
              {navLinks.map(link => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? 'font-semibold text-lime-500'
                      : 'font-semibold text-gray-700 hover:text-lime-500 transition'
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Dropdown Menu / Avatar */}
            <div className="relative">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
              >
                <img
                  className="rounded-full"
                  referrerPolicy="no-referrer"
                  src={user && user.photoURL ? user.photoURL : avatarImg}
                  alt="profile"
                  height="30"
                  width="30"
                />
              </div>

              {isOpen && (
                <div className="absolute rounded-b-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-center text-sm">
                  <div className="flex flex-col cursor-pointer">
                    {/* Mobile nav links */}
                    <div className="block md:hidden">
                      {navLinks.map(link => (
                        <NavLink
                          key={link.name}
                          to={link.path}
                          className={({ isActive }) =>
                            isActive
                              ? 'px-4 py-3 bg-lime-100 font-semibold block'
                              : 'px-4 py-3 hover:bg-neutral-100 font-semibold block'
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
                          className={({ isActive }) =>
                            isActive
                              ? 'px-4 py-3 bg-lime-100 font-semibold block'
                              : 'px-4 py-3 hover:bg-neutral-100 font-semibold block'
                          }
                        >
                          Dashboard
                        </NavLink>
                        <div
                          onClick={logOut}
                          className="px-4 py-3 hover:bg-neutral-100 font-semibold cursor-pointer block"
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <NavLink
                          to="/login"
                          className={({ isActive }) =>
                            isActive
                              ? 'px-4 py-3 bg-lime-100 font-semibold block'
                              : 'px-4 py-3 hover:bg-neutral-100 font-semibold block'
                          }
                        >
                          Login
                        </NavLink>
                        <NavLink
                          to="/signup"
                          className={({ isActive }) =>
                            isActive
                              ? 'px-4 py-3 bg-lime-100 font-semibold block'
                              : 'px-4 py-3 hover:bg-neutral-100 font-semibold block'
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
