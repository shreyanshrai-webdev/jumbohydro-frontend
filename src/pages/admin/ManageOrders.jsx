import { useState, useEffect } from 'react';
import API from '../../utils/axios';
import { toast } from 'react-toastify';

const STATUSES = ['placed', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
const STATUS_COLORS = {
  placed: '#f5a623', confirmed: '#0a2342', processing: '#0d6efd',
  shipped: '#6f42c1', delivered: '#198754', cancelled: '#dc3545'
};

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [tracking, setTracking] = useState({ carrier: '', trackingNumber: '', estimatedDelivery: '' });

  useEffect(() => {
    API.get('/api/orders').then(({ data }) => { setOrders(data.orders || []); setLoading(false); });
  }, []);

  const updateStatus = async (orderId, orderStatus) => {
    try {
      const { data } = await API.put(`/api/orders/${orderId}`, {
        orderStatus,
        trackingInfo: selected?._id === orderId ? tracking : undefined
      });
      setOrders(prev => prev.map(o => o._id === orderId ? data.order : o));
      toast.success('Order updated!');
    } catch { toast.error('Failed to update order'); }
  };

  const saveTracking = async (orderId) => {
    try {
      const { data } = await API.put(`/api/orders/${orderId}`, {
        orderStatus: selected?.orderStatus,
        trackingInfo: tracking
      });
      setOrders(prev => prev.map(o => o._id === orderId ? data.order : o));
      setSelected(null);
      toast.success('Tracking info saved!');
    } catch { toast.error('Failed to save tracking'); }
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border" style={{ color: '#0a2342' }}></div></div>;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="py-4">
      <div className="container-fluid px-4">
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#0a2342', marginBottom: 32 }}>
          Manage Orders
        </h2>

        <div className="table-responsive" style={{ background: '#fff', borderRadius: 20, border: '1px solid #e8e8e8', overflow: 'hidden' }}>
          <table className="table align-middle mb-0" style={{ fontSize: 14 }}>
            <thead style={{ background: '#f8f9fa' }}>
              <tr>
                {['Order ID', 'Customer', 'Items', 'Total', 'Payment', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ fontWeight: 700, color: '#0a2342', padding: '16px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map(order => {
                const sym = order.currency === 'INR' ? '₹' : order.currency === 'USD' ? '$' : order.currency === 'EUR' ? '€' : '£';
                return (
                  <>
                    <tr key={order._id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '16px', fontWeight: 700 }}>{order.orderId}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{order.user?.name}</div>
                        <div style={{ fontSize: 12, color: '#6c757d' }}>{order.user?.email}</div>
                      </td>
                      <td>{order.items?.length} item(s)</td>
                      <td style={{ fontWeight: 700 }}>{sym}{order.totalAmount?.toFixed(2)} {order.currency}</td>
                      <td>
                        <span style={{
                          background: order.paymentStatus === 'paid' ? '#19875420' : '#f5a62320',
                          color: order.paymentStatus === 'paid' ? '#198754' : '#f5a623',
                          padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600
                        }}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <select value={order.orderStatus}
                          onChange={e => updateStatus(order._id, e.target.value)}
                          className="form-select form-select-sm"
                          style={{ borderRadius: 8, fontSize: 13, minWidth: 130, color: STATUS_COLORS[order.orderStatus], fontWeight: 600 }}>
                          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td>
                        <button onClick={() => {
                          setSelected(selected?._id === order._id ? null : order);
                          setTracking(order.trackingInfo || { carrier: '', trackingNumber: '', estimatedDelivery: '' });
                        }} className="btn btn-sm"
                          style={{ background: '#e8f0f8', color: '#0a2342', borderRadius: 8, fontSize: 12 }}>
                          <i className="bi bi-truck me-1"></i>Tracking
                        </button>
                      </td>
                    </tr>
                    {selected?._id === order._id && (
                      <tr key={order._id + '-tracking'}>
                        <td colSpan={7} style={{ background: '#f8f9fa', padding: '16px 24px' }}>
                          <div className="row g-3 align-items-end">
                            <div className="col-md-3">
                              <label style={{ fontSize: 12, fontWeight: 600, marginBottom: 4, display: 'block' }}>Carrier</label>
                              <input className="form-control form-control-sm" placeholder="e.g. FedEx, DHL"
                                value={tracking.carrier} onChange={e => setTracking({ ...tracking, carrier: e.target.value })}
                                style={{ borderRadius: 8 }} />
                            </div>
                            <div className="col-md-3">
                              <label style={{ fontSize: 12, fontWeight: 600, marginBottom: 4, display: 'block' }}>Tracking Number</label>
                              <input className="form-control form-control-sm" placeholder="Tracking number"
                                value={tracking.trackingNumber} onChange={e => setTracking({ ...tracking, trackingNumber: e.target.value })}
                                style={{ borderRadius: 8 }} />
                            </div>
                            <div className="col-md-3">
                              <label style={{ fontSize: 12, fontWeight: 600, marginBottom: 4, display: 'block' }}>Est. Delivery</label>
                              <input type="date" className="form-control form-control-sm"
                                value={tracking.estimatedDelivery} onChange={e => setTracking({ ...tracking, estimatedDelivery: e.target.value })}
                                style={{ borderRadius: 8 }} />
                            </div>
                            <div className="col-md-3">
                              <button onClick={() => saveTracking(order._id)} className="btn btn-sm"
                                style={{ background: '#0a2342', color: '#fff', borderRadius: 8 }}>
                                Save Tracking
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
