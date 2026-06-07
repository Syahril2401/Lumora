import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Alert, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { targetsApi } from '../../services/api';

const DIMENSIONS = ['General', 'Planning', 'Time Management', 'Cognitive Strategy', 'Reflection'];
const PRIORITIES = ['low', 'medium', 'high'];

export default function WeeklyTargetsScreen() {
  const { colorScheme } = useColorScheme();
  const [targets, setTargets] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingTarget, setEditingTarget] = useState<any>(null);
  const [newSubtaskText, setNewSubtaskText] = useState<Record<string, string>>({});

  // Form state
  const [form, setForm] = useState({
    title: '',
    description: '',
    focus_dimension: 'General',
    priority: 'medium',
    due_date: '',
    subtasks: [{ title: '' }],
  });

  // Dropdown visibility
  const [showDimDropdown, setShowDimDropdown] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);

  const fetchTargets = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await targetsApi.getTargets();
      setTargets(res.data || []);
      setSummary(res.summary || {});
    } catch (err) {
      console.error('Failed to fetch targets', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchTargets(); }, []);

  const openModal = (target: any = null) => {
    setEditingTarget(target);
    if (target) {
      setForm({
        title: target.title || '',
        description: target.description || '',
        focus_dimension: target.focus_dimension || 'General',
        priority: target.priority || 'medium',
        due_date: target.due_date || '',
        subtasks: [],
      });
    } else {
      setForm({
        title: '',
        description: '',
        focus_dimension: 'General',
        priority: 'medium',
        due_date: '',
        subtasks: [{ title: '' }],
      });
    }
    setShowDimDropdown(false);
    setShowPriorityDropdown(false);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) { Alert.alert('Error', 'Title is required'); return; }
    setIsSaving(true);
    try {
      const payload: any = {
        title: form.title,
        description: form.description,
        focus_dimension: form.focus_dimension,
        priority: form.priority,
        subtasks: form.subtasks.filter(s => s.title.trim()),
      };
      if (form.due_date) {
        payload.due_date = form.due_date;
      }
      if (editingTarget) {
        await targetsApi.updateTarget(editingTarget.id, payload);
      } else {
        await targetsApi.createTarget(payload);
      }
      setShowModal(false);
      await fetchTargets();
    } catch (err) {
      Alert.alert('Error', 'Failed to save target');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Target', 'Are you sure? This will delete all subtasks too.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => {
        try {
          await targetsApi.deleteTarget(id);
          await fetchTargets();
        } catch { Alert.alert('Error', 'Failed to delete'); }
      }},
    ]);
  };

  const handleToggleSubtask = async (targetId: string, subtaskId: string) => {
    try {
      await targetsApi.toggleSubtask(targetId, subtaskId);
      await fetchTargets();
    } catch { Alert.alert('Error', 'Failed to toggle subtask'); }
  };

  const handleAddSubtask = async (targetId: string) => {
    const title = newSubtaskText[targetId]?.trim();
    if (!title) return;
    try {
      await targetsApi.createSubtask(targetId, { title });
      setNewSubtaskText(prev => ({ ...prev, [targetId]: '' }));
      await fetchTargets();
    } catch { Alert.alert('Error', 'Failed to add subtask'); }
  };

  const handleDeleteSubtask = async (targetId: string, subtaskId: string) => {
    try {
      await targetsApi.deleteSubtask(targetId, subtaskId);
      await fetchTargets();
    } catch { Alert.alert('Error', 'Failed to delete subtask'); }
  };

  const addFormSubtask = () => {
    setForm(prev => ({ ...prev, subtasks: [...prev.subtasks, { title: '' }] }));
  };

  const removeFormSubtask = (index: number) => {
    setForm(prev => ({
      ...prev,
      subtasks: prev.subtasks.filter((_, i) => i !== index),
    }));
  };

  const updateFormSubtask = (index: number, value: string) => {
    setForm(prev => {
      const updated = [...prev.subtasks];
      updated[index] = { title: value };
      return { ...prev, subtasks: updated };
    });
  };

  const priorityClasses = (p: string) => {
    if (p === 'high') return { bg: 'bg-rose-50 dark:bg-rose-500/10', text: 'text-rose-500 dark:text-rose-400' };
    if (p === 'medium') return { bg: 'bg-amber-50 dark:bg-amber-500/10', text: 'text-amber-500 dark:text-amber-400' };
    return { bg: 'bg-slate-50 dark:bg-slate-500/10', text: 'text-slate-400 dark:text-slate-400' };
  };

  const statusClasses = (s: string) => {
    if (s === 'completed') return { bg: 'bg-emerald-50 dark:bg-emerald-500/10', text: 'text-emerald-500 dark:text-emerald-400' };
    if (s === 'in_progress') return { bg: 'bg-blue-50 dark:bg-blue-500/10', text: 'text-blue-500 dark:text-blue-400' };
    return { bg: 'bg-slate-50 dark:bg-slate-500/10', text: 'text-slate-400 dark:text-slate-400' };
  };

  return (
    <View className="flex-1 bg-surface-warm dark:bg-dark-bg">
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 32 }}>

        {/* Header */}
        <View className="px-6 pt-16 pb-6 border-b border-navy-100 dark:border-dark-border">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-2xl font-black text-navy-900 dark:text-text-primary">Weekly Targets</Text>
            <TouchableOpacity onPress={() => openModal()} className="bg-orange-500 py-2 px-4 rounded-full">
              <Text className="text-white font-bold text-xs">+ Add Target</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-navy-500 dark:text-text-muted text-xs">Set measurable goals and track completion.</Text>
        </View>

        {/* Dashboard Cards */}
        <View className="px-6 py-6" style={{ gap: 12 }}>
          <View className="flex-row" style={{ gap: 12 }}>
            <View className="flex-1 bg-navy-900 dark:bg-dark-panel p-4 rounded-2xl">
              <Text className="text-[9px] font-black text-navy-300 uppercase tracking-widest mb-1">Total Targets</Text>
              <Text className="text-white text-2xl font-black">{targets.length}</Text>
            </View>
            <View className="flex-1 bg-navy-900 dark:bg-dark-panel p-4 rounded-2xl">
              <Text className="text-[9px] font-black text-emerald-300 uppercase tracking-widest mb-1">Completed</Text>
              <Text className="text-emerald-400 text-2xl font-black">{targets.filter((t: any) => t.status === 'completed').length}</Text>
            </View>
          </View>
          <View className="flex-row" style={{ gap: 12 }}>
            <View className="flex-1 bg-navy-900 dark:bg-dark-panel p-4 rounded-2xl">
              <Text className="text-[9px] font-black text-brand-300 uppercase tracking-widest mb-1">Completion Rate</Text>
              <Text className="text-brand-400 text-2xl font-black">
                {targets.length > 0 ? Math.round((targets.filter((t: any) => t.status === 'completed').length / targets.length) * 100) : 0}%
              </Text>
            </View>
            <View className="flex-1 bg-navy-900 dark:bg-dark-panel p-4 rounded-2xl">
              <Text className="text-[9px] font-black text-navy-300 uppercase tracking-widest mb-1">Primary Focus</Text>
              <Text className="text-white text-sm font-bold mt-1">
                {targets.length > 0 ? targets[0].focus_dimension || 'General' : 'No focus yet'}
              </Text>
            </View>
          </View>
        </View>

        {/* Target List */}
        {isLoading ? (
          <ActivityIndicator size="large" color="#F97316" style={{ marginTop: 40 }} />
        ) : targets.length === 0 ? (
          <View className="px-6 py-10 items-center">
            <Text className="text-navy-300 font-bold">No targets found.</Text>
          </View>
        ) : (
          <View className="px-6" style={{ gap: 16 }}>
            {targets.map((target: any) => {
              const pc = priorityClasses(target.priority);
              const sc = statusClasses(target.status);
              return (
                <View key={target.id} className="bg-white dark:bg-dark-panel border border-navy-100 dark:border-dark-border p-5 rounded-3xl shadow-sm">
                  {/* Badges */}
                  <View className="flex-row flex-wrap mb-2" style={{ gap: 6 }}>
                    <View className={`${pc.bg} px-2 py-1 rounded-md`}>
                      <Text className={`${pc.text} text-[9px] font-black uppercase tracking-widest`}>{target.priority}</Text>
                    </View>
                    <View className="bg-brand-50 dark:bg-brand-500/10 px-2 py-1 rounded-md">
                      <Text className="text-brand-500 text-[9px] font-black uppercase tracking-widest">{target.focus_dimension}</Text>
                    </View>
                    <View className={`${sc.bg} px-2 py-1 rounded-md`}>
                      <Text className={`${sc.text} text-[9px] font-black uppercase tracking-widest`}>{target.status?.replace('_', ' ')}</Text>
                    </View>
                  </View>

                  {/* Title & Description */}
                  <Text className="text-navy-900 dark:text-text-primary text-lg font-black mb-1">{target.title}</Text>
                  {target.description ? <Text className="text-navy-500 dark:text-text-muted text-xs font-medium mb-1">{target.description}</Text> : null}
                  {target.due_date ? <Text className="text-navy-300 dark:text-text-secondary text-[10px] font-bold mb-3">Due: {target.due_date}</Text> : null}

                  {/* Progress Bar */}
                  <View className="mb-3">
                    <View className="flex-row items-center justify-between mb-1">
                      <Text className="text-navy-500 dark:text-text-muted text-[9px] font-black uppercase tracking-widest">Progress</Text>
                      <Text className="text-navy-900 dark:text-text-primary text-xs font-black">{target.progress || 0}%</Text>
                    </View>
                    <View className="w-full h-2 bg-navy-50 dark:bg-dark-surface rounded-full overflow-hidden">
                      <View
                        className="h-full rounded-full"
                        style={{
                          width: `${target.progress || 0}%`,
                          backgroundColor: (target.progress || 0) >= 100 ? '#10B981' : '#F97316',
                        }}
                      />
                    </View>
                  </View>

                  {/* Subtasks */}
                  {target.subtasks?.map((sub: any) => (
                    <View key={sub.id} className="flex-row items-center py-2 border-b border-[#F0F4F8]" style={{ gap: 10 }}>
                      <TouchableOpacity
                        onPress={() => handleToggleSubtask(target.id, sub.id)}
                        style={{
                          width: 20, height: 20, borderRadius: 5, borderWidth: 2,
                          borderColor: sub.is_completed ? '#10B981' : 'rgba(156,163,175,0.3)',
                          backgroundColor: sub.is_completed ? '#10B981' : 'transparent',
                          alignItems: 'center', justifyContent: 'center',
                        }}
                      >
                        {sub.is_completed && <Text style={{ color: '#fff', fontSize: 10, fontWeight: '900' }}>✓</Text>}
                      </TouchableOpacity>
                      <Text className={`flex-1 text-sm font-bold ${sub.is_completed ? 'text-navy-300 dark:text-text-secondary line-through' : 'text-navy-900 dark:text-text-primary'}`}>{sub.title}</Text>
                      <TouchableOpacity onPress={() => handleDeleteSubtask(target.id, sub.id)}>
                        <Text style={{ color: '#9FB3C8', fontSize: 16, fontWeight: '700' }}>×</Text>
                      </TouchableOpacity>
                    </View>
                  ))}

                  {/* Add Subtask Inline */}
                  <View className="flex-row items-center mt-2" style={{ gap: 8 }}>
                    <TextInput
                      value={newSubtaskText[target.id] || ''}
                      onChangeText={t => setNewSubtaskText(prev => ({ ...prev, [target.id]: t }))}
                      placeholder="Add subtask..."
                      placeholderTextColor="#9FB3C8"
                      onSubmitEditing={() => handleAddSubtask(target.id)}
                      className="flex-1 text-sm font-bold text-navy-900 dark:text-text-primary border-b border-dashed border-navy-100 dark:border-dark-border py-1"
                    />
                    {(newSubtaskText[target.id] || '').trim() ? (
                      <TouchableOpacity onPress={() => handleAddSubtask(target.id)}>
                        <Text className="text-brand-500 text-xs font-black">Add</Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>

                  {/* Action Buttons */}
                  <View className="flex-row mt-4 pt-3 border-t border-[#F0F4F8]" style={{ gap: 8 }}>
                    <TouchableOpacity
                      onPress={() => openModal(target)}
                      className="flex-1 bg-navy-50 dark:bg-dark-surface py-2 rounded-xl items-center"
                    >
                      <Text className="text-navy-600 dark:text-text-primary text-xs font-bold">Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDelete(target.id)}
                      className="flex-1 bg-rose-50 dark:bg-rose-500/10 py-2 rounded-xl items-center"
                    >
                      <Text className="text-rose-500 dark:text-rose-400 text-xs font-bold">Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* Add/Edit Modal */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(11,17,32,0.5)', justifyContent: 'center', padding: 20 }}>
          <View className="bg-white dark:bg-dark-panel rounded-3xl p-6" style={{ maxHeight: '85%' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text className="text-xl font-black text-navy-900 dark:text-text-primary mb-5">
                {editingTarget ? 'Edit Target' : 'Add Weekly Target'}
              </Text>

              {/* Title */}
              <Text className="text-[9px] font-black text-navy-500 dark:text-text-muted uppercase tracking-widest mb-1">Title *</Text>
              <TextInput
                value={form.title}
                onChangeText={t => setForm(p => ({ ...p, title: t }))}
                placeholder="e.g. Complete Chapter 5"
                placeholderTextColor="#9FB3C8"
                className="bg-surface-warm dark:bg-dark-bg border border-navy-100 dark:border-dark-border rounded-xl py-3 px-4 text-sm font-bold text-navy-900 dark:text-text-primary mb-4"
              />

              {/* Description */}
              <Text className="text-[9px] font-black text-navy-500 dark:text-text-muted uppercase tracking-widest mb-1">Description</Text>
              <TextInput
                value={form.description}
                onChangeText={t => setForm(p => ({ ...p, description: t }))}
                multiline
                numberOfLines={2}
                className="bg-surface-warm dark:bg-dark-bg border border-navy-100 dark:border-dark-border rounded-xl py-3 px-4 text-sm font-bold text-navy-900 dark:text-text-primary mb-4"
                style={{ minHeight: 60, textAlignVertical: 'top' }}
              />

              {/* Focus Dimension & Priority Row */}
              <View className="flex-row mb-4" style={{ gap: 12 }}>
                {/* Focus Dimension */}
                <View style={{ flex: 1 }}>
                  <Text className="text-[9px] font-black text-navy-500 dark:text-text-muted uppercase tracking-widest mb-1">Focus Dimension</Text>
                  <TouchableOpacity
                    onPress={() => { setShowDimDropdown(!showDimDropdown); setShowPriorityDropdown(false); }}
                    className="bg-surface-warm dark:bg-dark-bg border border-navy-100 dark:border-dark-border rounded-xl py-3 px-4 flex-row items-center justify-between"
                  >
                    <Text className="text-sm font-bold text-navy-900 dark:text-text-primary">{form.focus_dimension}</Text>
                    <Text className="text-navy-500 dark:text-text-muted">▼</Text>
                  </TouchableOpacity>
                  {showDimDropdown && (
                    <View className="bg-white dark:bg-dark-panel border border-navy-100 dark:border-dark-border rounded-xl mt-1 shadow-sm" style={{ position: 'absolute', top: 62, left: 0, right: 0, zIndex: 100 }}>
                      {DIMENSIONS.map(d => (
                        <TouchableOpacity
                          key={d}
                          onPress={() => { setForm(p => ({ ...p, focus_dimension: d })); setShowDimDropdown(false); }}
                          style={{ padding: 10, backgroundColor: form.focus_dimension === d ? '#F97316' : 'transparent', borderRadius: 8, margin: 2 }}
                        >
                          <Text className={`text-[13px] font-bold ${form.focus_dimension === d ? 'text-white' : 'text-navy-900 dark:text-text-primary'}`}>{d}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
                {/* Priority */}
                <View style={{ flex: 1 }}>
                  <Text className="text-[9px] font-black text-navy-500 dark:text-text-muted uppercase tracking-widest mb-1">Priority</Text>
                  <TouchableOpacity
                    onPress={() => { setShowPriorityDropdown(!showPriorityDropdown); setShowDimDropdown(false); }}
                    className="bg-surface-warm dark:bg-dark-bg border border-navy-100 dark:border-dark-border rounded-xl py-3 px-4 flex-row items-center justify-between"
                  >
                    <Text className="text-sm font-bold text-navy-900 dark:text-text-primary capitalize">{form.priority}</Text>
                    <Text className="text-navy-500 dark:text-text-muted">▼</Text>
                  </TouchableOpacity>
                  {showPriorityDropdown && (
                    <View className="bg-white dark:bg-dark-panel border border-navy-100 dark:border-dark-border rounded-xl mt-1 shadow-sm" style={{ position: 'absolute', top: 62, left: 0, right: 0, zIndex: 100 }}>
                      {PRIORITIES.map(p => (
                        <TouchableOpacity
                          key={p}
                          onPress={() => { setForm(prev => ({ ...prev, priority: p })); setShowPriorityDropdown(false); }}
                          style={{ padding: 10, backgroundColor: form.priority === p ? '#F97316' : 'transparent', borderRadius: 8, margin: 2 }}
                        >
                          <Text className={`text-[13px] font-bold capitalize ${form.priority === p ? 'text-white' : 'text-navy-900 dark:text-text-primary'}`}>{p}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>

              {/* Due Date */}
              <Text className="text-[9px] font-black text-navy-500 dark:text-text-muted uppercase tracking-widest mb-1">Due Date</Text>
              <TextInput
                value={form.due_date}
                onChangeText={t => setForm(p => ({ ...p, due_date: t }))}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#9FB3C8"
                className="bg-surface-warm dark:bg-dark-bg border border-navy-100 dark:border-dark-border rounded-xl py-3 px-4 text-sm font-bold text-navy-900 dark:text-text-primary mb-4"
              />

              {/* Initial Subtasks (create mode only) */}
              {!editingTarget && (
                <View className="mb-4">
                  <Text className="text-[9px] font-black text-navy-500 dark:text-text-muted uppercase tracking-widest mb-2">Initial Subtasks</Text>
                  {form.subtasks.map((st, i) => (
                    <View key={i} className="flex-row items-center mb-2" style={{ gap: 8 }}>
                      <TextInput
                        value={st.title}
                        onChangeText={t => updateFormSubtask(i, t)}
                        placeholder={`Subtask ${i + 1}`}
                        placeholderTextColor="#9FB3C8"
                        className="flex-1 bg-surface-warm dark:bg-dark-bg border border-navy-100 dark:border-dark-border rounded-xl py-2 px-4 text-sm font-bold text-navy-900 dark:text-text-primary"
                      />
                      <TouchableOpacity onPress={() => removeFormSubtask(i)}>
                        <Text style={{ color: '#9FB3C8', fontSize: 18, fontWeight: '700' }}>×</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                  <TouchableOpacity onPress={addFormSubtask}>
                    <Text className="text-brand-500 text-sm font-bold">+ Add subtask</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Buttons */}
              <View className="flex-row mt-2" style={{ gap: 12 }}>
                <TouchableOpacity
                  onPress={() => setShowModal(false)}
                  className="flex-1 bg-navy-50 dark:bg-dark-surface py-3 rounded-xl items-center"
                >
                  <Text className="text-navy-600 dark:text-text-primary font-bold">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSave}
                  disabled={isSaving}
                  className="flex-1 bg-brand-500 py-3 rounded-xl items-center"
                  style={{ opacity: isSaving ? 0.5 : 1 }}
                >
                  <Text className="text-white font-bold">{isSaving ? 'Saving...' : editingTarget ? 'Update' : 'Create'}</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
