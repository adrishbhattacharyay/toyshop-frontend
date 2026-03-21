import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductById, clearSelectedProduct } from '../store/slices/productSlice'
import { addToCart } from '../store/slices/cartSlice'
import './ProductDetail.css'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { selectedProduct: product, loading, error } = useSelector((state) => state.products)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    dispatch(fetchProductById(parseInt(id)))
    return () => {
      dispatch(clearSelectedProduct())
    }
  }, [dispatch, id])

  const handleAddToCart = () => {
    if (product && product.inStock) {
      dispatch(addToCart({ ...product, quantity }))
    }
  }

  const handleBuyNow = () => {
    if (product && product.inStock) {
      dispatch(addToCart({ ...product, quantity }))
      navigate('/checkout')
    }
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">
          <h5>Product Not Found</h5>
          <p>{error || 'The product you are looking for does not exist.'}</p>
          <button className="btn btn-primary" onClick={() => navigate('/products')}>
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="product-detail-page">
      <div className="container py-4">
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <button className="btn btn-link p-0" onClick={() => navigate('/')}>Home</button>
            </li>
            <li className="breadcrumb-item">
              <button className="btn btn-link p-0" onClick={() => navigate('/products')}>Products</button>
            </li>
            <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
          </ol>
        </nav>

        <div className="row">
          {/* Product Images */}
          <div className="col-lg-6 mb-4">
            <div className="product-images">
              <div className="main-image mb-3">
                <img 
                  src={product.imageUrl || '/images/placeholder.svg'} 
                  alt={product.name}
                  className="img-fluid rounded"
                />
                {product.salePrice && (
                  <span className="sale-badge">Sale</span>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="col-lg-6">
            <div className="product-info">
              <span className="badge bg-secondary mb-2">{product.category}</span>
              <h1 className="product-title mb-2">{product.name}</h1>
              
              {product.brand && (
                <p className="text-muted mb-2">Brand: {product.brand}</p>
              )}

              <div className="rating mb-3">
                <span className="stars">⭐ {product.ratingAverage?.toFixed(1) || '0.0'}</span>
                <span className="text-muted ms-2">({product.ratingCount || 0} reviews)</span>
              </div>

              <div className="price-section mb-4">
                {product.salePrice ? (
                  <>
                    <span className="sale-price me-2">₹{product.salePrice}</span>
                    <span className="original-price text-muted text-decoration-line-through">₹{product.price}</span>
                    <span className="discount-badge ms-2">
                      {Math.round((1 - product.salePrice / product.price) * 100)}% OFF
                    </span>
                  </>
                ) : (
                  <span className="current-price">₹{product.price}</span>
                )}
              </div>

              <div className="availability mb-4">
                {product.inStock ? (
                  <span className="text-success">
                    ✓ In Stock ({product.stockQuantity} available)
                  </span>
                ) : (
                  <span className="text-danger">✗ Out of Stock</span>
                )}
              </div>

              {product.description && (
                <p className="description mb-4">{product.description}</p>
              )}

              <div className="quantity-selector mb-4">
                <label className="me-3">Quantity:</label>
                <div className="d-inline-flex align-items-center">
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input 
                    type="text" 
                    className="form-control text-center mx-2" 
                    value={quantity}
                    readOnly
                    style={{ width: '60px' }}
                  />
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                    disabled={quantity >= product.stockQuantity}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="action-buttons mb-4">
                <button 
                  className="btn btn-custom btn-custom-primary btn-lg me-3"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  Add to Cart
                </button>
                <button 
                  className="btn btn-outline-primary btn-lg"
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                >
                  Buy Now
                </button>
              </div>

              <div className="product-meta">
                {product.tags && (
                  <p className="mb-2">
                    <strong>Tags:</strong> {product.tags}
                  </p>
                )}
                {product.ageRange && (
                  <p className="mb-2">
                    <strong>Age Range:</strong> {product.ageRange}
                  </p>
                )}
                <p className="mb-0">
                  <strong>SKU:</strong> {product.sku}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail