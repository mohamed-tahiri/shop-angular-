# My Shop — Angular Frontend - Mohamed TAHIRI

A tiny but functional e-commerce frontend built with **Angular**, **NgRx**, and **Angular Material**.  
Uses a mock API (MSW) for products, authentication, and ratings.  
Includes Storybook stories for key presentational components.

---

## Features

### 1. Login

- Form with default credentials: `demo/demo`.
- Dispatches login action → stores `access` & `refresh` tokens in NgRx state.
- Shows loading indicator and error messages.
- **Route:** `/app/login`

### 2. Products Page

- Filter products by `minRating` and `ordering`.
- Paginated fetch from `/api/products/`.
- Allows changing items per page (5 / 10 / 20).
- Displays total count and product cards.
- Shows loading spinner while fetching.
- Pagination with `Prev/Next` buttons.
- **Route:** `/app/shop/products`

### 3. Product Rating Page

- Enter a Product ID to fetch its average rating and vote count.
- Fetches from `/api/products/:id/rating/`.
- **Route:** `/app/shop/products/rating`

### 4. State Management

- NgRx slices for `auth` and `products`.
- Effects handle API calls.
- Selectors provide reactive observables to components.

### 5. Presentational Components (for Storybook)

- `ProductCardComponent`
- `ProductsListComponent`
- `LoginFormComponent`
- Fully reusable and decoupled from containers.
- Supports Storybook controls and action logging.

### 6. Routing

| Route                       | Component                    |
| --------------------------- | ---------------------------- |
| `/`                         | `HomeComponent`              |
| `/dev`                      | `DevIndexComponent`          |
| `/dev/auth`                 | `DevAuthComponent`           |
| `/dev/products`             | `DevProductsComponent`       |
| `/dev/products/:id/rating`  | `DevProductRatingComponent`  |
| `/app`                      | `AppPlaceholderComponent`    |
| `/app/login`                | `LoginPageComponent`         |
| `/app/shop/products`        | `ProductsPageComponent`      |
| `/app/shop/products/rating` | `ProductRatingPageComponent` |
| `**`                        | Redirect to `/`              |

### 7. UI & Styling

- Angular Material: cards, buttons, form fields, progress indicators, selects.
- Responsive layout for product lists.
- `ProductsListComponent` adapts columns to screen size.

---

## Setup & Run

1. Install dependencies:

```bash
npm install
```

2. Add Angular Material (if not already added):

```bash
ng add @angular/material
```

3. Start the Angular app:

```bash
npm run start
```

4. Run Storybook:

```bash
npm run storybook
```

- MSW (Mock Service Worker) is enabled in development mode to mock API responses.

## Storybook

Stories are available in `src/stories`:

- `ProductCard.stories.ts`
- `ProductsList.stories.ts`
- `LoginForm.stories.ts`
