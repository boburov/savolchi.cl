// components/dashboard/ChannelCard.tsx
import Link from "next/link";
import { LogIn, School, Brain, Search } from "lucide-react";

interface ChannelType {
  id: number;
  name: string;
  pfp: string;
  banner?: string | null;
  bio: string;
  adminId: number;
  createdAt: string;
}

const ChannelCard = ({ ch }: { ch: ChannelType }) => {
  const hasBanner = ch.banner && ch.banner.includes("http") && ch.banner !== "";
  const hasPfp = ch.pfp && ch.pfp.includes("http") && ch.pfp !== "";
  const firstLetter = ch.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition hover:border-purple-300 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <School size={22} className="text-purple-700" />
            <h2 className="font-semibold text-gray-800">{ch.name}</h2>
          </div>
          <Brain className="text-green-500" size={18} />
        </div>

        {hasBanner ? (
          <img
            src={ch.banner!}
            alt={ch.name}
            className="w-full h-32 object-cover rounded-lg mb-3 border border-gray-300"
            loading="lazy" // bonus: img ham lazy
          />
        ) : (
          <div className="flex items-center justify-center text-3xl text-white gap-3 w-full h-32 rounded-lg mb-3 border border-gray-300 bg-purple-400">
            <Search size={50} /> 404
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
                loading="lazy"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold text-sm border">
                {firstLetter}
              </div>
            )}
            <div>
              <p className="font-medium text-gray-800">{ch.name}</p>
              <p className="text-xs text-gray-500">
                <span>ID: {ch.id}</span> • <span>Admin: {ch.adminId}</span>
              </p>
            </div>
          </div>

          <Link
            href={`/dashboard/${ch.id}`}
            className="bg-purple-600 text-white font-medium px-2.5 py-1.5 rounded-full hover:bg-purple-700 flex items-center justify-center gap-2 transition"
          >
            <LogIn size={18} />
            kirish
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChannelCard;
