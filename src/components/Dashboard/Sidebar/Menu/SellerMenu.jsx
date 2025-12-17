import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'
const SellerMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label='Add Product'
        address='add-plant'
      />
      <MenuItem icon={MdHomeWork} label='Update Product' address='my-inventory' />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Pending Orders'
        address='manage-orders'
      />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Approved Orders'
        address='approved-orders'
      />
    </>
  )
}

export default SellerMenu
