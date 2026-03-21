import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice'
import './Cart.css'

function Cart() {
  const { items } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPayment, setShowPayment] = useState(false)

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = Math.round(subtotal * 0.18)
  const shipping = subtotal >= 500 ? 0 : 50
  const total = subtotal + tax + shipping

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }))
  }

  const handleRemove = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleCheckout = () => {
    navigate('/checkout')
  }

  if (items.length === 0) {
    return (
      <div className="empty-cart text-center py-5">
        <div className="alert alert-info">
          <h3>🛒 Your cart is empty</h3>
          <p>Add some toys to get started!</p>
          <button className="btn btn-custom btn-custom-primary" onClick={() => navigate('/products')}>
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header navbar-custom">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0 text-white">Shopping Cart ({items.length} items)</h5>
                <button 
                  className="btn btn-sm btn-outline-light"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to clear the cart?')) {
                      dispatch(clearCart())
                    }
                  }}
                >
                  Clear Cart
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex gap-3 align-items-center">
                            <img 
                              src={item.imageUrl || '/images/placeholder.svg'} 
                              alt={item.name}
                              style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                            />
                            <div>
                              <h6 className="mb-0">{item.name}</h6>
                              <small className="text-muted">{item.category}</small>
                            </div>
                          </div>
                        </td>
                        <td>₹{item.price}</td>
                        <td>
                          <div className="input-group quantity-control" style={{ width: '120px' }}>
                            <button 
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <input 
                              type="text" 
                              className="form-control text-center" 
                              value={item.quantity}
                              readOnly
                              aria-label="Quantity"
                            />
                            <button 
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>
                          <strong>₹{item.price * item.quantity}</strong>
                        </td>
                        <td>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleRemove(item.id)}
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card sticky-top" style={{ top: '100px' }}>
            <div className="card-header navbar-custom">
              <h5 className="mb-0 text-white">Order Summary</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax (18%):</span>
                <span>₹{tax}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span className={shipping === 0 ? 'text-success' : ''}>
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
              {shipping > 0 && (
                <small className="text-muted d-block text-end mb-2">
                  Free shipping on orders over ₹500
                </small>
              )}
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong className="price-tag">₹{total}</strong>
              </div>
              <button 
                className="btn btn-custom btn-custom-primary w-100 mb-2"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
              <button 
                className="btn btn-outline-secondary w-100"
                onClick={() => navigate('/products')}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart