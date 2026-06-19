"use client";

import { useState } from "react";

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

  const handlePlaceOrder = () => {
    alert("Order placed successfully! 🎉");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f7f6f2", fontFamily: "'Georgia', serif" }}>
      {/* Navbar */}
      <nav style={{
        background: "#f7f6f2", borderBottom: "1px solid #e5e2d8",
        padding: "0 2rem", display: "flex", alignItems: "center",
        height: "60px", gap: "2rem", position: "sticky", top: 0, zIndex: 10
      }}>
        <span style={{ fontStyle: "italic", fontSize: "20px", color: "#2d5a1b", fontWeight: 600, marginRight: "1rem" }}>
          AgriConnect
        </span>
        {["Home", "Marketplace", "Farmer Portal", "Admin", "My Account"].map(link => (
          <a key={link} href="#" style={{ fontSize: "14px", color: "#555", textDecoration: "none" }}>{link}</a>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ position: "relative" }}>
            <span style={{ fontSize: "22px", cursor: "pointer" }}>🛒</span>
            <span style={{
              position: "absolute", top: "-6px", right: "-8px",
              background: "#2d5a1b", color: "#fff", fontSize: "10px",
              borderRadius: "50%", width: "16px", height: "16px",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>3</span>
          </div>
          <a href="#" style={{ fontSize: "14px", color: "#555", textDecoration: "none" }}>Sign in</a>
          <div style={{
            width: "32px", height: "32px", borderRadius: "50%",
            background: "#8b6f47", display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: "14px"
          }}>M</div>
        </div>
      </nav>

      {/* Page content */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        {/* Back link */}
        <a href="#" style={{ fontSize: "14px", color: "#555", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "1rem" }}>
          ← Back to basket
        </a>

        <h1 style={{ fontSize: "42px", fontWeight: 400, marginBottom: "2rem", color: "#1a1a1a" }}>Checkout</h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "2rem", alignItems: "start" }}>
          {/* LEFT — steps */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Step 01 — Delivery address */}
            <div style={{
              background: "#fff", borderRadius: "16px",
              padding: "2rem", border: "1px solid #e8e4da"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: "#e8f5e0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px"
                }}>📍</div>
                <div>
                  <span style={{ fontSize: "11px", color: "#999", letterSpacing: "0.1em", textTransform: "uppercase" }}>Step 01</span>
                  <h2 style={{ fontSize: "22px", fontWeight: 400, margin: 0, color: "#1a1a1a" }}>Delivery address</h2>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input style={inputStyle} value={address.fullName}
                    onChange={e => setAddress({ ...address, fullName: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input style={inputStyle} value={address.phone}
                    onChange={e => setAddress({ ...address, phone: e.target.value })} />
                </div>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={labelStyle}>Street Address</label>
                <input style={{ ...inputStyle, width: "100%" }} value={address.street}
                  onChange={e => setAddress({ ...address, street: e.target.value })} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>City</label>
                  <input style={inputStyle} value={address.city}
                    onChange={e => setAddress({ ...address, city: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>ZIP</label>
                  <input style={inputStyle} value={address.zip}
                    onChange={e => setAddress({ ...address, zip: e.target.value })} />
                </div>
              </div>
            </div>

            {/* Step 02 — Delivery window */}
            <div style={{
              background: "#fff", borderRadius: "16px",
              padding: "2rem", border: "1px solid #e8e4da"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: "#e8f5e0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px"
                }}>🚚</div>
                <div>
                  <span style={{ fontSize: "11px", color: "#999", letterSpacing: "0.1em", textTransform: "uppercase" }}>Step 02</span>
                  <h2 style={{ fontSize: "22px", fontWeight: 400, margin: 0, color: "#1a1a1a" }}>Delivery window</h2>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {deliveryWindows.map((w, i) => (
                  <button key={i} onClick={() => setSelectedWindow(i)} style={{
                    padding: "14px 20px", borderRadius: "12px", fontSize: "14px", cursor: "pointer",
                    border: selectedWindow === i ? "2px solid #2d5a1b" : "1px solid #d8d4c8",
                    background: selectedWindow === i ? "#e8f5e0" : "#fff",
                    color: selectedWindow === i ? "#2d5a1b" : "#444",
                    fontWeight: selectedWindow === i ? 600 : 400,
                    transition: "all 0.15s"
                  }}>
                    {w.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 03 — Payment */}
            <div style={{
              background: "#fff", borderRadius: "16px",
              padding: "2rem", border: "1px solid #e8e4da"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: "#e8f5e0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px"
                }}>💳</div>
                <div>
                  <span style={{ fontSize: "11px", color: "#999", letterSpacing: "0.1em", textTransform: "uppercase" }}>Step 03</span>
                  <h2 style={{ fontSize: "22px", fontWeight: 400, margin: 0, color: "#1a1a1a" }}>Payment</h2>
                </div>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={labelStyle}>Card Number</label>
                <input style={{ ...inputStyle, width: "100%" }} value={payment.cardNumber}
                  onChange={e => setPayment({ ...payment, cardNumber: e.target.value })} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>Expiry</label>
                  <input style={inputStyle} value={payment.expiry}
                    onChange={e => setPayment({ ...payment, expiry: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>CVC</label>
                  <input style={inputStyle} value={payment.cvc}
                    onChange={e => setPayment({ ...payment, cvc: e.target.value })} />
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT — order summary */}
          <div style={{
            background: "#fff", borderRadius: "16px",
            padding: "2rem", border: "1px solid #e8e4da",
            position: "sticky", top: "80px"
          }}>
            <h3 style={{ fontSize: "20px", fontWeight: 400, marginBottom: "1.5rem", color: "#1a1a1a" }}>Order</h3>

            {orderItems.map((item, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between",
                fontSize: "14px", color: "#444", marginBottom: "12px"
              }}>
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            ))}

            <div style={{
              display: "flex", justifyContent: "space-between",
              fontSize: "14px", color: "#888", marginBottom: "1.5rem",
              paddingTop: "12px", borderTop: "1px solid #eee", marginTop: "4px"
            }}>
              <span>Delivery</span>
              <span>${DELIVERY_FEE.toFixed(2)}</span>
            </div>

            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: "1.5rem"
            }}>
              <span style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#888" }}>Total</span>
              <span style={{ fontSize: "32px", fontWeight: 400, color: "#1a1a1a" }}>${total.toFixed(2)}</span>
            </div>

            <button onClick={handlePlaceOrder} style={{
              width: "100%", padding: "16px", background: "#1e4d14",
              color: "#fff", border: "none", borderRadius: "50px",
              fontSize: "16px", cursor: "pointer", fontFamily: "inherit",
              transition: "background 0.15s"
            }}
              onMouseOver={e => (e.currentTarget.style.background = "#2d5a1b")}
              onMouseOut={e => (e.currentTarget.style.background = "#1e4d14")}
            >
              Place order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "11px",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#888",
  marginBottom: "6px",
  fontFamily: "sans-serif"
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  background: "#f5f3ee",
  border: "1px solid #e5e2d8",
  borderRadius: "50px",
  fontSize: "14px",
  color: "#333",
  outline: "none",
  fontFamily: "inherit",
  boxSizing: "border-box"
};