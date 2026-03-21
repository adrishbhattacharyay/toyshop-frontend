import cartReducer, { addToCart, removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice'

describe('Cart Slice', () => {
  const initialState = { items: [], loading: false, error: null }

  it('should return initial state', () => {
    expect(cartReducer(undefined, {})).toEqual(initialState)
  })

  it('should add item to cart', () => {
    const product = { id: 1, name: 'Test Product', price: 100 }
    const state = cartReducer(initialState, addToCart(product))
    expect(state.items).toHaveLength(1)
    expect(state.items[0].quantity).toBe(1)
  })

  it('should increment quantity when adding existing item', () => {
    const product = { id: 1, name: 'Test Product', price: 100 }
    const state = cartReducer(
      { items: [{ ...product, quantity: 1 }] },
      addToCart(product)
    )
    expect(state.items[0].quantity).toBe(2)
  })

  it('should remove item from cart', () => {
    const state = cartReducer(
      { items: [{ id: 1, name: 'Test', price: 100, quantity: 1 }] },
      removeFromCart(1)
    )
    expect(state.items).toHaveLength(0)
  })

  it('should update quantity', () => {
    const state = cartReducer(
      { items: [{ id: 1, name: 'Test', price: 100, quantity: 1 }] },
      updateQuantity({ id: 1, quantity: 5 })
    )
    expect(state.items[0].quantity).toBe(5)
  })

  it('should remove item when quantity is 0', () => {
    const state = cartReducer(
      { items: [{ id: 1, name: 'Test', price: 100, quantity: 1 }] },
      updateQuantity({ id: 1, quantity: 0 })
    )
    expect(state.items).toHaveLength(0)
  })

  it('should clear cart', () => {
    const state = cartReducer(
      { items: [{ id: 1 }, { id: 2 }] },
      clearCart()
    )
    expect(state.items).toHaveLength(0)
  })
})