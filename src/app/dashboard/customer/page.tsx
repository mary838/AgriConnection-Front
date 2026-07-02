"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Grid2X2,
  Heart,
  Settings,
  ShoppingBag,
  LogOut,
  MapPin,
  Package,
} from "lucide-react";
import { auth, profile as profileApi, customers as customersApi, getToken, clearToken, ApiError, type User, type Customer } from "@/lib/api";

export default function CustomerDashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomerDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        if (!getToken()) {
          window.location.href = "/login";
          return;
        }

        const profileData = await profileApi.get();
        setUser(profileData);
        localStorage.setItem("user", JSON.stringify(profileData));

        const customersData = await customersApi.list();

        const currentCustomer = customersData.find(
          (item) => item.userId === profileData.id
        );

        if (currentCustomer) {
          setCustomer(currentCustomer);
          localStorage.setItem("customer", JSON.stringify(currentCustomer));
        }
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

    fetchCustomerDashboard();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4efe5] flex items-center justify-center text-[#102615]">
        Loading customer dashboard...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4efe5] flex text-[#102615]">
      <aside className="w-[260px] bg-[#174832] min-h-screen p-7 flex flex-col justify-between">
        <div>
          <Link
            href="/"
            className="text-white text-2xl"
            style={{ fontFamily: "Georgia, serif" }}
          >
            AgriConnect
          </Link>

          <p className="text-[#9db79d] text-[11px] tracking-[0.22em] uppercase mt-2 font-semibold">
            Customer Portal
          </p>

          <nav className="mt-12 flex flex-col gap-2">
            <SidebarLink active icon={<Grid2X2 size={16} />} label="Overview" href="/dashboard/customer" />
            <SidebarLink icon={<ShoppingBag size={16} />} label="Orders" href="/dashboard/customer/orders" />
            <SidebarLink icon={<Heart size={16} />} label="Wishlist" href="/dashboard/customer/wishlist" />
            <SidebarLink icon={<Settings size={16} />} label="Profile" href="/profile" />
          </nav>
        </div>

        <div className="rounded-2xl bg-white/10 p-4">
          <Link href="/profile" className="flex items-center gap-3 hover:opacity-80">
            <div className="w-11 h-11 rounded-full bg-[#dce8d4] flex items-center justify-center text-[#174832] font-bold">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            <div>
              <p className="text-white text-sm font-semibold">
                {user?.name || "Customer"}
              </p>
              <p className="text-[#b8c9b3] text-xs">
                {user?.email || "View profile"}
              </p>
            </div>
          </Link>

          <button
            onClick={async () => {
              await auth.logout().catch(() => {});
              clearToken();
              localStorage.removeItem("user");
              localStorage.removeItem("customer");
              window.location.href = "/login";
            }}
            className="mt-4 flex items-center gap-2 text-[#b8c9b3] text-sm hover:text-white"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </aside>

      <section className="flex-1 px-12 py-10">
        {error && (
          <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 px-5 py-4 text-red-600 text-sm">
            {error}
          </div>
        )}

        <p className="text-[12px] tracking-[0.28em] uppercase text-[#1e6b42] font-bold mb-2">
          Welcome Back
        </p>

        <h1
          className="text-[48px] leading-tight mb-10"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Hello, {user?.name || "Customer"}.{" "}
          <em className="text-[#857d74] font-normal">Hungry?</em>
        </h1>

        {customer && (
          <div className="grid md:grid-cols-4 gap-5 mb-8">
            <InfoCard title="Customer Name" value={customer.name} />
            <InfoCard title="Phone" value={customer.phone || "N/A"} />
            <InfoCard title="District" value={customer.district || "N/A"} />
            <InfoCard
              title="Province"
              value={
                customer.province?.name ||
                (customer.provinceId ? `Province ID ${customer.provinceId}` : "N/A")
              }
            />
          </div>
        )}

        {!customer && !error && (
          <div className="mb-8 rounded-3xl border border-[#e0dbd0] bg-white p-6">
            <h2 className="text-xl font-semibold text-[#1c2b1a] mb-2">
              Customer profile not found
            </h2>
            <p className="text-[#7a8a6a] text-sm">
              Your account exists, but no customer profile is connected yet.
            </p>
          </div>
        )}

        <div className="bg-[#174832] rounded-[28px] p-8 text-white mb-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                <Package size={28} />
              </div>

              <div>
                <p className="text-[#9db79d] text-xs tracking-[0.18em] uppercase font-bold">
                  Order #8812 — In Transit
                </p>
                <h2
                  className="text-2xl mt-1"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Arriving tomorrow, 8–10am
                </h2>

                <p className="flex items-center gap-1 text-[#b8c9b3] text-sm mt-2">
                  <MapPin size={14} />
                  {customer?.address || "No address yet"}
                </p>
              </div>
            </div>

            <button className="rounded-full border border-white/30 px-6 py-3 text-sm hover:bg-white/10">
              Track order
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-9 text-xs text-[#b8c9b3]">
            {["Placed", "Picked", "In transit", "Delivered"].map((step, i) => (
              <div key={step}>
                <div
                  className={`h-1 rounded-full mb-3 ${
                    i < 3 ? "bg-white" : "bg-white/20"
                  }`}
                />
                <p className={i < 3 ? "text-white" : "text-white/40"}>
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10">
          <section className="bg-white rounded-[28px] p-8 border border-[#e6dfd2]">
            <div className="flex items-center justify-between mb-7">
              <h2
                className="text-2xl"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Recent orders
              </h2>

              <Link href="/dashboard/customer/orders" className="text-[#1e6b42] text-sm font-semibold">
                View all
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-2xl border border-[#eee7dc] p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#f1eadf] flex items-center justify-center text-[#7c715f] text-sm">
                      {order.num}
                    </div>

                    <div>
                      <p className="font-semibold text-[#102615]">{order.id}</p>
                      <p className="text-[#8a8174] text-sm">
                        {order.date} · {order.items}
                      </p>
                    </div>
                  </div>

                  <p className="text-[#102615]">{order.price}</p>

                  <span
                    className={`text-[11px] font-bold rounded-full px-3 py-1 ${
                      order.status === "IN TRANSIT"
                        ? "bg-[#fff0cf] text-[#b17400]"
                        : "bg-[#dff7ea] text-[#008454]"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-[28px] p-8 border border-[#e6dfd2]">
            <div className="flex items-center justify-between mb-7">
              <h2
                className="text-2xl"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Wishlist
              </h2>

              <Heart size={18} className="text-[#1e6b42]" />
            </div>

            <div className="flex flex-col gap-5">
              {wishlist.map((item) => (
                <div key={item.name} className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />

                  <div className="flex-1">
                    <p className="font-semibold text-[#102615]">{item.name}</p>
                    <p className="text-[#8a8174] text-sm italic">{item.farm}</p>
                  </div>

                  <p className="text-sm">{item.price}</p>
                </div>
              ))}
            </div>

            <button className="w-full mt-8 rounded-full border border-[#d8d0c3] py-3 text-sm font-semibold hover:border-[#1e6b42]">
              Move all to basket
            </button>
          </section>
        </div>
      </section>
    </main>
  );
}

function SidebarLink({
  icon,
  label,
  href,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-full px-4 py-3 text-sm font-semibold ${
        active
          ? "bg-white/12 text-white"
          : "text-[#b8c9b3] hover:bg-white/10 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-3xl bg-white border border-[#e0dbd0] p-5">
      <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#7a8a6a] mb-2">
        {title}
      </p>
      <p className="text-[#1c2b1a] font-semibold capitalize">{value}</p>
    </div>
  );
}

const orders = [
  { num: "#12", id: "Order #8812", date: "Sep 12", items: "3 items", price: "$32.00", status: "IN TRANSIT" },
  { num: "#80", id: "Order #8780", date: "Sep 4", items: "5 items", price: "$48.50", status: "DELIVERED" },
  { num: "#41", id: "Order #8741", date: "Aug 28", items: "2 items", price: "$18.25", status: "DELIVERED" },
  { num: "#02", id: "Order #8702", date: "Aug 19", items: "7 items", price: "$72.10", status: "DELIVERED" },
];

const wishlist = [
  {
    name: "Wildflower Honey",
    farm: "Blackwood Apiary",
    price: "$12.50",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&q=80",
  },
  {
    name: "Strawberries",
    farm: "Hilltop Berry",
    price: "$5.75",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=200&q=80",
  },
  {
    name: "Heirloom Tomatoes",
    farm: "Green Valley",
    price: "$4.50",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&q=80",
  },
];


