import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { fetchProducts, fetchCategories } from '../store/slices/productSlice'
import ProductCard from '../components/ProductCard'
import './Products.css'

function Products() {
  const dispatch = useDispatch()
  const { items, categories, loading, error, pagination } = useSelector((state) => state.products)
  const [searchParams, setSearchParams] = useSearchParams()
  const [sortBy, setSortBy] = useState('newest')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  useEffect(() => {
    const params = {
      page: 0,
      size: 20,
      sort: sortBy
    }
    
    if (selectedCategory) {
      params.category = selectedCategory
    }
    
    const search = searchParams.get('search')
    if (search) {
      params.keyword = search
    }
    
    dispatch(fetchProducts(params))
  }, [dispatch, sortBy, selectedCategory, searchParams])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    if (category) {
      setSearchParams({ category })
    } else {
      setSearchParams({})
    }
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  const handlePageChange = (page) => {
    dispatch(fetchProducts({ 
      page, 
      size: 20, 
      sort: sortBy,
      category: selectedCategory || undefined,
      keyword: searchParams.get('search') || undefined
    }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="products-page">
      <div className="container py-4">
        <div className="row">
          {/* Sidebar Filters */}
          <div className="col-lg-3 mb-4">
            <div className="filters-sidebar">
              <h5 className="mb-3">Filters</h5>
              
              {/* Category Filter */}
              <div className="filter-group mb-4">
                <h6>Category</h6>
                <div className="list-group list-group-flush">
                  <button
                    className={`list-group-item list-group-item-action ${!selectedCategory ? 'active' : ''}`}
                    onClick={() => handleCategoryChange('')}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`list-group-item list-group-item-action ${selectedCategory === category ? 'active' : ''}`}
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="filter-group mb-4">
                <h6>Price Range</h6>
                <div className="price-range">
                  <input type="number" placeholder="Min" className="form-control mb-2" />
                  <input type="number" placeholder="Max" className="form-control" />
                </div>
              </div>

              {/* Availability Filter */}
              <div className="filter-group">
                <h6>Availability</h6>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="inStock" />
                  <label className="form-check-label" htmlFor="inStock">
                    In Stock Only
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="col-lg-9">
            {/* Toolbar */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <p className="mb-0 text-muted">
                {pagination.totalElements} products found
              </p>
              <div className="d-flex align-items-center gap-2">
                <label className="mb-0">Sort by:</label>
                <select 
                  className="form-select" 
                  style={{ width: 'auto' }}
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Search Results Info */}
            {searchParams.get('search') && (
              <div className="alert alert-info mb-4">
                Search results for: <strong>"{searchParams.get('search')}"</strong>
                <button 
                  className="btn btn-sm btn-outline-secondary ms-2"
                  onClick={() => setSearchParams({})}
                >
                  Clear Search
                </button>
              </div>
            )}

            {/* Products */}
            {loading && items.length === 0 ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : items.length === 0 ? (
              <div className="alert alert-info text-center">
                <h5>No Products Found</h5>
                <p>Try adjusting your filters or search term</p>
              </div>
            ) : (
              <>
                <div className="row g-4">
                  {items.map((product) => (
                    <div key={product.id} className="col-md-6 col-xl-4">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <nav aria-label="Products pagination" className="mt-4">
                    <ul className="pagination justify-content-center">
                      <li className={`page-item ${pagination.page === 0 ? 'disabled' : ''}`}>
                        <button 
                          className="page-link"
                          onClick={() => handlePageChange(pagination.page - 1)}
                          disabled={pagination.page === 0}
                        >
                          Previous
                        </button>
                      </li>
                      {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                        let pageNum
                        if (pagination.totalPages <= 5) {
                          pageNum = i
                        } else if (pagination.page < 3) {
                          pageNum = i
                        } else if (pagination.page > pagination.totalPages - 3) {
                          pageNum = pagination.totalPages - 5 + i
                        } else {
                          pageNum = pagination.page - 2 + i
                        }
                        return (
                          <li 
                            key={pageNum} 
                            className={`page-item ${pageNum === pagination.page ? 'active' : ''}`}
                          >
                            <button 
                              className="page-link"
                              onClick={() => handlePageChange(pageNum)}
                            >
                              {pageNum + 1}
                            </button>
                          </li>
                        )
                      })}
                      <li className={`page-item ${pagination.page === pagination.totalPages - 1 ? 'disabled' : ''}`}>
                        <button 
                          className="page-link"
                          onClick={() => handlePageChange(pagination.page + 1)}
                          disabled={pagination.page === pagination.totalPages - 1}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products