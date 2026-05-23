import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { dashboardApi, plannerApi } from '../../services/api';

export default function DashboardScreen() {
  const router = useRouter();
  const [data, setData] = useState<any>({});
  const [recentSessions, setRecentSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  })();

  const loadDashboard = async () => {
    try {
      const metrics = await dashboardApi.getMetrics();
      setData(metrics.data || metrics);
      setRecentSessions((metrics.data || metrics).recent_sessions || []);
    } catch (err) {
      console.log('Dashboard load error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadDashboard();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    loadDashboard();
  }, []);

  const metrics = [
    { label: 'Focus Sessions', value: data.focus_sessions || 0, icon: '🎯', bg: 'bg-indigo-50' },
    { label: 'Task Efficiency', value: Math.round(data.task_efficiency || 0) + '%', icon: '⚡', bg: 'bg-emerald-50' },
    { label: 'Deep Work Hours', value: (data.deep_work_hours || 0).toFixed?.(1) + 'h', icon: '🔋', bg: 'bg-violet-50' },
    { label: 'Consistency', value: Math.round(data.consistency || 0) + '%', icon: '📈', bg: 'bg-amber-50' },
  ];

  if (isLoading) {
    return (
      <View className="flex-1 bg-[#F9FAFB] items-center justify-center">
        <ActivityIndicator size="large" color="#3D3ACE" />
        <Text className="text-slate-400 font-bold mt-4">Loading your sanctuary...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#F9FAFB]">
      <StatusBar style="dark" />
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#3D3ACE" />}
      >
        {/* Header */}
        <View className="px-6 pt-16 pb-6">
          <Text className="text-[11px] font-black uppercase tracking-[3px] mb-2" style={{ color: '#3D3ACE' }}>
            Your Sanctuary Dashboard
          </Text>
          <Text className="text-3xl font-black text-[#1E1B4B] mb-2">
            {greeting}! 👋
          </Text>
          <Text className="text-slate-500 font-medium">
            You have <Text className="font-black" style={{ color: '#3D3ACE' }}>{data.focus_sessions || 0} focus sessions</Text> completed this week.
          </Text>
        </View>

        {/* Stats Grid */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          className="px-6 mb-6"
          contentContainerStyle={{ gap: 12 }}
        >
          {metrics.map((stat, i) => (
            <View key={i} className={`${stat.bg} rounded-3xl p-5 w-40`}>
              <Text className="text-2xl mb-2">{stat.icon}</Text>
              <Text className="text-2xl font-black text-[#1E1B4B]">{stat.value}</Text>
              <Text className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{stat.label}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Focus Map */}
        <View className="px-6 mb-6">
          <View className="bg-white rounded-[32px] p-6 border border-slate-50">
            <Text className="text-lg font-black text-[#1E1B4B] mb-1">Your Focus Map</Text>
            <Text className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Weekly Activity</Text>

            <View className="flex-row items-end justify-between gap-2" style={{ height: 120 }}>
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day, i) => {
                const weeklyMap = data.weekly_focus_map || {};
                const values = Object.values(weeklyMap) as number[];
                const maxCount = Math.max(...values, 1);
                const today = new Date();
                const todayDay = today.getDay();
                const monday = new Date(today);
                monday.setDate(today.getDate() - (todayDay === 0 ? 6 : todayDay - 1));
                const d = new Date(monday);
                d.setDate(d.getDate() + i);
                const dateStr = d.toISOString().split('T')[0];
                const count = (weeklyMap[dateStr] as number) || 0;
                const heightPercent = Math.max((count / maxCount) * 100, 8);
                const isToday = dateStr === today.toISOString().split('T')[0];

                return (
                  <View key={i} className="flex-1 items-center gap-2">
                    <View className="w-full bg-slate-50 rounded-xl overflow-hidden" style={{ height: 100 }}>
                      <View className="w-full absolute bottom-0 rounded-t-xl" style={{ height: `${heightPercent}%`, backgroundColor: '#3D3ACE' }} />
                    </View>
                    <Text className={`text-[9px] font-black ${isToday ? 'text-[#3D3ACE]' : 'text-slate-400'}`}>{day}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        {/* Recent Sessions */}
        <View className="px-6 mb-6">
          <View className="bg-white rounded-[32px] p-6 border border-slate-50">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-lg font-black text-[#1E1B4B]">Recent Focus Sessions</Text>
              <TouchableOpacity onPress={() => router.push('/(dashboard)/planner')}>
                <Text className="text-[11px] font-black uppercase tracking-widest" style={{ color: '#3D3ACE' }}>View All</Text>
              </TouchableOpacity>
            </View>

            {recentSessions.length === 0 ? (
              <View className="items-center py-8">
                <Text className="text-slate-400 font-bold mb-2">No sessions yet.</Text>
                <TouchableOpacity onPress={() => router.push('/(dashboard)/planner')}>
                  <Text className="font-bold" style={{ color: '#3D3ACE' }}>Go to Planner →</Text>
                </TouchableOpacity>
              </View>
            ) : (
              recentSessions.slice(0, 5).map((item: any, i: number) => (
                <View key={i} className="flex-row items-center gap-4 p-4 rounded-2xl border border-slate-50 mb-3">
                  <View className={`w-12 h-12 rounded-2xl items-center justify-center ${item.status === 'completed' ? 'bg-emerald-50' : 'bg-indigo-50'}`}>
                    <Text className="text-xl">{item.status === 'completed' ? '✅' : '🧠'}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-black text-[#1E1B4B]">{item.title}</Text>
                    <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                      {item.start_time} • {item.duration_minutes}m
                    </Text>
                  </View>
                  <View className={`px-3 py-1 rounded-full ${item.status === 'completed' ? 'bg-emerald-50' : 'bg-indigo-50'}`}>
                    <Text className={`text-[9px] font-black uppercase ${item.status === 'completed' ? 'text-emerald-500' : 'text-[#3D3ACE]'}`}>
                      {item.status}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-6">
          <View className="rounded-[32px] p-6 overflow-hidden" style={{ backgroundColor: '#4338CA' }}>
            <Text className="text-xl font-black text-white mb-4">Quick Actions</Text>
            <View className="gap-3 mb-6">
              {[
                { label: 'Create Study Session', tab: 'planner' },
                { label: 'Set Weekly Target', tab: 'planner' },
                { label: 'Write Reflection', tab: 'notes' },
              ].map((action, i) => (
                <TouchableOpacity 
                  key={i} 
                  className="flex-row items-center gap-3"
                  onPress={() => router.push(`/(dashboard)/${action.tab}` as any)}
                >
                  <View className="w-2 h-2 bg-white/50 rounded-full" />
                  <Text className="text-indigo-100 font-bold text-sm">{action.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity 
              className="bg-white py-4 rounded-2xl items-center"
              onPress={() => router.push('/(dashboard)/planner')}
            >
              <Text className="font-black text-sm" style={{ color: '#4338CA' }}>Start Deep Work</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
