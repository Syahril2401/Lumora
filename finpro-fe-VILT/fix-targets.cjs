const fs = require('fs');
const file = '../finpro-mobile-expo/src/app/(dashboard)/weekly-targets.tsx';
let content = fs.readFileSync(file, 'utf8');

// Fix priorityColor and statusColor
content = content.replace(/const priorityColor = \(p: string\) => \{[\s\S]*?return \{ bg: '#F8FAFC', text: '#94A3B8' \};\n  \};/, `const priorityClasses = (p: string) => {
    if (p === 'high') return { bg: 'bg-rose-50 dark:bg-rose-500/10', text: 'text-rose-500 dark:text-rose-400' };
    if (p === 'medium') return { bg: 'bg-amber-50 dark:bg-amber-500/10', text: 'text-amber-500 dark:text-amber-400' };
    return { bg: 'bg-slate-50 dark:bg-slate-500/10', text: 'text-slate-400 dark:text-slate-400' };
  };`);

content = content.replace(/const statusColor = \(s: string\) => \{[\s\S]*?return \{ bg: '#F8FAFC', text: '#94A3B8' \};\n  \};/, `const statusClasses = (s: string) => {
    if (s === 'completed') return { bg: 'bg-emerald-50 dark:bg-emerald-500/10', text: 'text-emerald-500 dark:text-emerald-400' };
    if (s === 'in_progress') return { bg: 'bg-blue-50 dark:bg-blue-500/10', text: 'text-blue-500 dark:text-blue-400' };
    return { bg: 'bg-slate-50 dark:bg-slate-500/10', text: 'text-slate-400 dark:text-slate-400' };
  };`);

// Update target cards rendering
content = content.replace(/const pc = priorityColor\(target.priority\);\n\s+const sc = statusColor\(target.status\);/, `const pc = priorityClasses(target.priority);\n              const sc = statusClasses(target.status);`);

// Since exact string matching multiline React can be tricky, I'll replace the exact lines by identifying their contents
content = content.replace(/<View style=\{\{\s*backgroundColor:\s*pc\.bg[\s\S]*?<\/View>/, `<View className={\`\${pc.bg} px-2 py-1 rounded-md\`}>\n                      <Text className={\`\${pc.text} text-[9px] font-black uppercase tracking-widest\`}>{target.priority}</Text>\n                    </View>`);
content = content.replace(/<View style=\{\{\s*backgroundColor:\s*'#FFF7ED'[\s\S]*?<\/View>/, `<View className="bg-orange-50 dark:bg-orange-500/10 px-2 py-1 rounded-md">\n                      <Text className="text-orange-500 text-[9px] font-black uppercase tracking-widest">{target.focus_dimension}</Text>\n                    </View>`);
content = content.replace(/<View style=\{\{\s*backgroundColor:\s*sc\.bg[\s\S]*?<\/View>/, `<View className={\`\${sc.bg} px-2 py-1 rounded-md\`}>\n                      <Text className={\`\${sc.text} text-[9px] font-black uppercase tracking-widest\`}>{target.status?.replace('_', ' ')}</Text>\n                    </View>`);

// Fix subtask text color and line
content = content.replace(/<Text[\s\S]*?className="flex-1 text-sm font-bold"[\s\S]*?>\{sub\.title\}<\/Text>/, `<Text className={\`flex-1 text-sm font-bold \${sub.is_completed ? 'text-navy-300 dark:text-text-secondary line-through' : 'text-navy-900 dark:text-text-primary'}\`}>{sub.title}</Text>`);

// Fix Action Buttons Edit and Delete
content = content.replace(/bg-\[\#FFF1F2\]/g, `bg-rose-50 dark:bg-rose-500/10`);
content = content.replace(/text-\[\#F43F5E\]/g, `text-rose-500 dark:text-rose-400`);

// Fix subtask border
content = content.replace(/borderColor: sub\.is_completed \? '#10B981' : '#D9E2EC'/g, `borderColor: sub.is_completed ? '#10B981' : 'rgba(156,163,175,0.3)'`);

fs.writeFileSync(file, content);
console.log('Fixed inline styles in weekly-targets');
