import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
// Import the local JSON file
import srlProfiles from '../../data/srl_profiles_81.json';

export default function ProfileScreen() {
  const router = useRouter();
  const { logout } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    // For demonstration, we'll pick a random profile from the 81 available profiles
    // In a real app, this 'combination_id' would come from the backend after a quiz
    const randomProfile = srlProfiles[Math.floor(Math.random() * srlProfiles.length)];
    setProfileData(randomProfile);
  }, []);

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Logout', 
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/');
        }
      }
    ]);
  };

  return (
    <View className="flex-1 bg-[#F9FAFB]">
      <StatusBar style="dark" />
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 32 }}>
        
        {/* Header */}
        <View className="px-6 pt-16 pb-6 bg-[#3D3ACE] rounded-b-[40px]">
          <View className="flex-row justify-between items-start mb-6">
            <View>
              <Text className="text-[11px] font-black uppercase tracking-[3px] text-indigo-200 mb-1">
                Student Profile
              </Text>
              <Text className="text-3xl font-black text-white">Alex J.</Text>
              <Text className="text-indigo-100 font-medium">alex@example.com</Text>
            </View>
            <View className="w-16 h-16 bg-white/20 rounded-2xl items-center justify-center border border-white/30">
              <Text className="text-2xl">🎓</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            className="bg-white/20 py-3 rounded-xl items-center"
            onPress={handleLogout}
          >
            <Text className="text-white font-bold">Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* SRL Profile Card */}
        {profileData && (
          <View className="px-6 -mt-4">
            <View className="bg-white rounded-[32px] p-6 border border-slate-50 shadow-xl shadow-indigo-100/50">
              <View className="bg-[#EEF2FF] self-start px-3 py-1 rounded-full mb-4">
                <Text className="text-[9px] font-black uppercase tracking-widest text-[#3D3ACE]">
                  Your Learning Style
                </Text>
              </View>

              <Text className="text-2xl font-black text-[#1E1B4B] mb-2">
                {profileData.profile_title}
              </Text>
              <Text className="text-slate-500 font-medium mb-6">
                Cognitive Style: <Text className="font-bold text-slate-700">{profileData.cognitive_style}</Text>
              </Text>

              {/* Strengths & Weaknesses */}
              <View className="flex-row gap-4 mb-6">
                <View className="flex-1 bg-emerald-50 rounded-2xl p-4">
                  <Text className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-2">Strengths</Text>
                  {profileData.strengths?.length > 0 ? (
                    profileData.strengths.slice(0, 2).map((s: any, i: number) => (
                      <Text key={i} className="text-sm font-medium text-emerald-800 mb-1">• {s.title}</Text>
                    ))
                  ) : (
                    <Text className="text-sm font-medium text-emerald-800">No specific strengths listed.</Text>
                  )}
                </View>
                <View className="flex-1 bg-red-50 rounded-2xl p-4">
                  <Text className="text-xs font-black text-red-500 uppercase tracking-widest mb-2">Weaknesses</Text>
                  {profileData.weaknesses?.length > 0 ? (
                    profileData.weaknesses.slice(0, 2).map((w: any, i: number) => (
                      <Text key={i} className="text-sm font-medium text-red-800 mb-1">• {w.title}</Text>
                    ))
                  ) : (
                    <Text className="text-sm font-medium text-red-800">No specific weaknesses listed.</Text>
                  )}
                </View>
              </View>

              {/* AI Strategy */}
              <View className="bg-[#1E1B4B] rounded-2xl p-5">
                <View className="flex-row items-center gap-2 mb-2">
                  <Text className="text-lg">🤖</Text>
                  <Text className="text-sm font-black text-white uppercase tracking-widest">
                    AI Strategy for You
                  </Text>
                </View>
                <Text className="text-indigo-200 text-sm leading-relaxed font-medium">
                  {profileData.ai_strategy?.desc}
                </Text>
              </View>

            </View>
          </View>
        )}

      </ScrollView>
    </View>
  );
}
