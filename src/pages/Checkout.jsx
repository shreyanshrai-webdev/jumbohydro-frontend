import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { currency, getCurrencySymbol } = useCurrency();
  const { guestId } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pin: "",
    country: "India",
  });

  const total = cartItems.reduce((sum, item) => {
    return sum + (item.product?.price?.[currency] || 0) * item.quantity;
  }, 0);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Place order — send guestId in header so backend can identify the guest
      const { data: orderData } = await API.post(
        "/api/orders",
        { shippingAddress: form, currency },
        { headers: { "x-guest-id": guestId } },
      );

      // Create Cashfree payment
      const { data: payData } = await API.post(
        "/api/payment/create",
        { orderId: orderData.order._id },
        { headers: { "x-guest-id": guestId } },
      );

      // Load Cashfree SDK and open checkout
      if (window.Cashfree) {
        const cashfree = await window.Cashfree({
          mode:
            import.meta.env.VITE_CASHFREE_ENV === "PROD"
              ? "production"
              : "sandbox",
        });
        cashfree.checkout({ paymentSessionId: payData.paymentSessionId });
      } else {
        // Fallback: redirect to order tracking
        toast.success("Order placed! Complete payment.");
        navigate(`/order-tracking/${orderData.order.orderId}`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "name", label: "Full Name", placeholder: "John Doe", col: 6 },
    { name: "phone", label: "Phone", placeholder: "+91 99999 99999", col: 6 },
    {
      name: "email",
      label: "Email",
      placeholder: "john@example.com",
      col: 12,
      type: "email",
    },
    {
      name: "street",
      label: "Street Address",
      placeholder: "123 Marine Drive",
      col: 12,
    },
    {
      name: "landmark",
      label: "Landmark (optional)",
      placeholder: "Near post office",
      col: 12,
    },
    { name: "city", label: "City", placeholder: "Mumbai", col: 4 },
    { name: "state", label: "State", placeholder: "Maharashtra", col: 4 },
    { name: "pin", label: "PIN / Postal Code", placeholder: "400001", col: 4 },
    { name: "country", label: "Country", placeholder: "India", col: 12 },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="py-5">
      <div className="container">
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: "#0a2342",
            marginBottom: 32,
          }}
        >
          Checkout
        </h1>
        <div className="row g-4">
          <div className="col-lg-7">
            <div
              className="p-4"
              style={{
                background: "#fff",
                borderRadius: 20,
                border: "1px solid #e8e8e8",
              }}
            >
              <h5
                style={{ fontWeight: 700, color: "#0a2342", marginBottom: 24 }}
              >
                Shipping Address
              </h5>
              <form onSubmit={handleOrder}>
                <div className="row g-3">
                  {fields.map((f) => (
                    <div key={f.name} className={`col-md-${f.col}`}>
                      <label
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          marginBottom: 6,
                          display: "block",
                        }}
                      >
                        {f.label}
                      </label>
                      <input
                        type={f.type || "text"}
                        name={f.name}
                        value={form[f.name]}
                        onChange={handleChange}
                        placeholder={f.placeholder}
                        required={f.name !== "landmark"}
                        className="form-control"
                        style={{ borderRadius: 10, fontSize: 14 }}
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn w-100 mt-4"
                  style={{
                    background: "#0a2342",
                    color: "#fff",
                    borderRadius: 12,
                    padding: "14px",
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  {loading
                    ? "Processing..."
                    : `Pay ${getCurrencySymbol(currency)}${total.toFixed(2)} via Cashfree`}
                </button>
              </form>
            </div>
          </div>

          <div className="col-lg-5">
            <div
              className="p-4"
              style={{ background: "#f8f9fa", borderRadius: 20 }}
            >
              <h5
                style={{ fontWeight: 700, color: "#0a2342", marginBottom: 20 }}
              >
                Order Summary
              </h5>
              {cartItems.map((item) => {
                const price = item.product?.price?.[currency] || 0;
                return (
                  <div
                    key={item.product?._id}
                    className="d-flex gap-3 mb-3 align-items-center"
                  >
                    <img
                      src={item.product?.image}
                      alt={item.product?.name}
                      style={{
                        width: 56,
                        height: 56,
                        objectFit: "cover",
                        borderRadius: 10,
                        flexShrink: 0,
                      }}
                    />
                    <div className="flex-grow-1">
                      <div style={{ fontSize: 14, fontWeight: 600 }}>
                        {item.product?.name}
                      </div>
                      <div style={{ fontSize: 13, color: "#6c757d" }}>
                        × {item.quantity}
                      </div>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>
                      {getCurrencySymbol(currency)}
                      {(price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                );
              })}
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total</strong>
                <strong
                  style={{
                    fontSize: 20,
                    fontFamily: "'Playfair Display', serif",
                    color: "#0a2342",
                  }}
                >
                  {getCurrencySymbol(currency)}
                  {total.toFixed(2)}
                </strong>
              </div>
              <div
                className="mt-4 p-3"
                style={{ background: "#e8f0f8", borderRadius: 12 }}
              >
                <p style={{ fontSize: 13, color: "#0a2342", margin: 0 }}>
                  <i className="bi bi-shield-check me-2"></i>
                  Secured by <strong>Cashfree Payments</strong>. Your payment
                  info is encrypted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
