import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#F9FAFB]">
      <StatusBar style="dark" />
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        
        {/* Top Navbar */}
        <View className="px-6 pt-16 pb-4 flex-row justify-between items-center">
          <Text className="text-2xl font-black tracking-tight" style={{ color: '#3D3ACE' }}>
            Lumora
          </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text className="text-[15px] font-semibold text-slate-600">Log In</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View className="flex-1 px-6 pt-8 pb-8 justify-between">
          <View>
            {/* Badge */}
            <View className="self-start bg-[#EEF2FF] px-4 py-2 rounded-lg mb-6">
              <Text className="text-[11px] font-black uppercase tracking-widest" style={{ color: '#3D3ACE' }}>
                The Intelligent Sanctuary
              </Text>
            </View>

            {/* Title */}
            <Text className="text-4xl font-extrabold text-slate-900 leading-[44px] tracking-tight mb-5">
              Build better study habits with{' '}
              <Text style={{ color: '#3D3ACE' }}>clarity.</Text>
            </Text>

            {/* Description */}
            <Text className="text-slate-500 text-base leading-relaxed mb-8">
              Lumora helps students plan, track, reflect, and improve their learning process in one integrated workspace.
            </Text>

            {/* Comparison Cards */}
            <View className="mb-8">
              {/* The Old Way */}
              <View className="bg-white rounded-3xl p-6 border border-slate-100 mb-4">
                <Text className="text-base font-extrabold text-slate-900 mb-4">The Old Way</Text>
                {['Scattered notes across five apps', 'Overwhelmed by endless to-do lists', 'No feedback on study effectiveness'].map((item, i) => (
                  <View key={i} className="flex-row items-start gap-2 mb-2">
                    <Text className="text-red-400 mt-0.5">✕</Text>
                    <Text className="text-slate-500 font-medium text-sm flex-1">{item}</Text>
                  </View>
                ))}
              </View>

              {/* The Lumora Way */}
              <View className="bg-white rounded-3xl p-6 border border-slate-100">
                <Text className="text-base font-extrabold text-slate-900 mb-4">The Lumora Way</Text>
                {['One unified sanctuary for every task', 'AI-driven breakdown of complex goals', 'Reflective analytics to learn faster'].map((item, i) => (
                  <View key={i} className="flex-row items-start gap-2 mb-2">
                    <Text className="font-bold mt-0.5" style={{ color: '#3D3ACE' }}>✓</Text>
                    <Text className="text-slate-500 font-medium text-sm flex-1">{item}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Three Steps */}
            <View className="mb-8">
              <Text className="text-2xl font-extrabold text-slate-900 text-center mb-6">Mastery in three steps.</Text>
              {[
                { num: '1', title: 'Assess', desc: 'Upload your goals. Lumora identifies critical focus areas.' },
                { num: '2', title: 'Plan', desc: 'Get a customized study calendar that balances work and rest.' },
                { num: '3', title: 'Improve', desc: 'Weekly reflections help you adjust based on real data.' },
              ].map((step, i) => (
                <View key={i} className="flex-row items-start gap-4 mb-5">
                  <View className="w-12 h-12 bg-white rounded-2xl border border-slate-100 items-center justify-center">
                    <Text className="text-lg font-black" style={{ color: '#3D3ACE' }}>{step.num}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-extrabold text-slate-900 mb-1">{step.title}</Text>
                    <Text className="text-slate-500 font-medium text-sm leading-relaxed">{step.desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Action Buttons */}
          <View className="gap-y-3 pt-4 pb-4">
            <TouchableOpacity 
              className="w-full py-4 rounded-2xl items-center justify-center"
              style={{ backgroundColor: '#3D3ACE' }}
              activeOpacity={0.8}
              onPress={() => router.push('/(auth)/register')}
            >
              <Text className="text-white font-bold text-[15px]">
                Get Started for Free
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="w-full py-4 rounded-2xl items-center justify-center bg-white border border-slate-200"
              activeOpacity={0.6}
              onPress={() => router.push('/(auth)/login')}
            >
              <Text className="text-slate-700 font-bold text-[15px]">
                I already have an account
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <Text className="text-slate-400 text-xs font-medium text-center mt-4">
            © 2024 Lumora AI. Designed for focused minds.
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}
