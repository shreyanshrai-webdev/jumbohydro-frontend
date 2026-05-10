import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../utils/axios";
import { useAuth } from "../context/AuthContext";

// PayU redirects the user here via surl after a successful payment
// URL will contain: txnid, mihpayid, status, and other PayU params
export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const { guestId } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // "verifying" | "done" | "error"

  useEffect(() => {
    const txnid = searchParams.get("txnid"); // this is your orderId
    const mihpayid = searchParams.get("mihpayid");
    const payuStatus = searchParams.get("status");

    if (!txnid) {
      setStatus("error");
      return;
    }

    // If PayU confirmed success, update the order on your backend
    if (payuStatus === "success") {
      API.post(
        "/api/payment/verify",
        { orderId: txnid, gateway: "payu", paymentId: mihpayid },
        { headers: { "x-guest-id": guestId } },
      )
        .then(() => setStatus("done"))
        .catch(() => setStatus("error"));
    } else {
      setStatus("error");
    }
  }, []);

  const orderId = searchParams.get("txnid");

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "70vh", fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="text-center p-5" style={{ maxWidth: 480 }}>
        {status === "verifying" && (
          <>
            <div className="spinner-border text-primary mb-4" />
            <h4 style={{ color: "#0a2342" }}>Verifying your payment...</h4>
          </>
        )}

        {status === "done" && (
          <>
            <i
              className="bi bi-check-circle-fill"
              style={{ fontSize: 72, color: "#28a745" }}
            />
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#0a2342",
                marginTop: 20,
              }}
            >
              Payment Successful!
            </h2>
            <p style={{ color: "#6c757d", marginTop: 12 }}>
              Your order has been confirmed. Thank you for shopping with Jumbo
              Hydro Engineers.
            </p>
            <button
              className="btn mt-4"
              style={{
                background: "#0a2342",
                color: "#fff",
                borderRadius: 12,
                padding: "12px 32px",
                fontWeight: 600,
              }}
              onClick={() => navigate(`/order-tracking/${orderId}`)}
            >
              Track My Order
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <i
              className="bi bi-x-circle-fill"
              style={{ fontSize: 72, color: "#dc3545" }}
            />
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#0a2342",
                marginTop: 20,
              }}
            >
              Something went wrong
            </h2>
            <p style={{ color: "#6c757d", marginTop: 12 }}>
              We could not verify your payment. If money was deducted, please
              contact support with your order ID: <strong>{orderId}</strong>
            </p>
            <button
              className="btn mt-4"
              style={{
                background: "#0a2342",
                color: "#fff",
                borderRadius: 12,
                padding: "12px 32px",
                fontWeight: 600,
              }}
              onClick={() => navigate("/")}
            >
              Go Home
            </button>
          </>
        )}
      </div>
    </div>
  );
}
