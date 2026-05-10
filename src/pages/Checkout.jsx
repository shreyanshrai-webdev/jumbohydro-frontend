import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

// Change this to "cashfree", "payu", or "razorpay" to switch gateway
const ACTIVE_GATEWAY = "payu";

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

  // ---------- gateway handlers ----------

  const handleCashfree = (payData) => {
    if (window.Cashfree) {
      window
        .Cashfree({
          mode:
            import.meta.env.VITE_CASHFREE_ENV === "PROD"
              ? "production"
              : "sandbox",
        })
        .then((cashfree) => {
          cashfree.checkout({ paymentSessionId: payData.paymentSessionId });
        });
    } else {
      toast.success("Order placed! Complete payment.");
      navigate(`/order-tracking/${payData.orderId}`);
    }
  };

  const handlePayu = (payData) => {
    // PayU works via form POST redirect — create a hidden form and submit it
    const form = document.createElement("form");
    form.method = "POST";
    form.action = payData.payuUrl;
    Object.entries(payData.params).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });
    document.body.appendChild(form);
    form.submit();
  };

  const handleRazorpay = (payData, internalOrderId) => {
    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded. Check your index.html.");
      return;
    }
    const options = {
      key: payData.keyId,
      amount: payData.amount,
      currency: payData.currency,
      order_id: payData.razorpayOrderId,
      name: "Jumbo Hydro Engineers",
      description: "Order Payment",
      prefill: {
        name: payData.customerName,
        email: payData.customerEmail,
        contact: payData.customerPhone,
      },
      handler: async (response) => {
        // Razorpay calls this after successful payment — verify on backend
        try {
          await API.post(
            "/api/payment/verify",
            {
              orderId: payData.orderId,
              gateway: "razorpay",
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            },
            { headers: { "x-guest-id": guestId } },
          );
          clearCart();
          toast.success("Payment successful!");
          navigate(`/order-tracking/${payData.orderId}`);
        } catch {
          toast.error("Payment verification failed. Contact support.");
        }
      },
      modal: {
        ondismiss: () => toast.warn("Payment cancelled."),
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // ---------- main order handler ----------

  const handleOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Step 1: place the order
      const { data: orderData } = await API.post(
        "/api/orders",
        { shippingAddress: form, currency },
        { headers: { "x-guest-id": guestId } },
      );

      // Step 2: create payment with the active gateway
      const { data: payData } = await API.post(
        "/api/payment/create",
        { orderId: orderData.order._id, gateway: ACTIVE_GATEWAY },
        { headers: { "x-guest-id": guestId } },
      );

      // Step 3: hand off to the right gateway handler
      if (payData.type === "session") {
        handleCashfree(payData);
      } else if (payData.type === "redirect") {
        handlePayu(payData);
      } else if (payData.type === "popup") {
        handleRazorpay(payData, orderData.order._id);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  const gatewayLabel = {
    cashfree: "Cashfree",
    payu: "PayU",
    razorpay: "Razorpay",
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
                    : `Pay ${getCurrencySymbol(currency)}${total.toFixed(2)} via ${gatewayLabel[ACTIVE_GATEWAY]}`}
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
                  Secured by{" "}
                  <strong>{gatewayLabel[ACTIVE_GATEWAY]} Payments</strong>. Your
                  payment info is encrypted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
