import { test, expect } from '@playwright/test'

// Helper: login
async function login(page) {
  await page.goto('/login')
  await page.fill('#usernameOrEmail', 'admin')
  await page.fill('#password', 'Test@123')
  await page.locator('.auth-submit-btn').click()
  await page.waitForURL('/', { timeout: 20000 })
}

// Helper: add first product to cart
async function addToCart(page) {
  await page.goto('/products')
  await page.waitForSelector('.product-card', { timeout: 15000 })
  await page.locator('.btn-add-cart').first().click()
  await page.waitForTimeout(500)
}

test.describe('Checkout Flow', () => {
  test('unauthenticated user sees login prompt on checkout', async ({ page }) => {
    await page.goto('/products')
    await page.waitForSelector('.product-card', { timeout: 15000 })
    await page.locator('.btn-add-cart').first().click()
    await page.goto('/checkout')
    await expect(page.locator('text=Please login to checkout')).toBeVisible()
  })

  test('checkout page loads with cart items when logged in', async ({ page }) => {
    await login(page)
    await addToCart(page)
    await page.goto('/checkout')
    await expect(page.locator('h2')).toContainText('Checkout')
    await expect(page.locator('#shippingAddress')).toBeVisible()
    await expect(page.locator('text=Order Summary')).toBeVisible()
  })

  test('payment method selection works', async ({ page }) => {
    await login(page)
    await addToCart(page)
    await page.goto('/checkout')
    await page.click('label[for="upi"]')
    await expect(page.locator('#upi')).toBeChecked()
    await page.click('label[for="card"]')
    await expect(page.locator('#card')).toBeChecked()
    await page.click('label[for="cod"]')
    await expect(page.locator('#cod')).toBeChecked()
  })

  test('order summary shows subtotal, tax, total', async ({ page }) => {
    await login(page)
    await addToCart(page)
    await page.goto('/checkout')
    await expect(page.locator('text=Subtotal:')).toBeVisible()
    await expect(page.locator('text=Tax (18%):')).toBeVisible()
    await expect(page.locator('strong').filter({ hasText: 'Total:' })).toBeVisible()
  })

  test('place order successfully and redirect to orders', async ({ page }) => {
    await login(page)
    await addToCart(page)
    await page.goto('/checkout')
    await page.fill('#shippingAddress', '123 MG Road, Bangalore 560001')
    await page.locator('.btn-custom.btn-custom-primary').click()
    await page.waitForURL('/orders', { timeout: 30000 })
    await expect(page.locator('text=Order Placed Successfully')).toBeVisible()
  })
})
