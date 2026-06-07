import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { dashboardApi, plannerApi, notesApi } from '../../services/api';

import { useColorScheme } from 'nativewind';

export default function DashboardScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const [data, setData] = useState<any>({});
  const [recentSessions, setRecentSessions] = useState<any[]>([]);
  const [recentNotes, setRecentNotes] = useState<any[]>([]);
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

      // Fetch Recent Notes
      try {
        const notesRes = await notesApi.getNotes();
        const allNotes = notesRes.data || [];
        setRecentNotes(allNotes.slice(0, 2));
      } catch (err) {
        console.log('Failed to fetch recent notes:', err);
      }
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
      <View className="flex-1 bg-surface-warm dark:bg-dark-bg items-center justify-center">
        <ActivityIndicator size="large" color="#F97316" />
        <Text className="text-navy-500 dark:text-text-muted font-bold mt-4">Loading your sanctuary...</Text>
      </View>
    );
  }

  // Current Date
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <View className="flex-1 bg-surface-warm dark:bg-dark-bg">
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#F97316" />}
      >
        {/* Header Section */}
        <View className="px-6 pt-16 pb-6 border-b border-navy-100 dark:border-dark-border">
          <View className="flex-row justify-between items-start mb-2">
            <Text className="text-2xl font-black text-navy-900 dark:text-text-primary flex-1 mr-4">
              {greeting}, User. Ready for a deep focus session?
            </Text>
            <TouchableOpacity 
              className="w-10 h-10 bg-white dark:bg-dark-panel border border-navy-100 dark:border-dark-border rounded-full items-center justify-center shadow-sm"
              onPress={() => router.push('/(dashboard)/settings')}
            >
              <Text className="text-navy-500 dark:text-text-muted">⚙️</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <Text className="text-navy-500 dark:text-text-muted text-xs font-medium">
              Your cognitive readiness is at <Text className="text-navy-900 dark:text-text-primary font-bold">94%</Text> today. Optimal for intensive study.
            </Text>
          </View>
        </View>

        {/* Daily Overview Card */}
        <View className="px-6 mt-6 mb-6">
          <View className="bg-navy-900 dark:bg-dark-surface rounded-3xl p-6 overflow-hidden shadow-lg">
            <View className="flex-row justify-between items-start mb-6">
              <View>
                <Text className="text-white text-lg font-black">Daily Overview</Text>
                <Text className="text-slate-400 text-xs mt-1">{dateStr}</Text>
              </View>
              <TouchableOpacity 
                className="bg-white dark:bg-dark-panel/10 px-4 py-2 rounded-full"
                onPress={() => router.push('/(dashboard)/planner')}
              >
                <Text className="text-white text-xs font-bold">Full Schedule &gt;</Text>
              </TouchableOpacity>
            </View>
            
            {/* Contextual Empty State or Next Session */}
            <View className="mt-4">
              <Text className="text-slate-300 text-sm font-medium italic">
                No sessions planned for today. 
              </Text>
            </View>

            {/* Subtle Gradient Overlay */}
            <View className="absolute -right-10 -bottom-10 w-40 h-40 bg-brand-500/20 rounded-full blur-3xl" />
          </View>
        </View>

        {/* Recent Notes */}
        <View className="px-6 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-navy-900 dark:text-text-primary text-base font-black">Recent Notes</Text>
            <TouchableOpacity onPress={() => router.push('/(dashboard)/notes')}>
              <Text className="text-brand-500 text-xs font-bold tracking-widest uppercase">View All</Text>
            </TouchableOpacity>
          </View>
          {recentNotes.length > 0 ? (
            <View style={{ gap: 12 }}>
              {recentNotes.map((note, index) => (
                <TouchableOpacity 
                  key={note.id || index}
                  onPress={() => router.push('/(dashboard)/notes')}
                  className="bg-white dark:bg-dark-panel border border-navy-100 dark:border-dark-border p-5 rounded-3xl shadow-sm flex-row items-center justify-between"
                  activeOpacity={0.7}
                >
                  <View className="flex-1 mr-4">
                    <View className="flex-row items-center mb-1" style={{ gap: 6 }}>
                      {note.is_pinned && <Text style={{ fontSize: 12 }}>📌</Text>}
                      <Text className="text-navy-900 dark:text-text-primary text-sm font-black" numberOfLines={1}>{note.title || 'Untitled Note'}</Text>
                    </View>
                    <Text className="text-navy-500 dark:text-text-muted text-xs font-medium" numberOfLines={1}>
                      {note.content_text || 'Empty note...'}
                    </Text>
                  </View>
                  <Text className="text-navy-500 dark:text-text-muted">›</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View className="bg-white dark:bg-dark-panel border border-navy-100 dark:border-dark-border border-dashed rounded-3xl p-8 items-center justify-center">
              <Text className="text-navy-500 dark:text-text-muted text-sm font-medium">No recent notes found.</Text>
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View className="px-6 mb-6">
          <Text className="text-navy-500 dark:text-text-muted text-[10px] font-black uppercase tracking-[2px] mb-3">Quick Actions</Text>
          <View className="gap-3">
            <TouchableOpacity 
              className="bg-white dark:bg-dark-panel border border-navy-100 dark:border-dark-border shadow-sm p-4 rounded-2xl flex-row items-center justify-between"
              onPress={() => router.push('/(dashboard)/notes')}
            >
              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 rounded-xl bg-blue-50 items-center justify-center">
                  <Text className="text-blue-500 text-xs">📝</Text>
                </View>
                <Text className="text-navy-900 dark:text-text-primary text-sm font-bold">New Note</Text>
              </View>
              <Text className="text-navy-500 dark:text-text-muted">›</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="bg-white dark:bg-dark-panel border border-navy-100 dark:border-dark-border shadow-sm p-4 rounded-2xl flex-row items-center justify-between"
              onPress={() => router.push('/(dashboard)/planner')}
            >
              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 rounded-xl bg-emerald-50 items-center justify-center">
                  <Text className="text-emerald-500 text-xs">📅</Text>
                </View>
                <Text className="text-navy-900 dark:text-text-primary text-sm font-bold">Plan Session</Text>
              </View>
              <Text className="text-navy-500 dark:text-text-muted">›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quote */}
        <View className="px-6 mb-4">
          <View className="bg-[#EA580C] rounded-3xl p-6 shadow-sm">
            <Text className="text-white text-3xl font-black opacity-50 mb-1 leading-none">"</Text>
            <Text className="text-white text-sm font-medium italic -mt-2 mb-4 leading-relaxed">
              Wisdom is not a product of schooling but of the lifelong attempt to acquire it.
            </Text>
            <Text className="text-white/80 text-[10px] font-black tracking-widest uppercase">
              — Albert Einstein
            </Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
