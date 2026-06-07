import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#FAFAF9]">
      <StatusBar style="dark" />
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}>
        
        {/* Top Navbar */}
        <View className="px-6 pt-16 pb-4 flex-row justify-between items-center bg-white/80 border-b border-[#D9E2EC]">
          <View className="flex-row items-center gap-1">
            <Image 
              source={require('../../assets/images/lumora_icon.svg')} 
              style={{ width: 28, height: 28, marginRight: 2 }} 
              contentFit="contain" 
            />
            <Text className="text-xl font-bold tracking-tight">
              <Text style={{ color: '#F97316' }}>Lum</Text>
              <Text style={{ color: '#627D98' }}>ora</Text>
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text className="text-[15px] font-semibold" style={{ color: '#627D98' }}>Log In</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View className="px-6 pt-10 pb-8">
          {/* Badge */}
          <View className="self-start bg-[#FFF7ED] border border-[#FED7AA] px-4 py-2 rounded-full mb-6 flex-row items-center">
            <View className="w-1.5 h-1.5 bg-[#F97316] rounded-full mr-2" />
            <Text className="text-[11px] font-bold uppercase tracking-widest" style={{ color: '#EA580C' }}>
              The Intelligent Sanctuary
            </Text>
          </View>

          {/* Title */}
          <Text className="text-4xl font-black leading-[44px] tracking-tight mb-5" style={{ color: '#102A43' }}>
            Your intelligent sanctuary for{' '}
            <Text style={{ color: '#F97316' }}>self-regulated learning.</Text>
          </Text>

          {/* Description */}
          <Text className="text-base leading-relaxed mb-8" style={{ color: '#486581' }}>
            A smart dashboard, study planner, weekly targets, rich notes, and progress analytics — designed for how students actually learn.
          </Text>

          {/* Action Buttons */}
          <View className="gap-y-3 mb-6">
            <TouchableOpacity 
              className="w-full py-4 rounded-xl items-center justify-center shadow-sm"
              style={{ backgroundColor: '#F97316' }}
              activeOpacity={0.8}
              onPress={() => router.push('/(auth)/register')}
            >
              <Text className="text-white font-bold text-[15px]">
                Get Started for Free
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="w-full py-4 rounded-xl items-center justify-center bg-white border border-[#D9E2EC]"
              activeOpacity={0.6}
              onPress={() => router.push('/(auth)/login')}
            >
              <Text className="font-bold text-[15px]" style={{ color: '#102A43' }}>
                I already have an account
              </Text>
            </TouchableOpacity>
          </View>

          {/* Social Proof */}
          <View className="flex-row items-center gap-3">
            <Text style={{ color: '#F97316' }} className="text-xs">★★★★★</Text>
            <Text className="text-xs font-medium" style={{ color: '#829AB1' }}>Loved by 2,000+ students</Text>
          </View>
        </View>

        {/* Full Dashboard Mockup */}
        <View className="px-4 mb-12">
          <View className="bg-white rounded-2xl shadow-xl border border-[#D9E2EC] overflow-hidden">
            {/* Browser Chrome */}
            <View className="bg-[#F8FAFC] px-4 py-3 flex-row items-center border-b border-[#E8EDF2]">
              <View className="flex-row gap-1.5 w-16">
                <View className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <View className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <View className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </View>
              <View className="flex-1 items-center">
                <View className="bg-white border border-[#E8EDF2] rounded-md px-4 py-1">
                  <Text className="text-[9px] text-slate-500 font-mono">app.lumora.ai/dashboard</Text>
                </View>
              </View>
              <View className="w-16" />
            </View>

            {/* Mockup Content */}
            <View className="p-4 bg-white relative">
              {/* Header */}
              <View className="mb-4">
                <Text className="text-base font-black text-[#102A43]">Good afternoon, User.</Text>
                <Text className="text-xs text-[#627D98] mb-1">Ready for a deep focus session?</Text>
                <View className="flex-row items-center gap-1.5">
                  <View className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <Text className="text-[10px] text-[#627D98]">
                    Your cognitive reading is at <Text className="text-emerald-600 font-bold">94%</Text> today.
                  </Text>
                </View>
              </View>

              {/* Daily Overview */}
              <View className="bg-[#102A43] rounded-xl p-3.5 mb-3">
                <View className="flex-row justify-between items-center mb-3">
                  <View>
                    <Text className="text-white font-bold text-xs">Daily Overview</Text>
                    <Text className="text-slate-400 text-[9px]">Saturday, Jun 6</Text>
                  </View>
                  <View className="bg-white/10 px-2 py-0.5 rounded-full">
                    <Text className="text-slate-300 text-[8px]">Full Schedule</Text>
                  </View>
                </View>
                <View className="flex-row items-center gap-3 mb-2">
                  <Text className="text-white text-xs font-bold w-9">19:00</Text>
                  <View className="flex-1 bg-white/5 rounded-lg p-2 border border-white/10 flex-row justify-between items-center">
                    <View>
                      <Text className="text-white text-[11px] font-semibold">Tonight's Study Session</Text>
                      <Text className="text-slate-400 text-[9px]">120m</Text>
                    </View>
                    <View className="bg-[#F97316] px-1.5 py-0.5 rounded-full">
                      <Text className="text-white text-[8px] font-bold">PLANNED</Text>
                    </View>
                  </View>
                </View>
                <View className="flex-row items-center gap-3 opacity-70">
                  <Text className="text-slate-400 text-xs font-bold w-9">21:00</Text>
                  <View className="flex-1 bg-white/5 rounded-lg p-2 border border-white/10 flex-row justify-between items-center">
                    <View>
                      <Text className="text-slate-300 text-[11px] font-semibold">Weekly Review</Text>
                      <Text className="text-slate-500 text-[9px]">45m</Text>
                    </View>
                    <View className="bg-slate-600 px-1.5 py-0.5 rounded-full">
                      <Text className="text-slate-300 text-[8px] font-bold">SCHEDULED</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Recent Notes */}
              <View className="mb-3">
                <View className="flex-row justify-between items-center mb-1.5">
                  <Text className="text-[10px] font-bold text-[#102A43]">Recent Notes</Text>
                  <Text className="text-[8px] text-[#F97316] font-bold">VIEW ALL</Text>
                </View>
                <View className="gap-y-2">
                  <View className="bg-white rounded-lg p-2.5 border border-[#E8EDF2]">
                    <View className="flex-row items-center gap-2 mb-1">
                      <View className="w-4 h-4 bg-[#FFF7ED] rounded flex items-center justify-center">
                        <Text className="text-[#F97316] text-[8px]">📄</Text>
                      </View>
                      <Text className="text-[10px] font-bold text-[#102A43]">Weekly Study Targets</Text>
                    </View>
                    <Text className="text-[8px] text-[#829AB1]" numberOfLines={1}>My Targets for this Week: - Target 1: Review class notes...</Text>
                  </View>
                  <View className="bg-white rounded-lg p-2.5 border border-[#E8EDF2]">
                    <View className="flex-row items-center gap-2 mb-1">
                      <View className="w-4 h-4 bg-[#FFF7ED] rounded flex items-center justify-center">
                        <Text className="text-[#F97316] text-[8px]">📄</Text>
                      </View>
                      <Text className="text-[10px] font-bold text-[#102A43]">Waterfall Methodology</Text>
                    </View>
                    <Text className="text-[8px] text-[#829AB1]" numberOfLines={1}>The Waterfall model is a classic, sequential design process...</Text>
                  </View>
                </View>
              </View>

              {/* Grid for Bottom Cards */}
              <View className="flex-row gap-2">
                <View className="flex-1 bg-white rounded-lg p-3 border border-[#E8EDF2]">
                  <Text className="text-[8px] font-bold text-[#829AB1] mb-2 uppercase tracking-wider">Quick Actions</Text>
                  <View className="gap-y-1.5">
                    <View className="bg-[#F8FAFC] rounded flex-row items-center gap-2 p-1.5">
                      <Text className="text-[#3B82F6] text-[10px]">✎</Text>
                      <Text className="text-[9px] text-[#627D98] font-medium">New Note</Text>
                    </View>
                    <View className="bg-[#F8FAFC] rounded flex-row items-center gap-2 p-1.5">
                      <Text className="text-[#10B981] text-[10px]">📅</Text>
                      <Text className="text-[9px] text-[#627D98] font-medium">Plan Session</Text>
                    </View>
                  </View>
                </View>
                <View className="flex-1 bg-[#EA580C] rounded-lg p-3 justify-center">
                  <Text className="text-white text-[9px] font-bold italic mb-2 leading-relaxed">
                    "Wisdom is not a product of schooling but of the lifelong attempt to acquire it."
                  </Text>
                  <Text className="text-white/80 text-[7px] font-bold tracking-wider">— ALBERT EINSTEIN</Text>
                </View>
              </View>

            </View>
          </View>
        </View>

        {/* Comparison Section */}
        <View className="px-6 mb-12">
          <View className="mb-6">
            <View className="self-start bg-[#F0F4F8] border border-[#D9E2EC] px-3 py-1.5 rounded-full mb-3">
              <Text className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#486581' }}>Why Lumora</Text>
            </View>
            <Text className="text-3xl font-black text-[#102A43] leading-tight mb-2">Stop juggling. Start learning.</Text>
          </View>

          {/* The Old Way Section */}
          <View className="mb-8">
            <View className="flex-row items-center gap-2 mb-4 px-1">
              <View className="w-2 h-2 rounded-full bg-red-400" />
              <Text className="text-xs font-bold text-red-400 uppercase tracking-wider">The Old Way</Text>
            </View>
            <View className="gap-y-3">
              {[
                'Scattered notes across five different apps',
                'No feedback loop on study effectiveness',
                'Overwhelmed by monolithic to-do lists',
                'Burnout from poor time management'
              ].map((item, i) => (
                <View key={i} className="bg-white rounded-xl p-4 border border-red-100 shadow-sm flex-row items-center gap-3 relative overflow-hidden">
                  <View className="absolute left-0 top-0 bottom-0 w-1 bg-red-400" />
                  <View className="w-9 h-9 bg-red-50 rounded-lg items-center justify-center shrink-0">
                    <Text className="text-red-400 font-bold">✕</Text>
                  </View>
                  <Text className="text-[#334E68] text-sm font-medium flex-1 leading-relaxed">{item}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* The Lumora Way Section */}
          <View>
            <View className="flex-row items-center gap-2 mb-4 px-1">
              <View className="w-2 h-2 rounded-full bg-[#F97316]" />
              <Text className="text-xs font-bold uppercase tracking-wider" style={{ color: '#F97316' }}>The Lumora Way</Text>
            </View>
            <View className="gap-y-3">
              {[
                'One unified sanctuary for every lecture and task',
                'AI-driven study plans and personalized recommendations',
                'Weekly targets with reflective analytics',
                'Structured notes with bidirectional linking'
              ].map((item, i) => (
                <View key={i} className="bg-white rounded-xl p-4 border border-[#FED7AA] shadow-sm flex-row items-center gap-3 relative overflow-hidden">
                  <View className="absolute left-0 top-0 bottom-0 w-1 bg-[#F97316]" />
                  <View className="w-9 h-9 bg-[#FFF7ED] rounded-lg items-center justify-center shrink-0">
                    <Text className="text-[#F97316] font-bold">✓</Text>
                  </View>
                  <Text className="text-[#102A43] text-sm font-bold flex-1 leading-relaxed">{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Features Section */}
        <View className="px-6 mb-12">
          <View className="items-center mb-8">
            <View className="bg-[#FFF7ED] border border-[#FED7AA] px-3 py-1.5 rounded-full mb-3">
              <Text className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#EA580C' }}>Features</Text>
            </View>
            <Text className="text-3xl font-black text-[#102A43] text-center leading-tight mb-2">Everything you need to excel.</Text>
            <Text className="text-[#627D98] text-center text-sm px-4">A complete toolkit designed around how students actually learn.</Text>
          </View>

          <View className="gap-y-4">
            
            {/* Smart Dashboard */}
            <View className="bg-white rounded-2xl p-5 border border-[#D9E2EC] shadow-sm">
              <View className="w-10 h-10 bg-[#FFF7ED] rounded-xl items-center justify-center mb-3">
                <Text className="text-[#F97316] font-bold text-lg">⊞</Text>
              </View>
              <Text className="text-lg font-bold text-[#102A43] mb-1">Smart Dashboard</Text>
              <Text className="text-[#627D98] text-sm leading-relaxed mb-4">Your personal command center with cognitive readiness score, daily overview, and quick access to everything.</Text>
              <View className="bg-[#102A43] rounded-xl p-3">
                <Text className="text-[10px] text-slate-300 mb-2">Your cognitive reading is at <Text className="text-emerald-400 font-bold">94%</Text> today</Text>
                <View className="flex-row items-center gap-2 mb-1">
                  <Text className="text-[10px] text-slate-500 font-mono w-8">19:00</Text>
                  <View className="flex-1 bg-[#F97316]/20 py-1 px-2 rounded flex-row justify-between items-center">
                    <Text className="text-slate-200 text-[9px]">Tonight's Study Session</Text>
                    <Text className="text-white bg-[#F97316] px-1 text-[8px] font-bold rounded">PLANNED</Text>
                  </View>
                </View>
                <View className="flex-row items-center gap-2">
                  <Text className="text-[10px] text-slate-500 font-mono w-8">21:00</Text>
                  <View className="flex-1 bg-emerald-500/20 py-1 px-2 rounded flex-row justify-between items-center">
                    <Text className="text-slate-200 text-[9px]">Weekly Review</Text>
                    <Text className="text-white bg-emerald-500 px-1 text-[8px] font-bold rounded">DONE</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Study Planner */}
            <View className="bg-white rounded-2xl p-5 border border-[#D9E2EC] shadow-sm">
              <View className="w-10 h-10 bg-violet-50 rounded-xl items-center justify-center mb-3">
                <Text className="text-violet-500 font-bold text-lg">📅</Text>
              </View>
              <Text className="text-lg font-bold text-[#102A43] mb-1">Study Planner</Text>
              <Text className="text-[#627D98] text-sm leading-relaxed mb-4">Calendar view with daily, weekly, and monthly modes. Manage your intellectual flow and sync with Google Calendar.</Text>
              <View className="bg-[#FAFAF9] rounded-xl p-3 border border-[#E8EDF2]">
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-[10px] font-bold text-[#486581]">Jun 1 - 7, 2026</Text>
                  <View className="flex-row gap-1">
                    <Text className="text-[8px] px-1.5 py-0.5 rounded bg-[#F97316] text-white font-bold">Weekly</Text>
                  </View>
                </View>
                <View className="flex-row justify-between border-t border-[#E8EDF2] pt-2">
                  {['M','T','W','T','F','S','S'].map((d, i) => (
                    <Text key={i} className={`text-[9px] font-bold ${d === 'S' ? 'text-[#F97316]' : 'text-slate-400'}`}>{d}</Text>
                  ))}
                </View>
              </View>
            </View>

            {/* Weekly Targets */}
            <View className="bg-white rounded-2xl p-5 border border-[#D9E2EC] shadow-sm">
              <View className="w-10 h-10 bg-emerald-50 rounded-xl items-center justify-center mb-3">
                <Text className="text-emerald-500 font-bold text-lg">✓</Text>
              </View>
              <Text className="text-lg font-bold text-[#102A43] mb-1">Weekly Targets</Text>
              <Text className="text-[#627D98] text-sm leading-relaxed mb-4">Set measurable goals, break them into subtasks, and track completion rate week by week.</Text>
              <View className="bg-[#FAFAF9] rounded-xl p-3 border border-[#E8EDF2]">
                <View className="flex-row justify-between mb-1">
                  <Text className="text-[10px] font-bold text-[#102A43]">Ace This Week's Exams</Text>
                  <Text className="text-[9px] text-[#F97316] font-bold">0%</Text>
                </View>
                <View className="h-1 bg-[#E8EDF2] rounded-full mb-2"><View className="h-full w-0 bg-[#F97316] rounded-full" /></View>
                <View className="gap-y-1">
                  {['Final active recall self-quiz', 'Review difficult concepts'].map((t, i) => (
                    <View key={i} className="flex-row items-center gap-1.5">
                      <View className="w-2.5 h-2.5 border border-[#D9E2EC] rounded" />
                      <Text className="text-[9px] text-slate-500">{t}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/* Smart Notes */}
            <View className="bg-white rounded-2xl p-5 border border-[#D9E2EC] shadow-sm">
              <View className="w-10 h-10 bg-amber-50 rounded-xl items-center justify-center mb-3">
                <Text className="text-amber-500 font-bold text-lg">✎</Text>
              </View>
              <Text className="text-lg font-bold text-[#102A43] mb-1">Smart Notes</Text>
              <Text className="text-[#627D98] text-sm leading-relaxed mb-4">Rich text editor with pinning, search, categories, and export. Organize your lecture notes efficiently.</Text>
              <View className="gap-y-2">
                <View className="bg-[#F97316] rounded-lg p-2.5">
                  <Text className="text-white text-[10px] font-bold">Weekly Study Targets</Text>
                </View>
                <View className="bg-white border border-[#E8EDF2] rounded-lg p-2.5">
                  <Text className="text-[#102A43] text-[10px] font-bold">Waterfall Methodology</Text>
                </View>
              </View>
            </View>

            {/* Progress Analytics */}
            <View className="bg-[#102A43] rounded-2xl p-5 border border-[#243B53] shadow-sm overflow-hidden">
              <View className="w-10 h-10 bg-white/10 rounded-xl items-center justify-center mb-3">
                <Text className="text-white font-bold text-lg">↗</Text>
              </View>
              <Text className="text-lg font-bold text-white mb-1">Progress Analytics</Text>
              <Text className="text-[#829AB1] text-sm leading-relaxed mb-4">SRL score trend, dimension analysis, and consistency tracking to measure your learning development.</Text>
              <View className="gap-y-2">
                {[
                  { label: 'May 31', val: '100%', w: '100%', color: 'bg-[#F97316]' },
                  { label: 'May 31', val: '75%', w: '75%', color: 'bg-violet-500' },
                  { label: 'May 20', val: '66%', w: '66%', color: 'bg-purple-500' },
                ].map((bar, i) => (
                  <View key={i} className="flex-row items-center gap-2">
                    <Text className="text-[9px] text-slate-400 w-10">{bar.label}</Text>
                    <View className="flex-1 h-2 bg-[#243B53] rounded-full">
                      <View className={`h-full rounded-full ${bar.color}`} style={{ width: bar.w as any }} />
                    </View>
                    <Text className="text-[9px] text-slate-300 w-6 text-right">{bar.val}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Settings & Integrations */}
            <View className="bg-white rounded-2xl p-5 border border-[#D9E2EC] shadow-sm">
              <View className="w-10 h-10 bg-rose-50 rounded-xl items-center justify-center mb-3">
                <Text className="text-rose-500 font-bold text-lg">⚙</Text>
              </View>
              <Text className="text-lg font-bold text-[#102A43] mb-1">Settings & Integrations</Text>
              <Text className="text-[#627D98] text-sm leading-relaxed mb-4">Customize your workspace with theme preferences, profile management, and Google Calendar sync.</Text>
              <View className="bg-[#FAFAF9] rounded-xl p-3 border border-[#E8EDF2] flex-row items-center gap-3">
                <View className="w-8 h-8 bg-white border border-[#E8EDF2] rounded items-center justify-center"><Text>🎨</Text></View>
                <View className="flex-1">
                  <Text className="text-[10px] font-bold text-[#102A43]">Theme Preferences</Text>
                  <Text className="text-[8px] text-slate-500">Premium Light / Premium Dark</Text>
                </View>
              </View>
            </View>

          </View>
        </View>

        {/* How It Works */}
        <View className="px-6 mb-8">
          <View className="items-center mb-8">
            <View className="bg-[#FFF7ED] border border-[#FED7AA] px-3 py-1.5 rounded-full mb-3">
              <Text className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#EA580C' }}>How It Works</Text>
            </View>
            <Text className="text-2xl font-black text-[#102A43] text-center">Mastery in three steps.</Text>
          </View>

          <View className="gap-y-6">
            {[
              { num: '01', title: 'Plan Your Sessions', desc: 'Create focus sessions in your planner. Set targets for the week.' },
              { num: '02', title: 'Focus & Take Notes', desc: 'Work through your sessions and capture structured notes.' },
              { num: '03', title: 'Reflect & Improve', desc: 'Review analytics and get AI recommendations to study smarter.' },
            ].map((step, i) => (
              <View key={i} className="bg-white rounded-2xl p-5 border border-[#D9E2EC] shadow-sm flex-row items-start gap-4">
                <View className="w-12 h-12 bg-[#F0F4F8] rounded-xl border border-[#D9E2EC] items-center justify-center">
                  <Text className="text-lg font-black" style={{ color: '#F97316' }}>{step.num}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-base font-bold text-[#102A43] mb-1">{step.title}</Text>
                  <Text className="text-[#627D98] text-sm leading-relaxed">{step.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* CTA Section */}
        <View className="px-4 mb-12">
          <View className="bg-[#102A43] rounded-[24px] p-8 items-center shadow-lg">
            <Text className="text-white text-3xl font-black text-center leading-tight mb-4">
              Ready to transform your study habits?
            </Text>
            <Text className="text-[#829AB1] text-center text-sm mb-8 leading-relaxed px-2">
              Join thousands of students who have found their sanctuary of productivity.
            </Text>
            <TouchableOpacity 
              className="bg-[#F97316] py-4 px-8 rounded-full w-full items-center shadow-md mb-6"
              onPress={() => router.push('/(auth)/register')}
            >
              <Text className="text-white font-bold text-base">Get Started for Free</Text>
            </TouchableOpacity>
            <Text className="text-[#627D98] text-[9px] font-bold tracking-[0.2em] uppercase text-center">
              NO CREDIT CARD REQUIRED • FREE TIER FOREVER
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View className="px-6 pt-10 pb-8 border-t border-[#D9E2EC] bg-[#FAFAF9]">
          <View className="mb-10">
            <Text className="text-[#F97316] text-2xl font-black mb-3 tracking-tight">Lumora</Text>
            <Text className="text-[#627D98] text-sm leading-relaxed pr-8">
              Your AI-powered self-regulated learning platform. Build better study habits with clarity.
            </Text>
          </View>

          <View className="flex-row flex-wrap gap-y-10 justify-between mb-12">
            <View className="w-[45%]">
              <Text className="text-[#102A43] font-bold text-xs uppercase tracking-wider mb-5">Product</Text>
              <View className="gap-y-4">
                {['Features', 'Pricing', 'Changelog'].map((link, i) => (
                  <Text key={i} className="text-[#627D98] text-sm">{link}</Text>
                ))}
              </View>
            </View>
            
            <View className="w-[45%]">
              <Text className="text-[#102A43] font-bold text-xs uppercase tracking-wider mb-5">Company</Text>
              <View className="gap-y-4">
                {['About', 'Blog', 'Careers'].map((link, i) => (
                  <Text key={i} className="text-[#627D98] text-sm">{link}</Text>
                ))}
              </View>
            </View>

            <View className="w-[45%]">
              <Text className="text-[#102A43] font-bold text-xs uppercase tracking-wider mb-5">Legal</Text>
              <View className="gap-y-4">
                {['Privacy', 'Terms'].map((link, i) => (
                  <Text key={i} className="text-[#627D98] text-sm">{link}</Text>
                ))}
              </View>
            </View>
          </View>

          <View className="flex-row items-center justify-between border-t border-[#D9E2EC] pt-6">
            <Text className="text-[#829AB1] text-[10px] font-medium flex-1">
              © 2024 Lumora AI. Designed for focused minds.
            </Text>
            <View className="flex-row gap-4">
              <Text className="text-[#829AB1] font-bold">𝕏</Text>
              <Text className="text-[#829AB1] font-bold">GH</Text>
              <Text className="text-[#829AB1] font-bold">in</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
