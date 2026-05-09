export default function TermsAndConditions() {
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
            Terms & Conditions
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
            Please read these Terms and Conditions carefully before using the
            jumbo hydro engineers website. By accessing or using our website,
            placing an order, or creating an account, you agree to be bound by
            these terms. If you disagree with any part of these terms, please do
            not use our website.
          </p>
        </div>

        {[
          {
            title: "1. About JUMBO HYDRO ENGINEERS",
            content: [
              {
                sub: "Company Information",
                text: "JUMBO HYDRO ENGINEERS is a professional supplier of underwater equipment and industrial marine solutions, registered and operating in Mumbai, Maharashtra, India. We supply weight belts, underwater cutting equipment, and diving gear to professionals across India and internationally.",
              },
            ],
          },
          {
            title: "2. Eligibility",
            content: [
              {
                sub: "Who Can Use Our Website",
                text: "You must be at least 18 years of age to use our website and purchase our products. By using this website, you represent and warrant that you are 18 or older and have the legal capacity to enter into a binding agreement.",
              },
              {
                sub: "Professional Use",
                text: "Our products — particularly underwater cutting equipment, exothermic torches, and cutting rods — are intended exclusively for use by trained and certified diving and marine professionals. By purchasing these products, you confirm that you are qualified and trained to use them safely. JUMBO HYDRO ENGINEERS is not responsible for any misuse of professional equipment.",
              },
            ],
          },
          {
            title: "3. Products and Pricing",
            content: [
              {
                sub: "Product Information",
                text: "We make every effort to ensure product descriptions, images, and specifications are accurate. However, we do not warrant that product descriptions are completely accurate, complete, or error-free. If a product is not as described, your sole remedy is to return it in accordance with our Refund Policy.",
              },
              {
                sub: "Pricing and Currency",
                text: "All prices are displayed in your selected currency (INR, USD, RUB, EUR, or GBP). Prices are subject to change without notice. The price charged at the time of order confirmation is the final price. For international orders, additional customs duties and taxes may apply and are the responsibility of the buyer.",
              },
              {
                sub: "Stock Availability",
                text: "We reserve the right to limit quantities of any product. If a product becomes unavailable after your order is placed, we will notify you and offer a full refund or alternative product.",
              },
            ],
          },
          {
            title: "4. Orders and Payments",
            content: [
              {
                sub: "Order Confirmation",
                text: "An order is confirmed only after successful payment processing. You will receive an email confirmation with your Order ID. We reserve the right to cancel any order for reasons including but not limited to product unavailability, pricing errors, or suspected fraud.",
              },
              {
                sub: "Payment Processing",
                text: "All payments are processed securely through Cashfree Payments, a PCI-DSS compliant payment gateway. We accept payments via credit card, debit card, net banking, UPI, and other methods supported by Cashfree. By placing an order, you authorize us to charge your selected payment method.",
              },
              {
                sub: "International Payments",
                text: "For orders in USD, EUR, or GBP, currency conversion and international transaction fees may apply as per your bank or card issuer policies. JUMBO HYDRO ENGINEERS is not responsible for such additional charges.",
              },
            ],
          },
          {
            title: "5. Shipping and Delivery",
            content: [
              {
                sub: "Delivery Responsibility",
                text: "We will make every effort to deliver your order within the estimated timeframe. However, delivery timelines are estimates and not guarantees. We are not liable for delays caused by shipping carriers, customs clearance, natural disasters, or other events beyond our control.",
              },
              {
                sub: "Risk of Loss",
                text: "Risk of loss and title for all products pass to you upon delivery to the shipping carrier. Please refer to our Shipping Policy for detailed information on delivery timelines and charges.",
              },
            ],
          },
          {
            title: "6. Intellectual Property",
            content: [
              {
                sub: "Our Content",
                text: "All content on this website including text, graphics, logos, images, product descriptions, and software is the property of JUMBO HYDRO ENGINEERS or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written permission.",
              },
            ],
          },
          {
            title: "7. Disclaimer of Warranties",
            content: [
              {
                sub: "As-Is Basis",
                text: 'Our website and products are provided on an "as-is" and "as-available" basis. JUMBO HYDRO ENGINEERS makes no warranties, express or implied, regarding the website\'s uninterrupted or error-free operation, the accuracy of content, or the fitness of products for a particular purpose beyond what is explicitly stated in product descriptions.',
              },
              {
                sub: "Professional Equipment",
                text: "Underwater cutting equipment and exothermic torches are professional industrial tools. JUMBO HYDRO ENGINEERS explicitly disclaims any liability for injury, death, property damage, or any other harm resulting from improper use, lack of training, or failure to follow safety guidelines.",
              },
            ],
          },
          {
            title: "8. Limitation of Liability",
            content: [
              {
                sub: "Maximum Liability",
                text: "To the fullest extent permitted by law, JUMBO HYDRO ENGINEERS total liability to you for any claims arising from the use of our website or products shall not exceed the amount you paid for the specific product giving rise to the claim. We are not liable for indirect, incidental, special, consequential, or punitive damages.",
              },
            ],
          },
          {
            title: "9. Governing Law",
            content: [
              {
                sub: "Jurisdiction",
                text: "These Terms and Conditions are governed by the laws of India. Any disputes arising from or related to these terms or your use of our website shall be subject to the exclusive jurisdiction of the courts located in Mumbai, Maharashtra, India. For international customers, you agree to submit to the jurisdiction of Indian courts for dispute resolution.",
              },
            ],
          },
          {
            title: "10. Changes to Terms",
            content: [
              {
                sub: "Policy Updates",
                text: "We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after any changes constitutes your acceptance of the new terms. We encourage you to review these terms periodically.",
              },
            ],
          },
          {
            title: "11. Contact Us",
            content: [
              {
                sub: "Questions About These Terms",
                text: "If you have any questions about these Terms and Conditions, please contact us at: Email: legal@jumbohydro.in | Phone: +91 99999 99999 | Address: JUMBO HYDRO ENGINEERS, Mumbai, Maharashtra, India.",
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
