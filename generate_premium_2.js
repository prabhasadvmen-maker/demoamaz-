import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src');

const ensureDir = (filePath) => fs.mkdirSync(path.dirname(filePath), { recursive: true });

const files = {
  // --- PHASE 2: CATEGORIES ---
  'data/categories.js': `
export const categories = [
  { id: 'electronics', name: 'Electronics', icon: '📱', image: 'https://picsum.photos/seed/electronics/300/200', count: 8 },
  { id: 'fashion', name: 'Fashion', icon: '👗', image: 'https://picsum.photos/seed/fashion/300/200', count: 6 },
  { id: 'home-kitchen', name: 'Home & Kitchen', icon: '🏠', image: 'https://picsum.photos/seed/kitchen/300/200', count: 4 },
  { id: 'grocery', name: 'Grocery', icon: '🛒', image: 'https://picsum.photos/seed/grocery/300/200', count: 3 },
  { id: 'beauty', name: 'Beauty & Care', icon: '✨', image: 'https://picsum.photos/seed/beauty/300/200', count: 3 },
  { id: 'sports', name: 'Sports & Fitness', icon: '⚽', image: 'https://picsum.photos/seed/sports/300/200', count: 2 },
  { id: 'footwear', name: 'Footwear', icon: '👟', image: 'https://picsum.photos/seed/footwear/300/200', count: 2 },
  { id: 'watches', name: 'Watches', icon: '⌚', image: 'https://picsum.photos/seed/watches/300/200', count: 2 },
  { id: 'books', name: 'Books', icon: '📚', image: 'https://picsum.photos/seed/books/300/200', count: 0 },
  { id: 'toys', name: 'Toys & Games', icon: '🎮', image: 'https://picsum.photos/seed/toys/300/200', count: 0 },
];
`,

  // --- PHASE 2: VENDORS ---
  'data/vendors.js': `
export const vendors = [
  {
    id: 'v1', name: 'Rajesh Kumar', storeName: 'TechMart India', rating: 4.5, totalProducts: 120, totalOrders: 8450, totalSales: 2840000,
    about: 'TechMart India is a leading electronics retailer based in Delhi, offering genuine products with warranty support since 2015.',
    logo: 'https://picsum.photos/seed/techmart/100/100', banner: 'https://picsum.photos/seed/techmartbanner/800/200',
    location: 'Delhi, India', joinedDate: '2015-03-12',
    policies: { shipping: 'Free shipping on orders above ₹499. Express delivery available.', returns: '7 days easy return policy.', warranty: 'All products come with brand warranty.' },
    isVerified: true, categories: ['Electronics'],
  },
  {
    id: 'v2', name: 'Amit Singh', storeName: 'AudioZone', rating: 4.2, totalProducts: 80, totalOrders: 4200, totalSales: 1250000,
    about: 'Your one stop shop for premium audio equipment, earphones, and headphones.',
    logo: 'https://picsum.photos/seed/audiozone/100/100', banner: 'https://picsum.photos/seed/audiozonebanner/800/200',
    location: 'Mumbai, India', joinedDate: '2018-07-21',
    policies: { shipping: 'Standard delivery in 3-5 days.', returns: '14 days replacement guarantee.', warranty: 'Manufacturer warranty applicable.' },
    isVerified: true, categories: ['Electronics'],
  },
  {
    id: 'v3', name: 'Priya Sharma', storeName: 'FashionStreet', rating: 4.7, totalProducts: 340, totalOrders: 15000, totalSales: 4500000,
    about: 'Trendy and affordable fashion for men and women.',
    logo: 'https://picsum.photos/seed/fashionstreet/100/100', banner: 'https://picsum.photos/seed/fashionbanner/800/200',
    location: 'Bangalore, India', joinedDate: '2019-01-15',
    policies: { shipping: 'Ships within 24 hours.', returns: '30 days no questions asked return.', warranty: 'N/A' },
    isVerified: true, categories: ['Fashion', 'Footwear'],
  },
  {
    id: 'v4', name: 'Vikram Patel', storeName: 'KitchenKing', rating: 4.8, totalProducts: 150, totalOrders: 9200, totalSales: 3100000,
    about: 'Premium kitchen appliances and home essentials.',
    logo: 'https://picsum.photos/seed/kitchenking/100/100', banner: 'https://picsum.photos/seed/kitchenbanner/800/200',
    location: 'Ahmedabad, India', joinedDate: '2016-11-05',
    policies: { shipping: 'Free shipping PAN India.', returns: '10 days return.', warranty: 'Extended warranty available.' },
    isVerified: true, categories: ['Home & Kitchen'],
  },
  {
    id: 'v5', name: 'Sneha Gupta', storeName: 'GroceryFresh', rating: 4.6, totalProducts: 500, totalOrders: 25000, totalSales: 1500000,
    about: 'Daily essentials delivered fresh to your doorstep.',
    logo: 'https://picsum.photos/seed/groceryfresh/100/100', banner: 'https://picsum.photos/seed/grocerybanner/800/200',
    location: 'Pune, India', joinedDate: '2020-02-10',
    policies: { shipping: 'Same day delivery in select cities.', returns: 'Returns accepted on delivery.', warranty: 'Freshness guaranteed.' },
    isVerified: true, categories: ['Grocery'],
  },
  {
    id: 'v6', name: 'Anjali Desai', storeName: 'BeautyBliss', rating: 4.4, totalProducts: 210, totalOrders: 6700, totalSales: 1800000,
    about: 'Authentic beauty and personal care products.',
    logo: 'https://picsum.photos/seed/beautybliss/100/100', banner: 'https://picsum.photos/seed/beautybanner/800/200',
    location: 'Hyderabad, India', joinedDate: '2017-09-23',
    policies: { shipping: 'Ships in 1-2 days.', returns: 'No returns on opened cosmetics.', warranty: '100% original products.' },
    isVerified: true, categories: ['Beauty & Care'],
  },
  {
    id: 'v7', name: 'Rohan Kapoor', storeName: 'SportsZone', rating: 4.9, totalProducts: 90, totalOrders: 3400, totalSales: 2200000,
    about: 'Top quality sports gear and fitness equipment.',
    logo: 'https://picsum.photos/seed/sportszone/100/100', banner: 'https://picsum.photos/seed/sportsbanner/800/200',
    location: 'Chandigarh, India', joinedDate: '2021-04-18',
    policies: { shipping: 'Oversized items require special shipping.', returns: '14 days return policy.', warranty: 'Standard brand warranty.' },
    isVerified: true, categories: ['Sports & Fitness'],
  },
  {
    id: 'v8', name: 'Neha Joshi', storeName: 'FootwearWorld', rating: 4.3, totalProducts: 180, totalOrders: 5100, totalSales: 1600000,
    about: 'Comfortable and stylish footwear for all occasions.',
    logo: 'https://picsum.photos/seed/footwearworld/100/100', banner: 'https://picsum.photos/seed/footwearbanner/800/200',
    location: 'Kolkata, India', joinedDate: '2018-12-01',
    policies: { shipping: 'Free shipping.', returns: '30 days easy exchange.', warranty: '3 months sole warranty.' },
    isVerified: false, categories: ['Footwear'],
  },
];
`,

  // --- PHASE 2: ORDERS ---
  'data/orders.js': `
export const mockOrders = [
  {
    id: 'ORD-2024-001', date: '2024-12-15', customerId: 'customer1',
    products: [{ productId: 'p1', name: 'boAt Rockerz 450 Bluetooth Headphone', brand: 'boAt', image: 'https://picsum.photos/seed/boat450/400/400', price: 1299, quantity: 1, seller: 'TechMart India' }],
    address: { name: 'Rahul Sharma', phone: '9876543210', line1: '42, Sector 15', city: 'Noida', state: 'Uttar Pradesh', pincode: '201301' },
    paymentMethod: 'UPI', paymentStatus: 'paid', status: 'delivered',
    timeline: [
      { status: 'Order Placed', date: '2024-12-15 10:30', done: true },
      { status: 'Confirmed', date: '2024-12-15 11:00', done: true },
      { status: 'Processing', date: '2024-12-15 14:00', done: true },
      { status: 'Packed', date: '2024-12-16 09:00', done: true },
      { status: 'Shipped', date: '2024-12-16 15:00', done: true },
      { status: 'Out for Delivery', date: '2024-12-18 08:00', done: true },
      { status: 'Delivered', date: '2024-12-18 14:30', done: true },
    ],
    subtotal: 1299, discount: 0, deliveryCharge: 0, total: 1299, estimatedDelivery: '2024-12-18',
  },
  {
    id: 'ORD-2024-002', date: '2024-12-20', customerId: 'customer1',
    products: [{ productId: 'p10', name: 'Peter England Men\\'s Formal Shirt', brand: 'Peter England', image: 'https://picsum.photos/seed/peterengland/400/400', price: 999, quantity: 2, seller: 'FashionStreet' }],
    address: { name: 'Rahul Sharma', phone: '9876543210', line1: '42, Sector 15', city: 'Noida', state: 'Uttar Pradesh', pincode: '201301' },
    paymentMethod: 'Credit Card', paymentStatus: 'paid', status: 'shipped',
    timeline: [
      { status: 'Order Placed', date: '2024-12-20 09:15', done: true },
      { status: 'Confirmed', date: '2024-12-20 09:30', done: true },
      { status: 'Processing', date: '2024-12-20 11:00', done: true },
      { status: 'Packed', date: '2024-12-21 10:00', done: true },
      { status: 'Shipped', date: '2024-12-21 16:00', done: true },
      { status: 'Out for Delivery', date: null, done: false },
      { status: 'Delivered', date: null, done: false },
    ],
    subtotal: 1998, discount: 100, deliveryCharge: 0, total: 1898, estimatedDelivery: '2024-12-24',
  },
  {
    id: 'ORD-2024-003', date: '2024-12-22', customerId: 'customer1',
    products: [{ productId: 'p20', name: 'Prestige Pressure Cooker 5L', brand: 'Prestige', image: 'https://picsum.photos/seed/prestige/400/400', price: 1450, quantity: 1, seller: 'KitchenKing' }],
    address: { name: 'Rahul Sharma', phone: '9876543210', line1: '42, Sector 15', city: 'Noida', state: 'Uttar Pradesh', pincode: '201301' },
    paymentMethod: 'Cash on Delivery', paymentStatus: 'pending', status: 'processing',
    timeline: [
      { status: 'Order Placed', date: '2024-12-22 18:45', done: true },
      { status: 'Confirmed', date: '2024-12-22 19:00', done: true },
      { status: 'Processing', date: '2024-12-23 09:00', done: true },
      { status: 'Packed', date: null, done: false },
      { status: 'Shipped', date: null, done: false },
      { status: 'Out for Delivery', date: null, done: false },
      { status: 'Delivered', date: null, done: false },
    ],
    subtotal: 1450, discount: 0, deliveryCharge: 50, total: 1500, estimatedDelivery: '2024-12-26',
  }
];
`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join(srcDir, filepath);
  ensureDir(fullPath);
  fs.writeFileSync(fullPath, content);
});
console.log("Phase 2 (Categories, Vendors, Orders) Generation Complete");
