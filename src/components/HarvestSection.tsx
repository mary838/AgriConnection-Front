"use client";

import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Heirloom Tomatoes",
    farm: "Green Valley Farms",
    price: "$4.50/lb",
    image: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=600&q=80",
  },
  {
    id: 2,
    name: "Curly Green Kale",
    farm: "Oak Ridge Farm",
    price: "$3.00",
    image: "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?w=600&q=80",
  },
  {
    id: 3,
    name: "Rainbow Carrots",
    farm: "Meadowlark Organics",
    price: "$4.50",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&q=80",
  },
  {
    id: 4,
    name: "Wildflower Honey",
    farm: "Blackwood Apiary",
    price: "$12.50",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80",
  },
];

export default function HarvestSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
          <div>
            <h2
              className="text-[32px] font-semibold text-[#1c2b1a] leading-tight"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              This week's harvest
            </h2>
            <p className="text-[14px] text-[#7a8a6a] mt-1">
              Directly sourced, arriving in our hubs this morning.
            </p>
          </div>
          <Link
            href="/marketplace"
            className="text-[13.5px] font-medium text-[#2d5a1b] hover:underline whitespace-nowrap"
          >
            View full inventory →
          </Link>
        </div>

        {/* Product cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <Link
              key={product.id}
              href="/marketplace"
              className="group rounded-2xl overflow-hidden bg-[#faf8f4] border border-[#ede8df] hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden bg-[#e8e0d0]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="px-4 py-3">
                <div className="flex items-center justify-between gap-2">
                  <p
                    className="text-[15px] font-medium text-[#1c2b1a]"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {product.name}
                  </p>
                  <p className="text-[14px] font-semibold text-[#1c2b1a] shrink-0">
                    {product.price}
                  </p>
                </div>
                <p className="text-[12px] text-[#7a8a6a] mt-1">by {product.farm}</p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}