"use client";
import useAuth from "@/hooks/useAuth";
import { format } from "date-fns";
import { Verified, Calendar, Zap, Crown } from "lucide-react";

// Minimal, clean rank tones
const rankColors: Record<string, string> = {
  F: "text-gray-600",
  E: "text-orange-500",
  D: "text-amber-600",
  C: "text-indigo-600",
  B: "text-purple-600",
  A: "text-pink-600",
  S: "text-violet-600",
  SS: "text-fuchsia-600",
  SSS: "text-red-600",
};

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-gray-800 text-xl font-medium animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  const joinDate = format(new Date(user.createdAt), "MMMM dd, yyyy");

  return (
    <div className="min-h-[80vh] bg-white px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            My Profile
          </h1>
          <p className="text-gray-500 mt-1">Minimal & modern layout</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <div className="flex flex-col items-center">
                {/* Avatar */}
                <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center text-5xl font-semibold text-gray-700">
                  {user.username.charAt(0).toUpperCase()}
                </div>

                {/* Username */}
                <h2 className="mt-4 text-2xl font-semibold text-gray-900">
                  {user.username}
                </h2>

                {/* Rank */}
                <p
                  className={`mt-1 text-sm font-medium ${rankColors[user.rank]}`}
                >
                  Rank: {user.rank}
                </p>

                {/* Join Date */}
                <p className="flex items-center gap-2 text-gray-500 text-sm mt-2">
                  <Calendar className="w-4 h-4" /> Joined {joinDate}
                </p>

                {/* Email */}
                <div className="mt-6 w-full border border-gray-200 rounded-xl p-4">
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-gray-900 font-medium truncate">
                    {user.email}
                  </p>
                </div>

                {/* Premium Status */}
                <div className="mt-6 w-full">
                  {user.isPremium ? (
                    <div className="w-full py-3 text-center rounded-xl bg-black text-white font-medium">
                      Premium Member
                    </div>
                  ) : (
                    <div className="w-full py-3 text-center rounded-xl border border-gray-300 text-gray-600 font-medium">
                      Upgrade to Premium
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* XP Progress */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-8 h-8 text-gray-800" />
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">
                    Level Progress
                  </h3>
                  <p className="text-gray-500 text-sm">Keep going</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Current XP</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {user.xp.toLocaleString()}
                  </span>
                </div>

                <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black transition-all duration-700"
                    style={{
                      width: `${Math.min((user.xp / 10000) * 100, 100)}%`,
                    }}
                  ></div>
                </div>

                <p className="text-sm text-gray-600 text-center mt-2">
                  {user.xp < 10000
                    ? `${(10000 - user.xp).toLocaleString()} XP to next rank`
                    : "Maxed out"}
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  label: "Rank",
                  value: user.rank,
                },
                {
                  label: "Play Time",
                  value: `${user.usingTime}h`,
                },
                {
                  label: "Status",
                  value: user.isPremium ? "Premium" : "Free",
                },
                {
                  label: "User ID",
                  value: `#${user.id.slice(-8)}`,
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm"
                >
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className="text-xl font-semibold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
