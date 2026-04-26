import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { toast } from 'react-toastify';

export default function Cart() {
  const { cartItems, updateItem, removeItem } = useCart();
  const { format, getPrice, currency, getCurrencySymbol } = useCurrency();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => {
    const price = item.product?.price?.[currency] || 0;
    return sum + price * item.quantity;
  }, 0);

  const handleRemove = async (productId) => {
    try { await removeItem(productId); toast.info('Item removed'); }
    catch { toast.error('Failed to remove item'); }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center" style={{ fontFamily: "'DM Sans', sans-serif", minHeight: '60vh' }}>
        <i className="bi bi-bag-x" style={{ fontSize: 80, color: '#dee2e6' }}></i>
        <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#0a2342', marginTop: 24 }}>Your cart is empty</h3>
        <p className="text-muted mb-4">Add some products to get started</p>
        <Link to="/products" className="btn" style={{ background: '#0a2342', color: '#fff', borderRadius: 12, padding: '12px 32px' }}>
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="py-5">
      <div className="container">
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#0a2342', marginBottom: 32 }}>
          Shopping Cart
        </h1>
        <div className="row g-4">
          <div className="col-lg-8">
            {cartItems.map(item => {
              const price = item.product?.price?.[currency] || 0;
              return (
                <div key={item.product?._id} className="d-flex gap-4 p-4 mb-3"
                  style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8e8e8' }}>
                  <img src={item.product?.image} alt={item.product?.name}
                    style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 12, flexShrink: 0 }} />
                  <div className="flex-grow-1">
                    <h6 style={{ fontWeight: 700, color: '#0a2342', marginBottom: 4 }}>{item.product?.name}</h6>
                    <p style={{ fontSize: 13, color: '#6c757d', marginBottom: 12 }}>{item.product?.category}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center border rounded-pill overflow-hidden">
                        <button className="btn btn-sm px-3"
                          onClick={() => updateItem(item.product._id, item.quantity - 1)}>−</button>
                        <span className="px-3 fw-bold">{item.quantity}</span>
                        <button className="btn btn-sm px-3"
                          onClick={() => updateItem(item.product._id, item.quantity + 1)}>+</button>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: '#0a2342' }}>
                          {getCurrencySymbol(currency)}{(price * item.quantity).toFixed(2)}
                        </span>
                        <button onClick={() => handleRemove(item.product._id)} className="btn btn-sm"
                          style={{ color: '#dc3545', border: 'none', background: 'transparent' }}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="col-lg-4">
            <div className="p-4" style={{ background: '#f8f9fa', borderRadius: 20 }}>
              <h5 style={{ fontWeight: 700, color: '#0a2342', marginBottom: 24 }}>Order Summary</h5>
              {cartItems.map(item => {
                const price = item.product?.price?.[currency] || 0;
                return (
                  <div key={item.product?._id} className="d-flex justify-content-between mb-2">
                    <span style={{ fontSize: 14, color: '#444' }}>{item.product?.name} × {item.quantity}</span>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>
                      {getCurrencySymbol(currency)}{(price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                );
              })}
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong style={{ fontSize: 16 }}>Total</strong>
                <strong style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", color: '#0a2342' }}>
                  {getCurrencySymbol(currency)}{total.toFixed(2)}
                </strong>
              </div>
              <button onClick={() => navigate('/checkout')} className="btn w-100"
                style={{ background: '#0a2342', color: '#fff', borderRadius: 12, padding: '14px', fontWeight: 600 }}>
                Proceed to Checkout
              </button>
              <Link to="/products" className="btn w-100 mt-2"
                style={{ background: 'transparent', color: '#0a2342', borderRadius: 12, padding: '12px', fontSize: 14 }}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
