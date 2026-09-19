import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'src');

const files = {
  'index.css': `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import "tailwindcss";

@theme {
  --color-primary: #2563EB;
  --color-primary-600: #2563EB;
  --color-accent: #F97316;
  --color-accent-500: #F97316;
  --font-sans: "Inter", sans-serif;
}

body {
  font-family: "Inter", sans-serif;
  background-color: #F8FAFC;
  color: #0F172A;
  -webkit-font-smoothing: antialiased;
}
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: #F1F5F9; }
::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #94A3B8; }
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`,
  'main.jsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  'App.jsx': `import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
export default App;`,
  'data/categories.js': `export const categories = [
  { id: 'c1', name: 'Electronics', image: 'https://picsum.photos/seed/Electronics/300/200' },
  { id: 'c2', name: 'Fashion', image: 'https://picsum.photos/seed/Fashion/300/200' },
  { id: 'c3', name: 'Home & Kitchen', image: 'https://picsum.photos/seed/HomeKitchen/300/200' },
  { id: 'c4', name: 'Grocery', image: 'https://picsum.photos/seed/Grocery/300/200' },
  { id: 'c5', name: 'Beauty & Personal Care', image: 'https://picsum.photos/seed/Beauty/300/200' },
  { id: 'c6', name: 'Sports & Fitness', image: 'https://picsum.photos/seed/Sports/300/200' },
  { id: 'c7', name: 'Books & Stationery', image: 'https://picsum.photos/seed/Books/300/200' },
  { id: 'c8', name: 'Toys & Games', image: 'https://picsum.photos/seed/Toys/300/200' },
  { id: 'c9', name: 'Watches', image: 'https://picsum.photos/seed/Watches/300/200' },
  { id: 'c10', name: 'Footwear', image: 'https://picsum.photos/seed/Footwear/300/200' }
];`,
  'data/vendors.js': `export const vendors = [
  { id: 'v1', name: 'Rahul Sharma', storeName: 'ElectroHub India', rating: 4.8, totalProducts: 120 },
  { id: 'v2', name: 'Priya Patel', storeName: 'FashionFiesta', rating: 4.5, totalProducts: 340 }
];`,
  'layouts/MainLayout.jsx': `import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}`,
  'components/Header.jsx': `import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="bg-primary-600 text-white text-xs py-1 text-center font-medium tracking-wide">
        Free delivery on orders above ₹499
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-slate-600 hover:text-primary-600">
              <Menu size={24} />
            </button>
            <Link to="/" className="text-2xl font-bold text-primary-600 flex items-center gap-2">
              <span className="text-accent-500">Bazaar</span>Hub
            </Link>
          </div>
          
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input type="text" placeholder="Search for products, brands and more" className="w-full pl-4 pr-10 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent" />
              <Search className="absolute right-3 top-2.5 text-slate-400" size={20} />
            </div>
          </div>

          <div className="flex items-center gap-6 text-slate-600">
            <Link to="/profile" className="flex flex-col items-center hover:text-primary-600">
              <User size={20} />
              <span className="text-[10px] font-medium mt-1">Profile</span>
            </Link>
            <Link to="/wishlist" className="flex flex-col items-center hover:text-primary-600 relative">
              <Heart size={20} />
              <span className="text-[10px] font-medium mt-1">Wishlist</span>
              <span className="absolute -top-1.5 -right-1.5 bg-accent-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </Link>
            <Link to="/cart" className="flex flex-col items-center hover:text-primary-600 relative">
              <ShoppingCart size={20} />
              <span className="text-[10px] font-medium mt-1">Cart</span>
              <span className="absolute -top-1.5 -right-1.5 bg-accent-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}`,
  'components/Footer.jsx': `import React from 'react';
export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>© 2026 BazaarHub. All rights reserved.</p>
      </div>
    </footer>
  );
}`,
  'pages/HomePage.jsx': `import React from 'react';
export default function HomePage() {
  return (
    <div className="p-8 text-center text-primary-600 text-2xl font-bold">BazaarHub Home</div>
  );
}`,
  'pages/ProductsPage.jsx': `import React from 'react';
export default function ProductsPage() {
  return (
    <div className="p-8 text-center text-primary-600 text-2xl font-bold">Products</div>
  );
}`,
  'pages/ProductDetailPage.jsx': `import React from 'react';
export default function ProductDetailPage() {
  return (
    <div className="p-8 text-center text-primary-600 text-2xl font-bold">Product Detail</div>
  );
}`,
  'pages/CartPage.jsx': `import React from 'react';
export default function CartPage() {
  return (
    <div className="p-8 text-center text-primary-600 text-2xl font-bold">Cart</div>
  );
}`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join(srcDir, filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
});

console.log("Boilerplate generated successfully!");
