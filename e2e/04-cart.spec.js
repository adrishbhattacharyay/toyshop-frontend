import { test, expect } from '@playwright/test'

test.describe('Cart Management', () => {
  test('add product to cart shows toast notification', async ({ page }) => {
    await page.goto('/products')
    await page.waitForSelector('.product-card', { timeout: 15000 })
    await page.locator('.btn-add-cart').first().click()
    await expect(page.locator('.Toastify__toast')).toBeVisible({ timeout: 5000 })
  })

  test('cart count in header updates after adding item', async ({ page }) => {
    await page.goto('/products')
    await page.waitForSelector('.product-card', { timeout: 15000 })
    await page.locator('.btn-add-cart').first().click()
    await page.waitForTimeout(500)
    await expect(page.locator('.cart-count')).toContainText('1')
  })

  test('Add to Cart button changes to Added state', async ({ page }) => {
    await page.goto('/products')
    await page.waitForSelector('.product-card', { timeout: 15000 })
    const btn = page.locator('.btn-add-cart').first()
    await btn.click()
    await expect(btn).toContainText('Added', { timeout: 3000 })
  })

  test('cart page shows added items', async ({ page }) => {
    await page.goto('/products')
    await page.waitForSelector('.product-card', { timeout: 15000 })
    await page.locator('.btn-add-cart').first().click()
    await page.waitForTimeout(500)
    await page.locator('.cart-btn').click()
    await expect(page).toHaveURL('/cart')
    await expect(page.locator('table')).toBeVisible()
    const rows = await page.locator('tbody tr').count()
    expect(rows).toBeGreaterThan(0)
  })

  test('cart quantity increase works', async ({ page }) => {
    await page.goto('/products')
    await page.waitForSelector('.product-card', { timeout: 15000 })
    await page.locator('.btn-add-cart').first().click()
    await page.goto('/cart')
    await page.waitForSelector('table', { timeout: 5000 })
    // Click + button
    await page.locator('.quantity-control button').last().click()
    const val = await page.locator('.quantity-control input').inputValue()
    expect(parseInt(val)).toBe(2)
  })

  test('remove item from cart empties cart', async ({ page }) => {
    await page.goto('/products')
    await page.waitForSelector('.product-card', { timeout: 15000 })
    await page.locator('.btn-add-cart').first().click()
    await page.goto('/cart')
    await page.waitForSelector('table', { timeout: 5000 })
    await page.locator('button[aria-label*="Remove"]').first().click()
    await expect(page.locator('text=Your cart is empty')).toBeVisible({ timeout: 5000 })
  })

  test('Checkout button appears in header when cart has items', async ({ page }) => {
    await page.goto('/products')
    await page.waitForSelector('.product-card', { timeout: 15000 })
    await page.locator('.btn-add-cart').first().click()
    await page.waitForTimeout(500)
    await expect(page.locator('text=Checkout →')).toBeVisible()
  })
})
