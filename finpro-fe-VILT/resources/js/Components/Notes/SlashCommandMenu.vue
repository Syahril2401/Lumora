<template>
  <div class="fixed z-[100] w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden py-2 text-sm font-bold">
    <div class="px-3 py-2 text-[10px] uppercase tracking-widest text-slate-400 font-black">Basic Blocks</div>
    
    <button @click="select('paragraph')" class="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-3 text-[#1E1B4B]">
      <span class="w-6 h-6 flex items-center justify-center bg-slate-100 rounded text-slate-500">T</span> Text
    </button>
    <button @click="select('heading1')" class="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-3 text-[#1E1B4B]">
      <span class="w-6 h-6 flex items-center justify-center bg-slate-100 rounded text-slate-500">H1</span> Heading 1
    </button>
    <button @click="select('heading2')" class="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-3 text-[#1E1B4B]">
      <span class="w-6 h-6 flex items-center justify-center bg-slate-100 rounded text-slate-500">H2</span> Heading 2
    </button>
    <button @click="select('bullet')" class="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-3 text-[#1E1B4B]">
      <span class="w-6 h-6 flex items-center justify-center bg-slate-100 rounded text-slate-500">•</span> Bulleted List
    </button>
    <button @click="select('number')" class="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-3 text-[#1E1B4B]">
      <span class="w-6 h-6 flex items-center justify-center bg-slate-100 rounded text-slate-500">1.</span> Numbered List
    </button>
    <button @click="select('todo')" class="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-3 text-[#1E1B4B]">
      <span class="w-6 h-6 flex items-center justify-center bg-slate-100 rounded text-slate-500">✓</span> To-do List
    </button>
    <button @click="select('quote')" class="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-3 text-[#1E1B4B]">
      <span class="w-6 h-6 flex items-center justify-center bg-slate-100 rounded text-slate-500">"</span> Quote
    </button>
    <button @click="select('divider')" class="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-3 text-[#1E1B4B]">
      <span class="w-6 h-6 flex items-center justify-center bg-slate-100 rounded text-slate-500">—</span> Divider
    </button>
    <button @click="select('callout')" class="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-3 text-[#1E1B4B]">
      <span class="w-6 h-6 flex items-center justify-center bg-indigo-50 text-indigo-500 rounded">💡</span> Callout
    </button>
    <button @click="select('reflection')" class="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-3 text-[#1E1B4B]">
      <span class="w-6 h-6 flex items-center justify-center bg-amber-50 text-amber-500 rounded">🤔</span> Reflection Prompt
    </button>
    <button @click="select('image')" class="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-3 text-[#1E1B4B]">
      <span class="w-6 h-6 flex items-center justify-center bg-indigo-50 text-indigo-500 rounded"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></span> Image
    </button>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

const emit = defineEmits(['select', 'close']);

function select(type) {
  emit('select', type);
}

function handleClickOutside(e) {
  emit('close');
}

onMounted(() => {
  setTimeout(() => {
    document.addEventListener('click', handleClickOutside);
  }, 10);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
