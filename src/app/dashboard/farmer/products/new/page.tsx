"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type Farmer = {
  id: string;
  userId: string;
  provinceId: number;
};

export default function NewProductPage() {
  const router = useRouter();

  const [farmer, setFarmer] = useState<Farmer | null>(null);

  const [form, setForm] = useState({
    productCode: "",
    name: "",
    category: "fruit",
    priceUsd: "",
    unit: "kg",
    stockQty: "",
    lowStockThreshold: "20",
  });

  const [images, setImages] = useState<File[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const fetchFarmer = async () => {
      try {
        const token =
          localStorage.getItem("access_token") ||
          sessionStorage.getItem("access_token");

        if (!token) {
          router.push("/login");
          return;
        }

        const profileRes = await fetch(`${API_URL}/profile`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const profileData: User = await profileRes.json();

        if (!profileRes.ok) {
          throw new Error("Failed to load profile.");
        }

        const farmersRes = await fetch(`${API_URL}/farmers`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const farmersData: Farmer[] = await farmersRes.json();

        if (!farmersRes.ok) {
          throw new Error("Failed to load farmer profile.");
        }

        const currentFarmer = farmersData.find(
          (item) => item.userId === profileData.id
        );

        if (!currentFarmer) {
          throw new Error("Farmer profile not found.");
        }

        setFarmer(currentFarmer);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setPageLoading(false);
      }
    };

    fetchFarmer();
  }, [router]);

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 4) {
      setError("You can upload maximum 4 images.");
      return;
    }

    setError("");
    setImages(selectedFiles);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!farmer) return setError("Farmer profile not found.");
    if (!form.productCode.trim()) return setError("Product code is required.");
    if (!form.name.trim()) return setError("Product name is required.");
    if (!form.priceUsd) return setError("Price is required.");
    if (!form.stockQty) return setError("Stock quantity is required.");
    if (images.length === 0) return setError("Please upload at least one image.");

    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("access_token") ||
        sessionStorage.getItem("access_token");

      if (!token) {
        router.push("/login");
        return;
      }

      const productRes = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productCode: form.productCode.trim(),
          name: form.name.trim(),
          category: form.category,
          farmerId: farmer.id,
          priceUsd: Number(form.priceUsd),
          unit: form.unit,
          images: [],
        }),
      });

      const productData = await productRes.json();

      if (!productRes.ok) {
        throw new Error(productData.message || "Create product failed.");
      }

      for (const image of images) {
        const uploadData = new FormData();
        uploadData.append("image", image);

        const uploadRes = await fetch(
          `${API_URL}/products/${productData.id}/images`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: uploadData,
          }
        );

        const uploadResult = await uploadRes.json();

        if (!uploadRes.ok) {
          throw new Error(uploadResult.message || "Image upload failed.");
        }
      }

      const inventoryRes = await fetch(`${API_URL}/inventory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: productData.id,
          provinceId: farmer.provinceId,
          stockQty: Number(form.stockQty),
          lowStockThreshold: Number(form.lowStockThreshold),
        }),
      });

      const inventoryData = await inventoryRes.json();

      if (!inventoryRes.ok) {
        throw new Error(inventoryData.message || "Create inventory failed.");
      }

      router.push(`/marketplace/${productData.id}`);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <main className="min-h-screen bg-[#faf8f3] flex items-center justify-center text-[#1c2b1a]">
        Loading product form...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8f3] px-8 py-10">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/dashboard/farmer"
          className="text-sm text-[#7a8a6a] hover:text-[#2d5a1b]"
        >
          ← Back to dashboard
        </Link>

        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#2d5a1b] mt-8 mb-2">
          Farmer Product
        </p>

        <h1
          className="text-[42px] text-[#1c2b1a] mb-8"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Add new product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#e0dbd0] rounded-3xl p-8 flex flex-col gap-5"
        >
          <Input
            label="Product Code"
            placeholder="P-001"
            value={form.productCode}
            onChange={(v) => update("productCode", v)}
          />

          <Input
            label="Product Name"
            placeholder="Organic Mango"
            value={form.name}
            onChange={(v) => update("name", v)}
          />

          <div>
            <label className={labelClass}>Category</label>
            <select
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              className={inputClass}
            >
              <option value="fruit">Fruit</option>
              <option value="spices">Spices</option>
              <option value="leafy_greens">Leafy Greens</option>
              <option value="grains">Grains</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Product Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagesChange}
              required
              className="w-full px-5 py-3.5 rounded-2xl bg-white border border-[#e0dbd0] text-[14px] text-[#1c2b1a] outline-none focus:border-[#2d5a1b] transition-colors"
            />
            <p className="text-[12px] text-[#7a8a6a] mt-2">
              Upload 1 to 4 images. The first image will be used as the main
              product image.
            </p>
          </div>

          {images.length > 0 && (
            <div className="rounded-2xl border border-[#e0dbd0] bg-[#faf8f3] p-4">
              <p className={labelClass}>Image Preview</p>

              <div className="grid grid-cols-4 gap-3">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-xl overflow-hidden bg-white border border-[#e0dbd0] relative"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Product preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />

                    {index === 0 && (
                      <span className="absolute top-2 left-2 bg-[#1e3d18] text-white text-[10px] px-2 py-1 rounded-full">
                        Main
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <Input
            label="Price USD"
            type="number"
            placeholder="2.5"
            value={form.priceUsd}
            onChange={(v) => update("priceUsd", v)}
          />

          <div>
            <label className={labelClass}>Unit</label>
            <select
              value={form.unit}
              onChange={(e) => update("unit", e.target.value)}
              className={inputClass}
            >
              <option value="kg">kg</option>
              <option value="piece">piece</option>
            </select>
          </div>

          <Input
            label="Stock Quantity"
            type="number"
            placeholder="100"
            value={form.stockQty}
            onChange={(v) => update("stockQty", v)}
          />

          <Input
            label="Low Stock Threshold"
            type="number"
            placeholder="20"
            value={form.lowStockThreshold}
            onChange={(v) => update("lowStockThreshold", v)}
          />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1e3d18] text-white text-[15px] font-semibold py-4 rounded-full hover:bg-[#2d5a1b] transition-colors disabled:opacity-60"
          >
            {loading ? "Creating product..." : "Create product and inventory"}
          </button>
        </form>
      </div>
    </main>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        required
        step={type === "number" ? "0.01" : undefined}
        className={inputClass}
      />
    </div>
  );
}

const labelClass =
  "block text-[11px] font-semibold tracking-[0.14em] uppercase text-[#7a8a6a] mb-2";

const inputClass =
  "w-full px-5 py-3.5 rounded-full bg-white border border-[#e0dbd0] text-[14px] text-[#1c2b1a] placeholder-[#bbb] outline-none focus:border-[#2d5a1b] transition-colors";