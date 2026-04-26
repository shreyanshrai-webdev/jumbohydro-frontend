import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/axios';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get('/api/products').then(({ data }) => setProducts(data.products?.slice(0, 6) || []));
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0a2342 0%, #1a3d6b 60%, #0d4a8a 100%)',
        color: '#fff', padding: '100px 0', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.06,
          backgroundImage: 'radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}></div>
        <div className="container position-relative">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <span style={{
                fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase',
                color: '#7eb8e8', display: 'block', marginBottom: 20
              }}>
                Underwater Equipment Specialists
              </span>
              <h1 style={{
                fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 58px)',
                fontWeight: 700, lineHeight: 1.15, marginBottom: 24
              }}>
                Professional Marine &<br />
                <span style={{ color: '#7eb8e8' }}>Offshore Solutions</span>
              </h1>
              <p style={{ fontSize: 17, color: '#a8c4dc', lineHeight: 1.8, marginBottom: 36, maxWidth: 480 }}>
                Trusted by marine professionals worldwide. High-quality underwater equipment for diving, salvage, and industrial applications.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/products" className="btn btn-lg"
                  style={{ background: '#fff', color: '#0a2342', fontWeight: 700, borderRadius: 12, padding: '14px 32px' }}>
                  Shop Now <i className="bi bi-arrow-right ms-2"></i>
                </Link>
                <Link to="/about" className="btn btn-lg btn-outline-light"
                  style={{ borderRadius: 12, padding: '14px 32px' }}>
                  Learn More
                </Link>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-flex justify-content-center">
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: 400, height: 400, borderRadius: '50%',
                  background: 'rgba(126,184,232,0.1)', border: '1px solid rgba(126,184,232,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <div style={{
                    width: 280, height: 280, borderRadius: '50%',
                    background: 'rgba(126,184,232,0.15)', border: '1px solid rgba(126,184,232,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <i className="bi bi-droplet-fill" style={{ fontSize: 100, color: '#7eb8e8', opacity: 0.8 }}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Currency Banner */}
      <section style={{ background: '#f0f4f8', padding: '16px 0' }}>
        <div className="container">
          <div className="d-flex flex-wrap justify-content-center align-items-center gap-4">
            <span style={{ fontSize: 13, color: '#6c757d', fontWeight: 600 }}>
              <i className="bi bi-globe me-2"></i>International Pricing Available:
            </span>
            {[['🇮🇳', 'INR ₹'], ['🇺🇸', 'USD $'], ['🇪🇺', 'EUR €'], ['🇬🇧', 'GBP £']].map(([flag, label]) => (
              <span key={label} style={{
                fontSize: 14, fontWeight: 600, color: '#0a2342',
                background: '#fff', padding: '4px 16px', borderRadius: 20,
                border: '1px solid #dee2e6'
              }}>
                {flag} {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {[
              { icon: 'shield-check', title: 'Quality Assured', desc: 'Professional-grade equipment tested for extreme underwater conditions' },
              { icon: 'truck', title: 'Global Shipping', desc: 'Fast international delivery to 50+ countries worldwide' },
              { icon: 'headset', title: '24/7 Support', desc: 'Expert technical support for marine professionals' },
              { icon: 'arrow-repeat', title: 'Easy Returns', desc: '30-day hassle-free return policy on all products' }
            ].map(({ icon, title, desc }) => (
              <div key={title} className="col-md-6 col-lg-3">
                <div className="text-center p-4">
                  <div style={{
                    width: 56, height: 56, background: '#e8f0f8', borderRadius: 16,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}>
                    <i className={`bi bi-${icon}`} style={{ fontSize: 24, color: '#0a2342' }}></i>
                  </div>
                  <h6 style={{ fontWeight: 700, color: '#0a2342', marginBottom: 8 }}>{title}</h6>
                  <p style={{ fontSize: 14, color: '#6c757d', margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-5" style={{ background: '#f8f9fa' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#0a2342' }}>
              Our Products
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#0a2342', marginTop: 8 }}>
              Featured Equipment
            </h2>
          </div>
          <div className="row g-4">
            {products.map(p => (
              <div key={p._id} className="col-sm-6 col-lg-4">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/products" className="btn btn-lg"
              style={{ background: '#0a2342', color: '#fff', borderRadius: 12, padding: '14px 40px' }}>
              View All Products <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#0a2342', color: '#fff', padding: '80px 0' }}>
        <div className="container text-center">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: 16 }}>
            Ready to Equip Your Team?
          </h2>
          <p style={{ color: '#a8c4dc', fontSize: 17, marginBottom: 36 }}>
            Contact us for bulk orders, custom requirements, or technical consultation.
          </p>
          <Link to="/contact" className="btn btn-lg"
            style={{ background: '#fff', color: '#0a2342', fontWeight: 700, borderRadius: 12, padding: '14px 36px' }}>
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
