"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react"; // React's use() to unwrap the Promise
import { Key } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "@/public/savolchi.svg";
import authService from "@/app/api/service/auth.service";

interface Props {
  searchParams: Promise<{ email?: string }>; // Promise from Server Component
}

const VerifyEmailPage = ({ searchParams }: Props) => {
  const router = useRouter();
  const resolvedParams = use(searchParams); // Unwrap safely
  const emailFromQuery = resolvedParams?.email;

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!emailFromQuery) {
      toast.error("Email topilmadi ⚠️");
      router.replace("/auth/register");
      return;
    }
    setEmail(emailFromQuery);
  }, [emailFromQuery, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 6) {
      setCode(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      toast.error("Kod 6 ta raqamdan iborat bo'lishi kerak!");
      return;
    }

    setLoading(true);
    try {
      await authService.verifyEmail(email, code);
      toast.success("Email muvaffaqiyatli tasdiqlandi ✅");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error("Kod noto'g'ri yoki muddati o'tgan ❌");
      setCode("");
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return null; // Or a quick loader, but Suspense handles the main one
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4 py-8">
        <ToastContainer position="top-center" autoClose={3000} theme="light" />

        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-2xl ubuntu-bold gap-2 text-purple-800 mb-1 hover:opacity-80 transition"
            >
              <Image src={logo} alt="Savolchi" width={36} height={36} />
              Savolchi
            </Link>
            <p className="text-sm text-gray-600 mt-2">
              Emailingizni tasdiqlang
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-purple-800">
                Tasdiqlash kodi
              </h1>
              <p className="text-sm text-gray-600 mt-3">
                <span className="font-medium">{email}</span> manziliga
                yuborilgan{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">6 xonali</code>{" "}
                kodni kiriting
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Key size={18} />
                  Tasdiqlash kodi
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={code}
                  onChange={handleChange}
                  className="w-full text-center text-2xl tracking-widest px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                  placeholder="------"
                  maxLength={6}
                  autoFocus
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading || code.length !== 6}
                className="w-full bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-800 hover:to-indigo-900 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
              >
                {loading ? "Tekshirilmoqda..." : "Tasdiqlash"}
              </button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-6">
              Kodni olmadingizmi?{" "}
              <button
                type="button"
                className="text-purple-600 hover:underline font-medium"
                onClick={() => {
                  /* resend logic here */
                }}
              >
                Qayta yuborish
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmailPage;
