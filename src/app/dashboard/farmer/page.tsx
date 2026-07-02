"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BarChart3,
  Box,
  Grid2X2,
  LogOut,
  Package,
  Settings,
  ShoppingBag,
} from "lucide-react";
import { auth, profile as profileApi, farmers as farmersApi, getToken, clearToken, ApiError, type User, type Farmer } from "@/lib/api";

export default function FarmerDashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [farmer, setFarmer] = useState<Farmer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        if (!getToken()) {
          window.location.href = "/login";
          return;
        }

        const profileData = await profileApi.get();
        setUser(profileData);
        localStorage.setItem("user", JSON.stringify(profileData));

        const farmersData = await farmersApi.list();

        const currentFarmer = farmersData.find(
          (item) => item.userId === profileData.id
        );

        if (currentFarmer) {
          setFarmer(currentFarmer);
          localStorage.setItem("farmer", JSON.stringify(currentFarmer));
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

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4efe5] flex items-center justify-center text-[#102615]">
        Loading farmer dashboard...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4efe5] flex text-[#102615]">
      <aside className="w-[270px] bg-[#174832] min-h-screen p-7 flex flex-col justify-between sticky top-0">
        <div>
          <Link
            href="/"
            className="text-white text-2xl"
            style={{ fontFamily: "Georgia, serif" }}
          >
            AgriConnect
          </Link>

          <p className="text-[#9db79d] text-[11px] tracking-[0.22em] uppercase mt-2 font-semibold">
            Farmer Portal
          </p>

          <nav className="mt-12 flex flex-col gap-2">
            <SidebarLink
              active
              icon={<Grid2X2 size={16} />}
              label="Overview"
              href="/dashboard/farmer"
            />
            <SidebarLink
              icon={<Box size={16} />}
              label="Products"
              href="/dashboard/farmer/products"
            />
            <SidebarLink
              icon={<ShoppingBag size={16} />}
              label="Orders"
              href="/dashboard/farmer/orders"
            />
            <SidebarLink
              icon={<BarChart3 size={16} />}
              label="Reports"
              href="/dashboard/farmer/reports"
            />
            <SidebarLink
              icon={<Settings size={16} />}
              label="Settings"
              href="/profile"
            />
          </nav>
        </div>

        <div className="rounded-2xl bg-white/10 p-4">
          <Link href="/profile" className="flex items-center gap-3 hover:opacity-80">
            <div className="w-11 h-11 rounded-full bg-[#dce8d4] flex items-center justify-center text-[#174832] font-bold">
              {user?.name?.charAt(0).toUpperCase() || "F"}
            </div>

            <div>
              <p className="text-white text-sm font-semibold">
                {user?.name || "Farmer"}
              </p>
              <p className="text-[#b8c9b3] text-xs">
                {farmer?.province?.name || farmer?.farmerCode || "View profile"}
              </p>
            </div>
          </Link>

          <button
            onClick={async () => {
              await auth.logout().catch(() => {});
              clearToken();
              localStorage.removeItem("user");
              localStorage.removeItem("farmer");
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
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="flex items-start justify-between gap-8 mb-12">
          <div>
            <p className="text-[12px] tracking-[0.28em] uppercase text-[#1e6b42] font-bold mb-2">
              Morning, {user?.name?.split(" ")[0] || "Farmer"}
            </p>

            <h1
              className="text-[50px] leading-[0.95]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {user?.name || "Green Valley Farms"}
              <br />
              <em className="text-[#857d74] font-normal">
                Performance overview
              </em>
            </h1>
          </div>

          <div className="flex gap-3">
            <button className="rounded-full bg-white border border-[#e1d8ca] px-7 py-4 text-sm font-semibold hover:border-[#174832]">
              Export report
            </button>

            <Link
              href="/dashboard/farmer/products/new"
              className="rounded-full bg-[#174832] px-7 py-4 text-sm font-semibold text-white hover:bg-[#216343]"
            >
              + New product
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-14">
          <StatCard title="Total revenue" value="$12,480" note="+12%" />
          <StatCard title="Active orders" value="24" note="8 pending" />
          <StatCard title="Product views" value="1.2K" note="Trending up" />
          <div className="rounded-[26px] bg-[#174832] text-white p-8 shadow-md">
            <p className="text-[#9db79d] text-sm mb-5">Platform health</p>
            <p
              className="text-[38px]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Optimal
            </p>
            <p className="text-[#c6dcc6] text-sm mt-2">
              {farmer?.status === "active" ? "Verified farmer" : farmer?.status || "Pending farmer"}
            </p>
          </div>
        </div>

        {farmer && (
          <div className="grid md:grid-cols-4 gap-5 mb-12">
            <InfoCard title="Farmer Code" value={farmer.farmerCode} />
            <InfoCard title="Phone" value={farmer.phone || "N/A"} />
            <InfoCard
              title="Province"
              value={farmer.province?.name || `Province ID ${farmer.provinceId}`}
            />
            <InfoCard title="Status" value={farmer.status} />
          </div>
        )}

        <div className="grid lg:grid-cols-[1.6fr_0.8fr] gap-12">
          <section>
            <div className="flex items-center justify-between mb-7">
              <h2
                className="text-[28px]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Current inventory
              </h2>

              <Link
                href="/dashboard/farmer/products"
                className="text-[#1e6b42] text-sm font-semibold"
              >
                View catalog →
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {products.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
          </section>

          <aside>
            <h2
              className="text-[28px] mb-7"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Incoming orders
            </h2>

            <div className="flex flex-col gap-4 mb-10">
              {incomingOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl p-4 flex items-center gap-4 border border-[#e6dfd2]"
                >
                  <div className="w-12 h-12 rounded-full bg-[#d8f5df] flex items-center justify-center text-[#174832] font-semibold">
                    {order.customer.charAt(0)}
                  </div>

                  <div className="flex-1">
                    <p className="font-semibold text-[#102615]">
                      Order {order.id}
                    </p>
                    <p className="text-[#8a8174] text-sm">
                      {order.customer} · {order.items}
                    </p>
                  </div>

                  <span
                    className={`text-[10px] font-bold rounded-full px-3 py-1 ${
                      order.status === "PAID"
                        ? "bg-[#dff7ea] text-[#008454]"
                        : order.status === "PENDING"
                        ? "bg-[#fff0cf] text-[#b17400]"
                        : "bg-[#e6edf7] text-[#244e7a]"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-[#4b3324] rounded-[28px] p-8 text-white">
              <p className="text-[#bba997] text-[12px] tracking-[0.2em] uppercase mb-5">
                Weekly Insight
              </p>

              <h3
                className="text-[25px] leading-tight mb-5"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Honey crisp apples outperforming
              </h3>

              <p className="text-[#d6c9bd] text-sm leading-relaxed">
                +40% revenue vs. the platform average this week. Consider
                featuring them in the marketplace.
              </p>

              <div className="flex items-end gap-2 h-28 mt-8">
                {[38, 62, 50, 88, 65, 58, 52].map((height, index) => (
                  <div
                    key={index}
                    className={`w-5 rounded-t-full ${
                      index === 3 ? "bg-[#2f8b68]" : "bg-white/20"
                    }`}
                    style={{ height }}
                  />
                ))}
              </div>

              <p className="text-[#bba997] text-xs mt-3">MON — SUN</p>
            </div>

            <Link
              href="/dashboard/farmer/reports"
              className="mt-6 flex items-center justify-center rounded-full bg-white border border-[#d8d0c3] py-4 text-sm font-semibold hover:border-[#174832]"
            >
              See full analytics ↗
            </Link>
          </aside>
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

function StatCard({
  title,
  value,
  note,
}: {
  title: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-[26px] bg-white p-8 border border-[#e6dfd2] shadow-sm">
      <p className="text-[#9b9188] text-sm mb-5">{title}</p>
      <p
        className="text-[38px] text-[#2b160c]"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {value}
      </p>
      <p className="text-[#009b5a] text-sm font-semibold mt-2">{note}</p>
    </div>
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

function ProductCard({
  product,
}: {
  product: {
    name: string;
    price: string;
    stock: string;
    low?: boolean;
    image: string;
  };
}) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-[#e6dfd2]">
      <div
        className="h-[170px] bg-cover bg-center"
        style={{ backgroundImage: `url(${product.image})` }}
      />

      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 style={{ fontFamily: "Georgia, serif" }}>{product.name}</h3>
            <p
              className={`text-sm mt-2 ${
                product.low ? "text-red-500 font-semibold" : "text-[#8a8174]"
              }`}
            >
              {product.stock}
            </p>
          </div>

          <p className="text-sm">{product.price}</p>
        </div>

        <div className="flex gap-3 mt-5">
          <button className="flex-1 rounded-full border border-[#e1d8ca] py-2 text-sm font-semibold hover:border-[#174832]">
            {product.low ? "Restock" : "Edit"}
          </button>
          <button className="rounded-full border border-[#e1d8ca] px-5 py-2 text-sm font-semibold hover:border-[#174832]">
            Archive
          </button>
        </div>
      </div>
    </div>
  );
}

const products = [
  {
    name: "Heirloom Tomatoes",
    price: "$4.50/lb",
    stock: "In stock: 140 units",
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=700&q=80",
  },
  {
    name: "Curly Green Kale",
    price: "$3.00/ea",
    stock: "Low stock: 12 units",
    low: true,
    image:
      "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?w=700&q=80",
  },
  {
    name: "Strawberries",
    price: "$5.75/pt",
    stock: "In stock: 68 units",
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=700&q=80",
  },
  {
    name: "Wildflower Honey",
    price: "$12.50/jar",
    stock: "In stock: 32 units",
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=700&q=80",
  },
];

const incomingOrders = [
  { id: "#8812", customer: "Clara J.", items: "3 items", status: "PAID" },
  { id: "#8811", customer: "Mark T.", items: "2 items", status: "PENDING" },
  { id: "#8809", customer: "Sarah L.", items: "5 items", status: "SHIPPED" },
  { id: "#8805", customer: "Diego R.", items: "1 item", status: "PAID" },
];