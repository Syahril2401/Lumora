<template>
  <div class="min-h-screen bg-[#FDFDFF] font-sans text-slate-900 p-10">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="flex items-center justify-between mb-12">
        <div>
          <p class="text-[11px] font-black text-[#3D3ACE] uppercase tracking-[0.3em] mb-3">Admin Management</p>
          <h1 class="text-4xl font-black text-[#1E1B4B]">User Directory</h1>
        </div>
        <button 
          @click="openCreateModal"
          class="bg-[#3D3ACE] text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-indigo-100 hover:shadow-indigo-200 hover:-translate-y-1 transition-all active:scale-[0.98] flex items-center gap-3"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4"/></svg>
          Add New User
        </button>
      </div>

      <!-- Stats Row -->
      <div class="grid grid-cols-3 gap-8 mb-12">
        <div class="bg-white p-8 rounded-[36px] shadow-sm border border-slate-50">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Users</p>
          <p class="text-3xl font-black text-[#1E1B4B]">{{ users.length }}</p>
        </div>
        <div class="bg-white p-8 rounded-[36px] shadow-sm border border-slate-50">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Active Accounts</p>
          <p class="text-3xl font-black text-emerald-500">{{ activeUsersCount }}</p>
        </div>
        <div class="bg-white p-8 rounded-[36px] shadow-sm border border-slate-50">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">New This Week</p>
          <p class="text-3xl font-black text-indigo-500">+3</p>
        </div>
      </div>

      <!-- User Table -->
      <div class="bg-white rounded-[48px] shadow-sm border border-slate-50 overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-slate-50">
              <th class="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">User</th>
              <th class="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Role/Level</th>
              <th class="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th class="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-for="user in users" :key="user.user_id" class="hover:bg-slate-50/50 transition-colors group">
              <td class="px-10 py-6">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-[#3D3ACE] font-black text-lg">
                    {{ user.name.charAt(0) }}
                  </div>
                  <div>
                    <p class="text-base font-black text-[#1E1B4B] group-hover:text-[#3D3ACE] transition-colors">{{ user.name }}</p>
                    <p class="text-xs font-bold text-slate-400">{{ user.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-10 py-6">
                <span class="text-xs font-black text-slate-600 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-widest">
                  {{ user.level || 'Standard' }}
                </span>
              </td>
              <td class="px-10 py-6">
                <div class="flex items-center gap-2">
                  <div :class="user.is_active ? 'bg-emerald-500' : 'bg-slate-300'" class="w-2 h-2 rounded-full animate-pulse"></div>
                  <span :class="user.is_active ? 'text-emerald-600' : 'text-slate-400'" class="text-xs font-black uppercase tracking-widest">
                    {{ user.is_active ? 'Active' : 'Inactive' }}
                  </span>
                </div>
              </td>
              <td class="px-10 py-6 text-right">
                <div class="flex items-center justify-end gap-3">
                  <button 
                    @click="openEditModal(user)"
                    class="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-[#3D3ACE] hover:bg-indigo-50 transition-all"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                  </button>
                  <button 
                    @click="deleteUser(user.user_id)"
                    class="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal (Premium Overlay) -->
    <Transition name="fade">
      <div v-if="modalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <div class="absolute inset-0 bg-[#1E1B4B]/80 backdrop-blur-md" @click="modalOpen = false"></div>
        <div class="relative w-full max-w-xl bg-white rounded-[48px] shadow-2xl border border-slate-100 overflow-hidden">
          <div class="p-10 border-b border-slate-50">
            <h3 class="text-2xl font-black text-[#1E1B4B]">{{ editingUser ? 'Update User' : 'Create New User' }}</h3>
            <p class="text-sm font-bold text-slate-400 mt-1">Manage user account details below.</p>
          </div>
          
          <form @submit.prevent="submitForm" class="p-10 space-y-6">
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Full Name</label>
              <input 
                v-model="form.name"
                type="text" 
                class="w-full bg-slate-50 border border-slate-100 rounded-[20px] py-4 px-6 text-sm font-bold text-[#1E1B4B] outline-none focus:bg-white focus:border-[#3D3ACE]/20 transition-all shadow-sm"
                placeholder="e.g. John Doe"
                required
              >
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Email Address</label>
              <input 
                v-model="form.email"
                type="email" 
                class="w-full bg-slate-50 border border-slate-100 rounded-[20px] py-4 px-6 text-sm font-bold text-[#1E1B4B] outline-none focus:bg-white focus:border-[#3D3ACE]/20 transition-all shadow-sm"
                placeholder="e.g. john@example.com"
                required
              >
            </div>
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Password</label>
                <input 
                  v-model="form.password"
                  type="password" 
                  class="w-full bg-slate-50 border border-slate-100 rounded-[20px] py-4 px-6 text-sm font-bold text-[#1E1B4B] outline-none focus:bg-white focus:border-[#3D3ACE]/20 transition-all shadow-sm"
                  :placeholder="editingUser ? 'Leave blank to keep' : 'Min. 8 chars'"
                  :required="!editingUser"
                >
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Level</label>
                <select 
                  v-model="form.level"
                  class="w-full bg-slate-50 border border-slate-100 rounded-[20px] py-4 px-6 text-sm font-bold text-[#1E1B4B] outline-none focus:bg-white focus:border-[#3D3ACE]/20 transition-all shadow-sm appearance-none"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div class="flex items-center gap-4 pt-6">
              <button 
                type="button"
                @click="modalOpen = false"
                class="flex-1 bg-slate-50 text-slate-400 py-4 rounded-[20px] font-black text-sm hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit"
                class="flex-[2] bg-[#3D3ACE] text-white py-4 rounded-[20px] font-black text-sm shadow-xl shadow-indigo-100 hover:shadow-indigo-200 transition-all active:scale-[0.98]"
              >
                {{ editingUser ? 'Update Account' : 'Create Account' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useForm, router } from '@inertiajs/vue3'

const props = defineProps({
  users: Array
})

const modalOpen = ref(false)
const editingUser = ref(null)

const form = useForm({
  name: '',
  email: '',
  password: '',
  level: 'Beginner',
  is_active: true
})

const activeUsersCount = computed(() => {
  return props.users.filter(u => u.is_active).length
})

const openCreateModal = () => {
  editingUser.value = null
  form.reset()
  modalOpen.value = true
}

const openEditModal = (user) => {
  editingUser.value = user
  form.name = user.name
  form.email = user.email
  form.level = user.level || 'Beginner'
  form.is_active = user.is_active
  form.password = ''
  modalOpen.value = true
}

const submitForm = () => {
  if (editingUser.value) {
    form.put(route('users.update', editingUser.value.user_id), {
      onSuccess: () => {
        modalOpen.value = false
        form.reset()
      }
    })
  } else {
    form.post(route('users.store'), {
      onSuccess: () => {
        modalOpen.value = false
        form.reset()
      }
    })
  }
}

const deleteUser = (id) => {
  if (confirm('Are you sure you want to delete this user?')) {
    router.delete(route('users.destroy', id))
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
