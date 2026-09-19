import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src/data');

const productsFile = path.join(srcDir, 'products.js');
let productsContent = fs.readFileSync(productsFile, 'utf-8');

// I will define specific URLs for categories
const catImages = {
  'electronics': [
    'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg', // hard drive
    'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg', // monitor
    'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg', // ssd
    'https://fakestoreapi.com/img/81Zt42O02K._AC_SX679_.jpg'  // monitor
  ],
  'fashion': [
    'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    'https://fakestoreapi.com/img/71li-ujtl-L._AC_UX679_.jpg',
    'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg'
  ],
  'home-kitchen': [
    'https://cdn.dummyjson.com/product-images/26/1.jpg', // plant hanger
    'https://cdn.dummyjson.com/product-images/27/1.jpg', // bird
    'https://cdn.dummyjson.com/product-images/28/1.jpg', // 3d
    'https://cdn.dummyjson.com/product-images/30/1.jpg'  // key holder
  ],
  'beauty': [
    'https://cdn.dummyjson.com/product-images/11/1.jpg', // perfume
    'https://cdn.dummyjson.com/product-images/16/1.jpg', // serum
    'https://cdn.dummyjson.com/product-images/17/1.jpg', // oil
    'https://cdn.dummyjson.com/product-images/19/1.jpg'  // skincare
  ],
  'groceries': [
    'https://cdn.dummyjson.com/product-images/21/1.jpg', // dal
    'https://cdn.dummyjson.com/product-images/22/1.jpg', // macaroni
    'https://cdn.dummyjson.com/product-images/23/1.jpg', // orange essence
    'https://cdn.dummyjson.com/product-images/24/1.jpg'  // cereals
  ],
  'sports': [
    'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg', // ring (fallback)
    'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg', // ring
    'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg', // ring
    'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg'  // earrings
  ]
};

// Fallback images
const fallback = 'https://cdn.dummyjson.com/product-images/1/1.jpg';

// We will parse the products.js file using regex to extract id, category, and then replace images.
// Actually, it's easier to just do a regex replace on the image field, but we need to know the category.
// The products array in products.js looks like: 
// { id: '...', name: '...', category: '...', ..., image: '...' }

// We can run the file using node by transforming it slightly to extract the data, modify it, and write it back.
// But wait, the file exports a const. We can dynamically import it, modify the objects, and rewrite it.

const code = `
import { products } from './src/data/products.js';
import fs from 'fs';

const catImages = ${JSON.stringify(catImages, null, 2)};
const catIndexes = {};

const newProducts = products.map(p => {
  if (!catIndexes[p.category]) catIndexes[p.category] = 0;
  
  const imgs = catImages[p.category] || catImages['electronics'];
  const idx = catIndexes[p.category] % imgs.length;
  catIndexes[p.category]++;
  
  const imgUrl = imgs[idx];
  
  return {
    ...p,
    image: imgUrl,
    images: [imgUrl, imgUrl, imgUrl, imgUrl]
  };
});

const content = 'export const products = ' + JSON.stringify(newProducts, null, 2) + ';';
fs.writeFileSync('./src/data/products.js', content);
console.log('Products updated with precise images.');
`;

fs.writeFileSync('modify_products.js', code);
