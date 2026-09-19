import React from 'react';
import { LuSmartphone, LuShirt, LuHouse, LuShoppingCart, LuSparkles, LuDumbbell, LuFootprints, LuWatch, LuBook, LuGamepad2 } from 'react-icons/lu';

export const categories = [
  { id: 'electronics', name: 'Electronics', icon: <LuSmartphone />, image: '/images/electronics_0.jpg', count: 8 },
  { id: 'fashion', name: 'Fashion', icon: <LuShirt />, image: '/images/electronics_0.jpg', count: 6 },
  { id: 'home-kitchen', name: 'Home & Kitchen', icon: <LuHouse />, image: '/images/electronics_0.jpg', count: 4 },
  { id: 'grocery', name: 'Grocery', icon: <LuShoppingCart />, image: '/images/electronics_0.jpg', count: 3 },
  { id: 'beauty', name: 'Beauty & Care', icon: <LuSparkles />, image: '/images/electronics_0.jpg', count: 3 },
  { id: 'sports', name: 'Sports & Fitness', icon: <LuDumbbell />, image: '/images/electronics_0.jpg', count: 2 },
  { id: 'footwear', name: 'Footwear', icon: <LuFootprints />, image: '/images/electronics_0.jpg', count: 2 },
  { id: 'watches', name: 'Watches', icon: <LuWatch />, image: '/images/electronics_0.jpg', count: 2 },
  { id: 'books', name: 'Books', icon: <LuBook />, image: '/images/electronics_0.jpg', count: 0 },
  { id: 'toys', name: 'Toys & Games', icon: <LuGamepad2 />, image: '/images/electronics_0.jpg', count: 0 },
];
