import { RiUserSettingsFill, RiShoppingBag3Fill } from 'react-icons/ri';
import { HiCollection } from "react-icons/hi";
import MenuItem from './MenuItem';

const AdminMenu = () => {
  return (
    <>
      <MenuItem 
        icon={RiUserSettingsFill} 
        label='Manage Users' 
        address='manage-users' 
      />

      <MenuItem 
        icon={HiCollection} 
        label='All Products' 
        address='all-products' 
      />

      <MenuItem 
        icon={RiShoppingBag3Fill} 
        label='All Orders' 
        address='all-orders' 
      />
    </>
  )
}

export default AdminMenu;