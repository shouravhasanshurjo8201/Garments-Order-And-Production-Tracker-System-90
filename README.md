# Garments Order & Production Tracker System

## Project Overview
The Garments Order & Production Tracker System is a full-stack web application built to help small and medium-sized garment factories manage orders, production stages, and delivery tracking efficiently.  
This system supports role-based dashboards for Admin, Manager, and Buyer, ensuring smooth workflow management from order placement to final delivery.

## 🎯 Purpose of the Project
1. Track garment orders from buyers
2. Manage production stages (Cutting, Sewing, Finishing, Delivery)
3. Enable managers to add and manage products
4. Allow admins to manage users, products, and orders
5. Provide buyers with order booking and tracking features
6. Ensure secure authentication and authorization

## Live Site
🔗 https://garments-production-tracker-system-90.netlify.app

## User Roles & Permissions

### Admin
1. Manage users (approve, suspend with reason)
2. Manage all products
3. View and manage all orders
4. Access analytics dashboard

### Manager
1. Add new products
2. Manage own products
3. Approve or reject pending orders
4. Add production tracking updates
5. View profile and suspend feedback (if suspended)

###  Buyer
1. View all products
2. Place orders (if approved)
3. Track order production progress
4. View suspend feedback if suspended
5. Cannot place new orders when suspended

## Key Features

###  Authentication & Security
1. Email & Password authentication using Firebase
2. Google Login (Buyer role, Pending status)
3. JWT authentication with token stored in cookies
4. Protected private routes
5. Firebase and MongoDB credentials secured with environment variables

###  Home Page
1. Modern hero section with call-to-action
2. Latest Products section (6 products from MongoDB)
3. How It Works (step-by-step process)
4. Customer feedback carousel
5. Extra custom-designed sections
6. Framer Motion animations

###  Products
1. All Products page with 3-column grid layout
2. Product Details page (Private Route)
3. Order booking with quantity & price validation
4. Minimum Order Quantity (MOQ) enforced

###  Dashboard
1. Admin Dashboard: Users, Products, Orders, Analytics
2. Manager Dashboard: Add Product, Pending Orders, Approved Orders
3. Buyer Dashboard: My Orders, Track Order, Profile

###  Order Tracking
1. Visual timeline of production stages
2. Latest tracking step highlighted
3. Read-only tracking for buyers
4. Optional location/map tracking

##  UI / UX Features
1. Fully responsive (mobile, tablet, desktop)
2. Dark / Light theme toggle
3. Clean, recruiter-friendly design
4. Consistent color contrast and spacing
5. Reusable components and modals
6. Custom 404 Not Found page
7. Dynamic page titles

## Additional Functionalities
1. Search and filter functionality
2. Pagination on selected pages
3. Toast notifications for all actions
4. Loading spinner during data fetching
5. Analytics charts (Bar, Line, Pie)

## Technologies & Packages Used

### Frontend
1. React
2. React Router 
3. Tailwind CSS
4. Framer Motion
5. Axios
6. Firebase Authentication
7. React Hook Form
8. React Hot Toast

### Backend
1. Node.js
2. Express.js
3. MongoDB
4. Mongoose
5. JWT (JSON Web Token)
6. Cookie Parser
7. CORS
8. dotenv
