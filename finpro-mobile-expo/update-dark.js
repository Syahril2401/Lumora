const fs = require('fs');
const files = [
  '../finpro-mobile-expo/src/app/(dashboard)/index.tsx',
  '../finpro-mobile-expo/src/app/(dashboard)/planner.tsx',
  '../finpro-mobile-expo/src/app/(dashboard)/weekly-targets.tsx',
  '../finpro-mobile-expo/src/app/(dashboard)/notes.tsx'
];

const replacements = [
  { from: /bg-\[\#FAFAF9\]/g, to: 'bg-surface-warm dark:bg-dark-bg' },
  { from: /text-\[\#102A43\]/g, to: 'text-navy-900 dark:text-text-primary' },
  { from: /text-\[\#627D98\]/g, to: 'text-navy-500 dark:text-text-muted' },
  { from: /border-\[\#D9E2EC\]/g, to: 'border-navy-100 dark:border-dark-border' },
  { from: /bg-white/g, to: 'bg-white dark:bg-dark-panel' },
  { from: /text-\[\#9FB3C8\]/g, to: 'text-navy-300 dark:text-text-secondary' },
  { from: /bg-\[\#F97316\]/g, to: 'bg-brand-500' },
  { from: /text-\[\#F97316\]/g, to: 'text-brand-500' },
  { from: /bg-\[\#E8EDF2\]/g, to: 'bg-navy-50 dark:bg-dark-surface' },
  { from: /text-\[\#486581\]/g, to: 'text-navy-600 dark:text-text-primary' },
  { from: /bg-\[\#102A43\]/g, to: 'bg-navy-900 dark:bg-dark-surface' },
  { from: /style=\{\{\s*backgroundColor:\s*'#FAFAF9'\s*\}\}/g, to: 'className="bg-surface-warm dark:bg-dark-bg"' },
  { from: /style=\{\{\s*color:\s*'#102A43'\s*\}\}/g, to: 'className="text-navy-900 dark:text-text-primary"' },
];

files.forEach(file => {
  if (!fs.existsSync(file)) {
     console.log('Not found: ' + file);
     return;
  }
  let content = fs.readFileSync(file, 'utf8');
  replacements.forEach(r => {
    content = content.replace(r.from, r.to);
  });
  
  if(!content.includes('useColorScheme')) {
    content = content.replace(/import \{ StatusBar \} from 'expo-status-bar';/, "import { StatusBar } from 'expo-status-bar';\nimport { useColorScheme } from 'nativewind';");
  }
  content = content.replace(/style="dark"/g, 'style={colorScheme === "dark" ? "light" : "dark"}');
  
  if(content.includes('useColorScheme') && !content.includes('const { colorScheme } = useColorScheme();')) {
    content = content.replace(/const router = useRouter\(\);/, 'const router = useRouter();\n  const { colorScheme } = useColorScheme();');
    content = content.replace(/const \[targets, setTargets\] = useState/, 'const { colorScheme } = useColorScheme();\n  const [targets, setTargets] = useState');
    content = content.replace(/const \[sessions, setSessions\] = useState/, 'const { colorScheme } = useColorScheme();\n  const [sessions, setSessions] = useState');
    content = content.replace(/const \[notes, setNotes\] = useState/, 'const { colorScheme } = useColorScheme();\n  const [notes, setNotes] = useState');
  }

  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
});

