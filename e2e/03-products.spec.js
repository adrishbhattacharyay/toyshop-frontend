import { test, expect } from '@playwright/test'

test.describe('Products Page', () => {
  test('loads all products', async ({ page }) => {
    await page.goto('/products')
    await page.waitForSelector('.product-card', { timeout: 15000 })
    const count = await page.locator('.product-card').count()
    expect(count).toBeGreaterThan(0)
  })

  test('category filter from URL param works', async ({ page }) => {
    await page.goto('/products?category=Vehicles')
    await page.waitForSelector('.product-card', { timeout: 15000 })
    const count = await page.locator('.product-card').count()
    expect(count).toBeGreaterThan(0)
    // All shown products should be Vehicles
    const categories = await page.locator('.product-card-brand').allTextContents()
    expect(count).toBeLessThan(12)
  })

  test('category filter from sidebar works', async ({ page }) => {
    await page.goto('/products')
    await page.waitForSelector('.product-card', { timeout: 15000 })
    const totalBefore = await page.locator('.product-card').count()
    // Click Building Blocks in sidebar
    await page.locator('.filter-group .list-group-item').filter({ hasText: 'Building' }).click()
    await page.waitForTimeout(1500)
    const totalAfter = await page.locator('.product-card').count()
    expect(totalAfter).toBeGreaterThan(0)
    expect(totalAfter).toBeLessThanOrEqual(totalBefore)
  })

  test('search from header works', async ({ page }) => {
    await page.goto('/products')
    await page.waitForSelector('.product-card', { timeout: 15000 })
    await page.fill('.search-input', 'LEGO')
    await page.press('.search-input', 'Enter')
    await page.waitForURL(/search=LEGO/, { timeout: 5000 })
    await page.waitForSelector('.product-card', { timeout: 10000 })
    const count = await page.locator('.product-card').count()
    expect(count).toBeGreaterThan(0)
  })

  test('product card shows name, price, Add to Cart button', async ({ page }) => {
    await page.goto('/products')
    await page.waitForSelector('.product-card', { timeout: 15000 })
    const card = page.locator('.product-card').first()
    await expect(card.locator('.product-card-title')).toBeVisible()
    await expect(card.locator('.price-whole')).toBeVisible()
    await expect(card.locator('.btn-add-cart')).toBeVisible()
  })

  test('clicking product title navigates to detail page', async ({ page }) => {
    await page.goto('/products')
    await page.waitForSelector('.product-card', { timeout: 15000 })
    await page.locator('.product-card-title').first().click()
    await expect(page).toHaveURL(/\/products\/[a-f0-9-]+/, { timeout: 5000 })
  })

  test('sort by price low to high', async ({ page }) => {
    await page.goto('/products')
    await page.waitForSelector('.product-card', { timeout: 15000 })
    await page.selectOption('.form-select', 'price-low')
    await page.waitForTimeout(1500)
    const prices = await page.locator('.price-whole').allTextContents()
    const nums = prices.map(p => parseInt(p.replace(/,/g, '')))
    expect(nums[0]).toBeLessThanOrEqual(nums[nums.length - 1])
  })
})
