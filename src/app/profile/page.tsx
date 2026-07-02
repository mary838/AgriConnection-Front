"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Settings, Mail, Phone, Globe, Lock, Pencil } from "lucide-react";
import { profile as profileApi, getToken, ApiError, type User } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

type Profile = User;

export default function ProfilePage() {
  const router = useRouter();
  const { logout } = useAuth();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!getToken()) { router.push("/login"); return; }

        const data = await profileApi.get();

        setProfile(data);
        setName(data.name);
        setPhone(data.phone || "");
        localStorage.setItem("user", JSON.stringify(data));
      } catch (err: unknown) {
        const message =
          err instanceof ApiError || err instanceof Error
            ? err.message
            : "Something went wrong.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [router]);

  const getDashboardHref = () => {
    if (profile?.role === "farmer") return "/dashboard/farmer";
    if (profile?.role === "admin") return "/dashboard/admin";
    return "/dashboard/customer";
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError("Name is required.");

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (!getToken()) { router.push("/login"); return; }

      const data = await profileApi.update({ name });

      setProfile(data);
      setName(data.name);
      localStorage.setItem("user", JSON.stringify(data));
      setSuccess("Profile updated successfully.");
    } catch (err: unknown) {
      const message =
        err instanceof ApiError || err instanceof Error
          ? err.message
          : "Something went wrong.";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#e8f0e8]">
        <div className="w-8 h-8 border-4 border-[#1a3d1a] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const avatarLetter = profile?.name?.charAt(0).toUpperCase() || "?";

  return (
    <div className="min-h-screen bg-[#e8f0e8] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[420px] rounded-[32px] overflow-hidden shadow-2xl shadow-green-200">

        {/* Green header */}
        <div className="bg-[#1a3d1a] px-6 pt-6 pb-16 flex items-center justify-between">
          <Link
            href={getDashboardHref()}
            className="text-white/70 hover:text-white text-[13px] transition-colors"
          >
            ← Back
          </Link>
          <h1 className="text-white text-[17px] font-semibold tracking-wide">
            Your Profile
          </h1>
          <button
            type="button"
            aria-label="Settings"
            className="text-white/70 hover:text-white transition-colors"
          >
            <Settings size={20} />
          </button>
        </div>

        {/* White body */}
        <div className="bg-white px-6 pb-8">
          {/* Avatar — overlapping the header */}
          <div className="flex flex-col items-center -mt-10 mb-4">
            <div className="w-20 h-20 rounded-full bg-[#1a3d1a] flex items-center justify-center text-white text-[32px] font-bold shadow-lg ring-4 ring-white">
              {avatarLetter}
            </div>
            <h2 className="mt-3 text-[#1a3d1a] text-[20px] font-bold">
              {profile?.name}
            </h2>
            <p className="text-gray-400 text-[13px] mt-0.5 capitalize">
              {profile?.role}
            </p>
          </div>

          <form onSubmit={handleUpdate} className="flex flex-col gap-4 mt-2">

            {/* Name */}
            <Field label="Your Name" icon={<Pencil size={15} className="text-gray-300" />}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="flex-1 bg-transparent text-[14px] text-gray-700 outline-none"
              />
            </Field>

            {/* Email */}
            <Field label="Your Email" icon={<Mail size={15} className="text-gray-300" />}>
              <input
                type="email"
                value={profile?.email || ""}
                disabled
                className="flex-1 bg-transparent text-[14px] text-gray-700 outline-none cursor-not-allowed"
              />
            </Field>

            {/* Phone — display only */}
            <Field label="Phone Number" icon={<Phone size={15} className="text-gray-300" />}>
              <input
                type="tel"
                placeholder="Not set"
                disabled
                className="flex-1 bg-transparent text-[14px] text-gray-400 outline-none cursor-not-allowed placeholder-gray-300"
              />
            </Field>

            {/* Website — display only */}
            <Field label="Website" icon={<Globe size={15} className="text-gray-300" />}>
              <input
                type="url"
                placeholder="Not set"
                disabled
                className="flex-1 bg-transparent text-[14px] text-gray-400 outline-none cursor-not-allowed placeholder-gray-300"
              />
            </Field>

            {/* Password — display only */}
            <Field label="Password" icon={<Lock size={15} className="text-gray-300" />}>
              <input
                type="password"
                value="••••••••••••"
                disabled
                className="flex-1 bg-transparent text-[14px] text-gray-400 outline-none cursor-not-allowed tracking-widest"
              />
            </Field>

            {error && (
              <p className="text-red-500 text-[13px] text-center">{error}</p>
            )}
            {success && (
              <p className="text-[#1a3d1a] text-[13px] text-center">{success}</p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-[#1a3d1a] hover:bg-[#133013] text-white text-[15px] font-semibold py-3.5 rounded-2xl transition-colors disabled:opacity-60 mt-1"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-red-400 hover:text-red-500 text-[14px] font-medium transition-colors"
            >
              Log out
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-1.5">
        {label}
      </label>
      <div className="flex items-center bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100 gap-2">
        {children}
        <span className="shrink-0">{icon}</span>
      </div>
    </div>
  );
}
