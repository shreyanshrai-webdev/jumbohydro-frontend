import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0a2342",
        color: "#cdd8e3",
        fontFamily: "'DM Sans', sans-serif",
        marginTop: "auto",
      }}
    >
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div
                style={{
                  width: 36,
                  height: 36,
                  background: "#fff",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i
                  className="bi bi-droplet-fill"
                  style={{ color: "#0a2342", fontSize: 16 }}
                ></i>
              </div>
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: 20,
                  color: "#fff",
                }}
              >
                JUMBO HYDRO ENGINEERS
              </span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#a0b4c8" }}>
              Professional underwater equipment and industrial marine solutions
              for offshore and engineering applications worldwide.
            </p>
            <div className="d-flex gap-3 mt-3">
              {["linkedin", "twitter", "facebook", "instagram"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  style={{ color: "#a0b4c8", fontSize: 18 }}
                >
                  <i className={`bi bi-${icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          <div className="col-lg-2 col-6">
            <h6 style={{ color: "#fff", fontWeight: 600, marginBottom: 16 }}>
              Quick Links
            </h6>
            {[
              ["/", "Home"],
              ["/products", "Products"],
              ["/about", "About Us"],
              ["/contact", "Contact"],
            ].map(([path, label]) => (
              <div key={path} className="mb-2">
                <Link
                  to={path}
                  style={{
                    color: "#a0b4c8",
                    textDecoration: "none",
                    fontSize: 14,
                  }}
                >
                  {label}
                </Link>
              </div>
            ))}
          </div>

          <div className="col-lg-2 col-6">
            <h6 style={{ color: "#fff", fontWeight: 600, marginBottom: 16 }}>
              Policies
            </h6>
            {[
              ["/privacy-policy", "Privacy Policy"],
              ["/terms", "Terms & Conditions"],
              ["/refund-policy", "Refund Policy"],
              ["/shipping-policy", "Shipping Policy"],
            ].map(([path, label]) => (
              <div key={path} className="mb-2">
                <Link
                  to={path}
                  style={{
                    color: "#a0b4c8",
                    textDecoration: "none",
                    fontSize: 14,
                  }}
                >
                  {label}
                </Link>
              </div>
            ))}
          </div>

          <div className="col-lg-2 col-6">
            <h6 style={{ color: "#fff", fontWeight: 600, marginBottom: 16 }}>
              Products
            </h6>
            {[
              "Weight Belts",
              "Cutting Equipment",
              "Diving Gear",
              "Industrial",
            ].map((cat) => (
              <div key={cat} className="mb-2">
                <Link
                  to={`/products?category=${cat}`}
                  style={{
                    color: "#a0b4c8",
                    textDecoration: "none",
                    fontSize: 14,
                  }}
                >
                  {cat}
                </Link>
              </div>
            ))}
          </div>

          <div className="col-lg-2">
            <h6 style={{ color: "#fff", fontWeight: 600, marginBottom: 16 }}>
              Contact
            </h6>
            <div
              className="d-flex flex-column gap-2"
              style={{ fontSize: 14, color: "#a0b4c8" }}
            >
              <div>
                <i className="bi bi-geo-alt me-2"></i>Mumbai, Maharashtra, India
              </div>
              <div>
                <i className="bi bi-envelope me-2"></i>jumbohydro@gmail.com
              </div>
              <div>
                <i className="bi bi-telephone me-2"></i>+91 9565885999
              </div>
              <div>
                <i className="bi bi-globe me-2"></i>International shipping
                available
              </div>
            </div>
          </div>
        </div>

        <hr style={{ borderColor: "#1e3a5f", margin: "32px 0 20px" }} />
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
          <p style={{ fontSize: 13, color: "#6b849a", margin: 0 }}>
            © 2026 JUMBO HYDRO ENGINEERS. All Rights Reserved.
          </p>
          <div className="d-flex flex-wrap gap-3" style={{ fontSize: 13 }}>
            {[
              ["/privacy-policy", "Privacy Policy"],
              ["/terms", "Terms"],
              ["/refund-policy", "Refunds"],
              ["/shipping-policy", "Shipping"],
            ].map(([path, label]) => (
              <Link
                key={path}
                to={path}
                style={{ color: "#6b849a", textDecoration: "none" }}
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="d-flex gap-3" style={{ fontSize: 13 }}>
            {["🇮🇳 INR", "🇺🇸 USD", "🇪🇺 EUR", "🇬🇧 GBP"].map((c) => (
              <span key={c} style={{ color: "#6b849a" }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
