import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src');

const replacements = {
  'LuHome': 'LuHouse',
  'LuCheckCircle': 'LuCircleCheckBig' // Note: This will also match LuCheckCircle2 if not careful, but we already replaced LuCheckCircle2. Let's be careful.
};

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      let changed = false;
      
      // We must make sure we only match the exact word LuCheckCircle, not LuCheckCircle2
      if (content.includes('LuHome')) {
        content = content.replace(/LuHome\b/g, 'LuHouse');
        changed = true;
      }
      if (content.includes('LuCheckCircle')) {
        content = content.replace(/LuCheckCircle\b/g, 'LuCircleCheckBig');
        changed = true;
      }
      
      if (changed) {
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

replaceInDir(srcDir);
console.log('Fixed final renamed icons!');
