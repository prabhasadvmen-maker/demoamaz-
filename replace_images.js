import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src/data');

// 1. Update categories.js
let categoriesContent = fs.readFileSync(path.join(srcDir, 'categories.js'), 'utf-8');
const catImages = [
  'https://cdn.dummyjson.com/product-images/1/1.jpg',
  'https://cdn.dummyjson.com/product-images/6/1.jpg',
  'https://cdn.dummyjson.com/product-images/11/1.jpg',
  'https://cdn.dummyjson.com/product-images/16/1.jpg',
  'https://cdn.dummyjson.com/product-images/21/1.jpg',
  'https://cdn.dummyjson.com/product-images/26/1.jpg',
  'https://cdn.dummyjson.com/product-images/31/1.jpg',
  'https://cdn.dummyjson.com/product-images/36/1.jpg',
  'https://cdn.dummyjson.com/product-images/41/1.jpg',
  'https://cdn.dummyjson.com/product-images/46/1.jpg'
];
let catIdx = 0;
categoriesContent = categoriesContent.replace(/image:\s*['"][^'"]+['"]/g, () => {
  return `image: '${catImages[catIdx++ % catImages.length]}'`;
});
fs.writeFileSync(path.join(srcDir, 'categories.js'), categoriesContent);

// 2. Update vendors.js
let vendorsContent = fs.readFileSync(path.join(srcDir, 'vendors.js'), 'utf-8');
const vendorLogos = [
  'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg',
  'https://cdn.dummyjson.com/product-images/2/thumbnail.jpg',
  'https://cdn.dummyjson.com/product-images/3/thumbnail.jpg',
  'https://cdn.dummyjson.com/product-images/4/thumbnail.jpg',
  'https://cdn.dummyjson.com/product-images/5/thumbnail.jpg',
  'https://cdn.dummyjson.com/product-images/6/thumbnail.jpg',
  'https://cdn.dummyjson.com/product-images/7/thumbnail.jpg',
  'https://cdn.dummyjson.com/product-images/8/thumbnail.jpg'
];
let vendorIdx = 0;
vendorsContent = vendorsContent.replace(/logo:\s*['"][^'"]+['"]/g, () => {
  return `logo: '${vendorLogos[vendorIdx++ % vendorLogos.length]}'`;
});
vendorsContent = vendorsContent.replace(/banner:\s*['"][^'"]+['"]/g, () => {
  return `banner: 'https://cdn.dummyjson.com/product-images/${Math.floor(Math.random() * 50) + 1}/1.jpg'`;
});
fs.writeFileSync(path.join(srcDir, 'vendors.js'), vendorsContent);

// 3. Update products.js
let productsContent = fs.readFileSync(path.join(srcDir, 'products.js'), 'utf-8');
let prodIdx = 1;
productsContent = productsContent.replace(/image:\s*['"][^'"]+['"]/g, () => {
  const img = `https://cdn.dummyjson.com/product-images/${(prodIdx % 100) || 1}/1.jpg`;
  return `image: '${img}'`;
});
// also replace images arrays
productsContent = productsContent.replace(/images:\s*\[([^\]]+)\]/g, (match, p1) => {
  const id = (prodIdx % 100) || 1;
  prodIdx++;
  return `images: [
      'https://cdn.dummyjson.com/product-images/${id}/1.jpg',
      'https://cdn.dummyjson.com/product-images/${id}/2.jpg',
      'https://cdn.dummyjson.com/product-images/${id}/3.jpg',
      'https://cdn.dummyjson.com/product-images/${id}/thumbnail.jpg'
    ]`;
});
fs.writeFileSync(path.join(srcDir, 'products.js'), productsContent);

// 4. Update orders.js
let ordersContent = fs.readFileSync(path.join(srcDir, 'orders.js'), 'utf-8');
let ordIdx = 1;
ordersContent = ordersContent.replace(/image:\s*['"][^'"]+['"]/g, () => {
  return `image: 'https://cdn.dummyjson.com/product-images/${(ordIdx++ % 100) || 1}/1.jpg'`;
});
fs.writeFileSync(path.join(srcDir, 'orders.js'), ordersContent);

// 5. Update HomePage Hero Images
let homeContent = fs.readFileSync(path.join(__dirname, 'src/pages/HomePage.jsx'), 'utf-8');
homeContent = homeContent.replace(/"https:\/\/picsum\.photos\/seed\/hero1\/400\/400"/, '"https://cdn.dummyjson.com/product-images/1/1.jpg"');
homeContent = homeContent.replace(/"https:\/\/picsum\.photos\/seed\/hero2\/400\/400"/, '"https://cdn.dummyjson.com/product-images/6/1.jpg"');
homeContent = homeContent.replace(/"https:\/\/picsum\.photos\/seed\/hero3\/400\/400"/, '"https://cdn.dummyjson.com/product-images/11/1.jpg"');
homeContent = homeContent.replace(/"https:\/\/picsum\.photos\/seed\/hero4\/400\/400"/, '"https://cdn.dummyjson.com/product-images/16/1.jpg"');
fs.writeFileSync(path.join(__dirname, 'src/pages/HomePage.jsx'), homeContent);

console.log('Images updated to DummyJSON realistic product images!');
