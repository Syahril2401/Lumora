<template>
  <Head title="Register - Lumora" />
  <div class="min-h-screen font-sans antialiased bg-[#FAFAF9] dark:bg-[#0C1222] text-[#102A43] dark:text-[#F0F4F8] flex flex-col items-center justify-center px-4 relative overflow-hidden transition-colors duration-300 py-12">
    <!-- Decorative background elements -->
    <div class="absolute top-10 left-[-5%] w-[500px] h-[500px] bg-brand-300/10 dark:bg-brand-500/5 rounded-full blur-[140px]"></div>
    <div class="absolute bottom-0 right-[-5%] w-[350px] h-[350px] bg-navy-300/8 dark:bg-navy-500/5 rounded-full blur-[100px]"></div>

    <!-- Main Content -->
    <div class="relative z-10 w-full max-w-[500px] flex flex-col items-center">
      <!-- Logo & Header -->
      <div class="text-center mb-8">
        <Link :href="route('landing')" class="flex items-center justify-center gap-3 mb-4 group">
          <img src="/image/lumora_icon.svg" alt="Lumora logo" class="w-12 h-12 object-contain group-hover:scale-105 transition-transform" />
          <span class="text-3xl font-bold tracking-tight"><span class="text-brand-500">Lum</span><span class="text-navy-500 dark:text-navy-300">ora</span></span>
        </Link>
        <p class="text-navy-500 dark:text-text-muted font-medium">Create your account to start your journey.</p>
      </div>

      <!-- Register Card -->
      <div class="w-full bg-white dark:bg-dark-panel rounded-3xl p-8 md:p-10 shadow-xl border border-[#D9E2EC] dark:border-dark-border">
        <form @submit.prevent="submit" class="space-y-5">
          <!-- Full Name Field -->
          <div class="space-y-2">
            <label class="block text-[11px] font-mono text-navy-400 dark:text-text-faint uppercase tracking-widest ml-1">Full Name</label>
            <div class="relative group">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400 dark:text-text-faint">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <input 
                v-model="form.name"
                type="text" 
                placeholder="Enter your name"
                class="w-full bg-[#FAFAF9] dark:bg-dark-surface border border-[#E8EDF2] dark:border-dark-border focus:bg-white dark:focus:bg-dark-bg focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl py-3 pl-12 pr-4 text-navy-700 dark:text-text-primary font-medium transition-all duration-300 outline-none"
                required
              >
            </div>
            <p v-if="errors.name" class="text-xs text-red-500 ml-1">{{ errors.name }}</p>
          </div>

          <!-- Email Field -->
          <div class="space-y-2">
            <label class="block text-[11px] font-mono text-navy-400 dark:text-text-faint uppercase tracking-widest ml-1">Email Address</label>
            <div class="relative group">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400 dark:text-text-faint">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <input 
                v-model="form.email"
                type="email" 
                placeholder="example@lumora.edu"
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
                placeholder="Create a password"
                class="w-full bg-[#FAFAF9] dark:bg-dark-surface border border-[#E8EDF2] dark:border-dark-border focus:bg-white dark:focus:bg-dark-bg focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl py-3 pl-12 pr-4 text-navy-700 dark:text-text-primary font-medium transition-all duration-300 outline-none"
                required
              >
            </div>
            <p v-if="errors.password" class="text-xs text-red-500 ml-1">{{ errors.password }}</p>
          </div>

          <!-- Confirm Password Field -->
          <div class="space-y-2">
            <label class="block text-[11px] font-mono text-navy-400 dark:text-text-faint uppercase tracking-widest ml-1">Confirm Password</label>
            <div class="relative group">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400 dark:text-text-faint">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </span>
              <input 
                v-model="form.password_confirmation"
                type="password" 
                placeholder="Repeat your password"
                class="w-full bg-[#FAFAF9] dark:bg-dark-surface border border-[#E8EDF2] dark:border-dark-border focus:bg-white dark:focus:bg-dark-bg focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl py-3 pl-12 pr-4 text-navy-700 dark:text-text-primary font-medium transition-all duration-300 outline-none"
                required
              >
            </div>
          </div>

          <!-- Terms -->
          <p class="text-center text-xs text-navy-400 dark:text-text-faint leading-relaxed px-4 pt-2">
            By registering, you agree to our 
            <a href="#" class="text-brand-500 font-bold hover:text-brand-600 transition-colors">Terms of Service</a> and 
            <a href="#" class="text-brand-500 font-bold hover:text-brand-600 transition-colors">Privacy Policy</a>.
          </p>

          <!-- Register Button -->
          <button 
            type="submit"
            :disabled="form.processing"
            class="w-full btn-primary text-white font-bold py-3.5 rounded-xl shadow-glow transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 mt-2"
          >
            <span v-if="form.processing">Creating account...</span>
            <span v-else>Register</span>
          </button>
        </form>

        <p class="text-center mt-8 text-sm font-medium text-navy-500 dark:text-text-muted">
          Already have an account? 
          <Link :href="route('login')" class="text-brand-500 font-bold hover:text-brand-600 transition-colors">Login</Link>
        </p>
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
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

function submit() {
  form.post(route('register'), {
    onError: () => form.reset('password', 'password_confirmation'),
  })
}

onMounted(() => {
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
