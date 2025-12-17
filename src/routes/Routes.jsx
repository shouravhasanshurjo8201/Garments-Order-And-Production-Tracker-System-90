import { createBrowserRouter } from 'react-router'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import Profile from '../pages/Dashboard/Common/Profile'
import Statistics from '../pages/Dashboard/Common/Statistics'
import MainLayout from '../layouts/MainLayout'
import MyInventory from '../pages/Dashboard/Manager/MyInventory'
import ManageOrders from '../pages/Dashboard/Manager/ManageOrders'
import BookingPage from '../pages/BookingPage/BookingPage'
import ProductDetails from '../pages/ProductDetails/ProductDetails'
import AddProduct from '../pages/Dashboard/Manager/AddProduct'
import AllProducts from '../pages/AllProducts/AllProducts'
import About from '../pages/About/About'
import Contact from '../pages/Contact/Contact'
import MyOrders from '../pages/Dashboard/Buyer/MyOders'
import TrackOrder from '../pages/Dashboard/Buyer/TrackOrder'
import AdminAllProducts from '../pages/Dashboard/Admin/AllProducts'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/products',
        element: <AllProducts />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact/>,
      },
      {
        path: '/products/:id',
        element: <PrivateRoute><ProductDetails /></PrivateRoute>,
      },
      {
        path: '/products/booking/:id',
        element: <PrivateRoute><BookingPage /></PrivateRoute>,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: 'add-plant',
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-inventory',
        element: (
          <PrivateRoute>
            <MyInventory />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: 'all-products',
        element: (
          <PrivateRoute>
            <AdminAllProducts />
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-orders',
        element: (
          <PrivateRoute>
            <MyOrders/>
          </PrivateRoute>
        ),
      },
      {
        path: 'track-order/:orderId',
        element: (
          <PrivateRoute>
            <TrackOrder/>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-orders',
        element: <ManageOrders />,
      },
    ],
  },
])
