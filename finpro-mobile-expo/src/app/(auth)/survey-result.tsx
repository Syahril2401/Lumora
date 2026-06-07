import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import srlProfiles from '../../data/srl_profiles_81.json';

export default function SurveyResultScreen() {
  const router = useRouter();
  const { profileId } = useLocalSearchParams<{ profileId: string }>();
  const [profile, setProfile] = useState<any>(null);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    const found = srlProfiles.find((p: any) => p.combination_id === profileId);
    setProfile(found || srlProfiles[0]);

    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 40, friction: 7, useNativeDriver: true }),
    ]).start();
  }, [profileId]);

  if (!profile) return null;

  return (
    <View className="flex-1 bg-[#FAFAF9]">
      <StatusBar style="dark" />
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* Celebration Header */}
        <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }} className="items-center pt-20 pb-8 px-6">
          <View className="flex-row items-center gap-2 mb-4 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            <Text className="text-emerald-500 font-bold text-[10px] uppercase tracking-widest">✨ Assessment Complete</Text>
          </View>
          <Text className="text-[28px] font-bold text-[#102A43] text-center leading-tight mb-2">
            Your Study Profile:{'\n'}
            <Text className="text-[#F97316]">{profile.profile_title}</Text>
          </Text>
          <Text className="text-[#627D98] text-sm text-center font-medium mt-2 px-4 leading-relaxed">
            We've analyzed your responses and created a personalized roadmap for your academic success.
          </Text>
        </Animated.View>

        {/* Stats Row */}
        <Animated.View style={{ opacity: fadeAnim }} className="flex-row px-6 gap-3 mb-6">
          <View className="flex-1 bg-white rounded-2xl p-4 items-center border border-[#E8EDF2] shadow-sm">
            <Text className="text-xl font-bold text-[#F97316] mb-1">{profile.deep_work_capacity}%</Text>
            <Text className="text-[9px] font-bold text-[#102A43] uppercase tracking-widest text-center">Deep Work</Text>
          </View>
          <View className="flex-1 bg-white rounded-2xl p-4 items-center border border-[#E8EDF2] shadow-sm">
            <Text className="text-xl font-bold text-[#F97316] mb-1">{profile.consistency_score}%</Text>
            <Text className="text-[9px] font-bold text-[#102A43] uppercase tracking-widest text-center">Consistency</Text>
          </View>
          <View className="flex-1 bg-white rounded-2xl p-4 items-center border border-[#E8EDF2] shadow-sm">
            <Text className="text-xl font-bold text-[#F97316] mb-1">{profile.retention_score}%</Text>
            <Text className="text-[9px] font-bold text-[#102A43] uppercase tracking-widest text-center">Retention</Text>
          </View>
        </Animated.View>

        {/* Cognitive Style */}
        <View className="px-6 mb-4">
          <View className="bg-white rounded-3xl p-6 border border-[#E8EDF2] shadow-sm items-center">
             <Text className="text-sm font-bold text-[#102A43] mb-2">Your Cognitive Style</Text>
             <Text className="text-sm font-bold text-[#F97316] uppercase tracking-widest">{profile.cognitive_style}</Text>
          </View>
        </View>

        {/* Strengths */}
        {profile.strengths?.length > 0 && (
          <View className="px-6 mb-4">
            <View className="bg-white rounded-[24px] p-6 border border-[#E8EDF2] shadow-sm">
              <Text className="text-xs font-bold text-[#627D98] mb-4">Core Strengths</Text>
              {profile.strengths.map((s: any, i: number) => (
                <View key={i} className="mb-4 flex-row gap-3">
                  <Text className="text-emerald-500 mt-1">{s.icon || '✦'}</Text>
                  <View className="flex-1">
                    <Text className="text-[#102A43] font-bold text-[14px] mb-1">{s.title}</Text>
                    <Text className="text-[#627D98] text-[13px] leading-relaxed">{s.desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Areas for Growth */}
        {profile.areas_for_growth?.length > 0 && (
          <View className="px-6 mb-4">
            <View className="bg-[#FFFBEB] rounded-[24px] p-6 border border-[#FDE68A] shadow-sm">
              <Text className="text-xs font-bold text-[#D97706] mb-4">📈 Areas for Growth</Text>
              {profile.areas_for_growth.map((g: any, i: number) => (
                <View key={i} className="mb-4">
                  <Text className="text-[#102A43] font-bold text-[14px] mb-1">{g.title}</Text>
                  <Text className="text-[#92400E] text-[13px] leading-relaxed opacity-80">{g.desc}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Recommendations */}
        <View className="px-6 mb-4">
           <View className="bg-[#F0F9FF] rounded-[24px] p-6 border border-[#BAE6FD] shadow-sm">
              <Text className="text-xs font-bold text-[#0369A1] mb-4">◇ Recommendations</Text>
              {profile.recommendations?.map((r: any, i: number) => (
                <View key={i} className="mb-4 border-b border-[#BAE6FD]/30 pb-4 last:border-0 last:pb-0">
                  <Text className="text-[#0C4A6E] font-bold text-[14px] mb-1">{r.title}</Text>
                  <Text className="text-[#0369A1] text-[13px] leading-relaxed opacity-80">{r.desc}</Text>
                </View>
              ))}
           </View>
        </View>

        {/* AI Strategy */}
        <View className="px-6 mb-8">
          <View className="bg-[#102A43] rounded-[24px] p-6 shadow-md">
            <View className="bg-[#F97316]/20 self-start px-2 py-1 rounded mb-4">
               <Text className="text-[10px] font-bold text-[#F97316] uppercase tracking-widest">AI Strategy For You</Text>
            </View>
            <Text className="text-xl font-bold text-white mb-2">{profile.ai_strategy?.title}</Text>
            <Text className="text-[#9CB4CC] text-[14px] leading-relaxed">{profile.ai_strategy?.desc}</Text>
            
            <TouchableOpacity className="mt-6 flex-row items-center gap-2">
               <Text className="text-[#F97316] font-bold text-sm">Explore Strategy</Text>
               <Text className="text-[#F97316] font-bold">→</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quote Footer */}
        <View className="px-6 mb-4">
           <Text className="text-center text-[#9CA3AF] text-xs italic">
             "Small habits are the architecture of great minds." — Lumora AI
           </Text>
        </View>

      </ScrollView>

      {/* Bottom CTA */}
      <View className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-white/90 border-t border-[#E8EDF2]" style={{ paddingBottom: 24 }}>
        <TouchableOpacity
          onPress={() => router.replace('/(dashboard)')}
          className="w-full py-4 rounded-xl items-center bg-[#F97316]"
          style={{ shadowColor: '#F97316', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 }}
        >
          <Text className="text-white font-bold text-[15px]">Go to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
