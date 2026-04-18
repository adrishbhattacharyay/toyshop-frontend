import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../store/slices/productSlice'
import ProductCard from '../components/ProductCard'
import './Home.css'

const CATEGORIES = [
  { name: 'Action Figures', icon: '🦸', color: '#FF6B6B' },
  { name: 'Building Blocks', icon: '🧱', color: '#4ECDC4' },
  { name: 'Vehicles', icon: '🚗', color: '#45B7D1' },
  { name: 'Dolls', icon: '🎎', color: '#F7DC6F' },
  { name: 'Board Games', icon: '🎲', color: '#BB8FCE' },
  { name: 'Puzzles', icon: '🧩', color: '#82E0AA' },
  { name: 'Arts and Crafts', icon: '🎨', color: '#F0B27A' },
]

function Home() {
  const dispatch = useDispatch()
  const { items } = useSelector((state) => state.products)
  const { isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchProducts({ page: 0, size: 12 }))
  }, [dispatch])

  const featured = items.filter(p => p.featured).slice(0, 4)
  const newArrivals = items.slice(0, 8)

  return (
    <div className="home-page">
      {/* Promo strip */}
      <div className="promo-strip">
        🎉 Free delivery on orders over ₹500 &nbsp;|&nbsp;
        <Link to="/products">Shop Now →</Link>
      </div>

      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="container hero-content">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <span className="hero-badge">🔥 MEGA SALE — Up to 50% OFF</span>
              <h1 className="hero-title">India's Favourite<br />Toy Store</h1>
              <p className="hero-subtitle">
                Discover 1000+ toys for every age. Safe, fun, and delivered fast.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/products" className="hero-btn-primary">Shop Now</Link>
                {!isAuthenticated && (
                  <Link to="/login" className="hero-btn-secondary">Sign In</Link>
                )}
              </div>
            </div>
            <div className="col-lg-6 text-center d-none d-lg-block">
              <div style={{ fontSize: '8rem', lineHeight: 1 }}>🧸🎮🚀🎯</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-3">
        {/* Quick deal cards */}
        <div className="row g-3 mb-3">
          {[
            { icon: '⚡', title: "Today's Deals", sub: 'Up to 50% off', link: '/products' },
            { icon: '🚚', title: 'Free Delivery', sub: 'On orders ₹500+', link: '/products' },
            { icon: '↩️', title: 'Easy Returns', sub: '30-day returns', link: '/products' },
            { icon: '🔒', title: 'Secure Pay', sub: '100% safe checkout', link: '/products' },
          ].map(d => (
            <div key={d.title} className="col-6 col-md-3">
              <Link to={d.link} className="deal-card">
                <div className="deal-card-icon">{d.icon}</div>
                <div className="deal-card-title">{d.title}</div>
                <div className="deal-card-sub">{d.sub}</div>
              </Link>
            </div>
          ))}
        </div>

        {/* Shop by Category */}
        <div className="section-card mb-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="section-card-title mb-0">Shop by Category</h2>
            <Link to="/products" className="section-card-link">See all categories →</Link>
          </div>
          <div className="row g-2">
            {CATEGORIES.map(cat => (
              <div key={cat.name} className="col-4 col-md-3 col-lg-auto" style={{ flex: '1 1 120px' }}>
                <Link to={`/products?category=${encodeURIComponent(cat.name)}`} className="category-item">
                  <div className="cat-icon" style={{ background: cat.color + '22', borderRadius: 8 }}>
                    {cat.icon}
                  </div>
                  <div className="category-item-title">{cat.name}</div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        {featured.length > 0 && (
          <div className="section-card mb-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="section-card-title mb-0">⭐ Best Sellers</h2>
              <Link to="/products" className="section-card-link">See all →</Link>
            </div>
            <div className="row g-3">
              {featured.map(product => (
                <div key={product.id} className="col-6 col-md-4 col-lg-3">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New Arrivals */}
        {newArrivals.length > 0 && (
          <div className="section-card mb-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="section-card-title mb-0">🆕 New Arrivals</h2>
              <Link to="/products" className="section-card-link">See all →</Link>
            </div>
            <div className="row g-3">
              {newArrivals.map(product => (
                <div key={product.id} className="col-6 col-md-4 col-lg-3">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        {!isAuthenticated && (
          <div className="cta-section mb-3">
            <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>New to ToyShop?</h3>
            <p className="text-muted mb-3">Create an account to track orders, save wishlists, and get exclusive deals.</p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link to="/register" className="hero-btn-primary">Create Account</Link>
              <Link to="/login" className="hero-btn-secondary">Sign In</Link>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          ↑ Back to top
        </div>
        <div className="footer-links">
          <div className="container">
            <div className="row g-4">
              <div className="col-6 col-md-3 footer-col">
                <h6>Get to Know Us</h6>
                <a href="#">About ToyShop</a>
                <a href="#">Careers</a>
                <a href="#">Press Releases</a>
              </div>
              <div className="col-6 col-md-3 footer-col">
                <h6>Connect with Us</h6>
                <a href="#">Facebook</a>
                <a href="#">Twitter</a>
                <a href="#">Instagram</a>
              </div>
              <div className="col-6 col-md-3 footer-col">
                <h6>Make Money with Us</h6>
                <a href="#">Sell on ToyShop</a>
                <a href="#">Become an Affiliate</a>
              </div>
              <div className="col-6 col-md-3 footer-col">
                <h6>Let Us Help You</h6>
                <Link to="/orders">Your Orders</Link>
                <a href="#">Returns & Replacements</a>
                <a href="#">Help</a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🧸 ToyShop</div>
            <p>© 2024 ToyShop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
