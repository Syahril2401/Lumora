<template>
  <div class="flex-1 flex flex-col h-full w-full relative pb-32" @click="focusEditorEnd">
    <!-- Empty State Hint -->
    <div v-if="blocks.length === 0" class="text-slate-400 font-medium cursor-text" @click.stop="createFirstBlock">
      Start writing your reflection, or use the toolbar above for formatting...
    </div>

    <!-- Blocks -->
    <div v-else class="space-y-1 w-full">
      <NoteBlock 
        v-for="(block, index) in blocks" 
        :key="block.id"
        :block="block"
        :isFocused="focusedBlockIndex === index"
        @update="updateBlock(index, $event)"
        @split="splitBlock(index, $event)"
        @delete="deleteBlock(index)"
        @focus="focusedBlockIndex = index"
        @move-up="moveFocusUp(index)"
        @move-down="moveFocusDown(index)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import NoteBlock from './NoteBlock.vue';
import SlashCommandMenu from './SlashCommandMenu.vue';

const props = defineProps({
  title: String,
  blocks: Array,
  saveStatus: {
    type: String, // 'saved', 'saving', 'unsaved', 'error'
    default: 'saved'
  }
});

const emit = defineEmits(['update:title', 'update:blocks', 'save']);

const focusedBlockIndex = ref(-1);
const slashMenuOpen = ref(false);
const slashMenuPos = ref({ x: 0, y: 0 });
const activeSlashBlockIndex = ref(-1);

const saveStatusColor = computed(() => {
  if (props.saveStatus === 'saved') return 'text-slate-400';
  if (props.saveStatus === 'saving') return 'text-amber-500';
  if (props.saveStatus === 'error') return 'text-rose-500';
  return 'text-slate-500';
});

const saveStatusBg = computed(() => {
  if (props.saveStatus === 'saved') return 'bg-slate-300';
  if (props.saveStatus === 'saving') return 'bg-amber-400';
  if (props.saveStatus === 'error') return 'bg-rose-500';
  return 'bg-slate-400';
});

const saveStatusText = computed(() => {
  if (props.saveStatus === 'saved') return 'Saved';
  if (props.saveStatus === 'saving') return 'Saving...';
  if (props.saveStatus === 'error') return 'Failed to save';
  return 'Unsaved changes';
});

function createFirstBlock() {
  const newBlocks = [{ id: Date.now().toString(), type: 'paragraph', content: '' }];
  emit('update:blocks', newBlocks);
  focusedBlockIndex.value = 0;
}

function updateBlock(index, updatedBlock) {
  const newBlocks = [...props.blocks];
  newBlocks[index] = updatedBlock;
  emit('update:blocks', newBlocks);
}

function splitBlock(index, newBlockContent) {
  const newBlocks = [...props.blocks];
  const currentBlockType = newBlocks[index].type;
  
  // If current is bullet/number/todo, continue the list. Otherwise fallback to paragraph.
  let newType = 'paragraph';
  if (['bullet', 'number', 'todo'].includes(currentBlockType)) {
    newType = currentBlockType;
  }
  
  newBlocks.splice(index + 1, 0, {
    id: Date.now().toString(),
    type: newType,
    content: newBlockContent || '',
    checked: false
  });
  
  emit('update:blocks', newBlocks);
  nextTick(() => {
    focusedBlockIndex.value = index + 1;
  });
}

function deleteBlock(index) {
  if (props.blocks.length === 1 && !props.blocks[0].content) {
    emit('update:blocks', []);
    focusedBlockIndex.value = -1;
    return;
  }
  const newBlocks = [...props.blocks];
  newBlocks.splice(index, 1);
  emit('update:blocks', newBlocks);
  if (index > 0) {
    focusedBlockIndex.value = index - 1;
  } else {
    focusedBlockIndex.value = 0;
  }
}

function moveFocusUp(index) {
  if (index > 0) focusedBlockIndex.value = index - 1;
}

function moveFocusDown(index) {
  if (index < props.blocks.length - 1) focusedBlockIndex.value = index + 1;
}

function focusEditorEnd(e) {
  // If clicking empty space at bottom, append a paragraph
  if (e.target === e.currentTarget && props.blocks.length > 0) {
    splitBlock(props.blocks.length - 1, '');
  }
}

function formatFocusedBlock(type) {
  if (focusedBlockIndex.value >= 0 && focusedBlockIndex.value < props.blocks.length) {
    const newBlocks = [...props.blocks];
    newBlocks[focusedBlockIndex.value].type = type;
    emit('update:blocks', newBlocks);
  } else if (props.blocks.length === 0) {
    emit('update:blocks', [{ id: Date.now().toString(), type, content: '' }]);
    focusedBlockIndex.value = 0;
  }
}

function focusLastBlock() {
  if (props.blocks.length > 0) {
    focusedBlockIndex.value = props.blocks.length - 1;
  }
}

defineExpose({ formatFocusedBlock, focusLastBlock });

import { computed } from 'vue';
</script>
