<template>
  <Head title="Login - Lumora" />
  <transition appear name="slide-fade">
    <div class="min-h-screen font-sans antialiased bg-[#FAFAF9] dark:bg-[#0C1222] text-[#102A43] dark:text-[#F0F4F8] flex flex-col items-center justify-center px-4 relative overflow-hidden transition-colors duration-300">
      <!-- Decorative background elements -->
    <div class="absolute top-10 right-0 w-[500px] h-[500px] bg-brand-300/10 dark:bg-brand-500/5 rounded-full blur-[140px]"></div>
    <div class="absolute bottom-0 left-[5%] w-[350px] h-[350px] bg-navy-300/8 dark:bg-navy-500/5 rounded-full blur-[100px]"></div>

    <!-- Back Button -->
    <Link :href="route('landing')" class="absolute top-6 left-6 md:top-10 md:left-10 z-20 flex items-center gap-2 text-navy-500 hover:text-brand-500 dark:text-text-muted dark:hover:text-brand-400 font-bold text-sm transition-colors group">
      <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
      Back to Home
    </Link>

    <!-- Main Content -->
    <div class="relative z-10 w-full max-w-[500px] flex flex-col items-center">
      <!-- Logo & Header -->
      <div class="text-center mb-10">
        <Link :href="route('landing')" class="flex items-center justify-center gap-3 mb-4 group">
          <img src="/image/lumora_icon.svg" alt="Lumora logo" class="w-12 h-12 object-contain group-hover:scale-105 transition-transform" />
          <span class="text-3xl font-bold tracking-tight text-brand-500">Lumora</span>
        </Link>
        <p class="text-navy-500 dark:text-text-muted font-medium">Return to your Intelligent Sanctuary</p>
      </div>

      <!-- Login Card -->
      <div class="w-full bg-white dark:bg-dark-panel rounded-3xl p-10 md:p-12 shadow-xl border border-[#D9E2EC] dark:border-dark-border">
        <form @submit.prevent="submit" class="space-y-6">
          <!-- Email Field -->
          <div class="space-y-2">
            <label class="block text-[11px] font-mono text-navy-400 dark:text-text-faint uppercase tracking-widest ml-1">Email/Username</label>
            <div class="relative group">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400 dark:text-text-faint">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </span>
              <input 
                v-model="form.email"
                type="email" 
                placeholder="student@lumora.edu"
                class="w-full bg-[#FAFAF9] dark:bg-dark-surface border border-[#E8EDF2] dark:border-dark-border focus:bg-white dark:focus:bg-dark-bg focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl py-3 pl-12 pr-4 text-navy-700 dark:text-text-primary font-medium transition-all duration-300 outline-none"
                required
              >
            </div>
            <p v-if="errors.email" class="text-xs text-red-500 ml-1">{{ errors.email }}</p>
          </div>

          <!-- Password Field -->
          <div class="space-y-2">
            <label class="block text-[11px] font-mono text-navy-400 dark:text-text-faint uppercase tracking-widest ml-1">Password</label>
            <div class="relative group">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400 dark:text-text-faint">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input 
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'" 
                placeholder="••••••••"
                class="w-full bg-[#FAFAF9] dark:bg-dark-surface border border-[#E8EDF2] dark:border-dark-border focus:bg-white dark:focus:bg-dark-bg focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl py-3 pl-12 pr-12 text-navy-700 dark:text-text-primary font-medium transition-all duration-300 outline-none"
                required
              >
              <button 
                type="button" 
                @click="showPassword = !showPassword" 
                class="absolute right-4 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600 dark:text-text-faint dark:hover:text-text-primary transition-colors focus:outline-none"
              >
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Login Button -->
          <button 
            type="submit"
            :disabled="form.processing"
            class="w-full btn-primary text-white font-bold py-3.5 rounded-xl shadow-glow transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 mt-4"
          >
            <span v-if="form.processing">Logging in...</span>
            <span v-else>Login</span>
          </button>

        </form>

        <p class="text-center mt-8 text-sm font-medium text-navy-500 dark:text-text-muted">
          New to the sanctuary? 
          <Link :href="route('register')" class="text-brand-500 font-bold hover:text-brand-600 transition-colors">Join now</Link>
        </p>
      </div>

      <!-- Footer Links -->
      <div class="mt-10 flex gap-8 text-xs font-medium text-navy-400 dark:text-text-faint">
        <a href="#" class="hover:text-brand-500 transition-colors">Privacy Policy</a>
        <a href="#" class="hover:text-brand-500 transition-colors">Terms of Service</a>
        <a href="#" class="hover:text-brand-500 transition-colors">Contact Support</a>
      </div>
    </div>
  </div>
  </transition>
</template>

<script setup>
import { Head, useForm, Link } from '@inertiajs/vue3'
import { onMounted, ref } from 'vue'

const showPassword = ref(false)

defineProps({
  errors: { type: Object, default: () => ({}) },
})

const form = useForm({
  email: '',
  password: '',
})

function submit() {
  form.post(route('login'), {
    onError: () => form.reset('password'),
  })
}

onMounted(() => {
    // Respect existing theme
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
