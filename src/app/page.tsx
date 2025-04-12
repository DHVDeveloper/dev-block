import Image from "next/image";
import { MdOutlineArrowRightAlt } from "react-icons/md";

export default function Home() {
  return (
    <div className="w-full h-[100vh] top-0 absolute flex justify-center flex-col text-center items-center">
      <h1 className="text-5xl md:text-7xl font-bold">DEV BLOCK</h1>
      <span className="text-gray-400 text-md mb-8 max-w-2xl mx-auto">
        Tu rincón para crecer como desarrollador web.
      </span>
      <div className="flex gap-3 mt-4 mb-6 ">
        <button className="p-1 border cursor-pointer border-[#08090a26] bg-[#08090a08] text-center rounded-lg px-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-[#08090a]">
          Únete ahora
        </button>
        <button className="group cursor-pointer font-light relative flex items-center justify-center gap-2 bg-green-100 border border-green-400 text-green-800 text-md px-5 py-2 rounded-md transition-all duration-300 hover:bg-green-200 hover:shadow-lg hover:-translate-y-0.5">
          Descubre e inspira
          <MdOutlineArrowRightAlt className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
