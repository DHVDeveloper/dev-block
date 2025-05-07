"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { Router } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false, 
      email,
      password,
    });
  
    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }
  
    router.push("/");
    router.refresh();
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen flex items-start justify-center pt-10 px-4">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold text-gray-900">Sign in</h1>
          <p className="text-sm text-gray-500">Access your account</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-2 rounded border border-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex  gap-2">
            <button
              type="submit"
              className="px-4 py-2 flex-1 cursor-pointer text-sm font-medium bg-black text-white rounded-md hover:bg-black/80"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="text-center text-xs text-gray-400">or continue with</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center cursor-pointer gap-2 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition"
        >
          <FcGoogle className="text-xl" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
