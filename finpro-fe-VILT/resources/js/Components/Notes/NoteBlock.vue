<template>
  <div class="group relative flex items-start w-full" :class="blockStyle">
    <!-- Drag Handle Placeholder (Optional for future) -->
    <div class="absolute -left-8 top-1 opacity-0 group-hover:opacity-20 cursor-grab px-1 text-slate-400">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"/></svg>
    </div>

    <!-- Prefix Elements (Bullet, Checkbox, Number) -->
    <div v-if="block.type === 'bullet'" class="mr-3 mt-2.5 w-1.5 h-1.5 rounded-full bg-slate-800 flex-shrink-0"></div>
    <div v-else-if="block.type === 'number'" class="mr-3 mt-1 font-bold text-slate-500 flex-shrink-0">1.</div>
    <div v-else-if="block.type === 'todo'" class="mr-3 mt-1 flex-shrink-0">
      <div 
        @click="toggleTodo"
        class="w-5 h-5 rounded-[6px] border-2 flex items-center justify-center cursor-pointer transition-colors"
        :class="block.checked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 text-transparent hover:border-[#3D3ACE]'"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
      </div>
    </div>
    
    <!-- Divider -->
    <div v-if="block.type === 'divider'" class="w-full py-4" contenteditable="false">
      <hr class="border-t-2 border-slate-100">
    </div>

    <!-- Image -->
    <div v-else-if="block.type === 'image'" class="w-full my-4 relative group" contenteditable="false">
      <div v-if="block.content" class="relative rounded-xl overflow-hidden border border-slate-200">
        <img :src="block.content" class="w-full h-auto max-h-[500px] object-contain bg-slate-50" />
        <button @click="clearImage" class="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/80 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
      <div v-else class="w-full h-32 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center bg-slate-50 relative group cursor-pointer hover:bg-slate-100 hover:border-indigo-300 transition-colors">
        <input type="file" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" @change="handleImageUpload" />
        <div class="flex flex-col items-center text-slate-500 group-hover:text-indigo-500 transition-colors">
          <svg class="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
          <span class="text-sm font-bold">Click to upload image</span>
        </div>
      </div>
    </div>

    <!-- Editor Area -->
    <div 
      v-else
      ref="editorRef"
      contenteditable="true"
      class="flex-1 min-w-0 outline-none min-h-[1.5em] break-words whitespace-pre-wrap empty:before:content-[attr(placeholder)] empty:before:text-slate-300"
      :class="{ 'line-through text-slate-400': block.type === 'todo' && block.checked }"
      :placeholder="placeholderText"
      @input="onInput"
      @keydown="onKeydown"
      @focus="$emit('focus')"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, computed } from 'vue';

const props = defineProps({
  block: Object,
  isFocused: Boolean
});

const emit = defineEmits(['update', 'split', 'delete', 'focus', 'move-up', 'move-down', 'slash-command']);

const editorRef = ref(null);

const blockStyle = computed(() => {
  switch (props.block.type) {
    case 'heading1': return 'text-3xl font-black text-[#1E1B4B] my-4';
    case 'heading2': return 'text-xl font-bold text-[#1E1B4B] my-3';
    case 'quote': return 'text-lg italic border-l-4 border-indigo-200 pl-5 my-3 text-slate-600';
    case 'callout': return 'bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100 my-3 text-indigo-900 font-medium';
    case 'reflection': return 'bg-amber-50 p-5 rounded-2xl border border-amber-100 my-3 font-medium text-amber-900 before:content-[\'💡_\']';
    default: return 'text-base text-slate-700 my-1 leading-relaxed';
  }
});

const placeholderText = computed(() => {
  if (!props.isFocused) return '';
  if (props.block.type === 'heading1') return 'Heading 1';
  if (props.block.type === 'heading2') return 'Heading 2';
  return 'Type something...';
});

onMounted(() => {
  if (editorRef.value) {
    editorRef.value.innerText = props.block.content || '';
    if (props.isFocused) {
      focusAtEnd();
    }
  }
});

watch(() => props.isFocused, (newVal) => {
  if (newVal && editorRef.value) {
    focusAtEnd();
  }
});

function focusAtEnd() {
  nextTick(() => {
    if (!editorRef.value) return;
    editorRef.value.focus();
    const range = document.createRange();
    range.selectNodeContents(editorRef.value);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  });
}

function onInput(e) {
  const text = e.target.innerText;
  emit('update', { ...props.block, content: text });
}

function handleImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (event) => {
    emit('update', { ...props.block, content: event.target.result });
  };
  reader.readAsDataURL(file);
}

function clearImage() {
  emit('update', { ...props.block, content: '' });
}

function onKeydown(e) {
  // Enter: split block
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    const sel = window.getSelection();
    let textAfterCursor = '';
    
    if (sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const clonedRange = range.cloneRange();
      clonedRange.selectNodeContents(editorRef.value);
      clonedRange.setStart(range.endContainer, range.endOffset);
      textAfterCursor = clonedRange.toString();
      
      // Update current block content
      const textBeforeCursor = editorRef.value.innerText.substring(0, editorRef.value.innerText.length - textAfterCursor.length);
      editorRef.value.innerText = textBeforeCursor;
      emit('update', { ...props.block, content: textBeforeCursor });
    }
    
    emit('split', textAfterCursor);
  }

  // Backspace: delete or merge if empty
  if (e.key === 'Backspace') {
    const sel = window.getSelection();
    if (sel.rangeCount > 0 && sel.getRangeAt(0).startOffset === 0 && sel.isCollapsed) {
      e.preventDefault();
      // If block has type other than paragraph, convert to paragraph first
      if (props.block.type !== 'paragraph') {
        emit('update', { ...props.block, type: 'paragraph' });
      } else {
        emit('delete');
      }
    }
  }

  // Arrow keys navigation
  if (e.key === 'ArrowUp') {
    emit('move-up');
  } else if (e.key === 'ArrowDown') {
    emit('move-down');
  }
}

function toggleTodo() {
  emit('update', { ...props.block, checked: !props.block.checked });
}
</script>
