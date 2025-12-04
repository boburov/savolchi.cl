"use client";

import {
  Menu,
  LayoutDashboard,
  User,
  BarChart2,
  Settings,
  LogOut,
  LifeBuoy,
  Mail,
  FileQuestion,
  Trophy,
  LogIn,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/savolchi.svg";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const Header = () => {
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Doimiy height: py-3 (yoki boshqa px) + flex gap bilan balandlik saqlanadi
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="container py-2 flex items-center justify-between min-h-[64px]">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center text-2xl font-bold text-[#1c1c1c] gap-3"
        >
          <Image src={logo} alt="Savolchi logo" className="w-7 h-7" />
          Savolchi
        </Link>

        {/* Right section */}
        <div className="flex items-center gap-5 text-gray-700 font-medium">
          {loading ? (
            // Loading holati: joyni saqlash uchun placeholder
            <div className="w-32 h-10 rounded-full bg-gray-100 animate-pulse" />
          ) : user ? (
            // Authenticated user
            <>
              <Link
                href="/tests"
                className="flex items-center gap-1 hover:text-purple-700 transition"
              >
                <FileQuestion size={18} /> Testlar
              </Link>
              <Link
                href="/leaderboard"
                className="flex items-center gap-1 hover:text-purple-700 transition"
              >
                <Trophy size={18} /> Reyting
              </Link>
              <Link
                href="/support"
                className="flex items-center gap-1 hover:text-purple-700 transition"
              >
                <LifeBuoy size={18} /> Support
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-1 hover:text-purple-700 transition"
              >
                <Mail size={18} /> Contact
              </Link>

              {/* Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-2 bg-purple-200 text-purple-700 hover:bg-purple-300 px-3 py-2.5 rounded-full transition-colors duration-200 font-semibold"
                >
                  <Menu size={18} />
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden animate-fadeIn">
                    <div className="px-4 py-2 border-b bg-purple-50 text-purple-700 font-semibold">
                      {user.username || "Foydalanuvchi"}
                    </div>
                    <nav className="flex flex-col text-gray-700">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-purple-50 transition"
                        onClick={() => setOpen(false)}
                      >
                        <LayoutDashboard size={18} /> Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-purple-50 transition"
                        onClick={() => setOpen(false)}
                      >
                        <User size={18} /> Profil
                      </Link>
                      <Link
                        href="/statistics"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-purple-50 transition"
                        onClick={() => setOpen(false)}
                      >
                        <BarChart2 size={18} /> Statistika
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-purple-50 transition"
                        onClick={() => setOpen(false)}
                      >
                        <Settings size={18} /> Sozlamalar
                      </Link>
                      <button
                        className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 transition text-left"
                        onClick={() => {
                          localStorage.removeItem("token");
                          localStorage.removeItem("refreshToken");
                          router.push("/auth/login");
                        }}
                      >
                        <LogOut size={18} /> Chiqish
                      </button>
                    </nav>
                  </div>
                )}
              </div>
            </>
          ) : (
            // Not authenticated
            <>
              <Link
                href="/support"
                className="flex items-center gap-1 hover:text-purple-700 transition"
              >
                <LifeBuoy size={18} /> Support
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-1 hover:text-purple-700 transition"
              >
                <Mail size={18} /> Contact
              </Link>
              <Link
                href="/auth/login"
                className="flex items-center gap-2 bg-purple-200 text-purple-700 hover:bg-purple-300 px-3 py-2 rounded-full transition-colors duration-200 font-semibold"
              >
                <LogIn size={18} /> Kirish
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
