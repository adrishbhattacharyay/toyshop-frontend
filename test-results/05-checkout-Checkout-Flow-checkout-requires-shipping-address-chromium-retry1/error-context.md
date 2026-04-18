# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 05-checkout.spec.js >> Checkout Flow >> checkout requires shipping address
- Location: e2e\05-checkout.spec.js:20:3

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.waitForURL: Test timeout of 30000ms exceeded.
=========================== logs ===========================
waiting for navigation to "/" until "load"
============================================================
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e6]:
      - link "🧸 ToyShop" [ref=e7] [cursor=pointer]:
        - /url: /
      - generic [ref=e8]:
        - textbox "Search toys, games, and more..." [ref=e9]
        - button "🔍" [active] [ref=e10] [cursor=pointer]
      - generic [ref=e11]:
        - link "Hello, sign in Account & Lists ▾" [ref=e12] [cursor=pointer]:
          - /url: /login
          - generic [ref=e13]: Hello, sign in
          - generic [ref=e14]: Account & Lists ▾
        - link "Returns & Orders" [ref=e15] [cursor=pointer]:
          - /url: /orders
          - generic [ref=e16]: Returns
          - generic [ref=e17]: "& Orders"
        - button "🛒 0 Cart" [ref=e18] [cursor=pointer]:
          - generic [ref=e19]: 🛒
          - generic [ref=e20]: "0"
          - generic [ref=e21]: Cart
    - generic [ref=e23]:
      - link "☰ All" [ref=e24] [cursor=pointer]:
        - /url: /products
      - link "Action Figures" [ref=e25] [cursor=pointer]:
        - /url: /products?category=Action+Figures
      - link "Building Blocks" [ref=e26] [cursor=pointer]:
        - /url: /products?category=Building+Blocks
      - link "Vehicles" [ref=e27] [cursor=pointer]:
        - /url: /products?category=Vehicles
      - link "Dolls" [ref=e28] [cursor=pointer]:
        - /url: /products?category=Dolls
      - link "Board Games" [ref=e29] [cursor=pointer]:
        - /url: /products?category=Board+Games
      - link "Puzzles" [ref=e30] [cursor=pointer]:
        - /url: /products?category=Puzzles
      - link "Arts & Crafts" [ref=e31] [cursor=pointer]:
        - /url: /products?category=Arts+and+Crafts
      - link "Sign In" [ref=e32] [cursor=pointer]:
        - /url: /login
  - main [ref=e33]:
    - generic [ref=e38]:
      - generic [ref=e39]:
        - heading "Welcome Back" [level=2] [ref=e40]
        - paragraph [ref=e41]: Sign in to your account
      - generic [ref=e42]:
        - generic [ref=e43]:
          - generic [ref=e44]: Username or Email
          - textbox "Username or Email" [ref=e45]:
            - /placeholder: Enter username or email
            - text: admin
        - generic [ref=e46]:
          - generic [ref=e47]: Password
          - generic [ref=e48]:
            - textbox "Password" [ref=e49]:
              - /placeholder: Enter password
              - text: Test@123
            - button "👁️" [ref=e50] [cursor=pointer]
        - generic [ref=e51]:
          - generic [ref=e52]:
            - checkbox "Remember me" [ref=e53]
            - generic [ref=e54]: Remember me
          - link "Forgot password?" [ref=e55] [cursor=pointer]:
            - /url: /forgot-password
        - button "Sign In" [ref=e56] [cursor=pointer]
        - paragraph [ref=e57]:
          - text: Don't have an account?
          - link "Sign up" [ref=e58] [cursor=pointer]:
            - /url: /register
```

# Test source

```ts
  1  | // Shared test helpers
  2  | export const TEST_USER = {
  3  |   username: 'admin',
  4  |   password: 'Test@123',
  5  | }
  6  | 
  7  | export async function login(page, username = TEST_USER.username, password = TEST_USER.password) {
  8  |   await page.goto('/login')
  9  |   await page.fill('#usernameOrEmail', username)
  10 |   await page.fill('#password', password)
  11 |   await page.click('button[type="submit"]')
> 12 |   await page.waitForURL('/')
     |              ^ Error: page.waitForURL: Test timeout of 30000ms exceeded.
  13 | }
  14 | 
  15 | export async function addProductToCart(page) {
  16 |   await page.goto('/products')
  17 |   await page.waitForSelector('.product-card', { timeout: 10000 })
  18 |   const addBtn = page.locator('.btn-add-cart').first()
  19 |   await addBtn.click()
  20 |   // Wait for toast
  21 |   await page.waitForSelector('.Toastify__toast', { timeout: 5000 })
  22 | }
  23 | 
```