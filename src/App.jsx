
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import SearchPage from './pages/SearchPage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import WishlistPage from './pages/WishlistPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import SellerPage from './pages/SellerPage';
import OffersPage from './pages/OffersPage';
import CategoriesPage from './pages/CategoriesPage';

// Simple Register Page placeholder
const RegisterPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-200 w-full max-w-md text-center">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Create Account</h2>
      <p className="text-slate-500 mb-8">This is a demo marketplace. Please use the Demo Logins on the Login page instead.</p>
      <button onClick={() => window.location.hash = '#/login'} className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl">Go to Login</button>
    </div>
  </div>
);

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="category/:id" element={<CategoryPage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="order-success" element={<OrderSuccessPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/:id" element={<OrderDetailPage />} />
          <Route path="seller/:id" element={<SellerPage />} />
          <Route path="offers" element={<OffersPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="*" element={<div className="p-32 text-center text-slate-500 text-2xl font-black">404 - Page not found</div>} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
export default App;
