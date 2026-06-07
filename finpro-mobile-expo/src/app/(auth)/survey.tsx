import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated, Dimensions, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Image } from 'expo-image';
import srlProfiles from '../../data/srl_profiles_81.json';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── Survey Questions ───────────────────────────────────────
// 4 SRL dimensions: Planning, Time Management, Cognitive Processing, Self-Evaluation
// Each dimension has 3 questions. User answers on a 1-5 Likert scale.

const SEGMENTS = [
  {
    id: 'planning',
    title: 'Planning & Goal Setting',
    icon: '🎯',
    description: 'Focus: study planning',
    questions: [
      { id: 'p1', text: 'I create a study schedule before I start studying.' },
      { id: 'p2', text: 'I set clear study goals.' },
      { id: 'p3', text: 'I plan which materials to study.' },
      { id: 'p4', text: 'I set a regular study time.' },
      { id: 'p5', text: 'I prepare my study materials before starting.' },
    ],
  },
  {
    id: 'time_management',
    title: 'Time Management',
    icon: '⏰',
    description: 'Focus: time management',
    questions: [
      { id: 't1', text: 'I manage my study time well.' },
      { id: 't2', text: 'I complete tasks on time.' },
      { id: 't3', text: 'I rarely procrastinate.' },
      { id: 't4', text: 'I prioritize important tasks.' },
      { id: 't5', text: 'I am consistent with my study schedule.' },
    ],
  },
  {
    id: 'cognitive',
    title: 'Cognitive Processing',
    icon: '🧠',
    description: 'Focus: learning strategies (thinking process)',
    questions: [
      { id: 'c1', text: 'I use specific study methods (taking notes, summarizing, etc.).' },
      { id: 'c2', text: 'I try different study methods to find the most effective one.' },
      { id: 'c3', text: 'I understand the material, not just memorize it.' },
      { id: 'c4', text: 'I review the material to strengthen my understanding.' },
      { id: 'c5', text: 'I connect the material with my prior knowledge.' },
    ],
  },
  {
    id: 'self_evaluation',
    title: 'Self-Evaluation & Reflection',
    icon: '🔍',
    description: 'Focus: self-evaluation',
    questions: [
      { id: 's1', text: 'I check if I understand the material.' },
      { id: 's2', text: 'I realize when I do not understand something.' },
      { id: 's3', text: 'I evaluate my study methods.' },
      { id: 's4', text: 'I improve my study strategies if they are ineffective.' },
      { id: 's5', text: 'I learn from my past mistakes.' },
    ],
  },
];

const LIKERT_OPTIONS = [
  { value: 1, label: 'Never', sublabel: 'Sangat Tidak Setuju / Tidak Pernah', emoji: '🚫' },
  { value: 2, label: 'Rarely', sublabel: 'Tidak Setuju / Jarang', emoji: '📅' },
  { value: 3, label: 'Sometimes', sublabel: 'Netral / Kadang-kadang', emoji: '🕒' },
  { value: 4, label: 'Often', sublabel: 'Setuju / Sering', emoji: '📋' },
  { value: 5, label: 'Always', sublabel: 'Sangat Setuju / Selalu', emoji: '✨' },
];

// ─── Helper: Calculate SRL Profile ──────────────────────────
function calculateProfile(answers: Record<string, number>) {
  // Calculate average score per dimension
  const dims = [
    { keys: ['p1', 'p2', 'p3', 'p4', 'p5'], label: 'planning' },
    { keys: ['t1', 't2', 't3', 't4', 't5'], label: 'time' },
    { keys: ['c1', 'c2', 'c3', 'c4', 'c5'], label: 'cognitive' },
    { keys: ['s1', 's2', 's3', 's4', 's5'], label: 'evaluation' },
  ];

  const levels = dims.map((dim) => {
    const avg = dim.keys.reduce((sum, k) => sum + (answers[k] || 3), 0) / dim.keys.length;
    if (avg <= 2.33) return 'L';
    if (avg <= 3.66) return 'M';
    return 'H';
  });

  const combinationId = levels.join('-');

  // Find matching profile from the 81 possibilities
  const profile = srlProfiles.find((p: any) => p.combination_id === combinationId);
  return profile || srlProfiles[0]; // Fallback to first profile
}

export default function SurveyScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentGlobalIndex, setCurrentGlobalIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;

  const totalQuestions = SEGMENTS.reduce((sum, s) => sum + s.questions.length, 0);
  const currentSegment = Math.floor(currentGlobalIndex / 5);
  const segment = SEGMENTS[currentSegment];
  const questionIndexWithinSegment = currentGlobalIndex % 5;
  const question = segment.questions[questionIndexWithinSegment];

  const answeredQuestions = Object.keys(answers).length;
  const isQuestionAnswered = answers[question.id] !== undefined;

  const animateProgress = (toSegment: number) => {
    Animated.spring(progressAnim, {
      toValue: toSegment,
      useNativeDriver: false,
      tension: 50,
      friction: 8,
    }).start();
  };

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentGlobalIndex < totalQuestions - 1) {
      const next = currentGlobalIndex + 1;
      setCurrentGlobalIndex(next);
      animateProgress(Math.floor(next / 5));
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  };

  const handlePrev = () => {
    if (currentGlobalIndex > 0) {
      const prev = currentGlobalIndex - 1;
      setCurrentGlobalIndex(prev);
      animateProgress(Math.floor(prev / 5));
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  };

  const handleSubmit = async () => {
    if (answeredQuestions < totalQuestions) {
      Alert.alert('Incomplete', 'Please answer all questions before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      const profile = calculateProfile(answers);
      // Save the profile result locally
      await SecureStore.setItemAsync('srl_profile', JSON.stringify(profile));
      await SecureStore.setItemAsync('survey_completed', 'true');
      
      // Navigate to the result screen briefly, then to dashboard
      router.replace(`/(auth)/survey-result?profileId=${profile.combination_id}`);
    } catch (e) {
      Alert.alert('Error', 'Failed to save your profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, SEGMENTS.length - 1],
    outputRange: ['25%', '100%'],
  });

  return (
    <View className="flex-1 bg-[#FAFAF9]">
      <StatusBar style="dark" />
      <ScrollView ref={scrollViewRef} className="flex-1" contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* Header */}
        <View className="px-6 pt-16 pb-4 flex-row items-center justify-between border-b border-[#E8EDF2]">
          <View className="flex-row items-center gap-2">
            <Image 
              source={require('../../../assets/images/lumora_icon.svg')} 
              style={{ width: 24, height: 24 }} 
              contentFit="contain" 
            />
            <Text className="text-xl font-black tracking-tight" style={{ color: '#F97316' }}>Lumora</Text>
          </View>
          <TouchableOpacity onPress={() => router.replace('/')}>
            <Text className="text-[#627D98] font-bold text-xs">Save & Exit</Text>
          </TouchableOpacity>
        </View>

        {/* Progress & Title */}
        <View className="px-6 mt-6 mb-8">
          <Text className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest mb-1">PROGRESS</Text>
          <Text className="text-lg font-bold text-[#F97316] mb-6">Step 0{currentSegment + 1}: {segment.title}</Text>
          
          {/* Progress Timeline */}
          <View className="relative flex-row justify-between items-center px-2">
            <View className="absolute left-4 right-4 h-[2px] bg-[#E8EDF2] top-3" />
            <View className="absolute left-4 h-[2px] bg-[#F97316] top-3" style={{ width: `${(currentSegment / (SEGMENTS.length - 1)) * 100}%` }} />
            
            {SEGMENTS.map((seg, i) => {
              const isPast = i < currentSegment;
              const isCurrent = i === currentSegment;
              return (
                <View key={seg.id} className="items-center">
                  <View className={`w-6 h-6 rounded-full border-[3px] items-center justify-center bg-white ${isCurrent || isPast ? 'border-[#F97316]' : 'border-[#E8EDF2]'}`}>
                    {(isCurrent || isPast) && <View className="w-2.5 h-2.5 bg-[#F97316] rounded-full" />}
                  </View>
                  <Text className={`text-[8px] font-bold uppercase tracking-wider mt-2 ${isCurrent ? 'text-[#F97316]' : 'text-[#9CA3AF]'}`}>
                    {seg.id === 'planning' ? 'Planning' : seg.id === 'time_management' ? 'Time Mgt' : seg.id === 'cognitive' ? 'Cognitive' : 'Reflection'}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Question Container */}
        <View className="px-6">
          <View className="mb-12">
            <Text className="text-2xl font-bold text-[#102A43] text-center mb-6 leading-tight">
              {question.text}
            </Text>

            {/* Likert Scale (Vertical) */}
            <View className="gap-y-3">
              {LIKERT_OPTIONS.map((option) => {
                const isSelected = answers[question.id] === option.value;
                return (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => handleAnswer(question.id, option.value)}
                    activeOpacity={0.7}
                    className={`flex-row items-center p-4 rounded-2xl border bg-white ${
                      isSelected ? 'border-[#F97316]' : 'border-[#E8EDF2]'
                    }`}
                    style={isSelected ? { shadowColor: '#F97316', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 } : {}}
                  >
                    <View className={`w-12 h-12 rounded-xl items-center justify-center mr-4 ${isSelected ? 'bg-[#FFF7ED]' : 'bg-[#FAFAF9]'}`}>
                      <Text className="text-xl">{option.emoji}</Text>
                    </View>
                    <View className="flex-1">
                      <Text className={`font-bold text-[15px] mb-0.5 ${isSelected ? 'text-[#102A43]' : 'text-[#102A43]'}`}>{option.label}</Text>
                      <Text className={`text-xs ${isSelected ? 'text-[#F97316]' : 'text-[#627D98]'}`}>{option.sublabel}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 bg-white/95 border-t border-slate-100 px-6 py-4" style={{ paddingBottom: 24 }}>
        <View className="flex-row gap-4 justify-center">
          {currentGlobalIndex > 0 && (
            <TouchableOpacity
              onPress={handlePrev}
              className="px-6 py-4 rounded-xl items-center bg-[#F3F4F6]"
            >
              <Text className="font-bold text-[#627D98]">Back</Text>
            </TouchableOpacity>
          )}
          
          {currentGlobalIndex < totalQuestions - 1 ? (
            <TouchableOpacity
              onPress={handleNext}
              className={`flex-1 py-4 rounded-xl items-center ${isQuestionAnswered ? 'bg-[#F97316]' : 'bg-[#FDBA74]'}`}
              disabled={!isQuestionAnswered}
            >
              <Text className="font-bold text-white">Continue</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleSubmit}
              className={`flex-1 py-4 rounded-xl items-center ${answeredQuestions === totalQuestions ? 'bg-[#F97316]' : 'bg-[#FDBA74]'}`}
              disabled={answeredQuestions < totalQuestions || isSubmitting}
            >
              <Text className="font-bold text-white">
                {isSubmitting ? 'Analyzing...' : 'Complete Survey'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
