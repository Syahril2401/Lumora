<template>
  <Head title="Build Better Study Habits with Clarity - Lumora" />
  <div class="min-h-screen font-sans antialiased overflow-x-hidden bg-[#FAFAF9] text-[#102A43] dark:bg-[#0C1222] dark:text-[#F0F4F8] transition-colors duration-300">

    <!-- ═══ NAVBAR ═══ -->
    <nav class="fixed top-0 inset-x-0 z-50 glass bg-white/85 dark:bg-[#111827]/85 border-b border-[#D9E2EC] dark:border-white/5">
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-10">
          <div class="flex items-center gap-3">
            <img src="/image/lumora_icon.svg" alt="Lumora logo" class="w-10 h-10 object-contain" />
            <span class="text-xl font-bold tracking-tight"><span class="text-brand-500">Lum</span><span class="text-navy-500 dark:text-navy-300">ora</span></span>
          </div>
          <ul class="hidden lg:flex gap-8 text-sm font-medium text-navy-500 dark:text-text-muted">
            <li><a href="#features" class="hover:text-navy-900 dark:hover:text-text-primary transition-colors">Features</a></li>
            <li><a href="#how" class="hover:text-navy-900 dark:hover:text-text-primary transition-colors">How it Works</a></li>
          </ul>
        </div>
        <div class="flex items-center gap-4">
          <!-- Dark/Light Mode Toggle -->
          <button @click="toggleTheme" class="relative w-14 h-7 rounded-full bg-navy-200 dark:bg-navy-700 transition-colors duration-300 focus:outline-none" aria-label="Toggle dark mode">
            <div :class="{'translate-x-[28px]': isDark, 'translate-x-0': !isDark}" class="absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white dark:bg-brand-500 shadow-md transition-transform duration-300 flex items-center justify-center">
              <!-- Sun icon -->
              <svg v-if="!isDark" class="w-3.5 h-3.5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <!-- Moon icon -->
              <svg v-if="isDark" class="w-3.5 h-3.5 text-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
          </button>
          <Link :href="route('login')" class="text-sm font-medium text-navy-500 dark:text-text-muted hover:text-navy-900 dark:hover:text-text-primary transition-colors">Log In</Link>
          <Link :href="route('register')" class="btn-primary text-sm font-semibold px-5 py-2.5 rounded-lg">Get Started</Link>
        </div>
      </div>
    </nav>

    <!-- ═══ HERO ═══ -->
    <section class="relative pt-28 pb-20 overflow-hidden">
      <div class="absolute top-10 right-0 w-[500px] h-[500px] bg-brand-300/10 dark:bg-brand-500/5 rounded-full blur-[140px]"></div>
      <div class="absolute bottom-0 left-[5%] w-[350px] h-[350px] bg-navy-300/8 dark:bg-navy-500/5 rounded-full blur-[100px]"></div>

      <div class="max-w-7xl mx-auto px-6 relative z-10">
        <div class="inline-flex items-center bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 text-[11px] font-mono font-medium uppercase tracking-widest px-4 py-2 rounded-full mb-10 border border-brand-200 dark:border-brand-500/15">
          <span class="w-1.5 h-1.5 bg-brand-500 rounded-full mr-2"></span>
          The Intelligent Sanctuary
        </div>

        <div class="grid lg:grid-cols-12 gap-8 items-start">
          <div class="lg:col-span-5 pt-2">
            <h1 class="text-[48px] font-semibold text-navy-900 dark:text-text-primary leading-[1.1] tracking-tight mb-6">
              Build better study habits with <span class="gradient-text">clarity.</span>
            </h1>
            <p class="text-navy-600 dark:text-text-secondary text-lg leading-relaxed mb-8 max-w-md">
              Plan focus sessions, track weekly targets, take structured notes, and get AI-powered study recommendations — all in one workspace.
            </p>
            <div class="flex flex-wrap gap-3 mb-8">
              <Link :href="route('register')" class="btn-primary font-semibold px-7 py-3.5 rounded-xl shadow-glow text-sm">Get Started for Free</Link>
              <a href="#how" class="flex items-center gap-2 bg-white dark:bg-white/[0.03] text-navy-700 dark:text-text-primary font-semibold px-5 py-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-white/[0.06] transition-all border border-[#D9E2EC] dark:border-dark-border text-sm">
                <svg class="w-4 h-4 text-brand-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                See how it works
              </a>
            </div>
            <div class="flex items-center gap-3">
              <div class="flex -space-x-2">
                <div class="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-500/15 border-2 border-white dark:border-dark-bg flex items-center justify-center text-brand-600 dark:text-brand-400 text-[9px] font-bold">EJ</div>
                <div class="w-8 h-8 rounded-full bg-navy-100 dark:bg-navy-500/15 border-2 border-white dark:border-dark-bg flex items-center justify-center text-navy-600 dark:text-navy-300 text-[9px] font-bold">MT</div>
                <div class="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/8 border-2 border-white dark:border-dark-bg flex items-center justify-center text-navy-400 dark:text-text-muted text-[9px] font-bold">+2k</div>
              </div>
              <div class="flex text-brand-500 gap-0.5 text-[10px]">★★★★★</div>
              <span class="text-navy-400 dark:text-text-faint text-xs">2,000+ students</span>
            </div>
          </div>

          <div class="lg:col-span-7 relative -mt-4">
            <div class="absolute -left-8 top-16 w-px h-32 bg-gradient-to-b from-brand-300/30 to-transparent rotate-12 dark:from-brand-500/20"></div>
            <div class="relative rounded-2xl overflow-hidden border border-[#D9E2EC] dark:border-dark-border shadow-xl animate-float bg-white dark:bg-dark-bg">
              <div class="bg-gray-50 dark:bg-dark-panel px-4 py-2.5 flex items-center gap-2 border-b border-[#E8EDF2] dark:border-dark-border">
                <div class="flex gap-1.5">
                  <div class="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                  <div class="w-2.5 h-2.5 rounded-full bg-yellow-400/80"></div>
                  <div class="w-2.5 h-2.5 rounded-full bg-green-400/80"></div>
                </div>
                <div class="flex-1 flex justify-center">
                  <div class="bg-white dark:bg-dark-surface rounded-md px-3 py-0.5 text-[9px] text-navy-400 dark:text-text-faint font-mono border border-[#E8EDF2] dark:border-dark-border">
                    app.lumora.ai/dashboard
                  </div>
                </div>
              </div>
              <div class="bg-white dark:bg-dark-bg p-5 space-y-3">
                <!-- Stats row -->
                <div class="grid grid-cols-4 gap-3">
                  <div class="bg-[#FAFAF9] dark:bg-dark-surface rounded-xl p-3 border border-[#E8EDF2] dark:border-dark-border">
                    <div class="text-[9px] text-navy-400 dark:text-text-faint font-mono uppercase tracking-wider mb-1">Focus Sessions</div>
                    <div class="text-lg font-bold text-brand-500">12</div>
                  </div>
                  <div class="bg-[#FAFAF9] dark:bg-dark-surface rounded-xl p-3 border border-[#E8EDF2] dark:border-dark-border">
                    <div class="text-[9px] text-navy-400 dark:text-text-faint font-mono uppercase tracking-wider mb-1">Efficiency</div>
                    <div class="text-lg font-bold text-emerald-500">87%</div>
                  </div>
                  <div class="bg-[#FAFAF9] dark:bg-dark-surface rounded-xl p-3 border border-[#E8EDF2] dark:border-dark-border">
                    <div class="text-[9px] text-navy-400 dark:text-text-faint font-mono uppercase tracking-wider mb-1">Deep Work</div>
                    <div class="text-lg font-bold text-navy-600 dark:text-text-primary">4.5h</div>
                  </div>
                  <div class="bg-[#FAFAF9] dark:bg-dark-surface rounded-xl p-3 border border-[#E8EDF2] dark:border-dark-border">
                    <div class="text-[9px] text-navy-400 dark:text-text-faint font-mono uppercase tracking-wider mb-1">Consistency</div>
                    <div class="text-lg font-bold text-brand-400">92%</div>
                  </div>
                </div>
                <!-- Weekly chart -->
                <div class="bg-[#FAFAF9] dark:bg-dark-surface rounded-xl p-3 border border-[#E8EDF2] dark:border-dark-border">
                  <div class="text-[9px] text-navy-400 dark:text-text-faint font-mono uppercase tracking-wider mb-2">Weekly Focus Map</div>
                  <div class="flex items-end gap-1.5 h-14">
                    <div class="flex-1 bg-brand-200 dark:bg-brand-500/20 rounded-t h-[60%]"></div>
                    <div class="flex-1 bg-brand-300 dark:bg-brand-500/30 rounded-t h-[80%]"></div>
                    <div class="flex-1 bg-brand-200 dark:bg-brand-500/20 rounded-t h-[45%]"></div>
                    <div class="flex-1 bg-brand-400 dark:bg-brand-500/50 rounded-t h-[100%]"></div>
                    <div class="flex-1 bg-brand-300 dark:bg-brand-500/30 rounded-t h-[70%]"></div>
                    <div class="flex-1 bg-brand-100 dark:bg-brand-500/10 rounded-t h-[30%]"></div>
                    <div class="flex-1 bg-brand-100 dark:bg-brand-500/10 rounded-t h-[20%]"></div>
                  </div>
                  <div class="flex justify-between mt-1.5 text-[8px] text-navy-300 dark:text-text-faint font-mono">
                    <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                  </div>
                </div>
                <!-- Today's sessions -->
                <div class="bg-[#FAFAF9] dark:bg-dark-surface rounded-xl p-3 border border-[#E8EDF2] dark:border-dark-border">
                  <div class="text-[9px] text-navy-400 dark:text-text-faint font-mono uppercase tracking-wider mb-2">Today's Focus Sessions</div>
                  <div class="space-y-1.5">
                    <div class="flex items-center gap-2 p-1.5 rounded-lg bg-brand-50 dark:bg-brand-500/5 border border-brand-100 dark:border-brand-500/10">
                      <div class="w-3.5 h-3.5 rounded border border-brand-500 flex items-center justify-center bg-brand-500">
                        <svg class="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      </div>
                      <span class="text-xs text-navy-500 dark:text-text-secondary line-through">Market Equilibrium Analysis</span>
                      <span class="ml-auto text-[9px] text-brand-500 font-mono">90m</span>
                    </div>
                    <div class="flex items-center gap-2 p-1.5 rounded-lg">
                      <div class="w-3.5 h-3.5 rounded border border-[#D9E2EC] dark:border-dark-border"></div>
                      <span class="text-xs text-navy-700 dark:text-text-primary">Supply & Demand Review</span>
                      <span class="ml-auto text-[9px] text-brand-500 font-mono">60m</span>
                    </div>
                    <div class="flex items-center gap-2 p-1.5 rounded-lg">
                      <div class="w-3.5 h-3.5 rounded border border-[#D9E2EC] dark:border-dark-border"></div>
                      <span class="text-xs text-navy-700 dark:text-text-primary">Microeconomics Quiz Prep</span>
                      <span class="ml-auto text-[9px] text-brand-500 font-mono">45m</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Floating badge -->
            <div class="absolute -bottom-2 -left-4 bg-white dark:bg-dark-panel rounded-lg p-2.5 border border-[#D9E2EC] dark:border-dark-border shadow-xl animate-float" style="animation-delay:-3s">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 bg-emerald-50 dark:bg-emerald-500/10 rounded-md flex items-center justify-center">
                  <svg class="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p class="text-[10px] font-semibold text-navy-700 dark:text-text-primary">All caught up!</p>
                  <p class="text-[8px] text-navy-400 dark:text-text-faint font-mono">Great work today</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Logo bar -->
        <div class="mt-14 flex flex-wrap justify-center items-center gap-6 opacity-25">
          <span class="text-sm font-semibold text-navy-700 dark:text-text-primary tracking-tight">MIT</span>
          <span class="text-navy-300 dark:text-text-faint text-xs">·</span>
          <span class="text-sm font-semibold text-navy-700 dark:text-text-primary tracking-tight">Stanford</span>
          <span class="text-navy-300 dark:text-text-faint text-xs">·</span>
          <span class="text-sm font-semibold text-navy-700 dark:text-text-primary tracking-tight">Harvard</span>
          <span class="text-navy-300 dark:text-text-faint text-xs">·</span>
          <span class="text-sm font-semibold text-navy-700 dark:text-text-primary tracking-tight">Oxford</span>
          <span class="text-navy-300 dark:text-text-faint text-xs">·</span>
          <span class="text-sm font-semibold text-navy-700 dark:text-text-primary tracking-tight">Cambridge</span>
          <span class="text-navy-300 dark:text-text-faint text-xs">·</span>
          <span class="text-sm font-semibold text-navy-700 dark:text-text-primary tracking-tight">NUS</span>
        </div>
      </div>
    </section>

    <!-- ═══ COMPARISON ═══ -->
    <section class="py-20 relative">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid lg:grid-cols-12 gap-10 items-start">
          <div class="lg:col-span-4">
            <div class="lg:sticky lg:top-24">
              <div class="inline-flex items-center bg-navy-50 dark:bg-navy-500/10 text-navy-600 dark:text-navy-300 text-[10px] font-mono font-medium uppercase tracking-widest px-3 py-1.5 rounded-full mb-5 border border-navy-200 dark:border-navy-500/15">Why Lumora</div>
              <h2 class="text-[36px] font-semibold text-navy-900 dark:text-text-primary mb-4 tracking-tight leading-tight">The end of academic chaos.</h2>
              <p class="text-navy-600 dark:text-text-secondary text-sm leading-relaxed">Traditional productivity tools are built for work, not learning. Lumora is designed for how students actually study.</p>
            </div>
          </div>
          <div class="lg:col-span-8 grid md:grid-cols-2 gap-6">
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-r from-navy-50 via-transparent to-navy-50 dark:from-navy-500/10 dark:via-transparent dark:to-navy-500/10 rounded-2xl pointer-events-none"></div>
              <div class="relative z-10 flex h-[270px] w-full items-start gap-6 p-6 bg-white dark:bg-dark-panel rounded-2xl border border-[#D9E2EC] dark:border-dark-border shadow-sm hover:shadow-lg transition-all duration-300 group-hover:translate-y-[-4px]">
                <div class="flex-shrink-0 w-12 h-12 bg-red-50 dark:bg-red-500/10 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div class="flex-1 space-y-3">
                  <h3 class="text-base font-semibold text-navy-900 dark:text-text-primary">The Old Way</h3>
                  <ul class="space-y-2">
                    <li class="flex gap-3 items-start text-navy-600 dark:text-text-muted text-sm"><span class="text-red-400/60 mt-0.5 text-xs">✕</span> Scattered notes across five different apps</li>
                    <li class="flex gap-3 items-start text-navy-600 dark:text-text-muted text-sm"><span class="text-red-400/60 mt-0.5 text-xs">✕</span> No feedback loop on study effectiveness</li>
                    <li class="flex gap-3 items-start text-navy-600 dark:text-text-muted text-sm"><span class="text-red-400/60 mt-0.5 text-xs">✕</span> Overwhelmed by monolithic to-do lists</li>
                    <li class="flex gap-3 items-start text-navy-600 dark:text-text-muted text-sm"><span class="text-red-400/60 mt-0.5 text-xs">✕</span> Burnout from poor time management</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-r from-brand-50 via-transparent to-brand-50 dark:from-brand-500/10 dark:via-transparent dark:to-brand-500/10 rounded-2xl pointer-events-none"></div>
              <div class="relative z-10 flex h-[270px] w-full items-start gap-6 p-6 bg-white dark:bg-dark-panel rounded-2xl border border-brand-200 dark:border-brand-500/15 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:translate-y-[-4px]">
                <div class="flex-shrink-0 w-12 h-12 bg-brand-50 dark:bg-brand-500/10 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div class="flex-1 space-y-3">
                  <h3 class="text-base font-semibold text-navy-900 dark:text-text-primary">The Lumora Way</h3>
                  <ul class="space-y-2">
                    <li class="flex gap-3 items-start text-navy-600 dark:text-text-muted text-sm"><span class="text-brand-500 mt-0.5 text-xs font-bold">✓</span> One unified sanctuary for every lecture and task</li>
                    <li class="flex gap-3 items-start text-navy-600 dark:text-text-muted text-sm"><span class="text-brand-500 mt-0.5 text-xs font-bold">✓</span> AI-driven study plans and recommendations</li>
                    <li class="flex gap-3 items-start text-navy-600 dark:text-text-muted text-sm"><span class="text-brand-500 mt-0.5 text-xs font-bold">✓</span> Weekly targets with reflective analytics</li>
                    <li class="flex gap-3 items-start text-navy-600 dark:text-text-muted text-sm"><span class="text-brand-500 mt-0.5 text-xs font-bold">✓</span> Structured notes with bidirectional linking</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ FEATURES ═══ -->
    <section id="features" class="py-20 relative">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex items-end justify-between mb-12">
          <div>
            <div class="inline-flex items-center bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 text-[10px] font-mono font-medium uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 border border-brand-200 dark:border-brand-500/15">Features</div>
            <h2 class="text-[36px] font-semibold text-navy-900 dark:text-text-primary tracking-tight">Everything you need to excel.</h2>
          </div>
          <p class="text-navy-500 dark:text-text-muted text-sm max-w-xs text-right hidden md:block">A complete toolkit designed around how students actually learn.</p>
        </div>

        <div class="grid lg:grid-cols-3 gap-4">
          <!-- Daily Planner -->
          <div class="bg-white dark:bg-dark-panel rounded-2xl p-6 border border-[#D9E2EC] dark:border-dark-border card-hover shadow-sm group">
            <div class="w-10 h-10 bg-brand-50 dark:bg-brand-500/10 rounded-xl flex items-center justify-center text-brand-500 mb-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2 text-navy-900 dark:text-text-primary">Daily Planner</h3>
            <p class="text-navy-500 dark:text-text-muted text-sm mb-4">Plan your focus sessions with an intelligent timeline. Sync with Google Calendar and let Lumora map out your day.</p>
            <div class="bg-[#FAFAF9] dark:bg-dark-surface rounded-lg p-3 border border-[#E8EDF2] dark:border-dark-border">
              <div class="space-y-2">
                <div class="flex items-center gap-2 text-xs"><span class="text-brand-500 font-mono w-10">09:00</span><span class="h-px flex-1 bg-brand-200 dark:bg-brand-500/20"></span><span class="text-navy-600 dark:text-text-secondary">Market Analysis</span></div>
                <div class="flex items-center gap-2 text-xs"><span class="text-brand-500 font-mono w-10">11:00</span><span class="h-px flex-1 bg-brand-200 dark:bg-brand-500/20"></span><span class="text-navy-600 dark:text-text-secondary">Supply & Demand</span></div>
                <div class="flex items-center gap-2 text-xs"><span class="text-navy-400 dark:text-text-faint font-mono w-10">14:00</span><span class="h-px flex-1 bg-[#E8EDF2] dark:border-dark-border"></span><span class="text-navy-400 dark:text-text-faint">Quiz Prep</span></div>
              </div>
            </div>
          </div>

          <!-- Weekly Targets -->
          <div class="bg-white dark:bg-dark-panel rounded-2xl p-6 border border-[#D9E2EC] dark:border-dark-border card-hover shadow-sm group">
            <div class="w-10 h-10 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 mb-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2 text-navy-900 dark:text-text-primary">Weekly Targets</h3>
            <p class="text-navy-500 dark:text-text-muted text-sm mb-4">Set measurable goals for each week. Track your progress with visual indicators and stay accountable.</p>
            <div class="space-y-3">
              <div>
                <div class="flex justify-between text-xs mb-1"><span class="text-navy-700 dark:text-text-secondary font-medium">Complete Chapter 5</span><span class="text-brand-500 font-mono">80%</span></div>
                <div class="w-full bg-[#E8EDF2] dark:bg-dark-bg rounded-full h-1.5"><div class="h-full rounded-full bg-brand-500" style="width:80%"></div></div>
              </div>
              <div>
                <div class="flex justify-between text-xs mb-1"><span class="text-navy-700 dark:text-text-secondary font-medium">Review 3 Notes</span><span class="text-emerald-500 font-mono">100%</span></div>
                <div class="w-full bg-[#E8EDF2] dark:bg-dark-bg rounded-full h-1.5"><div class="h-full rounded-full bg-emerald-500" style="width:100%"></div></div>
              </div>
              <div>
                <div class="flex justify-between text-xs mb-1"><span class="text-navy-700 dark:text-text-secondary font-medium">Practice Problems</span><span class="text-navy-400 dark:text-text-faint font-mono">45%</span></div>
                <div class="w-full bg-[#E8EDF2] dark:bg-dark-bg rounded-full h-1.5"><div class="h-full rounded-full bg-navy-400 dark:bg-navy-500" style="width:45%"></div></div>
              </div>
            </div>
          </div>

          <!-- Deep Notes -->
          <div class="bg-white dark:bg-dark-panel rounded-2xl p-6 border border-[#D9E2EC] dark:border-dark-border card-hover shadow-sm group">
            <div class="w-10 h-10 bg-navy-50 dark:bg-navy-500/10 rounded-xl flex items-center justify-center text-navy-500 mb-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2 text-navy-900 dark:text-text-primary">Deep Notes</h3>
            <p class="text-navy-500 dark:text-text-muted text-sm mb-4">Structured Markdown notes with bidirectional linking. Connect your lectures, thoughts, and references.</p>
            <div class="bg-[#FAFAF9] dark:bg-dark-surface rounded-lg p-3 border border-[#E8EDF2] dark:border-dark-border font-mono text-xs">
              <div class="text-navy-400 dark:text-text-faint mb-1"># Market Structures</div>
              <div class="text-navy-600 dark:text-text-secondary">Key differences between <span class="text-brand-500">[[perfect competition]]</span> and <span class="text-brand-500">[[monopolistic competition]]</span>...</div>
            </div>
          </div>

          <!-- Progress Analytics -->
          <div class="bg-white dark:bg-dark-panel rounded-2xl p-6 border border-[#D9E2EC] dark:border-dark-border card-hover shadow-sm group">
            <div class="w-10 h-10 bg-violet-50 dark:bg-violet-500/10 rounded-xl flex items-center justify-center text-violet-500 mb-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2 text-navy-900 dark:text-text-primary">Progress Analytics</h3>
            <p class="text-navy-500 dark:text-text-muted text-sm mb-4">Track focus sessions, task efficiency, deep work hours, and learning continuity with weekly insights.</p>
            <div class="grid grid-cols-2 gap-2">
              <div class="bg-[#FAFAF9] dark:bg-dark-surface rounded-lg p-2.5 border border-[#E8EDF2] dark:border-dark-border text-center">
                <div class="text-lg font-bold text-brand-500">12</div>
                <div class="text-[9px] text-navy-400 dark:text-text-faint">Sessions</div>
              </div>
              <div class="bg-[#FAFAF9] dark:bg-dark-surface rounded-lg p-2.5 border border-[#E8EDF2] dark:border-dark-border text-center">
                <div class="text-lg font-bold text-emerald-500">87%</div>
                <div class="text-[9px] text-navy-400 dark:text-text-faint">Efficiency</div>
              </div>
              <div class="bg-[#FAFAF9] dark:bg-dark-surface rounded-lg p-2.5 border border-[#E8EDF2] dark:border-dark-border text-center">
                <div class="text-lg font-bold text-navy-600 dark:text-text-primary">4.5h</div>
                <div class="text-[9px] text-navy-400 dark:text-text-faint">Deep Work</div>
              </div>
              <div class="bg-[#FAFAF9] dark:bg-dark-surface rounded-lg p-2.5 border border-[#E8EDF2] dark:border-dark-border text-center">
                <div class="text-lg font-bold text-brand-400">92%</div>
                <div class="text-[9px] text-navy-400 dark:text-text-faint">Consistency</div>
              </div>
            </div>
          </div>

          <!-- AI Study Buddy -->
          <div class="bg-white dark:bg-dark-panel rounded-2xl p-6 border border-[#D9E2EC] dark:border-dark-border card-hover shadow-sm group">
            <div class="w-10 h-10 bg-amber-50 dark:bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 mb-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2 text-navy-900 dark:text-text-primary">AI Study Buddy</h3>
            <p class="text-navy-500 dark:text-text-muted text-sm mb-4">Get personalized study recommendations, cognitive readiness insights, and smart scheduling suggestions.</p>
            <div class="bg-[#FAFAF9] dark:bg-dark-surface rounded-lg p-3 border border-[#E8EDF2] dark:border-dark-border">
              <div class="flex items-start gap-2">
                <div class="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-[10px] font-semibold text-navy-700 dark:text-text-primary">Study Insight</p>
                  <p class="text-[10px] text-navy-500 dark:text-text-muted">Great momentum! You've completed 2 sessions with 85% task efficiency.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Onboarding -->
          <div class="bg-white dark:bg-dark-panel rounded-2xl p-6 border border-[#D9E2EC] dark:border-dark-border card-hover shadow-sm group">
            <div class="w-10 h-10 bg-rose-50 dark:bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-500 mb-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2 text-navy-900 dark:text-text-primary">Smart Onboarding</h3>
            <p class="text-navy-500 dark:text-text-muted text-sm mb-4">Set up your sanctuary with a guided questionnaire. Get personalized recommendations based on your learning style.</p>
            <div class="flex items-center gap-2">
              <div class="flex-1 h-1.5 bg-[#E8EDF2] dark:bg-dark-bg rounded-full overflow-hidden">
                <div class="h-full bg-brand-500 rounded-full" style="width:60%"></div>
              </div>
              <span class="text-[10px] text-brand-500 font-mono">3/5</span>
            </div>
            <p class="text-[10px] text-navy-400 dark:text-text-faint mt-1.5">Sanctuary setup progress</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ HOW IT WORKS ═══ -->
    <section id="how" class="py-20 relative bg-white dark:bg-dark-panel border-y border-[#D9E2EC] dark:border-dark-border">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-14">
          <div class="inline-flex items-center bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 text-[10px] font-mono font-medium uppercase tracking-widest px-3 py-1.5 rounded-full mb-5 border border-brand-200 dark:border-brand-500/15">How It Works</div>
          <h2 class="text-[36px] font-semibold text-navy-900 dark:text-text-primary mb-3">Mastery in three steps.</h2>
          <p class="text-navy-500 dark:text-text-muted text-sm">We've codified the science of learning into a simple workflow.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8 relative">
          <div class="hidden md:block absolute top-12 left-[20%] right-[20%] h-px">
            <div class="w-full h-full bg-gradient-to-r from-brand-200 via-brand-300 to-navy-200 dark:from-brand-500/20 dark:via-brand-500/40 dark:to-navy-500/20"></div>
          </div>
          <div class="text-center relative">
            <div class="w-24 h-24 bg-white dark:bg-dark-surface rounded-2xl border border-[#D9E2EC] dark:border-dark-border flex items-center justify-center mx-auto mb-6 relative z-10 shadow-sm">
              <div>
                <div class="text-2xl font-bold text-brand-500">01</div>
                <div class="text-[8px] font-mono text-brand-400 uppercase tracking-widest">Plan</div>
              </div>
            </div>
            <h3 class="text-base font-semibold mb-2 text-navy-900 dark:text-text-primary">Plan Your Sessions</h3>
            <p class="text-navy-500 dark:text-text-muted text-sm leading-relaxed max-w-xs mx-auto">Create focus sessions in your planner. Set targets for the week and let Lumora organize your schedule.</p>
          </div>
          <div class="text-center relative">
            <div class="w-24 h-24 bg-white dark:bg-dark-surface rounded-2xl border border-[#D9E2EC] dark:border-dark-border flex items-center justify-center mx-auto mb-6 relative z-10 shadow-sm">
              <div>
                <div class="text-2xl font-bold text-brand-500">02</div>
                <div class="text-[8px] font-mono text-brand-400 uppercase tracking-widest">Focus</div>
              </div>
            </div>
            <h3 class="text-base font-semibold mb-2 text-navy-900 dark:text-text-primary">Focus & Take Notes</h3>
            <p class="text-navy-500 dark:text-text-muted text-sm leading-relaxed max-w-xs mx-auto">Work through your sessions and capture structured notes with bidirectional linking.</p>
          </div>
          <div class="text-center relative">
            <div class="w-24 h-24 bg-white dark:bg-dark-surface rounded-2xl border border-navy-200 dark:border-navy-500/20 flex items-center justify-center mx-auto mb-6 relative z-10 shadow-sm">
              <div>
                <div class="text-2xl font-bold text-navy-500 dark:text-navy-300">03</div>
                <div class="text-[8px] font-mono text-navy-400 uppercase tracking-widest">Reflect</div>
              </div>
            </div>
            <h3 class="text-base font-semibold mb-2 text-navy-900 dark:text-text-primary">Reflect & Improve</h3>
            <p class="text-navy-500 dark:text-text-muted text-sm leading-relaxed max-w-xs mx-auto">Review your progress analytics and get AI-powered recommendations to study smarter.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ TESTIMONIALS ═══ -->
    <section class="py-20 relative">
      <div class="max-w-7xl mx-auto px-6">
        <div class="mb-12">
          <div class="inline-flex items-center bg-navy-50 dark:bg-navy-500/10 text-navy-600 dark:text-navy-300 text-[10px] font-mono font-medium uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 border border-navy-200 dark:border-navy-500/15">Testimonials</div>
          <h2 class="text-[32px] font-semibold text-navy-900 dark:text-text-primary">Loved by students at 500+ universities.</h2>
        </div>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="bg-white dark:bg-dark-panel rounded-2xl p-6 border border-[#D9E2EC] dark:border-dark-border card-hover shadow-sm">
            <div class="flex text-brand-500 gap-0.5 mb-4 text-xs">★★★★★</div>
            <p class="text-navy-600 dark:text-text-secondary text-sm italic mb-6 leading-relaxed">"Lumora changed how I approach my med school exams. The AI-suggested study schedules actually made me feel human again."</p>
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-[10px] font-bold">EJ</div>
              <div>
                <p class="font-semibold text-navy-900 dark:text-text-primary text-sm">Elena J.</p>
                <p class="text-[10px] text-navy-400 dark:text-text-faint">Medical Student, Johns Hopkins</p>
              </div>
            </div>
          </div>
          <div class="bg-white dark:bg-dark-panel rounded-2xl p-6 border border-[#D9E2EC] dark:border-dark-border card-hover shadow-sm md:translate-y-4">
            <div class="flex text-brand-500 gap-0.5 mb-4 text-xs">★★★★★</div>
            <p class="text-navy-600 dark:text-text-secondary text-sm italic mb-6 leading-relaxed">"The visual planner is a lifesaver. Being able to see my entire semester and where my focus needs to be is so empowering."</p>
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-gradient-to-br from-navy-400 to-navy-600 flex items-center justify-center text-white text-[10px] font-bold">MT</div>
              <div>
                <p class="font-semibold text-navy-900 dark:text-text-primary text-sm">Marcus T.</p>
                <p class="text-[10px] text-navy-400 dark:text-text-faint">Law Student, Yale</p>
              </div>
            </div>
          </div>
          <div class="bg-white dark:bg-dark-panel rounded-2xl p-6 border border-[#D9E2EC] dark:border-dark-border card-hover shadow-sm">
            <div class="flex text-brand-500 gap-0.5 mb-4 text-xs">★★★★★</div>
            <p class="text-navy-600 dark:text-text-secondary text-sm italic mb-6 leading-relaxed">"Finally, a tool that focuses on the learning process, not just checking boxes. The weekly targets keep me accountable."</p>
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-gradient-to-br from-brand-300 to-navy-400 flex items-center justify-center text-white text-[10px] font-bold">SC</div>
              <div>
                <p class="font-semibold text-navy-900 dark:text-text-primary text-sm">Sarah C.</p>
                <p class="text-[10px] text-navy-400 dark:text-text-faint">Ph.D. Candidate, Stanford</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CTA ═══ -->
    <section class="py-20 relative">
      <div class="max-w-5xl mx-auto px-6">
        <div class="bg-gradient-to-br from-navy-800 to-navy-900 rounded-3xl p-12 text-center relative overflow-hidden">
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
    <footer class="border-t border-[#D9E2EC] dark:border-dark-border pt-12 pb-8 bg-white dark:bg-dark-panel">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid md:grid-cols-5 gap-8 mb-10">
          <div class="md:col-span-2">
            <div class="text-lg font-bold mb-2"><span class="text-brand-500">Lum</span><span class="text-navy-500 dark:text-navy-300">ora</span></div>
            <p class="text-navy-400 dark:text-text-faint text-sm leading-relaxed max-w-xs">Your AI-powered self-regulated learning platform. Build better study habits with clarity.</p>
          </div>
          <div>
            <h4 class="text-navy-900 dark:text-text-primary font-semibold mb-3 text-xs uppercase tracking-wider">Product</h4>
            <ul class="space-y-2 text-sm text-navy-400 dark:text-text-faint">
              <li><a href="#features" class="hover:text-brand-500 transition-colors">Features</a></li>
              <li><a href="#pricing" class="hover:text-brand-500 transition-colors">Pricing</a></li>
              <li><a href="#" class="hover:text-brand-500 transition-colors">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-navy-900 dark:text-text-primary font-semibold mb-3 text-xs uppercase tracking-wider">Company</h4>
            <ul class="space-y-2 text-sm text-navy-400 dark:text-text-faint">
              <li><a href="#" class="hover:text-brand-500 transition-colors">About</a></li>
              <li><a href="#" class="hover:text-brand-500 transition-colors">Blog</a></li>
              <li><a href="#" class="hover:text-brand-500 transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-navy-900 dark:text-text-primary font-semibold mb-3 text-xs uppercase tracking-wider">Legal</h4>
            <ul class="space-y-2 text-sm text-navy-400 dark:text-text-faint">
              <li><a href="#" class="hover:text-brand-500 transition-colors">Privacy</a></li>
              <li><a href="#" class="hover:text-brand-500 transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-[#D9E2EC] dark:border-dark-border pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p class="text-navy-400 dark:text-text-faint text-xs">© 2024 Lumora AI. Designed for focused minds.</p>
          <div class="flex gap-4">
            <!-- Social icons (from original template) -->
            <a href="#" class="text-navy-400 dark:text-text-faint hover:text-brand-500 transition-colors"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
            <a href="#" class="text-navy-400 dark:text-text-faint hover:text-brand-500 transition-colors"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
            <a href="#" class="text-navy-400 dark:text-text-faint hover:text-brand-500 transition-colors"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { Head, Link } from '@inertiajs/vue3'
import { ref, onMounted } from 'vue'

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
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        isDark.value = true
        document.documentElement.classList.add('dark')
    } else {
        isDark.value = false
        document.documentElement.classList.remove('dark')
    }
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

.btn-outline {
  border: 1.5px solid #F97316;
  color: #F97316;
  transition: all 0.3s ease;
}

.btn-outline:hover {
  background: #FFF7ED;
}

.dark .btn-outline:hover {
  background: rgba(249, 115, 22, 0.1);
}

.card-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
  transform: translateY(-2px);
}

.glass {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
</style>
