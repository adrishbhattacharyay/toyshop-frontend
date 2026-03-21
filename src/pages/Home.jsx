import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../store/slices/productSlice'
import ProductCard from '../components/ProductCard'
import './Home.css'

function Home() {
  const dispatch = useDispatch()
  const { items } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProducts({ page: 0, size: 8 }))
  }, [dispatch])

  const featuredProducts = items.filter(p => p.featured).slice(0, 4)
  const newProducts = items.slice(0, 4)

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="hero-title">Welcome to ToyShop</h1>
              <p className="hero-subtitle">
                Discover amazing toys for kids of all ages. From action figures to building blocks,
                we have everything to make your little ones happy!
              </p>
              <div className="d-flex gap-3">
                <Link to="/products" className="btn btn-custom btn-custom-primary btn-lg">
                  Shop Now
                </Link>
                <Link to="/products?category=new" className="btn btn-outline-light btn-lg">
                  New Arrivals
                </Link>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <img 
                src="/images/hero-toys.svg" 
                alt="Toys collection" 
                className="hero-image img-fluid"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-3 col-6">
              <div className="feature-card text-center">
                <div className="feature-icon">🚚</div>
                <h5>Free Shipping</h5>
                <p className="text-muted mb-0">On orders over ₹500</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="feature-card text-center">
                <div className="feature-icon">🔒</div>
                <h5>Secure Payment</h5>
                <p className="text-muted mb-0">100% secure checkout</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="feature-card text-center">
                <div className="feature-icon">↩️</div>
                <h5>Easy Returns</h5>
                <p className="text-muted mb-0">30 day return policy</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="feature-card text-center">
                <div className="feature-icon">💬</div>
                <h5>24/7 Support</h5>
                <p className="text-muted mb-0">Dedicated support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="products-section py-5">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Featured Products</h2>
              <Link to="/products" className="btn btn-outline-primary">
                View All
              </Link>
            </div>
            <div className="row g-4">
              {featuredProducts.map((product) => (
                <div key={product.id} className="col-md-6 col-lg-3">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newProducts.length > 0 && (
        <section className="products-section py-5 bg-light">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>New Arrivals</h2>
              <Link to="/products?sort=newest" className="btn btn-outline-primary">
                View All
              </Link>
            </div>
            <div className="row g-4">
              {newProducts.map((product) => (
                <div key={product.id} className="col-md-6 col-lg-3">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="categories-section py-5">
        <div className="container">
          <h2 className="text-center mb-4">Shop by Category</h2>
          <div className="row g-4">
            {['Action Figures', 'Building Blocks', 'Vehicles', 'Puzzles', 'Dolls', 'Board Games'].map((category) => (
              <div key={category} className="col-md-4 col-lg-2">
                <Link 
                  to={`/products?category=${category.toLowerCase().replace(' ', '-')}`}
                  className="category-card text-center"
                >
                  <div className="category-icon">
                    {category === 'Action Figures' && '🦸'}
                    {category === 'Building Blocks' && '🧱'}
                    {category === 'Vehicles' && '🚗'}
                    {category === 'Puzzles' && '🧩'}
                    {category === 'Dolls' && '🎎'}
                    {category === 'Board Games' && '🎲'}
                  </div>
                  <h6>{category}</h6>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5">
        <div className="container text-center">
          <h2>Ready to Start Shopping?</h2>
          <p className="mb-4">Join thousands of happy customers who trust ToyShop for their toy needs.</p>
          <Link to="/register" className="btn btn-custom btn-custom-primary btn-lg">
            Create an Account
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home