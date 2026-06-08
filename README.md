# 🧵 Garments Order & Production Tracker System

A robust, enterprise-grade full-stack MERN platform designed to streamline apparel order workflows, optimize factory operations, and deliver real-time production tracking with cutting-edge **AI capabilities**.

🔗 **[Live Site Link](https://garments-production-tracker-system-69.netlify.app)** | 💻 **[Client Repository](#)** | 🖥️ **[Server Repository](#)**

---

## 🚀 Key Achievements & Recent Updates

### 🤖 1. Advanced AI Integrations
* **AI Production Risk Analysis:** Integrated **Gemini 2.5 Flash** to perform live risk analysis. It dynamically calculates **Material & Stock Risks** vs pending demand, evaluates **Timeline Bottlenecks**, and provides instant actionable recommendations.
* **AI Product Description Generator:** Automated cataloging for managers to effortlessly post product specifications.
* **Intelligent AI Chatbot:** Built-in automated assistant providing real-time production support and business logic validation.

### 📊 2. High-Performance Filtering & Exports
* **Optimized Rendering via `useMemo`:** The complete multi-criteria search and status filtering mechanism is memoized on the client side, ensuring zero table lag even with thousands of order records.
* **Weekly & Specific Timeline Filters:** Features a dynamic target dropdown supporting *Last 7 Days (Weekly)*, *Last 30 Days (Monthly)*, and a precise *Custom Date Range* filter using synchronized 'From' and 'To' date inputs.
* **Advanced Data Export:** Integrated specialized data handlers allowing users to export filtered datasets into professional Excel spreadsheets dynamically.
* **Enhanced Invoice Design:** A corporate-grade PDF generation layout with a structured layout, defined borderlines, and color branding.

### 🛡️ 3. Security & Architecture Fixes
* **Route Guards:** Implemented robust backend middleware (`verifyAdmin`, `verifyJWT`) ensuring ironclad access control.
* **Database Fault Tolerance:** Upgraded database connection resilience and fixed typecasting issues by sanitizing and mapping raw inputs dynamically into MongoDB `ObjectId` and `Number` types during execution.

---

## 🎯 Core Purposes of the Project
1. **End-to-End Tracking:** Track bulk garment orders from initial booking through precise factory steps: `Cutting` ➔ `Sewing` ➔ `Finishing` ➔ `Delivery`.
2. **Granular Access Management:** Role-based access control (RBAC) ensuring dedicated views and workflows for Admin, Manager, and Buyer.
3. **Data Integrity:** Strict business logic validation to enforce Minimum Order Quantities (MOQ) and price verification during order processing.

---

## 👥 User Roles & Permissions

### 👑 Admin
* **User Governance:** Approve new accounts or suspend violating users with an mandatory reason specification.
* **Global Access:** Review and modify all platform products, current active order listings, and macro analytics.
* **Data Intelligence:** Interactive business dashboard powered by visual data graphs.

### 👔 Manager
* **Catalog Control:** Manage and create complex apparel variants and stock pools.
* **Order Supervision:** Approve or decline incoming raw bookings requested by active buyers.
* **Live Worklogs:** Update progress logs across distinct active production channels.

### 🛍️ Buyer
* **Interactive Marketplace:** View public catalog metrics and initialize secure bulk order placements.
* **Live Timelines:** Track ongoing step-by-step assembly phases of booked lines on an interactive timeline.

---

## 🧰 Tech Stack & Ecosystem

### Frontend
* **Core:** React.js, Vite
* **Routing & State Handling:** React Router DOM, React Hook Form
* **Style & Motion:** Tailwind CSS, Framer Motion, React Icons
* **Network & Feedback:** Axios (with Secure Context Hooks), React Hot Toast
* **Data Visualization:** Recharts (Bar, Line, Pie charts)

### Backend & Database
* **Runtime & Framework:** Node.js, Express.js
* **Database:** MongoDB (Native Driver / Mongoose)
* **Security & Gateways:** Firebase Auth, JSON Web Tokens (JWT), Cookie-Parser, CORS, Dotenv
* **AI Core Engine:** Google Gen AI SDK (Gemini 2.5 Flash Model)

---
