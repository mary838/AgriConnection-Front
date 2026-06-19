"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ROLES = ["Customer", "Farmer", "Admin"];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [error, setError] = useState("");

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.role) return setError("Please select a role to continue.");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    setError("");
    router.push("/Login");
  };

  return (
    <div className="min-h-screen flex">

      {/* ── LEFT panel ── */}
      <div className="hidden lg:flex lg:w-[52%] bg-[#1e3d18] flex-col justify-between p-10 relative overflow-hidden">
        <div>
          <span className="text-white text-[18px] font-medium" style={{ fontFamily: "Georgia, serif" }}>
            AgriConnect
          </span>
        </div>

        <div className="max-w-[420px]">
          <h1 className="text-white text-[48px] leading-tight mb-5" style={{ fontFamily: "Georgia, serif" }}>
            Every harvest{" "}
            <em className="font-normal italic text-[#a8c898]">starts with a seed.</em>
          </h1>
          <p className="text-white/60 text-[15px] leading-relaxed">
            Join as a customer, a farmer, or an admin.<br />
            One account. One platform. Built for Cambodia&apos;s harvest.
          </p>

          <div className="flex flex-col gap-3 mt-10">
            {[
              { role: "Customer", icon: "🛒", desc: "Shop fresh produce directly from local farms." },
              { role: "Farmer",   icon: "🌾", desc: "List your products and manage your orders." },
              { role: "Admin",    icon: "⚙️", desc: "Oversee the platform and support the community." },
            ].map((r) => (
              <div key={r.role} className="flex items-start gap-3 bg-white/5 rounded-xl px-4 py-3">
                <span className="text-[20px] mt-0.5">{r.icon}</span>
                <div>
                  <p className="text-white text-[13px] font-semibold">{r.role}</p>
                  <p className="text-white/50 text-[12px]">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/30 text-[12px]">© 2026 AgriConnect Collective</p>
      </div>

      {/* ── RIGHT panel ── */}
      <div className="flex-1 relative flex items-center justify-center p-8">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=900&q=80')" }}
        />
        <div className="absolute inset-0 bg-[#faf8f3]/80" />

        <div className="relative z-10 w-full max-w-[420px]">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-[#2d5a1b] uppercase mb-2">
            Get started
          </p>
          <h2 className="text-[38px] font-normal text-[#1c2b1a] mb-8 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
            Create account
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div>
              <label className={labelClass}>Full Name</label>
              <input
                type="text"
                placeholder="e.g. Mary Thoeun"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Password</label>
              <input
                type="password"
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                onChange={(e) => update("confirmPassword", e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>I am a…</label>
              <div className="flex gap-3">
                {ROLES.map((r) => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => update("role", r)}
                    className={`flex-1 py-3 rounded-full text-[13px] font-medium border transition-colors ${
                      form.role === r
                        ? "bg-[#1e3d18] text-white border-[#1e3d18]"
                        : "bg-white text-[#1c2b1a] border-[#e0dbd0] hover:border-[#2d5a1b] hover:text-[#2d5a1b]"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-[13px] text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#1e3d18] text-white text-[15px] font-semibold py-4 rounded-full hover:bg-[#2d5a1b] transition-colors mt-1"
            >
              Create account
            </button>
          </form>

          <p className="text-center text-[13px] text-[#9aaa8a] mt-6">
            Already have an account?{" "}
            <a href="/login" className="font-semibold text-[#1c2b1a] hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

const labelClass = "block text-[11px] font-semibold tracking-[0.14em] uppercase text-[#7a8a6a] mb-2";
const inputClass = "w-full px-5 py-3.5 rounded-full bg-white border border-[#e0dbd0] text-[14px] text-[#1c2b1a] placeholder-[#bbb] outline-none focus:border-[#2d5a1b] transition-colors";