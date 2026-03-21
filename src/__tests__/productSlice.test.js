import productReducer, { fetchProducts, fetchProductById, searchProducts, fetchCategories } from '../store/slices/productSlice'
import api from '../services/api'

jest.mock('../services/api', () => ({
  get: jest.fn(),
  post: jest.fn()
}))

describe('Product Slice', () => {
  const initialState = {
    items: [],
    categories: [],
    selectedProduct: null,
    loading: false,
    error: null,
    pagination: {
      page: 0,
      size: 20,
      totalElements: 0,
      totalPages: 0
    }
  }

  it('should return initial state', () => {
    expect(productReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle fetchProducts pending', () => {
    const state = productReducer(initialState, fetchProducts.pending())
    expect(state.loading).toBe(true)
    expect(state.error).toBeNull()
  })

  it('should handle fetchProducts fulfilled', () => {
    const mockProducts = {
      content: [{ id: 1, name: 'Test Product' }],
      pageable: { pageNumber: 0, pageSize: 20 },
      totalElements: 1,
      totalPages: 1
    }
    const state = productReducer(initialState, fetchProducts.fulfilled(mockProducts))
    expect(state.loading).toBe(false)
    expect(state.items).toHaveLength(1)
    expect(state.pagination.totalElements).toBe(1)
  })

  it('should handle fetchProducts rejected', () => {
    const state = productReducer(initialState, fetchProducts.rejected(new Error('Failed to fetch'), '', '', { message: 'Failed to fetch' }))
    expect(state.loading).toBe(false)
    expect(state.error).toEqual({ message: 'Failed to fetch' })
  })

  it('should handle fetchProductById fulfilled', () => {
    const mockProduct = { id: 1, name: 'Test Product', price: 499 }
    const state = productReducer(initialState, fetchProductById.fulfilled(mockProduct))
    expect(state.loading).toBe(false)
    expect(state.selectedProduct).toEqual(mockProduct)
  })

  it('should handle fetchCategories fulfilled', () => {
    const state = productReducer(initialState, fetchCategories.fulfilled(['action', 'vehicles']))
    expect(state.categories).toEqual(['action', 'vehicles'])
  })

  it('should clear selected product', () => {
    const stateWithProduct = { ...initialState, selectedProduct: { id: 1 } }
    const state = productReducer(stateWithProduct, { type: 'products/clearSelectedProduct' })
    expect(state.selectedProduct).toBeNull()
  })
})