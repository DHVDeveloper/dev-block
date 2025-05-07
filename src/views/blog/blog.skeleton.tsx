export function BlogSkeleton(){
    return (
        <main className="w-full h-full flex justify-center animate-pulse">
      <div className="w-full px-4 lg:w-[60%] xl:w-[40%] pt-12 flex flex-col gap-10 items-center">
        <div className="w-full text-center">
          <div className="h-8 w-1/3 mx-auto bg-gray-200 rounded-md" />
        </div>

        <div className="w-full flex flex-col gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border border-gray-200 p-4 rounded-2xl shadow-sm w-full">
              <div className="flex flex-wrap gap-2 mb-3">
                <div className="h-5 w-20 bg-gray-200 rounded-full" />
                <div className="h-5 w-16 bg-gray-200 rounded-full" />
              </div>

              <div className="h-6 bg-gray-200 rounded-md mb-3 w-5/6" />
              <div className="flex items-center gap-2 mt-3 mb-3">
                <div className="h-8 w-8 rounded-full bg-gray-200" />
                <div className="h-4 w-32 bg-gray-200 rounded-md" />
              </div>
              <div className="h-4 w-full bg-gray-200 rounded-md mb-1" />
              <div className="h-4 w-5/6 bg-gray-200 rounded-md mb-1" />
              <div className="h-4 w-2/3 bg-gray-200 rounded-md" />
              <div className="flex items-center gap-2 mt-4">
                <div className="h-4 w-24 bg-gray-200 rounded-md" />
                <div className="h-4 w-8 bg-gray-200 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
    )
}