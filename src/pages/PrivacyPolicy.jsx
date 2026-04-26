export default function PrivacyPolicy() {
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
            Privacy Policy
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
            At <strong>Jumbohydro India</strong>, we are committed to protecting
            your personal information and your right to privacy. This Privacy
            Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website and make purchases. Please
            read it carefully.
          </p>
        </div>

        {[
          {
            title: "1. Information We Collect",
            content: [
              {
                sub: "Personal Information You Provide",
                text: "When you register an account, place an order, or contact us, we collect: Full name, Email address, Phone number, Shipping and billing address, Payment information (processed securely via Cashfree — we do not store card details), and Preferred currency.",
              },
              {
                sub: "Information Automatically Collected",
                text: "When you visit our website, we automatically collect certain information including: Browser type and version, IP address, Pages visited and time spent, Referring URLs, and Device information. This information is used solely to improve our website experience.",
              },
            ],
          },
          {
            title: "2. How We Use Your Information",
            content: [
              {
                sub: "To Process Orders",
                text: "We use your personal information to process and fulfill your orders, send order confirmations, provide tracking information, and handle returns and refunds.",
              },
              {
                sub: "To Communicate With You",
                text: "We may use your email to send order updates, respond to your inquiries, send important account notifications, and (with your consent) send promotional offers and newsletters. You can opt out of marketing emails at any time.",
              },
              {
                sub: "To Improve Our Services",
                text: "We use aggregated, anonymized data to analyze website usage, improve our product offerings, enhance user experience, and troubleshoot technical issues.",
              },
            ],
          },
          {
            title: "3. How We Share Your Information",
            content: [
              {
                sub: "We Do Not Sell Your Data",
                text: "Jumbohydro India does not sell, trade, or rent your personal information to third parties for their marketing purposes under any circumstances.",
              },
              {
                sub: "Service Providers",
                text: "We share your information only with trusted third-party service providers who assist us in operating our website: Cashfree Payments (payment processing), Shipping carriers (for order delivery), MongoDB Atlas (secure database storage), and Railway & Vercel (secure cloud hosting). All service providers are bound by confidentiality agreements.",
              },
              {
                sub: "Legal Requirements",
                text: "We may disclose your information if required by law, court order, or government regulation, or to protect the rights, property, or safety of Jumbohydro India, our customers, or others.",
              },
            ],
          },
          {
            title: "4. Data Security",
            content: [
              {
                sub: "How We Protect Your Data",
                text: "We implement industry-standard security measures including: SSL/TLS encryption for all data transmission, Bcrypt password hashing — your password is never stored in plain text, JWT token-based authentication, Secure cloud infrastructure with access controls, and Regular security audits and updates.",
              },
              {
                sub: "Payment Security",
                text: "All payment processing is handled by Cashfree Payments, a PCI-DSS compliant payment gateway. We never store your credit card, debit card, or net banking details on our servers.",
              },
            ],
          },
          {
            title: "5. Cookies",
            content: [
              {
                sub: "What Are Cookies",
                text: "Cookies are small text files stored on your device when you visit our website. We use cookies to maintain your login session, remember your preferred currency (INR/USD/EUR/GBP), keep items in your cart, and analyze website traffic.",
              },
              {
                sub: "Managing Cookies",
                text: "You can control cookies through your browser settings. Disabling cookies may affect some website functionality such as staying logged in or retaining cart items.",
              },
            ],
          },
          {
            title: "6. Your Rights",
            content: [
              {
                sub: "Access and Control",
                text: "You have the right to: Access the personal information we hold about you, Correct inaccurate or incomplete information, Request deletion of your account and personal data, Opt out of marketing communications, and Export your data in a portable format. To exercise any of these rights, contact us at privacy@jumbohydro.in.",
              },
            ],
          },
          {
            title: "7. International Users",
            content: [
              {
                sub: "Cross-Border Data Transfer",
                text: "As we serve customers from India, USA, Europe, and the UK, your data may be processed in different countries. We ensure all cross-border data transfers comply with applicable data protection laws including GDPR for European customers and UK GDPR for British customers.",
              },
            ],
          },
          {
            title: "8. Children's Privacy",
            content: [
              {
                sub: "Age Restriction",
                text: "Our website and products are intended for professional use by adults aged 18 and above. We do not knowingly collect personal information from anyone under 18 years of age. If you believe a minor has provided us with personal information, please contact us immediately.",
              },
            ],
          },
          {
            title: "9. Changes to This Policy",
            content: [
              {
                sub: "Policy Updates",
                text: "We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated date and, where appropriate, sending you an email notification. Your continued use of our website after changes constitutes acceptance of the updated policy.",
              },
            ],
          },
          {
            title: "10. Contact Us",
            content: [
              {
                sub: "Privacy Concerns",
                text: "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at: Email: privacy@jumbohydro.in | Phone: +91 99999 99999 | Address: Jumbohydro India, Mumbai, Maharashtra, India.",
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
