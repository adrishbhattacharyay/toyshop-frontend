import { useState } from 'react'

function PaymentModal({ total, onClose, cartItems }) {
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('razorpay')

  const handlePayment = async () => {
    setLoading(true)
    
    if (paymentMethod === 'razorpay') {
      try {
        const mockPaymentId = 'pay_' + Math.random().toString(36).substr(2, 14).toUpperCase()
        
        setTimeout(() => {
          alert(`✅ Payment Successful!\n\nPayment ID: ${mockPaymentId}\nAmount: ₹${total}\nMethod: Razorpay (Test Mode)`)
          onClose()
          setLoading(false)
        }, 1500)
      } catch (error) {
        console.error('Payment error:', error)
        alert('Payment processing failed')
        setLoading(false)
      }
    } else {
      const orderId = 'ORD_' + Math.random().toString(36).substr(2, 9).toUpperCase()
      setTimeout(() => {
        alert(`✅ Order Placed Successfully!\n\nOrder ID: ${orderId}\nAmount: ₹${total}\nPayment Method: Cash on Delivery`)
        onClose()
        setLoading(false)
      }, 1500)
    }
  }

  return (
    <div className="modal d-block position-fixed top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content modal-custom">
          <div className="modal-header">
            <h5 className="modal-title">💳 Payment</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="alert alert-info mb-4">
              <strong>Order Total: ₹{total}</strong>
            </div>

            <h6 className="mb-3">Select Payment Method</h6>
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <div className={`card p-3 cursor-pointer border ${paymentMethod === 'razorpay' ? 'border-primary bg-light' : ''}`}
                     style={{ cursor: 'pointer' }}
                     onClick={() => setPaymentMethod('razorpay')}>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" id="razorpay" checked={paymentMethod === 'razorpay'} onChange={() => setPaymentMethod('razorpay')} />
                    <label className="form-check-label" htmlFor="razorpay">
                      <strong>💳 Razorpay</strong>
                      <div className="small text-muted">Credit/Debit Card, UPI, Wallet</div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className={`card p-3 cursor-pointer border ${paymentMethod === 'cod' ? 'border-primary bg-light' : ''}`}
                     style={{ cursor: 'pointer' }}
                     onClick={() => setPaymentMethod('cod')}>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" id="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                    <label className="form-check-label" htmlFor="cod">
                      <strong>📦 Cash on Delivery</strong>
                      <div className="small text-muted">Pay when you receive</div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-light p-3 mb-3">
              <h6>Order Items:</h6>
              {cartItems.map((item, idx) => (
                <div key={idx} className="d-flex justify-content-between small mb-2">
                  <span>{item.name} x{item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
              <hr className="my-2" />
              <div className="d-flex justify-content-between">
                <strong>Total:</strong>
                <strong>₹{total}</strong>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button 
              type="button" 
              className="btn btn-custom btn-custom-primary" 
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Complete Payment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentModal