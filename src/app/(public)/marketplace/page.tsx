"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import Link from "next/link";
import Pagination from "@/components/Pagination";

const categories = ["All produce", "Vegetables", "Greens", "Fruit", "Dairy & Eggs", "Pantry", "Herbs", "Rice & Grains", "Shower seeds"];

const products = [
  { id: 1, name: "Heirloom Tomatoes", farm: "Green Valley Farms", price: "$4.50/lb", category: "Vegetables", badge: "IN SEASON", badgeColor: "bg-[#1e3d18] text-white", image: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=600&q=80" },
  { id: 2, name: "Curly Green Kale", farm: "Oak Ridge Farm", price: "$3.00", category: "Greens", badge: "LOW STOCK", badgeColor: "bg-white text-[#1c2b1a]", image: "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?w=600&q=80" },
  { id: 3, name: "Rainbow Carrots", farm: "Meadowlark Organics", price: "$4.50", category: "Vegetables", badge: "NEW", badgeColor: "bg-[#1e3d18] text-white", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&q=80" },
  { id: 4, name: "Wildflower Honey", farm: "Blackwood Apiary", price: "$12.50", category: "Pantry", badge: "BESTSELLER", badgeColor: "bg-white text-[#1c2b1a]", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80" },
  { id: 5, name: "Farm Fresh Eggs", farm: "Sunrise Poultry", price: "$6.00", category: "Dairy & Eggs", badge: "DAILY", badgeColor: "bg-white text-[#1c2b1a]", image: "https://images.unsplash.com/photo-1582169505937-b9992bd01ed9?w=600&q=80" },
  { id: 6, name: "Fresh Strawberries", farm: "Berry Meadow Farm", price: "$5.50", category: "Fruit", badge: "JUST IN", badgeColor: "bg-white text-[#1c2b1a]", image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&q=80" },
  { id: 7, name: "Heirloom Tomatoes", farm: "Green Valley Farms", price: "$4.50/lb", category: "Vegetables", badge: "IN SEASON", badgeColor: "bg-[#1e3d18] text-white", image: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=600&q=80" },
  { id: 8, name: "Wildflower Honey", farm: "Blackwood Apiary", price: "$12.50", category: "Pantry", badge: "BESTSELLER", badgeColor: "bg-white text-[#1c2b1a]", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80" },
];

const ITEMS_PER_PAGE = 8;

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState("All produce");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = activeCategory === "All produce" || p.category === activeCategory;
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.farm.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleSearch = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-12">

        {/* Page header */}
        <div className="mb-8">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#2d5a1b] mb-2">
            The Marketplace
          </p>
          <h1
            className="text-[32px] sm:text-[44px] font-semibold text-[#1c2b1a] leading-tight mb-2"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Today's fresh harvest
          </h1>
          <p className="text-[15px] text-[#7a8a6a]">
            Browse 240+ items from verified local farms, updated each morning.
          </p>
        </div>

        {/* Search + controls */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex-1 min-w-[200px] relative">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9aaa8a]" />
            <input
              type="text"
              placeholder="Search produce, farms, regions..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-[14px] bg-white border border-[#e0dbd0] rounded-xl text-[#1c2b1a] placeholder-[#b0b8a0] focus:outline-none focus:border-[#2d5a1b] transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-white border border-[#e0dbd0] rounded-xl text-[14px] text-[#4a5568] hover:border-[#2d5a1b] transition-colors whitespace-nowrap">
            <SlidersHorizontal size={15} />
            Filters
          </button>
          <div className="relative">
            <select className="appearance-none pl-4 pr-9 py-3 bg-white border border-[#e0dbd0] rounded-xl text-[14px] text-[#4a5568] hover:border-[#2d5a1b] transition-colors focus:outline-none cursor-pointer">
              <option>Sort: Recommended</option>
              <option>Sort: Price low–high</option>
              <option>Sort: Price high–low</option>
              <option>Sort: Newest</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9aaa8a] pointer-events-none" />
          </div>
        </div>

        {/* Category pills */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-[13.5px] font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-[#1e3d18] text-white"
                  : "bg-white border border-[#e0dbd0] text-[#4a5568] hover:border-[#2d5a1b] hover:text-[#2d5a1b]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product grid */}
        {paginated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {paginated.map((product) => (
              <Link
                key={product.id}
                href={`/marketplace/${product.id}`}
                className="group bg-white border border-[#ede8df] rounded-2xl overflow-hidden hover:shadow-md transition-shadow block"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e0d0]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className={`absolute top-3 left-3 text-[10px] font-semibold tracking-[0.1em] px-3 py-1 rounded-full ${product.badgeColor}`}>
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="px-4 py-4">
                  <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#9aaa8a] mb-1">
                    {product.category}
                  </p>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-[15px] font-medium text-[#1c2b1a]" style={{ fontFamily: "Georgia, serif" }}>
                      {product.name}
                    </p>
                    <p className="text-[14px] font-semibold text-[#1c2b1a] shrink-0">{product.price}</p>
                  </div>
                  <p className="text-[12px] text-[#9aaa8a]">{product.farm}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-[#9aaa8a]">
            <p className="text-[16px]">No produce found for "{search}"</p>
            <p className="text-[13px] mt-1">Try a different search or category.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

      </div>
    </div>
  );
}