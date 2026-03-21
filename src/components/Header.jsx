import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../store/slices/authSlice'
import './Header.css'

function Header() {
  const [searchTerm, setSearchTerm] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const { items } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`)
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand text-white fw-bold" to="/">
            🎀 ToyShop
          </Link>
          
          <button 
            className="navbar-toggler" 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`} id="navbarNav">
            <form className="search-box ms-auto me-3 flex-grow-1" onSubmit={handleSearch} role="search">
              <input
                type="text"
                className="form-control"
                placeholder="Search toys..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search products"
              />
            </form>
            
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/products">
                  Products
                </Link>
              </li>
              
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/orders">
                      My Orders
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <button 
                      className="btn btn-outline-light dropdown-toggle ms-2"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {user?.username || 'Account'}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                      <li><Link className="dropdown-item" to="/orders">My Orders</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                    </ul>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="btn btn-outline-light ms-2" to="/login">
                    Login
                  </Link>
                </li>
              )}
              
              <li className="nav-item">
                <button 
                  className="btn btn-outline-light cart-icon position-relative ms-2"
                  onClick={() => navigate('/cart')}
                  aria-label="View cart"
                >
                  🛒 Cart
                  {cartCount > 0 && (
                    <span className="cart-badge" aria-label={`${cartCount} items in cart`}>
                      {cartCount}
                    </span>
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header