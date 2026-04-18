# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 01-home.spec.js >> Home Page >> shows product cards on home page
- Location: e2e\01-home.spec.js:18:3

# Error details

```
Error: locator._expect: expectedNumber: expected float, got object
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
        - button "🔍" [ref=e10] [cursor=pointer]
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
    - generic [ref=e34]:
      - generic [ref=e35]:
        - text: 🎉 Free delivery on orders over ₹500 |
        - link "Shop Now →" [ref=e36] [cursor=pointer]:
          - /url: /products
      - generic [ref=e39]:
        - generic [ref=e40]:
          - generic [ref=e41]: 🔥 MEGA SALE — Up to 50% OFF
          - heading "India's Favourite Toy Store" [level=1] [ref=e42]:
            - text: India's Favourite
            - text: Toy Store
          - paragraph [ref=e43]: Discover 1000+ toys for every age. Safe, fun, and delivered fast.
          - generic [ref=e44]:
            - link "Shop Now" [ref=e45] [cursor=pointer]:
              - /url: /products
            - link "Sign In" [ref=e46] [cursor=pointer]:
              - /url: /login
        - generic [ref=e48]: 🧸🎮🚀🎯
      - generic [ref=e49]:
        - generic [ref=e50]:
          - link "⚡ Today's Deals Up to 50% off" [ref=e52] [cursor=pointer]:
            - /url: /products
            - generic [ref=e53]: ⚡
            - generic [ref=e54]: Today's Deals
            - generic [ref=e55]: Up to 50% off
          - link "🚚 Free Delivery On orders ₹500+" [ref=e57] [cursor=pointer]:
            - /url: /products
            - generic [ref=e58]: 🚚
            - generic [ref=e59]: Free Delivery
            - generic [ref=e60]: On orders ₹500+
          - link "↩️ Easy Returns 30-day returns" [ref=e62] [cursor=pointer]:
            - /url: /products
            - generic [ref=e63]: ↩️
            - generic [ref=e64]: Easy Returns
            - generic [ref=e65]: 30-day returns
          - link "🔒 Secure Pay 100% safe checkout" [ref=e67] [cursor=pointer]:
            - /url: /products
            - generic [ref=e68]: 🔒
            - generic [ref=e69]: Secure Pay
            - generic [ref=e70]: 100% safe checkout
        - generic [ref=e71]:
          - generic [ref=e72]:
            - heading "Shop by Category" [level=2] [ref=e73]
            - link "See all categories →" [ref=e74] [cursor=pointer]:
              - /url: /products
          - generic [ref=e75]:
            - link "🦸 Action Figures" [ref=e77] [cursor=pointer]:
              - /url: /products?category=Action%20Figures
              - generic [ref=e78]: 🦸
              - generic [ref=e79]: Action Figures
            - link "🧱 Building Blocks" [ref=e81] [cursor=pointer]:
              - /url: /products?category=Building%20Blocks
              - generic [ref=e82]: 🧱
              - generic [ref=e83]: Building Blocks
            - link "🚗 Vehicles" [ref=e85] [cursor=pointer]:
              - /url: /products?category=Vehicles
              - generic [ref=e86]: 🚗
              - generic [ref=e87]: Vehicles
            - link "🎎 Dolls" [ref=e89] [cursor=pointer]:
              - /url: /products?category=Dolls
              - generic [ref=e90]: 🎎
              - generic [ref=e91]: Dolls
            - link "🎲 Board Games" [ref=e93] [cursor=pointer]:
              - /url: /products?category=Board%20Games
              - generic [ref=e94]: 🎲
              - generic [ref=e95]: Board Games
            - link "🧩 Puzzles" [ref=e97] [cursor=pointer]:
              - /url: /products?category=Puzzles
              - generic [ref=e98]: 🧩
              - generic [ref=e99]: Puzzles
            - link "🎨 Arts and Crafts" [ref=e101] [cursor=pointer]:
              - /url: /products?category=Arts%20and%20Crafts
              - generic [ref=e102]: 🎨
              - generic [ref=e103]: Arts and Crafts
        - generic [ref=e104]:
          - generic [ref=e105]:
            - heading "⭐ Best Sellers" [level=2] [ref=e106]
            - link "See all →" [ref=e107] [cursor=pointer]:
              - /url: /products
          - generic [ref=e108]:
            - generic [ref=e110]:
              - generic [ref=e111]:
                - img "LEGO Classic Bricks 500pc" [ref=e112] [cursor=pointer]
                - generic [ref=e113]: Best Seller
              - generic [ref=e114]:
                - generic [ref=e115] [cursor=pointer]: LEGO Classic Bricks 500pc
                - generic [ref=e116]: by LEGO
                - generic [ref=e117]:
                  - generic [ref=e118]: ☆☆☆☆☆
                  - generic [ref=e119]: "0"
                - generic [ref=e120]:
                  - generic [ref=e121]: ₹
                  - text: 1,299
                  - generic [ref=e122]: ".00"
                - generic [ref=e123]: ✦ prime
                - generic [ref=e124]: FREE delivery by tomorrow
                - generic [ref=e125]: In Stock
                - generic [ref=e126]:
                  - button "Add to Cart" [ref=e127] [cursor=pointer]
                  - button "View Details" [ref=e128] [cursor=pointer]
            - generic [ref=e130]:
              - generic [ref=e131]:
                - img "Hot Wheels Track Set" [ref=e132] [cursor=pointer]
                - generic [ref=e133]: Best Seller
              - generic [ref=e134]:
                - generic [ref=e135] [cursor=pointer]: Hot Wheels Track Set
                - generic [ref=e136]: by Hot Wheels
                - generic [ref=e137]:
                  - generic [ref=e138]: ☆☆☆☆☆
                  - generic [ref=e139]: "0"
                - generic [ref=e140]:
                  - generic [ref=e141]: ₹
                  - text: "899"
                  - generic [ref=e142]: ".00"
                - generic [ref=e143]: ✦ prime
                - generic [ref=e144]: FREE delivery by tomorrow
                - generic [ref=e145]: In Stock
                - generic [ref=e146]:
                  - button "Add to Cart" [ref=e147] [cursor=pointer]
                  - button "View Details" [ref=e148] [cursor=pointer]
            - generic [ref=e150]:
              - generic [ref=e151]:
                - img "Barbie Dreamhouse" [ref=e152] [cursor=pointer]
                - generic [ref=e153]: Best Seller
              - generic [ref=e154]:
                - generic [ref=e155] [cursor=pointer]: Barbie Dreamhouse
                - generic [ref=e156]: by Barbie
                - generic [ref=e157]:
                  - generic [ref=e158]: ☆☆☆☆☆
                  - generic [ref=e159]: "0"
                - generic [ref=e160]:
                  - generic [ref=e161]: ₹
                  - text: 4,999
                  - generic [ref=e162]: ".00"
                - generic [ref=e163]: ✦ prime
                - generic [ref=e164]: FREE delivery by tomorrow
                - generic [ref=e165]: In Stock
                - generic [ref=e166]:
                  - button "Add to Cart" [ref=e167] [cursor=pointer]
                  - button "View Details" [ref=e168] [cursor=pointer]
            - generic [ref=e170]:
              - generic [ref=e171]:
                - img "Spider-Man Action Figure" [ref=e172] [cursor=pointer]
                - generic [ref=e173]: Best Seller
              - generic [ref=e174]:
                - generic [ref=e175] [cursor=pointer]: Spider-Man Action Figure
                - generic [ref=e176]: by Marvel
                - generic [ref=e177]:
                  - generic [ref=e178]: ☆☆☆☆☆
                  - generic [ref=e179]: "0"
                - generic [ref=e180]:
                  - generic [ref=e181]: ₹
                  - text: "599"
                  - generic [ref=e182]: ".00"
                - generic [ref=e183]: ✦ prime
                - generic [ref=e184]: FREE delivery by tomorrow
                - generic [ref=e185]: In Stock
                - generic [ref=e186]:
                  - button "Add to Cart" [ref=e187] [cursor=pointer]
                  - button "View Details" [ref=e188] [cursor=pointer]
        - generic [ref=e189]:
          - generic [ref=e190]:
            - heading "🆕 New Arrivals" [level=2] [ref=e191]
            - link "See all →" [ref=e192] [cursor=pointer]:
              - /url: /products
          - generic [ref=e193]:
            - generic [ref=e195]:
              - generic [ref=e196]:
                - img "LEGO Classic Bricks 500pc" [ref=e197] [cursor=pointer]
                - generic [ref=e198]: Best Seller
              - generic [ref=e199]:
                - generic [ref=e200] [cursor=pointer]: LEGO Classic Bricks 500pc
                - generic [ref=e201]: by LEGO
                - generic [ref=e202]:
                  - generic [ref=e203]: ☆☆☆☆☆
                  - generic [ref=e204]: "0"
                - generic [ref=e205]:
                  - generic [ref=e206]: ₹
                  - text: 1,299
                  - generic [ref=e207]: ".00"
                - generic [ref=e208]: ✦ prime
                - generic [ref=e209]: FREE delivery by tomorrow
                - generic [ref=e210]: In Stock
                - generic [ref=e211]:
                  - button "Add to Cart" [ref=e212] [cursor=pointer]
                  - button "View Details" [ref=e213] [cursor=pointer]
            - generic [ref=e215]:
              - generic [ref=e216]:
                - img "Hot Wheels Track Set" [ref=e217] [cursor=pointer]
                - generic [ref=e218]: Best Seller
              - generic [ref=e219]:
                - generic [ref=e220] [cursor=pointer]: Hot Wheels Track Set
                - generic [ref=e221]: by Hot Wheels
                - generic [ref=e222]:
                  - generic [ref=e223]: ☆☆☆☆☆
                  - generic [ref=e224]: "0"
                - generic [ref=e225]:
                  - generic [ref=e226]: ₹
                  - text: "899"
                  - generic [ref=e227]: ".00"
                - generic [ref=e228]: ✦ prime
                - generic [ref=e229]: FREE delivery by tomorrow
                - generic [ref=e230]: In Stock
                - generic [ref=e231]:
                  - button "Add to Cart" [ref=e232] [cursor=pointer]
                  - button "View Details" [ref=e233] [cursor=pointer]
            - generic [ref=e235]:
              - generic [ref=e236]:
                - img "Barbie Dreamhouse" [ref=e237] [cursor=pointer]
                - generic [ref=e238]: Best Seller
              - generic [ref=e239]:
                - generic [ref=e240] [cursor=pointer]: Barbie Dreamhouse
                - generic [ref=e241]: by Barbie
                - generic [ref=e242]:
                  - generic [ref=e243]: ☆☆☆☆☆
                  - generic [ref=e244]: "0"
                - generic [ref=e245]:
                  - generic [ref=e246]: ₹
                  - text: 4,999
                  - generic [ref=e247]: ".00"
                - generic [ref=e248]: ✦ prime
                - generic [ref=e249]: FREE delivery by tomorrow
                - generic [ref=e250]: In Stock
                - generic [ref=e251]:
                  - button "Add to Cart" [ref=e252] [cursor=pointer]
                  - button "View Details" [ref=e253] [cursor=pointer]
            - generic [ref=e255]:
              - img "Monopoly Board Game" [ref=e257] [cursor=pointer]
              - generic [ref=e258]:
                - generic [ref=e259] [cursor=pointer]: Monopoly Board Game
                - generic [ref=e260]: by Hasbro
                - generic [ref=e261]:
                  - generic [ref=e262]: ☆☆☆☆☆
                  - generic [ref=e263]: "0"
                - generic [ref=e264]:
                  - generic [ref=e265]: ₹
                  - text: "799"
                  - generic [ref=e266]: ".00"
                - generic [ref=e267]: ✦ prime
                - generic [ref=e268]: FREE delivery by tomorrow
                - generic [ref=e269]: In Stock
                - generic [ref=e270]:
                  - button "Add to Cart" [ref=e271] [cursor=pointer]
                  - button "View Details" [ref=e272] [cursor=pointer]
            - generic [ref=e274]:
              - generic [ref=e275]:
                - img "Spider-Man Action Figure" [ref=e276] [cursor=pointer]
                - generic [ref=e277]: Best Seller
              - generic [ref=e278]:
                - generic [ref=e279] [cursor=pointer]: Spider-Man Action Figure
                - generic [ref=e280]: by Marvel
                - generic [ref=e281]:
                  - generic [ref=e282]: ☆☆☆☆☆
                  - generic [ref=e283]: "0"
                - generic [ref=e284]:
                  - generic [ref=e285]: ₹
                  - text: "599"
                  - generic [ref=e286]: ".00"
                - generic [ref=e287]: ✦ prime
                - generic [ref=e288]: FREE delivery by tomorrow
                - generic [ref=e289]: In Stock
                - generic [ref=e290]:
                  - button "Add to Cart" [ref=e291] [cursor=pointer]
                  - button "View Details" [ref=e292] [cursor=pointer]
            - generic [ref=e294]:
              - img "1000 Piece Puzzle" [ref=e296] [cursor=pointer]
              - generic [ref=e297]:
                - generic [ref=e298] [cursor=pointer]: 1000 Piece Puzzle
                - generic [ref=e299]: by Ravensburger
                - generic [ref=e300]:
                  - generic [ref=e301]: ☆☆☆☆☆
                  - generic [ref=e302]: "0"
                - generic [ref=e303]:
                  - generic [ref=e304]: ₹
                  - text: "449"
                  - generic [ref=e305]: ".00"
                - generic [ref=e306]: ✦ prime
                - generic [ref=e307]: FREE delivery by tomorrow
                - generic [ref=e308]: In Stock
                - generic [ref=e309]:
                  - button "Add to Cart" [ref=e310] [cursor=pointer]
                  - button "View Details" [ref=e311] [cursor=pointer]
            - generic [ref=e313]:
              - generic [ref=e314]:
                - img "Remote Control Car 30mph" [ref=e315] [cursor=pointer]
                - generic [ref=e316]: Best Seller
              - generic [ref=e317]:
                - generic [ref=e318] [cursor=pointer]: Remote Control Car 30mph
                - generic [ref=e319]: by Traxxas
                - generic [ref=e320]:
                  - generic [ref=e321]: ☆☆☆☆☆
                  - generic [ref=e322]: "0"
                - generic [ref=e323]:
                  - generic [ref=e324]: ₹
                  - text: 1,599
                  - generic [ref=e325]: ".00"
                - generic [ref=e326]: ✦ prime
                - generic [ref=e327]: FREE delivery by tomorrow
                - generic [ref=e328]: In Stock
                - generic [ref=e329]:
                  - button "Add to Cart" [ref=e330] [cursor=pointer]
                  - button "View Details" [ref=e331] [cursor=pointer]
            - generic [ref=e333]:
              - img "Play-Doh Mega Set 36 Cans" [ref=e335] [cursor=pointer]
              - generic [ref=e336]:
                - generic [ref=e337] [cursor=pointer]: Play-Doh Mega Set 36 Cans
                - generic [ref=e338]: by Play-Doh
                - generic [ref=e339]:
                  - generic [ref=e340]: ☆☆☆☆☆
                  - generic [ref=e341]: "0"
                - generic [ref=e342]:
                  - generic [ref=e343]: ₹
                  - text: "699"
                  - generic [ref=e344]: ".00"
                - generic [ref=e345]: ✦ prime
                - generic [ref=e346]: FREE delivery by tomorrow
                - generic [ref=e347]: In Stock
                - generic [ref=e348]:
                  - button "Add to Cart" [ref=e349] [cursor=pointer]
                  - button "View Details" [ref=e350] [cursor=pointer]
        - generic [ref=e351]:
          - heading "New to ToyShop?" [level=3] [ref=e352]
          - paragraph [ref=e353]: Create an account to track orders, save wishlists, and get exclusive deals.
          - generic [ref=e354]:
            - link "Create Account" [ref=e355] [cursor=pointer]:
              - /url: /register
            - link "Sign In" [ref=e356] [cursor=pointer]:
              - /url: /login
      - generic [ref=e357]:
        - generic [ref=e358] [cursor=pointer]: ↑ Back to top
        - generic [ref=e361]:
          - generic [ref=e362]:
            - heading "Get to Know Us" [level=6] [ref=e363]
            - link "About ToyShop" [ref=e364] [cursor=pointer]:
              - /url: "#"
            - link "Careers" [ref=e365] [cursor=pointer]:
              - /url: "#"
            - link "Press Releases" [ref=e366] [cursor=pointer]:
              - /url: "#"
          - generic [ref=e367]:
            - heading "Connect with Us" [level=6] [ref=e368]
            - link "Facebook" [ref=e369] [cursor=pointer]:
              - /url: "#"
            - link "Twitter" [ref=e370] [cursor=pointer]:
              - /url: "#"
            - link "Instagram" [ref=e371] [cursor=pointer]:
              - /url: "#"
          - generic [ref=e372]:
            - heading "Make Money with Us" [level=6] [ref=e373]
            - link "Sell on ToyShop" [ref=e374] [cursor=pointer]:
              - /url: "#"
            - link "Become an Affiliate" [ref=e375] [cursor=pointer]:
              - /url: "#"
          - generic [ref=e376]:
            - heading "Let Us Help You" [level=6] [ref=e377]
            - link "Your Orders" [ref=e378] [cursor=pointer]:
              - /url: /orders
            - link "Returns & Replacements" [ref=e379] [cursor=pointer]:
              - /url: "#"
            - link "Help" [ref=e380] [cursor=pointer]:
              - /url: "#"
        - generic [ref=e382]:
          - generic [ref=e383]: 🧸 ToyShop
          - paragraph [ref=e384]: © 2024 ToyShop. All rights reserved.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('Home Page', () => {
  4  |   test('loads and shows hero section', async ({ page }) => {
  5  |     await page.goto('/')
  6  |     await expect(page).toHaveTitle(/ToyShop/)
  7  |     await expect(page.locator('.hero-title')).toBeVisible()
  8  |     await expect(page.locator('text=Shop Now')).toBeVisible()
  9  |   })
  10 | 
  11 |   test('shows Login button when not authenticated', async ({ page }) => {
  12 |     await page.goto('/')
  13 |     // Login link in hero
  14 |     const loginLinks = page.locator('a[href="/login"]')
  15 |     await expect(loginLinks.first()).toBeVisible()
  16 |   })
  17 | 
  18 |   test('shows product cards on home page', async ({ page }) => {
  19 |     await page.goto('/')
  20 |     await page.waitForSelector('.product-card', { timeout: 10000 })
  21 |     const cards = page.locator('.product-card')
> 22 |     await expect(cards).toHaveCount({ minimum: 1 })
     |                         ^ Error: locator._expect: expectedNumber: expected float, got object
  23 |   })
  24 | 
  25 |   test('category links navigate to products page', async ({ page }) => {
  26 |     await page.goto('/')
  27 |     await page.click('text=Building Blocks')
  28 |     await expect(page).toHaveURL(/category=Building/)
  29 |     await page.waitForSelector('.product-card', { timeout: 10000 })
  30 |   })
  31 | 
  32 |   test('Shop Now navigates to products', async ({ page }) => {
  33 |     await page.goto('/')
  34 |     await page.click('text=Shop Now')
  35 |     await expect(page).toHaveURL('/products')
  36 |   })
  37 | })
  38 | 
```