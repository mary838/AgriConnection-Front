"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";

const initialItems = [
  {
    id: 1,
    name: "Heirloom Tomatoes",
    farm: "Green Valley Farms",
    unit: "2 lb",
    priceEach: 9.0,
    qty: 1,
    image: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=300&q=80",
  },
  {
    id: 2,
    name: "Curly Green Kale",
    farm: "Oak Ridge Farm",
    unit: "2 bunches",
    priceEach: 6.0,
    qty: 1,
    image: "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?w=300&q=80",
  },
  {
    id: 3,
    name: "Wildflower Honey",
    farm: "Blackwood Apiary",
    unit: "1 jar",
    priceEach: 12.5,
    qty: 1,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&q=80",
  },
];

const DELIVERY = 4.5;

export default function CartPage() {
  const router = useRouter(); // ✅ moved inside the component
  const [items, setItems] = useState(initialItems);

  const updateQty = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, i) => sum + i.priceEach * i.qty, 0);
  const total = subtotal + DELIVERY;
  const farmCount = new Set(items.map((i) => i.farm)).size;

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 py-12">

        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-[42px] font-semibold text-[#1c2b1a] leading-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Your basket
          </h1>
          <p className="text-[14px] text-[#7a8a6a] mt-1">
            {items.length} items from {farmCount} farm{farmCount !== 1 ? "s" : ""} — ready to harvest tomorrow morning.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[18px] text-[#7a8a6a] mb-4">Your basket is empty.</p>
            <Link
              href="/marketplace"
              className="inline-block bg-[#1e3d18] text-white px-8 py-3 rounded-full text-[14px] font-medium hover:bg-[#2d5a1b] transition-colors"
            >
              Browse the harvest
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">

            {/* ── Cart items ── */}
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#ede8df] rounded-2xl px-5 py-4 flex items-center gap-5"
                >
                  <div className="w-[72px] h-[72px] rounded-xl overflow-hidden bg-[#e8e0d0] shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[15px] font-semibold text-[#1c2b1a]"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {item.name}
                    </p>
                    <p className="text-[12px] text-[#7a8a6a] mt-0.5">{item.farm}</p>
                    <p className="text-[12px] text-[#9aaa8a] mt-0.5">{item.unit}</p>
                  </div>

                  <div className="flex items-center gap-3 border border-[#e0dbd0] rounded-full px-4 py-2 bg-white">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="text-[#7a8a6a] hover:text-[#1c2b1a] transition-colors"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="text-[14px] font-medium text-[#1c2b1a] min-w-[16px] text-center">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="text-[#7a8a6a] hover:text-[#1c2b1a] transition-colors"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  <p className="text-[15px] font-semibold text-[#1c2b1a] min-w-[56px] text-right">
                    ${(item.priceEach * item.qty).toFixed(2)}
                  </p>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-[#c8d0b8] hover:text-[#7a8a6a] transition-colors ml-1"
                    aria-label="Remove item"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* ── Order summary ── */}
            <div className="bg-[#1e3d18] rounded-2xl p-7 sticky top-20">
              <h2
                className="text-[24px] font-semibold text-white mb-6"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Order summary
              </h2>

              <div className="flex flex-col gap-3 mb-5">
                <div className="flex justify-between text-[14px]">
                  <span className="text-white/60">Subtotal</span>
                  <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-white/60">Local delivery</span>
                  <span className="text-white font-medium">${DELIVERY.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-white/60">Farmer support</span>
                  <span className="text-white/60 italic">Included</span>
                </div>
              </div>

              <div className="border-t border-white/15 mb-5" />

              <div className="flex justify-between items-baseline mb-6">
                <span className="text-[14px] text-white/70">Total</span>
                <span
                  className="text-[36px] font-semibold text-white leading-none"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => router.push("/checkout")}
                className="w-full bg-white text-[#1e3d18] text-[15px] font-semibold py-4 rounded-full hover:bg-white/90 transition-colors"
              >
                Proceed to checkout
              </button>

              <p className="text-center text-[12px] text-white/40 mt-4">
                85¢ of every dollar goes directly to farmers.
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}