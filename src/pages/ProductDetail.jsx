import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../utils/axios';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { addToCart } = useCart();
  const { format, currency } = useCurrency();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/api/products/${id}`).then(({ data }) => setProduct(data.product));
    API.get(`/api/reviews/${id}`).then(({ data }) => setReviews(data.reviews || []));
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) return toast.error('Please login first');
    try { await addToCart(product._id, qty); toast.success('Added to cart!'); }
    catch { toast.error('Failed to add to cart'); }
  };

  const handleBuyNow = async () => {
    if (!user) return navigate('/login');
    await handleAddToCart();
    navigate('/cart');
  };

  const handleReview = async (e) => {
    e.preventDefault();
    if (!user) return toast.error('Please login to review');
    setSubmitting(true);
    try {
      const { data } = await API.post(`/api/reviews/${id}`, { rating, comment });
      setReviews(prev => [data.review, ...prev]);
      setComment('');
      toast.success('Review submitted!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review');
    } finally { setSubmitting(false); }
  };

  if (!product) return <div className="text-center py-5"><div className="spinner-border" style={{ color: '#0a2342' }}></div></div>;

  const price = product.price?.[currency] || product.price?.INR;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="py-5">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="mb-4">
          <span onClick={() => navigate('/products')} style={{ color: '#0a2342', cursor: 'pointer', fontSize: 14 }}>
            ← Back to Products
          </span>
        </nav>

        <div className="row g-5">
          {/* Image */}
          <div className="col-lg-6">
            <div style={{ borderRadius: 20, overflow: 'hidden', background: '#f8f9fa', height: 400 }}>
              <img src={product.image || 'https://via.placeholder.com/600x400'}
                alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          {/* Details */}
          <div className="col-lg-6">
            <span style={{
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1,
              color: '#0a2342', background: '#e8f0f8', padding: '4px 12px', borderRadius: 20
            }}>
              {product.category}
            </span>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#0a2342', marginTop: 16, fontSize: 32 }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div className="d-flex align-items-center gap-2 mb-4">
              {[1,2,3,4,5].map(s => (
                <i key={s} className={`bi bi-star${s <= Math.round(product.ratings?.average) ? '-fill' : ''}`}
                  style={{ color: '#f5a623' }}></i>
              ))}
              <span style={{ fontSize: 14, color: '#6c757d' }}>
                {product.ratings?.average?.toFixed(1) || '0.0'} ({product.ratings?.count || 0} reviews)
              </span>
            </div>

            {/* Price in all currencies */}
            <div className="mb-4">
              <div style={{ fontSize: 36, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#0a2342' }}>
                {format(product.price)}
              </div>
              <div className="d-flex gap-3 mt-2 flex-wrap">
                {['INR', 'USD', 'EUR', 'GBP'].filter(c => c !== currency).map(c => (
                  <span key={c} style={{ fontSize: 13, color: '#6c757d' }}>
                    {c}: {c === 'INR' ? '₹' : c === 'USD' ? '$' : c === 'EUR' ? '€' : '£'}{product.price?.[c]}
                  </span>
                ))}
              </div>
            </div>

            <p style={{ color: '#444', lineHeight: 1.8, marginBottom: 24 }}>{product.description}</p>

            {/* Stock */}
            <div className="mb-4">
              <span style={{ fontSize: 13, color: product.stock > 0 ? '#198754' : '#dc3545', fontWeight: 600 }}>
                <i className={`bi bi-${product.stock > 0 ? 'check-circle' : 'x-circle'} me-1`}></i>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>

            {/* Quantity */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <span style={{ fontWeight: 600, fontSize: 15 }}>Qty:</span>
              <div className="d-flex align-items-center border rounded-pill overflow-hidden">
                <button className="btn btn-sm px-3" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span className="px-3 fw-bold">{qty}</span>
                <button className="btn btn-sm px-3" onClick={() => setQty(q => Math.min(product.stock, q + 1))}>+</button>
              </div>
            </div>

            <div className="d-flex gap-3">
              <button onClick={handleAddToCart} className="btn flex-fill"
                style={{ background: '#f0f4f8', color: '#0a2342', borderRadius: 12, fontWeight: 600, padding: '14px' }}>
                <i className="bi bi-bag-plus me-2"></i>Add to Cart
              </button>
              <button onClick={handleBuyNow} className="btn flex-fill"
                style={{ background: '#0a2342', color: '#fff', borderRadius: 12, fontWeight: 600, padding: '14px' }}>
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-5 pt-5" style={{ borderTop: '1px solid #e8e8e8' }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#0a2342', marginBottom: 32 }}>
            Customer Reviews
          </h3>
          <div className="row g-5">
            <div className="col-lg-5">
              <h6 style={{ fontWeight: 700, marginBottom: 16 }}>Write a Review</h6>
              <form onSubmit={handleReview}>
                <div className="mb-3">
                  <label style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, display: 'block' }}>Rating</label>
                  <div className="d-flex gap-2">
                    {[1,2,3,4,5].map(s => (
                      <i key={s} onClick={() => setRating(s)}
                        className={`bi bi-star${s <= rating ? '-fill' : ''}`}
                        style={{ fontSize: 24, color: '#f5a623', cursor: 'pointer' }}></i>
                    ))}
                  </div>
                </div>
                <div className="mb-3">
                  <textarea className="form-control" rows={4} placeholder="Share your experience..."
                    value={comment} onChange={e => setComment(e.target.value)} required
                    style={{ borderRadius: 12, fontSize: 14, resize: 'none' }}></textarea>
                </div>
                <button type="submit" disabled={submitting} className="btn w-100"
                  style={{ background: '#0a2342', color: '#fff', borderRadius: 12, padding: '12px' }}>
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>
            <div className="col-lg-7">
              {reviews.length === 0 ? (
                <p style={{ color: '#6c757d' }}>No reviews yet. Be the first to review!</p>
              ) : (
                reviews.map(r => (
                  <div key={r._id} className="mb-4 p-4" style={{ background: '#f8f9fa', borderRadius: 16 }}>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <strong style={{ fontSize: 15 }}>{r.user?.name}</strong>
                        <div className="d-flex gap-1 mt-1">
                          {[1,2,3,4,5].map(s => (
                            <i key={s} className={`bi bi-star${s <= r.rating ? '-fill' : ''}`}
                              style={{ fontSize: 12, color: '#f5a623' }}></i>
                          ))}
                        </div>
                      </div>
                      <span style={{ fontSize: 12, color: '#6c757d' }}>
                        {new Date(r.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: 14, color: '#444', lineHeight: 1.7 }}>{r.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
