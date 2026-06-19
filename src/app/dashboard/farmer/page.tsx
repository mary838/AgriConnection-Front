"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard, Package, ShoppingBag, BarChart2,
  Settings, LogOut, Plus, ArrowUpRight, TrendingUp,
} from "lucide-react";

// ── Sidebar nav ──────────────────────────────────────────────────────────────
const navItems = [
  { icon: LayoutDashboard, label: "Overview",  href: "/dashboard/farmer" },
  { icon: Package,         label: "Products",  href: "/dashboard/farmer/products" },
  { icon: ShoppingBag,     label: "Orders",    href: "/dashboard/farmer/orders" },
  { icon: BarChart2,       label: "Reports",   href: "/dashboard/farmer/reports" },
  { icon: Settings,        label: "Settings",  href: "/dashboard/farmer/settings" },
];

// ── Stats ────────────────────────────────────────────────────────────────────
const stats = [
  { label: "Total revenue",  value: "$12,480", sub: "+12%",        subColor: "text-[#2d5a1b]", featured: false },
  { label: "Active orders",  value: "24",      sub: "8 pending",   subColor: "text-[#7a8a6a]", featured: false },
  { label: "Product views",  value: "1.2k",    sub: "Trending up", subColor: "text-[#2d5a1b]", featured: false },
  { label: "Platform health",value: "Optimal", sub: "Verified farmer", subColor: "text-white/70", featured: true },
];

// ── Inventory ────────────────────────────────────────────────────────────────
const inventory = [
  { id: 1, name: "Heirloom Tomatoes", price: "$4.50/lb", stock: "In stock: 140 units", lowStock: false, primaryAction: "Edit",    secondaryAction: "Archive", image: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=600&q=80" },
  { id: 2, name: "Curly Green Kale",  price: "$3.00/ea", stock: "Low stock: 12 units", lowStock: true,  primaryAction: "Restock", secondaryAction: "Archive", image: "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?w=600&q=80" },
  { id: 3, name: "Strawberries",      price: "$5.75/pt", stock: "In stock: 68 units",  lowStock: false, primaryAction: "Edit",    secondaryAction: "Archive", image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&q=80" },
  { id: 4, name: "Wildflower Honey",  price: "$12.50/jar",stock:"In stock: 32 units",  lowStock: false, primaryAction: "Edit",    secondaryAction: "Archive", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80" },
];

// ── Orders ───────────────────────────────────────────────────────────────────
const orders = [
  { id: "#8812", customer: "Clara J.",  initials: "C", items: "3 items",  status: "PAID",    statusColor: "bg-[#eaf2e4] text-[#2d5a1b]" },
  { id: "#8811", customer: "Mark T.",   initials: "M", items: "12 items", status: "PENDING", statusColor: "bg-[#fef3e2] text-[#b45309]" },
  { id: "#8809", customer: "Sarah L.",  initials: "S", items: "2 items",  status: "SHIPPED", statusColor: "bg-[#e8edf8] text-[#3b4da0]" },
  { id: "#8805", customer: "Diego R.",  initials: "D", items: "5 items",  status: "PAID",    statusColor: "bg-[#eaf2e4] text-[#2d5a1b]" },
];

// ── Weekly bar chart data ────────────────────────────────────────────────────
const weekData = [40, 65, 50, 80, 95, 70, 60];
const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const maxVal = Math.max(...weekData);

export default function FarmerDashboard() {
  const [active, setActive] = useState("Overview");

  return (
    <div className="flex min-h-screen bg-[#f5f2eb]">

      {/* ── Sidebar ── */}
      <aside className="w-[220px] shrink-0 bg-[#1e3d18] flex flex-col sticky top-0 h-screen">
        {/* Logo */}
        <div className="px-6 pt-7 pb-6">
          <Link href="/" className="block">
            <p className="text-white text-[17px] font-semibold italic" style={{ fontFamily: "Georgia, serif" }}>
              AgriConnect
            </p>
            <p className="text-white/40 text-[10px] font-semibold tracking-[0.18em] uppercase mt-0.5">
              Farmer Portal
            </p>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-3 flex-1">
          {navItems.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setActive(label)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-colors ${
                active === label
                  ? "bg-white/15 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon size={16} />
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
                alt="Marcus Bell"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-white text-[13px] font-medium leading-tight">Marcus Bell</p>
              <p className="text-white/50 text-[11px]">Green Valley Farms</p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-white/50 hover:text-white text-[12px] transition-colors">
            <LogOut size={13} />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1100px] mx-auto px-8 py-10">

          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#2d5a1b] mb-1">
                Morning, Marcus
              </p>
              <h1 className="text-[36px] font-semibold text-[#1c2b1a] leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                Green Valley Farms
              </h1>
              <p className="text-[22px] font-normal italic text-[#7a8a6a]" style={{ fontFamily: "Georgia, serif" }}>
                Performance overview
              </p>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <button className="px-5 py-2.5 border border-[#c8d0b8] rounded-full text-[13px] font-medium text-[#1c2b1a] bg-white hover:bg-[#f0ece4] transition-colors">
                Export report
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-[#1e3d18] text-white rounded-full text-[13px] font-medium hover:bg-[#2d5a1b] transition-colors">
                <Plus size={14} />
                New product
              </button>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-4 gap-4 mb-10">
            {stats.map((s) => (
              <div
                key={s.label}
                className={`rounded-2xl p-5 flex flex-col gap-2 ${
                  s.featured ? "bg-[#1e3d18]" : "bg-white border border-[#ede8df]"
                }`}
              >
                <p className={`text-[12px] ${s.featured ? "text-white/60" : "text-[#9aaa8a]"}`}>
                  {s.label}
                </p>
                <p
                  className={`text-[30px] font-semibold leading-none ${s.featured ? "text-white" : "text-[#1c2b1a]"}`}
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {s.value}
                </p>
                <p className={`text-[12px] font-medium ${s.featured ? s.subColor : s.subColor}`}>
                  {s.sub}
                </p>
              </div>
            ))}
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-[1fr_300px] gap-6">

            {/* Left: Inventory */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[22px] font-semibold text-[#1c2b1a]" style={{ fontFamily: "Georgia, serif" }}>
                  Current inventory
                </h2>
                <Link href="/dashboard/farmer/products" className="text-[13px] font-medium text-[#2d5a1b] hover:underline">
                  View catalog →
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {inventory.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-[#ede8df]">
                    <div className="aspect-[4/3] overflow-hidden bg-[#e8e0d0]">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[14px] font-medium text-[#1c2b1a]" style={{ fontFamily: "Georgia, serif" }}>
                          {item.name}
                        </p>
                        <p className="text-[13px] font-semibold text-[#1c2b1a] shrink-0">{item.price}</p>
                      </div>
                      <p className={`text-[12px] mb-3 font-medium ${item.lowStock ? "text-red-500" : "text-[#9aaa8a]"}`}>
                        {item.stock}
                      </p>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 border border-[#ddd8cc] rounded-full text-[12px] font-medium text-[#1c2b1a] hover:bg-[#f0ece4] transition-colors">
                          {item.primaryAction}
                        </button>
                        <button className="flex-1 py-2 border border-[#ddd8cc] rounded-full text-[12px] font-medium text-[#1c2b1a] hover:bg-[#f0ece4] transition-colors">
                          {item.secondaryAction}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Orders + Insight */}
            <div className="flex flex-col gap-4">

              {/* Incoming orders */}
              <div>
                <h2 className="text-[22px] font-semibold text-[#1c2b1a] mb-4" style={{ fontFamily: "Georgia, serif" }}>
                  Incoming orders
                </h2>
                <div className="flex flex-col gap-3">
                  {orders.map((o) => (
                    <div key={o.id} className="bg-white border border-[#ede8df] rounded-2xl px-4 py-3 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#eaf2e4] flex items-center justify-center text-[13px] font-semibold text-[#2d5a1b] shrink-0">
                        {o.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-[#1c2b1a]">Order {o.id}</p>
                        <p className="text-[11px] text-[#9aaa8a]">{o.customer} · {o.items}</p>
                      </div>
                      <span className={`text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full shrink-0 ${o.statusColor}`}>
                        {o.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly insight card */}
              <div className="bg-[#2c1f14] rounded-2xl p-5 flex flex-col gap-3">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/40 flex items-center gap-1">
                  <TrendingUp size={11} className="text-white/40" />
                  Weekly Insight
                </p>
                <h3 className="text-[20px] font-semibold italic text-white leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                  Honey crisp apples outperforming
                </h3>
                <p className="text-[12px] text-white/60 leading-[1.6]">
                  +40% revenue vs. the platform average this week. Consider featuring them in the marketplace.
                </p>

                {/* Mini bar chart */}
                <div className="flex items-end gap-1.5 h-14 mt-1">
                  {weekData.map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className={`w-full rounded-sm transition-all ${
                          i === 4 ? "bg-[#5a9a3a]" : "bg-white/20"
                        }`}
                        style={{ height: `${(val / maxVal) * 48}px` }}
                      />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-white/30 tracking-widest">MON — SUN</p>

                <Link
                  href="/dashboard/farmer/reports"
                  className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-white rounded-full text-[12px] font-semibold text-[#1c2b1a] hover:bg-white/90 transition-colors mt-1"
                >
                  See full analytics
                  <ArrowUpRight size={13} />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}