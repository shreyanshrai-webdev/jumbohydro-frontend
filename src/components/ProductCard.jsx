import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { format } = useCurrency();
  const { user } = useAuth();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please login to add to cart");
    try {
      await addToCart(product._id);
      toast.success("Added to cart!");
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  const stars = Math.round(product.ratings?.average || 0);

  return (
    <div
      className="card h-100 border-0 shadow-sm"
      style={{
        borderRadius: 16,
        transition: "transform 0.2s, box-shadow 0.2s",
        fontFamily: "'DM Sans', sans-serif",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(10,35,66,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      <Link to={`/products/${product._id}`} style={{ textDecoration: "none" }}>
        <div style={{ height: 200, overflow: "hidden", background: "#f8f9fa" }}>
          <img
            src={
              product.image ||
              "https://via.placeholder.com/400x300?text=Product"
            }
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          />
        </div>
      </Link>

      <div
        className="card-body d-flex flex-column p-4"
        style={{ minHeight: 200 }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 1,
            color: "#0a2342",
            background: "#e8f0f8",
            padding: "2px 10px",
            borderRadius: 20,
            alignSelf: "flex-start",
            marginBottom: 10,
          }}
        >
          {product.category}
        </span>

        <Link
          to={`/products/${product._id}`}
          style={{ textDecoration: "none" }}
        >
          <h6
            style={{
              color: "#1a1a1a",
              fontWeight: 600,
              fontSize: 15,
              marginBottom: 8,
              lineHeight: 1.4,
            }}
          >
            {product.name}
          </h6>
        </Link>

        {/* Stars */}
        <div className="d-flex align-items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <i
              key={s}
              className={`bi bi-star${s <= stars ? "-fill" : ""}`}
              style={{
                fontSize: 12,
                color: s <= stars ? "#f5a623" : "#dee2e6",
              }}
            ></i>
          ))}
          <span style={{ fontSize: 12, color: "#6c757d", marginLeft: 4 }}>
            ({product.ratings?.count || 0})
          </span>
        </div>

        <div className="mt-auto d-flex justify-content-between align-items-center flex-wrap gap-2">
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 18,
              fontWeight: 700,
              color: "#0a2342",
              whiteSpace: "nowrap",
            }}
          >
            {format(product.price)}
          </span>
          <button
            onClick={handleAddToCart}
            className="btn btn-sm"
            style={{
              background: "#0a2342",
              color: "#fff",
              borderRadius: 8,
              fontSize: 13,
              whiteSpace: "nowrap",
            }}
          >
            <i className="bi bi-bag-plus me-1"></i>Add
          </button>
        </div>
      </div>
    </div>
  );
}
