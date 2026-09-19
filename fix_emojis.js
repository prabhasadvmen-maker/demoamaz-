import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src');

function fixEmojis(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixEmojis(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      
      // Header.jsx: 🚚
      if (file === 'Header.jsx' && content.includes('🚚')) {
        content = content.replace('🚚', '<LuTruck className="inline mr-1" size={16}/>');
        if (!content.includes('LuTruck')) {
          content = content.replace(/import \{([^}]+)\} from 'react-icons\/lu';/, "import { $1, LuTruck } from 'react-icons/lu';");
        }
      }
      
      // HomePage.jsx: 🇮🇳, 🔥
      if (file === 'HomePage.jsx') {
        if (content.includes('🇮🇳')) {
          content = content.replace('🇮🇳', '<LuMapPin className="inline mr-1" size={16}/>');
          if (!content.includes('LuMapPin')) {
             content = content.replace(/import \{([^}]+)\} from 'react-icons\/lu';/, "import { $1, LuMapPin } from 'react-icons/lu';");
          }
        }
        if (content.includes('🔥')) {
          content = content.replace(/🔥/g, '<LuFlame className="inline ml-1 text-orange-500" size={24}/>');
          if (!content.includes('LuFlame')) {
             content = content.replace(/import \{([^}]+)\} from 'react-icons\/lu';/, "import { $1, LuFlame } from 'react-icons/lu';");
          }
        }
      }
      
      // OffersPage.jsx: 🔥
      if (file === 'OffersPage.jsx' && content.includes('🔥')) {
        content = content.replace('🔥', '<LuFlame className="inline mr-2 text-orange-500" size={28}/>');
        if (!content.includes('LuFlame')) {
           content = content.replace(/import \{([^}]+)\} from 'react-icons\/lu';/, "import { $1, LuFlame } from 'react-icons/lu';");
        }
      }
      
      // OrderSuccessPage.jsx: 🎉
      if (file === 'OrderSuccessPage.jsx' && content.includes('🎉')) {
        content = content.replace('🎉', '<LuPartyPopper className="inline ml-2 text-yellow-500" size={32}/>');
        if (!content.includes('LuPartyPopper')) {
           // We might need to add import if not exists
           if (content.includes('react-icons/lu')) {
             content = content.replace(/import \{([^}]+)\} from 'react-icons\/lu';/, "import { $1, LuPartyPopper } from 'react-icons/lu';");
           } else {
             content = `import { LuPartyPopper } from 'react-icons/lu';\n` + content;
           }
        }
      }

      fs.writeFileSync(fullPath, content);
    }
  }
}
fixEmojis(path.join(srcDir, 'components'));
fixEmojis(path.join(srcDir, 'pages'));
console.log('Emojis replaced with React Icons.');
