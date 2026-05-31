<template>
  <div class="h-screen bg-[#FDFDFF] font-sans text-slate-900 flex overflow-hidden">
    
    <!-- Left Sidebar (Dark Theme based on Figma) -->
    <aside class="bg-[#0B1120] border-[#1E293B] flex flex-col z-40 relative shadow-xl transition-all duration-300"
           :class="isSidebarOpen ? 'w-64 border-r' : 'w-0 overflow-hidden border-transparent opacity-0'">
      <div class="p-6 pb-6 flex items-center gap-3">
        <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-900/50">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
        </div>
        <div>
            <span class="text-lg font-black text-white tracking-tight block">Lumora</span>
            <span class="text-[10px] font-black text-indigo-300 uppercase tracking-widest bg-indigo-900/50 px-2 py-0.5 rounded-md">Intelligent Sanctuary</span>
        </div>
      </div>

      <nav class="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto scrollbar-hide">
        <Link v-for="item in navItems" :key="item.label"
          :href="item.href"
          class="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all group"
          :class="$page.url === item.path || $page.url.startsWith(item.path + '/') && item.path !== '/dashboard'
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20'
            : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'">
          <svg class="w-5 h-5 transition-transform group-hover:scale-110" :class="$page.url === item.path || $page.url.startsWith(item.path + '/') && item.path !== '/dashboard' ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" :d="item.iconPath" />
          </svg>
          {{ item.label }}
          <div v-if="item.badge" class="ml-auto bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black">
              {{ item.badge }}
          </div>
        </Link>
      </nav>

      <!-- Bottom Actions & User Section -->
      <div class="px-4 pb-6 mt-auto space-y-4">
        <!-- Extra Links -->
        <div class="flex flex-col gap-1 mb-2">
            <button @click="showLogoutModal = true" class="flex items-center gap-3 text-sm font-bold text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-all py-2.5 px-3 rounded-xl w-full text-left">
                <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                Logout
            </button>
        </div>

        <div class="border-t border-[#1E293B] pt-4">
            <div class="p-2 rounded-xl flex items-center gap-3 group cursor-pointer hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
                <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5 shadow-lg relative">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200" alt="Profile" class="w-full h-full rounded-full object-cover border-2 border-[#0B1120]">
                    <div class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#0B1120] rounded-full"></div>
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-xs font-black text-white truncate">{{ user.name }}</p>
                    <p class="text-[9px] font-bold text-indigo-400 uppercase tracking-wider truncate">Deep Focus Mode</p>
                </div>
            </div>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col relative">
        
        <!-- Top Bar -->
        <header class="h-20 px-10 flex items-center justify-between bg-[#F7F9FB] z-30 shrink-0 border-b border-slate-200">
            <!-- Left Actions (Sidebar Toggle) -->
            <div class="flex-1">
                <button @click="isSidebarOpen = !isSidebarOpen" class="p-2 -ml-2 rounded-xl text-slate-500 hover:bg-slate-200/60 hover:text-slate-800 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/></svg>
                </button>
            </div>

            <!-- Right Actions -->
            <div class="flex items-center gap-6">
                <!-- Notifications -->
                <div class="relative">
                  <button @click="toggleNotifications" class="text-slate-500 hover:text-slate-800 transition-colors relative">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                      <div v-if="unreadCount > 0" class="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[8px] font-black rounded-full flex items-center justify-center">{{ unreadCount > 9 ? '9+' : unreadCount }}</div>
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
                
                <!-- Dark Mode Toggle -->
                <button class="text-slate-500 hover:text-slate-800 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
                </button>

                <div class="h-6 w-px bg-slate-300"></div>

                <!-- User Profile -->
                <div class="flex items-center gap-3 cursor-pointer group">
                    <span class="text-xs font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{{ user.name }}</span>
                    <div class="w-8 h-8 rounded-full overflow-hidden border-2 border-transparent group-hover:border-indigo-100 transition-all">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100" alt="Profile" class="w-full h-full object-cover">
                    </div>
                </div>
            </div>
        </header>

        <!-- Page Content -->
        <div class="flex-1 overflow-y-auto bg-[#FDFDFF] p-8 scrollbar-hide">
            <slot />
        </div>
    </main>

    <!-- Floating AI Study Buddy -->
    <div v-if="showBuddy" class="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
        <div class="absolute bottom-6 right-6 z-50">
            <!-- Chat Window -->
            <Transition name="slide-up">
                <div v-if="isChatOpen" class="mb-4 w-96 bg-white rounded-[24px] shadow-2xl border border-slate-100 overflow-hidden flex flex-col origin-bottom-right">
                    <!-- Chat Header -->
                    <div class="p-5 bg-gradient-to-r from-[#1E1B4B] to-[#3D3ACE] text-white flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
                                <svg class="w-5 h-5 text-indigo-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                            </div>
                            <div>
                                <h3 class="font-black text-sm tracking-tight">Lumora Buddy</h3>
                                <p class="text-[10px] text-indigo-200 font-medium">Cognitive Assistant</p>
                            </div>
                        </div>
                        <button @click="isChatOpen = false" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                    </div>

                    <!-- Context Banner -->
                    <div v-if="props.showBuddy" class="bg-indigo-50/50 p-3 border-b border-indigo-100 flex items-start gap-3">
                        <div class="mt-0.5">
                            <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        </div>
                        <div>
                            <p class="text-xs font-bold text-slate-800">{{ buddyContextTitle }}</p>
                            <p class="text-[10px] text-slate-500 mt-0.5">{{ buddyContextMessage }}</p>
                        </div>
                    </div>

                    <!-- Chat Messages -->
                    <div ref="chatContainer" class="h-80 overflow-y-auto p-5 space-y-4 bg-slate-50/50 flex flex-col">
                        <div v-if="chatMessages.length === 0" class="flex-1 flex flex-col items-center justify-center text-center px-4">
                            <div class="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4 text-indigo-400">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                            </div>
                            <p class="text-sm font-bold text-slate-700">How can I assist your deep work today?</p>
                            <p class="text-[10px] text-slate-400 mt-2">Ask about your tasks, focus techniques, or get schedule insights.</p>
                        </div>

                        <div v-for="(msg, index) in chatMessages" :key="index" class="max-w-[85%] text-xs font-medium p-3 shadow-sm"
                            :class="msg.role === 'user' ? 'bg-[#3D3ACE] text-white self-end rounded-2xl rounded-tr-sm' : 'bg-white border border-slate-100 text-[#1E1B4B] self-start rounded-2xl rounded-tl-sm'">
                            {{ msg.content }}
                        </div>

                        <!-- Loading State -->
                        <div v-if="isSending" class="w-[90%] p-4 rounded-2xl rounded-tl-sm bg-white border border-slate-100 shadow-sm text-xs font-medium text-slate-400 self-start flex items-center gap-2">
                            <svg class="w-4 h-4 animate-spin text-[#3D3ACE]" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            Thinking...
                        </div>
                    </div>

                    <!-- Chat Input -->
                    <form @submit.prevent="sendMessage" class="p-4 bg-white border-t border-slate-50 flex gap-2">
                        <input v-model="chatInput" type="text" placeholder="Ask your buddy anything..." 
                            class="flex-1 bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-xs font-bold text-[#1E1B4B] outline-none focus:bg-white focus:border-[#3D3ACE]/20 transition-all shadow-sm">
                        <button type="submit" :disabled="!chatInput.trim() || isSending" class="w-11 h-11 bg-[#3D3ACE] text-white rounded-xl flex shrink-0 items-center justify-center shadow-md shadow-indigo-100 hover:bg-[#312E81] disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                            <svg v-if="!isSending" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            <svg v-else class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        </button>
                    </form>
                </div>
            </Transition>

            <!-- Toggle Button -->
            <button @click="isChatOpen = !isChatOpen" 
                class="w-16 h-16 bg-[#1E1B4B] hover:bg-[#3D3ACE] text-white rounded-[24px] flex items-center justify-center shadow-2xl shadow-indigo-200 hover:scale-105 active:scale-95 transition-all group relative">
                <svg v-if="!isChatOpen" class="w-7 h-7 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
                <svg v-else class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                <div v-if="!isChatOpen" class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-bounce"></div>
            </button>
        </div>

        <!-- Logout Modal -->
        <Teleport to="body">
          <Transition name="fade">
            <div v-if="showLogoutModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <div class="absolute inset-0 bg-[#0B1120]/80 backdrop-blur-md" @click="showLogoutModal = false"></div>
              
              <div class="bg-gradient-to-b from-[#1E1B4B] to-[#0B1120] rounded-[2rem] w-full max-w-md relative z-10 shadow-2xl shadow-indigo-900/50 overflow-hidden border border-indigo-500/20 animate-slide-up">
                
                <!-- Decorative Top Blob -->
                <div class="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/30 blur-[50px] rounded-full pointer-events-none"></div>
                <div class="absolute -bottom-24 -left-24 w-48 h-48 bg-rose-500/20 blur-[50px] rounded-full pointer-events-none"></div>

                <div class="p-10 text-center relative z-20">
                  <div class="relative w-20 h-20 mx-auto mb-8 group">
                    <div class="absolute inset-0 bg-gradient-to-tr from-rose-500 to-orange-500 rounded-2xl rotate-3 group-hover:rotate-12 transition-transform duration-300"></div>
                    <div class="absolute inset-0 bg-white rounded-2xl flex items-center justify-center -rotate-3 group-hover:-rotate-12 transition-transform duration-300">
                        <svg class="w-10 h-10 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                    </div>
                  </div>
                  
                  <h3 class="text-2xl font-black text-white mb-3 tracking-tight">Ending your session?</h3>
                  <p class="text-sm font-medium text-indigo-200/80 leading-relaxed">
                    Your intelligent sanctuary will pause your active tasks and be ready for your next deep focus session.
                  </p>
                </div>

                <div class="p-6 bg-white/5 backdrop-blur-sm border-t border-white/10 flex gap-4 relative z-20">
                  <button @click="showLogoutModal = false" class="flex-1 py-3.5 px-4 rounded-xl text-sm font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10">
                    Stay Focused
                  </button>
                  <Link :href="route('logout')" method="post" as="button" class="flex-1 py-3.5 px-4 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white rounded-xl text-sm font-black shadow-lg shadow-rose-900/50 hover:shadow-rose-900/80 hover:-translate-y-0.5 transition-all">
                    Sign Out
                  </Link>
                </div>
              </div>
            </div>
          </Transition>
        </Teleport>
    </div>
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
