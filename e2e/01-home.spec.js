import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('loads and shows hero section', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/ToyShop/)
    await expect(page.locator('.hero-title')).toBeVisible()
    await expect(page.locator('text=Shop Now')).toBeVisible()
  })

  test('shows Login button when not authenticated', async ({ page }) => {
    await page.goto('/')
    // Login link in hero
    const loginLinks = page.locator('a[href="/login"]')
    await expect(loginLinks.first()).toBeVisible()
  })

  test('shows product cards on home page', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.product-card', { timeout: 10000 })
    const cards = page.locator('.product-card')
    await expect(cards).toHaveCount({ minimum: 1 })
  })

  test('category links navigate to products page', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Building Blocks')
    await expect(page).toHaveURL(/category=Building/)
    await page.waitForSelector('.product-card', { timeout: 10000 })
  })

  test('Shop Now navigates to products', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Shop Now')
    await expect(page).toHaveURL('/products')
  })
})
