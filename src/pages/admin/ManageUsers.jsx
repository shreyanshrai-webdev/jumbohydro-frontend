import { useState, useEffect } from 'react';
import API from '../../utils/axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    API.get('/api/admin/users').then(({ data }) => { setUsers(data.users || []); setLoading(false); });
  }, []);

  const toggleRole = async (id, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    try {
      const { data } = await API.put(`/api/admin/users/${id}/role`, { role: newRole });
      setUsers(prev => prev.map(u => u._id === id ? data.user : u));
      toast.success(`User role updated to ${newRole}`);
    } catch { toast.error('Failed to update role'); }
  };

  const deleteUser = async (id) => {
    if (!confirm('Delete this user? This cannot be undone.')) return;
    try {
      await API.delete(`/api/admin/users/${id}`);
      setUsers(prev => prev.filter(u => u._id !== id));
      toast.success('User deleted');
    } catch { toast.error('Failed to delete user'); }
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border" style={{ color: '#0a2342' }}></div></div>;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="py-4">
      <div className="container-fluid px-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#0a2342', margin: 0 }}>
            Manage Users
          </h2>
          <span style={{ fontSize: 14, color: '#6c757d' }}>{users.length} total users</span>
        </div>

        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #e8e8e8', overflow: 'hidden' }}>
          <div className="table-responsive">
            <table className="table align-middle mb-0" style={{ fontSize: 14 }}>
              <thead style={{ background: '#f8f9fa' }}>
                <tr>
                  {['Name', 'Email', 'Phone', 'Currency', 'Role', 'Joined', 'Actions'].map(h => (
                    <th key={h} style={{ fontWeight: 700, color: '#0a2342', padding: '16px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div className="d-flex align-items-center gap-2">
                        <div style={{
                          width: 36, height: 36, borderRadius: '50%', background: '#e8f0f8',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: 700, color: '#0a2342', fontSize: 14, flexShrink: 0
                        }}>
                          {u.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600 }}>{u.name}</div>
                          {u._id === currentUser?.id && (
                            <span style={{ fontSize: 11, color: '#6c757d' }}>(you)</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td style={{ color: '#555' }}>{u.email}</td>
                    <td style={{ color: '#555' }}>{u.phone || '—'}</td>
                    <td>
                      <span style={{
                        background: '#f0f4f8', color: '#0a2342',
                        padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600
                      }}>
                        {u.preferredCurrency || 'INR'}
                      </span>
                    </td>
                    <td>
                      <span style={{
                        background: u.role === 'admin' ? '#0a234220' : '#19875420',
                        color: u.role === 'admin' ? '#0a2342' : '#198754',
                        padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700
                      }}>
                        {u.role}
                      </span>
                    </td>
                    <td style={{ color: '#6c757d' }}>
                      {new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td>
                      {u._id !== currentUser?.id ? (
                        <div className="d-flex gap-2">
                          <button onClick={() => toggleRole(u._id, u.role)}
                            className="btn btn-sm"
                            style={{ background: '#e8f0f8', color: '#0a2342', borderRadius: 8, fontSize: 12 }}>
                            <i className={`bi bi-${u.role === 'admin' ? 'person-dash' : 'person-check'} me-1`}></i>
                            {u.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                          </button>
                          <button onClick={() => deleteUser(u._id)}
                            className="btn btn-sm"
                            style={{ background: '#fde8e8', color: '#dc3545', borderRadius: 8 }}>
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: 12, color: '#6c757d' }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
