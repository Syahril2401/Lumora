<template>
  <div class="h-screen bg-[#FDFDFF] dark:bg-dark-bg font-sans text-slate-900 dark:text-text-primary flex overflow-hidden">
    
    <!-- Mobile Sidebar Overlay -->
    <div v-if="isSidebarOpen" class="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm" @click="isSidebarOpen = false"></div>

    <!-- Left Sidebar -->
    <aside class="fixed lg:static inset-y-0 left-0 bg-[#F8FAFC] dark:bg-dark-panel border-[#D9E2EC] dark:border-dark-border flex flex-col z-50 shadow-2xl lg:shadow-xl transition-all duration-300 transform"
           :class="isSidebarOpen ? 'translate-x-0 w-72 border-r' : '-translate-x-full w-72 lg:-translate-x-0 lg:w-0 lg:border-transparent lg:opacity-0 lg:overflow-hidden'">
      
      <div class="p-6 pb-6 flex items-center transition-all" :class="isSidebarOpen ? 'justify-between' : 'justify-center flex-col gap-4'">
        <div class="flex items-center gap-3 overflow-hidden">
          <div class="bg-white/80 dark:bg-white/10 backdrop-blur-md p-1.5 rounded-xl shadow-sm border border-[#D9E2EC] dark:border-white/20 inline-flex shrink-0 transition-colors">
            <img src="/image/lumora_icon.svg" alt="Lumora logo" class="w-8 h-8 object-contain drop-shadow-md" />
          </div>
          <div v-if="isSidebarOpen" class="animate-fade-in whitespace-nowrap">
              <span class="text-lg font-bold text-navy-900 dark:text-white tracking-tight block">Lumora</span>
              <span class="text-[10px] font-mono text-brand-600 dark:text-brand-300 uppercase tracking-widest bg-brand-100 dark:bg-brand-900/50 px-2 py-0.5 rounded">Intelligent Sanctuary</span>
          </div>
        </div>
        
        <!-- Sidebar Toggle Icon -->
        <button @click="isSidebarOpen = !isSidebarOpen" class="p-2 -mr-2 rounded-xl text-navy-400 dark:text-text-muted hover:bg-[#D9E2EC] dark:hover:bg-dark-surface hover:text-navy-900 dark:hover:text-white transition-colors shrink-0" :class="!isSidebarOpen && 'mr-0'">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/></svg>
        </button>
      </div>

      <nav class="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto scrollbar-hide">
        <Link v-for="item in navItems" :key="item.label"
          :href="item.href"
          class="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold transition-all group"
          :class="$page.url === item.path || $page.url.startsWith(item.path + '/') && item.path !== '/dashboard'
            ? 'bg-brand-500 text-white shadow-lg shadow-brand-900/20'
            : 'text-navy-500 dark:text-navy-400 hover:bg-navy-50 dark:hover:bg-white/5 hover:text-navy-900 dark:hover:text-white'">
          <svg class="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" :class="$page.url === item.path || $page.url.startsWith(item.path + '/') && item.path !== '/dashboard' ? 'text-white' : 'text-navy-400 group-hover:text-navy-900 dark:group-hover:text-white'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" :d="item.iconPath" />
          </svg>
          <span v-if="isSidebarOpen" class="truncate whitespace-nowrap">{{ item.label }}</span>
          <div v-if="item.badge && isSidebarOpen" class="ml-auto bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black shrink-0">
              {{ item.badge }}
          </div>
        </Link>
      </nav>

      <!-- Bottom Actions & User Section -->
      <div class="px-4 pb-6 mt-auto space-y-4">
        <!-- Extra Links -->
        <div class="flex flex-col gap-1 mb-2">
            <button @click="showLogoutModal = true" class="flex items-center gap-3 text-sm font-semibold text-navy-500 dark:text-navy-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-white/5 transition-all py-2.5 px-3 rounded-xl w-full" :class="isSidebarOpen ? 'justify-start' : 'justify-center'">
                <svg class="w-5 h-5 shrink-0 text-navy-500 dark:text-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                <span v-if="isSidebarOpen" class="whitespace-nowrap">Logout</span>
            </button>
        </div>

        <div class="border-t border-[#D9E2EC] dark:border-dark-border pt-4">
            <Link :href="route('settings')" class="p-2 rounded-xl flex items-center gap-3 group cursor-pointer hover:bg-navy-50 dark:hover:bg-white/5 border border-transparent hover:border-[#D9E2EC] dark:hover:border-white/10 transition-all" :class="!isSidebarOpen && 'justify-center'">
                <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-500 to-navy-600 p-[1.5px] shadow-lg relative shrink-0">
                    <img v-if="userAvatar" :src="userAvatar" alt="Profile" class="w-full h-full rounded-full object-cover border-2 border-white dark:border-[#0B1120]">
                    <div v-else class="w-full h-full rounded-full border-2 border-white dark:border-[#0B1120] bg-white dark:bg-dark-surface flex items-center justify-center text-brand-500">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                    </div>
                </div>
                <div class="min-w-0" v-if="isSidebarOpen">
                    <p class="text-[13px] font-black text-navy-900 dark:text-text-primary truncate leading-tight group-hover:text-brand-500 transition-colors">{{ user.name }}</p>
                    <p class="text-[10px] font-bold text-navy-400 dark:text-text-muted truncate mt-0.5">Free Plan</p>
                </div>
            </Link>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col relative">
        
        <!-- Top Bar -->
        <header class="h-20 px-10 flex items-center justify-between bg-white dark:bg-[#0A0A0A] z-30 shrink-0 border-b border-[#D9E2EC] dark:border-dark-border">
            <!-- Left Actions (Sidebar Toggle) -->
            <div class="flex-1 flex items-center gap-4">
                <button v-if="!isSidebarOpen" @click="isSidebarOpen = true" class="p-2 -ml-2 rounded-xl text-navy-400 dark:text-text-muted hover:bg-[#F8FAFC] dark:hover:bg-dark-surface hover:text-navy-900 dark:hover:text-text-primary transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/></svg>
                </button>
            </div>

            <!-- Right Actions -->
            <div class="flex items-center gap-6">
                <!-- Notifications -->
                <div class="relative flex items-center">
                  <button @click="toggleNotifications" class="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-text-muted dark:hover:text-text-primary transition-colors relative rounded-full hover:bg-slate-50 dark:hover:bg-white/5">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                      <div v-if="unreadCount > 0" class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] font-black rounded-full flex items-center justify-center">{{ unreadCount > 9 ? '9+' : unreadCount }}</div>
                  </button>

                  <!-- Notification Dropdown -->
                  <Transition name="fade">
                    <div v-if="showNotifPanel" class="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden">
                      <div class="p-4 border-b border-slate-100 flex items-center justify-between">
                        <h3 class="text-sm font-black text-slate-900">Notifications</h3>
                        <button v-if="unreadCount > 0" @click="markAllRead" class="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors">Mark all read</button>
                      </div>
                      <div class="max-h-72 overflow-y-auto scrollbar-hide">
                        <div v-if="notifications.length === 0" class="p-6 text-center text-xs font-bold text-slate-400">No notifications yet</div>
                        <div v-for="notif in notifications" :key="notif.id" 
                            @click="markRead(notif)"
                            class="px-4 py-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors flex gap-3"
                            :class="{ 'bg-indigo-50/50': !notif.is_read }">
                          <div class="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-xs" :class="notif.is_read ? 'bg-slate-100 text-slate-400' : 'bg-indigo-100 text-indigo-600'">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                          </div>
                          <div class="min-w-0">
                            <p class="text-xs font-bold text-slate-800 truncate">{{ notif.title }}</p>
                            <p class="text-[10px] text-slate-400 truncate">{{ notif.message }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Transition>
                </div>
                <div class="h-6 w-px bg-[#D9E2EC] dark:bg-dark-border"></div>

                <!-- User Profile -->
                <Link :href="route('settings')" class="flex items-center gap-3 cursor-pointer group">
                    <span class="text-xs font-black text-navy-900 dark:text-text-primary group-hover:text-brand-500 transition-colors">{{ user.name }}</span>
                    <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-navy-600 p-[1.5px] shadow-sm relative shrink-0 transition-transform group-hover:scale-105">
                        <img v-if="userAvatar" :src="userAvatar" alt="Profile" class="w-full h-full rounded-full object-cover border-2 border-white dark:border-[#0B1120]">
                        <div v-else class="w-full h-full rounded-full border-2 border-white dark:border-[#0B1120] bg-white dark:bg-dark-surface flex items-center justify-center text-brand-500">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                        </div>
                    </div>
                </Link>
            </div>
        </header>

        <!-- Page Content -->
        <div class="flex-1 overflow-y-auto bg-[#FDFDFF] dark:bg-dark-bg p-8 scrollbar-hide">
            <slot />
        </div>
    </main>

    <!-- Floating AI Study Buddy -->
    <div v-if="showBuddy" class="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
        <div class="absolute bottom-6 right-6 z-50">
            <!-- Chat Window -->
            <Transition name="slide-up">
                <div v-if="isChatOpen" class="mb-4 w-96 bg-white dark:bg-dark-panel rounded-[24px] shadow-2xl border border-[#D9E2EC] dark:border-dark-border overflow-hidden flex flex-col origin-bottom-right">
                    <!-- Chat Header -->
                    <div class="p-5 bg-gradient-to-r from-navy-800 to-navy-900 text-white flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
                                <svg class="w-5 h-5 text-brand-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                            </div>
                            <div>
                                <h3 class="font-black text-sm tracking-tight">Lumora Buddy</h3>
                                <p class="text-[10px] text-navy-300 font-mono">Cognitive Assistant</p>
                            </div>
                        </div>
                        <button @click="isChatOpen = false" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                    </div>

                    <!-- Context Banner -->
                    <div v-if="props.showBuddy" class="bg-brand-500/10 p-3 border-b border-[#D9E2EC] dark:border-dark-border flex items-start gap-3">
                        <div class="mt-0.5">
                            <svg class="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        </div>
                        <div>
                            <p class="text-xs font-bold text-navy-900 dark:text-text-primary">{{ buddyContextTitle }}</p>
                            <p class="text-[10px] text-navy-500 dark:text-text-muted mt-0.5">{{ buddyContextMessage }}</p>
                        </div>
                    </div>

                    <!-- Chat Messages -->
                    <div ref="chatContainer" class="h-80 overflow-y-auto p-5 space-y-4 bg-[#FAFAF9] dark:bg-dark-surface flex flex-col">
                        <div v-if="chatMessages.length === 0" class="flex-1 flex flex-col items-center justify-center text-center px-4">
                            <div class="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center mb-4 text-brand-500">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                            </div>
                            <p class="text-sm font-bold text-navy-900 dark:text-text-primary">How can I assist your deep work today?</p>
                            <p class="text-[10px] text-navy-500 dark:text-text-muted mt-2">Ask about your tasks, focus techniques, or get schedule insights.</p>
                        </div>

                        <div v-for="(msg, index) in chatMessages" :key="index" class="max-w-[85%] text-xs font-medium p-3 shadow-sm"
                            :class="msg.role === 'user' ? 'bg-brand-500 text-white self-end rounded-2xl rounded-tr-sm' : 'bg-white dark:bg-dark-panel border border-[#D9E2EC] dark:border-dark-border text-navy-900 dark:text-text-primary self-start rounded-2xl rounded-tl-sm'">
                            {{ msg.content }}
                        </div>

                        <!-- Loading State -->
                        <div v-if="isSending" class="w-[90%] p-4 rounded-2xl rounded-tl-sm bg-white dark:bg-dark-panel border border-[#D9E2EC] dark:border-dark-border shadow-sm text-xs font-medium text-navy-400 dark:text-text-muted self-start flex items-center gap-2">
                            <svg class="w-4 h-4 animate-spin text-brand-500" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            Thinking...
                        </div>
                    </div>

                    <!-- Chat Input -->
                    <form @submit.prevent="sendMessage" class="p-4 bg-white dark:bg-dark-panel border-t border-[#D9E2EC] dark:border-dark-border flex gap-2">
                        <input v-model="chatInput" type="text" placeholder="Ask your buddy anything..." 
                            class="flex-1 bg-[#FAFAF9] dark:bg-dark-surface border border-[#D9E2EC] dark:border-dark-border rounded-xl py-3 px-4 text-xs font-bold text-navy-900 dark:text-text-primary outline-none focus:bg-white dark:focus:bg-dark-panel focus:border-brand-500/50 transition-all shadow-sm">
                        <button type="submit" :disabled="!chatInput.trim() || isSending" class="w-11 h-11 bg-brand-500 text-white rounded-xl flex shrink-0 items-center justify-center shadow-md shadow-brand-500/20 hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                            <svg v-if="!isSending" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            <svg v-else class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        </button>
                    </form>
                </div>
            </Transition>

            <!-- Toggle Button -->
            <button @click="isChatOpen = !isChatOpen" 
                class="w-16 h-16 bg-brand-600 hover:bg-brand-500 text-white rounded-[24px] flex items-center justify-center shadow-2xl shadow-brand-900/30 hover:scale-105 active:scale-95 transition-all group relative">
                <svg v-if="!isChatOpen" class="w-7 h-7 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
                <svg v-else class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                <div v-if="!isChatOpen" class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-bounce"></div>
            </button>
        </div>

    </div>
    <!-- Logout Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showLogoutModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-[#0B1120]/80 dark:bg-black/80 backdrop-blur-md" @click="showLogoutModal = false"></div>
          
          <div class="bg-white dark:bg-dark-panel rounded-[2rem] w-full max-w-sm relative z-10 shadow-2xl overflow-hidden border border-[#D9E2EC] dark:border-dark-border animate-slide-up">
            <div class="p-8 text-center">
              <div class="w-16 h-16 bg-rose-50 dark:bg-rose-500/10 rounded-full flex items-center justify-center text-rose-500 mx-auto mb-6">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
              </div>
              <h3 class="text-xl font-black text-navy-900 dark:text-text-primary mb-2">Ending your session?</h3>
              <p class="text-navy-500 dark:text-text-muted text-sm font-medium mb-8">
                Your active tasks will be saved securely for your next focus session.
              </p>
              
              <div class="flex gap-3">
                <button @click="showLogoutModal = false" class="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-navy-700 dark:text-text-primary bg-[#E8EDF2] dark:bg-dark-surface hover:bg-[#D9E2EC] dark:hover:bg-dark-border transition-colors">
                  Cancel
                </button>
                <Link :href="route('logout')" method="post" as="button" class="flex-1 py-3 px-4 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-sm font-black shadow-lg shadow-rose-200 dark:shadow-none transition-colors">
                  Sign Out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { Link, usePage } from '@inertiajs/vue3'
import { computed, ref, nextTick, onMounted, onUnmounted } from 'vue'
import { assessmentApi, dashboardApi, setWorkspaceToken } from '@/services/workspaceApi'

const isChatOpen = ref(false)
const chatInput = ref('')
const isSending = ref(false)
const chatMessages = ref([])
const chatContainer = ref(null)

// Sidebar state
const isSidebarOpen = ref(true)

// Logout Modal
const showLogoutModal = ref(false)

// User Avatar state
const savedAvatar = localStorage.getItem('lumora_avatar')
const userAvatar = ref(savedAvatar === 'none' ? null : (savedAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200'))

// Notification state
const showNotifPanel = ref(false)
const notifications = ref([])
const unreadCount = computed(() => notifications.value.filter(n => !n.is_read).length)

const props = defineProps({
    showBuddy: { type: Boolean, default: true },
    buddyContextTitle: { type: String, default: 'Daily Insight' },
    buddyContextMessage: { type: String, default: 'Focus on completing your most important tasks today to stay ahead.' },
})

const page = usePage()
const user = computed(() => page.props.auth?.user || { name: 'User' })

// Initialize the Go API token for all pages that use this layout
if (page.props.go_token) {
    setWorkspaceToken(page.props.go_token)
}

// Fetch notifications on mount
onMounted(async () => {
    try {
        const res = await dashboardApi.getNotifications()
        notifications.value = res?.data || []
    } catch (e) {
        console.log('Notifications not available:', e.message)
    }
    document.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
    document.removeEventListener('click', handleOutsideClick)
})

function handleOutsideClick(e) {
    if (showNotifPanel.value && !e.target.closest('.relative')) {
        showNotifPanel.value = false
    }
}

function toggleNotifications() {
    showNotifPanel.value = !showNotifPanel.value
}

async function markRead(notif) {
    if (notif.is_read) return
    try {
        await dashboardApi.markNotificationRead(notif.id)
        notif.is_read = true
    } catch (e) { /* silent */ }
}

async function markAllRead() {
    try {
        await dashboardApi.markAllNotificationsRead()
        notifications.value.forEach(n => n.is_read = true)
    } catch (e) { /* silent */ }
}

const scrollToBottom = async () => {
    await nextTick()
    if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
}

const sendMessage = async () => {
    const text = chatInput.value.trim()
    if (!text || isSending.value) return

    chatMessages.value.push({ role: 'user', content: text })
    chatInput.value = ''
    isSending.value = true
    await scrollToBottom()

    try {
        const response = await assessmentApi.chat(text, JSON.stringify(page.props.srlProfile || {}))

        if (response && response.success) {
            chatMessages.value.push({ role: 'bot', content: response.data.reply })
        } else {
            chatMessages.value.push({ role: 'bot', content: 'Oops! Something went wrong.' })
        }
    } catch (err) {
        console.error(err)
        const errMsg = err.response?.data?.message || err.message || 'Network error. Please try again.'
        chatMessages.value.push({ role: 'bot', content: 'Error: ' + errMsg })
    } finally {
        isSending.value = false
        await scrollToBottom()
    }
}

const navItems = [
    { label: 'Dashboard', path: '/dashboard', href: route('dashboard'), iconPath: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { label: 'Planner', path: '/dashboard/planner', href: route('planner'), iconPath: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { label: 'Weekly Targets', path: '/dashboard/weekly-targets', href: route('targets'), iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Notes', path: '/dashboard/notes', href: route('notes'), iconPath: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
    { label: 'Progress', path: '/dashboard/progress', href: route('progress'), iconPath: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { label: 'Settings', path: '/dashboard/settings', href: route('settings'), iconPath: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
]
</script>
