import fs from 'fs';

const fallbackUrl = '/images/electronics_0.jpg';

// Vendors
let vendorsContent = fs.readFileSync('./src/data/vendors.js', 'utf-8');
vendorsContent = vendorsContent.replace(/['"]https:\/\/images\.unsplash\.com[^'"]+['"]/g, "'" + fallbackUrl + "'");
fs.writeFileSync('./src/data/vendors.js', vendorsContent);

// Orders
let ordersContent = fs.readFileSync('./src/data/orders.js', 'utf-8');
ordersContent = ordersContent.replace(/['"]https:\/\/images\.unsplash\.com[^'"]+['"]/g, "'" + fallbackUrl + "'");
fs.writeFileSync('./src/data/orders.js', ordersContent);

// HomePage
let homeContent = fs.readFileSync('./src/pages/HomePage.jsx', 'utf-8');
homeContent = homeContent.replace(/['"]https:\/\/images\.unsplash\.com[^'"]+['"]/g, "'" + fallbackUrl + "'");
fs.writeFileSync('./src/pages/HomePage.jsx', homeContent);

// Categories
let categoriesContent = fs.readFileSync('./src/data/categories.jsx', 'utf-8');
categoriesContent = categoriesContent.replace(/['"]https:\/\/images\.unsplash\.com[^'"]+['"]/g, "'" + fallbackUrl + "'");
fs.writeFileSync('./src/data/categories.jsx', categoriesContent);

console.log('Fixed other files.');
