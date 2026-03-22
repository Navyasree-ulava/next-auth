"use client";

import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/users/forgotPassword", { email });
      toast.success(response.data.message || "If the email exists, instructions were sent");
      setEmail("");
    } catch (error: unknown) {
      let message = "Something went wrong";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.error || message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      <div className="absolute w-[400px] h-[400px] bg-indigo-500/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[300px] h-[300px] bg-cyan-500/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      <div className="relative z-10 w-[380px] p-8 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.7)] text-center text-white">
        <h2 className="text-xl font-semibold mb-6">Forgot Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg p-2 bg-white/15 border border-white/20 outline-none focus:border-cyan-400"
            required
          />

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 transition"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300">
          Back to <Link href="/login" className="text-cyan-300 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
