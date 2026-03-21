// Cypress E2E Test Support

import '@testing-library/cypress/add-commands'
import 'cypress-axe'

// Custom commands
Cypress.Commands.add('login', (username, password) => {
  cy.session([username, password], () => {
    cy.visit('/login')
    cy.get('#usernameOrEmail').type(username)
    cy.get('#password').type(password)
    cy.get('button[type="submit"]').click()
    cy.url().should('not.include', '/login')
  })
})

Cypress.Commands.add('addToCart', (productName) => {
  cy.contains('.toy-card', productName).find('button').contains('Add to Cart').click()
})

Cypress.Commands.add('checkAccessibility', () => {
  cy.injectAxe()
  cy.checkA11y()
})

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false prevents Cypress from failing the test
  // This is useful for handling React hydration errors
  if (err.message.includes('hydration') || err.message.includes('Hydration')) {
    return false
  }
  return true
})

// Take screenshot on failure
afterEach(function () {
  if (this.currentTest.state === 'failed') {
    const testName = this.currentTest.title.replace(/\s+/g, '-')
    cy.screenshot(`failed-${testName}`)
  }
})