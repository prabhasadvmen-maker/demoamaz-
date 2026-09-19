
import { products } from './src/data/products.js';
import fs from 'fs';

const imgMap = {"electronics":["/images/electronics_0.jpg","/images/electronics_1.jpg","/images/electronics_2.jpg","/images/electronics_3.jpg"],"fashion":["/images/fashion_1.jpg","/images/fashion_3.jpg"],"home-kitchen":["/images/home-kitchen_0.jpg","/images/home-kitchen_1.jpg","/images/home-kitchen_2.jpg","/images/home-kitchen_3.jpg"],"beauty":["/images/beauty_0.jpg","/images/beauty_1.jpg","/images/beauty_2.jpg","/images/beauty_3.jpg"],"grocery":["/images/grocery_0.jpg","/images/grocery_1.jpg","/images/grocery_2.jpg","/images/grocery_3.jpg"],"sports":["/images/sports_0.jpg","/images/sports_1.jpg","/images/sports_3.jpg"]};
const catIdx = {};

const newProducts = products.map(p => {
  let cat = p.category;
  if (!imgMap[cat]) cat = 'electronics';
  
  if (!catIdx[cat]) catIdx[cat] = 0;
  
  const imgs = imgMap[cat];
  if (!imgs || imgs.length === 0) return p;

  const url = imgs[catIdx[cat] % imgs.length];
  catIdx[cat]++;
  
  return { ...p, image: url, images: [url, url, url, url] };
});

fs.writeFileSync('./src/data/products.js', 'export const products = ' + JSON.stringify(newProducts, null, 2) + ';');
