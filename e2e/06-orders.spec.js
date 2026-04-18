import { test, expect } from '@playwright/test'

async function login(page) {
  await page.goto('/login')
  await page.fill('#usernameOrEmail', 'admin')
  await page.fill('#password', 'Test@123')
  await page.locator('.auth-submit-btn').click()
  await page.waitForURL('/', { timeout: 20000 })
}

test.describe('Orders', () => {
  test('unauthenticated user sees login prompt', async ({ page }) => {
    await page.goto('/orders')
    await expect(page.locator('text=Please Login')).toBeVisible()
  })

  test('orders page loads for authenticated user', async ({ page }) => {
    await login(page)
    await page.goto('/orders')
    await expect(page.locator('h2')).toContainText('My Orders')
    await expect(page.locator('text=All Orders')).toBeVisible()
  })

  test('order detail page loads', async ({ page }) => {
    await login(page)
    await page.goto('/orders')
    await page.waitForSelector('h2', { timeout: 5000 })
    // If there are orders, click View Details on first one
    const viewBtn = page.locator('text=View Details').first()
    if (await viewBtn.isVisible()) {
      await viewBtn.click()
      await expect(page).toHaveURL(/\/orders\/\d+/, { timeout: 5000 })
      await expect(page.locator('text=Order Items')).toBeVisible()
      await expect(page.locator('text=Order Summary')).toBeVisible()
    }
  })

  test('order status filter buttons work', async ({ page }) => {
    await login(page)
    await page.goto('/orders')
    await page.waitForSelector('h2', { timeout: 5000 })
    await page.locator('text=Pending').click()
    await page.waitForTimeout(500)
    await page.locator('text=All Orders').click()
    await page.waitForTimeout(500)
    // No crash = pass
    await expect(page.locator('h2')).toContainText('My Orders')
  })
})
