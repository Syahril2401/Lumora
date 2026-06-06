<template>
  <Head title="Build Better Study Habits with Clarity - Lumora" />
  <div class="min-h-screen font-sans antialiased overflow-x-hidden bg-[#FAFAF9] text-[#102A43] dark:bg-[#0C1222] dark:text-slate-100 transition-colors duration-300">

    <!-- ═══ NAVBAR ═══ -->
    <nav class="fixed top-0 inset-x-0 z-50 glass bg-white/85 dark:bg-[#111827]/85 border-b border-[#D9E2EC] dark:border-white/5">
      <div class="max-w-[1600px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <div class="flex items-center gap-10">
          <div class="flex items-center gap-3">
            <img src="/image/lumora_icon.svg" alt="Lumora logo" class="w-10 h-10 object-contain" />
            <span class="text-xl font-bold tracking-tight text-brand-500">Lumora</span>
          </div>
          <ul class="hidden lg:flex gap-8 text-sm font-medium text-navy-500 dark:text-slate-400">
            <li><a href="#features" class="hover:text-navy-900 dark:hover:text-text-primary transition-colors">Features</a></li>
            <li><a href="#how" class="hover:text-navy-900 dark:hover:text-text-primary transition-colors">How it Works</a></li>
          </ul>
        </div>
        <div class="flex items-center gap-4">
          <button @click="toggleTheme" class="relative w-14 h-7 rounded-full bg-navy-200 dark:bg-navy-700 transition-colors duration-300 focus:outline-none" aria-label="Toggle dark mode">
            <div :class="{'translate-x-[28px]': isDark, 'translate-x-0': !isDark}" class="absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white dark:bg-brand-500 shadow-md transition-transform duration-300 flex items-center justify-center">
              <svg v-if="!isDark" class="w-3.5 h-3.5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              <svg v-if="isDark" class="w-3.5 h-3.5 text-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            </div>
          </button>
          <Link :href="route('login')" class="text-sm font-medium text-navy-500 dark:text-slate-400 hover:text-navy-900 dark:hover:text-text-primary transition-colors">Log In</Link>
          <Link :href="route('register')" class="btn-primary text-sm font-semibold px-5 py-2.5 rounded-lg">Get Started</Link>
        </div>
      </div>
    </nav>

    <!-- ═══ HERO ═══ -->
    <section class="relative pt-32 pb-24 overflow-hidden">
      <div class="absolute top-10 right-0 w-[600px] h-[600px] bg-brand-300/10 dark:bg-brand-500/5 rounded-full blur-[160px]"></div>
      <div class="absolute bottom-0 left-[5%] w-[400px] h-[400px] bg-navy-300/8 dark:bg-navy-500/5 rounded-full blur-[120px]"></div>
      <div class="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
        <div class="grid lg:grid-cols-5 gap-12 items-start">
          <!-- Left: Text content -->
          <div class="lg:col-span-2 pt-4 hero-content">
            <div class="inline-flex items-center bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 text-[11px] font-mono font-medium uppercase tracking-widest px-4 py-2 rounded-full mb-8 border border-brand-200 dark:border-brand-500/15">
              <span class="w-1.5 h-1.5 bg-brand-500 rounded-full mr-2"></span> The Intelligent Sanctuary
            </div>
            <h1 class="text-[52px] lg:text-[58px] font-bold text-navy-900 dark:text-slate-100 leading-[1.05] tracking-tight mb-6">
              Your intelligent sanctuary for <span class="gradient-text">self-regulated learning.</span>
            </h1>
            <p class="text-navy-600 dark:text-slate-300 text-lg leading-relaxed mb-8">
              A smart dashboard, study planner, weekly targets, rich notes, and progress analytics — designed for how students actually learn.
            </p>
            <div class="flex flex-wrap gap-3 mb-8">
              <Link :href="route('register')" class="btn-primary font-semibold px-8 py-4 rounded-xl shadow-glow text-sm">Get Started for Free</Link>
              <a href="#how" class="flex items-center gap-2 bg-white dark:bg-white/[0.03] text-navy-700 dark:text-slate-100 font-semibold px-6 py-4 rounded-xl hover:bg-gray-50 dark:hover:bg-white/[0.06] transition-all border border-[#D9E2EC] dark:border-slate-700 text-sm">
                <svg class="w-4 h-4 text-brand-500" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                See how it works
              </a>
            </div>
            <div class="flex items-center gap-4">
              <div class="flex -space-x-2">
                <div class="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-500/15 border-2 border-white dark:border-slate-900 flex items-center justify-center text-brand-600 dark:text-brand-400 text-[9px] font-bold">EJ</div>
                <div class="w-8 h-8 rounded-full bg-navy-100 dark:bg-navy-500/15 border-2 border-white dark:border-slate-900 flex items-center justify-center text-navy-600 dark:text-navy-300 text-[9px] font-bold">MT</div>
                <div class="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/8 border-2 border-white dark:border-slate-900 flex items-center justify-center text-navy-400 dark:text-slate-400 text-[9px] font-bold">+2k</div>
              </div>
              <div class="flex text-brand-500 gap-0.5 text-[10px]">★★★★★</div>
              <span class="text-navy-400 dark:text-slate-500 text-xs">2,000+ students</span>
            </div>
          </div>
          <!-- Right: Dashboard mockup (main focal point) -->
          <div class="lg:col-span-3 relative hero-mockup gsap-hover cursor-default">
            <div class="absolute -left-6 top-20 w-px h-40 bg-gradient-to-b from-brand-300/30 to-transparent rotate-12 dark:from-brand-500/20"></div>
            <div class="rounded-2xl border border-[#D9E2EC] dark:border-slate-700 shadow-2xl bg-white dark:bg-[#0C1222] overflow-hidden">
              <!-- Browser chrome -->
              <div class="bg-gray-50 dark:bg-slate-800/80 px-4 py-3 flex items-center gap-3 border-b border-[#E8EDF2] dark:border-slate-700">
                <div class="flex gap-1.5">
                  <div class="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                  <div class="w-2.5 h-2.5 rounded-full bg-yellow-400/80"></div>
                  <div class="w-2.5 h-2.5 rounded-full bg-green-400/80"></div>
                </div>
                <div class="flex-1 flex justify-center">
                  <div class="bg-white dark:bg-slate-900 rounded-md px-4 py-1 text-[9px] text-navy-400 dark:text-slate-500 font-mono border border-[#E8EDF2] dark:border-slate-700">app.lumora.ai/dashboard</div>
                </div>
              </div>
              <!-- Dashboard content -->
              <div class="p-5">
                <!-- Greeting -->
                <div class="mb-4">
                  <h2 class="text-base font-bold text-navy-900 dark:text-slate-100">Good afternoon, User.</h2>
                  <p class="text-xs text-navy-500 dark:text-slate-400">Ready for a deep focus session?</p>
                  <div class="flex items-center gap-1.5 mt-1">
                    <div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <span class="text-[10px] text-navy-500 dark:text-slate-400">Your cognitive reading is at <span class="text-emerald-600 dark:text-emerald-400 font-bold">94%</span> today.</span>
                  </div>
                </div>
                <!-- Main content: Daily Overview + Recent Notes -->
                <div class="grid grid-cols-5 gap-3">
                  <!-- Daily Overview Card -->
                  <div class="col-span-3 bg-[#102A43] rounded-xl p-3.5">
                    <div class="flex items-center justify-between mb-3">
                      <div>
                        <h3 class="text-xs font-bold text-white">Daily Overview</h3>
                        <p class="text-[9px] text-slate-400">Saturday, Jun 6</p>
                      </div>
                      <span class="text-[8px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300">Full Schedule</span>
                    </div>
                    <div class="flex items-center gap-3 mb-2">
                      <div class="text-xs font-bold text-white w-10">19:00</div>
                      <div class="flex-1 bg-white/5 rounded-lg p-2 border border-white/10">
                        <div class="flex items-center justify-between">
                          <div>
                            <p class="text-[11px] font-semibold text-white">Tonight's Study Session</p>
                            <p class="text-[9px] text-slate-400">120m</p>
                          </div>
                          <span class="text-[8px] px-2 py-0.5 rounded-full bg-brand-500 text-white font-medium">PLANNED</span>
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center gap-3 opacity-60">
                      <div class="text-xs font-bold text-slate-400 w-10">21:00</div>
                      <div class="flex-1 bg-white/5 rounded-lg p-2 border border-white/10">
                        <div class="flex items-center justify-between">
                          <div>
                            <p class="text-[11px] font-semibold text-slate-300">Weekly Review</p>
                            <p class="text-[9px] text-slate-500">45m</p>
                          </div>
                          <span class="text-[8px] px-2 py-0.5 rounded-full bg-slate-600 text-slate-300 font-medium">SCHEDULED</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Recent Notes -->
                  <div class="col-span-2 space-y-2">
                    <div class="flex items-center justify-between mb-1">
                      <span class="text-[10px] font-bold text-navy-700 dark:text-slate-200">Recent Notes</span>
                      <span class="text-[8px] text-brand-500 font-semibold cursor-pointer">VIEW ALL</span>
                    </div>
                    <div class="bg-white dark:bg-slate-800 rounded-lg p-2.5 border border-[#E8EDF2] dark:border-slate-700 shadow-sm">
                      <div class="flex items-center gap-2 mb-1">
                        <div class="w-4 h-4 rounded bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center"><svg class="w-2.5 h-2.5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div>
                        <span class="text-[10px] font-semibold text-navy-700 dark:text-slate-200 truncate">Weekly Study Targets</span>
                      </div>
                      <p class="text-[8px] text-navy-400 dark:text-slate-500 leading-relaxed">My Targets for this Week: - Target 1: Review class notes for 15-20 minutes every day...</p>
                    </div>
                    <div class="bg-white dark:bg-slate-800 rounded-lg p-2.5 border border-[#E8EDF2] dark:border-slate-700 shadow-sm">
                      <div class="flex items-center gap-2 mb-1">
                        <div class="w-4 h-4 rounded bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center"><svg class="w-2.5 h-2.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div>
                        <span class="text-[10px] font-semibold text-navy-700 dark:text-slate-200 truncate">Waterfall Methodology</span>
                      </div>
                      <p class="text-[8px] text-navy-400 dark:text-slate-500 leading-relaxed">The Waterfall model is a classic, sequential design process often used in software development...</p>
                    </div>
                  </div>
                </div>
                <!-- Bottom row: Targets + Quick Actions + Quote -->
                <div class="grid grid-cols-3 gap-3 mt-3">
                  <div class="bg-white dark:bg-slate-800 rounded-xl p-3 border border-[#E8EDF2] dark:border-slate-700">
                    <h4 class="text-[9px] font-bold text-navy-700 dark:text-slate-200 mb-2">This Week's Targets</h4>
                    <p class="text-[9px] text-navy-400 dark:text-slate-500 text-center py-1">No active targets for this week.</p>
                  </div>
                  <div class="bg-white dark:bg-slate-800 rounded-xl p-3 border border-[#E8EDF2] dark:border-slate-700">
                    <h4 class="text-[9px] font-bold text-navy-400 dark:text-slate-500 uppercase tracking-wider mb-2">Quick Actions</h4>
                    <div class="space-y-1.5">
                      <div class="flex items-center gap-2 p-1.5 rounded-lg bg-[#FAFAF9] dark:bg-slate-700/50">
                        <div class="w-5 h-5 rounded bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center"><svg class="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></div>
                        <span class="text-[9px] text-navy-600 dark:text-slate-300">New Note</span>
                      </div>
                      <div class="flex items-center gap-2 p-1.5 rounded-lg bg-[#FAFAF9] dark:bg-slate-700/50">
                        <div class="w-5 h-5 rounded bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center"><svg class="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>
                        <span class="text-[9px] text-navy-600 dark:text-slate-300">Plan Session</span>
                      </div>
                    </div>
                  </div>
                  <div class="bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl p-3 relative overflow-hidden">
                    <div class="absolute -right-2 -top-2 text-2xl text-white/20">"</div>
                    <p class="text-[9px] text-white italic leading-relaxed">Wisdom is not a product of schooling but of the lifelong attempt to acquire it.</p>
                    <p class="text-[8px] text-white/70 mt-2 uppercase tracking-wider">— ALBERT EINSTEIN</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- Floating notification toast -->
            <div class="absolute -bottom-3 -left-6 bg-white dark:bg-slate-800 rounded-xl p-3 border border-[#D9E2EC] dark:border-slate-700 shadow-xl animate-float" style="animation-delay:-3s">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <p class="text-[11px] font-semibold text-navy-700 dark:text-slate-100">All caught up!</p>
                  <p class="text-[9px] text-navy-400 dark:text-slate-500 font-mono">Great work today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ COMPARISON ═══ -->
    <section class="py-28 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-100/20 dark:bg-brand-500/5 rounded-full blur-[160px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div class="max-w-[1600px] mx-auto px-6 lg:px-12 relative">
        <div class="text-center mb-16 stagger-fade-up">
          <div class="inline-flex items-center bg-navy-50 dark:bg-navy-500/10 text-navy-600 dark:text-navy-300 text-[10px] font-mono font-medium uppercase tracking-widest px-3 py-1.5 rounded-full mb-5 border border-navy-200 dark:border-navy-500/15">Why Lumora</div>
          <h2 class="text-[42px] font-bold text-navy-900 dark:text-slate-100 mb-4 tracking-tight leading-[1.1] max-w-2xl mx-auto">Stop juggling. Start learning.</h2>
          <p class="text-navy-500 dark:text-slate-300 text-lg leading-relaxed max-w-xl mx-auto">Generic to-do lists don't understand your cognitive load. Lumora tracks your learning patterns, measures your focus, and helps you study smarter — not harder.</p>
        </div>
        <div class="max-w-[1200px] mx-auto stagger-fade-up">
          <!-- Column headers -->
          <div class="grid md:grid-cols-2 gap-4 mb-6">
            <div class="flex items-center gap-2 px-1">
              <div class="w-2 h-2 rounded-full bg-red-400"></div>
              <span class="text-xs font-semibold text-red-400 uppercase tracking-wider">The Old Way</span>
            </div>
            <div class="flex items-center gap-2 px-1">
              <div class="w-2 h-2 rounded-full bg-brand-500"></div>
              <span class="text-xs font-semibold text-brand-500 uppercase tracking-wider">The Lumora Way</span>
            </div>
          </div>
          <div class="space-y-3">
          <!-- Row 1 -->
          <div class="grid md:grid-cols-2 gap-3">
            <div class="gsap-hover bg-white dark:bg-slate-800 rounded-xl p-4 border border-red-100 dark:border-red-500/10 shadow-sm flex items-center gap-3 relative overflow-hidden">
              <div class="absolute left-0 top-0 bottom-0 w-1 bg-red-400"></div>
              <div class="w-9 h-9 bg-red-50 dark:bg-red-500/10 rounded-lg flex items-center justify-center shrink-0"><svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" /></svg></div>
              <p class="text-sm text-navy-700 dark:text-slate-300 font-medium">Scattered notes across five different apps</p>
            </div>
            <div class="gsap-hover bg-white dark:bg-slate-800 rounded-xl p-4 border border-brand-100 dark:border-brand-500/10 shadow-sm flex items-center gap-3 relative overflow-hidden">
              <div class="absolute left-0 top-0 bottom-0 w-1 bg-brand-500"></div>
              <div class="w-9 h-9 bg-brand-50 dark:bg-brand-500/10 rounded-lg flex items-center justify-center shrink-0"><svg class="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg></div>
              <p class="text-sm text-navy-700 dark:text-slate-300 font-medium">One unified sanctuary for every lecture and task</p>
            </div>
          </div>
          <!-- Row 2 -->
          <div class="grid md:grid-cols-2 gap-3">
            <div class="gsap-hover bg-white dark:bg-slate-800 rounded-xl p-4 border border-red-100 dark:border-red-500/10 shadow-sm flex items-center gap-3 relative overflow-hidden">
              <div class="absolute left-0 top-0 bottom-0 w-1 bg-red-400"></div>
              <div class="w-9 h-9 bg-red-50 dark:bg-red-500/10 rounded-lg flex items-center justify-center shrink-0"><svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" /></svg></div>
              <p class="text-sm text-navy-700 dark:text-slate-300 font-medium">No feedback loop on study effectiveness</p>
            </div>
            <div class="gsap-hover bg-white dark:bg-slate-800 rounded-xl p-4 border border-brand-100 dark:border-brand-500/10 shadow-sm flex items-center gap-3 relative overflow-hidden">
              <div class="absolute left-0 top-0 bottom-0 w-1 bg-brand-500"></div>
              <div class="w-9 h-9 bg-brand-50 dark:bg-brand-500/10 rounded-lg flex items-center justify-center shrink-0"><svg class="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg></div>
              <p class="text-sm text-navy-700 dark:text-slate-300 font-medium">AI-driven study plans and personalized recommendations</p>
            </div>
          </div>
          <!-- Row 3 -->
          <div class="grid md:grid-cols-2 gap-3">
            <div class="gsap-hover bg-white dark:bg-slate-800 rounded-xl p-4 border border-red-100 dark:border-red-500/10 shadow-sm flex items-center gap-3 relative overflow-hidden">
              <div class="absolute left-0 top-0 bottom-0 w-1 bg-red-400"></div>
              <div class="w-9 h-9 bg-red-50 dark:bg-red-500/10 rounded-lg flex items-center justify-center shrink-0"><svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" /></svg></div>
              <p class="text-sm text-navy-700 dark:text-slate-300 font-medium">Overwhelmed by monolithic to-do lists</p>
            </div>
            <div class="gsap-hover bg-white dark:bg-slate-800 rounded-xl p-4 border border-brand-100 dark:border-brand-500/10 shadow-sm flex items-center gap-3 relative overflow-hidden">
              <div class="absolute left-0 top-0 bottom-0 w-1 bg-brand-500"></div>
              <div class="w-9 h-9 bg-brand-50 dark:bg-brand-500/10 rounded-lg flex items-center justify-center shrink-0"><svg class="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg></div>
              <p class="text-sm text-navy-700 dark:text-slate-300 font-medium">Weekly targets with reflective analytics</p>
            </div>
          </div>
          <!-- Row 4 -->
          <div class="grid md:grid-cols-2 gap-3">
            <div class="gsap-hover bg-white dark:bg-slate-800 rounded-xl p-4 border border-red-100 dark:border-red-500/10 shadow-sm flex items-center gap-3 relative overflow-hidden">
              <div class="absolute left-0 top-0 bottom-0 w-1 bg-red-400"></div>
              <div class="w-9 h-9 bg-red-50 dark:bg-red-500/10 rounded-lg flex items-center justify-center shrink-0"><svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" /></svg></div>
              <p class="text-sm text-navy-700 dark:text-slate-300 font-medium">Burnout from poor time management</p>
            </div>
            <div class="gsap-hover bg-white dark:bg-slate-800 rounded-xl p-4 border border-brand-100 dark:border-brand-500/10 shadow-sm flex items-center gap-3 relative overflow-hidden">
              <div class="absolute left-0 top-0 bottom-0 w-1 bg-brand-500"></div>
              <div class="w-9 h-9 bg-brand-50 dark:bg-brand-500/10 rounded-lg flex items-center justify-center shrink-0"><svg class="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg></div>
              <p class="text-sm text-navy-700 dark:text-slate-300 font-medium">Structured notes with bidirectional linking</p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ FEATURES ═══ -->
    <section id="features" class="py-28 relative overflow-hidden">
      <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-navy-100/20 dark:bg-navy-500/5 rounded-full blur-[140px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
      <div class="max-w-[1600px] mx-auto px-6 lg:px-12 relative">
        <div class="text-center mb-16 stagger-fade-up">
          <div class="inline-flex items-center bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 text-[10px] font-mono font-medium uppercase tracking-widest px-3 py-1.5 rounded-full mb-5 border border-brand-200 dark:border-brand-500/15">Features</div>
          <h2 class="text-[42px] font-bold text-navy-900 dark:text-slate-100 mb-4 tracking-tight leading-[1.1]">Everything you need to excel.</h2>
          <p class="text-navy-500 dark:text-slate-300 text-lg leading-relaxed max-w-xl mx-auto">A complete toolkit designed around how students actually learn.</p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

          <!-- Smart Dashboard -->
          <div class="gsap-hover bg-white dark:bg-slate-800 rounded-2xl p-6 border border-[#D9E2EC] dark:border-slate-700 shadow-sm relative overflow-hidden group stagger-fade-up">
            <div class="w-11 h-11 bg-brand-50 dark:bg-brand-500/10 rounded-xl flex items-center justify-center text-brand-500 mb-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            </div>
            <h3 class="text-lg font-bold mb-2 text-navy-900 dark:text-slate-100">Smart Dashboard</h3>
            <p class="text-navy-500 dark:text-slate-400 text-sm mb-4 leading-relaxed">Your personal command center with cognitive readiness score, daily overview, and quick access to everything.</p>
            <div class="bg-[#102A43] rounded-xl p-3 space-y-2">
              <div class="flex items-center gap-2"><div class="w-2 h-2 rounded-full bg-emerald-400"></div><span class="text-[10px] text-slate-300">Your cognitive reading is at <span class="text-emerald-400 font-bold">94%</span> today</span></div>
              <div class="flex items-center gap-2"><span class="text-[10px] text-slate-500 font-mono w-10">19:00</span><div class="flex-1 h-5 rounded bg-brand-500/20 flex items-center px-2"><span class="text-[10px] text-slate-200">Tonight's Study Session</span><span class="ml-auto text-[9px] bg-brand-500 text-white px-1.5 rounded">PLANNED</span></div></div>
              <div class="flex items-center gap-2"><span class="text-[10px] text-slate-500 font-mono w-10">21:00</span><div class="flex-1 h-5 rounded bg-emerald-500/20 flex items-center px-2"><span class="text-[10px] text-slate-200">Weekly Review</span><span class="ml-auto text-[9px] bg-emerald-500 text-white px-1.5 rounded">DONE</span></div></div>
            </div>
          </div>

          <!-- Study Planner -->
          <div class="gsap-hover bg-white dark:bg-slate-800 rounded-2xl p-6 border border-[#D9E2EC] dark:border-slate-700 shadow-sm relative overflow-hidden group stagger-fade-up">
            <div class="w-11 h-11 bg-violet-50 dark:bg-violet-500/10 rounded-xl flex items-center justify-center text-violet-500 mb-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <h3 class="text-lg font-bold mb-2 text-navy-900 dark:text-slate-100">Study Planner</h3>
            <p class="text-navy-500 dark:text-slate-400 text-sm mb-4 leading-relaxed">Calendar view with daily, weekly, and monthly modes. Manage your intellectual flow and sync with Google Calendar.</p>
            <div class="bg-[#FAFAF9] dark:bg-slate-900 rounded-xl p-3 border border-[#E8EDF2] dark:border-slate-700">
              <div class="flex items-center justify-between mb-2"><span class="text-[10px] font-semibold text-navy-600 dark:text-slate-300">Jun 1 – 7, 2026</span><div class="flex gap-1"><span class="text-[8px] px-1.5 py-0.5 rounded bg-brand-500 text-white">Weekly</span><span class="text-[8px] px-1.5 py-0.5 rounded bg-[#E8EDF2] dark:bg-slate-700 text-navy-500 dark:text-slate-400">Daily</span></div></div>
              <div class="grid grid-cols-7 gap-1 text-center"><span class="text-[8px] text-slate-400">MON</span><span class="text-[8px] text-slate-400">TUE</span><span class="text-[8px] text-slate-400">WED</span><span class="text-[8px] text-slate-400">THU</span><span class="text-[8px] text-slate-400">FRI</span><span class="text-[8px] text-brand-500 font-bold border-b-2 border-brand-500">SAT</span><span class="text-[8px] text-slate-400">SUN</span></div>
            </div>
          </div>

          <!-- Weekly Targets -->
          <div class="gsap-hover bg-white dark:bg-slate-800 rounded-2xl p-6 border border-[#D9E2EC] dark:border-slate-700 shadow-sm relative overflow-hidden group stagger-fade-up">
            <div class="w-11 h-11 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 mb-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M6 20l-2 4 4-2M18 20l2 4-4-2M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4z" /></svg>
            </div>
            <h3 class="text-lg font-bold mb-2 text-navy-900 dark:text-slate-100">Weekly Targets</h3>
            <p class="text-navy-500 dark:text-slate-400 text-sm mb-4 leading-relaxed">Set measurable goals, break them into subtasks, and track completion rate week by week.</p>
            <div class="bg-[#FAFAF9] dark:bg-slate-900 rounded-xl p-3 border border-[#E8EDF2] dark:border-slate-700 space-y-2">
              <div class="flex items-center justify-between"><span class="text-[11px] font-medium text-navy-700 dark:text-slate-300">Ace This Week's Exams</span><span class="text-[10px] font-mono text-brand-500 font-semibold">0%</span></div>
              <div class="w-full bg-[#E8EDF2] dark:bg-slate-800 rounded-full h-1.5"><div class="h-full rounded-full bg-brand-500" style="width:0%"></div></div>
              <div class="space-y-1 pl-1"><div class="flex items-center gap-1.5"><div class="w-3 h-3 rounded border border-[#D9E2EC] dark:border-slate-600"></div><span class="text-[10px] text-navy-400 dark:text-slate-500">Final active recall self-quiz</span></div><div class="flex items-center gap-1.5"><div class="w-3 h-3 rounded border border-[#D9E2EC] dark:border-slate-600"></div><span class="text-[10px] text-navy-400 dark:text-slate-500">Review difficult concepts</span></div><div class="flex items-center gap-1.5"><div class="w-3 h-3 rounded border border-[#D9E2EC] dark:border-slate-600"></div><span class="text-[10px] text-navy-400 dark:text-slate-500">Complete 2 practice papers</span></div></div>
            </div>
          </div>

          <!-- Smart Notes -->
          <div class="gsap-hover bg-white dark:bg-slate-800 rounded-2xl p-6 border border-[#D9E2EC] dark:border-slate-700 shadow-sm relative overflow-hidden group stagger-fade-up">
            <div class="w-11 h-11 bg-amber-50 dark:bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 mb-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            </div>
            <h3 class="text-lg font-bold mb-2 text-navy-900 dark:text-slate-100">Smart Notes</h3>
            <p class="text-navy-500 dark:text-slate-400 text-sm mb-4 leading-relaxed">Rich text editor with pinning, search, categories, and export. Organize your lecture notes efficiently.</p>
            <div class="space-y-2">
              <div class="bg-brand-500 rounded-lg p-2.5"><p class="text-[11px] font-semibold text-white">Weekly Study Targets</p><p class="text-[9px] text-white/70 truncate">Review class notes for 15-20 min daily. Complete all homework 24h before due...</p></div>
              <div class="bg-white dark:bg-slate-700 rounded-lg p-2.5 border border-[#E8EDF2] dark:border-slate-600"><p class="text-[11px] font-semibold text-navy-700 dark:text-slate-200">Waterfall Methodology</p><p class="text-[9px] text-navy-400 dark:text-slate-400 truncate">A classic sequential design process used in software development lifecycle...</p></div>
              <div class="bg-white dark:bg-slate-700 rounded-lg p-2.5 border border-[#E8EDF2] dark:border-slate-600"><p class="text-[11px] font-semibold text-navy-700 dark:text-slate-200">Genetic Mutation Guide</p><p class="text-[9px] text-navy-400 dark:text-slate-400 truncate">A permanent alteration in the DNA sequence that makes up a gene...</p></div>
            </div>
          </div>

          <!-- Progress Analytics -->
          <div class="gsap-hover bg-gradient-to-br from-navy-800 to-navy-900 rounded-2xl p-6 border border-navy-700 shadow-sm relative overflow-hidden group stagger-fade-up">
            <div class="absolute -right-6 -bottom-6 w-28 h-28 bg-brand-500/10 rounded-full blur-xl"></div>
            <div class="relative z-10">
              <div class="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center text-brand-300 mb-4">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              <h3 class="text-lg font-bold mb-2 text-white">Progress Analytics</h3>
              <p class="text-navy-300 text-sm mb-4 leading-relaxed">SRL score trend, dimension analysis, and consistency tracking to measure your learning development.</p>
              <div class="space-y-2">
                <div class="flex items-center gap-2"><span class="text-[10px] text-slate-400 w-20">May 31</span><div class="flex-1 h-3 rounded bg-slate-700"><div class="h-full rounded bg-brand-500" style="width:100%"></div></div><span class="text-[10px] text-slate-300 font-mono w-8 text-right">100%</span></div>
                <div class="flex items-center gap-2"><span class="text-[10px] text-slate-400 w-20">May 31</span><div class="flex-1 h-3 rounded bg-slate-700"><div class="h-full rounded bg-violet-500" style="width:75%"></div></div><span class="text-[10px] text-slate-300 font-mono w-8 text-right">75%</span></div>
                <div class="flex items-center gap-2"><span class="text-[10px] text-slate-400 w-20">May 20</span><div class="flex-1 h-3 rounded bg-slate-700"><div class="h-full rounded bg-purple-500" style="width:66%"></div></div><span class="text-[10px] text-slate-300 font-mono w-8 text-right">66%</span></div>
              </div>
            </div>
          </div>

          <!-- Settings & Integrations -->
          <div class="gsap-hover bg-white dark:bg-slate-800 rounded-2xl p-6 border border-[#D9E2EC] dark:border-slate-700 shadow-sm relative overflow-hidden group stagger-fade-up">
            <div class="w-11 h-11 bg-rose-50 dark:bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-500 mb-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <h3 class="text-lg font-bold mb-2 text-navy-900 dark:text-slate-100">Settings & Integrations</h3>
            <p class="text-navy-500 dark:text-slate-400 text-sm mb-4 leading-relaxed">Customize your workspace with theme preferences, profile management, and Google Calendar sync.</p>
            <div class="space-y-2">
              <div class="flex items-center gap-3 bg-[#FAFAF9] dark:bg-slate-900 rounded-lg p-2.5 border border-[#E8EDF2] dark:border-slate-700"><div class="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-[#E8EDF2] dark:border-slate-600 flex items-center justify-center"><svg class="w-4 h-4 text-brand-500" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10z"/></svg></div><div class="flex-1"><p class="text-[11px] font-medium text-navy-700 dark:text-slate-200">Theme Preferences</p><p class="text-[9px] text-navy-400 dark:text-slate-500">Premium Light / Premium Dark</p></div><div class="w-3 h-3 rounded-full bg-brand-500"></div></div>
              <div class="flex items-center gap-3 bg-[#FAFAF9] dark:bg-slate-900 rounded-lg p-2.5 border border-[#E8EDF2] dark:border-slate-700"><div class="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-[#E8EDF2] dark:border-slate-600 flex items-center justify-center"><svg class="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/></svg></div><div class="flex-1"><p class="text-[11px] font-medium text-navy-700 dark:text-slate-200">Google Calendar</p><p class="text-[9px] text-emerald-600 dark:text-emerald-400">Connected</p></div></div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ═══ HOW IT WORKS ═══ -->
    <section id="how" class="py-20 relative bg-white dark:bg-slate-800 border-y border-[#D9E2EC] dark:border-slate-700">
      <div class="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div class="text-center mb-14 stagger-fade-up">
          <div class="inline-flex items-center bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 text-[10px] font-mono font-medium uppercase tracking-widest px-3 py-1.5 rounded-full mb-5 border border-brand-200 dark:border-brand-500/15">How It Works</div>
          <h2 class="text-[36px] font-semibold text-navy-900 dark:text-slate-100 mb-3">Mastery in three steps.</h2>
          <p class="text-navy-500 dark:text-slate-400 text-sm">We've codified the science of learning into a simple workflow.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8 lg:gap-16 relative stagger-fade-up">
          <div class="hidden md:block absolute top-12 left-[20%] right-[20%] h-px bg-brand-500/20 overflow-hidden">
            <div class="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-brand-500 to-transparent animate-moving-line"></div>
          </div>
          <div class="gsap-hover text-center relative">
            <div class="w-24 h-24 bg-white dark:bg-[#131E32] rounded-2xl border border-[#D9E2EC] dark:border-[#1E2D4A] flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg shadow-brand-500/5">
              <div><div class="text-2xl font-bold text-brand-500">01</div><div class="text-[8px] font-mono text-brand-400 uppercase tracking-widest">Plan</div></div>
            </div>
            <h3 class="text-base font-semibold mb-2 text-navy-900 dark:text-slate-100">Plan Your Sessions</h3>
            <p class="text-navy-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">Create focus sessions in your planner. Set targets for the week and let Lumora organize your schedule.</p>
          </div>
          <div class="gsap-hover text-center relative">
            <div class="w-24 h-24 bg-white dark:bg-[#131E32] rounded-2xl border border-[#D9E2EC] dark:border-[#1E2D4A] flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg shadow-brand-500/5">
              <div><div class="text-2xl font-bold text-brand-500">02</div><div class="text-[8px] font-mono text-brand-400 uppercase tracking-widest">Focus</div></div>
            </div>
            <h3 class="text-base font-semibold mb-2 text-navy-900 dark:text-slate-100">Focus & Take Notes</h3>
            <p class="text-navy-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">Work through your sessions and capture structured notes with bidirectional linking.</p>
          </div>
          <div class="gsap-hover text-center relative">
            <div class="w-24 h-24 bg-white dark:bg-[#131E32] rounded-2xl border border-[#D9E2EC] dark:border-[#1E2D4A] flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg shadow-brand-500/5">
              <div><div class="text-2xl font-bold text-brand-500">03</div><div class="text-[8px] font-mono text-brand-400 uppercase tracking-widest">Reflect</div></div>
            </div>
            <h3 class="text-base font-semibold mb-2 text-navy-900 dark:text-slate-100">Reflect & Improve</h3>
            <p class="text-navy-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">Review your progress analytics and get AI-powered recommendations to study smarter.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ TESTIMONIALS ═══ -->
    <section class="py-20 relative overflow-hidden">
      <div class="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div class="mb-12 stagger-fade-up">
          <div class="inline-flex items-center bg-navy-50 dark:bg-navy-500/10 text-navy-600 dark:text-navy-300 text-[10px] font-mono font-medium uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 border border-navy-200 dark:border-navy-500/15">Testimonials</div>
          <h2 class="text-[32px] font-semibold text-navy-900 dark:text-slate-100">Loved by students at 500+ universities.</h2>
        </div>
        <div class="grid md:grid-cols-3 gap-6 lg:gap-8 stagger-fade-up">
          <div class="gsap-hover bg-white dark:bg-slate-800 rounded-2xl p-6 border border-[#D9E2EC] dark:border-slate-700 shadow-sm">
            <div class="flex text-brand-500 gap-0.5 mb-4 text-xs">★★★★★</div>
            <p class="text-navy-600 dark:text-slate-300 text-sm italic mb-6 leading-relaxed">"Lumora changed how I approach my med school exams. The AI-suggested study schedules actually made me feel human again."</p>
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-[10px] font-bold">EJ</div>
              <div><p class="font-semibold text-navy-900 dark:text-slate-100 text-sm">Elena J.</p><p class="text-[10px] text-navy-400 dark:text-slate-500">Medical Student, Johns Hopkins</p></div>
            </div>
          </div>
          <div class="gsap-hover bg-white dark:bg-slate-800 rounded-2xl p-6 border border-[#D9E2EC] dark:border-slate-700 shadow-sm md:translate-y-4">
            <div class="flex text-brand-500 gap-0.5 mb-4 text-xs">★★★★★</div>
            <p class="text-navy-600 dark:text-slate-300 text-sm italic mb-6 leading-relaxed">"The visual planner is a lifesaver. Being able to see my entire semester and where my focus needs to be is so empowering."</p>
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-gradient-to-br from-navy-400 to-navy-600 flex items-center justify-center text-white text-[10px] font-bold">MT</div>
              <div><p class="font-semibold text-navy-900 dark:text-slate-100 text-sm">Marcus T.</p><p class="text-[10px] text-navy-400 dark:text-slate-500">Law Student, Yale</p></div>
            </div>
          </div>
          <div class="gsap-hover bg-white dark:bg-slate-800 rounded-2xl p-6 border border-[#D9E2EC] dark:border-slate-700 shadow-sm">
            <div class="flex text-brand-500 gap-0.5 mb-4 text-xs">★★★★★</div>
            <p class="text-navy-600 dark:text-slate-300 text-sm italic mb-6 leading-relaxed">"Finally, a tool that focuses on the learning process, not just checking boxes. The weekly targets keep me accountable."</p>
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-gradient-to-br from-brand-300 to-navy-400 flex items-center justify-center text-white text-[10px] font-bold">SC</div>
              <div><p class="font-semibold text-navy-900 dark:text-slate-100 text-sm">Sarah C.</p><p class="text-[10px] text-navy-400 dark:text-slate-500">Ph.D. Candidate, Stanford</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CTA ═══ -->
    <section class="py-20 relative">
      <div class="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div class="bg-gradient-to-br from-navy-800 to-navy-900 rounded-3xl p-12 text-center relative overflow-hidden stagger-fade-up">
          <div class="absolute inset-0 opacity-15">
            <div class="absolute top-0 left-0 w-48 h-48 bg-brand-500 rounded-full blur-[80px]"></div>
          </div>
          <div class="relative z-10">
            <h2 class="text-[32px] font-semibold text-white mb-4 tracking-tight">Ready to transform your study habits?</h2>
            <p class="text-navy-200 text-base mb-7 max-w-md mx-auto">Join thousands of students who have found their sanctuary of productivity.</p>
            <Link :href="route('register')" class="inline-block btn-primary font-bold px-10 py-4 rounded-xl mb-4 text-sm shadow-xl">Get Started for Free</Link>
            <p class="text-navy-400/50 text-[9px] font-mono uppercase tracking-widest">No credit card required · Free tier forever</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ FOOTER ═══ -->
    <footer class="border-t border-[#D9E2EC] dark:border-slate-700 pt-12 pb-8 bg-white dark:bg-slate-800">
      <div class="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div class="grid md:grid-cols-5 gap-8 mb-10">
          <div class="md:col-span-2">
            <div class="text-lg font-bold mb-2"><span class="text-brand-500">Lum</span><span class="text-navy-500 dark:text-navy-300">ora</span></div>
            <p class="text-navy-400 dark:text-slate-500 text-sm leading-relaxed max-w-xs">Your AI-powered self-regulated learning platform. Build better study habits with clarity.</p>
          </div>
          <div>
            <h4 class="text-navy-900 dark:text-slate-100 font-semibold mb-3 text-xs uppercase tracking-wider">Product</h4>
            <ul class="space-y-2 text-sm text-navy-400 dark:text-slate-500">
              <li><a href="#features" class="hover:text-brand-500 transition-colors">Features</a></li>
              <li><a href="#pricing" class="hover:text-brand-500 transition-colors">Pricing</a></li>
              <li><a href="#" class="hover:text-brand-500 transition-colors">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-navy-900 dark:text-slate-100 font-semibold mb-3 text-xs uppercase tracking-wider">Company</h4>
            <ul class="space-y-2 text-sm text-navy-400 dark:text-slate-500">
              <li><a href="#" class="hover:text-brand-500 transition-colors">About</a></li>
              <li><a href="#" class="hover:text-brand-500 transition-colors">Blog</a></li>
              <li><a href="#" class="hover:text-brand-500 transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-navy-900 dark:text-slate-100 font-semibold mb-3 text-xs uppercase tracking-wider">Legal</h4>
            <ul class="space-y-2 text-sm text-navy-400 dark:text-slate-500">
              <li><a href="#" class="hover:text-brand-500 transition-colors">Privacy</a></li>
              <li><a href="#" class="hover:text-brand-500 transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-[#D9E2EC] dark:border-slate-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p class="text-navy-400 dark:text-slate-500 text-xs">© 2024 Lumora AI. Designed for focused minds.</p>
          <div class="flex gap-4">
            <a href="#" class="text-navy-400 dark:text-slate-500 hover:text-brand-500 transition-colors"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg></a>
            <a href="#" class="text-navy-400 dark:text-slate-500 hover:text-brand-500 transition-colors"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg></a>
            <a href="#" class="text-navy-400 dark:text-slate-500 hover:text-brand-500 transition-colors"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg></a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { Head, Link } from '@inertiajs/vue3'
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const isDark = ref(false)

const toggleTheme = () => {
    isDark.value = !isDark.value
    if (isDark.value) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
    } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
    }
}

onMounted(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') {
        isDark.value = true
        document.documentElement.classList.add('dark')
    } else {
        isDark.value = false
        document.documentElement.classList.remove('dark')
    }

    // GSAP Scroll Animations
    gsap.from('.hero-content', {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    })

    gsap.from('.hero-mockup', {
      y: 60,
      opacity: 0,
      duration: 1.2,
      delay: 0.2,
      ease: 'power3.out'
    })

    // Stagger fade up sections
    gsap.utils.toArray('.stagger-fade-up').forEach((el) => {
      // Find children to stagger if the element has direct descendants we want to animate,
      // otherwise just animate the element itself.
      const children = el.children;
      if(children && children.length > 1 && !el.classList.contains('text-center')){
         gsap.from(children, {
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out'
          });
      } else {
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
          });
      }
    })

    // GSAP Hover Effects
    const hoverCards = document.querySelectorAll('.gsap-hover')
    hoverCards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -6,
          scale: 1.01,
          boxShadow: '0 12px 24px -10px rgba(0, 0, 0, 0.1)',
          duration: 0.3,
          ease: 'power2.out'
        })
      })
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          duration: 0.3,
          ease: 'power2.out'
        })
      })
    })
})
</script>

<style>
html {
  scroll-behavior: smooth;
}

::selection {
  background: #F97316;
  color: white;
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

.gradient-text {
  background: linear-gradient(135deg, #FB923C 0%, #F97316 50%, #EA580C 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.btn-primary {
  background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
  transition: all 0.3s ease;
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #EA580C 0%, #C2410C 100%);
  box-shadow: 0 4px 16px rgba(249, 115, 22, 0.25);
}

.glass {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

@keyframes movingLine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(300%); }
}

.animate-moving-line {
  animation: movingLine 3s linear infinite;
}
</style>
