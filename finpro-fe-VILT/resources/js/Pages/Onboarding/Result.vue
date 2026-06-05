<template>
  <Head title="Your Study Profile - Lumora" />
  <div class="min-h-screen font-sans antialiased bg-[#FAFAF9] dark:bg-[#0C1222] text-[#102A43] dark:text-[#F0F4F8] pb-32 pt-16 px-6 transition-colors duration-300 relative overflow-hidden">

    <!-- Background Elements -->
    <div class="absolute top-10 right-0 w-[500px] h-[500px] bg-brand-300/10 dark:bg-brand-500/5 rounded-full blur-[140px] pointer-events-none"></div>
    <div class="absolute bottom-0 left-[5%] w-[350px] h-[350px] bg-navy-300/8 dark:bg-navy-500/5 rounded-full blur-[100px] pointer-events-none"></div>

    <!-- Loading State -->
    <div v-if="loading" class="max-w-[960px] mx-auto py-32 flex flex-col items-center justify-center text-center relative z-10">
        <div class="w-20 h-20 border-4 border-[#E8EDF2] dark:border-dark-border border-t-brand-500 rounded-full animate-spin mb-8 shadow-[0_0_15px_rgba(249,115,22,0.5)]"></div>
        <h2 class="text-2xl font-bold text-navy-900 dark:text-text-primary mb-4">Finalizing Your Sanctuary...</h2>
        <p class="text-navy-500 dark:text-text-muted font-medium max-w-md">Our AI is meticulously analyzing your study habits to build the perfect environment for your growth.</p>
    </div>

    <!-- Main Content -->
    <div v-else class="max-w-[960px] mx-auto relative z-10">

      <!-- ═══ Hero Section ═══ -->
      <div class="text-center mb-14">
        <div class="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-full text-[11px] font-mono font-bold uppercase tracking-widest mb-8 border border-emerald-100 dark:border-emerald-500/20 shadow-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Assessment Complete
        </div>
        <h1 class="text-[34px] md:text-[42px] font-bold text-navy-900 dark:text-text-primary leading-tight mb-5">
            Your Study Profile: <span class="text-brand-500">{{ profileTitle }}</span>
        </h1>
        <p class="text-navy-500 dark:text-text-muted font-medium text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            We've analyzed your responses and created a personalized roadmap for your academic success.
        </p>
      </div>

      <!-- ═══ Learning Analytics Highlights ═══ -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <!-- Deep Work Capacity -->
          <div class="bg-white dark:bg-dark-panel rounded-3xl p-6 shadow-lg border border-[#D9E2EC] dark:border-dark-border flex flex-col items-center text-center group hover:border-brand-300 dark:hover:border-brand-500/50 transition-all">
              <div class="relative w-24 h-24 mb-4 flex items-center justify-center">
                  <svg class="w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="currentColor" stroke-width="8" fill="transparent" class="text-[#E8EDF2] dark:text-dark-surface" />
                      <circle cx="48" cy="48" r="40" stroke="currentColor" stroke-width="8" fill="transparent" 
                          class="text-brand-500 transition-all duration-1000 drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]"
                          :stroke-dasharray="251.2"
                          :stroke-dashoffset="251.2 - (251.2 * deepWorkCapacity / 100)"
                          stroke-linecap="round" />
                  </svg>
                  <span class="absolute text-xl font-bold text-navy-900 dark:text-text-primary">{{ deepWorkCapacity }}%</span>
              </div>
              <h4 class="text-sm font-bold text-navy-900 dark:text-text-primary mb-1">Deep Work Capacity</h4>
              <p class="text-[11px] text-navy-400 dark:text-text-faint font-medium leading-tight px-4">Kemampuan fokus mendalam tanpa distraksi</p>
          </div>

          <!-- Consistency -->
          <div class="bg-white dark:bg-dark-panel rounded-3xl p-6 shadow-lg border border-[#D9E2EC] dark:border-dark-border flex flex-col items-center text-center group hover:border-emerald-300 dark:hover:border-emerald-500/50 transition-all">
              <div class="relative w-24 h-24 mb-4 flex items-center justify-center">
                  <svg class="w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="currentColor" stroke-width="8" fill="transparent" class="text-[#E8EDF2] dark:text-dark-surface" />
                      <circle cx="48" cy="48" r="40" stroke="currentColor" stroke-width="8" fill="transparent" 
                          class="text-emerald-500 transition-all duration-1000 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                          :stroke-dasharray="251.2"
                          :stroke-dashoffset="251.2 - (251.2 * consistencyScore / 100)"
                          stroke-linecap="round" />
                  </svg>
                  <span class="absolute text-xl font-bold text-navy-900 dark:text-text-primary">{{ consistencyScore }}%</span>
              </div>
              <h4 class="text-sm font-bold text-navy-900 dark:text-text-primary mb-1">Learning Consistency</h4>
              <p class="text-[11px] text-navy-400 dark:text-text-faint font-medium leading-tight px-4">Kestabilan dan rutinitas jadwal belajarmu</p>
          </div>

          <!-- Retention -->
          <div class="bg-white dark:bg-dark-panel rounded-3xl p-6 shadow-lg border border-[#D9E2EC] dark:border-dark-border flex flex-col items-center text-center group hover:border-amber-300 dark:hover:border-amber-500/50 transition-all">
              <div class="relative w-24 h-24 mb-4 flex items-center justify-center">
                  <svg class="w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="currentColor" stroke-width="8" fill="transparent" class="text-[#E8EDF2] dark:text-dark-surface" />
                      <circle cx="48" cy="48" r="40" stroke="currentColor" stroke-width="8" fill="transparent" 
                          class="text-amber-500 transition-all duration-1000 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]"
                          :stroke-dasharray="251.2"
                          :stroke-dashoffset="251.2 * (1 - retentionScore / 100)"
                          stroke-linecap="round" />
                  </svg>
                  <span class="absolute text-xl font-bold text-navy-900 dark:text-text-primary">{{ retentionScore }}%</span>
              </div>
              <h4 class="text-sm font-bold text-navy-900 dark:text-text-primary mb-1">Knowledge Retention</h4>
              <p class="text-[11px] text-navy-400 dark:text-text-faint font-medium leading-tight px-4">Seberapa lama materi bertahan di ingatanmu</p>
          </div>
      </div>

      <!-- ═══ Top Row: Core Strengths + Cognitive Style ═══ -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">

        <!-- Core Strengths (wider, 3/5) -->
        <div class="md:col-span-3 bg-white dark:bg-dark-panel rounded-3xl p-8 shadow-lg border border-[#D9E2EC] dark:border-dark-border">
            <h3 class="text-lg font-bold text-navy-900 dark:text-text-primary mb-6">Core Strengths</h3>

            <div class="space-y-5 mb-8">
                <template v-if="strengths.length > 0">
                    <div v-for="(s, idx) in strengths" :key="idx" class="flex items-start gap-4">
                        <div class="w-10 h-10 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 text-lg">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="s.iconPath" />
                            </svg>
                        </div>
                        <div class="min-w-0">
                            <h4 class="text-[15px] font-bold text-navy-900 dark:text-text-primary mb-1">{{ s.title }}</h4>
                            <p class="text-navy-500 dark:text-text-muted font-medium text-[13px] leading-relaxed">{{ s.desc }}</p>
                        </div>
                    </div>
                </template>
                <div v-else class="text-center py-6 bg-[#FAFAF9] dark:bg-dark-surface rounded-2xl border border-[#E8EDF2] dark:border-dark-border border-dashed">
                    <p class="text-navy-400 dark:text-text-faint font-medium text-sm">We are focusing entirely on growth areas for now.</p>
                </div>
            </div>
        </div>

        <!-- Cognitive Style (narrower, 2/5) -->
        <div class="md:col-span-2 bg-white dark:bg-dark-panel rounded-3xl p-8 shadow-lg border border-[#D9E2EC] dark:border-dark-border text-center flex flex-col items-center justify-center relative overflow-hidden">
            <div class="w-20 h-20 rounded-full overflow-hidden mb-5 border-4 border-white dark:border-dark-surface shadow-xl rotate-[-3deg] relative z-10 flex items-center justify-center bg-[#E8EDF2] dark:bg-[#1E293B] text-navy-400 dark:text-[#64748B]">
                <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
            </div>
            <h3 class="text-lg font-bold text-navy-900 dark:text-text-primary mb-1 relative z-10">Your Cognitive Style</h3>
            <p class="text-brand-500 font-mono font-bold text-[11px] uppercase tracking-widest relative z-10">{{ cognitiveStyle }}</p>
        </div>
      </div>

      <!-- ═══ Middle Row: Weaknesses & Areas for Growth ═══ -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- Weaknesses -->
        <div class="bg-white dark:bg-dark-panel rounded-3xl p-8 shadow-lg border border-[#D9E2EC] dark:border-dark-border">
            <h3 class="text-lg font-bold text-rose-600 dark:text-rose-400 mb-6 flex items-center gap-2">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                Key Weaknesses
            </h3>
            <div class="space-y-4">
                <template v-if="realWeaknesses.length > 0">
                    <div v-for="(w, idx) in realWeaknesses" :key="idx" class="p-5 bg-rose-50 dark:bg-rose-500/5 rounded-2xl border border-rose-100 dark:border-rose-500/10 group transition-all hover:bg-white dark:hover:bg-dark-surface hover:shadow-lg hover:border-rose-200 dark:hover:border-rose-500/30">
                        <h4 class="text-[15px] font-bold text-rose-900 dark:text-rose-300 mb-1.5">{{ w.title }}</h4>
                        <p class="text-[13px] font-medium text-rose-700/80 dark:text-rose-400/80 leading-relaxed">{{ w.desc }}</p>
                    </div>
                </template>
                <div v-else class="text-center py-6 bg-[#FAFAF9] dark:bg-dark-surface rounded-2xl border border-[#E8EDF2] dark:border-dark-border border-dashed">
                    <p class="text-navy-400 dark:text-text-faint font-medium text-sm">No critical weaknesses identified.</p>
                </div>
            </div>
        </div>

        <!-- Areas for Growth -->
        <div class="bg-white dark:bg-dark-panel rounded-3xl p-8 shadow-lg border border-[#D9E2EC] dark:border-dark-border">
            <h3 class="text-lg font-bold text-amber-600 dark:text-amber-400 mb-6 flex items-center gap-2">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                Areas for Growth
            </h3>
            <div class="space-y-4">
                <template v-if="areasForGrowth.length > 0">
                    <div v-for="(a, idx) in areasForGrowth" :key="idx" class="p-5 bg-amber-50 dark:bg-amber-500/5 rounded-2xl border border-amber-100 dark:border-amber-500/10 group transition-all hover:bg-white dark:hover:bg-dark-surface hover:shadow-lg hover:border-amber-200 dark:hover:border-amber-500/30">
                        <h4 class="text-[15px] font-bold text-amber-900 dark:text-amber-300 mb-1.5">{{ a.title }}</h4>
                        <p class="text-[13px] font-medium text-amber-700/80 dark:text-amber-400/80 leading-relaxed">{{ a.desc }}</p>
                    </div>
                </template>
                <div v-else class="text-center py-6 bg-[#FAFAF9] dark:bg-dark-surface rounded-2xl border border-[#E8EDF2] dark:border-dark-border border-dashed">
                    <p class="text-navy-400 dark:text-text-faint font-medium text-sm">Reviewing growth areas...</p>
                </div>
            </div>
        </div>
      </div>

      <!-- ═══ Bottom Row: Recommendations + AI Strategy ═══ -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <!-- Recommendations -->
        <div class="bg-white dark:bg-dark-panel rounded-3xl p-8 shadow-lg border border-[#D9E2EC] dark:border-dark-border">
            <h3 class="text-lg font-bold text-sky-600 dark:text-sky-400 mb-6 flex items-center gap-2">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0012 18.75c-1.03 0-1.9-.4-2.593-1.012l-.547-.547z"/></svg>
                Recommendations
            </h3>
            <div class="space-y-4">
                <template v-if="realRecommendations.length > 0">
                    <div v-for="(r, idx) in realRecommendations" :key="idx" class="p-5 bg-sky-50 dark:bg-sky-500/5 rounded-2xl border border-sky-100 dark:border-sky-500/10 group transition-all hover:bg-white dark:hover:bg-dark-surface hover:shadow-lg hover:border-sky-200 dark:hover:border-sky-500/30">
                        <h4 class="text-[15px] font-bold text-sky-900 dark:text-sky-300 mb-1.5">{{ r.title }}</h4>
                        <p class="text-[13px] font-medium text-sky-700/80 dark:text-sky-400/80 leading-relaxed">{{ r.desc }}</p>
                    </div>
                </template>
                <div v-else class="text-center py-6 bg-[#FAFAF9] dark:bg-dark-surface rounded-2xl border border-[#E8EDF2] dark:border-dark-border border-dashed">
                    <p class="text-navy-400 dark:text-text-faint font-medium text-sm">Processing recommendations...</p>
                </div>
            </div>
        </div>

        <!-- AI Strategy -->
        <div class="bg-navy-900 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden group flex flex-col justify-between">
            <div class="relative z-10">
                <div class="inline-flex items-center gap-2 bg-brand-500/20 px-3 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest mb-6 border border-brand-500/30 text-brand-300">
                    AI Recommendation
                </div>
                <h3 class="text-2xl font-bold mb-4 leading-tight">{{ aiStrategy.title }}</h3>
                <p class="text-navy-100 font-medium text-sm leading-relaxed mb-8">
                    {{ aiStrategy.desc }}
                </p>
                <button class="flex items-center gap-2 font-bold text-sm text-brand-400 group/btn hover:text-brand-300 transition-colors">
                    Explore Strategy
                    <svg class="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
            </div>

            <!-- Abstract shapes -->
            <div class="absolute bottom-[-40px] right-[-40px] w-48 h-48 bg-brand-500/20 rounded-full blur-3xl group-hover:bg-brand-500/30 transition-colors duration-700"></div>
            <div class="absolute top-8 right-8 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700 text-brand-500">
                <svg class="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
            </div>
        </div>
      </div>

      <!-- ═══ Action Buttons ═══ -->
      <div class="flex flex-col items-center pt-6 gap-8">
        <p class="text-navy-400 dark:text-text-faint font-medium italic text-sm">"Small habits are the architecture of great minds." — Lumora AI</p>

        <div class="w-full max-w-[300px]">
            <Link :href="route('dashboard')" class="block w-full btn-primary text-white font-bold py-4 rounded-xl text-center shadow-glow transition-all active:scale-[0.98]">
                Go to Dashboard
            </Link>
        </div>

        <!-- Footer markers -->
        <div class="flex items-center gap-6 text-brand-500/40 pb-4">
            <div class="w-1.5 h-1.5 rounded-full bg-current"></div>
            <div class="w-2 h-2 rounded-full bg-brand-500/60"></div>
            <div class="w-1.5 h-1.5 rounded-full bg-current"></div>
        </div>
      </div>
    </div>

    <!-- Live indicator -->
    <div class="fixed bottom-8 right-8 flex items-center gap-3 bg-white/90 dark:bg-dark-panel/90 backdrop-blur-xl px-6 py-3 rounded-full shadow-lg border border-[#D9E2EC] dark:border-dark-border z-50">
        <div class="relative w-2 h-2">
            <div class="absolute inset-0 bg-brand-500 rounded-full animate-ping opacity-75"></div>
            <div class="relative w-2 h-2 bg-brand-500 rounded-full"></div>
        </div>
        <span class="text-[10px] font-mono font-bold text-navy-500 dark:text-text-faint uppercase tracking-[0.15em]">AI Assistant is active</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { Head, Link } from '@inertiajs/vue3'

const props = defineProps({
  result: { type: Object, default: () => ({}) }
})

// ─── Loading State ──────────────────────────────────────────────────────────

const loading = ref(true)

// ─── Data Parsing ───────────────────────────────────────────────────────────

function tryParseAI(obj) {
    if (!obj || typeof obj !== 'object') return null
    const raw = obj.CategoryResult || obj.category_result
    if (raw && typeof raw === 'string') {
        try {
            const parsed = JSON.parse(raw)
            if (parsed && parsed.profile_title) return parsed
        } catch (e) {
            console.warn('Failed to parse CategoryResult:', e)
        }
    }
    if (obj.profile_title) return obj
    return null
}

const aiData = computed(() => {
    const fromProps = tryParseAI(props.result)
    if (fromProps) return fromProps
    try {
        const stored = sessionStorage.getItem('lumora_result')
        if (stored) {
            const parsed = JSON.parse(stored)
            const fromStored = tryParseAI(parsed)
            if (fromStored) return fromStored
        }
    } catch {}
    return {}
})

// ─── Computed Fields with Fallbacks ─────────────────────────────────────────

const profileTitle = computed(() => aiData.value.profile_title || 'The Focused Achiever')
const deepWorkCapacity = computed(() => aiData.value.deep_work_capacity || 92)
const cognitiveStyle = computed(() => aiData.value.cognitive_style || 'Architectural & Analytical')
const consistencyScore = computed(() => aiData.value.consistency_score || 64)
const retentionScore = computed(() => aiData.value.retention_score || 88)

const defaultIcons = [
    'M13 10V3L4 14h7v7l9-11h-7z', // Zap
    'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', // Clock
    'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z', // Idea
    'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' // Badge
]

function getIconPath(icon, index = 0) {
    if (icon && typeof icon === 'string' && icon.startsWith('M') && icon.length > 20) return icon
    return defaultIcons[index % defaultIcons.length]
}

const strengths = computed(() => {
    const raw = aiData.value.strengths
    if (Array.isArray(raw)) {
        if (raw.length === 0) return [] 
        return raw.map((s, i) => ({
            title: s.title || `Strength ${i + 1}`,
            desc: s.desc || s.description || '',
            iconPath: getIconPath(s.icon, i)
        }))
    }
    return [
        { title: 'Analyzing...', desc: 'We are processing your strengths.', iconPath: defaultIcons[0] }
    ]
})

const realWeaknesses = computed(() => {
    const raw = aiData.value.weaknesses
    if (Array.isArray(raw)) {
        if (raw.length === 0) return []
        return raw.map((w, i) => ({
            title: w.title || `Weakness ${i + 1}`,
            desc: w.desc || w.description || ''
        }))
    }
    return []
})

const areasForGrowth = computed(() => {
    const raw = aiData.value.areas_for_growth
    if (Array.isArray(raw)) {
        if (raw.length === 0) return []
        return raw.map((w, i) => ({
            title: w.title || `Area ${i + 1}`,
            desc: w.desc || w.description || ''
        }))
    }
    return [
        { title: 'Analyzing...', desc: 'We are processing your growth areas.' }
    ]
})

const realRecommendations = computed(() => {
    const raw = aiData.value.recommendations
    if (Array.isArray(raw)) {
        if (raw.length === 0) return []
        return raw.map((r, i) => ({
            title: r.title || `Recommendation ${i + 1}`,
            desc: r.desc || r.description || ''
        }))
    }
    return []
})

const aiStrategy = computed(() => {
    const raw = aiData.value.ai_strategy
    if (raw && raw.title) return raw
    return {
        title: 'The "Interval" Strategy',
        desc: 'Based on your profile, we recommend a focused strategy to maximize your potential.'
    }
})

// ─── Lifecycle & Reactivity ──────────────────────────────────────────────────

watch(() => props.result, (newVal) => {
    if (newVal && (newVal.profile_title || newVal.CategoryResult)) {
        loading.value = false
    }
}, { immediate: true })

onMounted(() => {
    localStorage.setItem('lumora_survey_completed', 'true')

    if (!aiData.value.profile_title) {
        setTimeout(() => {
            loading.value = false
        }, 5000)
    } else {
        loading.value = false
    }

    // Theme sync
    const saved = localStorage.getItem('theme')
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
})
</script>

<style scoped>
.btn-primary {
  background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
  transition: all 0.3s ease;
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #EA580C 0%, #C2410C 100%);
}

.shadow-glow {
  box-shadow: 0 4px 16px rgba(249, 115, 22, 0.25);
}
</style>
