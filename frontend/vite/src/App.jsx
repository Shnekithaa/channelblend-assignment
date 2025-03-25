import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import Navbar2 from "./components/Navbar2";
import ProductList from "./components/ProductList";
import SingleProduct from "./components/SingleProduct";
import { UpdateFollower } from "react-mouse-follower";
import BarcodeScanner from "./pages/BarcodeScanner";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "/mens",
    element: (
      <>
        <Navbar2 />
        <ProductList category="men" />
        <Footer />
      </>
    ),
  },
  {
    path: "/womens",
    element: (
      <>
        <Navbar2 />
        <ProductList category="women" />
        <Footer />
      </>
    ),
  },
  {
    path: "/kids",
    element: (
      <>
        <Navbar2 />
        <ProductList category="kid" />
        <Footer />
      </>
    ),
  },
  {
    path: "/contact",
    element: (
      <>
        <Navbar2 />
        <Contact />
        <Footer />
      </>
    ),
  },
  {
    path: "/products/:productId",
    element: (
      <>
        <Navbar2 />
        <SingleProduct />
        <Footer />
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
        <Navbar2 />
        <Cart />
        <Footer />
      </>
    ),
  },
  {
    path: "/barcode-scanner",
    element: (
      <>
        <Navbar2 />
        <BarcodeScanner />
        <Footer />
      </>
    ),
  },
]);

const App = () => {
  return (
    <main className="overflow-x-hidden">
      <UpdateFollower
        mouseOptions={{
          backgroundColor: "white",
          zIndex: 10,
          followSpeed: 1.5,
        }}
      >
        <RouterProvider router={router} />
      </UpdateFollower>
    </main>
  );
};

export default App;
