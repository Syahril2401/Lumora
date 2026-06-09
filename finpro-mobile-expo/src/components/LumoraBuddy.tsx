import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Modal, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { assessmentApi } from '../services/api';

export default function LumoraBuddy() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [isOpen, messages]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;
    const userText = inputText.trim();
    setInputText('');
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setIsLoading(true);

    try {
      const res = await assessmentApi.chat(userText);
      if (res && res.data && res.data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: res.data.reply }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadHistory = async () => {
    setIsLoading(true);
    try {
      const res = await assessmentApi.getChatHistory();
      if (res && res.data && Array.isArray(res.data)) {
        setMessages(res.data);
      }
    } catch (error) {
      console.error('Failed to load history', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (text: string, isDark: boolean, isUser: boolean) => {
    if (!text) return null;
    let cleanText = text;

    // Filter out {"action": ...} JSON strings using robust regex
    const actionRegex = /\{[\s]*["']action["']\s*:[\s\S]*?\}/g;
    cleanText = cleanText.replace(actionRegex, '').trim();

    // Clean up headings
    cleanText = cleanText.replace(/### (.*?)(?:\n|$)/g, '$1\n');
    cleanText = cleanText.replace(/## (.*?)(?:\n|$)/g, '$1\n');
    cleanText = cleanText.replace(/# (.*?)(?:\n|$)/g, '$1\n');

    // Parse bold text
    const parts = cleanText.split(/(\*\*.*?\*\*)/g);

    return (
      <Text className={`text-xs font-medium leading-relaxed ${isUser ? 'text-white' : (isDark ? 'text-white' : 'text-navy-900')}`}>
        {parts.map((part, index) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <Text key={index} className="font-bold">
                {part.slice(2, -2)}
              </Text>
            );
          }
          return part;
        })}
      </Text>
    );
  };

  return (
    <>
      {/* Floating Action Button */}
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        className="absolute bottom-24 right-6 w-14 h-14 bg-brand-500 rounded-full items-center justify-center shadow-lg"
        style={{ elevation: 8, shadowColor: '#ea580c', shadowOpacity: 0.4, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } }}
      >
        <Feather name="message-square" size={24} color="#FFF" />
      </TouchableOpacity>

      {/* Chat Modal */}
      <Modal
        visible={isOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsOpen(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 justify-end bg-black/50"
        >
          <View className={`w-full h-4/5 rounded-t-3xl overflow-hidden shadow-2xl ${isDark ? 'bg-dark-panel' : 'bg-[#FDFDFF]'}`}>
            
            {/* Header */}
            <View className="px-6 py-5 bg-navy-900 flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-full bg-white/10 items-center justify-center border border-white/20">
                  <Feather name="zap" size={20} color="#fed7aa" />
                </View>
                <View>
                  <Text className="text-white font-black text-base tracking-tight">Lumora Buddy</Text>
                  <Text className="text-navy-300 font-mono text-[10px] uppercase tracking-widest">Cognitive Assistant</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setIsOpen(false)} className="w-8 h-8 rounded-full items-center justify-center bg-white/10">
                <Feather name="x" size={18} color="#FFF" />
              </TouchableOpacity>
            </View>

            {/* Context Banner */}
            <View className={`px-5 py-3 flex-row items-start gap-3 border-b ${isDark ? 'border-dark-border bg-brand-500/10' : 'border-[#D9E2EC] bg-brand-50'}`}>
              <Feather name="info" size={16} color="#ea580c" style={{ marginTop: 2 }} />
              <View className="flex-1">
                <Text className={`text-xs font-bold ${isDark ? 'text-white' : 'text-navy-900'}`}>Study Insight</Text>
                <Text className={`text-[10px] mt-0.5 ${isDark ? 'text-text-muted' : 'text-navy-500'}`}>Create at least 2 focused study sessions this week to build consistency.</Text>
              </View>
            </View>

            {/* Chat Area */}
            <ScrollView 
              ref={scrollViewRef}
              className={`flex-1 p-5 ${isDark ? 'bg-dark-bg' : 'bg-[#FAFAF9]'}`}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
            >
              {messages.length === 0 ? (
                <View className="flex-1 items-center justify-center px-4">
                  <View className="w-16 h-16 rounded-2xl bg-brand-500/10 items-center justify-center mb-4">
                    <Feather name="message-circle" size={32} color="#ea580c" />
                  </View>
                  <Text className={`text-base font-black text-center mb-2 ${isDark ? 'text-white' : 'text-navy-900'}`}>How can I assist your deep work today?</Text>
                  <Text className={`text-xs text-center mb-6 ${isDark ? 'text-text-muted' : 'text-navy-500'}`}>Ask about your tasks, focus techniques, or get schedule insights.</Text>
                  <TouchableOpacity 
                    onPress={loadHistory}
                    className={`flex-row items-center justify-center py-3 px-5 rounded-xl gap-2 ${isDark ? 'bg-brand-500/10' : 'bg-brand-50'}`}
                  >
                    <Feather name="refresh-ccw" size={14} color="#ea580c" />
                    <Text className="text-brand-600 font-bold text-xs">Load Previous Chat Log</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                messages.map((msg, index) => (
                  <View 
                    key={index} 
                    className={`max-w-[85%] p-3 mb-4 rounded-2xl ${msg.role === 'user' ? 'bg-brand-500 self-end rounded-tr-sm' : `self-start rounded-tl-sm border ${isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-[#D9E2EC]'}`}`}
                  >
                    {renderMessage(msg.content, isDark, msg.role === 'user')}
                  </View>
                ))
              )}

              {isLoading && (
                <View className={`self-start max-w-[85%] p-3 mb-4 rounded-2xl rounded-tl-sm border flex-row items-center gap-2 ${isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-[#D9E2EC]'}`}>
                  <ActivityIndicator size="small" color="#ea580c" />
                  <Text className={`text-xs font-medium ${isDark ? 'text-text-muted' : 'text-navy-500'}`}>Thinking...</Text>
                </View>
              )}
            </ScrollView>

            {/* Input Area */}
            <View className={`px-4 py-4 border-t flex-row items-center gap-3 ${isDark ? 'bg-dark-panel border-dark-border' : 'bg-white border-[#D9E2EC]'}`}>
              <TextInput
                value={inputText}
                onChangeText={setInputText}
                placeholder="Ask your buddy anything..."
                placeholderTextColor={isDark ? '#627D98' : '#9FB3C8'}
                className={`flex-1 rounded-xl py-3 px-4 text-xs font-bold border ${isDark ? 'bg-dark-surface border-dark-border text-white' : 'bg-[#FAFAF9] border-[#D9E2EC] text-navy-900'}`}
                onSubmitEditing={handleSend}
              />
              <TouchableOpacity 
                onPress={handleSend}
                disabled={!inputText.trim() || isLoading}
                className={`w-11 h-11 rounded-xl items-center justify-center shadow-sm ${!inputText.trim() || isLoading ? 'bg-brand-500/50' : 'bg-brand-500'}`}
              >
                <Feather name="arrow-right" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}
