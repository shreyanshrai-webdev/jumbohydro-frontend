import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/axios';

const STATUS_COLORS = {
  placed: '#f5a623', confirmed: '#0a2342', processing: '#0d6efd',
  shipped: '#6f42c1', delivered: '#198754', cancelled: '#dc3545'
};

const STATUS_ICONS = {
  placed: 'clock', confirmed: 'check-circle', processing: 'gear',
  shipped: 'truck', delivered: 'bag-check', cancelled: 'x-circle'
};

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/api/orders/my').then(({ data }) => {
      setOrders(data.orders || []);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="text-center py-5">
      <div className="spinner-border" style={{ color: '#0a2342' }}></div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: '70vh' }} className="py-5">
      <div className="container">
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#0a2342', marginBottom: 32 }}>
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-bag-x" style={{ fontSize: 64, color: '#dee2e6' }}></i>
            <h4 style={{ color: '#0a2342', marginTop: 20 }}>No orders yet</h4>
            <p className="text-muted mb-4">Start shopping to see your orders here</p>
            <Link to="/products" className="btn"
              style={{ background: '#0a2342', color: '#fff', borderRadius: 12, padding: '12px 32px' }}>
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="d-flex flex-column gap-4">
            {orders.map(order => (
              <div key={order._id} className="p-4"
                style={{ background: '#fff', borderRadius: 20, border: '1px solid #e8e8e8' }}>
                {/* Order Header */}
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
                  <div>
                    <span style={{ fontSize: 13, color: '#6c757d' }}>Order ID</span>
                    <div style={{ fontWeight: 700, fontSize: 16, color: '#0a2342' }}>{order.orderId}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: 13, color: '#6c757d' }}>Placed On</span>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>
                      {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: 13, color: '#6c757d' }}>Total</span>
                    <div style={{ fontWeight: 700, fontSize: 16, color: '#0a2342' }}>
                      {order.currency === 'INR' ? '₹' : order.currency === 'USD' ? '$' : order.currency === 'EUR' ? '€' : '£'}
                      {order.totalAmount?.toFixed(2)}
                    </div>
                  </div>
                  <div className="d-flex flex-column align-items-end gap-2">
                    <span style={{
                      background: STATUS_COLORS[order.orderStatus] + '15',
                      color: STATUS_COLORS[order.orderStatus],
                      padding: '4px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600
                    }}>
                      <i className={`bi bi-${STATUS_ICONS[order.orderStatus]} me-1`}></i>
                      {order.orderStatus?.charAt(0).toUpperCase() + order.orderStatus?.slice(1)}
                    </span>
                    <span style={{
                      background: order.paymentStatus === 'paid' ? '#19875415' : '#f5a62315',
                      color: order.paymentStatus === 'paid' ? '#198754' : '#f5a623',
                      padding: '4px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600
                    }}>
                      Payment: {order.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="d-flex flex-wrap gap-3 mb-3">
                  {order.items?.map((item, i) => (
                    <div key={i} className="d-flex align-items-center gap-2"
                      style={{ background: '#f8f9fa', borderRadius: 12, padding: '8px 12px' }}>
                      <img src={item.image} alt={item.name}
                        style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 8 }} />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{item.name}</div>
                        <div style={{ fontSize: 12, color: '#6c757d' }}>× {item.quantity}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tracking info */}
                {order.trackingInfo?.trackingNumber && (
                  <div className="p-3 mb-3" style={{ background: '#e8f0f8', borderRadius: 12 }}>
                    <i className="bi bi-truck me-2" style={{ color: '#0a2342' }}></i>
                    <strong style={{ fontSize: 13 }}>Tracking: </strong>
                    <span style={{ fontSize: 13 }}>{order.trackingInfo.carrier} — {order.trackingInfo.trackingNumber}</span>
                  </div>
                )}

                <Link to={`/order-tracking/${order.orderId}`}
                  style={{ fontSize: 14, color: '#0a2342', fontWeight: 600, textDecoration: 'none' }}>
                  Track Order <i className="bi bi-arrow-right ms-1"></i>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
