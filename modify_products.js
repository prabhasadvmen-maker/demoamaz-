
import { products } from './src/data/products.js';
import fs from 'fs';

const catImages = {
  "electronics": [
    "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    "https://fakestoreapi.com/img/81Zt42O02K._AC_SX679_.jpg"
  ],
  "fashion": [
    "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    "https://fakestoreapi.com/img/71li-ujtl-L._AC_UX679_.jpg",
    "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg"
  ],
  "home-kitchen": [
    "https://cdn.dummyjson.com/product-images/26/1.jpg",
    "https://cdn.dummyjson.com/product-images/27/1.jpg",
    "https://cdn.dummyjson.com/product-images/28/1.jpg",
    "https://cdn.dummyjson.com/product-images/30/1.jpg"
  ],
  "beauty": [
    "https://cdn.dummyjson.com/product-images/11/1.jpg",
    "https://cdn.dummyjson.com/product-images/16/1.jpg",
    "https://cdn.dummyjson.com/product-images/17/1.jpg",
    "https://cdn.dummyjson.com/product-images/19/1.jpg"
  ],
  "groceries": [
    "https://cdn.dummyjson.com/product-images/21/1.jpg",
    "https://cdn.dummyjson.com/product-images/22/1.jpg",
    "https://cdn.dummyjson.com/product-images/23/1.jpg",
    "https://cdn.dummyjson.com/product-images/24/1.jpg"
  ],
  "sports": [
    "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg"
  ]
};
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
