// Shared test helpers
export const TEST_USER = {
  username: 'admin',
  password: 'Test@123',
}

export async function login(page, username = TEST_USER.username, password = TEST_USER.password) {
  await page.goto('/login')
  await page.fill('#usernameOrEmail', username)
  await page.fill('#password', password)
  await page.click('button[type="submit"]')
  await page.waitForURL('/')
}

export async function addProductToCart(page) {
  await page.goto('/products')
  await page.waitForSelector('.product-card', { timeout: 10000 })
  const addBtn = page.locator('.btn-add-cart').first()
  await addBtn.click()
  // Wait for toast
  await page.waitForSelector('.Toastify__toast', { timeout: 5000 })
}
