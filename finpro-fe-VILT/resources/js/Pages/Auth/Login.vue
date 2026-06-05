<template>
  <Head title="Login - Lumora" />
  <div class="min-h-screen font-sans antialiased bg-[#FAFAF9] dark:bg-[#0C1222] text-[#102A43] dark:text-[#F0F4F8] flex flex-col items-center justify-center px-4 relative overflow-hidden transition-colors duration-300">
    <!-- Decorative background elements -->
    <div class="absolute top-10 right-0 w-[500px] h-[500px] bg-brand-300/10 dark:bg-brand-500/5 rounded-full blur-[140px]"></div>
    <div class="absolute bottom-0 left-[5%] w-[350px] h-[350px] bg-navy-300/8 dark:bg-navy-500/5 rounded-full blur-[100px]"></div>

    <!-- Main Content -->
    <div class="relative z-10 w-full max-w-[500px] flex flex-col items-center">
      <!-- Logo & Header -->
      <div class="text-center mb-10">
        <Link :href="route('landing')" class="flex items-center justify-center gap-3 mb-4 group">
          <img src="/image/lumora_icon.svg" alt="Lumora logo" class="w-12 h-12 object-contain group-hover:scale-105 transition-transform" />
          <span class="text-3xl font-bold tracking-tight"><span class="text-brand-500">Lum</span><span class="text-navy-500 dark:text-navy-300">ora</span></span>
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
                type="password" 
                placeholder="••••••••"
                class="w-full bg-[#FAFAF9] dark:bg-dark-surface border border-[#E8EDF2] dark:border-dark-border focus:bg-white dark:focus:bg-dark-bg focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl py-3 pl-12 pr-10 text-navy-700 dark:text-text-primary font-medium transition-all duration-300 outline-none"
                required
              >
            </div>
            <div class="flex justify-end pt-1">
              <a href="#" class="text-xs font-semibold text-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Forgot Password?</a>
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

          <!-- Divider -->
          <div class="relative flex items-center justify-center py-4">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-[#E8EDF2] dark:border-dark-border"></div>
            </div>
            <span class="relative bg-white dark:bg-dark-panel px-4 text-[9px] font-mono text-navy-300 dark:text-text-faint uppercase tracking-widest">or continue with</span>
          </div>

          <!-- Google Login -->
          <button type="button" class="w-full bg-[#FAFAF9] dark:bg-dark-surface hover:bg-white dark:hover:bg-dark-bg border border-[#E8EDF2] dark:border-dark-border text-navy-700 dark:text-text-primary font-semibold py-3 rounded-xl flex items-center justify-center gap-3 transition-all">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Login with Google
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
</template>

<script setup>
import { Head, useForm, Link } from '@inertiajs/vue3'
import { onMounted } from 'vue'

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
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
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
