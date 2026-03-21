"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type User = {
  username: string;
  email: string;
};

export default function GetUserDetailsPage() {
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  async function getUserDetails() {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/me");
      setUserDetails(response.data.user);
    } catch (error) {
      console.log("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">

      {/* 🌌 Glow Background */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-500/20 blur-3xl rounded-full top-[-150px] left-[-150px]" />
      <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 blur-3xl rounded-full bottom-[-120px] right-[-120px]" />

      {/* 🧊 Glass Card */}
      <div className="relative z-10 w-[380px] p-8 rounded-2xl 
      bg-white/5 backdrop-blur-3xl border border-white/10 
      shadow-[0_0_80px_rgba(0,0,0,0.8)] text-center">

        {/* Title */}
        <h1 className="text-2xl font-semibold text-white mb-6">
          User Details
        </h1>

        {/* Loading */}
        {loading && (
          <p className="text-gray-400 text-sm">Fetching your details...</p>
        )}

        {/* User Info */}
        {userDetails && (
          <div className="space-y-4 text-left">

            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-gray-400 text-sm">Username</p>
              <p className="text-white font-medium">
                {userDetails.username}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-white font-medium">
                {userDetails.email}
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}