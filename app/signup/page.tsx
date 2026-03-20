"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";
import React from "react";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.username && user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async () => {
    try {
      setLoading(true); // ✅ important

      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        router.push("/login");
      } else {
        toast.error(data.error || "Signup failed");
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* 🧊 Glass Form */}
      <div className="relative z-10 w-[360px] p-8 rounded-2xl 
      bg-black/40 backdrop-blur-2xl border border-white/20 
      shadow-[0_0_60px_rgba(0,0,0,0.7)]">

        <h1 className="text-2xl font-semibold text-white text-center mb-6">
          {loading ? "Creating your account..." : "Sign Up"}
        </h1>

        <div className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Username"
            className="p-3 rounded-lg bg-white/10 text-white 
            placeholder-gray-300 border border-white/20 
            focus:border-indigo-400 outline-none transition"
            onChange={(e) =>
              setUser({ ...user, username: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg bg-white/10 text-white 
            placeholder-gray-300 border border-white/20 
            focus:border-cyan-400 outline-none transition"
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg bg-white/10 text-white 
            placeholder-gray-300 border border-white/20 
            focus:border-indigo-400 outline-none transition"
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
          />

          {/* Button */}
          <button
            disabled={buttonDisabled || loading}
            onClick={onSignup}
            className={`mt-2 p-3 rounded-lg font-medium text-white 
            bg-gradient-to-r from-indigo-500 to-cyan-500 
            transition shadow-lg 
            ${buttonDisabled || loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}`}
          >
            {loading
              ? "Signing up..."
              : buttonDisabled
              ? "Fill all fields"
              : "Sign Up"}
          </button>

          <Link
            href="/login"
            className="text-center text-gray-300 text-sm hover:text-white transition"
          >
            Already have an account?{" "}
            <span className="text-indigo-300 hover:underline">
              Log in
            </span>
          </Link>

        </div>
      </div>
    </div>
  );
}