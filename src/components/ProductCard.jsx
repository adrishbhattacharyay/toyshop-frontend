import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/slices/cartSlice'
import './ProductCard.css'

function ProductCard({ product }) {
  const [showDetails, setShowDetails] = useState(false)
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart(product))
  }

  return (
    <>
      <div className="card toy-card h-100">
        <div className="position-relative">
          <img 
            src={product.imageUrl || '/images/placeholder.svg'} 
            className="card-img-top" 
            alt={product.name}
            loading="lazy"
          />
          {product.featured && (
            <span className="badge badge-custom position-absolute top-0 end-0 m-2">Featured</span>
          )}
          {product.salePrice && (
            <span className="badge bg-danger position-absolute top-0 start-0 m-2">Sale</span>
          )}
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text text-muted small">{product.category}</p>
          <div className="mb-2">
            <span className="rating-stars">⭐ {product.ratingAverage?.toFixed(1) || '0.0'}</span>
            <span className="text-muted small ms-2">({product.ratingCount || 0})</span>
          </div>
          <div className="mt-auto">
            <div className="d-flex align-items-center mb-2">
              {product.salePrice ? (
                <>
                  <span className="price-sale me-2">₹{product.salePrice}</span>
                  <span className="price-original text-muted text-decoration-line-through">₹{product.price}</span>
                </>
              ) : (
                <span className="price-tag">₹{product.price}</span>
              )}
            </div>
            <div className="d-flex gap-2">
              <button 
                className="btn btn-custom btn-custom-primary flex-grow-1"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                aria-label={`Add ${product.name} to cart`}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button 
                className="btn btn-outline-secondary"
                onClick={() => setShowDetails(true)}
                aria-label="View product details"
              >
                👁️
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDetails && (
        <div 
          className="modal d-block position-fixed top-0 start-0 w-100 h-100" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
          onClick={() => setShowDetails(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
        >
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content modal-custom">
              <div className="modal-header">
                <h5 className="modal-title" id="product-modal-title">{product.name}</h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => setShowDetails(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <img 
                  src={product.imageUrl || '/images/placeholder.svg'} 
                  className="img-fluid rounded mb-3" 
                  alt={product.name}
                />
                <div className="mb-3">
                  <strong>Category:</strong> {product.category}
                </div>
                {product.brand && (
                  <div className="mb-3">
                    <strong>Brand:</strong> {product.brand}
                  </div>
                )}
                <div className="mb-3">
                  <strong>Rating:</strong> ⭐ {product.ratingAverage?.toFixed(1) || '0.0'}/5 ({product.ratingCount || 0} reviews)
                </div>
                <div className="mb-3">
                  <strong>Price:</strong> 
                  {product.salePrice ? (
                    <>
                      <span className="price-sale ms-2">₹{product.salePrice}</span>
                      <span className="text-muted text-decoration-line-through ms-2">₹{product.price}</span>
                    </>
                  ) : (
                    <span className="price-tag ms-2">₹{product.price}</span>
                  )}
                </div>
                <div className="mb-3">
                  <strong>Availability:</strong> 
                  {product.inStock ? (
                    <span className="text-success ms-1">In Stock ({product.stockQuantity} available)</span>
                  ) : (
                    <span className="text-danger ms-1">Out of Stock</span>
                  )}
                </div>
                {product.description && (
                  <p className="text-muted">{product.description}</p>
                )}
                {product.tags && (
                  <div className="mb-3">
                    <strong>Tags:</strong> {product.tags}
                  </div>
                )}
                {product.ageRange && (
                  <div className="mb-3">
                    <strong>Age Range:</strong> {product.ageRange}
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowDetails(false)}
                >
                  Close
                </button>
                <button 
                  type="button" 
                  className="btn btn-custom btn-custom-primary" 
                  onClick={() => {
                    handleAddToCart()
                    setShowDetails(false)
                  }}
                  disabled={!product.inStock}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductCard