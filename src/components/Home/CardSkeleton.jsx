const CardSkeleton = () => {
  return (
    <div className="bg-white/40 p-4 rounded-2xl shadow animate-pulse flex flex-col gap-4">
      <div className="w-full aspect-[4/3] bg-gray-300/50 rounded-xl" />
      <div className="h-4 bg-gray-300/50 rounded w-3/4" />
      <div className="h-3 bg-gray-300/50 rounded w-full" />
      <div className="h-3 bg-gray-300/50 rounded w-2/3" />
      <div className="h-10 bg-gray-300/50 rounded-xl mt-2" />
    </div>
  );
};

export default CardSkeleton;
