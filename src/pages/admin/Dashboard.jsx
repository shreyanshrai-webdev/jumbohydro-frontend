import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/axios';

const STATUS_COLORS = {
  placed: '#f5a623', confirmed: '#0a2342', processing: '#0d6efd',
  shipped: '#6f42c1', delivered: '#198754', cancelled: '#dc3545'
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/api/admin/dashboard').then(({ data }) => { setStats(data); setLoading(false); });
  }, []);

  if (loading) return <div className="text-center py-5"><div className="spinner-border" style={{ color: '#0a2342' }}></div></div>;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="py-4">
      <div className="container-fluid px-4">
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#0a2342', marginBottom: 32 }}>
          Admin Dashboard
        </h2>

        {/* Stats Cards */}
        <div className="row g-4 mb-4">
          {[
            { label: 'Total Users', value: stats?.totalUsers, icon: 'people', color: '#0a2342' },
            { label: 'Total Orders', value: stats?.totalOrders, icon: 'bag', color: '#0d6efd' },
            { label: 'Products', value: stats?.totalProducts, icon: 'box-seam', color: '#198754' },
            { label: 'Reviews', value: stats?.totalReviews, icon: 'star', color: '#f5a623' }
          ].map(({ label, value, icon, color }) => (
            <div key={label} className="col-sm-6 col-xl-3">
              <div className="p-4" style={{ background: '#fff', borderRadius: 20, border: '1px solid #e8e8e8' }}>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <div style={{ fontSize: 13, color: '#6c757d', marginBottom: 8 }}>{label}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color }}>
                      {value ?? '—'}
                    </div>
                  </div>
                  <div style={{
                    width: 48, height: 48, background: color + '15', borderRadius: 12,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <i className={`bi bi-${icon}`} style={{ fontSize: 22, color }}></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Revenue by Currency */}
        {stats?.revenue?.length > 0 && (
          <div className="row g-4 mb-4">
            <div className="col-12">
              <div className="p-4" style={{ background: '#fff', borderRadius: 20, border: '1px solid #e8e8e8' }}>
                <h5 style={{ fontWeight: 700, color: '#0a2342', marginBottom: 20 }}>Revenue by Currency</h5>
                <div className="d-flex flex-wrap gap-4">
                  {stats.revenue.map(r => {
                    const sym = r._id === 'INR' ? '₹' : r._id === 'USD' ? '$' : r._id === 'EUR' ? '€' : '£';
                    return (
                      <div key={r._id} className="p-3" style={{ background: '#f8f9fa', borderRadius: 14, minWidth: 140 }}>
                        <div style={{ fontSize: 13, color: '#6c757d' }}>{r._id}</div>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: '#0a2342' }}>
                          {sym}{r.total?.toFixed(2)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Orders */}
        <div className="p-4" style={{ background: '#fff', borderRadius: 20, border: '1px solid #e8e8e8' }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 style={{ fontWeight: 700, color: '#0a2342', margin: 0 }}>Recent Orders</h5>
            <Link to="/admin/orders" style={{ fontSize: 14, color: '#0a2342', fontWeight: 600, textDecoration: 'none' }}>
              View All <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>
          <div className="table-responsive">
            <table className="table align-middle" style={{ fontSize: 14 }}>
              <thead style={{ background: '#f8f9fa' }}>
                <tr>
                  <th style={{ fontWeight: 700, color: '#0a2342', padding: '12px 16px' }}>Order ID</th>
                  <th style={{ fontWeight: 700, color: '#0a2342' }}>Customer</th>
                  <th style={{ fontWeight: 700, color: '#0a2342' }}>Date</th>
                  <th style={{ fontWeight: 700, color: '#0a2342' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentOrders?.map(order => (
                  <tr key={order._id}>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{order.orderId}</td>
                    <td>{order.user?.name}<br /><span style={{ fontSize: 12, color: '#6c757d' }}>{order.user?.email}</span></td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                      <span style={{
                        background: STATUS_COLORS[order.orderStatus] + '20',
                        color: STATUS_COLORS[order.orderStatus],
                        padding: '4px 12px', borderRadius: 20, fontWeight: 600, fontSize: 12
                      }}>
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Links */}
        <div className="row g-3 mt-2">
          {[
            { to: '/admin/products', icon: 'box-seam', label: 'Manage Products' },
            { to: '/admin/orders', icon: 'bag', label: 'Manage Orders' },
            { to: '/admin/users', icon: 'people', label: 'Manage Users' }
          ].map(({ to, icon, label }) => (
            <div key={to} className="col-md-4">
              <Link to={to} style={{ textDecoration: 'none' }}>
                <div className="p-4 text-center" style={{
                  background: '#0a2342', borderRadius: 20, color: '#fff',
                  transition: 'transform 0.2s'
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                  <i className={`bi bi-${icon}`} style={{ fontSize: 28 }}></i>
                  <div style={{ fontWeight: 700, marginTop: 8 }}>{label}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
