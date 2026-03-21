# ToyShop Frontend

React + Redux frontend for E-Commerce Toy Shop application.

## Features

- **Authentication**: Login/Register with JWT tokens
- **Product Catalog**: Browse, search, filter products
- **Shopping Cart**: Add/remove items, quantity management
- **Checkout**: Multi-step checkout process
- **Order History**: View past orders
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG 2.1 compliant

## Tech Stack

- React 18
- Redux Toolkit
- React Router v6
- Vite
- Tailwind CSS
- Jest (Unit Tests)
- Cypress (E2E Tests)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

### Environment Variables

Create `.env` file:

```env
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=ToyShop
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Page components
├── store/           # Redux store and slices
├── services/        # API services
├── __tests__/       # Test files and utilities
├── App.jsx          # Main app component
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## Testing

```bash
# Unit tests
npm test

# Unit tests with coverage
npm run test:coverage

# E2E tests
npm run test:e2e

# Open Cypress UI
npm run test:e2e:open
```

## Accessibility

The application follows WCAG 2.1 guidelines:
- Proper heading hierarchy
- ARIA labels and roles
- Keyboard navigation
- Color contrast compliance
- Screen reader support

## API Integration

The frontend communicates with the backend via REST API:
- Base URL: `http://localhost:8080/api`
- Authentication: Bearer token in Authorization header
- Token refresh: Automatic on 401 responses

## Build

```bash
# Production build
npm run build

# Preview production build
npm run preview
```

## License

MIT