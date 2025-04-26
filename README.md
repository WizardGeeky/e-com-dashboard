E-commerce Admin Dashboard
This is an e-commerce admin dashboard built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and Tanstack Query. The dashboard integrates with the Fake Store API to manage product data, featuring a responsive UI, product filtering, and additional functionalities like product details, pagination, and dark/light mode toggle.
Features Implemented
Dashboard Layout

Responsive Layout: Includes a sidebar navigation, header with user info and logout option, and a main content area.
Sidebar: Collapsible on mobile, with links to dashboard and product management.
Header: Displays user info (mocked) and a logout button.

Products Management

Product List: Fetches and displays products in a grid/table format with:
Product image
Title
Price
Category
Rating (star display)
Stock status (simulated: "In Stock" if price > 50, else "Low Stock")


Data Fetching: Uses Tanstack Query for efficient API calls and caching.

Filtering System

Price Range: Slider to filter products by minimum and maximum price.
Category Filter: Dropdown to filter by categories fetched from the API.
Rating Filter: Star rating selector (e.g., filter by 3+ stars).
Search: Filter products by name using a search input.

Additional Features

Product Detail View: Dynamic route (/products/[id]) displays detailed product info, including image, description, and rating.
Pagination: Paginated product list with configurable items per page.
Dark/Light Mode: Toggle between dark and light themes, persisted in local storage.
Simple Analytics: Displays total products, average price, and category distribution at the top of the dashboard.
Mock CRUD: Add/edit/delete products with mock state management (changes don't persist).

API Integration

Product List: https://fakestoreapi.com/products
Single Product: https://fakestoreapi.com/products/{id}
Categories: https://fakestoreapi.com/products/categories
Category Filter: https://fakestoreapi.com/products/category/{category_name}

Setup Instructions

Clone the Repository:
git clone https://github.com/your-username/ecommerce-admin-dashboard.git
cd ecommerce-admin-dashboard


Install Dependencies:
npm install


Run the Development Server:
npm run dev

Open http://localhost:3000 in your browser.

Build for Production:
npm run build
npm run start



Technical Decisions

Next.js App Router: Chosen for its support for async components and server-side rendering, improving performance and SEO.
TypeScript: Used for type safety, especially for API responses and component props, reducing runtime errors.
Tailwind CSS: Enabled rapid UI development with utility-first classes, ensuring responsiveness and consistency.
Tanstack Query: Implemented for data fetching, caching, and refetching, optimizing API performance.
Local Storage for Theme: Persists dark/light mode preference without requiring a backend.
Mock CRUD: Simulated add/edit/delete functionality using React state to avoid unnecessary backend setup.
Error Handling: Displays user-friendly error messages for failed API calls and handles loading states.

Challenges Faced and Solutions

Async Params in Next.js 15:

Challenge: Dynamic route params were Promise types, causing type errors.
Solution: Updated prop types to params: Promise<{ id: number }> and awaited params in the component.


Responsive Sidebar:

Challenge: Ensuring the sidebar was collapsible on mobile while fixed on desktop.
Solution: Used Tailwind's responsive classes and React state to toggle visibility.


Filtering Logic:

Challenge: Combining multiple filters (price, category, rating, search) efficiently.
Solution: Implemented a reducer to manage filter state and applied filters client-side to avoid excessive API calls.


API Limitations:

Challenge: Fake Store API doesn't support price or rating filters.
Solution: Fetched all products and filtered them client-side using JavaScript.



Deployment

Deployed on Vercel: https://your-vercel-app.vercel.app (replace with actual URL if deployed).
Vercel was chosen for its seamless integration with Next.js and automatic scaling.

Future Improvements

Persist mock CRUD changes using a backend or local storage.
Add server-side filtering if the API supports it.
Implement authentication for the logout feature.
Enhance analytics with charts using a library like Chart.js.


Built with ❤️ by Your Name
