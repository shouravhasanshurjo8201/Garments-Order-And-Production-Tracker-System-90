
import {
  MdFormatListBulletedAdd,
  MdAssignmentTurnedIn,
  MdOutlinePendingActions
} from 'react-icons/md';
import { FaBoxes } from 'react-icons/fa';
import MenuItem from './MenuItem';

const ManagerMenu = () => {
  return (
    <>
      <MenuItem
        icon={MdFormatListBulletedAdd}
        label='Add Product'
        address='add-plant'
      />

      <MenuItem
        icon={FaBoxes}
        label='Manage Products'
        address='manage-products'
      />

      <MenuItem
        icon={MdOutlinePendingActions}
        label='Pending Orders'
        address='manage-orders'
      />

      <MenuItem
        icon={MdAssignmentTurnedIn}
        label='Approved Orders'
        address='approved-orders'
      />
    </>
  )
}

export default ManagerMenu;