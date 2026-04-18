import { test, expect } from '@playwright/test'
import { login } from './helpers.js'

test.describe('Orders', () => {
  test.beforeEach(async ({ page }) => {
    await login(page)
  })

  test('orders page shows my orders', async ({ page }) => {
    await page.goto('/orders')
    await expect(page.locator('h2')).toContainText('My Orders')
  })

  test('orders page shows order list or empty state', async ({ page }) => {
    await page.goto('/orders')
    const hasOrders = await page.locator('.card').count()
    const hasEmpty = await page.locator('text=No Orders Found').count()
    expect(hasOrders + hasEmpty).toBeGreaterThan(0)
  })

  test('order status filter buttons visible', async ({ page }) => {
    await page.goto('/orders')
    await expect(page.locator('text=All Orders')).toBeVisible()
    await expect(page.locator('text=Pending')).toBeVisible()
  })

  test('unauthenticated user sees login prompt', async ({ page }) => {
    // New context without auth
    const ctx = await page.context().browser().newContext()
    const newPage = await ctx.newPage()
    await newPage.goto('/orders')
    await expect(newPage.locator('text=Please Login')).toBeVisible()
    await ctx.close()
  })
})
