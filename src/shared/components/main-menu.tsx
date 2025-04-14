"use client";

import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiBookOpen, FiHome } from "react-icons/fi";
import { HiCubeTransparent } from "react-icons/hi";
import { signOut } from "next-auth/react";
import { useState, useRef } from "react";
import useClickOutside from "@/utils/useClickOutSide";
import { TiUser } from "react-icons/ti";

export function MainMenu({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  const navItems = [
    { name: "Home", href: "/", icon: <FiHome /> },
    { name: "Blog", href: "/blog", icon: <FiBookOpen /> },
  ];

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
  };

  return (
    <div className="fixed z-50 top-0 w-full pt-6">
      <div className="rounded-xl bg-[#08090a08] text-sm border px-2 min-w-[40rem] border-[#e4e4e766] backdrop-blur-md flex items-center justify-between w-fit max-w-[66rem] h-auto ml-auto gap-4 mr-auto p-1 transition-all">
        <nav className="flex items-center gap-4">
          <span className="text-[26px] text-gray-600">
            <HiCubeTransparent />
          </span>
          <ul className="flex space-x-1 md:space-x-2">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <li key={item.name} className="cursor-pointer">
                  <Link
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-xl text-sm transition-all duration-200 gap-2
                    ${
                      isActive
                        ? "text-[#064e3b] bg-[#4cffcf25]"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {session?.user ? (
          <div className="flex font-[12px] flex-nowrap justify-end text-nowrap text-sm gap-2 items-center">
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              {session.user.name}
              {session.user.image ? (
                <Image
                  className="rounded-full"
                  src={session.user.image}
                  alt="User profile img"
                  width={30}
                  height={30}
                />
              ) : (
                <div className="text-[22px] text-[#3a3a3a]">
                  <TiUser />
                </div>
              )}
            </div>
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 top-[101%] mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg p-2"
              >
                <button
                  onClick={handleSignOut}
                  className="w-full cursor-pointer text-left text-sm text-red-600 hover:bg-gray-100 p-2 rounded-md"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              href="/login"
              className="py-1 flex items-center border cursor-pointer border-[#08090a26] text-center rounded-lg px-3"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="p-1 flex items-center border text-nowrap cursor-pointer text-center px-3 bg-black text-white rounded-lg"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
