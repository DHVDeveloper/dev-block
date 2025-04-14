import Image from "next/image";
import { HiCubeTransparent } from "react-icons/hi";
import { MdOutlineArrowRightAlt } from "react-icons/md";

export default function Home() {
  return (
    <div className="w-full h-full top-0 absolute flex justify-center flex-col text-center items-center">
      <h1 className="text-5xl md:text-7xl font-bold flex items-center gap-2"><HiCubeTransparent />DEV BLOCK</h1>
      <span className="text-gray-400 text-md mb-8 max-w-2xl mx-auto">
        Your corner to grow as a web developer.
      </span>
      <div className="flex gap-3 mt-4 mb-6 ">
        <button className="p-1 border cursor-pointer border-[#08090a26] bg-[#08090a08] text-center rounded-lg px-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-[#08090a]">
          Join Now
        </button>
        <button className="group cursor-pointer font-light relative flex items-center justify-center gap-2 border text-white bg-black text-md px-5 py-2 rounded-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
          Discover and inspire
          <MdOutlineArrowRightAlt className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
