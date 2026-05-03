import { Link, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const NAV_ITEMS = [
  { to: "/admin", icon: "speedometer2", label: "Dashboard" },
  { to: "/admin/products", icon: "box-seam", label: "Products" },
  { to: "/admin/orders", icon: "bag", label: "Orders" },
  { to: "/admin/users", icon: "people", label: "Users" },
];

export default function AdminLayout() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (to) =>
    to === "/admin" ? pathname === "/admin" : pathname.startsWith(to);

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      {/* ── DESKTOP LAYOUT ── */}
      <div className="d-none d-lg-flex" style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <div
          style={{
            width: 240,
            background: "#0a2342",
            color: "#fff",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            position: "sticky",
            top: 0,
            height: "100vh",
          }}
        >
          {/* Logo */}
          <div
            className="p-4"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div className="d-flex align-items-center gap-2">
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
                <div
                  style={{ fontSize: 10, color: "#7eb8e8", letterSpacing: 1 }}
                >
                  ADMIN PANEL
                </div>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-grow-1 p-3">
            {NAV_ITEMS.map(({ to, icon, label }) => (
              <Link key={to} to={to} style={{ textDecoration: "none" }}>
                <div
                  className="d-flex align-items-center gap-3 px-3 py-2 mb-1"
                  style={{
                    borderRadius: 10,
                    background: isActive(to)
                      ? "rgba(255,255,255,0.15)"
                      : "transparent",
                    color: isActive(to) ? "#fff" : "#a8c4dc",
                    fontWeight: isActive(to) ? 600 : 400,
                    fontSize: 14,
                    transition: "all 0.2s",
                  }}
                >
                  <i className={`bi bi-${icon}`} style={{ fontSize: 18 }}></i>
                  {label}
                </div>
              </Link>
            ))}
          </nav>

          {/* User info */}
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

      {/* ── MOBILE LAYOUT ── */}
      <div
        className="d-lg-none"
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        {/* Mobile top bar */}
        <div
          style={{
            background: "#0a2342",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <div className="d-flex align-items-center gap-2">
            <img
              src="https://res.cloudinary.com/daighap6r/image/upload/q_auto/f_auto/v1777384895/JELOGO_rtimsm.png"
              alt="Logo"
              style={{
                width: 30,
                height: 30,
                borderRadius: 6,
                objectFit: "contain",
                background: "#fff",
              }}
            />
            <div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#fff",
                }}
              >
                Jumbohydro
              </div>
              <div style={{ fontSize: 9, color: "#7eb8e8", letterSpacing: 1 }}>
                ADMIN PANEL
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "#7eb8e8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 12,
                color: "#0a2342",
              }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <Link to="/" style={{ textDecoration: "none" }}>
              <div style={{ color: "#a8c4dc", fontSize: 12 }}>
                <i className="bi bi-house" style={{ fontSize: 18 }}></i>
              </div>
            </Link>
          </div>
        </div>

        {/* Main content — padded above bottom nav */}
        <div
          style={{
            flex: 1,
            background: "#f8f9fa",
            overflowY: "auto",
            paddingBottom: 70,
          }}
        >
          <Outlet />
        </div>

        {/* Mobile bottom navigation */}
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            background: "#0a2342",
            display: "flex",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {NAV_ITEMS.map(({ to, icon, label }) => (
            <Link key={to} to={to} style={{ textDecoration: "none", flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px 4px",
                  color: isActive(to) ? "#fff" : "#a8c4dc",
                  borderTop: isActive(to)
                    ? "2px solid #7eb8e8"
                    : "2px solid transparent",
                  transition: "all 0.2s",
                }}
              >
                <i className={`bi bi-${icon}`} style={{ fontSize: 20 }}></i>
                <span
                  style={{
                    fontSize: 10,
                    marginTop: 3,
                    fontWeight: isActive(to) ? 600 : 400,
                  }}
                >
                  {label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
