import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Alert, ActivityIndicator, RefreshControl, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { useFocusEffect } from 'expo-router';
import { notesApi } from '../../services/api';

// Template definitions (matching web)
const TEMPLATES = [
  { id: 'blank', title: 'Blank Note', icon: '📄', desc: 'Start from scratch with a blank page.', content: '' },
  { id: 'daily', title: 'Daily Reflection', icon: '🌅', desc: "Quick reflection on your day's learning.",
    content: 'What did I study today?\nWhat strategy did I use?\nWhat worked well?\nWhat was difficult?\nWhat will I improve next time?' },
  { id: 'session', title: 'Study Session Review', icon: '⏱️', desc: 'Review what you achieved in a focus session.',
    content: 'Session goal:\nWhat I completed:\nWhat distracted me:\nWhat helped me focus:\nNext action:' },
  { id: 'weekly', title: 'Weekly Learning Review', icon: '📅', desc: 'Analyze your progress over the week.',
    content: "This week's main target:\nWhat I completed:\nWhat I struggled with:\nMost effective strategy:\nOne improvement for next week:" },
  { id: 'exam', title: 'Exam Preparation Note', icon: '🎓', desc: 'Plan and review your exam preparation.',
    content: 'Subject/topic:\nKey concepts:\nWeak areas:\nPractice plan:\nReview schedule:' },
  { id: 'cognitive', title: 'Cognitive Strategy Note', icon: '🧠', desc: 'Analyze the effectiveness of a learning strategy.',
    content: 'Topic/Method:\nStrategy used:\nRecall result:\nMistakes found:\nBetter strategy next time:' },
];

export default function NotesScreen() {
  const { colorScheme } = useColorScheme();
  const [notes, setNotes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<any>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [noteImage, setNoteImage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [loadNotes])
  );

  const handleSelectTemplate = async (template: typeof TEMPLATES[0]) => {
    setShowTemplateModal(false);
    try {
      const payload = {
        title: template.id === 'blank' ? 'Untitled' : template.title,
        content_json: JSON.stringify({
          blocks: template.content
            ? template.content.split('\n').map((line: string, i: number) => ({
                id: `block-${i}`,
                type: 'paragraph',
                content: line,
              }))
            : [],
        }),
        content_text: template.content || '',
        focus_dimension: 'General',
      };
      const res = await notesApi.createNote(payload);
      const newNote = res.data || res;
      await loadNotes();
      // Open editor for the new note
      openEditor(newNote);
    } catch (err) {
      Alert.alert('Error', 'Failed to create note');
    }
  };

  const openEditor = (note: any) => {
    setSelectedNote(note);
    setEditTitle(note.title || '');
    setEditContent(note.content_text || note.content || '');
    
    // Parse image from content_json if exists
    let imgBase64 = null;
    try {
      if (note.content_json) {
        const parsed = JSON.parse(note.content_json);
        const imgBlock = parsed.blocks?.find((b: any) => b.type === 'image');
        if (imgBlock && imgBlock.content) {
          imgBase64 = imgBlock.content;
        }
      }
    } catch (e) {}
    setNoteImage(imgBase64);

    setShowEditor(true);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets[0].base64) {
      setNoteImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  const handleSaveNote = async () => {
    if (!selectedNote) return;
    setIsSaving(true);
    try {
      const blocks: any[] = editContent.split('\n').map((line: string, i: number) => ({
        id: `block-${i}`,
        type: 'paragraph',
        content: line,
      }));

      if (noteImage) {
        blocks.push({
          id: `img-${Date.now()}`,
          type: 'image',
          content: noteImage
        });
      }

      await notesApi.updateNote(selectedNote.id, {
        title: editTitle,
        content_json: JSON.stringify({ blocks }),
        content_text: editContent,
        focus_dimension: selectedNote.focus_dimension || 'General',
      });
      setShowEditor(false);
      await loadNotes();
    } catch (err) {
      Alert.alert('Error', 'Failed to save note');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePin = async (id: string) => {
    try {
      await notesApi.togglePin(id);
      await loadNotes();
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Note', 'Are you sure? This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => {
        try {
          await notesApi.deleteNote(id);
          if (selectedNote?.id === id) {
            setShowEditor(false);
            setSelectedNote(null);
          }
          await loadNotes();
        } catch { Alert.alert('Error', 'Failed to delete'); }
      }},
    ]);
  };

  const filteredNotes = notes.filter((n: any) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (n.title || '').toLowerCase().includes(q) || (n.content_text || '').toLowerCase().includes(q);
  });

  const pinnedNotes = filteredNotes.filter((n: any) => n.is_pinned);
  const recentNotes = filteredNotes.filter((n: any) => !n.is_pinned);

  return (
    <View className="flex-1 bg-surface-warm dark:bg-dark-bg">
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#F97316" />}
      >
        {/* Header */}
        <View className="px-6 pt-16 pb-4">
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-3xl font-black text-navy-900 dark:text-text-primary">My Notes</Text>
            <TouchableOpacity
              onPress={() => setShowTemplateModal(true)}
              className="bg-brand-500 w-10 h-10 rounded-full items-center justify-center shadow-sm"
            >
              <Text className="text-white text-2xl leading-[24px]">+</Text>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="bg-white dark:bg-dark-panel border border-navy-100 dark:border-dark-border rounded-2xl flex-row items-center px-4 py-3 shadow-sm">
            <Text className="text-navy-500 dark:text-text-muted mr-3">🔍</Text>
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search notes..."
              placeholderTextColor="#627D98"
              className="flex-1 text-sm text-navy-900 dark:text-text-primary"
            />
          </View>
        </View>

        {isLoading ? (
          <View className="items-center py-12">
            <ActivityIndicator size="large" color="#F97316" />
          </View>
        ) : notes.length === 0 ? (
          /* Empty State: Show Template Picker by default */
          <View className="px-6">
            <View className="items-center py-8 mb-4">
              <Text className="text-navy-900 dark:text-text-primary text-base font-black mb-2">No notes yet</Text>
              <Text className="text-navy-500 dark:text-text-muted text-xs text-center mb-4">Choose a template to get started!</Text>
            </View>
            {/* Inline Template Grid */}
            <Text className="text-[9px] font-black text-navy-500 dark:text-text-muted uppercase tracking-widest mb-3">Choose a Template</Text>
            <View className="flex-row flex-wrap" style={{ gap: 12 }}>
              {TEMPLATES.map(tpl => (
                <TouchableOpacity
                  key={tpl.id}
                  onPress={() => handleSelectTemplate(tpl)}
                  className="bg-white dark:bg-dark-panel border border-navy-100 dark:border-dark-border rounded-2xl p-4 shadow-sm"
                  style={{ width: '47%' }}
                  activeOpacity={0.7}
                >
                  <View className="w-10 h-10 bg-surface-warm dark:bg-dark-bg rounded-xl items-center justify-center mb-3">
                    <Text style={{ fontSize: 20 }}>{tpl.icon}</Text>
                  </View>
                  <Text className="text-navy-900 dark:text-text-primary text-xs font-black mb-1">{tpl.title}</Text>
                  <Text className="text-navy-500 dark:text-text-muted text-[10px]" numberOfLines={2}>{tpl.desc}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <View className="px-6">
            {/* Recently Edited Header */}
            <View className="mt-2 mb-4 flex-row items-center justify-between">
              <View>
                <Text className="text-navy-900 dark:text-text-primary text-base font-black">Recently Edited</Text>
                <Text className="text-navy-500 dark:text-text-muted text-xs mt-1">Pick up right where you left off</Text>
              </View>
            </View>

            {/* Pinned Notes */}
            {pinnedNotes.length > 0 && (
              <View className="mb-4">
                <Text className="text-[9px] font-black text-navy-500 dark:text-text-muted uppercase tracking-widest mb-3">📌 Pinned</Text>
                {pinnedNotes.map((note: any) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onPress={() => openEditor(note)}
                    onPin={() => handlePin(note.id)}
                    onDelete={() => handleDelete(note.id)}
                  />
                ))}
              </View>
            )}

            {/* Recent Notes */}
            <Text className="text-[9px] font-black text-navy-500 dark:text-text-muted uppercase tracking-widest mb-3">Recent</Text>
            {recentNotes.map((note: any) => (
              <NoteCard
                key={note.id}
                note={note}
                onPress={() => openEditor(note)}
                onPin={() => handlePin(note.id)}
                onDelete={() => handleDelete(note.id)}
              />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Template Picker Modal */}
      <Modal visible={showTemplateModal} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(11,17,32,0.5)', justifyContent: 'center', padding: 20 }}>
          <View className="bg-white dark:bg-dark-panel rounded-3xl p-6" style={{ maxHeight: '80%' }}>
            <View className="flex-row items-center justify-between mb-5">
              <Text className="text-xl font-black text-navy-900 dark:text-text-primary">Choose a Template</Text>
              <TouchableOpacity onPress={() => setShowTemplateModal(false)}>
                <Text style={{ color: '#9FB3C8', fontSize: 22 }}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="flex-row flex-wrap" style={{ gap: 12 }}>
                {TEMPLATES.map(tpl => (
                  <TouchableOpacity
                    key={tpl.id}
                    onPress={() => handleSelectTemplate(tpl)}
                    className="bg-surface-warm dark:bg-dark-bg border border-navy-100 dark:border-dark-border rounded-2xl p-4"
                    style={{ width: '47%' }}
                    activeOpacity={0.7}
                  >
                    <View className="w-10 h-10 bg-white dark:bg-dark-panel rounded-xl items-center justify-center mb-3 shadow-sm">
                      <Text style={{ fontSize: 20 }}>{tpl.icon}</Text>
                    </View>
                    <Text className="text-navy-900 dark:text-text-primary text-xs font-black mb-1">{tpl.title}</Text>
                    <Text className="text-navy-300 dark:text-text-secondary text-[10px]" numberOfLines={2}>{tpl.desc}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Note Editor Modal */}
      <Modal visible={showEditor} animationType="slide">
        <View className="flex-1 bg-surface-warm dark:bg-dark-bg">
          {/* Editor Header */}
          <View className="px-6 pt-14 pb-4 border-b border-navy-100 dark:border-dark-border bg-white dark:bg-dark-panel flex-row items-center justify-between">
            <TouchableOpacity onPress={() => { handleSaveNote(); }}>
              <Text className="text-navy-500 dark:text-text-muted font-bold text-sm">← Back & Save</Text>
            </TouchableOpacity>
            <View className="flex-row" style={{ gap: 12 }}>
              <TouchableOpacity onPress={() => selectedNote && handlePin(selectedNote.id)}>
                <Text style={{ fontSize: 18 }}>{selectedNote?.is_pinned ? '📌' : '📍'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => selectedNote && handleDelete(selectedNote.id)}>
                <Text style={{ color: '#F43F5E', fontSize: 14, fontWeight: '700' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Formatting Toolbar */}
          <View className="bg-white dark:bg-dark-panel border-b border-navy-100 dark:border-dark-border">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10, gap: 4 }}>
              {[
                { icon: '↩', action: () => {} },
                { icon: '↪', action: () => {} },
                { icon: '│', action: null },
                { icon: '🖼️', action: pickImage },
                { icon: '│', action: null },
                { icon: '≡', action: () => setEditContent(prev => prev + '\n• ') },
                { icon: '≡₊', action: () => setEditContent(prev => prev + '\n1. ') },
                { icon: '☐', action: () => setEditContent(prev => prev + '\n☐ ') },
                { icon: '│', action: null },
                { icon: '─', action: () => setEditContent(prev => prev + '\n───────────\n') },
                { icon: '💡', action: () => setEditContent(prev => prev + '\n💡 Insight: ') },
                { icon: '⭐', action: () => setEditContent(prev => prev + '\n⭐ Key Point: ') },
                { icon: '│', action: null },
                { icon: '🗑', action: () => { setEditContent(''); setEditTitle(''); setNoteImage(null); } },
              ].map((item, i) => {
                if (item.action === null) {
                  return (
                    <View key={i} style={{ width: 1, height: 24, backgroundColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : '#D9E2EC', marginHorizontal: 4 }} />
                  );
                }
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={item.action}
                    className="bg-surface-warm dark:bg-dark-bg border border-navy-100 dark:border-dark-border rounded-lg items-center justify-center"
                    style={{ width: 36, height: 36 }}
                    activeOpacity={0.6}
                  >
                    <Text className="text-navy-700 dark:text-text-secondary font-bold" style={{ fontSize: 14 }}>{item.icon}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          <ScrollView className="flex-1 px-6 pt-6" keyboardShouldPersistTaps="handled">
            {/* Title */}
            <TextInput
              value={editTitle}
              onChangeText={setEditTitle}
              placeholder="Untitled Note"
              placeholderTextColor="#9FB3C8"
              className="text-[28px] font-black text-navy-900 dark:text-text-primary mb-4"
            />

            {/* Image Preview */}
            {noteImage && (
              <View className="mb-4 relative">
                <Image source={{ uri: noteImage }} className="w-full h-48 rounded-xl bg-slate-100" resizeMode="cover" />
                <TouchableOpacity 
                  onPress={() => setNoteImage(null)}
                  className="absolute top-2 right-2 bg-black/50 p-2 rounded-lg"
                >
                  <Text className="text-white text-xs font-bold">✕</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Content */}
            <TextInput
              value={editContent}
              onChangeText={setEditContent}
              multiline
              placeholder="Start writing..."
              placeholderTextColor="#9FB3C8"
              className="text-[15px] font-medium text-navy-700 dark:text-text-secondary"
              style={{
                lineHeight: 24,
                minHeight: 400,
                textAlignVertical: 'top',
              }}
            />
          </ScrollView>

          {/* Save indicator */}
          {isSaving && (
            <View className="absolute bottom-6 right-6 bg-navy-900 dark:bg-dark-surface px-4 py-2 rounded-xl">
              <Text className="text-white text-xs font-bold">Saving...</Text>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

// Note Card Component
function NoteCard({ note, onPress, onPin, onDelete }: { note: any; onPress: () => void; onPin: () => void; onDelete: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white dark:bg-dark-panel rounded-3xl p-5 border border-navy-100 dark:border-dark-border mb-3 shadow-sm"
      activeOpacity={0.7}
    >
      <View className="flex-row items-start justify-between mb-2">
        <View className="flex-1 mr-3">
          <View className="flex-row items-center mb-1" style={{ gap: 6 }}>
            {note.is_pinned && <Text style={{ fontSize: 12 }}>📌</Text>}
            <Text className="text-navy-900 dark:text-text-primary text-base font-black flex-1" numberOfLines={1}>{note.title || 'Untitled'}</Text>
          </View>
          {note.content_text ? (
            <Text className="text-navy-500 dark:text-text-muted text-xs leading-relaxed" numberOfLines={2}>
              {note.content_text}
            </Text>
          ) : null}
        </View>
        <Text className="text-navy-300 dark:text-text-secondary text-[10px] font-bold">
          {note.updated_at ? new Date(note.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
        </Text>
      </View>
      <View className="flex-row items-center justify-between mt-2">
        <View className="self-start px-2 py-1 rounded-md bg-brand-50 dark:bg-brand-500/10">
          <Text className="text-[9px] font-black uppercase tracking-widest text-brand-500">
            {note.focus_dimension || 'General'}
          </Text>
        </View>
        <View className="flex-row" style={{ gap: 10 }}>
          <TouchableOpacity onPress={onPin}>
            <Text className="text-brand-500 font-bold text-xs">{note.is_pinned ? 'Unpin' : 'Pin'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <Text className="text-rose-500 dark:text-rose-400 font-bold text-xs">Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
