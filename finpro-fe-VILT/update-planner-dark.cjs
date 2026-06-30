const fs = require('fs');
const file = '../finpro-mobile-expo/src/app/(dashboard)/planner.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Replace COLORS
const newColors = `const getColors = (colorScheme: string | null | undefined) => ({
  bg: colorScheme === 'dark' ? '#0C1222' : '#FAFAF9',
  card: colorScheme === 'dark' ? '#111827' : '#FFFFFF',
  border: colorScheme === 'dark' ? 'rgba(255,255,255,0.05)' : '#D9E2EC',
  borderLight: colorScheme === 'dark' ? 'rgba(255,255,255,0.02)' : '#E8EDF2',
  navy: colorScheme === 'dark' ? '#F0F4F8' : '#102A43',
  muted: colorScheme === 'dark' ? '#829AB1' : '#627D98',
  orange: '#F97316',
  green: '#10B981',
});`;
content = content.replace(/const COLORS = \{[\s\S]*?\};/, newColors);

// 2. Replace styles
content = content.replace(/const styles = StyleSheet\.create\(\{/, 'const getStyles = (COLORS: any) => StyleSheet.create({');

// 3. Inject hook into components
const injectHook = `  const { colorScheme } = useColorScheme();
  const COLORS = getColors(colorScheme);
  const styles = getStyles(COLORS);`;

content = content.replace(/function MonthlyView\([^\{]*\{/, match => match + '\n' + injectHook);
content = content.replace(/function DailyView\([^\{]*\{/, match => match + '\n' + injectHook);
content = content.replace(/function WeeklyView\([^\{]*\{/, match => match + '\n' + injectHook);
content = content.replace(/export default function PlannerScreen\(\) \{/, match => match + '\n' + injectHook);

// Remove extra duplicate hooks inside PlannerScreen since we injected it
// Actually PlannerScreen already has `const { colorScheme } = useColorScheme();` from the previous script!
content = content.replace(/export default function PlannerScreen\(\) \{\s+const \{ colorScheme \} = useColorScheme\(\);\s+const \{ colorScheme \} = useColorScheme\(\);/, 'export default function PlannerScreen() {\n  const { colorScheme } = useColorScheme();');

// Also we need to make sure useColorScheme is imported from nativewind
if(!content.includes('useColorScheme')) {
  content = content.replace(/import \{ StatusBar \} from 'expo-status-bar';/, "import { StatusBar } from 'expo-status-bar';\nimport { useColorScheme } from 'nativewind';");
}

fs.writeFileSync(file, content);
console.log('Updated planner.tsx with dynamic COLORS and styles');
