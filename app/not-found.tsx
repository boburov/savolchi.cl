import Link from "next/link";
import { ArrowLeft, Construction, Home } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          {/* Icon + Big Text */}
          <div className="mb-8 animate-bounce">
            <Construction className="w-24 h-24 mx-auto text-purple-600" />
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 mb-4">
            404
          </h1>

          <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Kechirasiz, bu sahifa hali ishlab chiqilmoqda 🚧
          </p>

          <p className="text-lg text-gray-600 mb-10">
            Biz kunu-tun kod yozayapmiz... biroz kuting aka/ukajon 😭💜
          </p>

          {/* Button with cool hover effect */}
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
          >
            <Home className="w-6 h-6" />
            Bosh sahifaga qaytish
            <ArrowLeft className="w-5 h-5" />
          </Link>

          {/* Little easter egg */}
          <p className="mt-10 text-sm text-gray-500">
            Made with 💜 using Next.js + Tailwind + lucide-react
          </p>
        </div>
      </div>
    </>
  );
}
