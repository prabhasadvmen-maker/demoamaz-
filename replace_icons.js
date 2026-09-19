import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      
      const regex = /import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"];?/g;
      
      content = content.replace(regex, (match, p1) => {
        const icons = p1.split(',').map(s => s.trim()).filter(s => s);
        const newIcons = icons.map(icon => {
          if (icon.includes(' as ')) {
             const parts = icon.split(' as ');
             return `Lu${parts[0].trim()} as ${parts[1].trim()}`;
          }
          return `Lu${icon} as ${icon}`;
        });
        return `import { ${newIcons.join(', ')} } from 'react-icons/lu';`;
      });
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

replaceInDir(srcDir);
console.log('Icons replaced successfully!');
