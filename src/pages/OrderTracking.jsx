import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/axios';

const STEPS = ['placed', 'confirmed', 'processing', 'shipped', 'delivered'];

const STEP_LABELS = {
  placed: 'Order Placed', confirmed: 'Confirmed', processing: 'Processing',
  shipped: 'Shipped', delivered: 'Delivered'
};

const STEP_ICONS = {
  placed: 'bag-check', confirmed: 'check-circle', processing: 'gear',
  shipped: 'truck', delivered: 'house-check'
};

export default function OrderTracking() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get(`/api/orders/${id}`)
      .then(({ data }) => { setOrder(data.order); setLoading(false); })
      .catch(() => { setError('Order not found'); setLoading(false); });
  }, [id]);

  if (loading) return <div className="text-center py-5"><div className="spinner-border" style={{ color: '#0a2342' }}></div></div>;
  if (error) return <div className="text-center py-5 text-danger">{error}</div>;
  if (!order) return null;

  const currentStep = STEPS.indexOf(order.orderStatus);
  const currSymbol = order.currency === 'INR' ? '₹' : order.currency === 'USD' ? '$' : order.currency === 'EUR' ? '€' : '£';

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: '70vh' }} className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#0a2342', marginBottom: 8 }}>
              Order Tracking
            </h1>
            <p style={{ color: '#6c757d', marginBottom: 32 }}>Order ID: <strong>{order.orderId}</strong></p>

            {/* Status Stepper */}
            <div className="p-4 mb-4" style={{ background: '#fff', borderRadius: 20, border: '1px solid #e8e8e8' }}>
              <div className="d-flex justify-content-between position-relative" style={{ padding: '0 20px' }}>
                {/* Progress bar */}
                <div style={{
                  position: 'absolute', top: 24, left: '10%', right: '10%', height: 3,
                  background: '#e8e8e8', zIndex: 0
                }}>
                  <div style={{
                    width: `${(currentStep / (STEPS.length - 1)) * 100}%`,
                    height: '100%', background: '#0a2342', transition: 'width 0.5s ease'
                  }}></div>
                </div>

                {STEPS.map((step, i) => {
                  const done = i <= currentStep;
                  const cancelled = order.orderStatus === 'cancelled';
                  return (
                    <div key={step} className="d-flex flex-column align-items-center" style={{ zIndex: 1 }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: '50%',
                        background: cancelled ? '#dc3545' : done ? '#0a2342' : '#f0f4f8',
                        color: done || cancelled ? '#fff' : '#aaa',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 18, border: '3px solid #fff',
                        boxShadow: done ? '0 4px 12px rgba(10,35,66,0.2)' : 'none'
                      }}>
                        <i className={`bi bi-${cancelled ? 'x-circle' : STEP_ICONS[step]}`}></i>
                      </div>
                      <span style={{
                        fontSize: 11, fontWeight: 600, marginTop: 8, textAlign: 'center',
                        color: done ? '#0a2342' : '#aaa', maxWidth: 70
                      }}>
                        {STEP_LABELS[step]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tracking Info */}
            {order.trackingInfo?.trackingNumber && (
              <div className="p-4 mb-4" style={{ background: '#e8f0f8', borderRadius: 16 }}>
                <h6 style={{ fontWeight: 700, color: '#0a2342', marginBottom: 12 }}>
                  <i className="bi bi-truck me-2"></i>Shipping Details
                </h6>
                <div className="row g-3">
                  {order.trackingInfo.carrier && (
                    <div className="col-sm-4">
                      <div style={{ fontSize: 12, color: '#6c757d' }}>Carrier</div>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>{order.trackingInfo.carrier}</div>
                    </div>
                  )}
                  <div className="col-sm-4">
                    <div style={{ fontSize: 12, color: '#6c757d' }}>Tracking No.</div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{order.trackingInfo.trackingNumber}</div>
                  </div>
                  {order.trackingInfo.estimatedDelivery && (
                    <div className="col-sm-4">
                      <div style={{ fontSize: 12, color: '#6c757d' }}>Est. Delivery</div>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>
                        {new Date(order.trackingInfo.estimatedDelivery).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Order Details */}
            <div className="p-4" style={{ background: '#fff', borderRadius: 20, border: '1px solid #e8e8e8' }}>
              <h6 style={{ fontWeight: 700, color: '#0a2342', marginBottom: 20 }}>Order Details</h6>

              {/* Items */}
              {order.items?.map((item, i) => (
                <div key={i} className="d-flex align-items-center gap-3 mb-3 pb-3"
                  style={{ borderBottom: i < order.items.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                  <img src={item.image} alt={item.name}
                    style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 10 }} />
                  <div className="flex-grow-1">
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</div>
                    <div style={{ fontSize: 13, color: '#6c757d' }}>× {item.quantity}</div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#0a2342' }}>
                    {currSymbol}{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}

              <div className="d-flex justify-content-between pt-2">
                <strong>Total Amount</strong>
                <strong style={{ fontSize: 18, fontFamily: "'Playfair Display', serif", color: '#0a2342' }}>
                  {currSymbol}{order.totalAmount?.toFixed(2)} {order.currency}
                </strong>
              </div>

              {/* Shipping Address */}
              <div className="mt-4 pt-4" style={{ borderTop: '1px solid #f0f0f0' }}>
                <h6 style={{ fontWeight: 700, color: '#0a2342', marginBottom: 12 }}>
                  <i className="bi bi-geo-alt me-2"></i>Shipping Address
                </h6>
                <p style={{ fontSize: 14, color: '#444', lineHeight: 1.8, margin: 0 }}>
                  {order.shippingAddress?.name}<br />
                  {order.shippingAddress?.street}{order.shippingAddress?.landmark ? `, ${order.shippingAddress.landmark}` : ''}<br />
                  {order.shippingAddress?.city}, {order.shippingAddress?.state} — {order.shippingAddress?.pin}<br />
                  {order.shippingAddress?.country}<br />
                  <i className="bi bi-telephone me-1"></i>{order.shippingAddress?.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
