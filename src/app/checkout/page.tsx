"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const orderItems = [
  { name: "Heirloom Tomatoes (2 lb)", price: 9.0 },
  { name: "Curly Kale (2 bunches)", price: 6.0 },
  { name: "Wildflower Honey", price: 12.5 },
];
const DELIVERY_FEE = 4.5;

const deliveryWindows = [
  { label: "Tomorrow, 8–10am" },
  { label: "Tomorrow, 2–4pm" },
  { label: "Saturday, 9–11am" },
];

const labelClass = "block text-[11px] font-semibold tracking-[0.12em] uppercase text-[#888] mb-1.5 font-sans";
const inputClass =
  "w-full px-5 py-3 bg-[#f5f3ee] border border-[#e5e2d8] rounded-full text-[14px] text-[#333] outline-none focus:border-[#2d5a1b] transition-colors box-border";

export default function CheckoutPage() {
  const [selectedWindow, setSelectedWindow] = useState(0);
  const [address, setAddress] = useState({
    fullName: "Marcus Bell",
    phone: "(555) 010-2233",
    street: "48 Old Mill Rd",
    city: "Sonoma",
    zip: "95476",
  });
  const [payment, setPayment] = useState({
    cardNumber: "•••• •••• •••• 4242",
    expiry: "08/29",
    cvc: "123",
  });

  const subtotal = orderItems.reduce((sum, i) => sum + i.price, 0);
  const total = subtotal + DELIVERY_FEE;

  return (
    <div className="min-h-screen bg-[#f7f6f2]" style={{ fontFamily: "Georgia, serif" }}>

      {/* Navbar */}
      <nav className="bg-[#f7f6f2] border-b border-[#e5e2d8] sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-[60px] flex items-center gap-4 sm:gap-8">
          <Link href="/" className="italic text-[18px] sm:text-[20px] text-[#2d5a1b] font-semibold shrink-0">
            AgriConnect
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {["Home", "Marketplace", "Farmer Portal", "Admin", "My Account"].map((link) => (
              <Link key={link} href="#" className="text-[14px] text-[#555] hover:text-[#2d5a1b] transition-colors">
                {link}
              </Link>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-3 sm:gap-4">
            <div className="relative">
              <span className="text-[20px] cursor-pointer">🛒</span>
              <span className="absolute -top-1.5 -right-2 bg-[#2d5a1b] text-white text-[10px] rounded-full w-[16px] h-[16px] flex items-center justify-center font-semibold">
                3
              </span>
            </div>
            <Link href="/login" className="hidden sm:block text-[14px] text-[#555] hover:text-[#2d5a1b] transition-colors">
              Sign in
            </Link>
            <div className="w-[32px] h-[32px] rounded-full bg-[#8b6f47] flex items-center justify-center text-white text-[14px] font-semibold">
              M
            </div>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 py-8">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-[14px] text-[#555] hover:text-[#2d5a1b] transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Back to basket
        </Link>

        <h1 className="text-[32px] sm:text-[42px] font-normal text-[#1a1a1a] mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">

          {/* LEFT — steps */}
          <div className="flex flex-col gap-5">

            {/* Step 01 — Delivery address */}
            <div className="bg-white rounded-2xl p-6 border border-[#e8e4da]">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-[#e8f5e0] flex items-center justify-center text-[16px] shrink-0">
                  📍
                </div>
                <div>
                  <span className="text-[11px] text-[#999] tracking-[0.1em] uppercase font-sans">Step 01</span>
                  <h2 className="text-[20px] sm:text-[22px] font-normal text-[#1a1a1a] leading-tight">Delivery address</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input className={inputClass} value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input className={inputClass} value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })} />
                </div>
              </div>

              <div className="mb-4">
                <label className={labelClass}>Street Address</label>
                <input className={inputClass} value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>City</label>
                  <input className={inputClass} value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>ZIP</label>
                  <input className={inputClass} value={address.zip}
                    onChange={(e) => setAddress({ ...address, zip: e.target.value })} />
                </div>
              </div>
            </div>

            {/* Step 02 — Delivery window */}
            <div className="bg-white rounded-2xl p-6 border border-[#e8e4da]">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-[#e8f5e0] flex items-center justify-center text-[16px] shrink-0">
                  🚚
                </div>
                <div>
                  <span className="text-[11px] text-[#999] tracking-[0.1em] uppercase font-sans">Step 02</span>
                  <h2 className="text-[20px] sm:text-[22px] font-normal text-[#1a1a1a] leading-tight">Delivery window</h2>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {deliveryWindows.map((w, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedWindow(i)}
                    className={`px-5 py-3.5 rounded-xl text-[14px] cursor-pointer transition-all ${
                      selectedWindow === i
                        ? "border-2 border-[#2d5a1b] bg-[#e8f5e0] text-[#2d5a1b] font-semibold"
                        : "border border-[#d8d4c8] bg-white text-[#444]"
                    }`}
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 03 — Payment */}
            <div className="bg-white rounded-2xl p-6 border border-[#e8e4da]">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-[#e8f5e0] flex items-center justify-center text-[16px] shrink-0">
                  💳
                </div>
                <div>
                  <span className="text-[11px] text-[#999] tracking-[0.1em] uppercase font-sans">Step 03</span>
                  <h2 className="text-[20px] sm:text-[22px] font-normal text-[#1a1a1a] leading-tight">Payment</h2>
                </div>
              </div>

              <div className="mb-4">
                <label className={labelClass}>Card Number</label>
                <input className={inputClass} value={payment.cardNumber}
                  onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Expiry</label>
                  <input className={inputClass} value={payment.expiry}
                    onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>CVC</label>
                  <input className={inputClass} value={payment.cvc}
                    onChange={(e) => setPayment({ ...payment, cvc: e.target.value })} />
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT — order summary */}
          <div className="bg-white rounded-2xl p-6 border border-[#e8e4da] lg:sticky lg:top-20">
            <h3 className="text-[20px] font-normal text-[#1a1a1a] mb-5">Order</h3>

            {orderItems.map((item, i) => (
              <div key={i} className="flex justify-between text-[14px] text-[#444] mb-3">
                <span>{item.name}</span>
                <span className="shrink-0 ml-4">${item.price.toFixed(2)}</span>
              </div>
            ))}

            <div className="flex justify-between text-[14px] text-[#888] pt-3 border-t border-[#eee] mb-5">
              <span>Delivery</span>
              <span>${DELIVERY_FEE.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-[11px] tracking-[0.12em] uppercase text-[#888] font-sans">Total</span>
              <span className="text-[30px] sm:text-[32px] font-normal text-[#1a1a1a]">${total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => alert("Order placed successfully!")}
              className="w-full py-4 bg-[#1e4d14] text-white rounded-full text-[15px] sm:text-[16px] font-semibold hover:bg-[#2d5a1b] transition-colors"
            >
              Place order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
