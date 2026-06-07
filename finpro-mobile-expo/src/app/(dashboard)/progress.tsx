import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import * as SecureStore from 'expo-secure-store';
import { dashboardApi } from '../../services/api';

export default function ProgressScreen() {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [progressData, setProgressData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const stored = await SecureStore.getItemAsync('srl_profile');
        if (stored) {
          try {
            setProfile(JSON.parse(stored));
          } catch (e) {}
        }
        
        const res = await dashboardApi.getProgress();
        if (res.data) {
          setProgressData(res.data);
          if (res.data.latest_result?.CategoryResult) {
            setProfile(JSON.parse(res.data.latest_result.CategoryResult));
          }
        }
      } catch (err) {
        console.log('Error loading progress:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 bg-surface-warm dark:bg-dark-bg items-center justify-center">
        <ActivityIndicator size="large" color="#F97316" />
      </View>
    );
  }

  const dimensionDelta = progressData?.dimension_delta;
  const dimensions = [
    { key: 'planning', label: 'Planning' },
    { key: 'time_management', label: 'Time Management' },
    { key: 'cognitive', label: 'Cognitive Strategy' },
    { key: 'reflection', label: 'Reflection' }
  ];

  return (
    <View className="flex-1 bg-surface-warm dark:bg-dark-bg">
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 32 }}>
        
        {/* Header */}
        <View className="px-6 pt-16 pb-6 border-b border-navy-100 dark:border-dark-border">
          <Text className="text-3xl font-black text-navy-900 dark:text-text-primary mb-2">Progress</Text>
          <Text className="text-navy-500 dark:text-text-muted font-medium text-xs">
            Track your learning development over time.
          </Text>
        </View>

        {/* Stats Row */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6 mt-6 mb-6 pb-2" contentContainerStyle={{ gap: 12 }}>
          <View className="bg-white dark:bg-dark-panel border border-navy-100 dark:border-dark-border p-4 rounded-3xl w-40 shadow-sm">
            <Text className="text-navy-500 dark:text-text-muted text-[9px] font-black uppercase tracking-widest mb-1">Current Profile</Text>
            <Text className="text-navy-900 dark:text-text-primary text-lg font-black mt-1" numberOfLines={1}>{profile?.profile_title || 'Learner'}</Text>
          </View>
          <View className="bg-white dark:bg-dark-panel border border-navy-100 dark:border-dark-border p-4 rounded-3xl w-40 shadow-sm">
            <Text className="text-navy-500 dark:text-text-muted text-[9px] font-black uppercase tracking-widest mb-1">Consistency</Text>
            <Text className="text-brand-500 text-3xl font-black">{profile?.consistency_score || 0}%</Text>
            <Text className="text-navy-500 dark:text-text-muted text-[10px] mt-1">active days / week</Text>
          </View>
          <View className="bg-white dark:bg-dark-panel border border-navy-100 dark:border-dark-border p-4 rounded-3xl w-40 shadow-sm">
            <Text className="text-navy-500 dark:text-text-muted text-[9px] font-black uppercase tracking-widest mb-1">Deep Work</Text>
            <Text className="text-emerald-500 dark:text-emerald-400 text-3xl font-black">{profile?.deep_work_capacity || 0}%</Text>
            <Text className="text-navy-500 dark:text-text-muted text-[10px] mt-1">capacity</Text>
          </View>
          <View className="bg-white dark:bg-dark-panel border border-navy-100 dark:border-dark-border p-4 rounded-3xl w-40 shadow-sm">
            <Text className="text-navy-500 dark:text-text-muted text-[9px] font-black uppercase tracking-widest mb-1">Retention</Text>
            <Text className="text-violet-500 dark:text-violet-400 text-3xl font-black">{profile?.retention_score || 0}%</Text>
            <Text className="text-navy-500 dark:text-text-muted text-[10px] mt-1">knowledge retention</Text>
          </View>
        </ScrollView>

        {/* SRL Score Trend */}
        <View className="px-6 mb-6">
          <View className="bg-white dark:bg-dark-panel border border-navy-100 dark:border-dark-border p-6 rounded-3xl shadow-sm">
            <Text className="text-navy-900 dark:text-text-primary text-base font-black mb-6">SRL Score Trend</Text>
            
            {progressData?.assessment_trend?.length > 0 ? (
              <View className="gap-3">
                {progressData.assessment_trend.map((entry: any) => {
                  const date = new Date(entry.CreatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                  const scores = [entry.PlanningScore, entry.TimeManagementScore, entry.CognitiveScore, entry.ReflectionScore].filter(s => s != null);
                  const rawAvg = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
                  const avg = Math.round((rawAvg / 25) * 100);
                  
                  return (
                    <View key={entry.ResultID} className="flex-row items-center gap-3">
                      <Text className="text-navy-500 dark:text-text-muted text-[10px] font-bold w-20">{date}</Text>
                      <View className="flex-1 h-2 bg-navy-50 dark:bg-dark-surface rounded-full overflow-hidden">
                        <View className="h-full bg-brand-500 rounded-full" style={{ width: `${avg}%` }} />
                      </View>
                      <Text className="text-navy-900 dark:text-text-primary text-[10px] font-black w-8 text-right">{avg}%</Text>
                    </View>
                  );
                })}
              </View>
            ) : (
              <View>
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-navy-500 dark:text-text-muted text-[10px] font-bold">Latest Assessment</Text>
                  <Text className="text-navy-900 dark:text-text-primary text-xs font-black">{profile?.consistency_score || 85}%</Text>
                </View>
                <View className="h-2 bg-navy-50 dark:bg-dark-surface rounded-full overflow-hidden">
                  <View className="h-full bg-brand-500 rounded-full" style={{ width: `${profile?.consistency_score || 85}%` }} />
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Dimension Analysis */}
        <View className="px-6 mb-6">
          <View className="bg-white dark:bg-dark-panel border border-navy-100 dark:border-dark-border p-6 rounded-3xl shadow-sm">
            <Text className="text-navy-900 dark:text-text-primary text-base font-black mb-6">Dimension Analysis</Text>
            
            {!dimensionDelta ? (
              <View className="items-center py-4">
                <Text className="text-navy-500 dark:text-text-muted text-xs text-center font-bold">
                  Take another assessment later to unlock comparative dimension analysis.
                </Text>
              </View>
            ) : (
              <View className="flex-row flex-wrap justify-between gap-y-4">
                {dimensions.map(dim => {
                  const delta = dimensionDelta[dim.key] || 0;
                  const isPositive = delta > 0;
                  const isNegative = delta < 0;
                  
                  return (
                    <View key={dim.key} className="bg-surface-warm dark:bg-dark-bg border border-navy-100 dark:border-dark-border p-4 rounded-2xl w-[48%]">
                      <Text className="text-navy-500 dark:text-text-muted text-[9px] font-black uppercase tracking-widest mb-2">{dim.label}</Text>
                      <View className="flex-row items-center gap-2">
                        <Text className={`text-2xl font-black ${isPositive ? 'text-emerald-500 dark:text-emerald-400' : isNegative ? 'text-rose-500 dark:text-rose-400' : 'text-navy-500 dark:text-text-muted'}`}>
                          {isPositive ? '+' : ''}{delta}
                        </Text>
                        {isPositive && <Text className="text-emerald-500 dark:text-emerald-400 font-bold text-lg leading-none mt-1">↑</Text>}
                        {isNegative && <Text className="text-rose-500 dark:text-rose-400 font-bold text-lg leading-none mt-1">↓</Text>}
                        {!isPositive && !isNegative && <Text className="text-navy-500 dark:text-text-muted font-bold">—</Text>}
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </View>

        {/* CTA Buttons */}
        <View className="px-6">
          <TouchableOpacity 
            className="bg-brand-500 px-6 py-4 rounded-2xl w-full items-center shadow-sm flex-row justify-center gap-2"
            onPress={() => router.push('/(auth)/survey')}
          >
            <Text className="text-white font-black text-sm">⟳ Retake Assessment</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}
