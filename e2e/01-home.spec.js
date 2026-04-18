import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('loads and shows hero section', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.hero-title', { timeout: 10000 })
    await expect(page.locator('.hero-title')).toBeVisible()
    await expect(page.locator('text=Shop Now').first()).toBeVisible()
    const title = await page.title()
    expect(title).toContain('VolcanoToysForKids')
  })

  test('shows Login button when not authenticated', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.hero-title', { timeout: 10000 })
    const loginLinks = page.locator('a[href="/login"]')
    expect(await loginLinks.count()).toBeGreaterThan(0)
  })

  test('shows product cards on home page', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.product-card', { timeout: 15000 })
    const count = await page.locator('.product-card').count()
    expect(count).toBeGreaterThan(0)
  })

  test('category links navigate to products page', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.hero-title', { timeout: 10000 })
    await page.click('text=Building Blocks')
    await expect(page).toHaveURL(/category=Building/, { timeout: 5000 })
  })

  test('Shop Now navigates to products', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.hero-title', { timeout: 10000 })
    await page.locator('a[href="/products"]').first().click()
    await expect(page).toHaveURL('/products')
  })
})
