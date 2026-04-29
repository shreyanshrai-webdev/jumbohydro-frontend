import { Link, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NAV_ITEMS = [
  { to: "/admin", icon: "speedometer2", label: "Dashboard" },
  { to: "/admin/products", icon: "box-seam", label: "Products" },
  { to: "/admin/orders", icon: "bag", label: "Orders" },
  { to: "/admin/users", icon: "people", label: "Users" },
];

export default function AdminLayout() {
  const { pathname } = useLocation();
  const { user } = useAuth();

  return (
    <div
      className="d-flex"
      style={{ minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: 240,
          background: "#0a2342",
          color: "#fff",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Logo */}
        <div
          className="p-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
        >
          <div className="d-flex align-items-center gap-2">
            {/* 👇 Replace the src below with your Cloudinary logo URL */}
            <img
              src="https://res.cloudinary.com/daighap6r/image/upload/q_auto/f_auto/v1777384895/JELOGO_rtimsm.png"
              alt="Jumbohydro Logo"
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                objectFit: "contain",
                background: "#fff",
              }}
            />
            <div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#fff",
                }}
              >
                Jumbohydro
              </div>
              <div style={{ fontSize: 10, color: "#7eb8e8", letterSpacing: 1 }}>
                ADMIN PANEL
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-grow-1 p-3">
          {NAV_ITEMS.map(({ to, icon, label }) => {
            const active =
              to === "/admin" ? pathname === "/admin" : pathname.startsWith(to);
            return (
              <Link key={to} to={to} style={{ textDecoration: "none" }}>
                <div
                  className="d-flex align-items-center gap-3 px-3 py-2 mb-1"
                  style={{
                    borderRadius: 10,
                    background: active
                      ? "rgba(255,255,255,0.15)"
                      : "transparent",
                    color: active ? "#fff" : "#a8c4dc",
                    fontWeight: active ? 600 : 400,
                    fontSize: 14,
                    transition: "all 0.2s",
                  }}
                >
                  <i className={`bi bi-${icon}`} style={{ fontSize: 18 }}></i>
                  {label}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User info + back to site */}
        <div
          className="p-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <div className="d-flex align-items-center gap-2 mb-3 px-2">
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#7eb8e8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 13,
                color: "#0a2342",
              }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>
                {user?.name}
              </div>
              <div style={{ fontSize: 11, color: "#7eb8e8" }}>
                Administrator
              </div>
            </div>
          </div>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div
              className="d-flex align-items-center gap-2 px-3 py-2"
              style={{
                color: "#a8c4dc",
                fontSize: 13,
                borderRadius: 10,
                background: "rgba(255,255,255,0.05)",
              }}
            >
              <i className="bi bi-house"></i> Back to Site
            </div>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, background: "#f8f9fa", overflow: "auto" }}>
        <Outlet />
      </div>
    </div>
  );
}
