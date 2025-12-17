import { FaUserCog } from 'react-icons/fa'
import { AiFillProduct } from "react-icons/ai";
import { IoIosBasket } from "react-icons/io";


import MenuItem from './MenuItem'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem icon={AiFillProduct} label='All Products' address='all-products' />
      <MenuItem icon={IoIosBasket} label='All Orders' address='all-orders' />
    </>
  )
}

export default AdminMenu
