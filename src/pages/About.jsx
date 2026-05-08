export default function About() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Hero */}
      <div style={{ background: "#0a2342", color: "#fff", padding: "72px 0" }}>
        <div className="container text-center">
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#7eb8e8",
            }}
          >
            Who We Are
          </span>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: 48,
              marginTop: 12,
            }}
          >
            About JUMBO HYDRO ENGINEERS
          </h1>
          <p
            style={{
              color: "#a8c4dc",
              fontSize: 18,
              maxWidth: 600,
              margin: "16px auto 0",
            }}
          >
            A trusted name in underwater equipment and marine engineering
            solutions since inception.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: "#0a2342",
                }}
              >
                Our Mission
              </span>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  color: "#0a2342",
                  marginTop: 12,
                }}
              >
                Equipping Professionals Worldwide
              </h2>
              <p
                style={{
                  color: "#555",
                  lineHeight: 1.9,
                  fontSize: 16,
                  marginTop: 16,
                }}
              >
                At JUMBO HYDRO ENGINEERS, we are dedicated to providing
                high-quality underwater equipment and industrial marine
                solutions to professionals across the globe. From recreational
                divers to offshore construction teams, our products are designed
                to perform in the most demanding underwater conditions.
              </p>
              <p style={{ color: "#555", lineHeight: 1.9, fontSize: 16 }}>
                We supply weight belts, cutting torches, and specialized diving
                gear to clients in India, USA, Europe, and beyond — with pricing
                in INR, USD, EUR, RUB and GBP for seamless international
                commerce.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="row g-3">
                {[
                  { icon: "globe", num: "50+", label: "Countries Served" },
                  { icon: "people", num: "5000+", label: "Happy Clients" },
                  { icon: "box-seam", num: "10K+", label: "Orders Delivered" },
                  { icon: "award", num: "100%", label: "Quality Assured" },
                ].map(({ icon, num, label }) => (
                  <div key={label} className="col-6">
                    <div
                      className="p-4 text-center"
                      style={{ background: "#f8f9fa", borderRadius: 20 }}
                    >
                      <i
                        className={`bi bi-${icon}`}
                        style={{ fontSize: 32, color: "#0a2342" }}
                      ></i>
                      <div
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: 32,
                          fontWeight: 700,
                          color: "#0a2342",
                          marginTop: 8,
                        }}
                      >
                        {num}
                      </div>
                      <div style={{ fontSize: 13, color: "#6c757d" }}>
                        {label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-5" style={{ background: "#f8f9fa" }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                color: "#0a2342",
              }}
            >
              Our Values
            </h2>
          </div>
          <div className="row g-4">
            {[
              {
                icon: "shield-check",
                title: "Quality First",
                desc: "Every product meets rigorous quality standards before reaching our customers.",
              },
              {
                icon: "globe2",
                title: "Global Reach",
                desc: "We serve clients across 50+ countries with multi-currency support.",
              },
              {
                icon: "lightbulb",
                title: "Innovation",
                desc: "Continuously sourcing the latest equipment from top manufacturers worldwide.",
              },
              {
                icon: "handshake",
                title: "Trust",
                desc: "Built on years of reliable supply and honest business practices.",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="col-md-6 col-lg-3">
                <div
                  className="p-4 h-100 text-center"
                  style={{ background: "#fff", borderRadius: 20 }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      background: "#e8f0f8",
                      borderRadius: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                    }}
                  >
                    <i
                      className={`bi bi-${icon}`}
                      style={{ fontSize: 28, color: "#0a2342" }}
                    ></i>
                  </div>
                  <h5 style={{ fontWeight: 700, color: "#0a2342" }}>{title}</h5>
                  <p style={{ fontSize: 14, color: "#6c757d", margin: 0 }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* International Currencies */}
      <section className="py-5">
        <div className="container text-center">
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: "#0a2342",
              marginBottom: 16,
            }}
          >
            Serving Customers Globally
          </h2>
          <p style={{ color: "#6c757d", marginBottom: 40 }}>
            We accept payments in 5 major world currencies
          </p>
          <div className="row justify-content-center g-3">
            {[
              { flag: "🇮🇳", currency: "INR ₹", country: "India" },
              { flag: "RU", currency: "RUB ₽", country: "Russia" },
              { flag: "🇺🇸", currency: "USD $", country: "United States" },
              { flag: "🇪🇺", currency: "EUR €", country: "Europe" },
              { flag: "🇬🇧", currency: "GBP £", country: "United Kingdom" },
            ].map(({ flag, currency, country }) => (
              <div key={currency} className="col-6 col-md-3">
                <div
                  className="p-4"
                  style={{ background: "#f8f9fa", borderRadius: 20 }}
                >
                  <div style={{ fontSize: 40 }}>{flag}</div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 18,
                      color: "#0a2342",
                      marginTop: 8,
                    }}
                  >
                    {currency}
                  </div>
                  <div style={{ fontSize: 13, color: "#6c757d" }}>
                    {country}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
