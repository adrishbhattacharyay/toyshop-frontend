import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('login page renders correctly', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('h2')).toContainText('Welcome Back')
    await expect(page.locator('#usernameOrEmail')).toBeVisible()
    await expect(page.locator('#password')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  test('login with valid credentials', async ({ page }) => {
    await page.goto('/login')
    await page.fill('#usernameOrEmail', 'admin')
    await page.fill('#password', 'Test@123')
    await page.click('button[type="submit"]')
    await page.waitForURL('/', { timeout: 10000 })
    // Should show account name in header
    await expect(page.locator('text=Hello, Admin')).toBeVisible()
  })

  test('login with wrong password shows error', async ({ page }) => {
    await page.goto('/login')
    await page.fill('#usernameOrEmail', 'admin')
    await page.fill('#password', 'wrongpassword')
    await page.click('button[type="submit"]')
    await expect(page.locator('.alert-danger')).toBeVisible({ timeout: 5000 })
  })

  test('register page renders correctly', async ({ page }) => {
    await page.goto('/register')
    await expect(page.locator('h2')).toContainText('Create Account')
    await expect(page.locator('#username')).toBeVisible()
    await expect(page.locator('#email')).toBeVisible()
    await expect(page.locator('#password')).toBeVisible()
  })

  test('register with valid data redirects to login', async ({ page }) => {
    const ts = Date.now()
    await page.goto('/register')
    await page.fill('#firstName', 'Test')
    await page.fill('#lastName', 'User')
    await page.fill('#username', `testuser${ts}`)
    await page.fill('#email', `test${ts}@example.com`)
    await page.fill('#password', 'Test@1234')
    await page.fill('#confirmPassword', 'Test@1234')
    await page.check('#terms')
    await page.click('button[type="submit"]')
    await page.waitForURL('/login', { timeout: 10000 })
    await expect(page.locator('.Toastify__toast')).toBeVisible()
  })

  test('register validation - password mismatch', async ({ page }) => {
    await page.goto('/register')
    await page.fill('#username', 'testuser')
    await page.fill('#email', 'test@example.com')
    await page.fill('#password', 'Test@1234')
    await page.fill('#confirmPassword', 'Different@1234')
    await page.click('button[type="submit"]')
    await expect(page.locator('text=Passwords do not match')).toBeVisible()
  })

  test('logout works', async ({ page }) => {
    // Login first
    await page.goto('/login')
    await page.fill('#usernameOrEmail', 'admin')
    await page.fill('#password', 'Test@123')
    await page.click('button[type="submit"]')
    await page.waitForURL('/')
    // Logout via dropdown
    await page.click('button.dropdown-toggle')
    await page.click('text=Sign Out')
    await expect(page.locator('a[href="/login"]').first()).toBeVisible()
  })
})
