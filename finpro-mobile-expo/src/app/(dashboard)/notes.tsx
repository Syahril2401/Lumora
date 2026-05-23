import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { notesApi } from '../../services/api';

export default function NotesScreen() {
  const [notes, setNotes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadNotes = async () => {
    try {
      const res = await notesApi.getNotes();
      setNotes(res.data || []);
    } catch (err) {
      console.log('Notes load error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadNotes();
    setRefreshing(false);
  }, []);

  const handlePin = async (id: string) => {
    try {
      await notesApi.togglePin(id);
      await loadNotes();
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
  };

  const handleDelete = async (id: string) => {
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await notesApi.deleteNote(id);
            await loadNotes();
          } catch (err: any) {
            Alert.alert('Error', err.message);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const categoryColors: Record<string, string> = {
    lecture: 'bg-blue-50',
    reflection: 'bg-violet-50',
    research: 'bg-emerald-50',
    idea: 'bg-amber-50',
  };

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
            Deep Notes
          </Text>
          <Text className="text-3xl font-black text-[#1E1B4B]">Your Notes</Text>
          <Text className="text-slate-500 font-medium mt-1">
            {notes.length} note{notes.length !== 1 ? 's' : ''} saved
          </Text>
        </View>

        {/* Notes List */}
        <View className="px-6">
          {notes.length === 0 ? (
            <View className="bg-white rounded-[32px] p-10 items-center border border-slate-50">
              <Text className="text-4xl mb-4">📝</Text>
              <Text className="text-lg font-black text-[#1E1B4B] mb-2">No notes yet</Text>
              <Text className="text-slate-400 font-medium text-center">
                Start capturing your thoughts, reflections, and study insights.
              </Text>
            </View>
          ) : (
            notes.map((note: any, i: number) => (
              <TouchableOpacity
                key={note.id || i}
                className="bg-white rounded-3xl p-6 border border-slate-50 mb-4"
                activeOpacity={0.7}
              >
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1">
                    <View className="flex-row items-center gap-2 mb-2">
                      {note.is_pinned && <Text className="text-sm">📌</Text>}
                      <Text className="text-base font-black text-[#1E1B4B] flex-1" numberOfLines={1}>
                        {note.title}
                      </Text>
                    </View>
                    {note.category && (
                      <View className={`self-start px-3 py-1 rounded-full ${categoryColors[note.category] || 'bg-slate-50'}`}>
                        <Text className="text-[9px] font-black uppercase tracking-widest text-slate-500">{note.category}</Text>
                      </View>
                    )}
                  </View>
                </View>

                {note.content && (
                  <Text className="text-slate-500 text-sm mb-4 leading-relaxed" numberOfLines={3}>
                    {note.content}
                  </Text>
                )}

                <View className="flex-row gap-3">
                  <TouchableOpacity
                    className="py-2 px-4 rounded-xl bg-indigo-50"
                    onPress={() => handlePin(note.id)}
                  >
                    <Text className="text-[#3D3ACE] font-bold text-xs">
                      {note.is_pinned ? 'Unpin' : 'Pin'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="py-2 px-4 rounded-xl bg-red-50"
                    onPress={() => handleDelete(note.id)}
                  >
                    <Text className="text-red-400 font-bold text-xs">Delete</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
