import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public', 'images');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const imageUrls = {
  electronics: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
    'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80'
  ],
  fashion: [
    'https://images.unsplash.com/photo-1596755094514-f87e32f6b717?w=800&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    'https://images.unsplash.com/photo-1610030469983-98e550d61dc0?w=800&q=80',
    'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80'
  ],
  'home-kitchen': [
    'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&q=80',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80'
  ],
  beauty: [
    'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80',
    'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80'
  ],
  grocery: [
    'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80',
    'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
    'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800&q=80',
    'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=800&q=80'
  ],
  sports: [
    'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&q=80',
    'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80',
    'https://images.unsplash.com/photo-1518605368461-1e1e38ce8058?w=800&q=80',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80'
  ]
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        reject(new Error('Failed to download ' + url + ' status: ' + response.statusCode));
        return;
      }
      response.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => fs.unlink(dest, () => reject(err)));
  });
}

async function main() {
  const localMap = {};
  for (const [cat, urls] of Object.entries(imageUrls)) {
    localMap[cat] = [];
    for (let i = 0; i < urls.length; i++) {
      const fileName = cat + '_' + i + '.jpg';
      const dest = path.join(publicDir, fileName);
      console.log('Downloading ' + fileName + '...');
      try {
        await download(urls[i], dest);
        localMap[cat].push('/images/' + fileName);
      } catch (e) {
        console.error(e);
      }
    }
  }

  // Rewrite products.js
  let tempScript = `
import { products } from './src/data/products.js';
import fs from 'fs';

const imgMap = ${JSON.stringify(localMap)};
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
`;
  fs.writeFileSync('temp_prod2.js', tempScript);
  console.log('Created temp_prod2.js. Please run it next.');
}

main();
