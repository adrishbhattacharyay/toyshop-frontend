import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../store/slices/authSlice'
import './Header.css'

function Header() {
  const [searchTerm, setSearchTerm] = useState('')
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const { items } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) navigate(`/products?search=${encodeURIComponent(searchTerm)}`)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <header className="header">
      {/* Top bar */}
      <div className="navbar-top">
        <div className="container-fluid d-flex align-items-center gap-2">
          {/* Logo */}
          <Link className="navbar-brand-amz me-2" to="/">
            🧸 Toy<span>Shop</span>
          </Link>

          {/* Search */}
          <form className="search-form flex-grow-1" onSubmit={handleSearch}>
            <input
              type="text"
              className="search-input"
              placeholder="Search toys, games, and more..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-btn">🔍</button>
          </form>

          {/* Account */}
          <div className="d-flex align-items-center gap-1 ms-2">
            {isAuthenticated ? (
              <div className="dropdown">
                <button className="nav-link-amz dropdown-toggle" data-bs-toggle="dropdown">
                  <span className="top-line">Hello, {user?.firstName || user?.username}</span>
                  <span className="bottom-line">Account ▾</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/orders">My Orders</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Sign Out</button></li>
                </ul>
              </div>
            ) : (
              <Link className="nav-link-amz" to="/login">
                <span className="top-line">Hello, sign in</span>
                <span className="bottom-line">Account &amp; Lists ▾</span>
              </Link>
            )}

            {/* Orders */}
            <Link className="nav-link-amz hide-mobile" to="/orders">
              <span className="top-line">Returns</span>
              <span className="bottom-line">&amp; Orders</span>
            </Link>

            {/* Cart */}
            <button className="cart-btn" onClick={() => navigate('/cart')}>
              <span style={{ fontSize: '1.5rem' }}>🛒</span>
              <span className="cart-count">{cartCount}</span>
              <span className="bottom-line">Cart</span>
            </button>

            {cartCount > 0 && (
              <button
                className="btn btn-sm btn-warning fw-bold ms-1"
                style={{ borderRadius: '3px', fontSize: '0.8rem' }}
                onClick={() => navigate('/checkout')}
              >
                Checkout →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="navbar-bottom">
        <div className="container-fluid d-flex align-items-center gap-1">
          <Link className="bottom-nav-link" to="/products">☰ All</Link>
          <Link className="bottom-nav-link" to="/products?category=Action+Figures">Action Figures</Link>
          <Link className="bottom-nav-link" to="/products?category=Building+Blocks">Building Blocks</Link>
          <Link className="bottom-nav-link" to="/products?category=Vehicles">Vehicles</Link>
          <Link className="bottom-nav-link" to="/products?category=Dolls">Dolls</Link>
          <Link className="bottom-nav-link" to="/products?category=Board+Games">Board Games</Link>
          <Link className="bottom-nav-link" to="/products?category=Puzzles">Puzzles</Link>
          <Link className="bottom-nav-link" to="/products?category=Arts+and+Crafts">Arts &amp; Crafts</Link>
          {!isAuthenticated && (
            <Link className="bottom-nav-link ms-auto" to="/login" style={{ color: '#FF9900' }}>Sign In</Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
