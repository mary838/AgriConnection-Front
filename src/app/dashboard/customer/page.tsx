"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard, ShoppingBag, Heart,
  User, LogOut, MapPin, Package, ArrowUpRight,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard/customer" },
  { icon: ShoppingBag,     label: "Orders",   href: "/dashboard/customer/orders" },
  { icon: Heart,           label: "Wishlist",  href: "/dashboard/customer/wishlist" },
  { icon: User,            label: "Profile",   href: "/dashboard/customer/profile" },
];

const orders = [
  { id: "#8812", num: "12", date: "Sep 12", items: "3 items", total: "$32.00",  status: "IN TRANSIT", statusColor: "bg-[#fef3e2] text-[#b45309]" },
  { id: "#8780", num: "80", date: "Sep 4",  items: "5 items", total: "$48.50",  status: "DELIVERED",  statusColor: "bg-[#eaf2e4] text-[#2d5a1b]" },
  { id: "#8741", num: "41", date: "Aug 28", items: "2 items", total: "$18.25",  status: "DELIVERED",  statusColor: "bg-[#eaf2e4] text-[#2d5a1b]" },
  { id: "#8702", num: "02", date: "Aug 19", items: "7 items", total: "$72.10",  status: "DELIVERED",  statusColor: "bg-[#eaf2e4] text-[#2d5a1b]" },
];

const wishlist = [
  { name: "Wildflower Honey",   farm: "Blackwood Apiary", price: "$12.50", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&q=80" },
  { name: "Strawberries",       farm: "Hilltop Berry",    price: "$5.75",  image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=200&q=80" },
  { name: "Heirloom Tomatoes",  farm: "Green Valley",     price: "$4.50",  image: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=200&q=80" },
];

const bottomStats = [
  { label: "ORDERS THIS YEAR", value: "24" },
  { label: "SUPPORTED FARMS",  value: "11" },
  { label: "LIFETIME SPEND",   value: "$612" },
];

// Progress steps
const steps = ["Placed", "Picked", "In transit", "Delivered"];
const currentStep = 2; // 0-indexed, "In transit"

export default function CustomerDashboard() {
  const [active, setActive] = useState("Overview");

  return (
    <div className="flex min-h-screen bg-[#f5f2eb]">

      {/* ── Sidebar ── */}
      <aside className="w-[200px] shrink-0 bg-[#1e3d18] flex flex-col sticky top-0 h-screen">
        <div className="px-5 pt-7 pb-6">
          <Link href="/">
            <p className="text-white text-[16px] font-semibold italic" style={{ fontFamily: "Georgia, serif" }}>
              AgriConnect
            </p>
            <p className="text-white/40 text-[10px] font-semibold tracking-[0.18em] uppercase mt-0.5">
              Customer Portal
            </p>
          </Link>
        </div>

        <nav className="flex flex-col gap-1 px-3 flex-1">
          {navItems.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setActive(label)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-colors ${
                active === label
                  ? "bg-white/15 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon size={15} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Profile */}
        <div className="mx-3 mb-4 bg-white/10 rounded-xl px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-[#b8cfa8] shrink-0">
              <img
                src="https://preview--farm-ease-online.lovable.app/assets/farmer-avatar-Den9lHiu.jpg"
                alt="Clara Jensen"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-white text-[13px] font-medium leading-tight">Clara Jensen</p>
              <p className="text-white/50 text-[11px]">Sonoma, CA</p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-white/50 hover:text-white text-[12px] transition-colors">
            <LogOut size={13} />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1060px] mx-auto px-8 py-10">

          {/* Greeting */}
          <h1
            className="text-[42px] font-semibold text-[#1c2b1a] leading-tight mb-7"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Hello, Clara.{" "}
            <span className="font-normal italic text-[#7a8a6a]">Hungry?</span>
          </h1>

          {/* Active order banner */}
          <div className="bg-[#1e3d18] rounded-2xl px-7 py-6 mb-6">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center">
                  <Package size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-[11px] font-semibold tracking-[0.15em] uppercase mb-0.5">
                    Order #8812 — In Transit
                  </p>
                  <p className="text-white text-[22px] font-semibold" style={{ fontFamily: "Georgia, serif" }}>
                    Arriving tomorrow, 8–10am
                  </p>
                  <p className="flex items-center gap-1.5 text-white/60 text-[12px] mt-1">
                    <MapPin size={11} />
                    48 Old Mill Rd, Sonoma
                  </p>
                </div>
              </div>
              <button className="px-5 py-2 bg-white/15 hover:bg-white/25 text-white text-[13px] font-medium rounded-full transition-colors">
                Track order
              </button>
            </div>

            {/* Progress bar */}
            <div className="relative">
              <div className="flex justify-between mb-2">
                {steps.map((step, i) => (
                  <span
                    key={step}
                    className={`text-[11px] font-medium ${
                      i <= currentStep ? "text-white" : "text-white/30"
                    }`}
                  >
                    {step}
                  </span>
                ))}
              </div>
              <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${((currentStep) / (steps.length - 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Two columns */}
          <div className="grid grid-cols-[1fr_320px] gap-5 mb-5">

            {/* Recent orders */}
            <div className="bg-white border border-[#ede8df] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[20px] font-semibold text-[#1c2b1a]" style={{ fontFamily: "Georgia, serif" }}>
                  Recent orders
                </h2>
                <Link href="/dashboard/customer/orders" className="text-[13px] font-medium text-[#2d5a1b] hover:underline flex items-center gap-1">
                  View all <ArrowUpRight size={13} />
                </Link>
              </div>

              <div className="flex flex-col divide-y divide-[#f5f2eb]">
                {orders.map((o) => (
                  <div key={o.id} className="flex items-center gap-4 py-3.5">
                    <div className="w-10 h-10 rounded-full bg-[#f0ece4] flex items-center justify-center text-[11px] font-semibold text-[#7a8a6a] shrink-0">
                      #{o.num}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold text-[#1c2b1a]">Order {o.id}</p>
                      <p className="text-[12px] text-[#9aaa8a]">{o.date} · {o.items}</p>
                    </div>
                    <p className="text-[14px] font-semibold text-[#1c2b1a] mr-3">{o.total}</p>
                    <span className={`text-[10px] font-bold tracking-wide px-3 py-1 rounded-full shrink-0 ${o.statusColor}`}>
                      {o.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Wishlist */}
            <div className="bg-white border border-[#ede8df] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[20px] font-semibold text-[#1c2b1a]" style={{ fontFamily: "Georgia, serif" }}>
                  Wishlist
                </h2>
                <Heart size={16} className="text-[#9aaa8a]" />
              </div>

              <div className="flex flex-col divide-y divide-[#f5f2eb]">
                {wishlist.map((item) => (
                  <div key={item.name} className="flex items-center gap-3 py-3">
                    <div className="w-11 h-11 rounded-xl overflow-hidden bg-[#e8e0d0] shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-[#1c2b1a] truncate">{item.name}</p>
                      <p className="text-[11px] text-[#9aaa8a]">{item.farm}</p>
                    </div>
                    <p className="text-[13px] font-semibold text-[#1c2b1a] shrink-0">{item.price}</p>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-3 border border-[#ddd8cc] rounded-full text-[13px] font-medium text-[#1c2b1a] hover:bg-[#f0ece4] transition-colors">
                Move all to basket
              </button>
            </div>
          </div>

          {/* Bottom stats */}
          <div className="grid grid-cols-3 gap-5">
            {bottomStats.map((s) => (
              <div key={s.label} className="bg-white border border-[#ede8df] rounded-2xl px-6 py-5">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#9aaa8a] mb-2">
                  {s.label}
                </p>
                <p
                  className="text-[36px] font-semibold text-[#1c2b1a] leading-none"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {s.value}
                </p>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}