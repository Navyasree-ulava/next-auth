"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async (token: string) => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/verifyEmail", { token });

      toast.success(response.data.message);
      setVerified(true);

    } catch (error: any) {
      setError(true);
      toast.error(error.response?.data?.error || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("token=")[1];

    if (urlToken) {
      verifyUserEmail(urlToken); // ✅ pass directly
    } else {
      setError(true);
      toast.error("Invalid verification link");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">

      {/* 🌌 Glow */}
      <div className="absolute w-[400px] h-[400px] bg-indigo-500/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[300px] h-[300px] bg-cyan-500/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      {/* 🧊 Glass Card */}
      <div className="relative z-10 w-[380px] p-8 rounded-2xl 
      bg-white/5 backdrop-blur-2xl border border-white/10 
      shadow-[0_0_60px_rgba(0,0,0,0.7)] text-center text-white">

        <h2 className="text-xl font-semibold mb-6">
          Email Verification
        </h2>

        {/* ⏳ Loading */}
        {loading && (
          <p className="text-gray-400 animate-pulse">
            Verifying your email...
          </p>
        )}

        {/* ✅ Success */}
        {verified && (
          <div className="space-y-3">
            <p className="text-green-400 font-medium">
              ✅ Email verified successfully!
            </p>
            <Link
              href="/login"
              className="inline-block mt-2 px-4 py-2 rounded-lg 
              bg-gradient-to-r from-indigo-500 to-cyan-500 
              hover:opacity-90 transition"
            >
              Go to Login
            </Link>
          </div>
        )}

        {/* ❌ Error */}
        {error && (
          <p className="text-red-400">
            ❌ Verification failed. Try again.
          </p>
        )}

      </div>
    </div>
  );
}