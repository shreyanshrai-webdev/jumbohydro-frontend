import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const { currency, changeCurrency, CURRENCIES } = useCurrency();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{
        background: "#fff",
        borderBottom: "1px solid #e8e8e8",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div className="container">
        {/* Brand */}
        <Link
          className="navbar-brand d-flex align-items-center gap-2"
          to="/"
          style={{ textDecoration: "none" }}
        >
          <img
            src="https://res.cloudinary.com/daighap6r/image/upload/q_auto/f_auto/v1777384895/JELOGO_rtimsm.png"
            alt="Jumbohydro Logo"
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              objectFit: "contain",
            }}
          />
          <div>
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: 18,
                color: "#0a2342",
              }}
            >
              JUMBO HYDRO ENGINEERS
            </span>
            <span
              style={{
                fontSize: 11,
                color: "#6c757d",
                display: "block",
                lineHeight: 1,
                marginTop: -2,
              }}
            >
              INDIA
            </span>
          </div>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav mx-auto gap-1">
            {[
              ["/", "Home"],
              ["/products", "Products"],
              ["/about", "About"],
              ["/contact", "Contact"],
            ].map(([path, label]) => (
              <li className="nav-item" key={path}>
                <Link
                  className="nav-link px-3"
                  to={path}
                  style={{ color: "#2d2d2d", fontWeight: 500, fontSize: 15 }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-2">
            {/* Currency Selector */}
            <select
              value={currency}
              onChange={(e) => changeCurrency(e.target.value)}
              className="form-select form-select-sm"
              style={{
                width: "auto",
                fontSize: 13,
                border: "1px solid #dee2e6",
                borderRadius: 8,
              }}
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code}
                </option>
              ))}
            </select>

            {/* Cart */}
            <Link
              to="/cart"
              className="btn btn-outline-secondary btn-sm position-relative"
              style={{ borderRadius: 8 }}
            >
              <i className="bi bi-bag"></i>
              {cartCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                  style={{ background: "#0a2342", fontSize: 10 }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Admin dropdown — only visible when admin is logged in */}
            {user && (
              <div className="dropdown">
                <button
                  className="btn btn-sm dropdown-toggle d-flex align-items-center gap-2"
                  data-bs-toggle="dropdown"
                  style={{
                    background: "#0a2342",
                    color: "#fff",
                    borderRadius: 8,
                    border: "none",
                  }}
                >
                  <i className="bi bi-person-circle"></i>
                  {user.name.split(" ")[0]}
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end shadow-sm border-0"
                  style={{ borderRadius: 12 }}
                >
                  {isAdmin && (
                    <li>
                      <Link className="dropdown-item" to="/admin">
                        Admin Panel
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link className="dropdown-item" to="/my-orders">
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
