export function PostDetailsSkeleton() {
  return (
    <main className="w-full h-full flex justify-center animate-pulse">
      <div className="w-full px-4 lg:w-[60%] xl:w-[40%] pt-12 flex flex-col gap-10 items-center">
        <div className="w-full text-center">
          <div className="h-12 w-2/3 mx-auto bg-gray-200 rounded-md" />
        </div>
        <div className="flex justify-start items-center gap-2">
            <div className="h-8 w-20 bg-gray-200 rounded-md" />
            <div className="h-8 w-24 bg-gray-200 rounded-md" />
        </div>
        <div className="w-full flex flex-col gap-6">
        <div className="h-30 bg-gray-200 rounded-md mb-3 " />
        <div className="h-40 bg-gray-200 rounded-md mb-3 " />
        <div className="h-20 bg-gray-200 rounded-md mb-3 " />
        </div>
      </div>
    </main>
  );
}
