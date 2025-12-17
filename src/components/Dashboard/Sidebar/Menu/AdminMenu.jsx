import { FaUserCog } from 'react-icons/fa'
import { AiFillProduct } from "react-icons/ai";

import MenuItem from './MenuItem'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem icon={AiFillProduct} label='All Products' address='all-products' />
    </>
  )
}

export default AdminMenu
