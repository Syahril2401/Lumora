<template>
  <Head title="Welcome to Sanctuary - Lumora" />
  <div class="min-h-screen font-sans antialiased bg-[#FAFAF9] dark:bg-[#0C1222] text-[#102A43] dark:text-[#F0F4F8] flex items-center justify-center px-4 py-16 relative overflow-hidden transition-colors duration-300">
    <!-- Background decorations -->
    <div class="absolute top-10 right-[-5%] w-[500px] h-[500px] bg-brand-300/10 dark:bg-brand-500/5 rounded-full blur-[140px] pointer-events-none"></div>
    <div class="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-navy-300/8 dark:bg-navy-500/5 rounded-full blur-[120px] pointer-events-none"></div>

    <!-- Card Container -->
    <div class="relative z-10 w-full max-w-[1000px] bg-white dark:bg-dark-panel rounded-[40px] shadow-2xl border border-[#D9E2EC] dark:border-dark-border flex flex-col md:flex-row overflow-hidden">
      
      <!-- Left Section: Visuals & Quote -->
      <div class="w-full md:w-[45%] bg-[#F3F4F6] dark:bg-dark-surface p-12 flex flex-col justify-between relative overflow-hidden border-r border-[#D9E2EC] dark:border-dark-border">
        
        <div class="relative z-10 flex items-center gap-3 mb-12">
            <img src="/image/lumora_icon.svg" alt="Lumora logo" class="w-8 h-8 object-contain" />
            <span class="text-2xl font-bold tracking-tight text-brand-500">Lumora</span>
        </div>

        <div class="relative z-10 flex flex-col items-center">
            <!-- Relevant Abstract Focus Image -->
            <div class="w-full max-w-[320px] aspect-square rounded-[40px] overflow-hidden shadow-xl border border-white/20 dark:border-white/5 mb-10 rotate-[-2deg] group">
                <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" alt="Sanctuary of Focus" class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-tr from-brand-500/20 to-transparent mix-blend-overlay"></div>
            </div>
            
            <div class="relative px-6">
                <svg class="absolute top-[-10px] left-2 w-6 h-6 text-brand-500/30" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                <p class="text-navy-500 dark:text-text-muted font-medium italic text-center text-[15px] leading-relaxed max-w-[280px]">
                    "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice."
                </p>
            </div>
        </div>
        
        <!-- Subtle pattern overlay -->
        <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none">
            <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" stroke-width="0.5"/></pattern></defs>
                <rect width="100" height="100" fill="url(#grid)" />
            </svg>
        </div>
      </div>

      <!-- Right Section: Welcome Content -->
      <div class="w-full md:w-[55%] p-12 md:p-16 flex flex-col justify-center">
        <div class="mb-12">
            <div class="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-500/10 text-brand-500 px-4 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest mb-6 border border-brand-100 dark:border-brand-500/20">
                Step 01 / 03
            </div>
            <h1 class="text-[36px] md:text-[44px] font-bold text-navy-900 dark:text-text-primary leading-[1.15] mb-6">
                Welcome to your <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-400">Sanctuary of Focus.</span>
            </h1>
            <p class="text-navy-500 dark:text-text-muted text-lg leading-relaxed font-medium">
                Lumora is designed to help you transform your academic journey through AI-driven strategies and intentional habit building.
            </p>
        </div>

        <!-- Features -->
        <div class="space-y-8 mb-12">
            <div class="flex items-start gap-5 p-4 rounded-2xl hover:bg-[#FAFAF9] dark:hover:bg-dark-surface border border-transparent hover:border-[#E8EDF2] dark:hover:border-dark-border transition-all group">
                <div class="w-14 h-14 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0012 18.75c-1.03 0-1.9-.4-2.593-1.012l-.547-.547z" />
                    </svg>
                </div>
                <div>
                    <h3 class="text-lg font-bold text-navy-900 dark:text-text-primary mb-1">Intelligent Assistance</h3>
                    <p class="text-[14px] text-navy-500 dark:text-text-muted font-medium leading-relaxed">Personalized AI models that adapt to your unique study patterns.</p>
                </div>
            </div>

            <div class="flex items-start gap-5 p-4 rounded-2xl hover:bg-[#FAFAF9] dark:hover:bg-dark-surface border border-transparent hover:border-[#E8EDF2] dark:hover:border-dark-border transition-all group">
                <div class="w-14 h-14 bg-brand-50 dark:bg-brand-500/10 text-brand-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <div>
                    <h3 class="text-lg font-bold text-navy-900 dark:text-text-primary mb-1">Focused Sessions</h3>
                    <p class="text-[14px] text-navy-500 dark:text-text-muted font-medium leading-relaxed">Minimize distractions with curated productivity environments.</p>
                </div>
            </div>
        </div>

        <div class="flex items-center">
            <Link :href="route('onboarding.questionnaire')" 
                class="btn-primary text-white font-bold px-10 py-4 rounded-xl flex items-center gap-3 shadow-glow transition-all active:scale-[0.98]">
                Let's Begin
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </Link>
        </div>
      </div>
    </div>

    <!-- Simple Footer -->
    <div class="absolute bottom-8 inset-x-0 text-center">
        <p class="text-[10px] font-mono font-bold text-navy-400 dark:text-text-faint uppercase tracking-[0.2em] mb-4">Secured by Lumora Intelligence</p>
        <div class="flex justify-center gap-8 text-[12px] font-bold text-navy-500 dark:text-text-muted">
            <a href="#" class="hover:text-brand-500 transition-colors">Privacy Policy</a>
            <a href="#" class="hover:text-brand-500 transition-colors">Terms of Use</a>
            <a href="#" class="hover:text-brand-500 transition-colors">Contact Support</a>
        </div>
    </div>
  </div>
</template>

<script setup>
import { Head, Link, router } from '@inertiajs/vue3'
import { onMounted } from 'vue'

onMounted(() => {
    // If the user reaches this page, the server has allowed it (either new survey or retake)
    // Clear the completed flag so Questionnaire doesn't redirect them immediately
    localStorage.removeItem('lumora_survey_completed')

    // Theme sync
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') {
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

.btn-primary:hover {
  background: linear-gradient(135deg, #EA580C 0%, #C2410C 100%);
}

.shadow-glow {
  box-shadow: 0 4px 16px rgba(249, 115, 22, 0.25);
}
</style>
