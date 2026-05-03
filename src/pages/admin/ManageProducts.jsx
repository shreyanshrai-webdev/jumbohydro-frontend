import { useState, useEffect } from "react";
import API from "../../utils/axios";
import { toast } from "react-toastify";

const EMPTY = {
  name: "",
  description: "",
  category: "Weight Belts",
  image: "",
  stock: 100,
  price: { INR: "", USD: "", EUR: "", GBP: "" },
};

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);

  const fetchProducts = () => {
    API.get("/api/products").then(({ data }) => {
      setProducts(data.products || []);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSeed = async () => {
    await API.post("/api/products/seed");
    toast.success("Products seeded!");
    fetchProducts();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await API.put(`/api/products/${editing}`, form);
        toast.success("Product updated!");
      } else {
        await API.post("/api/products", form);
        toast.success("Product created!");
      }
      setShowForm(false);
      setEditing(null);
      setForm(EMPTY);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  const handleEdit = (p) => {
    setForm({ ...p, price: { ...p.price } });
    setEditing(p._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await API.delete(`/api/products/${id}`);
    toast.success("Product deleted");
    fetchProducts();
  };

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border" style={{ color: "#0a2342" }}></div>
      </div>
    );

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="py-3 py-md-4"
    >
      <div className="container-fluid px-3 px-md-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: "#0a2342",
              margin: 0,
              fontSize: "clamp(20px, 5vw, 28px)",
            }}
          >
            Manage Products
          </h2>
          <div className="d-flex gap-2">
            <button
              onClick={handleSeed}
              className="btn btn-sm"
              style={{
                background: "#e8f0f8",
                color: "#0a2342",
                borderRadius: 10,
                fontSize: 13,
              }}
            >
              <i className="bi bi-download me-1"></i>
              <span className="d-none d-sm-inline">Seed Products</span>
              <span className="d-sm-none">Seed</span>
            </button>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditing(null);
                setForm(EMPTY);
              }}
              className="btn btn-sm"
              style={{
                background: "#0a2342",
                color: "#fff",
                borderRadius: 10,
                fontSize: 13,
              }}
            >
              <i className="bi bi-plus-lg me-1"></i>
              <span className="d-none d-sm-inline">Add Product</span>
              <span className="d-sm-none">Add</span>
            </button>
          </div>
        </div>

        {/* Form — fully responsive */}
        {showForm && (
          <div
            className="p-3 p-md-4 mb-4"
            style={{
              background: "#fff",
              borderRadius: 16,
              border: "1px solid #e8e8e8",
            }}
          >
            <h5
              style={{
                fontWeight: 700,
                color: "#0a2342",
                marginBottom: 20,
                fontSize: 15,
              }}
            >
              {editing ? "Edit Product" : "Add New Product"}
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12 col-md-8">
                  <label
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      marginBottom: 6,
                      display: "block",
                    }}
                  >
                    Product Name
                  </label>
                  <input
                    className="form-control"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    style={{ borderRadius: 10 }}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      marginBottom: 6,
                      display: "block",
                    }}
                  >
                    Category
                  </label>
                  <select
                    className="form-select"
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    style={{ borderRadius: 10 }}
                  >
                    {[
                      "Weight Belts",
                      "Cutting Equipment",
                      "Diving Gear",
                      "Industrial",
                    ].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
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
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    required
                    style={{ borderRadius: 10, resize: "none" }}
                  ></textarea>
                </div>
                <div className="col-12 col-md-8">
                  <label
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      marginBottom: 6,
                      display: "block",
                    }}
                  >
                    Image URL
                  </label>
                  <input
                    className="form-control"
                    value={form.image}
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.value })
                    }
                    style={{ borderRadius: 10 }}
                    placeholder="https://..."
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      marginBottom: 6,
                      display: "block",
                    }}
                  >
                    Stock
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={form.stock}
                    onChange={(e) =>
                      setForm({ ...form, stock: Number(e.target.value) })
                    }
                    required
                    style={{ borderRadius: 10 }}
                  />
                </div>

                {/* Prices — 2 columns on mobile, 4 on desktop */}
                <div className="col-12">
                  <label
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      marginBottom: 10,
                      display: "block",
                    }}
                  >
                    Prices (all 4 currencies)
                  </label>
                  <div className="row g-2">
                    {[
                      ["INR", "₹"],
                      ["USD", "$"],
                      ["EUR", "€"],
                      ["GBP", "£"],
                    ].map(([code, sym]) => (
                      <div key={code} className="col-6 col-md-3">
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={{ fontSize: 13 }}
                          >
                            {sym} {code}
                          </span>
                          <input
                            type="number"
                            className="form-control"
                            step="0.01"
                            value={form.price[code]}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                price: {
                                  ...form.price,
                                  [code]: Number(e.target.value),
                                },
                              })
                            }
                            required
                            style={{ borderRadius: "0 10px 10px 0" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="d-flex gap-2 mt-4">
                <button
                  type="submit"
                  className="btn flex-grow-1 flex-md-grow-0"
                  style={{
                    background: "#0a2342",
                    color: "#fff",
                    borderRadius: 10,
                    padding: "10px 28px",
                  }}
                >
                  {editing ? "Update Product" : "Add Product"}
                </button>
                <button
                  type="button"
                  className="btn flex-grow-1 flex-md-grow-0"
                  onClick={() => {
                    setShowForm(false);
                    setEditing(null);
                    setForm(EMPTY);
                  }}
                  style={{
                    background: "#f8f9fa",
                    color: "#0a2342",
                    borderRadius: 10,
                    padding: "10px 20px",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── MOBILE: product cards ── */}
        <div className="d-md-none">
          {products.map((p) => (
            <div
              key={p._id}
              className="mb-3 p-3"
              style={{
                background: "#fff",
                borderRadius: 16,
                border: "1px solid #e8e8e8",
              }}
            >
              <div className="d-flex gap-3 align-items-start">
                <img
                  src={p.image}
                  alt={p.name}
                  style={{
                    width: 64,
                    height: 64,
                    objectFit: "cover",
                    borderRadius: 10,
                    flexShrink: 0,
                  }}
                />
                <div className="flex-grow-1 min-width-0">
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 14,
                      color: "#1a1a1a",
                      marginBottom: 4,
                    }}
                  >
                    {p.name}
                  </div>
                  <span
                    style={{
                      background: "#e8f0f8",
                      color: "#0a2342",
                      padding: "2px 8px",
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    {p.category}
                  </span>
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    <span style={{ fontSize: 12, color: "#444" }}>
                      ₹{p.price?.INR}
                    </span>
                    <span style={{ fontSize: 12, color: "#444" }}>
                      ${p.price?.USD}
                    </span>
                    <span style={{ fontSize: 12, color: "#444" }}>
                      €{p.price?.EUR}
                    </span>
                    <span style={{ fontSize: 12, color: "#444" }}>
                      £{p.price?.GBP}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, marginTop: 4 }}>
                    Stock:{" "}
                    <span
                      style={{
                        color: p.stock > 0 ? "#198754" : "#dc3545",
                        fontWeight: 600,
                      }}
                    >
                      {p.stock}
                    </span>
                  </div>
                </div>
              </div>
              <div className="d-flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(p)}
                  className="btn btn-sm flex-grow-1"
                  style={{
                    background: "#e8f0f8",
                    color: "#0a2342",
                    borderRadius: 8,
                    fontSize: 13,
                  }}
                >
                  <i className="bi bi-pencil me-1"></i>Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="btn btn-sm flex-grow-1"
                  style={{
                    background: "#fde8e8",
                    color: "#dc3545",
                    borderRadius: 8,
                    fontSize: 13,
                  }}
                >
                  <i className="bi bi-trash me-1"></i>Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── DESKTOP: table ── */}
        <div
          className="d-none d-md-block"
          style={{
            background: "#fff",
            borderRadius: 20,
            border: "1px solid #e8e8e8",
            overflow: "hidden",
          }}
        >
          <div className="table-responsive">
            <table className="table align-middle mb-0" style={{ fontSize: 14 }}>
              <thead style={{ background: "#f8f9fa" }}>
                <tr>
                  {[
                    "Image",
                    "Name",
                    "Category",
                    "₹ INR",
                    "$ USD",
                    "€ EUR",
                    "£ GBP",
                    "Stock",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        fontWeight: 700,
                        color: "#0a2342",
                        padding: "16px",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td style={{ padding: "12px 16px" }}>
                      <img
                        src={p.image}
                        alt={p.name}
                        style={{
                          width: 48,
                          height: 48,
                          objectFit: "cover",
                          borderRadius: 8,
                        }}
                      />
                    </td>
                    <td style={{ fontWeight: 600, maxWidth: 200 }}>{p.name}</td>
                    <td>
                      <span
                        style={{
                          background: "#e8f0f8",
                          color: "#0a2342",
                          padding: "3px 10px",
                          borderRadius: 20,
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        {p.category}
                      </span>
                    </td>
                    <td>₹{p.price?.INR}</td>
                    <td>${p.price?.USD}</td>
                    <td>€{p.price?.EUR}</td>
                    <td>£{p.price?.GBP}</td>
                    <td>
                      <span
                        style={{
                          color: p.stock > 0 ? "#198754" : "#dc3545",
                          fontWeight: 600,
                        }}
                      >
                        {p.stock}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          onClick={() => handleEdit(p)}
                          className="btn btn-sm"
                          style={{
                            background: "#e8f0f8",
                            color: "#0a2342",
                            borderRadius: 8,
                          }}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="btn btn-sm"
                          style={{
                            background: "#fde8e8",
                            color: "#dc3545",
                            borderRadius: 8,
                          }}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
