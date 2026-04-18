import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../store/slices/cartSlice'
import { toast } from 'react-toastify'
import './ProductCard.css'

// Star rating helper
function Stars({ rating }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <span className="stars">
      {'★'.repeat(full)}{half ? '½' : ''}{'☆'.repeat(5 - full - (half ? 1 : 0))}
    </span>
  )
}

function ProductCard({ product }) {
  const [added, setAdded] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const price = parseFloat(product.price) || 0
  const whole = Math.floor(price)
  const fraction = String(Math.round((price - whole) * 100)).padStart(2, '0')

  const handleAddToCart = (e) => {
    e.stopPropagation()
    dispatch(addToCart(product))
    setAdded(true)
    toast.success(
      <span>Added to cart! <button className="btn btn-sm btn-warning ms-1" style={{fontSize:'0.7rem',padding:'1px 6px'}} onClick={() => navigate('/cart')}>View Cart</button></span>,
      { autoClose: 3000 }
    )
  }

  const goToDetail = () => navigate(`/products/${product.id}`)

  return (
    <div className="product-card">
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src={product.imageUrl || `https://placehold.co/400x300/f5f5f5/999?text=${encodeURIComponent(product.name)}`}
          alt={product.name}
          className="product-card-img"
          onClick={goToDetail}
          onError={(e) => { e.target.src = `https://placehold.co/400x300/f5f5f5/999?text=Toy` }}
          loading="lazy"
        />
        {product.featured && (
          <span className="badge-amz-featured" style={{ position: 'absolute', top: 8, left: 8 }}>
            Best Seller
          </span>
        )}
        {product.stockQuantity <= 5 && product.stockQuantity > 0 && (
          <span className="badge-amz-new" style={{ position: 'absolute', top: 8, right: 8 }}>
            Only {product.stockQuantity} left
          </span>
        )}
      </div>

      {/* Body */}
      <div className="product-card-body">
        <div className="product-card-title" onClick={goToDetail}>{product.name}</div>
        {product.brand && <div className="product-card-brand">by {product.brand}</div>}

        {/* Rating */}
        <div className="product-card-rating">
          <Stars rating={parseFloat(product.averageRating) || 0} />
          <span className="review-count">{product.reviewCount || 0}</span>
        </div>

        {/* Price */}
        <div className="product-card-price">
          <span className="price-symbol">₹</span>
          <span className="price-whole">{whole.toLocaleString('en-IN')}</span>
          <span className="price-fraction">.{fraction}</span>
        </div>

        {/* Prime / delivery */}
        <div className="prime-badge mb-1">✦ prime</div>
        <div className="free-delivery">FREE delivery by tomorrow</div>

        {/* Stock */}
        {product.inStock === false ? (
          <div className="text-danger small mt-1">Out of Stock</div>
        ) : product.stockQuantity <= 5 ? (
          <div className="low-stock-label mt-1">Only {product.stockQuantity} left in stock</div>
        ) : (
          <div className="in-stock-label mt-1">In Stock</div>
        )}

        {/* Actions */}
        <div className="product-card-actions mt-2">
          {added ? (
            <button className="btn-add-cart added" onClick={() => navigate('/cart')}>
              ✓ Added — View Cart
            </button>
          ) : (
            <button
              className="btn-add-cart"
              onClick={handleAddToCart}
              disabled={product.inStock === false}
            >
              Add to Cart
            </button>
          )}
          <button
            className="btn-view-cart"
            onClick={goToDetail}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
