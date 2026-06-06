<template>
  <DashboardLayout :showBuddy="false">
    <div class="max-w-6xl mx-auto pb-12">
      <!-- Header -->
      <div class="mb-10">
        <h1 class="text-3xl font-black text-navy-900 dark:text-text-primary mb-2 tracking-tight">Settings</h1>
        <p class="text-navy-500 dark:text-text-muted font-medium text-sm">Manage your intelligent workspace and learning preferences.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Left Column: User Profile Card & Membership -->
        <div class="lg:col-span-4 space-y-6">
          
          <!-- User Profile Card -->
          <div class="bg-white dark:bg-dark-panel rounded-[24px] shadow-sm border border-[#D9E2EC] dark:border-dark-border overflow-hidden relative">
            <div class="p-8 relative z-10 flex flex-col items-center text-center">
              <div class="w-24 h-24 rounded-full overflow-hidden shadow-lg shadow-brand-500/20 p-1 bg-gradient-to-tr from-brand-500 to-emerald-400 mb-4">
                  <img v-if="profileForm.avatar" :src="profileForm.avatar" alt="Profile" class="w-full h-full object-cover rounded-full border-4 border-white dark:border-dark-panel">
                  <div v-else class="w-full h-full rounded-full border-4 border-white dark:border-dark-panel bg-white dark:bg-dark-surface flex items-center justify-center text-brand-500">
                    <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                  </div>
              </div>
              <h3 class="text-xl font-black text-navy-900 dark:text-text-primary">{{ profileForm.name }}</h3>
              <p class="text-sm font-medium text-navy-500 dark:text-text-muted mt-1 mb-6">{{ profileForm.role }}</p>
              
              <div class="w-full pt-6 border-t border-[#D9E2EC] dark:border-dark-border grid grid-cols-2 gap-4">
                <div class="text-center">
                  <p class="text-2xl font-black text-navy-900 dark:text-text-primary">124</p>
                  <p class="text-[10px] font-black text-navy-400 dark:text-text-faint uppercase tracking-widest mt-1">Sessions</p>
                </div>
                <div class="text-center">
                  <p class="text-2xl font-black text-navy-900 dark:text-text-primary">92%</p>
                  <p class="text-[10px] font-black text-navy-400 dark:text-text-faint uppercase tracking-widest mt-1">Focus Rate</p>
                </div>
              </div>
              
              <button @click="showEditProfileModal = true" class="mt-8 w-12 h-12 rounded-full bg-navy-900 dark:bg-brand-500 text-white flex items-center justify-center hover:bg-brand-500 dark:hover:bg-brand-400 transition-colors shadow-glow">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
              </button>
            </div>
            <div class="absolute -right-12 -bottom-12 w-48 h-48 bg-brand-500/10 dark:bg-brand-500/5 rounded-full blur-3xl z-0"></div>
          </div>

          <!-- Membership Status Removed as requested -->
        </div>
        <!-- Right Column: Settings Sections -->
        <div class="lg:col-span-8 space-y-6">
          <!-- (AI Personalization and Learning Preferences have been removed) -->

          <!-- Theme & UI Section -->
          <div class="bg-white dark:bg-dark-panel rounded-[24px] p-8 border border-[#D9E2EC] dark:border-dark-border shadow-sm relative overflow-hidden">
            <div class="flex items-start gap-4 mb-8">
              <div class="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-500 flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
              </div>
              <div>
                <h3 class="text-lg font-black text-navy-900 dark:text-text-primary">Theme Preferences</h3>
                <p class="text-sm font-medium text-navy-500 dark:text-text-muted mt-1">Visual appearance of your Intelligent Sanctuary.</p>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Luminous Day -->
              <button @click="setTheme('light')" class="p-1 rounded-[20px] border-2 transition-all shadow-sm" :class="currentTheme === 'light' ? 'border-brand-500 shadow-glow' : 'border-transparent hover:border-[#D9E2EC] dark:hover:border-dark-border'">
                <div class="bg-[#FAFAF9] rounded-[14px] p-4 flex flex-col items-center gap-3 border border-[#D9E2EC]">
                  <div class="w-full h-16 rounded-lg border border-[#D9E2EC] shadow-sm" style="background-color: #ffffff;"></div>
                  <span class="text-sm font-bold text-navy-900">Premium Light</span>
                </div>
              </button>
              
              <!-- Premium Dark -->
              <button @click="setTheme('dark')" class="p-1 rounded-[20px] border-2 transition-all" :class="currentTheme === 'dark' ? 'border-brand-500 shadow-glow' : 'border-transparent hover:border-brand-200 dark:hover:border-brand-500/30'">
                <div class="bg-dark-bg rounded-[14px] p-4 flex flex-col items-center gap-3 border border-dark-border">
                  <div class="w-full h-16 bg-dark-panel rounded-lg border border-dark-border shadow-sm"></div>
                  <span class="text-sm font-bold text-white">Premium Dark</span>
                </div>
              </button>
            </div>
          </div>

          <!-- Google Integration Section -->
          <div class="bg-white dark:bg-dark-panel rounded-[24px] p-8 border border-[#D9E2EC] dark:border-dark-border shadow-sm relative overflow-hidden mt-6">
            <div class="flex items-start gap-4 mb-8">
              <div class="w-12 h-12 rounded-xl bg-white border border-[#D9E2EC] flex items-center justify-center flex-shrink-0 shadow-sm">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" alt="Google Calendar" class="w-6 h-6">
              </div>
              <div>
                <h3 class="text-lg font-black text-navy-900 dark:text-text-primary">Google Integrations</h3>
                <p class="text-sm font-medium text-navy-500 dark:text-text-muted mt-1">Connect Lumora with your Google ecosystem.</p>
              </div>
            </div>
            
            <div class="space-y-4">
              <div class="flex items-center justify-between p-5 bg-[#FAFAF9] dark:bg-dark-surface rounded-[16px] border border-[#D9E2EC] dark:border-dark-border">
                <div>
                  <h4 class="text-sm font-bold text-navy-900 dark:text-text-primary">Google Calendar</h4>
                  <p class="text-xs font-medium text-navy-500 dark:text-text-muted mt-1">Sync your Lumora study sessions with Google Calendar.</p>
                </div>
                <button v-if="googleConnected" @click="disconnectGoogle" class="px-4 py-2 bg-rose-50 dark:bg-rose-500/10 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-500/20 rounded-lg text-xs font-bold transition-colors border border-rose-200 dark:border-rose-500/20 flex shrink-0 items-center gap-2">
                  Disconnect
                </button>
                <div v-else class="px-4 py-2 bg-[#E8EDF2] dark:bg-dark-border text-navy-500 dark:text-text-muted rounded-lg text-xs font-bold shrink-0">
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
          <div class="absolute inset-0 bg-[#0B1120]/80 dark:bg-black/80 backdrop-blur-md" @click="showDisconnectModal = false"></div>
          
          <div class="bg-white dark:bg-dark-panel border border-[#D9E2EC] dark:border-dark-border rounded-[32px] p-8 w-full max-w-md relative z-10 shadow-2xl animate-scale-up text-center">
            
            <div class="w-20 h-20 bg-rose-50 dark:bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-rose-100 dark:border-rose-500/20">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" alt="Google Calendar" class="w-10 h-10">
            </div>
            
            <h3 class="text-2xl font-black text-navy-900 dark:text-text-primary mb-3">Disconnect Calendar?</h3>
            <p class="text-navy-500 dark:text-text-muted text-sm font-medium mb-8 leading-relaxed">
              Your future study sessions will no longer automatically sync to your Google Calendar.
            </p>

            <div class="flex items-center gap-4">
              <button @click="showDisconnectModal = false" class="flex-1 py-3.5 px-4 rounded-xl text-sm font-bold text-navy-500 dark:text-text-muted hover:text-navy-900 dark:hover:text-text-primary hover:bg-[#E8EDF2] dark:hover:bg-white/5 transition-all border border-transparent">
                Cancel
              </button>
              <button @click="confirmDisconnect" class="flex-1 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-rose-500 hover:bg-rose-600 transition-all shadow-md shadow-rose-500/20 hover:shadow-rose-500/30">
                Yes, Disconnect
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
          <div class="absolute inset-0 bg-[#0B1120]/80 dark:bg-black/80 backdrop-blur-md" @click="showEditProfileModal = false"></div>
          
          <div class="bg-white dark:bg-dark-panel rounded-[2rem] w-full max-w-md relative z-10 shadow-2xl overflow-hidden border border-[#D9E2EC] dark:border-dark-border animate-slide-up flex flex-col">
            <div class="p-8 pb-6">
              <h3 class="text-2xl font-black text-navy-900 dark:text-text-primary mb-2 tracking-tight">Edit Profile</h3>
              <p class="text-sm font-medium text-navy-500 dark:text-text-muted mb-6">Update your personal information below.</p>
              
              <div class="space-y-6">
                <!-- Avatar Preview -->
                <div class="flex flex-col items-center">
                  <div class="relative w-24 h-24 mb-3 group">
                    <img v-if="profileForm.avatar" :src="profileForm.avatar" class="w-full h-full object-cover rounded-full border-4 border-[#E8EDF2] dark:border-dark-border shadow-sm" />
                    <div v-else class="w-full h-full rounded-full border-4 border-[#E8EDF2] dark:border-dark-border bg-[#FAFAF9] dark:bg-dark-surface flex items-center justify-center text-navy-400 dark:text-text-faint">
                      <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                    </div>
                    <!-- delete button -->
                    <button v-if="profileForm.avatar" @click="profileForm.avatar = null" class="absolute -top-1 -right-1 bg-white dark:bg-dark-panel text-rose-500 rounded-full p-1.5 shadow-md border border-[#D9E2EC] dark:border-dark-border hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors" title="Remove picture">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                  </div>
                  <label class="cursor-pointer text-[11px] font-black text-brand-500 hover:text-brand-600 uppercase tracking-widest transition-colors">
                    Upload New Picture
                    <input type="file" accept="image/*" @change="handleAvatarUpload" class="hidden">
                  </label>
                </div>

                <div class="space-y-4">
                  <div>
                    <label class="block text-[11px] font-black text-navy-400 dark:text-text-faint uppercase tracking-widest mb-2">Display Name</label>
                    <input v-model="profileForm.name" type="text" class="w-full bg-[#FAFAF9] dark:bg-dark-surface border border-[#D9E2EC] dark:border-dark-border rounded-xl py-3 px-4 text-sm font-bold text-navy-900 dark:text-text-primary focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all shadow-sm">
                  </div>
                  <div>
                    <label class="block text-[11px] font-black text-navy-400 dark:text-text-faint uppercase tracking-widest mb-2">Academic Role</label>
                    <input v-model="profileForm.role" type="text" class="w-full bg-[#FAFAF9] dark:bg-dark-surface border border-[#D9E2EC] dark:border-dark-border rounded-xl py-3 px-4 text-sm font-bold text-navy-900 dark:text-text-primary focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all shadow-sm">
                  </div>
                </div>
              </div>
            </div>

            <!-- Modal Footer -->
            <div class="p-6 bg-[#FAFAF9] dark:bg-black/20 border-t border-[#D9E2EC] dark:border-dark-border flex gap-4 relative z-20">
              <button @click="showEditProfileModal = false" class="flex-1 py-3.5 px-4 rounded-xl text-sm font-bold text-navy-500 dark:text-text-muted hover:text-navy-900 dark:hover:text-text-primary hover:bg-[#E8EDF2] dark:hover:bg-white/5 transition-all border border-transparent">
                Cancel
              </button>
              <button @click="saveProfile" class="flex-1 py-3.5 px-4 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-sm font-black shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40 hover:-translate-y-0.5 transition-all flex justify-center items-center">
                <span v-if="isSavingProfile">Saving...</span>
                <span v-else>Save Profile</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePage, router } from '@inertiajs/vue3'
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

const savedAvatar = localStorage.getItem('lumora_avatar')
const profileForm = ref({
  name: user.name,
  role: 'Graduate Student • Cognitive Science',
  avatar: savedAvatar === 'none' ? null : (savedAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200')
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

function handleAvatarUpload(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const targetSize = 256;
        canvas.width = targetSize;
        canvas.height = targetSize;
        const ctx = canvas.getContext('2d');

        // Draw white background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, targetSize, targetSize);

        // Center crop calculation
        const size = Math.min(img.width, img.height);
        const startX = (img.width - size) / 2;
        const startY = (img.height - size) / 2;

        ctx.drawImage(img, startX, startY, size, size, 0, 0, targetSize, targetSize);
        profileForm.value.avatar = canvas.toDataURL('image/jpeg', 0.85);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function saveProfile() {
  if (!profileForm.value.name.trim()) return;
  
  isSavingProfile.value = true
  
  // Save avatar to local storage first
  localStorage.setItem('lumora_avatar', profileForm.value.avatar ? profileForm.value.avatar : 'none')
  window.dispatchEvent(new Event('avatar-updated'))
  
  // Update name in backend via Inertia
  router.patch(route('dashboard.profile.update'), {
    name: profileForm.value.name
  }, {
    preserveScroll: true,
    onSuccess: () => {
      isSavingProfile.value = false
      showEditProfileModal.value = false
    },
    onError: () => {
      isSavingProfile.value = false
      alert('Failed to update profile name. Please try again.')
    }
  })
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
