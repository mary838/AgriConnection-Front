"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import { products as productsApi, getToken, ApiError, type Product } from "@/lib/api";

const categories = [
  "All produce",
  "fruit",
  "spices",
  "leafy_greens",
  "grains",
];

const ITEMS_PER_PAGE = 8;

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("All produce");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        if (!getToken()) {
          window.location.href = "/login?redirect=/marketplace";
          return;
        }

        const data = await productsApi.list();
        setProducts(data);
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

    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat =
        activeCategory === "All produce" || p.category === activeCategory;

      const farmName =
        p.farmer?.user?.name || p.farmer?.farmerCode || "Local Farmer";

      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        farmName.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());

      return matchCat && matchSearch;
    });
  }, [activeCategory, search, products]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center text-[#1c2b1a]">
        Loading products...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-12">
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
            Browse fresh products from verified local farmers.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-5 py-4 text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex-1 min-w-[200px] relative">
            <Search
              size={15}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9aaa8a]"
            />

            <input
              type="text"
              placeholder="Search produce, farms, categories..."
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
              <option>Sort: Price low-high</option>
              <option>Sort: Price high-low</option>
              <option>Sort: Newest</option>
            </select>

            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9aaa8a] pointer-events-none"
            />
          </div>
        </div>

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
              {cat === "All produce" ? "All produce" : cat.replace("_", " ")}
            </button>
          ))}
        </div>

        {paginated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {paginated.map((product) => {
              const farmName =
                product.farmer?.user?.name ||
                product.farmer?.farmerCode ||
                "Local Farmer";

              return (
                <Link
                  key={product.id}
                  href={`/marketplace/${product.id}`}
                  className="group bg-white border border-[#ede8df] rounded-2xl overflow-hidden hover:shadow-md transition-shadow block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e0d0]">
                    <img
                      src={
                        product.imageUrl ||
                        "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&q=80"
                      }
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-[0.1em] px-3 py-1 rounded-full bg-[#1e3d18] text-white uppercase">
                      {product.category.replace("_", " ")}
                    </span>
                  </div>

                  <div className="px-4 py-4">
                    <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#9aaa8a] mb-1">
                      {product.productCode}
                    </p>

                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p
                        className="text-[15px] font-medium text-[#1c2b1a]"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {product.name}
                      </p>

                      <p className="text-[14px] font-semibold text-[#1c2b1a] shrink-0">
                        ${Number(product.priceUsd).toFixed(2)}/{product.unit}
                      </p>
                    </div>

                    <p className="text-[12px] text-[#9aaa8a]">{farmName}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-[#9aaa8a]">
            <p className="text-[16px]">No produce found for "{search}"</p>
            <p className="text-[13px] mt-1">
              Try a different search or category.
            </p>
          </div>
        )}

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