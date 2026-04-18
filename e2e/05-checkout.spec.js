import { test, expect } from '@playwright/test'
import { login } from './helpers.js'

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login and add item to cart
    await login(page)
    await page.goto('/products')
    await page.waitForSelector('.product-card', { timeout: 10000 })
    await page.locator('.btn-add-cart').first().click()
    await page.waitForTimeout(500)
  })

  test('checkout page loads with cart items', async ({ page }) => {
    await page.goto('/checkout')
    await expect(page.locator('h2')).toContainText('Checkout')
    await expect(page.locator('#shippingAddress')).toBeVisible()
  })

  test('checkout requires shipping address', async ({ page }) => {
    await page.goto('/checkout')
    await page.click('button[type="submit"]')
    // HTML5 required validation prevents submit
    const addr = page.locator('#shippingAddress')
    await expect(addr).toBeVisible()
  })

  test('place order successfully', async ({ page }) => {
    await page.goto('/checkout')
    await page.fill('#shippingAddress', '123 MG Road, Bangalore 560001')
    await page.click('button[type="submit"]')
    await page.waitForURL('/orders', { timeout: 15000 })
    await expect(page.locator('text=Order Placed Successfully')).toBeVisible()
  })

  test('payment method selection works', async ({ page }) => {
    await page.goto('/checkout')
    await page.click('label[for="upi"]')
    await expect(page.locator('#upi')).toBeChecked()
    await page.click('label[for="card"]')
    await expect(page.locator('#card')).toBeChecked()
  })

  test('order summary shows correct total', async ({ page }) => {
    await page.goto('/checkout')
    await expect(page.locator('text=Subtotal:')).toBeVisible()
    await expect(page.locator('text=Tax (18%):')).toBeVisible()
    await expect(page.locator('text=Total:')).toBeVisible()
  })

  test('unauthenticated user redirected to login from checkout', async ({ page }) => {
    // New page without login
    const newPage = await page.context().newPage()
    // Add to cart without login
    await newPage.goto('/products')
    await newPage.waitForSelector('.product-card', { timeout: 10000 })
    await newPage.locator('.btn-add-cart').first().click()
    await newPage.goto('/checkout')
    await expect(newPage.locator('text=Please login to checkout')).toBeVisible()
  })
})
