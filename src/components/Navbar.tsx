"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home",         href: "/" },
  { label: "Marketplace",  href: "/marketplace" },
  { label: "Farmer Portal",href: "/dashboard/farmer" },
  { label: "Admin",        href: "/dashboard/admin" },
  { label: "My Account",   href: "/dashboard/customer" },
];

interface NavbarProps {
  cartCount?: number;
}

export default function Navbar({ cartCount = 3 }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-[#dce4d3] shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex items-center h-[52px] gap-8">

          {/* Logo */}
          <Link
            href="/"
            className="text-[#2d5a1b] font-semibold text-[17px] italic tracking-tight shrink-0 select-none"
            style={{ fontFamily: "Georgia, serif" }}
          >
            AgriConnect
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-0 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13.5px] px-4 py-1.5 transition-colors whitespace-nowrap ${
                  pathname === link.href
                    ? "text-[#2d5a1b] font-medium"
                    : "text-[#4a5568] hover:text-[#2d5a1b]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex-1 hidden md:block" />

          {/* Right side */}
          <div className="flex items-center gap-3 shrink-0">

            {/* Cart */}
            <Link
              href="/cart"
              className="relative text-[#4a5568] hover:text-[#2d5a1b] transition-colors"
              aria-label={`Cart, ${cartCount} items`}
            >
              <ShoppingCart size={22} strokeWidth={1.8} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#2d5a1b] text-white text-[10px] font-bold w-[17px] h-[17px] rounded-full flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Sign in */}
            <Link
              href="/login"
              className="hidden sm:block text-[13.5px] text-[#4a5568] hover:text-[#2d5a1b] transition-colors px-1"
            >
              Sign in
            </Link>

            {/* Avatar — initials fallback, no broken image */}
            <Link
              href="/dashboard/customer"
              className="w-[34px] h-[34px] rounded-full bg-[#b8cfa8] ring-2 ring-[#c8d8b8] shrink-0 flex items-center justify-center text-[#2d5a1b] text-[13px] font-semibold"
            >
              M
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-1.5 text-[#4a5568] hover:text-[#2d5a1b] transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#dce4d3] bg-white/90 backdrop-blur-md px-6 py-3 flex flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-sm py-2.5 border-b border-[#e8eed8] last:border-0 transition-colors ${
                pathname === link.href
                  ? "text-[#2d5a1b] font-medium"
                  : "text-[#4a5568] hover:text-[#2d5a1b]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="text-sm py-2.5 text-[#4a5568] hover:text-[#2d5a1b] transition-colors"
          >
            Sign in
          </Link>
        </div>
      )}
    </nav>
  );
}