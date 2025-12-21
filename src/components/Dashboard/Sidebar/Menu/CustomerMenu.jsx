import MenuItem from './MenuItem'
import { MdOutlineLocalMall } from "react-icons/md";
const CustomerMenu = () => {

  return (
    <>
      <MenuItem icon={MdOutlineLocalMall} label='My Orders' address='my-orders' />
    </>
  )
}

export default CustomerMenu
