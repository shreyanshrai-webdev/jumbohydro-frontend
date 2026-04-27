import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../utils/axios";
import ProductCard from "../components/ProductCard";

const CATEGORIES = [
  "All",
  "Weight Belts",
  "Cutting Equipment",
  "Diving Gear",
  "Industrial",
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setCategory(cat);
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category && category !== "All") params.set("category", category);
    if (sort) params.set("sort", sort);
    API.get(`/api/products?${params}`)
      .then(({ data }) => {
        setProducts(data.products || []);
      })
      .catch(() => {
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search, category, sort]);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "80vh" }}>
      {/* Header */}
      <div style={{ background: "#0a2342", color: "#fff", padding: "48px 0" }}>
        <div className="container">
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              margin: 0,
            }}
          >
            Our Products
          </h1>
          <p style={{ color: "#a8c4dc", margin: "8px 0 0", fontSize: 16 }}>
            Professional underwater & marine equipment
          </p>
        </div>
      </div>

      <div className="container py-5">
        {/* Filters */}
        <div className="row g-3 mb-5 align-items-center">
          <div className="col-md-5">
            <div className="input-group">
              <span className="input-group-text border-end-0 bg-white">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ boxShadow: "none" }}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="d-flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className="btn btn-sm"
                  style={{
                    borderRadius: 20,
                    fontSize: 13,
                    fontWeight: 500,
                    background: category === cat ? "#0a2342" : "#f0f4f8",
                    color: category === cat ? "#fff" : "#0a2342",
                    border: "none",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{ borderRadius: 8, fontSize: 14 }}
            >
              <option value="">Sort: Default</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" style={{ color: "#0a2342" }}></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-5">
            <i
              className="bi bi-search"
              style={{ fontSize: 48, color: "#dee2e6" }}
            ></i>
            <p className="mt-3 text-muted">No products found</p>
          </div>
        ) : (
          <>
            <p style={{ fontSize: 14, color: "#6c757d", marginBottom: 24 }}>
              {products.length} product{products.length !== 1 ? "s" : ""} found
            </p>
            <div className="row g-4">
              {products.map((p) => (
                <div key={p._id} className="col-sm-6 col-lg-4">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
