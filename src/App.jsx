import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { CurrencyProvider } from "./context/CurrencyContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ProtectedRoute, AdminRoute } from "./components/ProtectedRoute";

// Public pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";

// Protected pages
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import OrderTracking from "./pages/OrderTracking";

// Admin pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageOrders from "./pages/admin/ManageOrders";
import ManageUsers from "./pages/admin/ManageUsers";

// Layout wrapper for public pages
const PublicLayout = ({ children }) => (
  <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
    <Navbar />
    <main style={{ flex: 1 }}>{children}</main>
    <Footer />
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CurrencyProvider>
          <CartProvider>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnHover
            />
            <Routes>
              {/* Public routes */}
              <Route
                path="/"
                element={
                  <PublicLayout>
                    <Home />
                  </PublicLayout>
                }
              />
              <Route
                path="/products"
                element={
                  <PublicLayout>
                    <Products />
                  </PublicLayout>
                }
              />
              <Route
                path="/products/:id"
                element={
                  <PublicLayout>
                    <ProductDetail />
                  </PublicLayout>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicLayout>
                    <Login />
                  </PublicLayout>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicLayout>
                    <Register />
                  </PublicLayout>
                }
              />
              <Route
                path="/about"
                element={
                  <PublicLayout>
                    <About />
                  </PublicLayout>
                }
              />
              <Route
                path="/contact"
                element={
                  <PublicLayout>
                    <Contact />
                  </PublicLayout>
                }
              />
              <Route
                path="/privacy-policy"
                element={
                  <PublicLayout>
                    <PrivacyPolicy />
                  </PublicLayout>
                }
              />
              <Route
                path="/terms"
                element={
                  <PublicLayout>
                    <TermsAndConditions />
                  </PublicLayout>
                }
              />
              <Route
                path="/refund-policy"
                element={
                  <PublicLayout>
                    <RefundPolicy />
                  </PublicLayout>
                }
              />
              <Route
                path="/shipping-policy"
                element={
                  <PublicLayout>
                    <ShippingPolicy />
                  </PublicLayout>
                }
              />

              {/* Protected routes */}
              <Route
                path="/cart"
                element={
                  <PublicLayout>
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  </PublicLayout>
                }
              />
              <Route
                path="/checkout"
                element={
                  <PublicLayout>
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  </PublicLayout>
                }
              />
              <Route
                path="/my-orders"
                element={
                  <PublicLayout>
                    <ProtectedRoute>
                      <MyOrders />
                    </ProtectedRoute>
                  </PublicLayout>
                }
              />
              <Route
                path="/order-tracking/:id"
                element={
                  <PublicLayout>
                    <ProtectedRoute>
                      <OrderTracking />
                    </ProtectedRoute>
                  </PublicLayout>
                }
              />

              {/* Admin routes */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminLayout />
                  </AdminRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<ManageProducts />} />
                <Route path="orders" element={<ManageOrders />} />
                <Route path="users" element={<ManageUsers />} />
              </Route>

              {/* 404 */}
              <Route
                path="*"
                element={
                  <PublicLayout>
                    <div
                      className="text-center py-5"
                      style={{
                        minHeight: "60vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <i
                        className="bi bi-exclamation-triangle"
                        style={{ fontSize: 64, color: "#dee2e6" }}
                      ></i>
                      <h2
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          color: "#0a2342",
                          marginTop: 20,
                        }}
                      >
                        Page Not Found
                      </h2>
                      <a
                        href="/"
                        className="btn mt-4"
                        style={{
                          background: "#0a2342",
                          color: "#fff",
                          borderRadius: 12,
                          padding: "12px 32px",
                        }}
                      >
                        Go Home
                      </a>
                    </div>
                  </PublicLayout>
                }
              />
            </Routes>
          </CartProvider>
        </CurrencyProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
