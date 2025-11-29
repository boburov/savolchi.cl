"use client";

import { useEffect, useState, Suspense, lazy } from "react";
import { Search } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import channel from "@/app/api/service/channel.service";

const ChannelCard = lazy(() => import("@/app/components/ChannelCard"));

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
  console.log(user);

  const [channels, setChannels] = useState<ChannelType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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

  const filteredChannels = channels.filter((ch) =>
    ch.name.toLowerCase().includes(search.toLowerCase())
  );

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
              {user?.username || "Foydalanuvchi"}
            </span>
          </h1>
          <p className="text-gray-500 mt-2">
            Quyidagi kanallardan birini tanlang.
          </p>
        </div>

        <div className="flex items-center justify-start mb-10 w-full max-w-xl">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Kanal nomi bo'yicha qidiruv..."
            className="flex-1 h-12 px-5 rounded-l-2xl bg-gray-800/10 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          <button className="h-12 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-r-2xl transition flex items-center gap-2">
            <Search size={22} />
          </button>
        </div>

        {filteredChannels.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            {search ? "Hech narsa topilmadi 😔" : "Hozircha kanal yo'q."}
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredChannels.map((ch) => (
              <Suspense
                key={ch.id}
                fallback={
                  <div className="bg-white border border-gray-200 rounded-2xl p-5 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                  </div>
                }
              >
                <ChannelCard ch={ch} />
              </Suspense>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
