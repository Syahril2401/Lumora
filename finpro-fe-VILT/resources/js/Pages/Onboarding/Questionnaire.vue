<template>
  <Head title="Questionnaire - Lumora" />
  <div class="min-h-screen font-sans antialiased bg-[#FAFAF9] dark:bg-[#0C1222] text-[#102A43] dark:text-[#F0F4F8] pb-20 transition-colors duration-300 relative overflow-hidden">
    
    <!-- Background Elements -->
    <div class="absolute top-10 right-0 w-[500px] h-[500px] bg-brand-300/10 dark:bg-brand-500/5 rounded-full blur-[140px] pointer-events-none"></div>
    <div class="absolute bottom-0 left-[5%] w-[350px] h-[350px] bg-navy-300/8 dark:bg-navy-500/5 rounded-full blur-[100px] pointer-events-none"></div>

    <!-- Navbar -->
    <nav class="fixed top-0 inset-x-0 z-50 glass bg-white/85 dark:bg-[#111827]/85 border-b border-[#D9E2EC] dark:border-white/5 h-16 flex items-center justify-between px-8 transition-colors duration-300">
      <Link :href="route('landing')" class="flex items-center gap-3">
        <img src="/image/lumora_icon.svg" alt="Lumora logo" class="w-8 h-8 object-contain" />
        <span class="text-xl font-bold tracking-tight text-brand-500">Lumora</span>
      </Link>
      <button class="text-sm font-bold text-navy-500 dark:text-text-muted hover:text-navy-900 dark:hover:text-text-primary transition-colors">Save & Exit</button>
    </nav>

    <div class="max-w-[1200px] mx-auto pt-32 px-6 flex flex-col lg:flex-row gap-12 relative z-10">
      <!-- Main Content -->
      <div class="flex-1">
        <!-- Progress Stepper -->
        <div class="mb-16">
            <p class="text-[11px] font-mono text-navy-400 dark:text-text-faint uppercase tracking-widest mb-2">Progress</p>
            <h2 class="text-lg font-bold text-brand-500 mb-8">Step 0{{ currentSegmentIndex + 1 }}: {{ currentSegment.title }}</h2>
            
            <div class="relative">
                <div class="absolute top-1/2 left-0 w-full h-[2px] bg-[#E8EDF2] dark:bg-dark-border -translate-y-1/2"></div>
                <div class="absolute top-1/2 left-0 h-[2px] bg-brand-500 -translate-y-1/2 transition-all duration-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" 
                    :style="{ width: (currentSegmentIndex / (segments.length - 1) * 100) + '%' }"></div>
                
                <div class="relative flex justify-between">
                    <div v-for="(seg, i) in segments" :key="i" class="flex flex-col items-center">
                        <div class="w-4 h-4 rounded-full border-2 transition-all duration-500 z-10"
                            :class="i <= currentSegmentIndex ? 'bg-brand-500 border-brand-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'bg-white dark:bg-dark-surface border-[#D9E2EC] dark:border-dark-border'">
                        </div>
                        <span class="absolute mt-6 text-[10px] font-mono uppercase tracking-widest whitespace-nowrap transition-colors"
                            :class="i === currentSegmentIndex ? 'text-brand-500 font-bold' : 'text-navy-400 dark:text-text-faint'">
                            {{ seg.shortTitle }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Question Title -->
        <Transition name="fade" mode="out-in">
          <div :key="currentQuestion.id" class="text-center mb-12 min-h-[140px]">
              <h1 class="text-[26px] md:text-[30px] font-bold text-navy-900 dark:text-text-primary leading-tight mb-2 px-4 transition-colors">
                  {{ currentQuestion.text }}
              </h1>
              <p class="text-lg text-brand-500 font-medium mb-4 px-4">
                  {{ currentQuestion.textId }}
              </p>
              <p class="text-sm text-navy-500 dark:text-text-muted font-medium max-w-xl mx-auto mt-6">
                  Understanding your rhythm helps us tailor the sanctuary to your natural productivity flow.
              </p>
          </div>
        </Transition>

        <!-- Options Grid -->
        <div class="space-y-4 max-w-xl mx-auto">
            <button v-for="(opt, idx) in likertOptions" :key="idx"
                @click="setAnswer(currentQuestion.id, opt.value)"
                class="w-full flex items-center gap-6 p-5 rounded-2xl bg-white dark:bg-dark-panel border-2 transition-all duration-300 group"
                :class="answers[currentQuestion.id] === opt.value ? 'border-brand-500 shadow-[0_4px_20px_rgba(249,115,22,0.15)] dark:shadow-[0_4px_20px_rgba(249,115,22,0.1)]' : 'border-[#E8EDF2] dark:border-dark-border hover:border-brand-300 dark:hover:border-brand-500/50'">
                
                <div class="w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
                    :class="answers[currentQuestion.id] === opt.value ? 'bg-brand-500 text-white shadow-glow' : 'bg-[#F3F4F6] dark:bg-dark-bg text-navy-400 dark:text-text-faint group-hover:text-brand-400'">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="opt.iconPath" />
                    </svg>
                </div>

                <div class="text-left flex-1">
                    <h3 class="text-lg font-bold transition-colors" :class="answers[currentQuestion.id] === opt.value ? 'text-brand-500' : 'text-navy-900 dark:text-text-primary'">
                        {{ opt.title }}
                    </h3>
                    <p class="text-[13px] font-medium" :class="answers[currentQuestion.id] === opt.value ? 'text-brand-400' : 'text-navy-500 dark:text-text-muted'">{{ opt.desc }}</p>
                </div>

                <div v-if="answers[currentQuestion.id] === opt.value" class="w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center text-white">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            </button>
        </div>

        <!-- Navigation -->
        <div class="mt-16 flex items-center justify-between max-w-xl mx-auto">
            <button @click="prevQuestion" v-if="!isFirstQuestion" class="flex items-center gap-2 text-navy-400 dark:text-text-faint font-bold hover:text-brand-500 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7 7-7"/></svg>
                Previous Question
            </button>
            <div v-else></div>

            <button @click="handleNext"
                :disabled="!answers[currentQuestion.id] || submitting"
                class="btn-primary disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:!shadow-none disabled:!text-slate-500 disabled:cursor-not-allowed text-white font-bold px-12 py-4 rounded-xl shadow-glow transition-all active:scale-[0.98]">
                {{ isLastQuestionInAll ? (submitting ? 'Analyzing...' : 'View Results') : 'Continue' }}
            </button>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="w-full lg:w-[320px] space-y-6 relative">
        <Transition name="fade" mode="out-in">
            <div :key="'card-'+currentSegment.id" class="bg-white dark:bg-dark-panel rounded-3xl p-8 border border-[#D9E2EC] dark:border-dark-border shadow-lg relative overflow-hidden group">
                <div class="w-12 h-12 bg-brand-50 dark:bg-brand-500/10 text-brand-500 rounded-xl flex items-center justify-center mb-6">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="segmentContent[currentSegment.id].icon" />
                    </svg>
                </div>
                <h3 class="text-xl font-bold text-navy-900 dark:text-text-primary mb-3">{{ segmentContent[currentSegment.id].title }}</h3>
                <p class="text-navy-500 dark:text-text-muted text-[14px] leading-relaxed font-medium">
                    {{ segmentContent[currentSegment.id].desc }}
                </p>
                <div class="absolute top-[-20px] right-[-20px] w-24 h-24 bg-brand-500/10 rounded-full blur-2xl group-hover:bg-brand-500/20 transition-colors pointer-events-none"></div>
            </div>
        </Transition>

        <Transition name="fade" mode="out-in">
            <div :key="'img-'+currentSegment.id" class="rounded-3xl overflow-hidden shadow-lg border border-[#D9E2EC] dark:border-dark-border rotate-1 hover:rotate-0 transition-transform duration-500">
                <img :src="segmentContent[currentSegment.id].image" alt="Reflection" class="w-full h-[280px] object-cover">
            </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Head, Link } from '@inertiajs/vue3'
import { ref, computed, onMounted, watch } from 'vue'
import { router } from '@inertiajs/vue3'
import axios from 'axios'

// ─── Data & Logic ────────────────────────────────────────────────────────────

const props = defineProps({
  questions: { type: Array, default: () => [] }
})

const currentSegmentIndex = ref(0)
const currentQuestionIndex = ref(0)
const answers = ref({})
const submitting = ref(false)

// Segments matching DB categories
const segments = [
    { id: 'planning', shortTitle: 'Planning', title: 'Planning Habits' },
    { id: 'time_management', shortTitle: 'Time Management', title: 'Time Management' },
    { id: 'cognitive', shortTitle: 'Cognitive', title: 'Cognitive Strategies' },
    { id: 'reflection', shortTitle: 'Reflection', title: 'Self-Reflection' },
]

const segmentContent = {
    'planning': {
        icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
        title: 'Strategic Planning',
        desc: 'Good planning is half the battle won. We learn how you prepare so we can help you build bulletproof study sessions.',
        image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&q=80&w=300&h=400'
    },
    'time_management': {
        icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
        title: 'Time Mastery',
        desc: 'Time is your most valuable asset. Understanding your rhythm helps Lumora schedule optimal focus blocks and breaks.',
        image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&q=80&w=300&h=400'
    },
    'cognitive': {
        icon: 'M13 10V3L4 14h7v7l9-11h-7z',
        title: 'Cognitive Flow',
        desc: 'Everyone absorbs information differently. Your answers help us tailor the learning methods that naturally fit your brain.',
        image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=300&h=400'
    },
    'reflection': {
        icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0012 18.75c-1.03 0-1.9-.4-2.593-1.012l-.547-.547z',
        title: 'Reflective Learning',
        desc: 'Taking a moment to reflect on your habits is the first step toward a more focused academic life. We use these insights to calibrate your cycles.',
        image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=300&h=400'
    }
}

// Exact 20 questions with English first and Indonesian translation
const allQuestions = [
    // Planning
    { id: '11111111-0001-0001-0001-000000000001', segId: 'planning', text: 'I make a study schedule before starting to study', textId: 'Saya membuat jadwal belajar sebelum mulai belajar' },
    { id: '11111111-0001-0001-0001-000000000002', segId: 'planning', text: 'I set clear learning goals', textId: 'Saya menetapkan target belajar yang jelas' },
    { id: '11111111-0001-0001-0001-000000000003', segId: 'planning', text: 'I plan the materials to be studied', textId: 'Saya merencanakan materi yang akan dipelajari' },
    { id: '11111111-0001-0001-0001-000000000004', segId: 'planning', text: 'I determine a routine study time', textId: 'Saya menentukan waktu belajar secara rutin' },
    { id: '11111111-0001-0001-0001-000000000005', segId: 'planning', text: 'I prepare study materials before starting', textId: 'Saya mempersiapkan kebutuhan belajar sebelum mulai' },
    
    // Time Management
    { id: '11111111-0001-0001-0002-000000000006', segId: 'time_management', text: 'I manage my study time well', textId: 'Saya mengatur waktu belajar dengan baik' },
    { id: '11111111-0001-0001-0002-000000000007', segId: 'time_management', text: 'I complete tasks on time', textId: 'Saya menyelesaikan tugas tepat waktu' },
    { id: '11111111-0001-0001-0002-000000000008', segId: 'time_management', text: 'I rarely procrastinate', textId: 'Saya jarang menunda pekerjaan' },
    { id: '11111111-0001-0001-0002-000000000009', segId: 'time_management', text: 'I prioritize important tasks', textId: 'Saya memprioritaskan tugas yang penting' },
    { id: '11111111-0001-0001-0002-000000000010', segId: 'time_management', text: 'I am consistent with my study schedule', textId: 'Saya konsisten dengan jadwal belajar saya' },
    
    // Cognitive
    { id: '11111111-0001-0001-0003-000000000011', segId: 'cognitive', text: 'I use specific study methods (taking notes, summarizing, etc.)', textId: 'Saya menggunakan metode belajar tertentu (mencatat, merangkum, dll)' },
    { id: '11111111-0001-0001-0003-000000000012', segId: 'cognitive', text: 'I try various study methods to find an effective one', textId: 'Saya mencoba berbagai cara belajar untuk menemukan yang efektif' },
    { id: '11111111-0001-0001-0003-000000000013', segId: 'cognitive', text: 'I understand the material, not just memorize it', textId: 'Saya memahami materi, bukan hanya menghafal' },
    { id: '11111111-0001-0001-0003-000000000014', segId: 'cognitive', text: 'I review material to strengthen understanding', textId: 'Saya mengulang materi untuk memperkuat pemahaman' },
    { id: '11111111-0001-0001-0003-000000000015', segId: 'cognitive', text: 'I connect new material with previous knowledge', textId: 'Saya menghubungkan materi dengan pengetahuan sebelumnya' },
    
    // Reflection
    { id: '11111111-0001-0001-0004-000000000016', segId: 'reflection', text: 'I check if I understand the material', textId: 'Saya mengecek apakah saya memahami materi' },
    { id: '11111111-0001-0001-0004-000000000017', segId: 'reflection', text: 'I realize when I don\'t understand something', textId: 'Saya menyadari ketika saya tidak memahami sesuatu' },
    { id: '11111111-0001-0001-0004-000000000018', segId: 'reflection', text: 'I evaluate my study methods', textId: 'Saya mengevaluasi cara belajar saya' },
    { id: '11111111-0001-0001-0004-000000000019', segId: 'reflection', text: 'I improve my learning strategy if it is less effective', textId: 'Saya memperbaiki strategi belajar jika kurang efektif' },
    { id: '11111111-0001-0001-0004-000000000020', segId: 'reflection', text: 'I learn from previous mistakes', textId: 'Saya belajar dari kesalahan sebelumnya' },
]

const likertOptions = [
    { value: 1, title: 'Never', desc: 'Sangat Tidak Setuju / Tidak Pernah', iconPath: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636' },
    { value: 2, title: 'Rarely', desc: 'Tidak Setuju / Jarang', iconPath: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { value: 3, title: 'Sometimes', desc: 'Netral / Kadang-kadang', iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { value: 4, title: 'Often', desc: 'Setuju / Sering', iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    { value: 5, title: 'Always', desc: 'Sangat Setuju / Selalu', iconPath: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z' },
]

// ─── Computed ─────────────────────────────────────────────────────────────

const currentSegment = computed(() => segments[currentSegmentIndex.value] || segments[0])

const currentSegmentQuestions = computed(() => {
    return allQuestions.filter(q => q.segId === currentSegment.value.id)
})

const currentQuestion = computed(() => {
    return currentSegmentQuestions.value[currentQuestionIndex.value] || { text: 'Loading...', id: 'loading' }
})

const isFirstQuestion = computed(() => {
    return currentSegmentIndex.value === 0 && currentQuestionIndex.value === 0
})

const isLastQuestionInSegment = computed(() => {
    return currentQuestionIndex.value === currentSegmentQuestions.value.length - 1
})

const isLastQuestionInAll = computed(() => {
    return currentSegmentIndex.value === segments.length - 1 && isLastQuestionInSegment.value
})

// ─── Methods ───────────────────────────────────────────────────────────────

function setAnswer(questionId, value) {
    if (questionId === 'loading') return
    answers.value[questionId] = value
}

function handleNext() {
    if (!answers.value[currentQuestion.value.id]) return

    if (isLastQuestionInSegment.value) {
        if (currentSegmentIndex.value < segments.length - 1) {
            currentSegmentIndex.value++
            currentQuestionIndex.value = 0
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
            submitAll()
        }
    } else {
        currentQuestionIndex.value++
    }
}

function prevQuestion() {
    if (currentQuestionIndex.value > 0) {
        currentQuestionIndex.value--
    } else if (currentSegmentIndex.value > 0) {
        currentSegmentIndex.value--
        // Go to last question of previous segment
        const prevSegId = segments[currentSegmentIndex.value].id
        currentQuestionIndex.value = allQuestions.filter(q => q.segId === prevSegId).length - 1
    }
}

async function submitAll() {
    submitting.value = true
    try {
        const payload = Object.keys(answers.value).map(id => ({
            question_id: id,
            answer_value: answers.value[id]
        }))

        router.post(route('onboarding.submit'), {
            answers: payload
        }, {
            onStart: () => { submitting.value = true },
            onFinish: () => { submitting.value = false },
            onSuccess: (page) => {
                // Cache the result for other components like Dashboard
                if (page.props.result) {
                    sessionStorage.setItem('lumora_result', JSON.stringify(page.props.result))
                }
                localStorage.removeItem('lumora_survey_progress')
            },
            onError: (errors) => {
                console.error('Submit error:', errors)
            }
        })
    } catch (err) {
        console.error('Unexpected error:', err)
    }
}

// ─── Persistence ───────────────────────────────────────────────────────────

const STORAGE_KEY = 'lumora_survey_progress'

function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        answers: answers.value,
        segIdx: currentSegmentIndex.value,
        qIdx: currentQuestionIndex.value
    }))
}

onMounted(() => {
    if (localStorage.getItem('lumora_survey_completed') === 'true') {
        router.replace(route('dashboard'))
        return
    }

    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
        try {
            const parsed = JSON.parse(saved)
            answers.value = parsed.answers || {}
            currentSegmentIndex.value = parsed.segIdx || 0
            currentQuestionIndex.value = parsed.qIdx || 0
        } catch (e) {
            console.error('Error parsing progress:', e)
        }
    }
    
    // Theme sync
    const themeSaved = localStorage.getItem('theme')
    if (themeSaved === 'dark') {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
})

watch([answers, currentSegmentIndex, currentQuestionIndex], saveProgress, { deep: true })

</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.fade-enter-from { opacity: 0; transform: translateY(10px); }
.fade-leave-to { opacity: 0; transform: translateY(-10px); }

.btn-primary {
  background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
  transition: all 0.3s ease;
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #EA580C 0%, #C2410C 100%);
}

.btn-primary:disabled {
  background: #CBD5E1 !important; /* slate-300 */
}
.dark .btn-primary:disabled {
  background: #334155 !important; /* slate-700 */
}

.shadow-glow {
  box-shadow: 0 4px 16px rgba(249, 115, 22, 0.25);
}

.glass {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
</style>
