/**
 * Demo video test - walks through the full VolcanoToysForKids app
 * Run with: npx playwright test e2e/demo-video.spec.js --headed --video=on
 * Video saved to: test-results/
 */
import { test, expect } from '@playwright/test'

test('VolcanoToysForKids - Full App Demo', async ({ page }) => {
  // ── 1. Home Page ──────────────────────────────────────────────
  await page.goto('/')
  await page.waitForSelector('.hero-title', { timeout: 15000 })
  await page.waitForTimeout(1500)

  // ── 2. Browse Products ────────────────────────────────────────
  await page.click('text=Shop Now')
  await page.waitForSelector('.product-card', { timeout: 15000 })
  await page.waitForTimeout(1500)

  // ── 3. Category Filter ────────────────────────────────────────
  await page.locator('.filter-group .list-group-item').filter({ hasText: 'Building' }).click()
  await page.waitForTimeout(1500)
  await page.locator('.filter-group .list-group-item').filter({ hasText: 'All' }).click()
  await page.waitForTimeout(1000)

  // ── 4. Product Detail ─────────────────────────────────────────
  await page.locator('.product-card-title').first().click()
  await page.waitForSelector('.product-info, .product-title, h1', { timeout: 10000 })
  await page.waitForTimeout(1500)
  await page.goBack()
  await page.waitForSelector('.product-card', { timeout: 10000 })

  // ── 5. Add to Cart ────────────────────────────────────────────
  await page.locator('.btn-add-cart').first().click()
  await page.waitForSelector('.Toastify__toast', { timeout: 5000 })
  await page.waitForTimeout(1500)
  await page.locator('.btn-add-cart').nth(1).click()
  await page.waitForTimeout(1000)

  // ── 6. View Cart ──────────────────────────────────────────────
  await page.locator('.cart-btn').click()
  await page.waitForURL('/cart')
  await page.waitForSelector('table', { timeout: 5000 })
  await page.waitForTimeout(1500)

  // Increase quantity
  await page.locator('.quantity-control button').last().click()
  await page.waitForTimeout(800)

  // ── 7. Login ──────────────────────────────────────────────────
  await page.goto('/login')
  await page.waitForSelector('#usernameOrEmail')
  await page.waitForTimeout(800)
  await page.fill('#usernameOrEmail', 'admin')
  await page.fill('#password', 'Test@123')
  await page.waitForTimeout(500)
  await page.locator('.auth-submit-btn').click()
  await page.waitForURL('/', { timeout: 20000 })
  await page.waitForTimeout(1500)

  // ── 8. Add to Cart (logged in) ────────────────────────────────
  await page.goto('/products')
  await page.waitForSelector('.product-card', { timeout: 15000 })
  await page.locator('.btn-add-cart').first().click()
  await page.waitForTimeout(1000)

  // ── 9. Checkout ───────────────────────────────────────────────
  await page.goto('/checkout')
  await page.waitForSelector('#shippingAddress', { timeout: 5000 })
  await page.waitForTimeout(1000)
  await page.fill('#shippingAddress', '42 Volcano Street, Mumbai 400001')
  await page.waitForTimeout(500)
  await page.click('label[for="upi"]')
  await page.waitForTimeout(800)
  await page.locator('.btn-custom.btn-custom-primary').click()
  await page.waitForURL('/orders', { timeout: 30000 })
  await page.waitForTimeout(1500)

  // ── 10. Order Detail ──────────────────────────────────────────
  const viewBtn = page.locator('text=View Details').first()
  if (await viewBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await viewBtn.click()
    await page.waitForSelector('text=Order Items', { timeout: 5000 })
    await page.waitForTimeout(1500)
    await page.goBack()
    await page.waitForTimeout(800)
  }

  // ── 11. Register page ─────────────────────────────────────────
  await page.goto('/register')
  await page.waitForSelector('#username')
  await page.waitForTimeout(1500)

  // ── 12. Back to Home ──────────────────────────────────────────
  await page.goto('/')
  await page.waitForSelector('.hero-title', { timeout: 10000 })
  await page.waitForTimeout(2000)

  // Final assertion - app is working
  await expect(page.locator('.hero-title')).toBeVisible()
})
