const fs = require('fs');
const path = require('path');
const srcDir = 'C:/Users/luisk/praxis-vue/packages/ui/src';

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.vue') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      
      // Fix @/components/ui/ -> @/components/
      if (content.includes('@/components/ui/')) {
        content = content.replace(/@\/components\/ui\//g, '@/components/');
        changed = true;
      }
      
      // Remove @/types/ imports
      const typeImportRegex = /^import\s+(?:type\s+)?\{[^}]*\}\s+from\s+[\"']@\/types\/[^\"']*[\"'];?$/gm;
      if (typeImportRegex.test(content)) {
        content = content.replace(typeImportRegex, '');
        changed = true;
      }

      // Replace generic FormSchemaField with any
      if (content.includes('FormSchemaField')) {
        content = content.replace(/FormSchemaField/g, 'any');
        changed = true;
      }
      
      // Replace FormValue with any
      if (content.includes('FormValue')) {
        content = content.replace(/FormValue/g, 'any');
        changed = true;
      }

      // Replace GeneralTabsProfile with any
      if (content.includes('GeneralTabsProfile')) {
        content = content.replace(/GeneralTabsProfile/g, 'any');
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log('Fixed:', fullPath);
      }
    }
  }
}
processDir(srcDir);
