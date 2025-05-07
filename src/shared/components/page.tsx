interface PageProps {
  children: React.ReactNode;
  title: string;
}
export function Page({ title, children }: PageProps) {
  return (
    <main className="w-full h-full flex justify-center">
      <div className="w-full px-4 lg:w-[60%] xl:w-[40%] pt-12 flex flex-col gap-10 items-center">
        <div className="w-full text-center">
          <h1 className="font-extrabold text-black text-4xl">{title}</h1>
        </div>
        <div className="w-full">
          {children}
        </div>
      </div>
    </main>
  );
}
