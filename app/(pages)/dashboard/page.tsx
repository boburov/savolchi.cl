"use client";
import { useEffect, useState } from "react";
import { LogIn, Moon, MoonStar, School, Search, Unlock } from "lucide-react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import channel from "@/app/api/service/channel.service";

interface ChannelType {
  id: number;
  name: string;
  pfp: string;
  banner?: string | null;
  bio: string;
  adminId: number;
  createdAt: string;
}

const DashboardPage = () => {
  const { user } = useAuth();
  const [channels, setChannels] = useState<ChannelType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, SetSearch] = useState("");

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const res = await channel.getAll();
        setChannels(res || []);
      } catch (error) {
        console.error("Channel olishda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChannels();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] text-gray-500">
        Yuklanmoqda...
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto py-10 px-4 border-x border-gray-300 min-h-[75vh]">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-purple-700">
            Xush kelibsiz,{" "}
            <span className="text-gray-800">
              {user?.username || "Foydalanuvchi"} 👋
            </span>
          </h1>
          <p className="text-gray-500 mt-2">
            Quyidagi kanallardan birini tanlang.
          </p>
        </div>

        <div className="flex items-center justify-start mb-10 w-full max-w-xl gap-1">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              SetSearch(e.target.value);
            }}
            placeholder="Kanalar Bo'yicha Qidiruv"
            className="w-10 flex-1 h-12 px-5 rounded-l-2xl bg-gray-800/10 text-black placeholder-gray-400  focus:outline-purple-500 outline outline-transparent
               transition-all rounded-r-lg"
          />
          <button
            className="flex items-center justify-center h-12 px-5 rounded-r-2xl rounded-l-lg bg-purple-500 hover:bg-purple-700
               text-white transition-colors duration-200 ease-in-out shadow-md hover:shadow-lg"
          >
            <Search size={24} strokeWidth={2.5} />
          </button>
        </div>

        {channels.length === 0 ? (
          <p className="text-gray-500 text-center">Hozircha kanal yo‘q.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {channels.map((ch) => {
              if (
                ch.name
                  .trim()
                  .toLowerCase()
                  .includes(search.trim().toLowerCase())
              ) {
                const hasBanner =
                  ch.banner && ch.banner.includes("http") && ch.banner !== "";
                const hasPfp =
                  ch.pfp && ch.pfp.includes("http") && ch.pfp !== "";
                const firstLetter = ch.name?.charAt(0)?.toUpperCase() || "?";

                return (
                  <div
                    key={ch.id}
                    className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition hover:border-purple-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                          <School size={22} className="text-purple-700" />
                          <h2 className="font-semibold text-gray-800">
                            {ch.name}
                          </h2>
                        </div>
                        <Unlock className="text-green-500" size={18} />
                      </div>

                      {hasBanner ? (
                        <img
                          src={String(ch.banner)}
                          alt={ch.name}
                          className="w-full h-32 object-cover rounded-lg mb-3 border border-gray-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center text-3xl text-white gap-3 w-full h-32 rounded-lg mb-3 border border-gray-300 bg-purple-400">
                          <Search size={50} color="white" /> 404
                        </div>
                      )}

                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        html, css, js boyicha testlar to'plami
                      </p>
                      <div className="flex justify-between items-end mt-4">
                        <div className="flex items-end gap-3">
                          {hasPfp ? (
                            <img
                              src={ch.pfp}
                              alt="pfp"
                              className="w-10 h-10 rounded-full object-cover border"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold text-sm border">
                              {firstLetter}
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-gray-800">
                              {ch.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              ID: {ch.id} | Admin: {ch.adminId}
                            </p>
                          </div>
                        </div>

                        <Link
                          href={`/dashboard/${ch.id}`}
                          className="bg-purple-600 text-white font-medium px-2.5 py-1.5 rounded-full hover:bg-purple-700 flex items-center justify-center gap-2"
                        >
                          <LogIn size={18} />
                          kirish
                        </Link>
                      </div>
                    </div>

                    {/* 🔹 Kirish tugmasi */}
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
