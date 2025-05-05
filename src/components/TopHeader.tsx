"use client";

import { Button } from "@/components/ui/button";
import { Home, MoveRight, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaFacebookF, FaGoogle, FaSearch, FaTwitter } from "react-icons/fa";

// TopHeader Component
const TopHeader: React.FC = () => {
  return (
    <div className="bg-white shadow-sm py-4 border-b border-gray-200">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between">
        {/* Logo - INCREASED SIZE */}
        <div className="flex items-center gap-2 min-w-[200px]">
          <img
            src="/logo.png"
            alt="logo"
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Currency Exchange Center - INCREASED TEXT SIZE AND GAPS */}
        <div className="flex items-center gap-13 text-gray-800 font-medium hidden sm:flex">
          <div className="flex items-center gap-3">
            <span className="text-black font-normal text-xl">Dollar:</span>
            <span className="text-gray-500 font-normal text-xl">35,4789</span>
            <img src="/TrendUp.png" alt="Up Arrow" className="h-7 w-7 mt-0.5" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-black font-normal text-xl">Euro:</span>
            <span className="text-gray-500 font-normal text-xl">36,6475</span>
            <img src="/TrendUp.png" alt="Up Arrow" className="h-7 w-7 mt-0.5" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-black font-normal text-xl">Altın:</span>
            <span className="text-gray-500 font-normal text-xl">36,6475</span>
            <img
              src="/TrendDown.png"
              alt="Down Arrow"
              className="h-7 w-7 mt-0.5"
            />
          </div>
        </div>

        {/* Search & Social Icons */}
        <div className="flex items-center gap-7">
          {/* Search Bar - BORDER BLACK, INCREASED TEXT SIZE */}
          <div className="relative mr-12">
            <input
              type="text"
              placeholder="SEARCH"
              className="px-4 py-2 pl-4 pr-8  border-2 border-black rounded-full text-base text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button className="absolute right-4 top-3 text-gray-600">
              <FaSearch className="text-lg" />
            </button>
          </div>

          {/* Social Icons - INCREASED SIZE, REDUCED GAPS */}
          <div className="flex items-center gap-6 text-gray-700">
            <a href="#" aria-label="Facebook" className="text-xl">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Twitter" className="text-xl">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Google" className="text-xl">
              <FaGoogle />
            </a>
          </div>
        </div>

        {/* Mobile Currency Center - INCREASED TEXT SIZE */}
        <div className="sm:hidden flex flex-wrap gap-4 mt-3 text-gray-800 font-medium">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-semibold text-base">
              Dollar:
            </span>
            <span className="text-gray-700 text-base">35,4789</span>
            <img
              src="/up-arrow.png"
              alt="Up Arrow"
              className="h-4 w-4 mt-0.5"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-semibold text-base">Euro:</span>
            <span className="text-gray-700 text-base">36,6475</span>
            <img
              src="/up-arrow.png"
              alt="Up Arrow"
              className="h-4 w-4 mt-0.5"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-semibold text-base">
              Altın:
            </span>
            <span className="text-gray-700 text-base">36,6475</span>
            <img
              src="/TrendDown.png"
              alt="Down Arrow"
              className="h-4 w-4 mt-0.5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Navigation Component
const MainNavigation: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState<boolean>(false);

  const navigationItems = [
    {
      title: "",
      href: "/",
      icon: <Home size={26} />,
    },
    { title: "SON DAKİKA", href: "/son-dakika" },
    { title: "GÜNDEM", href: "/gundem" },
    { title: "SPOR", href: "/spor" },
    { title: "EKONOMİ", href: "/ekonomi" },
    { title: "TEKNOLOJİ", href: "/teknoloji" },
    { title: "WEB TV", href: "/web-tv" },
    { title: "FOTO GALERİ", href: "/foto-galeri" },
    { title: "YAZARLAR", href: "/yazarlar" },
    { title: "NEVBAHAR", href: "/nevbahar" },
  ];

  return (
    <header className="w-full bg-[#eceff4] border-b-4 border-orange-500  pb-4">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between ">
          <div className="flex items-center space-x-12.5 w-full overflow-x-auto">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`relative px-2 sm:px-3 py-1.5 sm:py-2 flex items-center text-sm sm:text-base font-medium uppercase whitespace-nowrap ${
                    isActive ? "bg-blue-200" : ""
                  }`}
                >
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  {item.title}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[5px] bg-red-600"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Menu Image - Always Visible */}
          <div className="ml-4 flex items-center">
            <Button
              variant="ghost"
              onClick={() => setOpen(!isOpen)}
              className="p-0"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <img
                  src="/Menu-items.png"
                  alt="Menu"
                  className="h-12 w-auto object-contain cursor-pointer"
                />
              )}
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="bg-white shadow-md py-4 px-6 flex flex-col space-y-4">
          {navigationItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="flex justify-between items-center"
            >
              <span>{item.title}</span>
              <MoveRight className="w-4 h-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

// Combined Header Component
const CombinedHeader: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <TopHeader />
      <MainNavigation />
    </div>
  );
};

export default CombinedHeader;
