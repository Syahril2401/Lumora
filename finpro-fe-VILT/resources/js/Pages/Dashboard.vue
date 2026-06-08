<template>
  <DashboardLayout 
    :showBuddy="true"
    buddyContextTitle="Study Insight" 
    :buddyContextMessage="insightMessage"
  >
    <!-- Welcome Section (from Figma) -->
    <div class="mb-8 flex flex-col justify-center">
        <h1 class="text-[32px] font-black text-navy-900 dark:text-text-primary mb-2 tracking-tight">{{ greeting }}, {{ userName }}. Ready for a deep focus session?</h1>
        <p class="text-navy-500 dark:text-text-muted font-medium text-sm flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            Organize your tasks, stay focused, and achieve your targets today.
        </p>
    </div>

    <!-- Dashboard Grid (Figma: Bento Grid Style) -->
    <div class="grid grid-cols-12 gap-6 mb-8">
        <!-- Left Column: Daily Overview & Recent Notes -->
        <div class="col-span-12 xl:col-span-7 flex flex-col gap-6">
            
            <!-- Daily Overview: Bento Style -->
            <div class="bg-navy-900 rounded-[24px] p-6 text-white shadow-xl shadow-brand-500/10 relative overflow-hidden group h-auto">
                <div class="flex items-center justify-between mb-6 relative z-10">
                    <div>
                        <h3 class="text-lg font-black tracking-wide text-white">Daily Overview</h3>
                        <p class="text-navy-200 text-xs font-bold mt-1">{{ new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }) }}</p>
                    </div>
                    <Link :href="route('planner', { view: 'daily' })" class="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-xs font-bold transition-all flex items-center gap-2 backdrop-blur-md text-white">
                        Full Schedule
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    </Link>
                </div>

                <!-- Timeline Items -->
                <div class="space-y-4 relative z-10">
                    <div v-if="!data.focus_sessions || data.focus_sessions.length === 0" class="text-navy-200 text-sm font-medium italic mt-4">
                        No sessions planned for today.
                    </div>
                    <!-- Dynamic Items -->
                    <div v-for="(session, index) in data.focus_sessions" :key="index" class="flex items-start gap-4">
                        <div class="flex flex-col items-center pt-1 w-12 shrink-0">
                            <span class="text-xs font-black" :class="session.status === 'completed' ? 'text-navy-300' : 'text-white'">
                                {{ session.time.substring(0, 5) }}
                            </span>
                        </div>
                        <div class="flex-1 border-l-4 rounded-xl p-4 transition-all backdrop-blur-sm"
                             :class="session.status === 'completed' ? 'bg-white/5 border-brand-400/50 hover:bg-white/10' : 'bg-white/10 border-brand-400 hover:bg-white/20'">
                            <div class="flex justify-between items-start mb-2">
                                <div>
                                    <h4 class="text-sm font-black" :class="session.status === 'completed' ? 'text-navy-200 line-through opacity-70' : 'text-white'">{{ session.title }}</h4>
                                    <p class="text-xs font-medium" :class="session.status === 'completed' ? 'text-navy-300/70' : 'text-navy-200'">{{ session.duration }}</p>
                                </div>
                                <span class="text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm"
                                      :class="session.status === 'completed' ? 'bg-brand-500/50 text-brand-100' : 'bg-brand-500 text-white'">
                                    {{ session.status }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Decorative Background -->
                <div class="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl group-hover:bg-brand-500/30 transition-colors duration-700 pointer-events-none"></div>
            </div>

            <!-- Recent Notes Grid -->
            <div>
                <div class="flex items-center justify-between mb-4 px-1">
                    <h3 class="text-base font-black text-navy-900 dark:text-text-primary">Recent Notes</h3>
                    <Link :href="route('notes')" class="text-xs font-black text-brand-500 hover:text-brand-400 uppercase tracking-widest transition-colors">View All</Link>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <template v-if="recentNotes.length > 0">
                        <Link v-for="note in recentNotes" :key="note.id" :href="route('notes')" class="bg-white dark:bg-dark-panel border border-[#D9E2EC] dark:border-dark-border p-5 rounded-[20px] shadow-sm hover:shadow-md hover:border-brand-200 dark:hover:border-brand-500/30 transition-all cursor-pointer group">
                            <div class="w-10 h-10 bg-brand-50 dark:bg-brand-500/10 text-brand-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                            </div>
                            <h4 class="text-sm font-black text-navy-900 dark:text-text-primary mb-1">{{ note.title || 'Untitled Note' }}</h4>
                            <p class="text-xs text-navy-500 dark:text-text-muted font-medium line-clamp-2">{{ note.content_text || 'Empty note...' }}</p>
                        </Link>
                    </template>
                    <div v-else class="col-span-2 text-center py-6 text-navy-400 dark:text-text-faint text-sm font-bold bg-white dark:bg-dark-panel border border-[#D9E2EC] dark:border-dark-border border-dashed rounded-[20px]">
                        No recent notes found.
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Column: Stats, Targets, Actions & Quote -->
        <div class="col-span-12 xl:col-span-5 flex flex-col gap-6">
            
            <!-- This Week's Targets -->
            <div class="bg-white dark:bg-dark-panel p-6 rounded-[24px] border border-[#D9E2EC] dark:border-dark-border shadow-sm">
                <h3 class="text-lg font-black text-navy-900 dark:text-text-primary mb-6">This Week's Targets</h3>
                <div v-if="weeklyTargets.length === 0" class="text-navy-500 dark:text-text-muted font-medium text-sm py-4">
                    No active targets for this week.
                </div>
                <div v-else class="space-y-5">
                    <div v-for="target in weeklyTargets" :key="target.id">
                        <div class="flex justify-between items-end mb-2">
                            <span class="text-xs font-bold text-navy-900 dark:text-text-primary truncate pr-2">{{ target.title }}</span>
                            <span class="text-[10px] font-black" :class="target.progress >= 100 ? 'text-emerald-500' : 'text-brand-500'">{{ target.progress || 0 }}%</span>
                        </div>
                        <div class="w-full bg-[#E8EDF2] dark:bg-dark-border rounded-full h-2 overflow-hidden">
                            <div class="h-full rounded-full transition-all duration-500" :class="target.progress >= 100 ? 'bg-emerald-500' : 'bg-brand-500'" :style="{ width: `${target.progress || 0}%` }"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Actions -->
            <div>
                <p class="text-[10px] font-black text-navy-400 dark:text-text-faint uppercase tracking-widest mb-3 px-2">Quick Actions</p>
                <div class="space-y-3">
                    <Link :href="route('notes')" class="w-full bg-white dark:bg-dark-surface border border-[#D9E2EC] dark:border-dark-border hover:border-brand-200 dark:hover:border-brand-500/30 rounded-[16px] p-4 flex items-center justify-between group transition-all shadow-sm">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                            </div>
                            <span class="text-sm font-bold text-navy-700 dark:text-text-primary group-hover:text-brand-500 dark:group-hover:text-brand-400">New Note</span>
                        </div>
                        <svg class="w-4 h-4 text-navy-300 dark:text-text-faint group-hover:text-brand-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    </Link>
                    <Link :href="route('planner')" class="w-full bg-white dark:bg-dark-surface border border-[#D9E2EC] dark:border-dark-border hover:border-brand-200 dark:hover:border-brand-500/30 rounded-[16px] p-4 flex items-center justify-between group transition-all shadow-sm">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                            </div>
                            <span class="text-sm font-bold text-navy-700 dark:text-text-primary group-hover:text-brand-500 dark:group-hover:text-brand-400">Plan Session</span>
                        </div>
                        <svg class="w-4 h-4 text-navy-300 dark:text-text-faint group-hover:text-brand-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    </Link>
                </div>
            </div>

            <!-- Quote Card -->
            <div class="bg-gradient-to-br from-brand-600 to-brand-800 p-6 rounded-[24px] mt-2 relative overflow-hidden group shadow-lg shadow-brand-900/20">
                <svg class="absolute top-3 left-4 w-8 h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                <p class="text-sm font-bold text-white italic leading-relaxed relative z-10 pt-4">
                    {{ currentQuote.text }}
                </p>
                <p class="text-[10px] font-black text-brand-200 uppercase tracking-widest mt-4 relative z-10">— {{ currentQuote.author }}</p>
            </div>

        </div>
    </div>

    <!-- Toast Notification -->
    <Transition name="fade">
        <div v-if="showToast" class="fixed bottom-8 right-8 z-[150] bg-white dark:bg-dark-panel border border-[#D9E2EC] dark:border-dark-border shadow-xl p-4 rounded-xl flex items-center gap-4">
            <div class="w-10 h-10 bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center rounded-xl text-xl">
                🔔
            </div>
            <div>
                <p class="text-[10px] font-black text-brand-500 uppercase tracking-widest">Incoming Ping</p>
                <p class="text-sm font-bold text-navy-900 dark:text-text-primary">{{ toastMessage }}</p>
            </div>
        </div>
    </Transition>

  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Link, usePage, router } from '@inertiajs/vue3'
import DashboardLayout from '@/Layouts/DashboardLayout.vue'
import { dashboardApi, plannerApi, targetsApi, setWorkspaceToken } from '@/services/workspaceApi'
import { notesApi, setAuthToken as setNotesToken } from '@/services/notesApi'
import axios from 'axios'

const page = usePage()
const data = ref({})
const recentSessions = ref([])
const recentNotes = ref([])
const weeklyTargets = ref([])
const isLoading = ref(true)

const userName = computed(() => page.props.auth?.user?.name || 'User')

const quotes = [
  { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
  { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
  { text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.", author: "Dr. Seuss" },
  { text: "Anyone who stops learning is old, whether at twenty or eighty.", author: "Henry Ford" },
  { text: "Change is the end result of all true learning.", author: "Leo Buscaglia" },
  { text: "Wisdom is not a product of schooling but of the lifelong attempt to acquire it.", author: "Albert Einstein" },
  { text: "A mind that is stretched by a new experience can never go back to its old dimensions.", author: "Oliver Wendell Holmes" },
  { text: "Learning is a treasure that will follow its owner everywhere.", author: "Chinese Proverb" }
]

const currentQuote = computed(() => {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  return quotes[dayOfYear % quotes.length];
})

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
})

const metrics = computed(() => [
  { label: 'Focus Sessions', value: data.value.focus_sessions || 0, icon: '🎯', bg: 'bg-indigo-50 text-indigo-600' },
  { label: 'Task Efficiency', value: Math.round(data.value.task_efficiency || 0) + '%', icon: '⚡', bg: 'bg-emerald-50 text-emerald-600' },
  { label: 'Deep Work Hours', value: (data.value.deep_work_hours || 0).toFixed(1) + 'h', icon: '🔋', bg: 'bg-violet-50 text-violet-600' },
  { label: 'Consistency', value: Math.round(data.value.consistency || 0) + '%', icon: '📈', bg: 'bg-amber-50 text-amber-600' },
  { label: 'Learning Continuity', value: Math.round(data.value.learning_continuity || 0) + '%', icon: '🧠', bg: 'bg-rose-50 text-rose-600' },
])

const weeklyStats = computed(() => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const today = new Date()
  const todayDay = today.getDay()
  const monday = new Date(today)
  monday.setDate(today.getDate() - (todayDay === 0 ? 6 : todayDay - 1))

  return days.map((name, i) => {
    const d = new Date(monday)
    d.setDate(d.getDate() + i)
    const dateStr = d.toISOString().split('T')[0]
    const count = (data.value.weekly_focus_map && data.value.weekly_focus_map[dateStr]) || 0
    const maxCount = Math.max(...Object.values(data.value.weekly_focus_map || { x: 1 }), 1)
    return {
      day: name.toUpperCase().substring(0, 3),
      count,
      value: Math.round((count / maxCount) * 100),
      isToday: dateStr === today.toISOString().split('T')[0]
    }
  })
})

const insightMessage = computed(() => {
  const fs = data.value.focus_sessions || 0
  const te = data.value.task_efficiency || 0
  if (fs === 0 && te === 0) return 'Start with one study session, one weekly target, and one reflection note.'
  if (fs < 2) return 'Create at least 2 focused study sessions this week to build consistency.'
  return `Great momentum! You've completed ${fs} sessions with ${Math.round(te)}% task efficiency.`
})

const showToast = ref(false)
const toastMessage = ref('')

const sendPing = () => {
    console.log("Sending ping...");
    axios.post('/ping', { message: 'Hello from ' + userName.value })
        .then(response => {
            console.log('Ping status:', response.data)
        })
        .catch(err => {
            console.error('Error sending ping:', err)
            alert('Failed to send ping. Check console.')
        })
}

onMounted(async () => {
  setWorkspaceToken(page.props.go_token)
  setNotesToken(page.props.go_token)
  try {
    data.value = await dashboardApi.getMetrics()
    recentSessions.value = data.value.recent_sessions || []
    
    const localDate = new Date()
    const todayStr = localDate.getFullYear() + '-' + String(localDate.getMonth() + 1).padStart(2, '0') + '-' + String(localDate.getDate()).padStart(2, '0')

    // Format today's sessions from planner
    const todaySessions = recentSessions.value.filter(s => {
        const d = s.date ? s.date.split('T')[0].split(' ')[0] : ''
        return d === todayStr
    }).map(s => ({
        title: s.title,
        time: s.start_time || '00:00',
        duration: `${s.duration_minutes || 60}m`,
        status: s.status || 'planned'
    }))
    
    data.value.focus_sessions = todaySessions
    
    // Fetch Recent Notes
    try {
      const allNotes = await notesApi.getNotes()
      recentNotes.value = allNotes.slice(0, 2)
    } catch (err) {
      console.error('Failed to fetch recent notes:', err)
    }

    // Fetch Weekly Targets
    try {
      const tRes = await targetsApi.getTargets()
      weeklyTargets.value = (tRes.data || []).slice(0, 3)
    } catch (err) {
      console.error('Failed to fetch weekly targets:', err)
    }
    // Fetch Google Events and sync with Daily Overview
    try {
      const gStatus = await plannerApi.getGoogleStatus()
      if (gStatus?.connected) {
        const gEvents = await plannerApi.getGoogleEvents() || []
        
        // Filter for today
        const localDate = new Date()
        const todayStr = localDate.getFullYear() + '-' + String(localDate.getMonth() + 1).padStart(2, '0') + '-' + String(localDate.getDate()).padStart(2, '0')

        const todayGoogleEvents = gEvents.filter(e => {
            const eDate = e.date?.split('T')[0]?.split(' ')[0]
            return eDate === todayStr
        })
        
        // Deduplicate based on title and time
        const localTitlesAndTimes = (data.value.focus_sessions || []).map(s => s.title + s.time)
        const uniqueGoogleEvents = todayGoogleEvents.filter(ge => {
             return !localTitlesAndTimes.includes(ge.title + ge.start_time)
        })

        const formattedGoogle = uniqueGoogleEvents.map(ge => {
            const [startH, startM] = (ge.start_time || '00:00').split(':').map(Number)
            const [endH, endM] = (ge.end_time || '01:00').split(':').map(Number)
            const dur = (endH * 60 + endM) - (startH * 60 + startM)
            return {
                title: ge.title,
                time: ge.start_time,
                duration: `${dur > 0 ? dur : 60}m`,
                status: 'planned'
            }
        })

        if (!data.value.focus_sessions) {
            data.value.focus_sessions = []
        }
        data.value.focus_sessions = [...data.value.focus_sessions, ...formattedGoogle]
        data.value.focus_sessions.sort((a, b) => a.time.localeCompare(b.time))
      }
    } catch (e) {
      console.log('Failed to fetch google events for dashboard', e)
    }

  } catch (err) {
    console.error('Failed to load dashboard', err)
  } finally {
    isLoading.value = false
  }

  // Listen for Reverb GlobalPingEvent
  if (window.Echo) {
      window.Echo.channel('public-ping')
          .listen('GlobalPingEvent', (e) => {
              console.log('Received ping from Reverb:', e)
              toastMessage.value = `${e.message} (${e.time})`
              showToast.value = true
              setTimeout(() => { showToast.value = false }, 4000)
          })
  }
})
</script>
