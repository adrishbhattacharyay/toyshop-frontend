import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../store/slices/orderSlice'
import { clearCart } from '../store/slices/cartSlice'
import './Checkout.css'

function Checkout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items } = useSelector((state) => state.cart)
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    shippingAddress: '',
    billingAddress: '',
    paymentMethod: 'COD',
    customerNotes: ''
  })

  const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0)
  const tax = Math.round(subtotal * 0.18)
  const shipping = subtotal >= 500 ? 0 : 50
  const total = subtotal + tax + shipping

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const orderData = {
        userId: user?.id || 1,
        items: items.map(item => ({
          productId: String(item.id),
          productSku: item.sku,
          productName: item.name,
          quantity: item.quantity,
          unitPrice: parseFloat(item.price)
        })),
        shippingAddress: formData.shippingAddress,
        billingAddress: formData.billingAddress || formData.shippingAddress,
        paymentMethod: formData.paymentMethod,
        customerNotes: formData.customerNotes
      }

      const result = await dispatch(createOrder(orderData)).unwrap()
      dispatch(clearCart())
      navigate('/orders', { state: { orderId: result.id } })
    } catch (err) {
      setError(err.message || 'Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h3>Your cart is empty</h3>
        <p className="text-muted">Add some items to checkout</p>
        <button className="btn btn-primary" onClick={() => navigate('/products')}>
          Continue Shopping
        </button>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="container py-5 text-center">
        <h3>Please login to checkout</h3>
        <p className="text-muted">You need to be logged in to place an order</p>
        <button className="btn btn-custom btn-custom-primary" onClick={() => navigate('/login')}>
          Login
        </button>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="container py-4">
        <h2 className="mb-4">Checkout</h2>
        
        <div className="row">
          <div className="col-lg-8">
            <form onSubmit={handleSubmit}>
              {/* Shipping Address */}
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">Shipping Address</h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label htmlFor="shippingAddress" className="form-label">Address *</label>
                    <textarea
                      className="form-control"
                      id="shippingAddress"
                      name="shippingAddress"
                      rows="3"
                      value={formData.shippingAddress}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full shipping address"
                    ></textarea>
                  </div>
                  <div className="mb-0">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="sameAsBilling"
                        checked={!formData.billingAddress}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, billingAddress: '' })
                          }
                        }}
                      />
                      <label className="form-check-label" htmlFor="sameAsBilling">
                        Same as billing address
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              {!formData.billingAddress && formData.sameAsBilling === false && (
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="mb-0">Billing Address</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label htmlFor="billingAddress" className="form-label">Billing Address</label>
                      <textarea
                        className="form-control"
                        id="billingAddress"
                        name="billingAddress"
                        rows="3"
                        value={formData.billingAddress}
                        onChange={handleChange}
                        placeholder="Enter your billing address"
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">Payment Method</h5>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-4">
                      <div className={`card p-3 cursor-pointer border ${formData.paymentMethod === 'COD' ? 'border-primary bg-light' : ''}`}
                           onClick={() => setFormData({ ...formData, paymentMethod: 'COD' })}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            id="cod"
                            value="COD"
                            checked={formData.paymentMethod === 'COD'}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="cod">
                            <strong>💵 Cash on Delivery</strong>
                            <div className="small text-muted">Pay when you receive</div>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className={`card p-3 cursor-pointer border ${formData.paymentMethod === 'UPI' ? 'border-primary bg-light' : ''}`}
                           onClick={() => setFormData({ ...formData, paymentMethod: 'UPI' })}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            id="upi"
                            value="UPI"
                            checked={formData.paymentMethod === 'UPI'}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="upi">
                            <strong>📱 UPI</strong>
                            <div className="small text-muted">Google Pay, PhonePe, etc.</div>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className={`card p-3 cursor-pointer border ${formData.paymentMethod === 'CARD' ? 'border-primary bg-light' : ''}`}
                           onClick={() => setFormData({ ...formData, paymentMethod: 'CARD' })}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            id="card"
                            value="CARD"
                            checked={formData.paymentMethod === 'CARD'}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="card">
                            <strong>💳 Card</strong>
                            <div className="small text-muted">Credit/Debit Card</div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Notes */}
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">Order Notes (Optional)</h5>
                </div>
                <div className="card-body">
                  <div className="mb-0">
                    <label htmlFor="customerNotes" className="form-label">Special Instructions</label>
                    <textarea
                      className="form-control"
                      id="customerNotes"
                      name="customerNotes"
                      rows="2"
                      value={formData.customerNotes}
                      onChange={handleChange}
                      placeholder="Any special instructions for your order"
                    ></textarea>
                  </div>
                </div>
              </div>

              {error && (
                <div className="alert alert-danger mb-4">{error}</div>
              )}

              <button 
                type="submit" 
                className="btn btn-custom btn-custom-primary btn-lg w-100"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Placing Order...
                  </>
                ) : (
                  `Place Order - ₹${total}`
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="card sticky-top" style={{ top: '100px' }}>
              <div className="card-header">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <div className="order-items mb-3">
                  {items.map((item) => (
                    <div key={item.id} className="d-flex justify-content-between mb-2">
                      <div>
                        <span>{item.name}</span>
                        <small className="text-muted d-block">Qty: {item.quantity}</small>
                      </div>
                      <span>₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <hr />
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
                  <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <strong>Total:</strong>
                  <strong className="price-tag">₹{total}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout