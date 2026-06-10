<template>
  <DashboardLayout 
    :showBuddy="true"
    buddyContextTitle="Progress Insight" 
    :buddyContextMessage="insightMessage"
  >
    <!-- Header -->
    <div class="mb-10">
      <h1 class="text-3xl font-black text-navy-900 dark:text-text-primary mb-2">Progress</h1>
      <p class="text-navy-500 dark:text-text-muted font-medium">Track your learning development over time.</p>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="space-y-6">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="i in 4" :key="i" class="h-28 bg-[#E8EDF2] dark:bg-dark-border rounded-[28px] animate-pulse"></div>
      </div>
      <div class="h-64 bg-[#E8EDF2] dark:bg-dark-border rounded-[28px] animate-pulse"></div>
    </div>

    <template v-else>
      <!-- Metric Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <!-- Current Profile -->
        <div class="bg-white dark:bg-dark-panel p-6 rounded-[28px] border border-[#D9E2EC] dark:border-dark-border shadow-sm">
          <p class="text-[10px] font-black text-navy-400 dark:text-text-faint uppercase tracking-widest mb-2">Current Profile</p>
          <p v-if="progress.latest_result" class="text-lg font-black text-navy-900 dark:text-text-primary truncate">{{ profileTitle }}</p>
          <p v-else class="text-sm font-bold text-navy-400 dark:text-text-faint">No profile yet</p>
          <a v-if="!progress.latest_result" :href="route('onboarding.sanctuary')" class="text-xs text-brand-500 font-bold mt-2 inline-block hover:underline">Take Assessment →</a>
        </div>
        <!-- Consistency -->
        <div class="bg-white dark:bg-dark-panel p-6 rounded-[28px] border border-[#D9E2EC] dark:border-dark-border shadow-sm">
          <p class="text-[10px] font-black text-navy-400 dark:text-text-faint uppercase tracking-widest mb-2">Consistency</p>
          <p class="text-3xl font-black text-brand-500">{{ consistencyScore }}%</p>
          <p class="text-xs font-bold text-navy-400 dark:text-text-faint mt-1">Active Days / Week</p>
        </div>
        <!-- Deep Work -->
        <div class="bg-white dark:bg-dark-panel p-6 rounded-[28px] border border-[#D9E2EC] dark:border-dark-border shadow-sm">
          <p class="text-[10px] font-black text-navy-400 dark:text-text-faint uppercase tracking-widest mb-2">Deep Work</p>
          <p class="text-3xl font-black text-emerald-500">{{ deepWorkScore }}%</p>
          <p class="text-xs font-bold text-navy-400 dark:text-text-faint mt-1">Capacity</p>
        </div>
        <!-- Retention -->
        <div class="bg-white dark:bg-dark-panel p-6 rounded-[28px] border border-[#D9E2EC] dark:border-dark-border shadow-sm">
          <p class="text-[10px] font-black text-navy-400 dark:text-text-faint uppercase tracking-widest mb-2">Retention</p>
          <p class="text-3xl font-black text-purple-500">{{ retentionScore }}%</p>
          <p class="text-xs font-bold text-navy-400 dark:text-text-faint mt-1">Knowledge Retained</p>
        </div>
      </div>

      <!-- SRL Score Trend -->
      <div class="bg-white dark:bg-dark-panel p-8 rounded-[32px] border border-[#D9E2EC] dark:border-dark-border shadow-sm mb-10">
        <h3 class="text-lg font-black text-navy-900 dark:text-text-primary mb-6">SRL Score Trend</h3>
        <div v-if="trendData.length === 0" class="text-center py-10">
          <p class="text-navy-400 dark:text-text-muted font-bold">No assessment data yet. Take your first assessment to see trends.</p>
        </div>
        <div v-else class="space-y-3">
          <div v-for="entry in trendData" :key="entry.ResultID" class="flex items-center gap-4">
            <span class="text-xs font-bold text-navy-400 dark:text-text-faint w-24 flex-shrink-0">{{ formatDate(entry.CreatedAt) }}</span>
            <div class="flex-1 flex items-center gap-2">
              <div class="flex-1 h-3 bg-[#FAFAF9] dark:bg-dark-surface rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-brand-500 to-indigo-400 rounded-full transition-all duration-500" :style="{ width: `${avgScore(entry)}%` }"></div>
              </div>
              <span class="text-sm font-black text-navy-900 dark:text-text-primary w-12 text-right">{{ avgScore(entry) }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Dimension Analysis -->
      <div class="bg-white dark:bg-dark-panel p-8 rounded-[32px] border border-[#D9E2EC] dark:border-dark-border shadow-sm mb-10">
        <h3 class="text-lg font-black text-navy-900 dark:text-text-primary mb-6">Dimension Analysis</h3>
        <div v-if="!progress.dimension_delta" class="text-center py-10">
          <p class="text-navy-400 dark:text-text-muted font-bold">Take another assessment later to unlock comparative dimension analysis.</p>
        </div>
        <div v-else class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="(dim, key) in dimensionLabels" :key="key" class="bg-[#FAFAF9] dark:bg-dark-surface p-5 rounded-2xl border border-[#D9E2EC] dark:border-dark-border">
            <p class="text-[10px] font-black text-navy-400 dark:text-text-faint uppercase tracking-widest mb-2">{{ dim }}</p>
            <div class="flex items-center gap-2">
              <span class="text-2xl font-black" :class="deltaColor(progress.dimension_delta[key])">
                {{ progress.dimension_delta[key] > 0 ? '+' : '' }}{{ progress.dimension_delta[key] || 0 }}
              </span>
              <svg v-if="progress.dimension_delta[key] > 0" class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 15l7-7 7 7"/></svg>
              <svg v-else-if="progress.dimension_delta[key] < 0" class="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"/></svg>
              <span v-else class="text-xs font-bold text-navy-400 dark:text-text-faint">—</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Buttons -->
      <div class="flex flex-wrap gap-4">
        <a v-if="canRetake" :href="route('onboarding.sanctuary') + '?retake=true'" class="btn-primary text-white px-6 py-3 rounded-2xl font-bold transition-all active:scale-95 flex items-center gap-2 shadow-glow">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          Retake Assessment
        </a>
        <div v-else class="bg-[#E8EDF2] dark:bg-dark-surface text-navy-400 dark:text-text-muted px-6 py-3 rounded-2xl font-bold flex items-center gap-2 cursor-not-allowed">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          Next assessment in: {{ timeUntilNextAssessment }}
        </div>
      </div>
    </template>

  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { usePage } from '@inertiajs/vue3'
import DashboardLayout from '@/Layouts/DashboardLayout.vue'
import { progressApi, setWorkspaceToken } from '@/services/workspaceApi'

const page = usePage()
const isLoading = ref(true)
const progress = ref({})

const dimensionLabels = {
  planning: 'Planning',
  time_management: 'Time Management',
  cognitive: 'Cognitive Strategy',
  reflection: 'Reflection'
}

const trendData = computed(() => progress.value.assessment_trend || [])

const profileData = computed(() => {
  const r = progress.value.latest_result
  if (!r) return null
  try {
    if (r.CategoryResult) {
      return JSON.parse(r.CategoryResult)
    }
  } catch {}
  return null
})

const profileTitle = computed(() => profileData.value?.profile_title || 'Learner')
const consistencyScore = computed(() => profileData.value?.consistency_score || 0)
const deepWorkScore = computed(() => profileData.value?.deep_work_capacity || 0)
const retentionScore = computed(() => profileData.value?.retention_score || 0)

const insightMessage = computed(() => {
  if (trendData.value.length < 2) return 'Take another assessment later to unlock comparison and dimension analysis.'
  return 'Great consistency! Keep refining your learning strategies to improve your SRL scores.'
})

const timeUntilNextAssessment = ref('')
let timerInterval = null

const canRetake = computed(() => {
  return true; // Always allow retake during testing/development
})

function updateCountdown() {
  if (!progress.value.latest_result || !progress.value.latest_result.CreatedAt) return;
  const lastDate = new Date(progress.value.latest_result.CreatedAt);
  const nextDate = new Date(lastDate.getTime() + 14 * 24 * 60 * 60 * 1000);
  const now = new Date();
  const diff = nextDate - now;
  
  if (diff <= 0) {
    timeUntilNextAssessment.value = '';
    return;
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  timeUntilNextAssessment.value = `${days}d ${hours}h ${minutes}m`;
}

onMounted(async () => {
  setWorkspaceToken(page.props.go_token)
  try {
    progress.value = await progressApi.getProgress()
    updateCountdown()
    timerInterval = setInterval(updateCountdown, 60000)
  } catch (err) {
    console.error('Failed to fetch progress', err)
  } finally {
    isLoading.value = false
  }
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})

function avgScore(entry) {
  const scores = [entry.PlanningScore, entry.TimeManagementScore, entry.CognitiveScore, entry.ReflectionScore].filter(s => s != null)
  if (scores.length === 0) return 0
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length
  return Math.round(avg / 25 * 100) // Max score is 25 per dimension
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function deltaColor(val) {
  if (val > 0) return 'text-emerald-500'
  if (val < 0) return 'text-rose-500'
  return 'text-navy-400 dark:text-text-faint'
}
</script>
