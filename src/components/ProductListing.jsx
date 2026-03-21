import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../store/slices/productSlice'
import ProductCard from './ProductCard'
import './ProductListing.css'

function ProductListing() {
  const dispatch = useDispatch()
  const { items, loading, error, pagination } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProducts({ page: 0, size: 20 }))
  }, [dispatch])

  const handleLoadMore = () => {
    dispatch(fetchProducts({ page: pagination.page + 1, size: 20 }))
  }

  if (loading && items.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        <h5>Error Loading Products</h5>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={() => dispatch(fetchProducts({ page: 0, size: 20 }))}>
          Try Again
        </button>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="alert alert-info text-center" role="alert">
        <h5>No Products Found</h5>
        <p>Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div className="product-listing">
      <div className="row g-4">
        {items.map((product) => (
          <div key={product.id} className="col-md-6 col-lg-4 col-xl-3">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      
      {pagination.page < pagination.totalPages - 1 && (
        <div className="text-center mt-4">
          <button 
            className="btn btn-custom btn-custom-primary"
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Loading...
              </>
            ) : (
              'Load More Products'
            )}
          </button>
        </div>
      )}
      
      <p className="text-center text-muted mt-2">
        Showing {items.length} of {pagination.totalElements} products
      </p>
    </div>
  )
}

export default ProductListing