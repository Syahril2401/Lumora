<template>
  <DashboardLayout 
    :showBuddy="true"
    buddyContextTitle="Planner Insight" 
    :buddyContextMessage="insightMessage"
  >
    <div class="max-w-[1400px] mx-auto pb-10 h-[calc(100vh-8rem)] flex flex-col">
      
      <!-- Page Header & Main Controls -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6 shrink-0">
        <div>
          <h1 class="text-3xl font-black text-slate-900 tracking-tight mb-2">Study Planner</h1>
          <p class="text-slate-500 font-medium text-sm">Manage your intellectual flow for the week.</p>
        </div>
        
        <div class="flex items-center gap-4">
          <!-- View Toggles -->
          <div class="flex p-1 bg-slate-100/80 rounded-xl border border-slate-200/50 w-fit">
            <button @click="viewMode = 'daily'" class="px-5 py-2 text-sm font-bold rounded-lg transition-all" :class="viewMode === 'daily' ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-900'">Daily</button>
            <button @click="viewMode = 'weekly'" class="px-5 py-2 text-sm font-bold rounded-lg transition-all" :class="viewMode === 'weekly' ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-900'">Weekly</button>
            <button @click="viewMode = 'monthly'" class="px-5 py-2 text-sm font-bold rounded-lg transition-all" :class="viewMode === 'monthly' ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-900'">Monthly</button>
          </div>
          
          <button v-if="!googleConnected" @click="connectGoogleCalendar" class="bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" class="w-4 h-4">
            Connect
          </button>
          <div v-else class="bg-emerald-50 text-emerald-700 px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 border border-emerald-200">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" class="w-4 h-4">
            Connected
          </div>
          <button @click="openModal()" class="bg-[#3D3ACE] hover:bg-[#312E81] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-indigo-200 transition-all flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4"/></svg>
            New Event
          </button>
        </div>
      </div>

      <!-- Week/Month Navigation -->
      <div class="flex items-center gap-4 mb-6 shrink-0">
        <button @click="navigatePrev" class="w-9 h-9 flex items-center justify-center bg-white border border-slate-200 hover:border-slate-300 rounded-xl shadow-sm transition-all">
          <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <button @click="goToToday" class="px-4 py-2 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-sm font-bold text-slate-700 shadow-sm transition-all">Today</button>
        <button @click="navigateNext" class="w-9 h-9 flex items-center justify-center bg-white border border-slate-200 hover:border-slate-300 rounded-xl shadow-sm transition-all">
          <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
        <h2 class="text-lg font-black text-slate-800">{{ currentPeriodLabel }}</h2>
      </div>

      <!-- Loading Overlay -->
      <div v-if="isLoading" class="flex-1 bg-white border border-slate-200 rounded-[24px] shadow-sm flex items-center justify-center">
          <svg class="w-8 h-8 animate-spin text-[#3D3ACE]" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
      </div>

      <!-- ===== DAILY VIEW ===== -->
      <div v-else-if="viewMode === 'daily'" class="flex-1 bg-white border border-slate-200 rounded-[24px] shadow-sm overflow-hidden flex flex-col min-h-0 relative">
        <div class="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
           <div v-if="getSessionsForDate(dailyDateStr).length === 0" class="text-center p-12 bg-white rounded-2xl border border-dashed border-slate-300">
              <p class="text-slate-500 font-bold">No events planned for this day.</p>
           </div>
           <div v-for="session in getSessionsForDate(dailyDateStr)" :key="session.id" 
                class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 hover:shadow-md cursor-pointer transition-all"
                @click="openModal(session)">
              <div class="flex-shrink-0 w-16 text-center mt-1">
                 <p class="text-sm font-black text-[#3D3ACE]">{{ session.start_time.substring(0,5) }}</p>
                 <p class="text-[10px] font-bold text-slate-400 mt-1">{{ session.end_time.substring(0,5) }}</p>
              </div>
              <div class="w-1 bg-indigo-100 self-stretch rounded-full flex-shrink-0"></div>
              <div class="flex-1 min-w-0">
                 <h4 class="text-lg font-black text-slate-800">{{ session.title }}</h4>
                 <p v-if="session.description" class="text-sm font-medium text-slate-500 mt-1">{{ session.description }}</p>
                 <div class="flex items-center gap-2 mt-3">
                    <span class="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md bg-indigo-50 text-[#3D3ACE]">{{ session.focus_dimension }}</span>
                    <span class="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md" :class="session.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'">{{ session.status }}</span>
                 </div>
              </div>
              <div v-if="session.status === 'completed'" class="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center self-center flex-shrink-0">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
              </div>
           </div>
        </div>
      </div>

      <!-- ===== WEEKLY VIEW ===== -->
      <div v-else-if="viewMode === 'weekly'" class="flex-1 bg-white border border-slate-200 rounded-[24px] shadow-sm overflow-hidden flex flex-col min-h-0 relative">
        <!-- Calendar Header (Days) -->
        <div class="flex border-b border-slate-200 bg-slate-50 shrink-0">
          <div class="w-16 shrink-0 border-r border-slate-200"></div>
          <div v-for="day in weekDays" :key="day.dateStr" 
               @click="openModalWithDate(day.dateStr, null)"
               class="flex-1 text-center py-3 border-r border-slate-200 last:border-0 relative cursor-pointer transition-all hover:bg-indigo-50/30 group">
            <p class="text-[10px] font-black uppercase tracking-widest mb-1 transition-colors" :class="day.isToday ? 'text-[#3D3ACE]' : 'text-slate-400 group-hover:text-[#3D3ACE]'">{{ day.name }}</p>
            <div class="w-8 h-8 mx-auto flex items-center justify-center rounded-full transition-transform group-hover:scale-110" :class="day.isToday ? 'bg-[#3D3ACE] text-white shadow-md' : 'text-slate-900 group-hover:bg-[#3D3ACE]/10'">
                <p class="text-lg font-black">{{ day.date }}</p>
            </div>
            <div v-if="day.isToday" class="absolute bottom-0 left-0 right-0 h-1 bg-[#3D3ACE] pointer-events-none"></div>
          </div>
        </div>

        <!-- Calendar Body -->
        <div class="flex-1 overflow-y-auto relative bg-[#FDFDFF] scrollbar-hide" ref="calendarBody">
           <div class="flex relative min-w-[700px]">
             <div class="w-16 shrink-0 bg-white border-r border-slate-200 z-10 sticky left-0">
               <div v-for="hour in 24" :key="hour" class="h-16 border-b border-slate-100 flex items-start justify-center pt-2">
                 <span class="text-[10px] font-bold text-slate-400 -mt-2.5 bg-white px-1">
                   {{ hour - 1 === 0 ? '12 AM' : (hour - 1 < 12 ? (hour - 1) + ' AM' : (hour - 1 === 12 ? '12 PM' : (hour - 1 - 12) + ' PM')) }}
                 </span>
               </div>
             </div>
             <div class="flex-1 grid grid-cols-7 relative">
                <div class="absolute inset-0 pointer-events-none">
                  <div v-for="hour in 24" :key="hour" class="h-16 border-b border-slate-100"></div>
                </div>
                <div v-for="day in weekDays" :key="day.dateStr" 
                    class="border-r border-slate-100 relative min-h-[1536px]">
                   
                   <!-- Hourly hover slots -->
                   <div class="absolute inset-0 flex flex-col z-0">
                     <div v-for="hour in 24" :key="hour" 
                          class="h-16 transition-colors hover:bg-indigo-500/10 cursor-pointer"
                          @click="openModalWithHour(day.dateStr, hour - 1)"></div>
                   </div>

                   <div v-if="day.isToday" class="absolute left-0 right-0 border-t-2 border-red-500 z-20 pointer-events-none" :style="{ top: currentTimeTop }">
                       <div class="w-2 h-2 rounded-full bg-red-500 absolute -left-1 -top-1.5"></div>
                   </div>
                   <div v-for="session in getSessionsForDate(day.dateStr)" :key="session.id" 
                      @click.stop="openModal(session)"
                      class="absolute left-1 right-1 rounded-[12px] p-3 cursor-pointer shadow-sm hover:shadow-md transition-all overflow-hidden group flex flex-col border border-white/20 z-10"
                      :style="getSessionStyle(session)"
                      :class="getSessionColor(session)">
                      <div class="flex justify-between items-start mb-1">
                         <span class="text-[10px] font-bold opacity-70">{{ session.start_time.substring(0,5) }}</span>
                      </div>
                      <p class="text-xs font-bold leading-tight line-clamp-2 mb-1 group-hover:underline">{{ session.title }}</p>
                      <div v-if="session.status === 'completed'" class="mt-auto self-end w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                      </div>
                   </div>
                </div>
             </div>
           </div>
        </div>
      </div>

      <!-- ===== MONTHLY VIEW ===== -->
      <div v-else class="flex-1 bg-white border border-slate-200 rounded-[24px] shadow-sm overflow-hidden flex flex-col min-h-0">
        <!-- Month Header -->
        <div class="grid grid-cols-7 border-b border-slate-200 bg-slate-50 shrink-0">
          <div v-for="d in ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']" :key="d" class="text-center py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 border-r border-slate-200 last:border-0">{{ d }}</div>
        </div>
        <!-- Month Grid -->
        <div class="flex-1 overflow-y-auto scrollbar-hide">
          <div class="grid grid-cols-7 auto-rows-fr min-h-full">
            <div v-for="(cell, i) in monthCells" :key="i"
                class="border-r border-b border-slate-100 p-2 min-h-[120px] cursor-pointer transition-all hover:bg-indigo-50/60 hover:shadow-inner group"
                :class="{ 'bg-slate-50/40': !cell.currentMonth }"
                @click="cell.currentMonth && openModalWithDate(cell.dateStr, null)">
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm font-bold transition-transform group-hover:scale-110" :class="cell.isToday ? 'w-7 h-7 flex items-center justify-center rounded-full bg-[#3D3ACE] text-white shadow-md' : (cell.currentMonth ? 'text-slate-800 group-hover:text-[#3D3ACE]' : 'text-slate-300')">{{ cell.day }}</span>
              </div>
              <div class="space-y-1">
                <div v-for="session in getSessionsForDate(cell.dateStr).slice(0, 3)" :key="session.id"
                    @click.stop="openModal(session)"
                    class="text-[10px] font-bold px-2 py-1 rounded-lg truncate cursor-pointer transition-all hover:opacity-80"
                    :class="session.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'">
                  {{ session.start_time.substring(0,5) }} {{ session.title }}
                </div>
                <div v-if="getSessionsForDate(cell.dateStr).length > 3" class="text-[10px] font-bold text-slate-400 px-2">
                  +{{ getSessionsForDate(cell.dateStr).length - 3 }} more
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click.self="showModal = false">
        <div class="bg-white rounded-[24px] p-8 w-full max-w-lg shadow-2xl border border-slate-100">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-black text-slate-900 tracking-tight">{{ editingSession ? 'Edit Event' : 'New Event' }}</h2>
            <div class="flex gap-2">
                <button v-if="editingSession" type="button" @click="confirmDelete(editingSession.id)" class="w-8 h-8 flex items-center justify-center rounded-full bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
                <button @click="showModal = false" class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
            </div>
          </div>
          <form @submit.prevent="saveSession" class="space-y-5">
            <div>
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Title *</label>
              <input v-model="form.title" required class="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm font-bold text-slate-900 focus:bg-white focus:border-[#3D3ACE] focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all shadow-sm" placeholder="e.g. Market Equilibrium Analysis">
            </div>
            <div>
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Description</label>
              <textarea v-model="form.description" rows="2" class="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm font-bold text-slate-900 focus:bg-white focus:border-[#3D3ACE] focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all shadow-sm resize-none" placeholder="Summary of supply and demand curves..."></textarea>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Date *</label>
                <input v-model="form.date" type="date" required class="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm font-bold text-slate-900 focus:bg-white focus:border-[#3D3ACE] shadow-sm outline-none transition-all">
              </div>
              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Start *</label>
                <input v-model="form.start_time" type="time" required class="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm font-bold text-slate-900 focus:bg-white focus:border-[#3D3ACE] shadow-sm outline-none transition-all">
              </div>
              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">End *</label>
                <input v-model="form.end_time" type="time" required class="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm font-bold text-slate-900 focus:bg-white focus:border-[#3D3ACE] shadow-sm outline-none transition-all">
              </div>
            </div>

            <div class="flex gap-3 pt-4 border-t border-slate-100">
              <button v-if="editingSession && editingSession.status !== 'completed'" type="button" @click="completeSession(editingSession.id)" class="flex-1 bg-emerald-50 text-emerald-600 py-2.5 rounded-xl font-bold hover:bg-emerald-100 transition-colors shadow-sm">Mark Complete</button>
              <button type="submit" :disabled="isSaving" class="flex-1 bg-[#3D3ACE] text-white py-2.5 rounded-xl font-bold hover:bg-[#312E81] shadow-md shadow-indigo-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2" :class="{ 'col-span-2': !editingSession }">
                <svg v-if="isSaving" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                {{ isSaving ? 'Saving...' : (editingSession ? 'Save Changes' : 'Create Event') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Error Toast -->
    <Teleport to="body">
      <div v-if="toast" class="fixed bottom-6 right-6 z-[150] bg-slate-900 text-white border border-slate-800 shadow-2xl rounded-xl p-4 flex items-center gap-3 animate-slide-up">
        <div class="w-8 h-8 rounded-lg flex items-center justify-center" :class="toast.type === 'error' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'">
          <svg v-if="toast.type === 'error'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
        </div>
        <span class="text-sm font-bold">{{ toast.message }}</span>
      </div>
    </Teleport>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showDeleteModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-[#0B1120]/80 backdrop-blur-md" @click="showDeleteModal = false"></div>
          
          <div class="bg-gradient-to-b from-[#1E1B4B] to-[#0B1120] rounded-[2rem] w-full max-w-md relative z-10 shadow-2xl shadow-indigo-900/50 overflow-hidden border border-indigo-500/20 animate-slide-up">
            
            <!-- Decorative Blobs -->
            <div class="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/30 blur-[50px] rounded-full pointer-events-none"></div>
            <div class="absolute -bottom-24 -left-24 w-48 h-48 bg-rose-500/20 blur-[50px] rounded-full pointer-events-none"></div>

            <div class="p-10 text-center relative z-20">
              <div class="relative w-20 h-20 mx-auto mb-8 group">
                <div class="absolute inset-0 bg-gradient-to-tr from-rose-500 to-orange-500 rounded-2xl rotate-3 group-hover:rotate-12 transition-transform duration-300"></div>
                <div class="absolute inset-0 bg-white rounded-2xl flex items-center justify-center -rotate-3 group-hover:-rotate-12 transition-transform duration-300">
                    <svg class="w-10 h-10 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </div>
              </div>
              
              <h3 class="text-2xl font-black text-white mb-3 tracking-tight">Delete Event?</h3>
              <p class="text-sm font-medium text-indigo-200/80 leading-relaxed">
                This event will be permanently removed from your planner and Google Calendar.
              </p>
            </div>

            <div class="p-6 bg-white/5 backdrop-blur-sm border-t border-white/10 flex gap-4 relative z-20">
              <button @click="showDeleteModal = false" class="flex-1 py-3.5 px-4 rounded-xl text-sm font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10">
                Cancel
              </button>
              <button @click="deleteSession" class="flex-1 py-3.5 px-4 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white rounded-xl text-sm font-black shadow-lg shadow-rose-900/50 hover:shadow-rose-900/80 hover:-translate-y-0.5 transition-all">
                Delete Event
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { usePage } from '@inertiajs/vue3'
import DashboardLayout from '@/Layouts/DashboardLayout.vue'
import { plannerApi, setWorkspaceToken } from '@/services/workspaceApi'

const page = usePage()
const isLoading = ref(true)
const isSaving = ref(false)
const showModal = ref(false)
const editingSession = ref(null)
const sessions = ref([])
const toast = ref(null)
const calendarBody = ref(null)
const viewMode = ref('weekly')
const googleConnected = ref(false)
const showDeleteModal = ref(false)
const deletingSessionId = ref(null)

const form = ref({
  title: '', description: '', date: '', start_time: '', end_time: '',
  focus_dimension: 'General', target_id: null
})

// Navigation state
const today = new Date()
const todayStr = formatDate(today)
const dailyOffset = ref(0)
const weekOffset = ref(0)
const monthOffset = ref(0)

const dailyDateStr = computed(() => {
  const d = new Date(today)
  d.setDate(d.getDate() + dailyOffset.value)
  return formatDate(d)
})

// Computed: week days based on offset
const weekDays = computed(() => {
  const base = new Date(today)
  base.setDate(base.getDate() + weekOffset.value * 7)
  const monday = getMonday(new Date(base))
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(d.getDate() + i)
    const dateStr = formatDate(d)
    return {
      name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      date: d.getDate(),
      dateStr,
      isToday: dateStr === todayStr
    }
  })
})

// Computed: month cells for monthly view
const monthCells = computed(() => {
  const base = new Date(today.getFullYear(), today.getMonth() + monthOffset.value, 1)
  const year = base.getFullYear()
  const month = base.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  // Monday=0 offset
  let startDow = firstDay.getDay() - 1
  if (startDow < 0) startDow = 6

  const cells = []
  // Fill leading days from previous month
  for (let i = startDow - 1; i >= 0; i--) {
    const d = new Date(year, month, -i)
    cells.push({ day: d.getDate(), dateStr: formatDate(d), currentMonth: false, isToday: false })
  }
  // Current month days
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const d = new Date(year, month, i)
    const ds = formatDate(d)
    cells.push({ day: i, dateStr: ds, currentMonth: true, isToday: ds === todayStr })
  }
  // Fill trailing days
  const remaining = 42 - cells.length
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(year, month + 1, i)
    cells.push({ day: i, dateStr: formatDate(d), currentMonth: false, isToday: false })
  }
  return cells
})

// Period label
const currentPeriodLabel = computed(() => {
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  if (viewMode.value === 'daily') {
    const d = new Date(today)
    d.setDate(d.getDate() + dailyOffset.value)
    return d.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }
  if (viewMode.value === 'monthly') {
    const base = new Date(today.getFullYear(), today.getMonth() + monthOffset.value, 1)
    return `${months[base.getMonth()]} ${base.getFullYear()}`
  }
  // Weekly: show range
  const days = weekDays.value
  if (!days.length) return ''
  const first = new Date(days[0].dateStr)
  const last = new Date(days[6].dateStr)
  const fm = months[first.getMonth()].substring(0, 3)
  const lm = months[last.getMonth()].substring(0, 3)
  if (fm === lm) return `${fm} ${first.getDate()} – ${last.getDate()}, ${first.getFullYear()}`
  return `${fm} ${first.getDate()} – ${lm} ${last.getDate()}, ${last.getFullYear()}`
})

const currentTimeTop = computed(() => {
    const now = new Date()
    return `${(now.getHours() * 60 + now.getMinutes()) * (64 / 60)}px`
})

const insightMessage = computed(() => {
  const completed = sessions.value.filter(s => s.status === 'completed').length
  if (sessions.value.length === 0) return 'Create your first event to start organizing your week.'
  if (completed >= 2) return `Great progress! You've completed ${completed} sessions. Keep going.`
  return 'You have events planned. Complete them to build consistency.'
})

// Navigation
function navigatePrev() {
  if (viewMode.value === 'daily') dailyOffset.value--
  else if (viewMode.value === 'weekly') weekOffset.value--
  else monthOffset.value--
}
function navigateNext() {
  if (viewMode.value === 'daily') dailyOffset.value++
  else if (viewMode.value === 'weekly') weekOffset.value++
  else monthOffset.value++
}
function goToToday() {
  dailyOffset.value = 0
  weekOffset.value = 0
  monthOffset.value = 0
}

onMounted(async () => {
  setWorkspaceToken(page.props.go_token)
  await fetchSessions()
  nextTick(() => {
      if (calendarBody.value) calendarBody.value.scrollTop = 8 * 64 - 32
  })
})

async function fetchSessions() {
  isLoading.value = true
  try {
    const localSessions = await plannerApi.getSessions() || []
    
    try {
      const statusRes = await plannerApi.getGoogleStatus()
      googleConnected.value = statusRes?.connected || false
      
      if (googleConnected.value) {
        try {
          const googleEvents = await plannerApi.getGoogleEvents() || []
          
          // Deduplicate: filter out Google events that already exist in localSessions
          const localGoogleIds = localSessions.map(s => s.google_event_id).filter(id => id)
          const filteredGoogle = googleEvents.filter(ge => !localGoogleIds.includes(ge.id))
          
          sessions.value = [...localSessions, ...filteredGoogle]
        } catch (eventErr) {
          console.log('Failed to fetch google events', eventErr)
          sessions.value = localSessions
        }
      } else {
        sessions.value = localSessions
      }
    } catch (e) {
      console.log('Google integration status not available', e)
      googleConnected.value = false
      sessions.value = localSessions
    }
  } catch (err) {
    console.error('Failed to fetch sessions', err)
    sessions.value = []
  } finally {
    isLoading.value = false
  }
}

function getSessionsForDate(dateStr) {
    return sessions.value.filter(s => {
        if (!s.date) return false;
        // The backend might return "2026-05-29T00:00:00Z" or similar
        const sessionDate = s.date.split('T')[0].split(' ')[0];
        return sessionDate === dateStr;
    })
}

function getSessionStyle(session) {
  const [startH, startM] = (session.start_time || '00:00').split(':').map(Number)
  const [endH, endM] = (session.end_time || '01:00').split(':').map(Number)
  const top = (startH * 60 + startM) * (64 / 60)
  const height = ((endH * 60 + endM) - (startH * 60 + startM)) * (64 / 60)
  return { top: `${top}px`, height: `${Math.max(height, 24)}px` }
}

function getSessionColor(session) {
    if (session.status === 'completed') return 'bg-emerald-100 text-emerald-900 opacity-70'
    if (session.source === 'google') return 'bg-[#E8F0FE] text-[#1967D2] border border-[#1967D2]/20'
    return 'bg-[#EEF2FF] text-[#3D3ACE]'
}

function openModal(session = null) {
  editingSession.value = session
  if (session && session.source !== 'google') {
    form.value = { ...session }
  } else {
    const now = new Date()
    const hour = now.getHours()
    const startStr = `${hour.toString().padStart(2, '0')}:00`
    const endStr = `${((hour + 1) % 24).toString().padStart(2, '0')}:00`

    form.value = {
      title: '', description: '', date: todayStr,
      start_time: startStr, end_time: endStr,
      focus_dimension: 'General', target_id: null
    }
  }
  showModal.value = true
}

function openModalWithDate(dateStr, event) {
    let hour = 9
    const startStr = `${hour.toString().padStart(2, '0')}:00`
    const endStr = `${((hour + 1) % 24).toString().padStart(2, '0')}:00`
    
    editingSession.value = null
    form.value = {
      title: '', description: '', date: dateStr,
      start_time: startStr, end_time: endStr,
      focus_dimension: 'General', target_id: null
    }
    showModal.value = true
}

function openModalWithHour(dateStr, hour) {
    const startStr = `${hour.toString().padStart(2, '0')}:00`
    const endStr = `${((hour + 1) % 24).toString().padStart(2, '0')}:00`
    
    editingSession.value = null
    form.value = {
      title: '', description: '', date: dateStr,
      start_time: startStr, end_time: endStr,
      focus_dimension: 'General', target_id: null
    }
    showModal.value = true
}

async function saveSession() {
  isSaving.value = true
  try {
    if (editingSession.value) {
      const updated = await plannerApi.updateSession(editingSession.value.id, form.value)
      const idx = sessions.value.findIndex(s => s.id === updated.id)
      if (idx !== -1) sessions.value[idx] = updated
      showToast('Event updated!', 'success')
    } else {
      const created = await plannerApi.createSession(form.value)
      sessions.value.push(created)
      showToast('Event created!', 'success')
    }
    showModal.value = false
  } catch (err) {
    console.error('Save failed', err)
    showToast('Failed to save event.', 'error')
  } finally {
    isSaving.value = false
  }
}

async function completeSession(id) {
  try {
    const updated = await plannerApi.completeSession(id)
    const idx = sessions.value.findIndex(s => s.id === id)
    if (idx !== -1) sessions.value[idx] = updated
    showToast('Event completed!', 'success')
    showModal.value = false
  } catch (err) {
    showToast('Failed to complete event.', 'error')
  }
}

function confirmDelete(id) {
  deletingSessionId.value = id
  showDeleteModal.value = true
}

async function deleteSession() {
  const id = deletingSessionId.value
  if (!id) return
  
  try {
    await plannerApi.deleteSession(id)
    sessions.value = sessions.value.filter(s => s.id !== id)
    showToast('Event deleted.', 'success')
    showModal.value = false
    showDeleteModal.value = false
    deletingSessionId.value = null
  } catch (err) {
    showToast('Failed to delete event.', 'error')
    showDeleteModal.value = false
    deletingSessionId.value = null
  }
}

function connectGoogleCalendar() {
    const token = page.props.go_token
    if (token) {
        window.location.href = `http://localhost:8008/api/auth/google/login?token=${token}`
    } else {
        showToast('Authentication error. Please re-login.', 'error')
    }
}

function showToast(message, type = 'success') {
  toast.value = { message, type }
  setTimeout(() => toast.value = null, 3000)
}

function formatDate(d) {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getMonday(d) {
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(d.setDate(diff))
}
</script>
