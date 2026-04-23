const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
      flex 
      flex-col 
      justify-center 
      items-center 
      space-y-4`}
    >
      {/* Professional Gradient Spinner */}
      <div className="relative flex items-center justify-center">
        {/* Outer Ring (Static Track) */}
        <div className="w-12 h-12 border-4 border-lime-100 rounded-full"></div>
        
        {/* Inner Spinning Ring (The Accent) */}
        <div className="absolute w-12 h-12 border-4 border-t-lime-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>

      {/* Subtle Animated Text */}
      <div className="flex items-center space-x-1">
        <span className="text-sm font-semibold tracking-widest uppercase text-slate-500">
          Loading
        </span>
        <span className="flex space-x-1">
          <span className="w-1 h-1 bg-lime-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-1 h-1 bg-lime-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-1 h-1 bg-lime-500 rounded-full animate-bounce"></span>
        </span>
      </div>
    </div>
  )
}

export default LoadingSpinner