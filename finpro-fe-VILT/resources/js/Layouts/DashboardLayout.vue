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
              <span class="text-lg font-bold text-brand-500 tracking-tight block">Lumora</span>
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
            <!-- Left Actions & Search -->
            <div class="flex-1 flex items-center gap-6">
                <button v-if="!isSidebarOpen" @click="isSidebarOpen = true" class="p-2 -ml-2 rounded-xl text-navy-400 dark:text-text-muted hover:bg-[#F8FAFC] dark:hover:bg-dark-surface hover:text-navy-900 dark:hover:text-text-primary transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/></svg>
                </button>

                <!-- Search Bar Trigger -->
                <button @click="showSearchModal = true" class="hidden sm:flex items-center gap-3 bg-[#F8FAFC] dark:bg-dark-surface hover:bg-[#E8EDF2] dark:hover:bg-white/5 transition-colors border border-transparent dark:border-dark-border text-navy-400 dark:text-text-muted px-4 py-2.5 rounded-full w-[280px] lg:w-[400px] text-sm font-medium group">
                    <svg class="w-4 h-4 group-hover:text-brand-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    <span class="flex-1 text-left">Search sessions, notes, or targets...</span>
                </button>
            </div>

            <!-- Right Actions -->
            <div class="flex items-center gap-6">
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
                            <p class="text-[10px] text-navy-500 dark:text-text-muted mt-2 mb-4">Ask about your tasks, focus techniques, or get schedule insights.</p>
                            <button @click="loadHistory" class="px-4 py-2 bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded-xl text-xs font-bold hover:bg-brand-100 dark:hover:bg-brand-500/20 transition-colors flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                                Load Previous Chat Log
                            </button>
                        </div>

                        <div v-for="(msg, index) in chatMessages" :key="index" class="max-w-[85%] text-xs font-medium p-3 shadow-sm"
                            :class="msg.role === 'user' ? 'bg-brand-500 text-white self-end rounded-2xl rounded-tr-sm' : 'bg-white dark:bg-dark-panel border border-[#D9E2EC] dark:border-dark-border text-navy-900 dark:text-text-primary self-start rounded-2xl rounded-tl-sm chat-markdown'"
                            v-html="parseMarkdown(msg.content)">
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
                <div v-if="!isChatOpen && unreadChat" class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-bounce"></div>
            </button>
        </div>

    </div>
    <!-- Search Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showSearchModal" class="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 sm:px-0">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-[#0B1120]/50 dark:bg-black/80 backdrop-blur-sm" @click="showSearchModal = false"></div>
          
          <!-- Modal Content -->
          <div class="bg-white dark:bg-dark-panel rounded-2xl w-full max-w-2xl relative z-10 shadow-2xl overflow-hidden border border-[#D9E2EC] dark:border-dark-border animate-slide-down">
            
            <!-- Search Input Header -->
            <div class="flex items-center gap-4 px-6 py-5 border-b border-[#D9E2EC] dark:border-dark-border">
                <svg v-if="!isSearching" class="w-5 h-5 text-navy-400 dark:text-text-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <svg v-else class="w-5 h-5 text-brand-500 shrink-0 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <input ref="searchInput" v-model="searchQuery" type="text" placeholder="Search notes, sessions, or targets..." autofocus
                    class="flex-1 bg-transparent border-none text-navy-900 dark:text-text-primary text-lg font-medium outline-none placeholder-navy-300 dark:placeholder-text-faint focus:ring-0">
                <button @click="showSearchModal = false" class="px-2 py-1 rounded-md bg-[#F3F4F6] dark:bg-dark-surface border border-[#D9E2EC] dark:border-dark-border text-[10px] font-bold text-navy-400 dark:text-text-muted tracking-widest shrink-0 hover:bg-[#E8EDF2] dark:hover:bg-white/10 transition-colors cursor-pointer">
                    ESC
                </button>
            </div>

            <div class="p-6 max-h-[60vh] overflow-y-auto">
                <div v-if="searchQuery.trim() === ''">
                    <p class="text-[10px] font-bold text-navy-400 dark:text-text-muted tracking-widest uppercase mb-4">Quick Actions</p>
                    <div class="grid grid-cols-3 gap-4">
                        <Link :href="route('notes')" @click="showSearchModal = false" class="flex flex-col items-center justify-center p-5 rounded-xl bg-[#F8FAFC] dark:bg-dark-surface hover:bg-[#E8EDF2] dark:hover:bg-white/5 border border-transparent hover:border-[#D9E2EC] dark:hover:border-dark-border transition-all hover:-translate-y-0.5 group">
                            <div class="w-12 h-12 rounded-full bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center text-brand-500 mb-3 group-hover:scale-110 transition-transform shadow-sm">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                            </div>
                            <span class="text-xs font-black text-navy-900 dark:text-text-primary">New Note</span>
                        </Link>
                        
                        <Link :href="route('planner')" @click="showSearchModal = false" class="flex flex-col items-center justify-center p-5 rounded-xl bg-[#F8FAFC] dark:bg-dark-surface hover:bg-[#E8EDF2] dark:hover:bg-white/5 border border-transparent hover:border-[#D9E2EC] dark:hover:border-dark-border transition-all hover:-translate-y-0.5 group">
                            <div class="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-3 group-hover:scale-110 transition-transform shadow-sm">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                            </div>
                            <span class="text-xs font-black text-navy-900 dark:text-text-primary">New Plan</span>
                        </Link>

                        <button @click="showSearchModal = false; isChatOpen = true" class="flex flex-col items-center justify-center p-5 rounded-xl bg-[#F8FAFC] dark:bg-dark-surface hover:bg-[#E8EDF2] dark:hover:bg-white/5 border border-transparent hover:border-[#D9E2EC] dark:hover:border-dark-border transition-all hover:-translate-y-0.5 group">
                            <div class="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-500 mb-3 group-hover:scale-110 transition-transform shadow-sm">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0012 18.75c-1.03 0-1.9-.4-2.593-1.012l-.547-.547z"/></svg>
                            </div>
                            <span class="text-xs font-black text-navy-900 dark:text-text-primary">Ask AI</span>
                        </button>
                    </div>
                </div>

                <!-- Search Results -->
                <div v-else>
                    <div v-if="searchResults.sessions?.length > 0" class="mb-6">
                        <p class="text-[10px] font-bold text-navy-400 dark:text-text-muted tracking-widest uppercase mb-3">Planner Sessions</p>
                        <div class="space-y-2">
                            <Link v-for="item in searchResults.sessions" :key="item.id" :href="route('planner')" @click="showSearchModal = false"
                                class="flex items-center gap-4 p-3 rounded-xl hover:bg-[#F8FAFC] dark:hover:bg-dark-surface transition-colors cursor-pointer border border-transparent hover:border-[#D9E2EC] dark:hover:border-dark-border group">
                                <div class="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-500 shrink-0">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                </div>
                                <div>
                                    <h4 class="text-sm font-bold text-navy-900 dark:text-text-primary group-hover:text-brand-500 transition-colors">{{ item.title }}</h4>
                                    <p class="text-xs text-navy-500 dark:text-text-muted truncate mt-0.5">{{ item.description || item.date }}</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div v-if="searchResults.targets?.length > 0" class="mb-6">
                        <p class="text-[10px] font-bold text-navy-400 dark:text-text-muted tracking-widest uppercase mb-3">Weekly Targets</p>
                        <div class="space-y-2">
                            <Link v-for="item in searchResults.targets" :key="item.id" :href="route('targets')" @click="showSearchModal = false"
                                class="flex items-center gap-4 p-3 rounded-xl hover:bg-[#F8FAFC] dark:hover:bg-dark-surface transition-colors cursor-pointer border border-transparent hover:border-[#D9E2EC] dark:hover:border-dark-border group">
                                <div class="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                </div>
                                <div>
                                    <h4 class="text-sm font-bold text-navy-900 dark:text-text-primary group-hover:text-brand-500 transition-colors">{{ item.title }}</h4>
                                    <p class="text-xs text-navy-500 dark:text-text-muted truncate mt-0.5">{{ item.description || item.focus_dimension }}</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div v-if="searchResults.notes?.length > 0" class="mb-6">
                        <p class="text-[10px] font-bold text-navy-400 dark:text-text-muted tracking-widest uppercase mb-3">Notes</p>
                        <div class="space-y-2">
                            <Link v-for="item in searchResults.notes" :key="item.id" :href="route('notes')" @click="showSearchModal = false"
                                class="flex items-center gap-4 p-3 rounded-xl hover:bg-[#F8FAFC] dark:hover:bg-dark-surface transition-colors cursor-pointer border border-transparent hover:border-[#D9E2EC] dark:hover:border-dark-border group">
                                <div class="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center text-brand-500 shrink-0">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                </div>
                                <div>
                                    <h4 class="text-sm font-bold text-navy-900 dark:text-text-primary group-hover:text-brand-500 transition-colors">{{ item.title }}</h4>
                                    <p class="text-xs text-navy-500 dark:text-text-muted truncate mt-0.5">{{ item.content_text || 'Empty note' }}</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div v-if="!isSearching && !searchResults.sessions?.length && !searchResults.targets?.length && !searchResults.notes?.length" class="text-center py-10">
                        <p class="text-navy-400 dark:text-text-muted text-sm font-bold">No results found for "{{ searchQuery }}"</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Logout Confirmation Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showLogoutModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-[#0B1120]/60 dark:bg-black/60 backdrop-blur-sm" @click="showLogoutModal = false"></div>
          
          <div class="bg-white dark:bg-dark-panel border border-[#D9E2EC] dark:border-dark-border rounded-[32px] p-8 w-full max-w-md relative z-10 shadow-2xl animate-scale-up text-center">
            <div class="w-20 h-20 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-rose-100 dark:border-rose-500/20">
              <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            </div>
            
            <h3 class="text-2xl font-black text-navy-900 dark:text-text-primary mb-3">Log Out</h3>
            <p class="text-navy-500 dark:text-text-muted text-sm font-medium mb-8 leading-relaxed">Are you sure you want to log out? You'll need to sign in again to access your workspace.</p>
            
            <div class="flex items-center gap-4">
              <button @click="showLogoutModal = false" class="flex-1 py-3.5 px-4 rounded-xl text-sm font-bold text-navy-500 dark:text-text-muted hover:text-navy-900 dark:hover:text-text-primary hover:bg-[#E8EDF2] dark:hover:bg-white/5 transition-all border border-transparent">
                Cancel
              </button>
              <Link :href="route('logout')" method="post" as="button" class="flex-1 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-rose-500 hover:bg-rose-600 transition-all shadow-md shadow-rose-500/20 hover:shadow-rose-500/30">
                Yes, Log Out
              </Link>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { Link, usePage } from '@inertiajs/vue3'
import { computed, ref, nextTick, onMounted, onUnmounted, watch } from 'vue'
import { assessmentApi, dashboardApi, plannerApi, targetsApi, setWorkspaceToken } from '@/services/workspaceApi'
import { notesApi } from '@/services/notesApi'
import { isChatOpen, chatMessages, isSending, unreadChat, sendChatMessage, fetchChatHistory } from '@/store/chatStore'

const chatInput = ref('')
const chatContainer = ref(null)

// Sidebar state
const isSidebarOpen = ref(true)

const parseMarkdown = (text) => {
    if (!text) return '';
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-black text-brand-500">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic opacity-90">$1</em>')
        .replace(/### (.*?)(\n|$)/g, '<h3 class="font-black text-[13px] mt-2 mb-1">$1</h3>\n')
        .replace(/## (.*?)(\n|$)/g, '<h2 class="font-black text-[14px] mt-2 mb-1">$1</h2>\n')
        .replace(/# (.*?)(\n|$)/g, '<h1 class="font-black text-[15px] mt-2 mb-1">$1</h1>\n')
        .replace(/- (.*?)(\n|$)/g, '<li class="ml-3 list-disc">$1</li>\n')
        .replace(/\n/g, '<br>');
}

// Search Modal state
const showSearchModal = ref(false)
const searchInput = ref(null)
const searchQuery = ref('')
const isSearching = ref(false)
const searchResults = ref({ sessions: [], targets: [], notes: [] })
let searchTimeout = null

watch(searchQuery, (newVal) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    if (!newVal || newVal.trim() === '') {
        searchResults.value = { sessions: [], targets: [], notes: [] }
        isSearching.value = false
        return
    }
    
    isSearching.value = true
    searchTimeout = setTimeout(async () => {
        try {
            const results = await targetsApi.searchWorkspace(newVal.trim())
            searchResults.value = results || { sessions: [], targets: [], notes: [] }
        } catch (err) {
            console.error("Search failed:", err)
        } finally {
            isSearching.value = false
        }
    }, 300)
})

watch(showSearchModal, (newVal) => {
    if (newVal) {
        searchQuery.value = ''
        searchResults.value = { sessions: [], targets: [], notes: [] }
        nextTick(() => {
            searchInput.value?.focus()
        })
    }
})

// Logout Modal
const showLogoutModal = ref(false)

// User Avatar state
const savedAvatar = localStorage.getItem('lumora_avatar')

const props = defineProps({
    showBuddy: { type: Boolean, default: true },
    buddyContextTitle: { type: String, default: 'Daily Insight' },
    buddyContextMessage: { type: String, default: 'Focus on completing your most important tasks today to stay ahead.' },
})

const page = usePage()
const user = computed(() => page.props.auth?.user || { name: 'User' })

const userAvatar = ref(page.props.auth?.user?.avatar || (savedAvatar === 'none' ? null : (savedAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200')))

// Initialize the Go API token for all pages that use this layout
if (page.props.go_token) {
    setWorkspaceToken(page.props.go_token)
}

// Fetch notifications on mount
onMounted(async () => {
    if (isChatOpen.value) {
        await scrollToBottom()
    }

    // Keyboard shortcut handler
    const handleKeydown = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault()
            showSearchModal.value = true
        }
        if (e.key === 'Escape' && showSearchModal.value) {
            showSearchModal.value = false
        }
    }
    
    window.addEventListener('keydown', handleKeydown)
    
    // Listen for avatar updates
    const handleAvatarUpdate = () => {
        const newAvatar = localStorage.getItem('lumora_avatar')
        userAvatar.value = newAvatar === 'none' ? null : (newAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200')
    }
    window.addEventListener('avatar-updated', handleAvatarUpdate)
    
    // Store cleanup handler directly on the window object so we can remove it later
    window._lumora_keydown_handler = handleKeydown
    window._lumora_avatar_handler = handleAvatarUpdate
})

onUnmounted(() => {
    if (window._lumora_keydown_handler) {
        window.removeEventListener('keydown', window._lumora_keydown_handler)
        delete window._lumora_keydown_handler
    }
    if (window._lumora_avatar_handler) {
        window.removeEventListener('avatar-updated', window._lumora_avatar_handler)
        delete window._lumora_avatar_handler
    }
})

const scrollToBottom = async () => {
    await nextTick()
    if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
}

watch(isChatOpen, async (val) => {
    if (val) {
        await scrollToBottom()
    }
})

const sendMessage = async () => {
    const text = chatInput.value.trim()
    if (!text || isSending.value) return
    
    const currentText = text;
    chatInput.value = ''
    
    await sendChatMessage(currentText, page.props.srlProfile, scrollToBottom)
}

const loadHistory = async () => {
    await fetchChatHistory()
    await scrollToBottom()
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
