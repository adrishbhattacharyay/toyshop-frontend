import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { sort, category, keyword, ...rest } = params
      const apiParams = { ...rest }
      // Map sort to sortBy/sortDir
      if (sort === 'price-low') { apiParams.sortBy = 'price'; apiParams.sortDir = 'asc' }
      else if (sort === 'price-high') { apiParams.sortBy = 'price'; apiParams.sortDir = 'desc' }
      else { apiParams.sortBy = 'createdAt'; apiParams.sortDir = 'desc' }
      // Pass category and keyword directly - backend now handles them
      if (category) apiParams.category = category
      if (keyword) apiParams.keyword = keyword
      const response = await api.get('/api/v1/products', { params: apiParams })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products')
    }
  }
)

export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/v1/products/${id}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product')
    }
  }
)

export const searchProducts = createAsyncThunk(
  'products/search',
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/v1/products/search', { params: { keyword } })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Search failed')
    }
  }
)

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/v1/products/categories')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories')
    }
  }
)

const productSlice = createSlice({
  name: 'products',
  initialState: {
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
  },
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.content || []
        state.pagination = {
          page: action.payload.pageable?.pageNumber || 0,
          size: action.payload.pageable?.pageSize || 20,
          totalElements: action.payload.totalElements || 0,
          totalPages: action.payload.totalPages || 0
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedProduct = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.items = action.payload.content || action.payload
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
  }
})

export const { clearSelectedProduct, clearError } = productSlice.actions
export default productSlice.reducer