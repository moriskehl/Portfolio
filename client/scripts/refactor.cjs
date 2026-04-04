const fs = require('fs');
const path = require('path');
const hooksDir = path.join(__dirname, '..', 'src', 'hooks');
const files = fs.readdirSync(hooksDir).filter(f => f.startsWith('use') && f.endsWith('Data.ts'));

for (const file of files) {
  let content = fs.readFileSync(path.join(hooksDir, file), 'utf8');
  
  if (!content.includes('secureStorage')) {
    content = 'import { loadSecureData, saveSecureData } from "../utils/secureStorage";\n' + content;
  }
  
  content = content.replace(/try\s*\{\s*const\s*stored\s*=\s*localStorage\.getItem\(STORAGE_KEY\);\s*if\s*\(stored\)\s*return\s*JSON\.parse\(t?stored\);\s*\}\s*catch(\s*\([^\)]*\)\s*)?\{\s*\}\s*return\s*defaultData;/g, 'return loadSecureData(STORAGE_KEY, defaultData);');
  
  content = content.replace(/localStorage\.setItem\(STORAGE_KEY,\s*JSON\.stringify\(data\)\);/g, 'saveSecureData(STORAGE_KEY, data);');
  
  fs.writeFileSync(path.join(hooksDir, file), content);
}
console.log('Hooks upgraded to Secure Storage.');
