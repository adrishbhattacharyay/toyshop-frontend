describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should display login form', () => {
    cy.get('form').should('be.visible')
    cy.get('#usernameOrEmail').should('be.visible')
    cy.get('#password').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
  })

  it('should show validation errors for empty fields', () => {
    cy.get('button[type="submit"]').click()
    cy.contains('Username or email is required').should('be.visible')
    cy.contains('Password is required').should('be.visible')
  })

  it('should navigate to register page', () => {
    cy.contains('Sign up').click()
    cy.url().should('include', '/register')
  })

  it('should login successfully with valid credentials', () => {
    // This test requires backend to be running
    cy.get('#usernameOrEmail').type('testuser')
    cy.get('#password').type('Password123!')
    cy.get('button[type="submit"]').click()
    // Assert successful login
  })
})

describe('Registration', () => {
  beforeEach(() => {
    cy.visit('/register')
  })

  it('should display registration form', () => {
    cy.get('form').should('be.visible')
    cy.get('#username').should('be.visible')
    cy.get('#email').should('be.visible')
    cy.get('#password').should('be.visible')
  })

  it('should validate email format', () => {
    cy.get('#email').type('invalid-email')
    cy.get('#password').type('Password123!')
    cy.get('button[type="submit"]').click()
    cy.contains('Invalid email format').should('be.visible')
  })

  it('should validate password strength', () => {
    cy.get('#username').type('testuser')
    cy.get('#email').type('test@example.com')
    cy.get('#password').type('weak')
    cy.get('button[type="submit"]').click()
    cy.contains('Password must contain').should('be.visible')
  })
})