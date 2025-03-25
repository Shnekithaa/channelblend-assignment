# 🛍️ Simplified Product Display Web Application

## 🎯 Overview
This project is a **modern, interactive, and responsive e-commerce web application** that showcases shoes for men, with a focus on **frontend development, UI/UX design, and smooth interactions**. It features a **dynamic product listing, product detail pages, a shopping cart, and a barcode scanner**. Built using **React.js**, **Tailwind CSS**, and **Framer Motion**, the application offers a seamless shopping experience.

---

## 🚀 Features
### 🏠 **Home Page**
- Displays **highly purchased products**.
- Smooth **animations and transitions** using **Framer Motion**.
- Modern **custom cursor** powered by **react-mouse-follower**.

### 🔗 **Navigation (Navbar)**
- Fully responsive **navbar with React Router**.
- **Hamburger menu** for mobile users.

### 👟 **Mens Section (Product Listing)**
- Displays a collection of **shoes for men**.
- Clicking a product **opens a detailed product page**.

### 📄 **Product Detail Page**
- Shows **product description, reviews, ratings, sizes, and images**.
- Includes an **'Add to Cart'** button.

### 🛒 **Shopping Cart ('My Bag')**
- Displays **all added items**.
- Shows the **total amount**.
- Users can **remove items**.
- If empty, displays a **'No items in cart'** message.
- Uses **React Context API** for state management.

### 📩 **Contact Page**
- Users can **send queries via email**.
- **Embedded Google Map** to show the store's location.

### 🔗 **Footer Section**
- Contains **quick links & social media links**.
- Uses **react-icons** for stylish icons.

### 📱 **Fully Responsive Design**
- Optimized for **desktop & mobile**.
- **Hamburger menu** for easy mobile navigation.

### 📷 **Barcode & QR Code Scanner**
- Built with **react-zxing**.
- **Two options:**
  1. **Scan live using the camera**.
  2. **Upload an image containing a barcode/QR code**.
- **Copy or clear detected codes**.
- Supports **multiple barcode formats**.

### 🎨 **Smooth UX & Animations**
- **Framer Motion** applied across all pages for transitions.

---

## 🛠️ Tech Stack
- **Frontend**: React.js, React Router
- **Styling**: Tailwind CSS, Framer Motion
- **Icons**: Lucide-react, React Icons
- **State Management**: React Context API
- **Barcode Scanner**: react-zxing
- **Custom Cursor**: react-mouse-follower
- **Email Queries**: React Contact Form

---

## 📂 Project Structure
```
📦 channelblend-assignment
├── 📁 components          # Reusable UI Components (Navbar, Footer, ProductList, etc.)
├── 📁 pages               # Page Components (Home, Cart, Contact, BarcodeScanner)
├── 📁 context             # Context API for Global State Management
├── 📄 App.jsx             # Main Application Component
├── 📄 main.jsx            # Renders App into the DOM
├── 📄 index.css           # Tailwind CSS & global styles
└── 📄 README.md           # Documentation
```

---

## 🛠️ Installation & Setup
Follow these steps to run the project locally:

### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/Shnekithaa/channelblend-assignment.git
cd channelblend-assignment
cd frontend
cd vite
```

### 2️⃣ **Install Dependencies**
```sh
npm install
```

### 3️⃣ **Run the Development Server**
```sh
npm run dev
```

### 4️⃣ **Open in Browser**
Visit `http://localhost:5173/` to view the application.

---

## 📖 How It Works
### 🔹 **Routing**
- Uses `react-router-dom` for seamless navigation.

### 🔹 **State Management**
- **Cart state** is managed globally with **React Context API**.

### 🔹 **Styling**
- **Tailwind CSS** ensures a beautiful and responsive UI.

### 🔹 **Barcode Scanner**
- Available at `/barcode-scanner`, supports live scanning & image uploads.

---

## ❓ Challenges & Learnings
### 🚧 **Challenges Faced**
- Implementing **smooth state management** in the cart.
- Making the UI **fully responsive**.
- Integrating **barcode scanning** with React.

### 💡 **Solutions & Takeaways**
- Used **React Context API** for efficient cart management.
- Applied **Tailwind CSS** for styling consistency.
- Leveraged **react-zxing** for advanced barcode scanning.

---

## 📌 Future Enhancements
🚀 Add **user authentication** for personalized shopping.  
🚀 Improve **product filtering and search**.  
🚀 Integrate **real-time backend (Firebase/MongoDB)**.  

---


## 🙌 Acknowledgements
Used **open-source libraries** like React, Tailwind CSS, and Framer Motion for making this project possible.

---


⭐ **If you like this project, please give it a star on GitHub!** ⭐
