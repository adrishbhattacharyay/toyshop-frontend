import { test, expect } from '@playwright/test'

test.describe('Products Page', () => {
  test('loads all products', async ({ page }) => {
    await page.goto('/products')
    await page.waitForSelector('.product-card', { timeout: 10000 })
    const cards = page.locator('.product-card')
    const count = await cards.count()
    expect(count).toBeGreaterThan(0)
  })

  test('category filter works - Building Blocks', async ({ page }) => {
    await page.goto('/products')
    await page.waitForSelector('.product-card', { timeout: 10000 })
    // Click Building Blocks in sidebar
    await page.click('text=Building blocks')
    await page.waitForTimeout(1000)
    const cards = page.locator('.product-card')
    const count = await cards.count()
    expect(count).toBeGreaterThan(0)
    expect(count).toBeLessThan(12) // Should be filtered
  })

  test('category filter from URL param works', async ({ page }) => {
    await page.goto('/products?category=Vehicles')
    await page.waitForSelector('.product-card', { timeout: 10000 })
    const cards = page.locator('.product-card')
    const count = await cards.count()
    expect(count).toBeGreaterThan(0)
  })

  test('search works', async ({ page }) => {
    await page.goto('/products')
    await page.waitForSelector('.product-card', { timeout: 10000 })
    // Use header search
    await page.fill('.search-input', 'LEGO')
    await page.press('.search-input', 'Enter')
    await page.waitForURL(/search=LEGO/)
    await page.waitForSelector('.product-card', { timeout: 10000 })
  })

  test('product card shows name, price, and Add to Cart', async ({ page }) => {
    await page.goto('/products')
    await page.waitForSelector('.product-card', { timeout: 10000 })
    const card = page.locator('.product-card').first()
    await expect(card.locator('.product-card-title')).toBeVisible()
    await expect(card.locator('.price-whole')).toBeVisible()
    await expect(card.locator('.btn-add-cart')).toBeVisible()
  })

  test('clicking product title navigates to detail page', async ({ page }) => {
    await page.goto('/products')
    await page.waitForSelector('.product-card', { timeout: 10000 })
    await page.locator('.product-card-title').first().click()
    await expect(page).toHaveURL(/\/products\//)
  })

  test('sort by price low to high', async ({ page }) => {
    await page.goto('/products')
    await page.waitForSelector('.product-card', { timeout: 10000 })
    await page.selectOption('.form-select', 'price-low')
    await page.waitForTimeout(1000)
    // First product should have lower price than last
    const prices = await page.locator('.price-whole').allTextContents()
    const nums = prices.map(p => parseInt(p.replace(/,/g, '')))
    expect(nums[0]).toBeLessThanOrEqual(nums[nums.length - 1])
  })
})
