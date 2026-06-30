const fs = require('fs');
const file = '../finpro-mobile-expo/src/app/(dashboard)/settings.tsx';
let content = fs.readFileSync(file, 'utf8');

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

// Button Backgrounds
content = content.replace(/bg-\[\#102A43\]/g, 'bg-navy-900 dark:bg-dark-surface');
content = content.replace(/bg-\[\#E8EDF2\]/g, 'bg-navy-50 dark:bg-dark-surface');

// Orange brand color 
content = content.replace(/text-\[\#F97316\]/g, 'text-brand-500');
content = content.replace(/border-\[\#F97316\]/g, 'border-brand-500');
content = content.replace(/bg-\[\#F97316\]/g, 'bg-brand-500');

// Rose
content = content.replace(/text-\[\#F43F5E\]/g, 'text-rose-500 dark:text-rose-400');

// Fix Theme Preferences block specifically
const oldThemePref = `            <View className="flex-row justify-between" style={{ gap: 12 }}>
              <TouchableOpacity
                className="flex-1 bg-surface-warm dark:bg-dark-bg border-2 border-brand-500 rounded-2xl p-4 items-center"
                onPress={() => setColorScheme('light')}
              >
                <View className="w-full h-12 bg-white dark:bg-dark-panel rounded-lg mb-3 border border-navy-100 dark:border-dark-border" />
                <Text className="text-navy-900 dark:text-text-primary text-xs font-black">Premium Light</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 bg-navy-900 dark:bg-dark-surface border-2 border-[#102A43] rounded-2xl p-4 items-center shadow-sm"
                onPress={() => setColorScheme('dark')}
              >
                <View className="w-full h-12 bg-[#161C2D] rounded-lg mb-3 border border-white/5" />
                <Text className="text-white text-xs font-black">Premium Dark</Text>
              </TouchableOpacity>
            </View>`;

const newThemePref = `            <View className="flex-row justify-between" style={{ gap: 12 }}>
              <TouchableOpacity
                className={\`flex-1 bg-surface-warm dark:bg-dark-bg border-2 rounded-2xl p-4 items-center \${colorScheme !== 'dark' ? 'border-brand-500' : 'border-transparent'}\`}
                onPress={() => setColorScheme('light')}
              >
                <View className="w-full h-12 bg-white rounded-lg mb-3 border border-navy-100 dark:border-dark-border" />
                <Text className="text-navy-900 dark:text-text-primary text-xs font-black">Premium Light</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={\`flex-1 bg-navy-900 dark:bg-dark-surface border-2 rounded-2xl p-4 items-center shadow-sm \${colorScheme === 'dark' ? 'border-brand-500' : 'border-transparent'}\`}
                onPress={() => setColorScheme('dark')}
              >
                <View className="w-full h-12 bg-[#161C2D] rounded-lg mb-3 border border-white/5" />
                <Text className="text-white text-xs font-black">Premium Dark</Text>
              </TouchableOpacity>
            </View>`;

// First try to match the exact block and replace
content = content.replace(/<View className="flex-row justify-between" style=\{\{ gap: 12 \}\}>[\s\S]*?<\/View>\n\s*<\/View>/, newThemePref + '\n          </View>');

fs.writeFileSync(file, content);
console.log('Fixed settings styles for dark mode');
