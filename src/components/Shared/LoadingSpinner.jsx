// const LoadingSpinner = ({ smallHeight }) => {
//   return (
//     <div
//       className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
//       flex 
//       flex-col 
//       justify-center 
//       items-center 
//       space-y-4`}
//     >
//       {/* Professional Gradient Spinner */}
//       <div className="relative flex items-center justify-center">
//         {/* Outer Ring (Static Track) */}
//         <div className="w-12 h-12 border-4 border-lime-100 rounded-full"></div>
        
//         {/* Inner Spinning Ring (The Accent) */}
//         <div className="absolute w-12 h-12 border-4 border-t-lime-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
//       </div>

//       {/* Subtle Animated Text */}
//       <div className="flex items-center space-x-1">
//         <span className="text-sm font-semibold tracking-widest uppercase text-slate-500">
//           Loading
//         </span>
//         <span className="flex space-x-1">
//           <span className="w-1 h-1 bg-lime-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
//           <span className="w-1 h-1 bg-lime-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
//           <span className="w-1 h-1 bg-lime-500 rounded-full animate-bounce"></span>
//         </span>
//       </div>
//     </div>
//   )
// }

// export default LoadingSpinner


const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
      flex 
      flex-col 
      justify-center 
      items-center 
      bg-white/50 backdrop-blur-sm`}
    >
      <div className="relative flex flex-col items-center">
        {/* Modern Geometric Pulse */}
        <div className="relative flex items-center justify-center w-16 h-16">
          {/* Outer expanding ripple */}
          <div className="absolute inset-0 rounded-xl bg-lime-400/20 animate-ping"></div>
          {/* Inner solid core */}
          <div className="relative w-8 h-8 bg-lime-500 rounded-lg shadow-lg shadow-lime-200 animate-pulse rotate-45"></div>
        </div>

        {/* Minimal Progress Line */}
        <div className="mt-8 w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className="w-full h-full bg-lime-500 origin-left animate-progress-line"></div>
        </div>

        {/* Clean Typography */}
        <p className="mt-4 text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 ml-[0.3em]">
          Syncing Data
        </p>
      </div>

      <style jsx>{`
        @keyframes progress-line {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        .animate-progress-line {
          animation: progress-line 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  )
}

export default LoadingSpinner