# ✨  E-Commerce Admin Dashboard

A sleek and responsive **E-Commerce Admin Dashboard** built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**. This dashboard seamlessly integrates with the **Fake Store API** to manage product data, featuring a modern user interface and advanced functionalities such as product filtering, dynamic product detail views, and a dark/light mode toggle.

---
## 🌍 **Live**

https://e-com-lake-seven.vercel.app/


![image](https://github.com/user-attachments/assets/51a1be17-cca9-4da8-8310-1811db6af411)



## 🔑 **Key Features**

### **Dashboard Layout**
- **Responsive Layout**: The dashboard adapts to various screen sizes, offering a smooth user experience across devices. It includes:
  - A **sidebar navigation** for easy access to dashboard and product management.
  - A **header** with **user information** (mocked) and a **logout** option.
  
- **Sidebar**: Collapsible on mobile for an optimized space-saving layout while maintaining full functionality on larger screens.
  
- **Header**: Displays **user info** and a **logout button**, making it easy to exit the dashboard securely.

---

### **Products Management**
- **Product List**: Effortlessly fetches and displays products in a grid or table format, showing:
  - Product **image**, **title**, **price**, **category**, **rating** (star display), and **stock status** (dynamically simulated based on price).
  
- **Efficient Data Fetching**: Utilizes **Tanstack Query** for optimized **API calls**, caching, and automatic refetching for an efficient user experience.

---

### **Filtering System**
- **Price Range Slider**: Filter products by setting a minimum and maximum price range.
- **Category Filter**: Easily select from a dropdown menu to filter products by category fetched from the API.
- **Rating Filter**: Use a star-rating selector to display products with a minimum rating (e.g., 3+ stars).
- **Search Bar**: Quickly filter products by name using the search input.

---

### **Additional Features**
- **Product Detail View**: Access detailed product information by navigating to dynamic routes `/products/[id]`, where each product’s image, description, and rating are displayed.
  
- **Pagination**: Implement paginated product listing with adjustable items per page for easy navigation through large product datasets.

- **Simple Analytics**: View key product insights such as:
  - **Total number of products**
  - **Average price**
  - **Category distribution**
  
- **Mock CRUD Operations**: Simulated Add/Edit/Delete functionality for product management using React state (changes are not persistent).

---

### **API Integration**
- **Product List**: [Fake Store API - Product List](https://fakestoreapi.com/products)
- **Single Product Detail**: [Fake Store API - Product Detail](https://fakestoreapi.com/products/{id})
- **Categories**: [Fake Store API - Categories](https://fakestoreapi.com/products/categories)
- **Category Filter**: [Fake Store API - Category Filter](https://fakestoreapi.com/products/category/{category_name})

---

## ⚒ **Setup Instructions**
1. **Clone the Repository**  
   ```bash
   git clone https://github.com/WizardGeeky/e-com-dashboard.git
   cd e-com-dashboard  
2. **Install Dependencies**
   ```bash
   npm install
3. **Run the Development Server**
   ```bash
   npm run dev
   Open http://localhost:3000 in your browser.  
4. **Build for Production**
   ```bash
   npm run build  
   npm run start  

---  

## 🤝 **Technical Decisions**   
- Next.js App Router: Leveraged for its asynchronous component support and server-side rendering, enhancing performance and SEO.  

- TypeScript: Ensures type safety, particularly for API responses and component props, to minimize runtime errors.  

- Tailwind CSS: Used for rapid, responsive UI development with utility-first classes, making the design consistent and adaptable.  

- Mock CRUD: Simulated product management operations using React state to eliminate the need for backend setup.  

- Error Handling: User-friendly error messages and loading states improve the experience during API call failures.

---

## 📜  **Challenges Faced and Solutions**
Async Params in Next.js 15:  

- Challenge: Dynamic route parameters returned as Promise types, causing type issues.  

- Solution: Updated types to params: Promise<{ id: number }> and awaited params inside components.  

Responsive Sidebar:  

- Challenge: Ensuring the sidebar is collapsible on mobile and fixed on desktop.  

- Solution: Employed Tailwind’s responsive classes and React state to toggle visibility dynamically.  
  
Filtering Logic:  

- Challenge: Efficiently managing multiple filters (price, category, rating, search) without excessive API calls.  

- Solution: Used a reducer for state management and filtered the product list on the client side.  

API Limitations:  

- Challenge: The Fake Store API does not support price or rating-based filters.  

 -Solution: Fetched all products and filtered them client-side using JavaScript.  

--- 

### 🔧 **Deployment**   
Deployed on Vercel for optimal Next.js integration and automatic scaling.  

---

### 🖊 **Future Improvements**   
Persist Mock CRUD: Implement a backend or use local storage to persist changes made to products.  

Server-side Filtering: Add server-side filtering once the API supports it.  

Authentication: Implement user authentication to enable the logout feature and secure access to the dashboard.  

Advanced Analytics: Integrate Chart.js to present analytics in a more visually engaging format.  


