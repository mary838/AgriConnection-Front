"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  const handleContinueAs = (role: string) => {
    router.push(`/${role.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen flex">

      {/* ── LEFT panel — dark green ── */}
      <div className="hidden lg:flex lg:w-[52%] bg-[#1e3d18] flex-col justify-between p-10 relative overflow-hidden">
        {/* Logo */}
        <div>
          <span
            className="text-white text-[18px] font-medium"
            style={{ fontFamily: "Georgia, serif" }}
          >
            AgriConnect
          </span>
        </div>

        {/* Tagline */}
        <div className="max-w-[420px]">
          <h1 className="text-white text-[48px] leading-tight mb-5" style={{ fontFamily: "Georgia, serif" }}>
            The market{" "}
            <em className="font-normal italic text-[#a8c898]">opens at dawn.</em>
          </h1>
          <p className="text-white/60 text-[15px] leading-relaxed">
            Sign in to your farm, your basket, or your admin console.<br />
            One platform, three lives.
          </p>
        </div>

        {/* Footer */}
        <div>
          <p className="text-white/30 text-[12px]">© 2026 AgriConnect Collective</p>
        </div>
      </div>

      {/* ── RIGHT panel — form over farmer image ── */}
      <div className="flex-1 relative flex items-center justify-center p-8">
        {/* Background farmer image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=900&q=80')",
          }}
        />
        {/* Cream overlay */}
        <div className="absolute inset-0 bg-[#faf8f3]/80" />

        {/* Form card */}
        <div className="relative z-10 w-full max-w-[420px]">
          {/* Welcome label */}
          <p
            className="text-[11px] font-semibold tracking-[0.18em] text-[#2d5a1b] uppercase mb-2"
            style={{ fontFamily: "sans-serif" }}
          >
            Welcome back
          </p>
          <h2
            className="text-[38px] font-normal text-[#1c2b1a] mb-8 leading-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Sign in
          </h2>

          <form onSubmit={handleSignIn} className="flex flex-col gap-5">
            {/* Email */}
            <div>
              <label className="block text-[11px] font-semibold tracking-[0.14em] uppercase text-[#7a8a6a] mb-2"
                style={{ fontFamily: "sans-serif" }}>
                Email
              </label>
              <input
                type="email"
                placeholder="marcus@greenvalley.farm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3.5 rounded-full bg-white border border-[#e0dbd0] text-[14px] text-[#1c2b1a] placeholder-[#bbb] outline-none focus:border-[#2d5a1b] transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-semibold tracking-[0.14em] uppercase text-[#7a8a6a] mb-2"
                style={{ fontFamily: "sans-serif" }}>
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3.5 rounded-full bg-white border border-[#e0dbd0] text-[14px] text-[#1c2b1a] outline-none focus:border-[#2d5a1b] transition-colors"
              />
            </div>

            {/* Remember me + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#2d5a1b]"
                />
                <span className="text-[13px] text-[#7a8a6a]">Remember me</span>
              </label>
              <a href="/forgot-password" className="text-[13px] font-semibold text-[#2d5a1b] hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Sign in button */}
            <button
              type="submit"
              className="w-full bg-[#1e3d18] text-white text-[15px] font-semibold py-4 rounded-full hover:bg-[#2d5a1b] transition-colors mt-1"
            >
              Sign in
            </button>
          </form>

          {/* OR CONTINUE AS */}
          <div className="mt-7">
            <p className="text-center text-[11px] tracking-[0.16em] uppercase text-[#9aaa8a] mb-4"
              style={{ fontFamily: "sans-serif" }}>
              Or continue as
            </p>
            <div className="flex gap-3">
              {["Customer", "Farmer", "Admin"].map((role) => (
                <button
                  key={role}
                  onClick={() => handleContinueAs(role)}
                  className="flex-1 bg-white border border-[#e0dbd0] text-[#1c2b1a] text-[13px] font-medium py-3 rounded-full hover:border-[#2d5a1b] hover:text-[#2d5a1b] transition-colors"
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Create account */}
          <p className="text-center text-[13px] text-[#9aaa8a] mt-6">
           New here?{" "}
 <a href="/register" className="font-semibold text-[#1c2b1a] hover:underline">
  Create an account
</a>  
  </p>
        </div>
      </div>
    </div>
  );
}