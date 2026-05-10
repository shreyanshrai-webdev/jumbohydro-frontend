export default function RefundPolicy() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#0a2342", color: "#fff", padding: "60px 0" }}>
        <div className="container">
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: 42,
            }}
          >
            Refund & Cancellation Policy
          </h1>
          <p style={{ color: "#a8c4dc", marginTop: 12, fontSize: 16 }}>
            Last updated: January 1, 2026
          </p>
        </div>
      </div>

      <div className="container py-5" style={{ maxWidth: 860 }}>
        {/* Intro */}
        <div
          className="p-4 mb-4"
          style={{ background: "#e8f0f8", borderRadius: 16 }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 15,
              color: "#0a2342",
              lineHeight: 1.8,
            }}
          >
            At <strong>JUMBO HYDRO ENGINEERS</strong>, we want you to be
            completely satisfied with your purchase. If you are not satisfied
            for any reason, we are here to help. Please read our Refund and
            Cancellation Policy carefully to understand your options.
          </p>
        </div>

        {/* Quick Summary Cards */}
        <div className="row g-3 mb-5">
          {[
            {
              icon: "x-circle",
              title: "Cancellation",
              value: "Within 24 hours",
              color: "#0a2342",
            },
            {
              icon: "arrow-return-left",
              title: "Return Window",
              value: "7 Days",
              color: "#198754",
            },
            {
              icon: "cash-coin",
              title: "Refund Timeline",
              value: "5–7 Business Days",
              color: "#0d6efd",
            },
            {
              icon: "headset",
              title: "Support",
              value: "24/7 Available",
              color: "#6f42c1",
            },
          ].map(({ icon, title, value, color }) => (
            <div key={title} className="col-6 col-md-3">
              <div
                className="p-3 text-center h-100"
                style={{ background: "#f8f9fa", borderRadius: 16 }}
              >
                <i
                  className={`bi bi-${icon}`}
                  style={{ fontSize: 28, color }}
                ></i>
                <div style={{ fontSize: 13, color: "#6c757d", marginTop: 8 }}>
                  {title}
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    color: "#0a2342",
                    fontSize: 15,
                    marginTop: 4,
                  }}
                >
                  {value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {[
          {
            title: "1. Order Cancellation",
            content: [
              {
                sub: "Cancellation Before Shipment",
                text: "You may cancel your order within 24 hours of placing it, provided the order has not yet been shipped. To cancel, contact us immediately at jumbohydro@gmail.com or call +91 9565885999 with your Order ID. If the cancellation is approved, a full refund will be processed within 5–7 business days to your original payment method.",
              },
              {
                sub: "Cancellation After Shipment",
                text: "Once an order has been shipped, it cannot be cancelled. In such cases, you may initiate a return after receiving the product in accordance with our Return Policy below.",
              },
              {
                sub: "Cancellation by JUMBO HYDRO ENGINEERS",
                text: "We reserve the right to cancel any order due to product unavailability, pricing errors, suspected fraudulent activity, or inability to process payment. In such cases, you will be notified immediately and a full refund will be issued within 3–5 business days.",
              },
            ],
          },
          {
            title: "2. Return Policy",
            content: [
              {
                sub: "Return Window",
                text: "We accept returns within 7 days of delivery for domestic (India) orders and within 14 days of delivery for international orders (USA, UK, Europe). The product must be unused, in its original condition, and in the original packaging with all accessories and documentation included.",
              },
              {
                sub: "How to Initiate a Return",
                text: "To initiate a return, email us at jumbohydro@gmail.com with your Order ID and reason for return. Our team will review your request and respond within 48 hours with return instructions. Once approved, ship the product back using the instructions provided. Your refund will be processed after we receive and inspect the returned product.",
              },
              {
                sub: "Return Shipping Costs",
                text: "For returns due to our error (wrong product, damaged product, defective product), JUMBO HYDRO ENGINEERS will bear the return shipping cost. For returns due to change of mind or buyer error, the return shipping cost is the responsibility of the customer.",
              },
            ],
          },
          {
            title: "3. Non-Returnable Items",
            content: [
              {
                sub: "Items That Cannot Be Returned",
                text: "The following items are not eligible for return or refund: Products that have been used or show signs of use, Products damaged due to misuse, improper handling, or negligence, Consumable items such as cutting rods that have been partially used, Products without original packaging or missing accessories, Custom or special-order products, and Products returned after the return window has expired.",
              },
              {
                sub: "Safety Equipment Note",
                text: "For safety and hygiene reasons, underwater cutting torches, exothermic equipment, and other professional safety equipment that have been used cannot be returned under any circumstances.",
              },
            ],
          },
          {
            title: "4. Refund Process",
            content: [
              {
                sub: "Refund Timeline",
                text: "Once your return is received and inspected, we will notify you via email about the approval or rejection of your refund. If approved, refunds are processed within 5–7 business days. The time for the refund to appear in your account depends on your bank or payment provider and may take an additional 3–5 business days.",
              },
              {
                sub: "Refund Methods",
                text: "Refunds are issued to the original payment method used during purchase. Credit/Debit Card payments are refunded to the same card. Net Banking payments are refunded to the same bank account. UPI payments are refunded to the same UPI ID. International payments in USD, EUR, or GBP are refunded in the same currency to the original payment method.",
              },
              {
                sub: "Partial Refunds",
                text: "In some cases, only partial refunds may be granted: Products with obvious signs of use, Products missing accessories or documentation, and Products returned after the return window (at our discretion). The partial refund amount will be communicated to you before processing.",
              },
            ],
          },
          {
            title: "5. Damaged or Defective Products",
            content: [
              {
                sub: "Reporting Damage",
                text: "If you receive a damaged or defective product, please contact us within 48 hours of delivery at jumbohydro@gmail.com with your Order ID and clear photographs of the damage. We will arrange a replacement or full refund at no additional cost to you. Do not use a damaged product — this is especially important for cutting equipment and professional diving gear.",
              },
            ],
          },
          {
            title: "6. International Orders",
            content: [
              {
                sub: "International Return Policy",
                text: "For international orders (USA, UK, Europe, Russia), the return window is 14 days from delivery. International customers are responsible for return shipping costs unless the return is due to our error. Please note that customs duties and taxes paid during import are non-refundable. Currency fluctuations between the time of purchase and refund are not covered by JUMBO HYDRO ENGINEERS.",
              },
            ],
          },
          {
            title: "7. Contact for Refunds",
            content: [
              {
                sub: "Get Help",
                text: "For any questions about refunds, cancellations, or returns, contact us at: Email: jumbohydro@gmail.com | Phone: +91 9565885999 | Working Hours: Monday to Saturday, 9 AM to 6 PM IST. Please have your Order ID ready when contacting us for faster resolution.",
              },
            ],
          },
        ].map(({ title, content }) => (
          <div key={title} className="mb-5">
            <h4
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                color: "#0a2342",
                marginBottom: 16,
                paddingBottom: 10,
                borderBottom: "2px solid #e8f0f8",
              }}
            >
              {title}
            </h4>
            {content.map(({ sub, text }) => (
              <div key={sub} className="mb-3">
                <h6
                  style={{ fontWeight: 700, color: "#1a3d6b", marginBottom: 8 }}
                >
                  {sub}
                </h6>
                <p
                  style={{
                    color: "#444",
                    lineHeight: 1.9,
                    fontSize: 15,
                    margin: 0,
                  }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
