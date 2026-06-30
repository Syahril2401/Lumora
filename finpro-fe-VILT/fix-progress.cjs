const fs = require('fs');
const file = '../finpro-mobile-expo/src/app/(dashboard)/progress.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add useColorScheme import
if (!content.includes('useColorScheme')) {
  content = content.replace(
    /import \{ useRouter \} from 'expo-router';/,
    "import { useRouter } from 'expo-router';\nimport { useColorScheme } from 'nativewind';"
  );
}

// Add colorScheme to component
if (!content.includes('const { colorScheme } = useColorScheme();')) {
  content = content.replace(
    /export default function ProgressScreen\(\) \{/,
    "export default function ProgressScreen() {\n  const { colorScheme } = useColorScheme();"
  );
}

// Fix StatusBar
content = content.replace(
  /<StatusBar style="dark" \/>/g,
  '<StatusBar style={colorScheme === "dark" ? "light" : "dark"} />'
);

// General background
content = content.replace(/bg-\[\#FAFAF9\]/g, 'bg-surface-warm dark:bg-dark-bg');

// Text Colors
content = content.replace(/text-\[\#102A43\]/g, 'text-navy-900 dark:text-text-primary');
content = content.replace(/text-\[\#627D98\]/g, 'text-navy-500 dark:text-text-muted');

// Borders
content = content.replace(/border-\[\#D9E2EC\]/g, 'border-navy-100 dark:border-dark-border');

// Card Backgrounds
content = content.replace(/bg-white/g, 'bg-white dark:bg-dark-panel');

// Progress Bar Backgrounds
content = content.replace(/bg-\[\#E8EDF2\]/g, 'bg-navy-50 dark:bg-dark-surface');

// Orange brand color (leave bg alone if it's the solid button, but for consistency let's use tailwind named colors)
content = content.replace(/text-\[\#F97316\]/g, 'text-brand-500');
content = content.replace(/bg-\[\#F97316\]/g, 'bg-brand-500');

// Emerald
content = content.replace(/text-\[\#10B981\]/g, 'text-emerald-500 dark:text-emerald-400');

// Violet
content = content.replace(/text-\[\#8B5CF6\]/g, 'text-violet-500 dark:text-violet-400');

// Rose
content = content.replace(/text-\[\#F43F5E\]/g, 'text-rose-500 dark:text-rose-400');

// Fix loader color to brand
content = content.replace(/color="#F97316"/g, 'color="#F97316"');

fs.writeFileSync(file, content);
console.log('Fixed progress page styles for dark mode');
