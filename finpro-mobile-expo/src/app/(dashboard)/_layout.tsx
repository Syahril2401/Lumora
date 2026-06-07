import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';

function TabIcon({ iconName, label, focused }: { iconName: keyof typeof Feather.glyphMap; label: string; focused: boolean }) {
  const color = focused ? '#F97316' : '#627D98';
  return (
    <View className="items-center justify-center pt-2" style={{ width: '100%', paddingHorizontal: 2 }}>
      <Feather name={iconName} size={22} color={color} style={{ marginBottom: 4 }} />
      <Text 
        numberOfLines={1}
        className="text-[7px] font-bold uppercase tracking-tight text-center"
        style={{ color, width: '100%' }}
      >
        {label}
      </Text>
    </View>
  );
}

export default function DashboardLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#111827' : '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: isDark ? 'rgba(255,255,255,0.05)' : '#D9E2EC',
          height: 72,
          paddingBottom: 8,
          paddingTop: 4,
          elevation: 20,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: isDark ? 0.3 : 0.05,
          shadowRadius: 12,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon iconName="grid" label="Dashboard" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="planner"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon iconName="calendar" label="Planner" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="weekly-targets"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon iconName="check-circle" label="Targets" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon iconName="edit-3" label="Notes" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon iconName="trending-up" label="Progress" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon iconName="settings" label="Settings" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
