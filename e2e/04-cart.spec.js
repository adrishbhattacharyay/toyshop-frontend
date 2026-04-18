import { test, expect } from '@playwright/test'

test.describe('Cart Management', () => {
  test('add product to cart shows toast', async ({ page }) => {
    await page.goto('/products')
    await page.waitForSelector('.product-card', { timeout: 10000 })
    await page.locator('.btn-add-cart').first().click()
    await expect(page.locator('.Toastify__toast')).toBeVisible({ timeout: 5000 })
  })

  test('cart count updates in header after adding', async ({ page }) => {
    await page.goto('/products')
    await page.waitForSelector('.product-card', { timeout: 10000 })
    await page.locator('.btn-add-cart').first().click()
    await page.waitForTimeout(500)
    const cartCount = page.locator('.cart-count')
    await expect(cartCount).toContainText('1')
  })

  test('button changes to Added after clicking', async ({ page }) => {
    await page.goto('/products')
    await page.waitForSelector('.product-card', { timeout: 10000 })
    const btn = page.locator('.btn-add-cart').first()
    await btn.click()
    await expect(btn).toContainText('Added')
  })

  test('cart page shows added items', async ({ page }) => {
    await page.goto('/products')
    await page.waitForSelector('.product-card', { timeout: 10000 })
    await page.locator('.btn-add-cart').first().click()
    await page.waitForTimeout(500)
    await page.click('.cart-btn')
    await expect(page).toHaveURL('/cart')
    await expect(page.locator('table')).toBeVisible()
    const rows = page.locator('tbody tr')
    expect(await rows.count()).toBeGreaterThan(0)
  })

  test('cart quantity increase works', async ({ page }) => {
    await page.goto('/products')
    await page.waitForSelector('.product-card', { timeout: 10000 })
    await page.locator('.btn-add-cart').first().click()
    await page.goto('/cart')
    const plusBtn = page.locator('.quantity-control button').last()
    await plusBtn.click()
    const qtyInput = page.locator('.quantity-control input')
    await expect(qtyInput).toHaveValue('2')
  })

  test('remove item from cart', async ({ page }) => {
    await page.goto('/products')
    await page.waitForSelector('.product-card', { timeout: 10000 })
    await page.locator('.btn-add-cart').first().click()
    await page.goto('/cart')
    await page.click('button[aria-label*="Remove"]')
    await expect(page.locator('text=Your cart is empty')).toBeVisible({ timeout: 5000 })
  })

  test('checkout button visible in header when cart has items', async ({ page }) => {
    await page.goto('/products')
    await page.waitForSelector('.product-card', { timeout: 10000 })
    await page.locator('.btn-add-cart').first().click()
    await page.waitForTimeout(500)
    await expect(page.locator('text=Checkout →')).toBeVisible()
  })
})
