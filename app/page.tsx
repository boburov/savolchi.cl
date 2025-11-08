"use client";

import { CheckCircle, Book, UserCheck, Star } from "lucide-react";
import Link from "next/link";
import UnAuthHeader from "./components/UnAuthHeader";

const HomePage = () => {
  return (
    <>
    <UnAuthHeader/>
      <div className="min-h-screen flex flex-col items-center justify-start px-4 py-12 container border-x border-gray-300 mx-auto">
        <section className="text-center mb-12">
          <h1 className="text-purple-700 text-4xl sm:text-5xl font-bold mb-2 leading-tight">
            Savolchi
          </h1>
          <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-4">
            Biz bilan testga emas, ishga tayyorlaning <br />
            O‘zingizni sinab ko‘ring, bilimlaringizni oshiring
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-4">
            <Link
              href={"/auth/login"}
              className="bg-purple-700 text-white rounded-lg px-6 py-2.5 text-base font-semibold shadow-md hover:bg-purple-800 transition flex items-center gap-1.5 justify-center"
            >
              <CheckCircle size={18} /> Boshlash
            </Link>
            <Link
              href={"/support"}
              className="bg-purple-200 text-purple-700 rounded-lg px-6 py-2.5 text-base font-semibold hover:bg-purple-300 transition flex items-center gap-1.5 justify-center"
            >
              <Star size={18} /> Qo‘llab Quvvatlash
            </Link>
          </div>
          <p className="text-gray-500 mt-2 text-xs sm:text-sm">
            Hozir ro‘yxatdan o‘ting va 1000+ fan bo‘yicha testlarga kirish
            imkoniga ega bo‘ling!
          </p>
        </section>

        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-12">
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex flex-col items-center text-center">
            <Book className="text-purple-700 mb-2" size={32} />
            <h3 className="font-bold text-sm mb-1">Hamma fanlar</h3>
            <p className="text-gray-500 text-xs">
              Matematika, Fizika, Informatika, Kimyo va boshqa ko‘plab fanlar
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex flex-col items-center text-center">
            <UserCheck className="text-purple-700 mb-2" size={32} />
            <h3 className="font-bold text-sm mb-1">1000+ foydalanuvchi</h3>
            <p className="text-gray-500 text-xs">
              Siz bilan birga minglab foydalanuvchilar bilimlarini oshirmoqda
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex flex-col items-center text-center">
            <Star className="text-purple-700 mb-2" size={32} />
            <h3 className="font-bold text-sm mb-1">Darajali testlar</h3>
            <p className="text-gray-500 text-xs">
              Boshlang‘ichdan murakkabgacha, har bir foydalanuvchi darajasiga
              mos testlar
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex flex-col items-center text-center">
            <CheckCircle className="text-purple-700 mb-2" size={32} />
            <h3 className="font-bold text-sm mb-1">Real vaqt natijalar</h3>
            <p className="text-gray-500 text-xs">
              Test natijalaringizni darhol ko‘ring va bilimlaringizni tahlil
              qiling
            </p>
          </div>
        </section>

        <section className="bg-purple-100 w-full py-12 flex flex-col items-center text-center mb-12 rounded-xl">
          <h2 className="text-purple-700 text-2xl sm:text-3xl font-bold mb-4">
            Siz tayyor bo‘lishingiz kerak
          </h2>
          <p className="text-gray-700 mb-4 text-sm sm:text-base">
            Har bir test sizni ishga tayyorlaydi, har bir savol bilimlaringizni
            oshiradi. Savolchi platformasi orqali siz o‘zingizni
            rivojlantirishingiz va kelajakdagi ishlaringizga tayyor bo‘lishingiz
            mumkin.
          </p>
          <Link
            href={"/auth/login"}
            className="bg-purple-700 text-white rounded-lg px-6 py-2.5 text-base font-semibold shadow-md hover:bg-purple-800 transition flex items-center gap-1.5"
          >
            <CheckCircle size={18} /> Ro‘yxatdan o‘tish
          </Link>
        </section>

        <section className="text-center text-gray-600 text-xs sm:text-sm">
          <p>
            Savolchi - bu Boburov Shukurullo tomonidan yaratilgan ta’lim
            platformasi. Maqsad: foydalanuvchilarni test orqali ishga tayyorlash
            va bilimlarini oshirish.
          </p>
          <p className="mt-1">
            Platforma Next.js & TailwindCSS yordamida qurilgan, va barcha
            testlar real vaqt natijalari bilan ta’minlangan.
          </p>
        </section>
      </div>
    </>
  );
};

export default HomePage;
