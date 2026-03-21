import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../store/slices/authSlice'
import cartReducer from '../store/slices/cartSlice'
import productReducer from '../store/slices/productSlice'
import orderReducer from '../store/slices/orderSlice'

export const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
      products: productReducer,
      orders: orderReducer
    },
    preloadedState
  })
}

export const store = createTestStore({
  auth: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
  },
  cart: {
    items: [],
    loading: false,
    error: null
  },
  products: {
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
  orders: {
    items: [],
    currentOrder: null,
    loading: false,
    error: null
  }
})

export const mockProduct = {
  id: 1,
  sku: 'TEST-001',
  name: 'Test Product',
  description: 'A test product description',
  price: 499,
  salePrice: null,
  category: 'action',
  brand: 'TestBrand',
  imageUrl: '/images/test.svg',
  stockQuantity: 100,
  lowStockThreshold: 10,
  inStock: true,
  lowStock: false,
  active: true,
  featured: false,
  ratingAverage: 4.5,
  ratingCount: 10,
  tags: 'test, sample',
  ageRange: '5+',
  createdAt: new Date().toISOString()
}

export const mockUser = {
  id: 1,
  username: 'testuser',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  role: 'CUSTOMER',
  enabled: true
}

export const mockOrder = {
  id: 1,
  orderNumber: 'ORD-12345678',
  userId: 1,
  status: 'PENDING',
  paymentStatus: 'PENDING',
  subtotal: 998,
  taxAmount: 180,
  shippingAmount: 0,
  discountAmount: 0,
  totalAmount: 1178,
  items: [
    {
      id: 1,
      productId: 1,
      productSku: 'TEST-001',
      productName: 'Test Product',
      quantity: 2,
      unitPrice: 499,
      totalPrice: 998,
      discountAmount: 0
    }
  ],
  createdAt: new Date().toISOString()
}