export function HeroSkeleton() {
  return (
    <div className="flex flex-col items-center px-10 py-10">
      <div className="flex gap-[3vw] h-[clamp(7rem,20vw,175px)] items-center">
        <div className="h-[clamp(10rem,20vw,200px)] w-[clamp(5rem,10vw,100px)] bg-gray-200 animate-pulse rounded"></div>
        <div className="h-[clamp(10rem,20vw,200px)] w-[clamp(10rem,20vw,200px)] bg-gray-200 animate-pulse rounded"></div>
        <div className="h-[clamp(7rem,20vw,175px)] w-[clamp(5rem,10vw,100px)] bg-gray-200 animate-pulse rounded"></div>
      </div>
      <div className="flex gap-[3vw] h-[clamp(10rem,25vw,250px)] items-center mt-4">
        <div className="h-[clamp(10rem,20vw,200px)] w-[clamp(10rem,20vw,200px)] bg-gray-200 animate-pulse rounded"></div>
        <div className="h-[clamp(10rem,25vw,250px)] w-[clamp(5rem,10vw,100px)] bg-gray-200 animate-pulse rounded"></div>
      </div>
      <div className="flex gap-[3vw] h-[clamp(7rem,20vw,175px)] items-center mt-4">
        <div className="h-[clamp(10rem,20vw,200px)] w-[clamp(10rem,20vw,200px)] bg-gray-200 animate-pulse rounded"></div>
        <div className="h-[clamp(7rem,20vw,175px)] w-[clamp(5rem,10vw,100px)] bg-gray-200 animate-pulse rounded"></div>
      </div>
      <div className="mt-8 w-full max-w-2xl">
        <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
      </div>
    </div>
  );
}

export function ProductsListSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mt-12 lg:justify-items-center lg:w-fit lg:mx-auto lg:gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col relative min-h-[15rem] lg:min-h-[20rem] max-w-[15rem] lg:w-[15rem]"
        >
          <div className="flex justify-center items-center flex-1 mb-4">
            <div className="w-[70%] h-[70%] bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="px-2 mb-2">
            <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="px-2">
            <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ValuesSkeleton() {
  return (
    <div className="flex flex-col-reverse justify-center items-center md:flex-row lg:px-10 lg:gap-4">
      <div className="mt-24 mb-24 lg:flex-1 space-y-4">
        <div className="h-8 bg-gray-200 animate-pulse rounded w-full"></div>
        <div className="h-8 bg-gray-200 animate-pulse rounded w-5/6"></div>
        <div className="h-8 bg-gray-200 animate-pulse rounded w-full"></div>
        <div className="h-8 bg-gray-200 animate-pulse rounded w-4/5"></div>
        <div className="h-8 bg-gray-200 animate-pulse rounded w-full"></div>
        <div className="h-8 bg-gray-200 animate-pulse rounded w-3/4"></div>
      </div>
      <div className="mt-24 md:mt-0 lg:w-[35%] lg:ml-[8rem]">
        <div className="w-full aspect-square bg-gray-200 animate-pulse rounded"></div>
      </div>
    </div>
  );
}
