// import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { TbFidgetSpinner } from 'react-icons/tb'
// import { ScaleLoader } from 'react-spinners'

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      <TbFidgetSpinner className="animate-spin text-7xl text-lime-500"/>
      {/* <AiOutlineLoading3Quarters className="animate-spin text-4xl text-lime-500" /> */}

    </div>
  )
}

export default LoadingSpinner
