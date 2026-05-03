import { useState, useEffect } from "react";
import API from "../../utils/axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedUser, setExpandedUser] = useState(null);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    API.get("/api/admin/users").then(({ data }) => {
      setUsers(data.users || []);
      setLoading(false);
    });
  }, []);

  const toggleRole = async (id, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    try {
      const { data } = await API.put(`/api/admin/users/${id}/role`, {
        role: newRole,
      });
      setUsers((prev) => prev.map((u) => (u._id === id ? data.user : u)));
      toast.success(`User role updated to ${newRole}`);
    } catch {
      toast.error("Failed to update role");
    }
  };

  const deleteUser = async (id) => {
    if (!confirm("Delete this user? This cannot be undone.")) return;
    try {
      await API.delete(`/api/admin/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("User deleted");
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const formatAddress = (address) => {
    if (!address) return null;
    const { street, city, state, pin, country } = address;
    if (!street && !city && !state && !pin && !country) return null;
    return [street, city, state, pin, country].filter(Boolean).join(", ");
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
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: "#0a2342",
              margin: 0,
              fontSize: "clamp(20px, 5vw, 28px)",
            }}
          >
            Manage Users
          </h2>
          <span style={{ fontSize: 13, color: "#6c757d" }}>
            {users.length} users
          </span>
        </div>

        {/* ── MOBILE: user cards ── */}
        <div className="d-md-none">
          {users.map((u) => (
            <div
              key={u._id}
              className="mb-3"
              style={{
                background: "#fff",
                borderRadius: 16,
                border: "1px solid #e8e8e8",
                overflow: "hidden",
              }}
            >
              <div className="p-3">
                {/* Top row — avatar + name + role badge */}
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      background: "#e8f0f8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      color: "#0a2342",
                      fontSize: 16,
                      flexShrink: 0,
                    }}
                  >
                    {u.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-grow-1 min-width-0">
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 14,
                        color: "#1a1a1a",
                      }}
                    >
                      {u.name}
                      {u._id === currentUser?.id && (
                        <span
                          style={{
                            fontSize: 11,
                            color: "#6c757d",
                            marginLeft: 6,
                          }}
                        >
                          (you)
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#6c757d",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {u.email}
                    </div>
                  </div>
                  <span
                    style={{
                      background:
                        u.role === "admin" ? "#0a234220" : "#19875420",
                      color: u.role === "admin" ? "#0a2342" : "#198754",
                      padding: "3px 10px",
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {u.role}
                  </span>
                </div>

                {/* Info grid */}
                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <div
                      style={{
                        fontSize: 11,
                        color: "#6c757d",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        marginBottom: 2,
                      }}
                    >
                      Phone
                    </div>
                    <div style={{ fontSize: 13, color: "#333" }}>
                      {u.phone || "—"}
                    </div>
                  </div>
                  <div className="col-6">
                    <div
                      style={{
                        fontSize: 11,
                        color: "#6c757d",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        marginBottom: 2,
                      }}
                    >
                      Currency
                    </div>
                    <span
                      style={{
                        background: "#f0f4f8",
                        color: "#0a2342",
                        padding: "2px 8px",
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {u.preferredCurrency || "INR"}
                    </span>
                  </div>
                  <div className="col-6">
                    <div
                      style={{
                        fontSize: 11,
                        color: "#6c757d",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        marginBottom: 2,
                      }}
                    >
                      Joined
                    </div>
                    <div style={{ fontSize: 13, color: "#333" }}>
                      {new Date(u.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  {formatAddress(u.address) && (
                    <div className="col-12">
                      <div
                        style={{
                          fontSize: 11,
                          color: "#6c757d",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          marginBottom: 2,
                        }}
                      >
                        Address
                      </div>
                      <div style={{ fontSize: 13, color: "#333" }}>
                        {formatAddress(u.address)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                {u._id !== currentUser?.id && (
                  <div className="d-flex gap-2">
                    <button
                      onClick={() => toggleRole(u._id, u.role)}
                      className="btn btn-sm flex-grow-1"
                      style={{
                        background: "#e8f0f8",
                        color: "#0a2342",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    >
                      <i
                        className={`bi bi-${u.role === "admin" ? "person-dash" : "person-check"} me-1`}
                      ></i>
                      {u.role === "admin" ? "Remove Admin" : "Make Admin"}
                    </button>
                    <button
                      onClick={() => deleteUser(u._id)}
                      className="btn btn-sm"
                      style={{
                        background: "#fde8e8",
                        color: "#dc3545",
                        borderRadius: 8,
                        padding: "6px 14px",
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                )}
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
                    "Name",
                    "Email",
                    "Phone",
                    "Address",
                    "Currency",
                    "Role",
                    "Joined",
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
                {users.map((u) => (
                  <>
                    <tr
                      key={u._id}
                      style={{
                        borderBottom:
                          expandedUser === u._id ? "none" : "1px solid #f0f0f0",
                      }}
                    >
                      <td style={{ padding: "14px 16px" }}>
                        <div className="d-flex align-items-center gap-2">
                          <div
                            style={{
                              width: 36,
                              height: 36,
                              borderRadius: "50%",
                              background: "#e8f0f8",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 700,
                              color: "#0a2342",
                              fontSize: 14,
                              flexShrink: 0,
                            }}
                          >
                            {u.name?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600 }}>{u.name}</div>
                            {u._id === currentUser?.id && (
                              <span style={{ fontSize: 11, color: "#6c757d" }}>
                                (you)
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td style={{ color: "#555" }}>{u.email}</td>
                      <td style={{ color: "#555" }}>{u.phone || "—"}</td>
                      <td style={{ color: "#555", maxWidth: 200 }}>
                        {formatAddress(u.address) ? (
                          <div>
                            <div
                              style={{
                                fontSize: 13,
                                color: "#333",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: 180,
                              }}
                            >
                              {formatAddress(u.address)}
                            </div>
                            <button
                              onClick={() =>
                                setExpandedUser(
                                  expandedUser === u._id ? null : u._id,
                                )
                              }
                              style={{
                                fontSize: 11,
                                color: "#0a2342",
                                background: "none",
                                border: "none",
                                padding: 0,
                                cursor: "pointer",
                                textDecoration: "underline",
                              }}
                            >
                              {expandedUser === u._id ? "Hide" : "View full"}
                            </button>
                          </div>
                        ) : (
                          <span style={{ color: "#aaa" }}>—</span>
                        )}
                      </td>
                      <td>
                        <span
                          style={{
                            background: "#f0f4f8",
                            color: "#0a2342",
                            padding: "3px 10px",
                            borderRadius: 20,
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          {u.preferredCurrency || "INR"}
                        </span>
                      </td>
                      <td>
                        <span
                          style={{
                            background:
                              u.role === "admin" ? "#0a234220" : "#19875420",
                            color: u.role === "admin" ? "#0a2342" : "#198754",
                            padding: "4px 12px",
                            borderRadius: 20,
                            fontSize: 12,
                            fontWeight: 700,
                          }}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td style={{ color: "#6c757d" }}>
                        {new Date(u.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td>
                        {u._id !== currentUser?.id ? (
                          <div className="d-flex gap-2">
                            <button
                              onClick={() => toggleRole(u._id, u.role)}
                              className="btn btn-sm"
                              style={{
                                background: "#e8f0f8",
                                color: "#0a2342",
                                borderRadius: 8,
                                fontSize: 12,
                              }}
                            >
                              <i
                                className={`bi bi-${u.role === "admin" ? "person-dash" : "person-check"} me-1`}
                              ></i>
                              {u.role === "admin"
                                ? "Remove Admin"
                                : "Make Admin"}
                            </button>
                            <button
                              onClick={() => deleteUser(u._id)}
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
                        ) : (
                          <span style={{ fontSize: 12, color: "#6c757d" }}>
                            —
                          </span>
                        )}
                      </td>
                    </tr>

                    {/* Expanded address row */}
                    {expandedUser === u._id && u.address && (
                      <tr
                        key={`${u._id}-address`}
                        style={{
                          background: "#f8f9fa",
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        <td colSpan={8} style={{ padding: "12px 24px" }}>
                          <div className="d-flex gap-4 flex-wrap">
                            {["street", "city", "state", "pin", "country"].map(
                              (field) => (
                                <div key={field}>
                                  <span
                                    style={{
                                      fontSize: 11,
                                      fontWeight: 700,
                                      color: "#6c757d",
                                      textTransform: "uppercase",
                                    }}
                                  >
                                    {field}
                                  </span>
                                  <div style={{ fontSize: 13, color: "#333" }}>
                                    {u.address[field] || "—"}
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
