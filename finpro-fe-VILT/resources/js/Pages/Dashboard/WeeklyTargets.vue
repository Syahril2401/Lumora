<template>
  <DashboardLayout 
    :showBuddy="true"
    buddyContextTitle="Target Insight" 
    :buddyContextMessage="insightMessage"
  >
    <!-- Header -->
    <div class="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h1 class="text-3xl font-black text-navy-900 dark:text-text-primary mb-2">Weekly Targets</h1>
        <p class="text-navy-500 dark:text-text-muted font-medium">Set measurable goals and track completion.</p>
      </div>
      <button @click="openTargetModal()" class="bg-gradient-to-r from-brand-500 to-brand-400 hover:from-brand-400 hover:to-brand-500 text-white px-6 py-3 rounded-2xl font-bold shadow-glow transition-all active:scale-95 whitespace-nowrap flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
        Add Weekly Target
      </button>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      <div class="bg-white dark:bg-dark-panel p-6 rounded-[28px] border border-[#D9E2EC] dark:border-dark-border shadow-sm">
        <p class="text-[10px] font-black text-navy-400 dark:text-text-faint uppercase tracking-widest mb-2">Total Targets</p>
        <p class="text-3xl font-black text-navy-900 dark:text-text-primary">{{ summary.total_targets || 0 }}</p>
      </div>
      <div class="bg-white dark:bg-dark-panel p-6 rounded-[28px] border border-[#D9E2EC] dark:border-dark-border shadow-sm">
        <p class="text-[10px] font-black text-navy-400 dark:text-text-faint uppercase tracking-widest mb-2">Completed</p>
        <p class="text-3xl font-black text-emerald-500">{{ summary.completed_targets || 0 }}</p>
      </div>
      <div class="bg-white dark:bg-dark-panel p-6 rounded-[28px] border border-[#D9E2EC] dark:border-dark-border shadow-sm">
        <p class="text-[10px] font-black text-navy-400 dark:text-text-faint uppercase tracking-widest mb-2">Completion Rate</p>
        <p class="text-3xl font-black text-brand-500">{{ Math.round(summary.completion_rate || 0) }}%</p>
      </div>
      <div class="bg-white dark:bg-dark-panel p-6 rounded-[28px] border border-[#D9E2EC] dark:border-dark-border shadow-sm">
        <p class="text-[10px] font-black text-navy-400 dark:text-text-faint uppercase tracking-widest mb-2">Primary Focus</p>
        <p class="text-lg font-black text-navy-900 dark:text-text-primary truncate">{{ summary.primary_focus || 'No focus yet' }}</p>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="space-y-4">
      <div v-for="i in 3" :key="i" class="h-32 bg-[#E8EDF2] dark:bg-dark-border rounded-[28px] animate-pulse"></div>
    </div>

    <!-- Empty State -->
    <div v-else-if="targets.length === 0" class="bg-[#FAFAF9] dark:bg-dark-surface border-2 border-dashed border-[#D9E2EC] dark:border-dark-border p-12 rounded-[40px] text-center">
      <div class="flex justify-center mb-4 text-brand-500">
        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
      </div>
      <p class="text-navy-500 dark:text-text-muted font-bold mb-2">No targets set yet.</p>
      <p class="text-navy-400 dark:text-text-faint text-sm">Create your first weekly target to start tracking your learning progress.</p>
      <button @click="openTargetModal()" class="mt-4 text-brand-500 font-bold hover:underline">+ Create Target</button>
    </div>

    <!-- Target Cards -->
    <div v-else class="space-y-6">
      <div v-for="target in targets" :key="target.id" class="bg-white dark:bg-dark-panel p-6 rounded-[28px] border border-[#D9E2EC] dark:border-dark-border shadow-sm hover:border-brand-200 dark:hover:border-brand-500/30 transition-all">
        <!-- Target Header -->
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2 flex-wrap">
              <span class="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md" :class="priorityClass(target.priority)">{{ target.priority }}</span>
              <span class="text-[10px] font-black bg-brand-50 dark:bg-brand-500/10 text-brand-500 uppercase tracking-widest px-2 py-1 rounded-md">{{ target.focus_dimension }}</span>
              <span class="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md" :class="statusBadge(target.status)">{{ target.status?.replace('_', ' ') }}</span>
            </div>
            <h4 class="text-lg font-black text-navy-900 dark:text-text-primary">{{ target.title }}</h4>
            <p v-if="target.description" class="text-sm font-medium text-navy-500 dark:text-text-muted mt-1">{{ target.description }}</p>
            <p v-if="target.due_date" class="text-xs font-bold text-navy-400 dark:text-text-faint mt-1">Due: {{ formatDate(target.due_date) }}</p>
          </div>
          <div class="flex items-center gap-2 ml-4">
            <button @click="openTargetModal(target)" class="w-9 h-9 rounded-xl bg-[#E8EDF2] dark:bg-white/10 text-navy-500 dark:text-navy-300 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 dark:hover:text-white flex items-center justify-center transition-all shadow-sm border border-[#D9E2EC] dark:border-white/10 hover:border-brand-500 hover:shadow-md" title="Edit Target">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            </button>
            <a :href="`/dashboard/planner?target_id=${target.id}`" class="w-9 h-9 rounded-xl bg-[#E8EDF2] dark:bg-white/10 text-navy-500 dark:text-navy-300 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 dark:hover:text-white flex items-center justify-center transition-all shadow-sm border border-[#D9E2EC] dark:border-white/10 hover:border-sky-500 hover:shadow-md" title="Schedule Session">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </a>
            <a :href="`/dashboard/notes?target_id=${target.id}`" class="w-9 h-9 rounded-xl bg-[#E8EDF2] dark:bg-white/10 text-navy-500 dark:text-navy-300 hover:bg-purple-500 hover:text-white dark:hover:bg-purple-500 dark:hover:text-white flex items-center justify-center transition-all shadow-sm border border-[#D9E2EC] dark:border-white/10 hover:border-purple-500 hover:shadow-md" title="Add Reflection">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
            </a>
            <button @click="confirmDeleteTarget(target.id)" class="w-9 h-9 rounded-xl bg-[#E8EDF2] dark:bg-white/10 text-navy-500 dark:text-navy-300 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 dark:hover:text-white flex items-center justify-center transition-all shadow-sm border border-[#D9E2EC] dark:border-white/10 hover:border-rose-500 hover:shadow-md" title="Delete Target">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="mb-4">
          <div class="flex items-center justify-between mb-1">
            <span class="text-[10px] font-black text-navy-400 dark:text-text-faint uppercase tracking-widest">Progress</span>
            <span class="text-sm font-black text-navy-900 dark:text-text-primary">{{ target.progress || 0 }}%</span>
          </div>
          <div class="w-full h-2 bg-[#E8EDF2] dark:bg-dark-border rounded-full overflow-hidden">
            <div class="h-full rounded-full transition-all duration-500" :class="target.progress >= 100 ? 'bg-emerald-500' : 'bg-brand-500'" :style="{ width: `${target.progress || 0}%` }"></div>
          </div>
        </div>

        <!-- Subtasks -->
        <div class="space-y-2">
          <div v-for="sub in target.subtasks" :key="sub.id" class="flex items-center gap-3 group">
            <button @click="toggleSubtask(target.id, sub.id)" class="w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all"
              :class="sub.is_completed ? 'bg-emerald-500 border-emerald-500' : 'border-[#D9E2EC] dark:border-dark-border hover:border-brand-500'">
              <svg v-if="sub.is_completed" class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
            </button>
            <span class="text-sm font-bold flex-1" :class="sub.is_completed ? 'text-navy-400 dark:text-text-faint line-through' : 'text-navy-900 dark:text-text-primary'">{{ sub.title }}</span>
            <button @click="deleteSubtask(target.id, sub.id)" class="opacity-0 group-hover:opacity-100 w-6 h-6 rounded text-navy-400 dark:text-text-faint hover:text-rose-500 flex items-center justify-center transition-all">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <!-- Add Subtask -->
          <div class="flex items-center gap-3 pt-2">
            <input v-model="newSubtask[target.id]" @keydown.enter="addSubtask(target.id)" placeholder="Add subtask..." class="flex-1 text-sm font-bold text-navy-900 dark:text-text-primary bg-transparent border-b border-dashed border-[#D9E2EC] dark:border-dark-border py-1 focus:border-brand-500 outline-none transition-colors placeholder:text-navy-300 dark:placeholder:text-text-faint">
            <button v-if="newSubtask[target.id]" @click="addSubtask(target.id)" class="text-brand-500 font-black text-xs hover:underline">Add</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Target Modal -->
    <Teleport to="body">
      <div v-if="showTargetModal" class="fixed inset-0 bg-[#0B1120]/60 dark:bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click.self="showTargetModal = false">
        <div class="bg-white dark:bg-dark-panel rounded-[32px] p-8 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto animate-slide-up border border-[#D9E2EC] dark:border-dark-border">
          <h2 class="text-xl font-black text-navy-900 dark:text-text-primary mb-6">{{ editingTarget ? 'Edit Target' : 'Add Weekly Target' }}</h2>
          <div v-if="formError" class="mb-4 p-3 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-xl text-sm font-bold flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            {{ formError }}
          </div>
          <form @submit.prevent="saveTarget" class="space-y-5">
            <div>
              <label class="block text-[11px] font-black text-navy-400 dark:text-text-faint uppercase tracking-widest mb-2">Title *</label>
              <input v-model="targetForm.title" required class="w-full bg-[#FAFAF9] dark:bg-dark-surface border border-[#D9E2EC] dark:border-dark-border rounded-2xl py-3 px-5 text-sm font-bold text-navy-900 dark:text-text-primary focus:bg-white dark:focus:bg-dark-panel focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all" placeholder="e.g. Complete Chapter 5">
            </div>
            <div>
              <label class="block text-[11px] font-black text-navy-400 dark:text-text-faint uppercase tracking-widest mb-2">Description</label>
              <textarea v-model="targetForm.description" rows="2" class="w-full bg-[#FAFAF9] dark:bg-dark-surface border border-[#D9E2EC] dark:border-dark-border rounded-2xl py-3 px-5 text-sm font-bold text-navy-900 dark:text-text-primary focus:bg-white dark:focus:bg-dark-panel focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none resize-none transition-all"></textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-[11px] font-black text-navy-400 dark:text-text-faint uppercase tracking-widest mb-2">Focus Dimension</label>
                <select v-model="targetForm.focus_dimension" class="w-full bg-[#FAFAF9] dark:bg-dark-surface border border-[#D9E2EC] dark:border-dark-border rounded-2xl py-3 px-5 text-sm font-bold text-navy-900 dark:text-text-primary focus:bg-white dark:focus:bg-dark-panel focus:border-brand-500 outline-none appearance-none">
                  <option v-for="d in dimensions" :key="d" :value="d">{{ d }}</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-black text-navy-400 dark:text-text-faint uppercase tracking-widest mb-2">Priority</label>
                <select v-model="targetForm.priority" class="w-full bg-[#FAFAF9] dark:bg-dark-surface border border-[#D9E2EC] dark:border-dark-border rounded-2xl py-3 px-5 text-sm font-bold text-navy-900 dark:text-text-primary focus:bg-white dark:focus:bg-dark-panel focus:border-brand-500 outline-none appearance-none">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-[11px] font-black text-navy-400 dark:text-text-faint uppercase tracking-widest mb-2">Due Date</label>
              <input v-model="targetForm.due_date" type="date" class="w-full bg-[#FAFAF9] dark:bg-dark-surface border border-[#D9E2EC] dark:border-dark-border rounded-2xl py-3 px-5 text-sm font-bold text-navy-900 dark:text-text-primary focus:bg-white dark:focus:bg-dark-panel focus:border-brand-500 outline-none transition-all [color-scheme:light] dark:[color-scheme:dark]">
            </div>
            <!-- Initial Subtasks (create mode only) -->
            <div v-if="!editingTarget">
              <label class="block text-[11px] font-black text-navy-400 dark:text-text-faint uppercase tracking-widest mb-2">Initial Subtasks</label>
              <div v-for="(st, i) in targetForm.subtasks" :key="i" class="flex items-center gap-2 mb-2">
                <input v-model="st.title" class="flex-1 bg-[#FAFAF9] dark:bg-dark-surface border border-[#D9E2EC] dark:border-dark-border rounded-xl py-2 px-4 text-sm font-bold text-navy-900 dark:text-text-primary focus:border-brand-500 outline-none" :placeholder="`Subtask ${i + 1}`">
                <button type="button" @click="targetForm.subtasks.splice(i, 1)" class="text-navy-400 dark:text-text-faint hover:text-rose-500 font-bold">&times;</button>
              </div>
              <button type="button" @click="targetForm.subtasks.push({ title: '' })" class="text-sm text-brand-500 font-bold hover:underline">+ Add subtask</button>
            </div>
            <div class="flex gap-3 pt-4">
              <button type="button" @click="showTargetModal = false" class="flex-1 bg-[#E8EDF2] dark:bg-dark-surface text-navy-600 dark:text-text-primary py-3 rounded-2xl font-bold hover:bg-[#D9E2EC] dark:hover:bg-dark-border transition-colors">Cancel</button>
              <button type="submit" :disabled="isSaving" class="flex-1 btn-primary text-white py-3 rounded-2xl font-bold transition-all disabled:opacity-50 flex items-center justify-center">
                <svg v-if="isSaving" class="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                {{ isSaving ? 'Saving...' : (editingTarget ? 'Update' : 'Create') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Delete Target Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showDeleteModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-[#0B1120]/60 dark:bg-black/60 backdrop-blur-sm" @click="showDeleteModal = false"></div>
          
          <div class="bg-white dark:bg-dark-panel border border-[#D9E2EC] dark:border-dark-border rounded-[32px] p-8 w-full max-w-md relative z-10 shadow-2xl animate-scale-up text-center">
            <div class="w-20 h-20 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-rose-100 dark:border-rose-500/20">
              <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </div>
            
            <h3 class="text-2xl font-black text-navy-900 dark:text-text-primary mb-3">Delete Target</h3>
            <p class="text-navy-500 dark:text-text-muted text-sm font-medium mb-8 leading-relaxed">Are you sure you want to delete this target and all its subtasks? This action cannot be undone.</p>
            
            <div class="flex items-center gap-4">
              <button @click="showDeleteModal = false" class="flex-1 py-3.5 px-4 rounded-xl text-sm font-bold text-navy-500 dark:text-text-muted hover:text-navy-900 dark:hover:text-text-primary hover:bg-[#E8EDF2] dark:hover:bg-white/5 transition-all border border-transparent">
                Cancel
              </button>
              <button @click="executeDelete" class="flex-1 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-rose-500 hover:bg-rose-600 transition-all shadow-md shadow-rose-500/20 hover:shadow-rose-500/30">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Toast -->
    <Teleport to="body">
      <div v-if="toast" class="fixed bottom-6 right-6 z-50 bg-navy-900 dark:bg-dark-panel border border-navy-800 dark:border-dark-border shadow-2xl rounded-2xl p-4 flex items-center gap-3 animate-slide-up">
        <div class="w-8 h-8 rounded-lg flex items-center justify-center" :class="toast.type === 'error' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'">
          <svg v-if="toast.type === 'error'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
        </div>
        <span class="text-sm font-bold text-white">{{ toast.message }}</span>
      </div>
    </Teleport>

  </DashboardLayout>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { usePage } from '@inertiajs/vue3'
import DashboardLayout from '@/Layouts/DashboardLayout.vue'
import { targetsApi, setWorkspaceToken } from '@/services/workspaceApi'

const page = usePage()
const isLoading = ref(true)
const isSaving = ref(false)
const showTargetModal = ref(false)
const showDeleteModal = ref(false)
const targetToDelete = ref(null)
const editingTarget = ref(null)
const targets = ref([])
const summary = ref({})
const newSubtask = reactive({})
const toast = ref(null)
const formError = ref('')

const dimensions = ['General', 'Planning', 'Time Management', 'Cognitive Strategy', 'Reflection']

const targetForm = ref({
  title: '', description: '', focus_dimension: 'General',
  priority: 'medium', due_date: '', subtasks: []
})

const insightMessage = computed(() => {
  if (targets.value.length === 0) return 'Create your first weekly target to make your learning goals measurable.'
  const totalSubs = targets.value.reduce((a, t) => a + (t.subtasks?.length || 0), 0)
  if (totalSubs < 3) return 'Break large goals into smaller subtasks to make progress easier to track.'
  return `You have ${targets.value.length} targets with ${totalSubs} subtasks. Keep completing them!`
})

onMounted(async () => {
  setWorkspaceToken(page.props.go_token)
  await fetchTargets()
  window.addEventListener('target-updated', fetchTargets)
})

onUnmounted(() => {
  window.removeEventListener('target-updated', fetchTargets)
})

async function fetchTargets() {
  isLoading.value = true
  try {
    const res = await targetsApi.getTargets()
    targets.value = res.data || []
    summary.value = res.summary || {}
  } catch (err) {
    console.error('Failed to fetch targets', err)
    targets.value = []
  } finally {
    isLoading.value = false
  }
}

function openTargetModal(target = null) {
  formError.value = ''
  editingTarget.value = target
  if (target) {
    targetForm.value = { title: target.title, description: target.description, focus_dimension: target.focus_dimension, priority: target.priority, due_date: target.due_date ? target.due_date.split('T')[0] : '', subtasks: [] }
  } else {
    targetForm.value = { title: '', description: '', focus_dimension: 'General', priority: 'medium', due_date: '', subtasks: [{ title: '' }] }
  }
  showTargetModal.value = true
}

async function saveTarget() {
  formError.value = ''
  if (!targetForm.value.title?.trim()) {
    formError.value = 'Target title is required.'
    return
  }
  if (!targetForm.value.due_date) {
    formError.value = 'Target due date is required.'
    return
  }
  if (!editingTarget.value) {
    const validSubtasks = targetForm.value.subtasks.filter(st => st.title?.trim())
    if (validSubtasks.length === 0) {
      formError.value = 'At least one subtask is required.'
      return
    }
    if (validSubtasks.length < targetForm.value.subtasks.length) {
      formError.value = 'Please fill all subtasks or remove empty ones.'
      return
    }
  }

  isSaving.value = true
  try {
    if (editingTarget.value) {
      await targetsApi.updateTarget(editingTarget.value.id, targetForm.value)
      showToast('Target updated!')
    } else {
      await targetsApi.createTarget(targetForm.value)
      showToast('Target created!')
    }
    showTargetModal.value = false
    await fetchTargets()
  } catch (err) {
    showToast('Failed to save target.', 'error')
  } finally {
    isSaving.value = false
  }
}

function confirmDeleteTarget(id) {
  targetToDelete.value = id
  showDeleteModal.value = true
}

async function executeDelete() {
  if (!targetToDelete.value) return
  const id = targetToDelete.value
  try {
    await targetsApi.deleteTarget(id)
    targets.value = targets.value.filter(t => t.id !== id)
    showToast('Target deleted.')
    await fetchTargets()
  } catch (err) {
    showToast('Failed to delete.', 'error')
  } finally {
    showDeleteModal.value = false
    targetToDelete.value = null
  }
}

async function toggleSubtask(targetId, subtaskId) {
  try {
    await targetsApi.toggleSubtask(targetId, subtaskId)
    await fetchTargets()
  } catch (err) {
    showToast('Failed to toggle subtask.', 'error')
  }
}

async function addSubtask(targetId) {
  const title = newSubtask[targetId]?.trim()
  if (!title) {
    showToast('Subtask title cannot be empty.', 'error')
    return
  }
  try {
    await targetsApi.createSubtask(targetId, { title })
    newSubtask[targetId] = ''
    await fetchTargets()
    showToast('Subtask added!')
  } catch (err) {
    showToast('Failed to add subtask.', 'error')
  }
}

async function deleteSubtask(targetId, subtaskId) {
  try {
    await targetsApi.deleteSubtask(targetId, subtaskId)
    await fetchTargets()
  } catch (err) {
    showToast('Failed to delete subtask.', 'error')
  }
}

function showToast(message, type = 'success') {
  toast.value = { message, type }
  setTimeout(() => toast.value = null, 3000)
}

function priorityClass(p) {
  const map = { high: 'bg-rose-50 text-rose-500', medium: 'bg-amber-50 text-amber-500', low: 'bg-slate-50 text-slate-400' }
  return map[p] || 'bg-slate-50 text-slate-400'
}

function statusBadge(s) {
  const map = { completed: 'bg-emerald-50 text-emerald-500', in_progress: 'bg-blue-50 text-blue-500', not_started: 'bg-slate-50 text-slate-400', paused: 'bg-amber-50 text-amber-500' }
  return map[s] || 'bg-slate-50 text-slate-400'
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>
