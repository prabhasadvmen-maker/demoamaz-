import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src');
const ensureDir = (filePath) => fs.mkdirSync(path.dirname(filePath), { recursive: true });

const files = {
  'data/products.js': `
export const products = [
  // Electronics (8)
  {
    id: 'p1', name: 'boAt Rockerz 450 Bluetooth Headphone', brand: 'boAt', category: 'electronics', subcategory: 'Headphones',
    price: 1299, mrp: 2990, discount: 57, rating: 4.2, reviewCount: 89432,
    image: 'https://picsum.photos/seed/boat450/400/400',
    images: ['https://picsum.photos/seed/boat450/400/400', 'https://picsum.photos/seed/boat450b/400/400', 'https://picsum.photos/seed/boat450c/400/400'],
    description: 'boAt Rockerz 450 is an on-ear wireless headphone with 15 hours battery life, 40mm drivers, and foldable design. Perfect for music lovers on the go.',
    specifications: { 'Driver Size': '40mm', 'Battery Life': '15 Hours', 'Bluetooth': 'v5.0', 'Warranty': '1 Year' },
    features: ['15 Hours Playback', 'Bluetooth 5.0', 'Built-in Mic'],
    stock: 150, seller: 'v1', tags: ['wireless', 'headphone', 'music'],
    isNew: false, isBestSeller: true, isTrending: true,
    sellers: [
      { id: 'v1', name: 'TechMart India', price: 1299, rating: 4.5, delivery: 'Tomorrow' },
      { id: 'v2', name: 'AudioZone', price: 1349, rating: 4.2, delivery: '2 Days' }
    ]
  },
  {
    id: 'p2', name: 'Noise ColorFit Pro 4 Smartwatch', brand: 'Noise', category: 'electronics', subcategory: 'Smartwatches',
    price: 2499, mrp: 5999, discount: 58, rating: 4.0, reviewCount: 45210,
    image: 'https://picsum.photos/seed/noise4/400/400',
    images: ['https://picsum.photos/seed/noise4/400/400', 'https://picsum.photos/seed/noise4b/400/400'],
    description: 'Noise ColorFit Pro 4 with 1.72" TruView Display, Bluetooth Calling, and 60Hz Refresh Rate.',
    specifications: { 'Display': '1.72 inch', 'Battery': '7 Days', 'Water Resistant': 'IP68' },
    features: ['Bluetooth Calling', 'SpO2 Monitor', '100+ Sports Modes'],
    stock: 200, seller: 'v1', tags: ['smartwatch', 'fitness', 'noise'],
    isNew: true, isBestSeller: true, isTrending: true,
    sellers: [
      { id: 'v1', name: 'TechMart India', price: 2499, rating: 4.5, delivery: 'Tomorrow' },
      { id: 'v2', name: 'AudioZone', price: 2599, rating: 4.2, delivery: '3 Days' }
    ]
  },
  {
    id: 'p3', name: 'OnePlus Nord CE 3 Lite 5G', brand: 'OnePlus', category: 'electronics', subcategory: 'Mobiles',
    price: 19999, mrp: 21999, discount: 9, rating: 4.4, reviewCount: 11200,
    image: 'https://picsum.photos/seed/nordce3/400/400',
    images: ['https://picsum.photos/seed/nordce3/400/400'],
    description: '108 MP Camera, 67W SUPERVOOC Charging, 120Hz Display.',
    specifications: { 'RAM': '8GB', 'Storage': '128GB', 'Processor': 'Snapdragon 695' },
    features: ['5G Ready', '108MP Camera', '67W Charging'],
    stock: 50, seller: 'v1', tags: ['smartphone', '5g', 'oneplus'],
    isNew: false, isBestSeller: true, isTrending: false,
    sellers: [{ id: 'v1', name: 'TechMart India', price: 19999, rating: 4.5, delivery: 'Tomorrow' }]
  },
  {
    id: 'p4', name: 'Redmi Note 13 5G', brand: 'Redmi', category: 'electronics', subcategory: 'Mobiles',
    price: 16999, mrp: 20999, discount: 19, rating: 4.3, reviewCount: 8900,
    image: 'https://picsum.photos/seed/redminote13/400/400',
    images: ['https://picsum.photos/seed/redminote13/400/400'],
    description: 'Super-thin 5G smartphone with AMOLED display.',
    specifications: { 'RAM': '6GB', 'Storage': '128GB', 'Display': 'AMOLED' },
    features: ['120Hz AMOLED', '33W Fast Charge'],
    stock: 80, seller: 'v1', tags: ['smartphone', 'redmi'],
    isNew: true, isBestSeller: false, isTrending: true,
    sellers: [{ id: 'v1', name: 'TechMart India', price: 16999, rating: 4.5, delivery: '2 Days' }]
  },
  {
    id: 'p5', name: 'boAt Airdopes 141', brand: 'boAt', category: 'electronics', subcategory: 'Earbuds',
    price: 999, mrp: 4490, discount: 78, rating: 4.1, reviewCount: 156000,
    image: 'https://picsum.photos/seed/airdopes141/400/400',
    images: ['https://picsum.photos/seed/airdopes141/400/400'],
    description: 'True Wireless Earbuds with 42H Playtime.',
    specifications: { 'Playtime': '42H', 'Water Resistance': 'IPX4' },
    features: ['Fast Charge', 'Beast Mode for Gaming'],
    stock: 300, seller: 'v2', tags: ['tws', 'audio', 'boat'],
    isNew: false, isBestSeller: true, isTrending: true,
    sellers: [{ id: 'v2', name: 'AudioZone', price: 999, rating: 4.2, delivery: 'Next Day' }]
  },
  {
    id: 'p6', name: 'HP 15s Laptop', brand: 'HP', category: 'electronics', subcategory: 'Laptops',
    price: 38990, mrp: 47141, discount: 17, rating: 4.2, reviewCount: 4500,
    image: 'https://picsum.photos/seed/hp15s/400/400',
    images: ['https://picsum.photos/seed/hp15s/400/400'],
    description: 'HP 15s, 11th Gen Intel Core i3, 8GB RAM, 512GB SSD.',
    specifications: { 'Processor': 'Intel i3 11th Gen', 'RAM': '8GB', 'Storage': '512GB SSD' },
    features: ['Windows 11', 'MS Office included', 'FHD Display'],
    stock: 20, seller: 'v1', tags: ['laptop', 'hp', 'computer'],
    isNew: false, isBestSeller: false, isTrending: false,
    sellers: [{ id: 'v1', name: 'TechMart India', price: 38990, rating: 4.5, delivery: '3 Days' }]
  },
  {
    id: 'p7', name: 'Realme Narzo 60 5G', brand: 'Realme', category: 'electronics', subcategory: 'Mobiles',
    price: 17999, mrp: 19999, discount: 10, rating: 4.3, reviewCount: 6700,
    image: 'https://picsum.photos/seed/narzo60/400/400',
    images: ['https://picsum.photos/seed/narzo60/400/400'],
    description: 'Premium vegan leather design, 90Hz Super AMOLED.',
    specifications: { 'RAM': '8GB', 'Storage': '128GB' },
    features: ['Premium Leather Design', '64MP Camera'],
    stock: 45, seller: 'v1', tags: ['realme', '5g'],
    isNew: true, isBestSeller: false, isTrending: true,
    sellers: [{ id: 'v1', name: 'TechMart India', price: 17999, rating: 4.5, delivery: '2 Days' }]
  },
  {
    id: 'p8', name: 'Sony WH-1000XM4', brand: 'Sony', category: 'electronics', subcategory: 'Headphones',
    price: 22990, mrp: 29990, discount: 23, rating: 4.7, reviewCount: 12400,
    image: 'https://picsum.photos/seed/sonyxm4/400/400',
    images: ['https://picsum.photos/seed/sonyxm4/400/400'],
    description: 'Industry leading noise canceling headphones.',
    specifications: { 'Battery': '30 Hours', 'Noise Cancellation': 'Active' },
    features: ['Dual Noise Sensor', 'Speak-to-chat'],
    stock: 15, seller: 'v2', tags: ['premium', 'audio', 'sony'],
    isNew: false, isBestSeller: false, isTrending: true,
    sellers: [{ id: 'v2', name: 'AudioZone', price: 22990, rating: 4.2, delivery: 'Tomorrow' }]
  },

  // Fashion (6)
  {
    id: 'p9', name: 'Peter England Men\\'s Formal Shirt', brand: 'Peter England', category: 'fashion', subcategory: 'Shirts',
    price: 899, mrp: 1599, discount: 43, rating: 4.1, reviewCount: 3200,
    image: 'https://picsum.photos/seed/petershirt/400/400',
    images: ['https://picsum.photos/seed/petershirt/400/400'],
    description: 'Slim fit cotton formal shirt.',
    specifications: { 'Material': 'Cotton', 'Fit': 'Slim Fit' },
    features: ['Machine Wash', 'Wrinkle Resistant'],
    stock: 100, seller: 'v3', tags: ['shirt', 'formal', 'men'],
    isNew: false, isBestSeller: true, isTrending: false,
    sellers: [{ id: 'v3', name: 'FashionStreet', price: 899, rating: 4.7, delivery: '2 Days' }]
  },
  {
    id: 'p10', name: 'Allen Solly Chinos', brand: 'Allen Solly', category: 'fashion', subcategory: 'Trousers',
    price: 1299, mrp: 2499, discount: 48, rating: 4.3, reviewCount: 2100,
    image: 'https://picsum.photos/seed/allensolly/400/400',
    images: ['https://picsum.photos/seed/allensolly/400/400'],
    description: 'Comfortable stretch chinos for everyday wear.',
    specifications: { 'Material': 'Cotton Blend', 'Fit': 'Regular Fit' },
    features: ['Stretchable', '4 Pockets'],
    stock: 80, seller: 'v3', tags: ['pants', 'casual', 'men'],
    isNew: true, isBestSeller: false, isTrending: true,
    sellers: [{ id: 'v3', name: 'FashionStreet', price: 1299, rating: 4.7, delivery: '2 Days' }]
  },
  {
    id: 'p11', name: 'Biba Women\\'s Kurta', brand: 'Biba', category: 'fashion', subcategory: 'Ethnic',
    price: 1499, mrp: 2999, discount: 50, rating: 4.5, reviewCount: 5600,
    image: 'https://picsum.photos/seed/bibakurta/400/400',
    images: ['https://picsum.photos/seed/bibakurta/400/400'],
    description: 'Elegant printed straight kurta.',
    specifications: { 'Fabric': 'Cotton', 'Pattern': 'Printed' },
    features: ['Hand Wash', 'Breathable Fabric'],
    stock: 60, seller: 'v3', tags: ['ethnic', 'women', 'kurta'],
    isNew: false, isBestSeller: true, isTrending: true,
    sellers: [{ id: 'v3', name: 'FashionStreet', price: 1499, rating: 4.7, delivery: '2 Days' }]
  },
  {
    id: 'p12', name: 'W Women\\'s Anarkali', brand: 'W', category: 'fashion', subcategory: 'Ethnic',
    price: 2199, mrp: 4499, discount: 51, rating: 4.2, reviewCount: 1800,
    image: 'https://picsum.photos/seed/wanarkali/400/400',
    images: ['https://picsum.photos/seed/wanarkali/400/400'],
    description: 'Beautiful festive wear Anarkali suit.',
    specifications: { 'Fabric': 'Silk Blend', 'Occasion': 'Festive' },
    features: ['Dry Clean Only', 'Premium Embroidery'],
    stock: 30, seller: 'v3', tags: ['ethnic', 'women', 'festive'],
    isNew: true, isBestSeller: false, isTrending: false,
    sellers: [{ id: 'v3', name: 'FashionStreet', price: 2199, rating: 4.7, delivery: '3 Days' }]
  },
  {
    id: 'p13', name: 'Levi\\'s 511 Slim Jeans', brand: 'Levi\\'s', category: 'fashion', subcategory: 'Jeans',
    price: 2099, mrp: 3499, discount: 40, rating: 4.4, reviewCount: 8900,
    image: 'https://picsum.photos/seed/levis511/400/400',
    images: ['https://picsum.photos/seed/levis511/400/400'],
    description: 'Classic Levi\\'s 511 slim fit denim jeans.',
    specifications: { 'Material': 'Denim', 'Fit': 'Slim Fit' },
    features: ['Durable', 'Classic 5-pocket'],
    stock: 120, seller: 'v3', tags: ['jeans', 'denim', 'men'],
    isNew: false, isBestSeller: true, isTrending: true,
    sellers: [{ id: 'v3', name: 'FashionStreet', price: 2099, rating: 4.7, delivery: '2 Days' }]
  },
  {
    id: 'p14', name: 'Van Heusen Polo T-Shirt', brand: 'Van Heusen', category: 'fashion', subcategory: 'T-Shirts',
    price: 799, mrp: 1499, discount: 46, rating: 4.0, reviewCount: 4500,
    image: 'https://picsum.photos/seed/vanheusen/400/400',
    images: ['https://picsum.photos/seed/vanheusen/400/400'],
    description: 'Solid polo neck t-shirt for casual outings.',
    specifications: { 'Material': 'Cotton', 'Collar': 'Polo' },
    features: ['Soft fabric', 'Regular fit'],
    stock: 200, seller: 'v3', tags: ['tshirt', 'polo', 'casual'],
    isNew: false, isBestSeller: false, isTrending: false,
    sellers: [{ id: 'v3', name: 'FashionStreet', price: 799, rating: 4.7, delivery: 'Next Day' }]
  },

  // Home & Kitchen (4)
  {
    id: 'p15', name: 'Prestige Pressure Cooker 5L', brand: 'Prestige', category: 'home-kitchen', subcategory: 'Cookware',
    price: 1549, mrp: 2100, discount: 26, rating: 4.4, reviewCount: 32000,
    image: 'https://picsum.photos/seed/prestige5l/400/400',
    images: ['https://picsum.photos/seed/prestige5l/400/400'],
    description: 'Stainless steel pressure cooker with induction base.',
    specifications: { 'Capacity': '5 Liters', 'Material': 'Stainless Steel', 'Base': 'Induction & Gas' },
    features: ['Safety Valve', 'Heavy Base'],
    stock: 150, seller: 'v4', tags: ['kitchen', 'cooker'],
    isNew: false, isBestSeller: true, isTrending: true,
    sellers: [{ id: 'v4', name: 'KitchenKing', price: 1549, rating: 4.8, delivery: 'Tomorrow' }]
  },
  {
    id: 'p16', name: 'Philips Air Fryer HD9200', brand: 'Philips', category: 'home-kitchen', subcategory: 'Appliances',
    price: 6999, mrp: 9995, discount: 30, rating: 4.6, reviewCount: 14500,
    image: 'https://picsum.photos/seed/philipsair/400/400',
    images: ['https://picsum.photos/seed/philipsair/400/400'],
    description: 'Healthy cooking with 90% less fat using Rapid Air Technology.',
    specifications: { 'Capacity': '4.1L', 'Power': '1400W' },
    features: ['Auto Off', 'Temperature Control', 'Dishwasher Safe'],
    stock: 45, seller: 'v4', tags: ['appliance', 'kitchen', 'health'],
    isNew: false, isBestSeller: true, isTrending: true,
    sellers: [{ id: 'v4', name: 'KitchenKing', price: 6999, rating: 4.8, delivery: '2 Days' }]
  },
  {
    id: 'p17', name: 'Milton Thermosteel Flask', brand: 'Milton', category: 'home-kitchen', subcategory: 'Storage',
    price: 799, mrp: 1150, discount: 30, rating: 4.3, reviewCount: 22000,
    image: 'https://picsum.photos/seed/milton/400/400',
    images: ['https://picsum.photos/seed/milton/400/400'],
    description: '24 hours hot/cold vacuum insulated steel flask.',
    specifications: { 'Capacity': '1000ml', 'Material': 'Steel' },
    features: ['Leak Proof', 'Rust Proof'],
    stock: 300, seller: 'v4', tags: ['bottle', 'kitchen', 'flask'],
    isNew: false, isBestSeller: true, isTrending: false,
    sellers: [{ id: 'v4', name: 'KitchenKing', price: 799, rating: 4.8, delivery: 'Tomorrow' }]
  },
  {
    id: 'p18', name: 'Pigeon Induction Cooktop', brand: 'Pigeon', category: 'home-kitchen', subcategory: 'Appliances',
    price: 1399, mrp: 3195, discount: 56, rating: 4.1, reviewCount: 45000,
    image: 'https://picsum.photos/seed/pigeon/400/400',
    images: ['https://picsum.photos/seed/pigeon/400/400'],
    description: '1800 Watt induction cooktop with push buttons.',
    specifications: { 'Power': '1800W', 'Control': 'Push Button' },
    features: ['7 Preset Menus', 'Auto Shut Off'],
    stock: 120, seller: 'v4', tags: ['appliance', 'kitchen'],
    isNew: false, isBestSeller: true, isTrending: true,
    sellers: [{ id: 'v4', name: 'KitchenKing', price: 1399, rating: 4.8, delivery: '2 Days' }]
  },

  // Grocery (3)
  {
    id: 'p19', name: 'Tata Salt 1kg', brand: 'Tata', category: 'grocery', subcategory: 'Staples',
    price: 25, mrp: 28, discount: 10, rating: 4.8, reviewCount: 150000,
    image: 'https://picsum.photos/seed/tatasalt/400/400',
    images: ['https://picsum.photos/seed/tatasalt/400/400'],
    description: 'Vacuum evaporated iodised salt.',
    specifications: { 'Weight': '1kg', 'Type': 'Iodised' },
    features: ['Purity Guaranteed', 'Right Iodine Content'],
    stock: 500, seller: 'v5', tags: ['grocery', 'salt', 'staples'],
    isNew: false, isBestSeller: true, isTrending: false,
    sellers: [{ id: 'v5', name: 'GroceryFresh', price: 25, rating: 4.6, delivery: 'Today' }]
  },
  {
    id: 'p20', name: 'Aashirvaad Atta 5kg', brand: 'Aashirvaad', category: 'grocery', subcategory: 'Staples',
    price: 235, mrp: 260, discount: 9, rating: 4.7, reviewCount: 85000,
    image: 'https://picsum.photos/seed/atta/400/400',
    images: ['https://picsum.photos/seed/atta/400/400'],
    description: 'Whole wheat chakki fresh atta.',
    specifications: { 'Weight': '5kg', 'Type': 'Whole Wheat' },
    features: ['0% Maida', 'Soft Rotis'],
    stock: 250, seller: 'v5', tags: ['grocery', 'atta', 'flour'],
    isNew: false, isBestSeller: true, isTrending: true,
    sellers: [{ id: 'v5', name: 'GroceryFresh', price: 235, rating: 4.6, delivery: 'Today' }]
  },
  {
    id: 'p21', name: 'Fortune Sunflower Oil 1L', brand: 'Fortune', category: 'grocery', subcategory: 'Oils',
    price: 135, mrp: 165, discount: 18, rating: 4.6, reviewCount: 42000,
    image: 'https://picsum.photos/seed/fortune/400/400',
    images: ['https://picsum.photos/seed/fortune/400/400'],
    description: 'Light and healthy sunflower oil.',
    specifications: { 'Volume': '1 Liter', 'Type': 'Sunflower' },
    features: ['Rich in Vitamins', 'Easy to Digest'],
    stock: 300, seller: 'v5', tags: ['grocery', 'oil', 'cooking'],
    isNew: false, isBestSeller: true, isTrending: false,
    sellers: [{ id: 'v5', name: 'GroceryFresh', price: 135, rating: 4.6, delivery: 'Today' }]
  },

  // Beauty (3)
  {
    id: 'p22', name: 'Mamaearth Vitamin C Face Wash', brand: 'Mamaearth', category: 'beauty', subcategory: 'Skincare',
    price: 224, mrp: 259, discount: 13, rating: 4.4, reviewCount: 56000,
    image: 'https://picsum.photos/seed/mamaearth/400/400',
    images: ['https://picsum.photos/seed/mamaearth/400/400'],
    description: 'Vitamin C face wash with Turmeric for skin illumination.',
    specifications: { 'Volume': '100ml', 'Skin Type': 'All Skin Types' },
    features: ['Paraben Free', 'Dermatologically Tested'],
    stock: 180, seller: 'v6', tags: ['beauty', 'skincare', 'face wash'],
    isNew: false, isBestSeller: true, isTrending: true,
    sellers: [{ id: 'v6', name: 'BeautyBliss', price: 224, rating: 4.4, delivery: '2 Days' }]
  },
  {
    id: 'p23', name: 'Lakme 9to5 Primer', brand: 'Lakme', category: 'beauty', subcategory: 'Makeup',
    price: 399, mrp: 499, discount: 20, rating: 4.3, reviewCount: 21000,
    image: 'https://picsum.photos/seed/lakme/400/400',
    images: ['https://picsum.photos/seed/lakme/400/400'],
    description: 'Flawless makeup primer for matte finish.',
    specifications: { 'Weight': '30g', 'Finish': 'Matte' },
    features: ['Blurs Pores', 'Long Lasting'],
    stock: 120, seller: 'v6', tags: ['beauty', 'makeup', 'primer'],
    isNew: false, isBestSeller: true, isTrending: false,
    sellers: [{ id: 'v6', name: 'BeautyBliss', price: 399, rating: 4.4, delivery: '2 Days' }]
  },
  {
    id: 'p24', name: 'Himalaya Neem Face Pack', brand: 'Himalaya', category: 'beauty', subcategory: 'Skincare',
    price: 115, mrp: 130, discount: 11, rating: 4.5, reviewCount: 89000,
    image: 'https://picsum.photos/seed/himalaya/400/400',
    images: ['https://picsum.photos/seed/himalaya/400/400'],
    description: 'Purifying neem face pack for pimple clear skin.',
    specifications: { 'Weight': '100g', 'Skin Type': 'Normal to Oily' },
    features: ['Ayurvedic', 'Clears Pimples'],
    stock: 250, seller: 'v6', tags: ['beauty', 'skincare', 'neem'],
    isNew: false, isBestSeller: true, isTrending: false,
    sellers: [{ id: 'v6', name: 'BeautyBliss', price: 115, rating: 4.4, delivery: 'Tomorrow' }]
  },

  // Sports (2)
  {
    id: 'p25', name: 'Nivia Football', brand: 'Nivia', category: 'sports', subcategory: 'Football',
    price: 499, mrp: 750, discount: 33, rating: 4.2, reviewCount: 15000,
    image: 'https://picsum.photos/seed/nivia/400/400',
    images: ['https://picsum.photos/seed/nivia/400/400'],
    description: 'Storm football size 5, durable for rough ground.',
    specifications: { 'Size': '5', 'Material': 'Rubber' },
    features: ['Water Resistant', 'High Durability'],
    stock: 80, seller: 'v7', tags: ['sports', 'football', 'game'],
    isNew: false, isBestSeller: true, isTrending: true,
    sellers: [{ id: 'v7', name: 'SportsZone', price: 499, rating: 4.9, delivery: '3 Days' }]
  },
  {
    id: 'p26', name: 'Cosco Badminton Racket', brand: 'Cosco', category: 'sports', subcategory: 'Badminton',
    price: 350, mrp: 499, discount: 29, rating: 4.0, reviewCount: 8000,
    image: 'https://picsum.photos/seed/cosco/400/400',
    images: ['https://picsum.photos/seed/cosco/400/400'],
    description: 'Lightweight aluminium badminton racket.',
    specifications: { 'Material': 'Aluminium', 'Weight': '100g' },
    features: ['Nylon Gutting', 'Firm Grip'],
    stock: 120, seller: 'v7', tags: ['sports', 'badminton'],
    isNew: false, isBestSeller: false, isTrending: false,
    sellers: [{ id: 'v7', name: 'SportsZone', price: 350, rating: 4.9, delivery: '3 Days' }]
  },

  // Footwear (2)
  {
    id: 'p27', name: 'Bata Men\\'s Formal Shoes', brand: 'Bata', category: 'footwear', subcategory: 'Formal',
    price: 999, mrp: 1499, discount: 33, rating: 4.1, reviewCount: 12000,
    image: 'https://picsum.photos/seed/bata/400/400',
    images: ['https://picsum.photos/seed/bata/400/400'],
    description: 'Classic black formal lace-up shoes.',
    specifications: { 'Material': 'Synthetic Leather', 'Sole': 'TPR' },
    features: ['Comfortable Fit', 'Durable'],
    stock: 90, seller: 'v8', tags: ['shoes', 'formal', 'men'],
    isNew: false, isBestSeller: true, isTrending: false,
    sellers: [{ id: 'v8', name: 'FootwearWorld', price: 999, rating: 4.3, delivery: '4 Days' }]
  },
  {
    id: 'p28', name: 'Puma Running Shoes', brand: 'Puma', category: 'footwear', subcategory: 'Sports Shoes',
    price: 1999, mrp: 3999, discount: 50, rating: 4.4, reviewCount: 34000,
    image: 'https://picsum.photos/seed/puma/400/400',
    images: ['https://picsum.photos/seed/puma/400/400'],
    description: 'Lightweight running shoes for men with breathable mesh.',
    specifications: { 'Upper': 'Mesh', 'Sole': 'Rubber' },
    features: ['Breathable', 'Shock Absorbing'],
    stock: 60, seller: 'v8', tags: ['shoes', 'running', 'sports', 'men'],
    isNew: true, isBestSeller: true, isTrending: true,
    sellers: [{ id: 'v8', name: 'FootwearWorld', price: 1999, rating: 4.3, delivery: '3 Days' }]
  },

  // Watches (2)
  {
    id: 'p29', name: 'Titan Analog Watch', brand: 'Titan', category: 'watches', subcategory: 'Men',
    price: 1899, mrp: 2199, discount: 13, rating: 4.6, reviewCount: 25000,
    image: 'https://picsum.photos/seed/titan/400/400',
    images: ['https://picsum.photos/seed/titan/400/400'],
    description: 'Elegant analog dial watch with leather strap.',
    specifications: { 'Dial Color': 'White', 'Strap': 'Leather' },
    features: ['Water Resistant 50m', 'Mineral Glass'],
    stock: 40, seller: 'v1', tags: ['watch', 'analog', 'men'],
    isNew: false, isBestSeller: true, isTrending: false,
    sellers: [{ id: 'v1', name: 'TechMart India', price: 1899, rating: 4.5, delivery: 'Tomorrow' }]
  },
  {
    id: 'p30', name: 'Fastrack Casual Watch', brand: 'Fastrack', category: 'watches', subcategory: 'Unisex',
    price: 850, mrp: 995, discount: 14, rating: 4.3, reviewCount: 18000,
    image: 'https://picsum.photos/seed/fastrack/400/400',
    images: ['https://picsum.photos/seed/fastrack/400/400'],
    description: 'Trendy casual analog watch with silicone strap.',
    specifications: { 'Dial Shape': 'Round', 'Strap': 'Silicone' },
    features: ['Youth Design', 'Water Resistant'],
    stock: 110, seller: 'v1', tags: ['watch', 'casual', 'youth'],
    isNew: true, isBestSeller: false, isTrending: true,
    sellers: [{ id: 'v1', name: 'TechMart India', price: 850, rating: 4.5, delivery: '2 Days' }]
  }
];
`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join(srcDir, filepath);
  ensureDir(fullPath);
  fs.writeFileSync(fullPath, content);
});
console.log("Phase 2 (Products) Generation Complete");
