import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { plannerApi } from '../../services/api';

export default function PlannerScreen() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadSessions = async () => {
    try {
      const res = await plannerApi.getSessions();
      setSessions(res.data || []);
    } catch (err) {
      console.log('Planner load error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadSessions();
    setRefreshing(false);
  }, []);

  const handleComplete = async (id: string) => {
    try {
      await plannerApi.completeSession(id);
      await loadSessions();
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
  };

  const handleDelete = async (id: string) => {
    Alert.alert('Delete Session', 'Are you sure you want to delete this session?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await plannerApi.deleteSession(id);
            await loadSessions();
          } catch (err: any) {
            Alert.alert('Error', err.message);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    loadSessions();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 bg-[#F9FAFB] items-center justify-center">
        <ActivityIndicator size="large" color="#3D3ACE" />
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
        <View className="px-6 pt-16 pb-4">
          <Text className="text-[11px] font-black uppercase tracking-[3px] mb-2" style={{ color: '#3D3ACE' }}>
            Focus Planner
          </Text>
          <Text className="text-3xl font-black text-[#1E1B4B]">Study Sessions</Text>
          <Text className="text-slate-500 font-medium mt-1">
            {sessions.length} session{sessions.length !== 1 ? 's' : ''} scheduled
          </Text>
        </View>

        {/* Sessions List */}
        <View className="px-6">
          {sessions.length === 0 ? (
            <View className="bg-white rounded-[32px] p-10 items-center border border-slate-50">
              <Text className="text-4xl mb-4">📅</Text>
              <Text className="text-lg font-black text-[#1E1B4B] mb-2">No sessions yet</Text>
              <Text className="text-slate-400 font-medium text-center">
                Create your first study session to start building consistency.
              </Text>
            </View>
          ) : (
            sessions.map((session: any, i: number) => (
              <View
                key={session.id || i}
                className="bg-white rounded-3xl p-6 border border-slate-50 mb-4"
              >
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1">
                    <Text className="text-base font-black text-[#1E1B4B]">{session.title}</Text>
                    <Text className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                      {session.focus_dimension || 'General'} • {session.duration_minutes || 0}m
                    </Text>
                  </View>
                  <View className={`px-3 py-1 rounded-full ${
                    session.status === 'completed' ? 'bg-emerald-50' : 
                    session.status === 'skipped' ? 'bg-red-50' : 'bg-indigo-50'
                  }`}>
                    <Text className={`text-[9px] font-black uppercase ${
                      session.status === 'completed' ? 'text-emerald-500' : 
                      session.status === 'skipped' ? 'text-red-400' : 'text-[#3D3ACE]'
                    }`}>
                      {session.status || 'pending'}
                    </Text>
                  </View>
                </View>

                {session.description && (
                  <Text className="text-slate-500 text-sm mb-4">{session.description}</Text>
                )}

                <View className="flex-row gap-3">
                  {session.status !== 'completed' && (
                    <TouchableOpacity
                      className="flex-1 py-3 rounded-xl items-center bg-emerald-50"
                      onPress={() => handleComplete(session.id)}
                    >
                      <Text className="text-emerald-600 font-bold text-xs">✓ Complete</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    className="flex-1 py-3 rounded-xl items-center bg-red-50"
                    onPress={() => handleDelete(session.id)}
                  >
                    <Text className="text-red-400 font-bold text-xs">Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
