import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrderById } from '../store/slices/orderSlice'

function OrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentOrder: order, loading, error } = useSelector((state) => state.orders)
  const { isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!isAuthenticated) { navigate('/login'); return }
    dispatch(fetchOrderById(id))
  }, [dispatch, id, isAuthenticated, navigate])

  const statusColor = {
    PENDING: 'warning', CONFIRMED: 'info', PROCESSING: 'info',
    SHIPPED: 'primary', DELIVERED: 'success', COMPLETED: 'success',
    CANCELLED: 'danger', REFUNDED: 'secondary'
  }

  if (loading) return (
    <div className="container py-5 text-center">
      <div className="spinner-border" role="status" />
    </div>
  )

  if (error || !order) return (
    <div className="container py-5">
      <div className="alert alert-danger">
        {error || 'Order not found.'}
        <Link to="/orders" className="btn btn-sm btn-outline-secondary ms-3">Back to Orders</Link>
      </div>
    </div>
  )

  return (
    <div className="container py-4" style={{ maxWidth: 900 }}>
      {/* Breadcrumb */}
      <nav className="mb-3">
        <Link to="/orders" style={{ color: '#007185', fontSize: '0.875rem' }}>← Back to Orders</Link>
      </nav>

      {/* Header */}
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
            <div>
              <h4 className="mb-1">Order #{order.orderNumber}</h4>
              <div className="text-muted small">
                Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <span className={`badge bg-${statusColor[order.status] || 'secondary'} fs-6`}>
                {order.status}
              </span>
              <span className={`badge bg-${order.paymentStatus === 'COMPLETED' ? 'success' : 'warning text-dark'}`}>
                Payment: {order.paymentStatus}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        {/* Order Items */}
        <div className="col-lg-8">
          <div className="card mb-3">
            <div className="card-header fw-bold">Order Items ({order.items?.length || 0})</div>
            <div className="card-body p-0">
              <table className="table mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Product</th>
                    <th className="text-center">Qty</th>
                    <th className="text-end">Unit Price</th>
                    <th className="text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items?.map((item, i) => (
                    <tr key={i}>
                      <td>
                        <div className="fw-500">{item.productName}</div>
                        <small className="text-muted">SKU: {item.productSku}</small>
                      </td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-end">₹{parseFloat(item.unitPrice).toLocaleString('en-IN')}</td>
                      <td className="text-end fw-bold">₹{parseFloat(item.totalPrice).toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Shipping */}
          <div className="card">
            <div className="card-header fw-bold">Shipping Details</div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="small text-muted mb-1">Shipping Address</div>
                  <div>{order.shippingAddress || '—'}</div>
                </div>
                <div className="col-md-6 mt-3 mt-md-0">
                  <div className="small text-muted mb-1">Payment Method</div>
                  <div>{order.paymentMethod || '—'}</div>
                  {order.trackingNumber && (
                    <>
                      <div className="small text-muted mb-1 mt-2">Tracking Number</div>
                      <div className="fw-bold">{order.trackingNumber}</div>
                    </>
                  )}
                </div>
              </div>
              {order.customerNotes && (
                <div className="mt-3">
                  <div className="small text-muted mb-1">Order Notes</div>
                  <div>{order.customerNotes}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card sticky-top" style={{ top: 80 }}>
            <div className="card-header fw-bold">Order Summary</div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>₹{parseFloat(order.subtotal || 0).toLocaleString('en-IN')}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax (18%)</span>
                <span>₹{parseFloat(order.taxAmount || 0).toLocaleString('en-IN')}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span className={parseFloat(order.shippingAmount) === 0 ? 'text-success' : ''}>
                  {parseFloat(order.shippingAmount) === 0 ? 'FREE' : `₹${parseFloat(order.shippingAmount).toLocaleString('en-IN')}`}
                </span>
              </div>
              {parseFloat(order.discountAmount) > 0 && (
                <div className="d-flex justify-content-between mb-2 text-success">
                  <span>Discount</span>
                  <span>-₹{parseFloat(order.discountAmount).toLocaleString('en-IN')}</span>
                </div>
              )}
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total</span>
                <span style={{ color: '#B12704' }}>₹{parseFloat(order.totalAmount || 0).toLocaleString('en-IN')}</span>
              </div>
            </div>
            <div className="card-footer">
              {order.status === 'PENDING' && (
                <button className="btn btn-outline-danger btn-sm w-100 mb-2">Cancel Order</button>
              )}
              <Link to="/orders" className="btn btn-outline-secondary btn-sm w-100">Back to Orders</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
