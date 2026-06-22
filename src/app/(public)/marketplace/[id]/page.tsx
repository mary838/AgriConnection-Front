"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Leaf, Truck, ShieldCheck } from "lucide-react";

// ─── Mock data (replace with real fetch by id) ───────────────────────────────
const product = {
  id: 1,
  name: "Heirloom Tomatoes",
  category: "Vegetables",
  badge: "IN SEASON • HARVESTED TODAY",
  tagline: "Sun-ripened on the vine at",
  farm: "Green Valley Farms",
  distance: "4.2 miles from our hub.",
  pricePerUnit: 4.5,
  unit: "pound",
  description:
    "A mix of Cherokee Purple, Brandywine and Green Zebra varieties — bursting with the kind of complex, jammy sweetness only late-summer field tomatoes deliver. Picked at peak ripeness and packed unwashed to preserve flavor.",
  images: [
    "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=800&q=80",
    "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&q=80",
    "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?w=800&q=80",
    "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&q=80",
    "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80",
  ],
  trust: [
    { icon: "leaf", label: "Certified organic" },
    { icon: "truck", label: "Delivered in 24h" },
    { icon: "shield", label: "Farm-verified" },
  ],
  grower: {
    name: "Green Valley Farms",
    bio: "3rd-generation family farm in Sonoma County. Regenerative practices since 1998.",
    href: "/farms/green-valley",
  },
};

function TrustIcon({ icon }: { icon: string }) {
  const cls = "text-[#2d5a1b]";
  if (icon === "leaf") return <Leaf size={16} className={cls} />;
  if (icon === "truck") return <Truck size={16} className={cls} />;
  return <ShieldCheck size={16} className={cls} />;
}

export default function ProductDetailPage() {
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(2);

  const total = (product.pricePerUnit * qty).toFixed(2);

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[13px] text-[#9aaa8a] mb-8">
          <Link href="/marketplace" className="hover:text-[#2d5a1b] transition-colors">Marketplace</Link>
          <span>/</span>
          <Link href="/marketplace" className="hover:text-[#2d5a1b] transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-[#1c2b1a] font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ── Left: Images ── */}
          <div className="flex flex-col gap-4">
            {/* Main image */}
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#e8e0d0]">
              <img
                src={product.images[activeImg]}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.slice(1).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i + 1)}
                  className={`rounded-xl overflow-hidden aspect-square border-2 transition-colors ${
                    activeImg === i + 1
                      ? "border-[#2d5a1b]"
                      : "border-transparent hover:border-[#c8d8b8]"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: Details ── */}
          <div className="flex flex-col gap-6 lg:pt-2">

            {/* Badge */}
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#2d5a1b]">
              {product.badge}
            </p>

            {/* Title */}
            <h1
              className="text-[32px] sm:text-[42px] font-semibold text-[#1c2b1a] leading-tight -mt-2"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              {product.name}
            </h1>

            {/* Farm tagline */}
            <p className="text-[14px] text-[#7a8a6a] -mt-2">
              {product.tagline}{" "}
              <Link href={product.grower.href} className="italic font-medium text-[#1c2b1a] hover:underline">
                {product.farm}
              </Link>
              , {product.distance}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span
                className="text-[36px] sm:text-[44px] font-semibold text-[#1c2b1a]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                ${product.pricePerUnit.toFixed(2)}
              </span>
              <span className="text-[14px] text-[#9aaa8a]">per {product.unit}</span>
            </div>

            {/* Description */}
            <p className="text-[14px] text-[#5a6a52] leading-[1.75]">
              {product.description}
            </p>

            {/* Qty + Add to basket */}
            <div className="flex items-center gap-3">
              {/* Qty stepper */}
              <div className="flex items-center gap-3 bg-white border border-[#e0dbd0] rounded-full px-4 py-2">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-6 h-6 flex items-center justify-center text-[#4a5568] hover:text-[#1c2b1a] transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="text-[14px] font-medium text-[#1c2b1a] min-w-[36px] text-center">
                  {qty} lb
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-6 h-6 flex items-center justify-center text-[#4a5568] hover:text-[#1c2b1a] transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Add to basket */}
              <button className="flex-1 bg-[#1e3d18] text-white text-[14px] font-medium px-6 py-3 rounded-full hover:bg-[#2d5a1b] transition-colors">
                Add to basket — ${total}
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 flex-wrap pt-1">
              {product.trust.map((t) => (
                <div key={t.label} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#eaf2e4] flex items-center justify-center">
                    <TrustIcon icon={t.icon} />
                  </div>
                  <span className="text-[13px] text-[#5a6a52]">{t.label}</span>
                </div>
              ))}
            </div>

            {/* Grower card */}
            <div className="bg-[#f0ece4] rounded-2xl p-5 flex flex-col gap-2 mt-1">
              <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#7a8a6a]">
                Grown by
              </p>
              <h3
                className="text-[22px] font-semibold text-[#1c2b1a]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {product.grower.name}
              </h3>
              <p className="text-[13px] text-[#5a6a52] leading-[1.6]">
                {product.grower.bio}
              </p>
              <Link
                href={product.grower.href}
                className="text-[13px] font-medium text-[#1c2b1a] underline underline-offset-4 hover:text-[#2d5a1b] transition-colors w-fit mt-1"
              >
                View farm profile →
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}