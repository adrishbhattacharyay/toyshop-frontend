import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('login page renders correctly', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('h2')).toContainText('Welcome Back')
    await expect(page.locator('#usernameOrEmail')).toBeVisible()
    await expect(page.locator('#password')).toBeVisible()
    // Use specific class to avoid matching header search button
    await expect(page.locator('.auth-submit-btn')).toBeVisible()
  })

  test('login with valid credentials redirects to home', async ({ page }) => {
    await page.goto('/login')
    await page.fill('#usernameOrEmail', 'admin')
    await page.fill('#password', 'Test@123')
    await page.locator('.auth-submit-btn').click()
    await page.waitForURL('/', { timeout: 20000 })
    // Navbar should be visible (not login page anymore)
    await expect(page.locator('.navbar-top')).toBeVisible()
  })

  test('login with wrong password shows error', async ({ page }) => {
    await page.goto('/login')
    await page.fill('#usernameOrEmail', 'admin')
    await page.fill('#password', 'WrongPass@123')  // valid format, wrong password
    await page.locator('.auth-submit-btn').click()
    // Error can appear as alert-danger or toast
    await expect(
      page.locator('.alert-danger, .Toastify__toast--error').first()
    ).toBeVisible({ timeout: 10000 })
  })

  test('register page renders correctly', async ({ page }) => {
    await page.goto('/register')
    await expect(page.locator('h2')).toContainText('Create Account')
    await expect(page.locator('#username')).toBeVisible()
    await expect(page.locator('#email')).toBeVisible()
    await expect(page.locator('#password')).toBeVisible()
    await expect(page.locator('.auth-submit-btn')).toBeVisible()
  })

  test('register with valid data redirects to login with toast', async ({ page }) => {
    const ts = Date.now()
    await page.goto('/register')
    await page.fill('#firstName', 'Test')
    await page.fill('#lastName', 'User')
    await page.fill('#username', `testuser${ts}`)
    await page.fill('#email', `test${ts}@example.com`)
    await page.fill('#password', 'Test@1234')
    await page.fill('#confirmPassword', 'Test@1234')
    await page.check('#terms')
    await page.locator('.auth-submit-btn').click()
    await page.waitForURL('/login', { timeout: 20000 })
    await expect(page.locator('.Toastify__toast')).toBeVisible({ timeout: 5000 })
  })

  test('register validation - password mismatch shows error', async ({ page }) => {
    await page.goto('/register')
    await page.fill('#username', 'testuser')
    await page.fill('#email', 'test@example.com')
    await page.fill('#password', 'Test@1234')
    await page.fill('#confirmPassword', 'Different@1234')
    await page.check('#terms')
    await page.locator('.auth-submit-btn').click()
    await expect(page.locator('.invalid-feedback').filter({ hasText: 'Passwords do not match' })).toBeVisible()
  })

  test('logout clears session and shows login link', async ({ page }) => {
    await page.goto('/login')
    await page.fill('#usernameOrEmail', 'admin')
    await page.fill('#password', 'Test@123')
    await page.locator('.auth-submit-btn').click()
    await page.waitForURL('/', { timeout: 20000 })
    // Click dropdown toggle
    await page.locator('.dropdown-toggle').click()
    await page.waitForTimeout(300)
    await page.locator('text=Sign Out').click()
    // Login link should reappear in header
    await expect(page.locator('a[href="/login"]').first()).toBeVisible({ timeout: 5000 })
  })
})
