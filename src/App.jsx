import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import store from './store'
import Header from './components/Header'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './components/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import Orders from './pages/Orders'
import OrderDetail from './pages/OrderDetail'
import './App.css'

// Simple footer for non-home pages
function SimpleFooter() {
  return (
    <footer className="footer">
      <div className="footer-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        ↑ Back to top
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>🌋 VolcanoToysForKids</div>
          <p>© 2024 VolcanoToysForKids. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<><Products /><SimpleFooter /></>} />
              <Route path="/products/:id" element={<><ProductDetail /><SimpleFooter /></>} />
              <Route path="/cart" element={<><div className="container py-4"><Cart /></div><SimpleFooter /></>} />
              <Route path="/checkout" element={<><Checkout /><SimpleFooter /></>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/orders" element={<><Orders /><SimpleFooter /></>} />
              <Route path="/orders/:id" element={<><OrderDetail /><SimpleFooter /></>} />
            </Routes>
          </main>
        </div>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </Router>
    </Provider>
  )
}

export default App
