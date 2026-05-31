<template>
  <DashboardLayout :showBuddy="false">
    <div class="max-w-6xl mx-auto pb-12">
      <!-- Header -->
      <div class="mb-10">
        <h1 class="text-3xl font-black text-slate-900 mb-2 tracking-tight">Settings & Profile</h1>
        <p class="text-slate-500 font-medium text-sm">Manage your intelligent workspace and learning preferences.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Left Column: User Profile Card & Membership -->
        <div class="lg:col-span-4 space-y-6">
          
          <!-- User Profile Card -->
          <div class="bg-white rounded-[24px] shadow-sm border border-slate-200 overflow-hidden relative">
            <div class="p-8 relative z-10 flex flex-col items-center text-center">
              <div class="w-24 h-24 rounded-full overflow-hidden shadow-lg shadow-indigo-100 p-1 bg-gradient-to-tr from-indigo-500 to-emerald-400 mb-4">
                  <img :src="profileForm.avatar" alt="Profile" class="w-full h-full object-cover rounded-full border-4 border-white">
              </div>
              <h3 class="text-xl font-black text-slate-900">{{ profileForm.name }}</h3>
              <p class="text-sm font-medium text-slate-500 mt-1 mb-6">{{ profileForm.role }}</p>
              
              <div class="w-full pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
                <div class="text-center">
                  <p class="text-2xl font-black text-slate-900">124</p>
                  <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Sessions</p>
                </div>
                <div class="text-center">
                  <p class="text-2xl font-black text-slate-900">92%</p>
                  <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Focus Rate</p>
                </div>
              </div>
              
              <button @click="showEditProfileModal = true" class="mt-8 w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-indigo-600 transition-colors shadow-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
              </button>
            </div>
            <div class="absolute -right-12 -bottom-12 w-48 h-48 bg-indigo-50 rounded-full blur-3xl z-0"></div>
          </div>

          <!-- Membership Status -->
          <div class="bg-slate-900 rounded-[24px] p-6 shadow-xl relative overflow-hidden">
            <div class="relative z-10">
              <span class="px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest mb-4 inline-block border border-white/10 backdrop-blur-md">Current Plan</span>
              <h4 class="text-xl font-black text-white mb-2">Lumora Pro Alpha</h4>
              <p class="text-slate-400 text-xs font-medium mb-6">Your subscription renews on Jan 12, 2025.</p>
              <button class="w-full py-3 bg-white text-slate-900 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors">Manage Billing</button>
            </div>
            <div class="absolute -right-8 -top-8 w-32 h-32 bg-indigo-500/30 rounded-full blur-2xl"></div>
          </div>
          
        </div>

        <!-- Right Column: Settings Sections -->
        <div class="lg:col-span-8 space-y-6">
          <!-- (AI Personalization and Learning Preferences have been removed) -->

          <!-- Theme & UI Section -->
          <div class="bg-white rounded-[24px] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
            <div class="flex items-start gap-4 mb-8">
              <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
              </div>
              <div>
                <h3 class="text-lg font-black text-slate-900">Theme Preferences</h3>
                <p class="text-sm font-medium text-slate-500 mt-1">Visual appearance of your Intelligent Sanctuary.</p>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Luminous Day -->
              <button @click="setTheme('light')" class="p-1 rounded-[20px] border-2 transition-all shadow-sm" :class="currentTheme === 'light' ? 'border-indigo-500 shadow-indigo-100' : 'border-transparent hover:border-slate-200'">
                <div class="bg-slate-50 rounded-[14px] p-4 flex flex-col items-center gap-3">
                  <div class="w-full h-16 bg-white rounded-lg border border-slate-200 shadow-sm"></div>
                  <span class="text-sm font-bold text-slate-900">Luminous Day</span>
                </div>
              </button>
              
              <!-- Deep Indigo -->
              <button @click="setTheme('dark')" class="p-1 rounded-[20px] border-2 transition-all" :class="currentTheme === 'dark' ? 'border-indigo-500 shadow-indigo-100' : 'border-transparent hover:border-indigo-100'">
                <div class="bg-indigo-900 rounded-[14px] p-4 flex flex-col items-center gap-3">
                  <div class="w-full h-16 bg-indigo-800 rounded-lg border border-indigo-700 shadow-sm"></div>
                  <span class="text-sm font-bold text-indigo-50">Deep Indigo</span>
                </div>
              </button>
            </div>
          </div>

          <!-- Google Integration Section -->
          <div class="bg-white rounded-[24px] p-8 border border-slate-200 shadow-sm relative overflow-hidden mt-6">
            <div class="flex items-start gap-4 mb-8">
              <div class="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" alt="Google Calendar" class="w-6 h-6">
              </div>
              <div>
                <h3 class="text-lg font-black text-slate-900">Google Integrations</h3>
                <p class="text-sm font-medium text-slate-500 mt-1">Connect Lumora with your Google ecosystem.</p>
              </div>
            </div>
            
            <div class="space-y-4">
              <div class="flex items-center justify-between p-5 bg-slate-50 rounded-[16px] border border-slate-100">
                <div>
                  <h4 class="text-sm font-bold text-slate-900">Google Calendar</h4>
                  <p class="text-xs font-medium text-slate-500 mt-1">Sync your Lumora study sessions with Google Calendar.</p>
                </div>
                <button v-if="googleConnected" @click="disconnectGoogle" class="px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg text-xs font-bold transition-colors border border-rose-200 flex shrink-0 items-center gap-2">
                  Disconnect
                </button>
                <div v-else class="px-4 py-2 bg-slate-200 text-slate-500 rounded-lg text-xs font-bold shrink-0">
                  Not Connected
                </div>
              </div>
            </div>
          </div>
          

        </div>
      </div>
    </div>

    <!-- Disconnect Google Calendar Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showDisconnectModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-[#0B1120]/80 backdrop-blur-md" @click="showDisconnectModal = false"></div>
          
          <div class="bg-gradient-to-b from-[#1E1B4B] to-[#0B1120] rounded-[2rem] w-full max-w-md relative z-10 shadow-2xl shadow-indigo-900/50 overflow-hidden border border-indigo-500/20 animate-slide-up">
            
            <!-- Decorative Blobs -->
            <div class="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/30 blur-[50px] rounded-full pointer-events-none"></div>
            <div class="absolute -bottom-24 -left-24 w-48 h-48 bg-rose-500/20 blur-[50px] rounded-full pointer-events-none"></div>

            <div class="p-10 text-center relative z-20">
              <div class="relative w-20 h-20 mx-auto mb-8 group">
                <div class="absolute inset-0 bg-gradient-to-tr from-rose-500 to-orange-500 rounded-2xl rotate-3 group-hover:rotate-12 transition-transform duration-300"></div>
                <div class="absolute inset-0 bg-white rounded-2xl flex items-center justify-center -rotate-3 group-hover:-rotate-12 transition-transform duration-300">
                    <svg class="w-10 h-10 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 12l4 4m0-4l-4 4" />
                    </svg>
                </div>
              </div>
              
              <h3 class="text-2xl font-black text-white mb-3 tracking-tight">Disconnect Calendar?</h3>
              <p class="text-sm font-medium text-indigo-200/80 leading-relaxed">
                Your events will no longer sync with Google Calendar.
              </p>
            </div>

            <div class="p-6 bg-white/5 backdrop-blur-sm border-t border-white/10 flex gap-4 relative z-20">
              <button @click="showDisconnectModal = false" class="flex-1 py-3.5 px-4 rounded-xl text-sm font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10">
                Cancel
              </button>
              <button @click="confirmDisconnect" class="flex-1 py-3.5 px-4 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white rounded-xl text-sm font-black shadow-lg shadow-rose-900/50 hover:shadow-rose-900/80 hover:-translate-y-0.5 transition-all">
                Disconnect
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Edit Profile Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showEditProfileModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-[#0B1120]/80 backdrop-blur-md" @click="showEditProfileModal = false"></div>
          
          <div class="bg-white rounded-[2rem] w-full max-w-md relative z-10 shadow-2xl overflow-hidden border border-slate-200 animate-slide-up">
            <div class="p-8">
              <h3 class="text-2xl font-black text-[#1E1B4B] mb-2 tracking-tight">Edit Profile</h3>
              <p class="text-sm font-medium text-slate-500 mb-6">Update your personal information below.</p>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Display Name</label>
                  <input v-model="profileForm.name" type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold text-slate-900 focus:border-[#3D3ACE] outline-none transition-all shadow-sm">
                </div>
                <div>
                  <label class="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Academic Role</label>
                  <input v-model="profileForm.role" type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold text-slate-900 focus:border-[#3D3ACE] outline-none transition-all shadow-sm">
                </div>
                <div>
                  <label class="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Profile Picture (URL)</label>
                  <input v-model="profileForm.avatar" type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold text-slate-900 focus:border-[#3D3ACE] outline-none transition-all shadow-sm">
                </div>
              </div>

              <div class="mt-8 flex gap-3">
                <button @click="showEditProfileModal = false" class="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors">
                  Cancel
                </button>
                <button @click="saveProfile" class="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-black shadow-lg shadow-indigo-200 transition-colors flex justify-center items-center">
                  <span v-if="isSavingProfile">Saving...</span>
                  <span v-else>Save Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePage } from '@inertiajs/vue3'
import DashboardLayout from '@/Layouts/DashboardLayout.vue'
import { plannerApi } from '@/services/workspaceApi'

const page = usePage()
const user = page.props.auth?.user || { name: 'User', email: 'user@example.com' }

const activeTab = ref('profile')
const isSaving = ref(false)
const googleConnected = ref(false)
const showDisconnectModal = ref(false)
const showEditProfileModal = ref(false)
const isSavingProfile = ref(false)

const currentTheme = ref(localStorage.getItem('lumora_theme') === 'light' ? 'light' : 'dark')

const profileForm = ref({
  name: user.name,
  role: 'Graduate Student • Cognitive Science',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200'
})

function setTheme(theme) {
  currentTheme.value = theme
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
    localStorage.setItem('lumora_theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('lumora_theme', 'light')
  }
}

function saveProfile() {
  isSavingProfile.value = true
  setTimeout(() => {
    isSavingProfile.value = false
    showEditProfileModal.value = false
  }, 800)
}

onMounted(async () => {
  try {
    const res = await plannerApi.getGoogleStatus()
    googleConnected.value = res?.connected || false
  } catch (e) {
    console.error('Could not check Google status', e)
  }
})

function disconnectGoogle() {
  showDisconnectModal.value = true
}

async function confirmDisconnect() {
  showDisconnectModal.value = false
  try {
    await plannerApi.disconnectGoogle()
    googleConnected.value = false
    // You could replace this alert with a toast if you have a toast component in Settings
  } catch (e) {
    console.error('Failed to disconnect Google Calendar.')
  }
}

const tabs = [
  { id: 'profile', label: 'Profile Settings' },
  { id: 'preferences', label: 'Learning Preferences' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'privacy', label: 'Privacy & Data' }
]

const form = ref({
  name: user.name,
  email: user.email,
  duration: 45,
  dimension: 'planning',
  notifications: {
    study: { label: 'Study Reminders', desc: 'Get notified when a planned session is about to start.', active: true },
    target: { label: 'Target Alerts', desc: 'Weekly target completion reminders.', active: true },
    reflection: { label: 'Reflection Prompts', desc: 'Reminders to write notes after sessions.', active: false },
    ai: { label: 'AI Insights', desc: 'Notify when new personalized strategy is ready.', active: true }
  }
})

function saveSettings() {
  isSaving.value = true
  setTimeout(() => {
    isSaving.value = false
  }, 1000)
}
</script>
