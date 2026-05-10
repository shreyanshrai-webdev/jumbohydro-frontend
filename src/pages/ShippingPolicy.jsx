export default function ShippingPolicy() {
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
            Shipping Policy
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
            At <strong>JUMBO HYDRO ENGINEERS</strong>, we are committed to
            delivering your professional marine and underwater equipment safely
            and on time — whether you are in India or anywhere around the world.
            We ship to 50+ countries and support pricing in INR, USD, EUR, and
            GBP.
          </p>
        </div>

        {/* Shipping Summary Cards */}
        <div className="row g-3 mb-5">
          {[
            {
              flag: "🇮🇳",
              region: "India",
              time: "3–7 Business Days",
              icon: "truck",
            },
            {
              flag: "🇺🇸",
              region: "USA",
              time: "10–15 Business Days",
              icon: "airplane",
            },
            {
              flag: "🇪🇺",
              region: "Europe",
              time: "10–14 Business Days",
              icon: "airplane",
            },
            {
              flag: "🇬🇧",
              region: "UK",
              time: "10–14 Business Days",
              icon: "airplane",
            },
          ].map(({ flag, region, time, icon }) => (
            <div key={region} className="col-6 col-md-3">
              <div
                className="p-3 text-center h-100"
                style={{ background: "#f8f9fa", borderRadius: 16 }}
              >
                <div style={{ fontSize: 32 }}>{flag}</div>
                <div
                  style={{ fontWeight: 700, color: "#0a2342", marginTop: 8 }}
                >
                  {region}
                </div>
                <div style={{ fontSize: 13, color: "#6c757d", marginTop: 4 }}>
                  <i className={`bi bi-${icon} me-1`}></i>
                  {time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {[
          {
            title: "1. Order Processing Time",
            content: [
              {
                sub: "Processing Before Shipment",
                text: "All orders are processed within 1–2 business days after payment confirmation. Orders placed on weekends or public holidays will be processed on the next business day. You will receive an email with your tracking number once your order is shipped. Business days are Monday through Saturday, excluding Indian public holidays.",
              },
              {
                sub: "Order Confirmation",
                text: "After placing your order, you will receive: An order confirmation email with your Order ID immediately after payment, A shipping confirmation email with tracking details within 1–2 business days, and Delivery updates via email as your order progresses through transit.",
              },
            ],
          },
          {
            title: "2. Domestic Shipping (India)",
            content: [
              {
                sub: "Delivery Timeline",
                text: "For orders within India, standard delivery takes 3–7 business days depending on your location. Metro cities (Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Kolkata) typically receive orders within 3–5 business days. Tier 2 and Tier 3 cities and remote areas may take 5–7 business days.",
              },
              {
                sub: "Shipping Charges (India)",
                text: "Orders above ₹999: FREE shipping. Orders below ₹999: Flat ₹99 shipping charge. Shipping charges are displayed at checkout before payment confirmation.",
              },
              {
                sub: "Shipping Partners",
                text: "We ship domestically through trusted carriers including Blue Dart, Delhivery, Ekart, and India Post. The carrier is selected based on your location to ensure the fastest and most reliable delivery.",
              },
            ],
          },
          {
            title: "3. International Shipping",
            content: [
              {
                sub: "Countries We Ship To",
                text: "We ship to 50+ countries worldwide with a focus on: USA and Canada, All European Union member countries, United Kingdom, Australia and New Zealand, Middle East (UAE, Saudi Arabia, Qatar, Kuwait), Southeast Asia, and other regions. If your country is not listed at checkout, please contact us at jumbohydro@gmail.com.",
              },
              {
                sub: "International Delivery Timeline",
                text: "USA & Canada: 10–15 business days. United Kingdom: 10–14 business days. European Union: 10–14 business days. Australia & New Zealand: 12–18 business days. Middle East: 7–12 business days. Southeast Asia: 7–12 business days. These are estimated timelines and may vary due to customs clearance and local carrier conditions.",
              },
              {
                sub: "International Shipping Charges",
                text: "International shipping charges are calculated based on destination country, package weight, and dimensions. The exact shipping cost is displayed at checkout before payment. We use DHL, FedEx, and UPS for international shipments to ensure reliability and tracking.",
              },
            ],
          },
          {
            title: "4. Customs, Duties & Taxes",
            content: [
              {
                sub: "Import Duties",
                text: "For international orders, your country may impose import duties, customs taxes, or VAT on incoming goods. These charges are determined by your country's customs authority and are completely outside our control. All import duties and taxes are the sole responsibility of the customer and are not included in our product prices or shipping charges.",
              },
              {
                sub: "Professional Equipment Customs",
                text: "Please note that underwater cutting equipment, exothermic torches, and cutting rods may be subject to additional scrutiny by customs authorities in some countries due to their professional industrial nature. We provide all necessary documentation with shipments including commercial invoices, product certificates, and material safety data sheets to facilitate smooth customs clearance.",
              },
              {
                sub: "Import Regulations",
                text: "It is the customer's responsibility to ensure that the products ordered are legally permitted to be imported in their country. JUMBO HYDRO ENGINEERS is not liable for any shipments seized or refused by customs authorities. No refund will be issued for products confiscated by customs due to import restrictions in the destination country.",
              },
            ],
          },
          {
            title: "5. Order Tracking",
            content: [
              {
                sub: "How to Track Your Order",
                text: "Once your order is shipped, you will receive a tracking number via email. You can track your order by: Visiting the Track Order page on our website and entering your Order ID, or directly visiting the carrier's website and entering your tracking number. Real-time tracking updates are available for all domestic and most international shipments.",
              },
            ],
          },
          {
            title: "6. Shipping Restrictions",
            content: [
              {
                sub: "Hazardous Materials",
                text: "Certain products such as underwater cutting equipment and exothermic materials are classified as professional industrial goods and may have shipping restrictions via air freight. We comply with all IATA, IMDG, and local shipping regulations. Some products may only be shipped via sea freight for international orders, which may increase delivery time. We will notify you if this applies to your order.",
              },
              {
                sub: "Remote Areas",
                text: "Delivery to some remote or restricted areas within India and internationally may not be possible or may incur additional surcharges. If we are unable to deliver to your location, we will contact you with alternatives or issue a full refund.",
              },
            ],
          },
          {
            title: "7. Lost or Damaged Shipments",
            content: [
              {
                sub: "Lost Packages",
                text: "If your tracking shows delivered but you have not received your package, please: Wait 24 hours as packages are sometimes marked delivered before arrival, Check with neighbours or building management, Contact the shipping carrier with your tracking number, and Contact us at jumbohydro@gmail.com within 7 days of the expected delivery date. We will investigate and resolve the issue promptly.",
              },
              {
                sub: "Damaged in Transit",
                text: "If your product arrives damaged due to transit, please take photographs immediately and contact us within 48 hours at jumbohydro@gmail.com with your Order ID and photos. We will arrange a replacement or refund at no additional cost. Do not discard the original packaging as it may be required for the carrier's damage claim.",
              },
            ],
          },
          {
            title: "8. Contact for Shipping",
            content: [
              {
                sub: "Shipping Enquiries",
                text: "For any shipping-related questions, please contact us at: Email: jumbohydro@gmail.com | Phone: +91 9565885999 | Working Hours: Monday to Saturday, 9 AM to 6 PM IST. For bulk or commercial orders requiring freight shipping, please contact us directly for a custom shipping quote.",
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
