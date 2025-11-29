"use client";
import { useState, useEffect } from "react";
import { Mail, Key } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "@/public/savolchi.svg";
import authService from "@/app/api/service/auth.service";

const VerifyEmailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const emailFromQuery = searchParams.get("email");
    if (emailFromQuery) {
      setEmail(emailFromQuery);
    } else {
      toast.error("Email topilmadi ⚠️");
      router.push("/auth/register");
    }
  }, [searchParams, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCode(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.verifyEmail(email, code);
      toast.success("Email tasdiqlandi ✅");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error("Kod noto'g'ri yoki muddati o'tgan ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4 py-8">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-2xl ubuntu-bold gap-2 text-purple-800 mb-1"
          >
            <Image src={logo} alt="Savolchi" width={32} height={32} /> Savolchi
          </Link>
          <p className="text-sm text-gray-600">Emailingizni tasdiqlang</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-purple-800">
              Tasdiqlash kodi
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              {email} manziliga yuborilgan 6 xonali kodni kiriting.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                <Key size={14} /> Kod
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="code"
                  value={code}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="123456"
                  required
                  maxLength={6}
                />
                <Key
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-800 hover:bg-purple-900 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Tasdiqlash
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
