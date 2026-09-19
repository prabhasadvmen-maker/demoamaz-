const fs = require('fs');

const categories = [
  'electronics', 'fashion', 'home-kitchen', 'grocery', 
  'beauty', 'sports', 'footwear', 'watches', 'books', 'toys'
];

const categoryKeywords = {
  'electronics': 'gadget,technology',
  'fashion': 'clothing,model',
  'home-kitchen': 'kitchen,interior',
  'grocery': 'vegetables,grocery',
  'beauty': 'cosmetics,makeup',
  'sports': 'fitness,gym',
  'footwear': 'shoes,sneakers',
  'watches': 'watch,luxury',
  'books': 'book,library',
  'toys': 'toys,kids'
};

const brands = ['Sony', 'boAt', 'Nike', 'Puma', 'Titan', 'Fastrack', 'Allen Solly', 'Biba', 'Mamaearth', 'Apple', 'Samsung'];

const getImageUrl = (category, index, variation = 0) => {
  const keyword = categoryKeywords[category] || category;
  // Generate a unique lock ID based on category, item index, and variation
  const lockId = (categories.indexOf(category) * 100) + (index * 10) + variation;
  return `https://loremflickr.com/500/500/${keyword}?lock=${lockId}`;
};

const generateProducts = () => {
  const products = [];
  let idCounter = 1;

  for (const category of categories) {
    for (let i = 0; i < 10; i++) {
      const price = Math.floor(Math.random() * 5000) + 500;
      const discount = Math.floor(Math.random() * 50) + 10;
      const mrp = Math.floor(price * (100 / (100 - discount)));
      const brand = brands[Math.floor(Math.random() * brands.length)];
      
      const imageUrlMain = getImageUrl(category, i, 0);
      const imageUrl1 = getImageUrl(category, i, 1);
      const imageUrl2 = getImageUrl(category, i, 2);
      
      products.push({
        id: `p${idCounter++}`,
        name: `Premium ${brand} ${category.replace('-', ' ')} Product ${i + 1}`,
        brand: brand,
        category: category,
        subcategory: "General",
        price: price,
        mrp: mrp,
        discount: discount,
        rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
        reviewCount: Math.floor(Math.random() * 50000) + 100,
        image: imageUrlMain,
        images: [imageUrlMain, imageUrl1, imageUrl2],
        description: `High-quality ${category} product perfectly suited for your needs. Guaranteed authentic from ${brand}.`,
        specifications: {
          "Quality": "Premium",
          "Material": "Durable"
        },
        features: ["High Performance", "Long Lasting", "Premium Finish"],
        stock: Math.floor(Math.random() * 100) + 10,
        seller: "v1",
        tags: [category, brand.toLowerCase(), "premium"],
        isNew: Math.random() > 0.5,
        isBestSeller: Math.random() > 0.7,
        isTrending: Math.random() > 0.7,
        sellers: [
          {
            id: "v1",
            name: `${brand} Official Store`,
            price: price,
            rating: 4.8,
            delivery: "Tomorrow"
          }
        ]
      });
    }
  }

  products[0].discount = 55;

  const content = `export const products = ${JSON.stringify(products, null, 2)};\n`;
  fs.writeFileSync('./src/data/products.js', content, 'utf8');
};

generateProducts();
console.log('Images fixed using LoremFlickr and Products generated successfully!');
