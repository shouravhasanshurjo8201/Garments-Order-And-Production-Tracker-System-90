import { TbAlertCircle } from 'react-icons/tb';
import Button from '../components/Shared/Button/Button'
import { useLocation, useNavigate } from 'react-router'
import { useEffect } from 'react';

const ErrorPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const errorMessage = state?.message || "Something went wrong!";
  useEffect(() => {
    document.title = "Error Page | Garments Production System";
  }, []);
  return (
    <section className='bg-white'>
      <div className='container flex items-center min-h-screen px-6 py-12 mx-auto'>
        <div className='flex flex-col items-center max-w-sm mx-auto text-center'>

          {/* Error Icon */}
          <TbAlertCircle className="text-6xl text-red-500 mb-4 animate-pulse" />

          <p className='mt-4 text-gray-500'>Here are some helpful links:</p>

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-4 p-3 text-sm text-red-700 bg-red-100 rounded-md w-full">
              {errorMessage}
            </div>
          )}

          <div className='flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto'>
            <button
              onClick={() => navigate(-1)}
              className='flex items-center justify-center w-30 h-12 font-bold px-5 py-1 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100 '
            >
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-5 h-5 rtl:rotate-180 text-lime-500'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18' />
              </svg>
              <span>Go Back</span>
            </button>

            <div className='w-30'><Button label={'Go Home'} onClick={() => navigate('/')} /></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ErrorPage
