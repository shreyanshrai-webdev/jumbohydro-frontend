import { useSearchParams, useNavigate } from "react-router-dom";

// PayU redirects the user here via furl after a failed/cancelled payment
export default function PaymentFailure() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderId = searchParams.get("txnid");
  const reason =
    searchParams.get("error_Message") || "Payment was not completed.";

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "70vh", fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="text-center p-5" style={{ maxWidth: 480 }}>
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
          Payment Failed
        </h2>
        <p style={{ color: "#6c757d", marginTop: 12 }}>{reason}</p>
        {orderId && (
          <p style={{ fontSize: 13, color: "#6c757d" }}>
            Order ID: <strong>{orderId}</strong>
          </p>
        )}
        <div className="d-flex gap-3 justify-content-center mt-4">
          <button
            className="btn"
            style={{
              background: "#0a2342",
              color: "#fff",
              borderRadius: 12,
              padding: "12px 28px",
              fontWeight: 600,
            }}
            onClick={() => navigate("/checkout")}
          >
            Try Again
          </button>
          <button
            className="btn btn-outline-secondary"
            style={{ borderRadius: 12, padding: "12px 28px", fontWeight: 600 }}
            onClick={() => navigate("/")}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
