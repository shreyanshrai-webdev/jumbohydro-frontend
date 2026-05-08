import { useState } from "react";
import { toast } from "react-toastify";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    toast.success("Message sent! We will get back to you soon.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ background: "#0a2342", color: "#fff", padding: "72px 0" }}>
        <div className="container text-center">
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: 48,
            }}
          >
            Contact Us
          </h1>
          <p style={{ color: "#a8c4dc", fontSize: 17, marginTop: 12 }}>
            Get in touch with our team for orders, support, or partnerships
          </p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5">
          {/* Info */}
          <div className="col-lg-4">
            <h4
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                color: "#0a2342",
                marginBottom: 24,
              }}
            >
              Get In Touch
            </h4>
            {[
              {
                icon: "geo-alt",
                title: "Address",
                lines: [
                  "Shop No. 6, Shreepad ",
                  "Accord CHSL, Hatkesh Block",
                  "GCC Road, Mira Road ",
                  "Mira Bhayandar, Thane District ",
                  "Maharashtra – 401107  ",
                  "Mumbai, Maharashtra, India",
                ],
              },
              {
                icon: "telephone",
                title: "Phone",
                lines: ["+91 9565885999", "+91 9565885999"],
              },
              {
                icon: "envelope",
                title: "Email",
                lines: ["jumbohydro@gmail.com", "jumbohydro@gmail.com"],
              },
              {
                icon: "clock",
                title: "Business Hours",
                lines: ["Mon–Sat: 9 AM – 6 PM IST", "Sun: Closed"],
              },
            ].map(({ icon, title, lines }) => (
              <div key={title} className="d-flex gap-3 mb-4">
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: "#e8f0f8",
                    borderRadius: 12,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i
                    className={`bi bi-${icon}`}
                    style={{ fontSize: 18, color: "#0a2342" }}
                  ></i>
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 14,
                      color: "#0a2342",
                      marginBottom: 4,
                    }}
                  >
                    {title}
                  </div>
                  {lines.map((l) => (
                    <div key={l} style={{ fontSize: 14, color: "#555" }}>
                      {l}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div
              className="mt-4 p-4"
              style={{ background: "#f8f9fa", borderRadius: 16 }}
            >
              <h6
                style={{ fontWeight: 700, color: "#0a2342", marginBottom: 12 }}
              >
                International Enquiries
              </h6>
              <p style={{ fontSize: 14, color: "#555", margin: 0 }}>
                We welcome business enquiries from USA, Europe, UK and
                worldwide. We support pricing in INR, USD, EUR & GBP.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="col-lg-8">
            <div
              className="p-5"
              style={{
                background: "#fff",
                borderRadius: 24,
                border: "1px solid #e8e8e8",
              }}
            >
              <h4
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  color: "#0a2342",
                  marginBottom: 24,
                }}
              >
                Send a Message
              </h4>
              {sent && (
                <div
                  className="alert alert-success d-flex align-items-center gap-2"
                  style={{ borderRadius: 12 }}
                >
                  <i className="bi bi-check-circle-fill"></i>
                  Your message has been sent! We'll reply within 24 hours.
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        marginBottom: 6,
                        display: "block",
                      }}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      required
                      style={{
                        borderRadius: 10,
                        padding: "12px 16px",
                        fontSize: 14,
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        marginBottom: 6,
                        display: "block",
                      }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      required
                      style={{
                        borderRadius: 10,
                        padding: "12px 16px",
                        fontSize: 14,
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        marginBottom: 6,
                        display: "block",
                      }}
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="+91 99999 99999"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      style={{
                        borderRadius: 10,
                        padding: "12px 16px",
                        fontSize: 14,
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        marginBottom: 6,
                        display: "block",
                      }}
                    >
                      Subject
                    </label>
                    <select
                      className="form-select"
                      value={form.subject}
                      onChange={(e) =>
                        setForm({ ...form, subject: e.target.value })
                      }
                      required
                      style={{
                        borderRadius: 10,
                        padding: "12px 16px",
                        fontSize: 14,
                      }}
                    >
                      <option value="">Select a subject</option>
                      <option>Product Enquiry</option>
                      <option>Bulk Order</option>
                      <option>Technical Support</option>
                      <option>International Partnership</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        marginBottom: 6,
                        display: "block",
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      rows={5}
                      placeholder="Tell us about your requirements..."
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      required
                      style={{
                        borderRadius: 10,
                        padding: "12px 16px",
                        fontSize: 14,
                        resize: "none",
                      }}
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn mt-4"
                  style={{
                    background: "#0a2342",
                    color: "#fff",
                    borderRadius: 12,
                    padding: "14px 40px",
                    fontWeight: 600,
                  }}
                >
                  Send Message <i className="bi bi-send ms-2"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
