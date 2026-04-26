import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../utils/axios';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { toast } from 'react-toastify';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', preferredCurrency: 'INR' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { CURRENCIES } = useCurrency();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post('/api/auth/register', form);
      login(data.user, data.token);
      toast.success(`Welcome to Jumbohydro, ${data.user.name}!`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: '80vh', background: '#f8f9fa' }}
      className="d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="text-center mb-4">
              <div style={{
                width: 56, height: 56, background: '#0a2342', borderRadius: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'
              }}>
                <i className="bi bi-droplet-fill text-white" style={{ fontSize: 24 }}></i>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#0a2342' }}>
                Create Account
              </h2>
              <p style={{ color: '#6c757d', fontSize: 15 }}>Join Jumbohydro India today</p>
            </div>

            <div className="p-5" style={{ background: '#fff', borderRadius: 24, boxShadow: '0 4px 32px rgba(10,35,66,0.08)' }}>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, display: 'block' }}>Full Name</label>
                    <input type="text" className="form-control" placeholder="John Doe"
                      value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      required style={{ borderRadius: 10, padding: '12px 16px', fontSize: 14 }} />
                  </div>
                  <div className="col-md-6">
                    <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, display: 'block' }}>Email Address</label>
                    <input type="email" className="form-control" placeholder="you@example.com"
                      value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      required style={{ borderRadius: 10, padding: '12px 16px', fontSize: 14 }} />
                  </div>
                  <div className="col-md-6">
                    <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, display: 'block' }}>Phone Number</label>
                    <input type="text" className="form-control" placeholder="+91 99999 99999"
                      value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                      style={{ borderRadius: 10, padding: '12px 16px', fontSize: 14 }} />
                  </div>
                  <div className="col-md-6">
                    <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, display: 'block' }}>Password</label>
                    <input type="password" className="form-control" placeholder="Min 6 characters"
                      value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                      required minLength={6} style={{ borderRadius: 10, padding: '12px 16px', fontSize: 14 }} />
                  </div>
                  <div className="col-md-6">
                    <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, display: 'block' }}>Preferred Currency</label>
                    <select className="form-select" value={form.preferredCurrency}
                      onChange={e => setForm({ ...form, preferredCurrency: e.target.value })}
                      style={{ borderRadius: 10, padding: '12px 16px', fontSize: 14 }}>
                      {CURRENCIES.map(c => (
                        <option key={c.code} value={c.code}>{c.flag} {c.code} — {c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn w-100 mt-4"
                  style={{ background: '#0a2342', color: '#fff', borderRadius: 12, padding: '14px', fontWeight: 600, fontSize: 15 }}>
                  {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : null}
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>

              <p className="text-center mt-4 mb-0" style={{ fontSize: 14, color: '#6c757d' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#0a2342', fontWeight: 600, textDecoration: 'none' }}>
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
