describe('Shopping Cart', () => {
  beforeEach(() => {
    cy.visit('/products')
  })

  it('should add product to cart', () => {
    cy.get('.toy-card').first().find('button').contains('Add to Cart').click()
    cy.get('.cart-badge').should('contain', '1')
  })

  it('should update cart quantity', () => {
    cy.get('.toy-card').first().find('button').contains('Add to Cart').click()
    cy.visit('/cart')
    cy.get('.quantity-control input').should('have.value', '1')
    cy.get('.quantity-control button').contains('+').click()
    cy.get('.quantity-control input').should('have.value', '2')
  })

  it('should remove item from cart', () => {
    cy.get('.toy-card').first().find('button').contains('Add to Cart').click()
    cy.visit('/cart')
    cy.get('.btn-outline-danger').click()
    cy.get('.empty-cart').should('be.visible')
  })

  it('should calculate total correctly', () => {
    cy.get('.toy-card').eq(0).find('button').contains('Add to Cart').click()
    cy.get('.toy-card').eq(1).find('button').contains('Add to Cart').click()
    cy.visit('/cart')
    cy.contains('Total:').should('be.visible')
  })
})

describe('Checkout', () => {
  beforeEach(() => {
    // Add items to cart and visit checkout
    cy.visit('/products')
    cy.get('.toy-card').first().find('button').contains('Add to Cart').click()
    cy.visit('/checkout')
  })

  it('should display checkout form', () => {
    cy.get('form').should('be.visible')
    cy.get('#shippingAddress').should('be.visible')
    cy.get('input[value="COD"]').should('be.visible')
  })

  it('should require shipping address', () => {
    cy.get('button[type="submit"]').click()
    cy.contains('Address is required').should('be.visible')
  })
})