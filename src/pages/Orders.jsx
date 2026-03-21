import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import { fetchUserOrders } from '../store/slices/orderSlice'
import './Orders.css'

function Orders() {
  const location = useLocation()
  const dispatch = useDispatch()
  const { items, currentOrder, loading, error } = useSelector((state) => state.orders)
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      dispatch(fetchUserOrders(user.id))
    }
  }, [dispatch, isAuthenticated, user])

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'warning',
      CONFIRMED: 'info',
      PROCESSING: 'info',
      SHIPPED: 'primary',
      DELIVERED: 'success',
      COMPLETED: 'success',
      CANCELLED: 'danger',
      REFUNDED: 'secondary'
    }
    return colors[status] || 'secondary'
  }

  const filteredOrders = items.filter(order => {
    if (filter === 'all') return true
    return order.status === filter
  })

  if (!isAuthenticated) {
    return (
      <div className="container py-5 text-center">
        <h3>Please Login to View Orders</h3>
        <p className="text-muted">You need to be logged in to view your orders</p>
        <Link to="/login" className="btn btn-primary">Login</Link>
      </div>
    )
  }

  if (loading && items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    )
  }

  return (
    <div className="orders-page">
      <div className="container py-4">
        <h2 className="mb-4">My Orders</h2>

        {/* New Order Alert */}
        {location.state?.orderId && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Order Placed Successfully!</strong> Your order ID is #{location.state.orderId}
            <button type="button" className="btn-close" onClick={() => location.state = null}></button>
          </div>
        )}

        {/* Filters */}
        <div className="mb-4">
          <div className="btn-group" role="group">
            {['all', 'PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((status) => (
              <button
                key={status}
                type="button"
                className={`btn ${filter === status ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter(status)}
              >
                {status === 'all' ? 'All Orders' : status.charAt(0) + status.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-5">
            <div className="alert alert-info">
              <h5>No Orders Found</h5>
              <p>{filter === 'all' ? "You haven't placed any orders yet." : `No ${filter.toLowerCase()} orders.`}</p>
              <Link to="/products" className="btn btn-primary">Start Shopping</Link>
            </div>
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.map((order) => (
              <div key={order.id} className="card mb-3">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Order #{order.orderNumber}</strong>
                    <span className="text-muted ms-3">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div>
                    <span className={`badge bg-${getStatusColor(order.status)} me-2`}>
                      {order.status}
                    </span>
                    <span className={`badge bg-${order.paymentStatus === 'COMPLETED' ? 'success' : 'warning'}`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-8">
                      <h6>Items ({order.items?.length || 0})</h6>
                      <div className="order-items">
                        {order.items?.slice(0, 3).map((item, index) => (
                          <div key={index} className="d-flex justify-content-between mb-2">
                            <span>{item.productName} x{item.quantity}</span>
                            <span>₹{item.totalPrice}</span>
                          </div>
                        ))}
                        {order.items?.length > 3 && (
                          <div className="text-muted">
                            +{order.items.length - 3} more items
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-4 text-lg-end">
                      <h6>Total: <span className="price-tag">₹{order.totalAmount}</span></h6>
                      <Link to={`/orders/${order.id}`} className="btn btn-outline-primary btn-sm">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
                {order.trackingNumber && (
                  <div className="card-footer text-muted">
                    Tracking Number: {order.trackingNumber}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders