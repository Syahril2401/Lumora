import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';

function TabIcon({ icon, label, focused }: { icon: string; label: string; focused: boolean }) {
  return (
    <View className="items-center justify-center pt-2">
      <Text className="text-xl mb-1">{icon}</Text>
      <Text 
        className="text-[10px] font-black uppercase tracking-widest"
        style={{ color: focused ? '#3D3ACE' : '#94A3B8' }}
      >
        {label}
      </Text>
    </View>
  );
}

export default function DashboardLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F1F5F9',
          height: 72,
          paddingBottom: 8,
          paddingTop: 4,
          elevation: 20,
          shadowColor: '#818CF8',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.06,
          shadowRadius: 12,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="🏠" label="Home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="planner"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="📅" label="Planner" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="📝" label="Notes" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="👤" label="Profile" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
