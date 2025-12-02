"use client";
import channel from "@/app/api/service/channel.service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await channel.getChanelById(String(id));
        setData(res);
      } catch (err) {
        console.error("Channel yuklashda xato:", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchData();
  }, [id]);

  if (loading)
    return <div className="p-8 text-center text-xl">Yuklanmoqda bro... 🚀</div>;
  if (!data)
    return (
      <div className="p-8 text-center text-red-500">Kanal topilmadi 😭</div>
    );

  return (
    <div className="w-full min-h-[80vh] container bg-gray-50 pb-20">
      {/* Banner */}
      <div className="relative w-full h-64 md:h-80">
        <img
          src={data.banner}
          alt="banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
          <img
            src={data.pfp}
            alt="pfp"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-8 border-white shadow-2xl object-cover"
          />
        </div>
      </div>

      {/* Info */}
      <div className="mt-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          {data.name}
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto whitespace-pre-line">
          {data.bio}
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-md mx-auto text-sm">
          <div className="bg-white p-4 rounded-xl shadow truncate">
            <span className="font-bold ">Admin ID:</span><br /> {data.adminId}
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <span className="font-bold">Channel ID:</span> {data.id.slice(0, 8)}
            ...
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <span className="font-bold">Yaratilgan:</span>{" "}
            {new Date(data.createdAt).toLocaleDateString("uz-UZ")}
          </div>
        </div>
      </div>

      {/* Subjects + Test Count */}
      <div className="mt-12 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Mavzular 📚</h2>

        {data.subject?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.subject.map((sub: any) => (
              <div
                key={sub.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-indigo-600">
                    {sub.name}
                  </h3>
                  <span className="text-3xl">
                    {sub.name === "javascript" ? "⚡" : "🚀"}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <span className="text-lg">📝 Testlar soni:</span>
                  <span className="text-2xl font-bold text-green-600">
                    {sub.Test?.length || 0}
                  </span>
                </div>

                <button className="mt-5 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition">
                  Kirish →
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500 text-xl">
            Hozircha hech qanday mavzu qo‘shilmagan 🥲
          </div>
        )}
      </div>
    </div>
  );
}
