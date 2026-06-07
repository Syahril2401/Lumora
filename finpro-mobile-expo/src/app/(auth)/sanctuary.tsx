import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function SanctuaryScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#FAFAF9]">
      <StatusBar style="dark" />

      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Section with Image and Quote */}
        <View className="bg-[#F3F4F6] pt-16 pb-8 px-6 rounded-b-[40px] items-center shadow-sm">
          <View className="flex-row items-center gap-2 mb-8">
            <Image 
              source={require('../../../assets/images/lumora_icon.svg')} 
              style={{ width: 28, height: 28 }} 
              contentFit="contain" 
            />
            <Text className="text-xl font-black tracking-tight text-[#F97316]">Lumora</Text>
          </View>

          <View className="w-full max-w-[280px] aspect-square rounded-[32px] overflow-hidden shadow-xl mb-6 relative" style={{ transform: [{ rotate: '-2deg' }] }}>
            <Image 
              source="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" 
              style={{ width: '100%', height: '100%' }} 
              contentFit="cover" 
            />
            <View className="absolute inset-0 bg-[#F97316]/10" />
          </View>

          <View className="px-4 relative">
            <Text className="absolute -top-3 left-0 text-[#F97316]/30 text-2xl font-serif">"</Text>
            <Text className="text-[#627D98] font-medium italic text-center text-xs leading-relaxed">
              The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.
            </Text>
          </View>
        </View>

        {/* Content Section */}
        <View className="px-6 pt-10 pb-6">
          <View className="items-start mb-8">
            <View className="bg-[#FFF7ED] border border-[#FED7AA] px-3 py-1.5 rounded-full mb-5">
              <Text className="text-[10px] font-bold uppercase tracking-widest text-[#F97316]">Step 01 / 03</Text>
            </View>
            
            <Text className="text-3xl font-bold text-[#102A43] leading-tight mb-4">
              Welcome to your <Text className="text-[#F97316]">Sanctuary of Focus.</Text>
            </Text>
            
            <Text className="text-[#627D98] text-[15px] leading-relaxed font-medium">
              Lumora is designed to help you transform your academic journey through AI-driven strategies and intentional habit building.
            </Text>
          </View>

          {/* Features */}
          <View className="gap-y-6 mb-12">
            <View className="flex-row items-start gap-4">
              <View className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100/50">
                <Text className="text-emerald-500 text-lg">💡</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-[#102A43] mb-1">Intelligent Assistance</Text>
                <Text className="text-[13px] text-[#627D98] font-medium leading-relaxed">
                  Personalized AI models that adapt to your unique study patterns.
                </Text>
              </View>
            </View>

            <View className="flex-row items-start gap-4">
              <View className="w-12 h-12 bg-[#FFF7ED] rounded-2xl flex items-center justify-center border border-[#FED7AA]/50">
                <Text className="text-[#F97316] text-lg">⚡</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-[#102A43] mb-1">Focused Sessions</Text>
                <Text className="text-[13px] text-[#627D98] font-medium leading-relaxed">
                  Minimize distractions with curated productivity environments.
                </Text>
              </View>
            </View>
          </View>

          {/* Let's Begin Button */}
          <TouchableOpacity
            className="w-full py-4 rounded-xl items-center justify-center flex-row gap-2 shadow-lg"
            style={{ backgroundColor: '#F97316', shadowColor: '#F97316', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 }}
            activeOpacity={0.8}
            onPress={() => router.push('/(auth)/survey')}
          >
            <Text className="text-white font-bold text-[15px]">Let's Begin</Text>
            <Text className="text-white text-sm">→</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="mt-auto pt-6 px-6 items-center">
          <Text className="text-[9px] font-mono font-bold text-[#829AB1] uppercase tracking-[0.2em] mb-3">
            Secured by Lumora Intelligence
          </Text>
          <View className="flex-row justify-center gap-6">
            <Text className="text-[11px] font-bold text-[#829AB1]">Privacy Policy</Text>
            <Text className="text-[11px] font-bold text-[#829AB1]">Terms of Use</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
