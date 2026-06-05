<template>
  <DashboardLayout>
    <div class="flex h-[calc(100vh-6rem)] overflow-hidden rounded-[32px] shadow-sm border transition-colors bg-[#FAFAF9] border-[#D9E2EC] dark:bg-transparent dark:border-transparent dark:shadow-none">
      
      <!-- Notes Sidebar Component -->
      <NotesSidebar 
        :notes="notes"
        :selectedNoteId="selectedNote?.id"
        v-model:searchQuery="filters.search"
        v-model:dimensionFilter="filters.focusDimension"
        :isLoading="isLoadingList"
        @create="openTemplatePicker"
        @select="selectNote"
        @toggle-pin="togglePin"
      />

      <!-- Main Content: Notes Explorer + Editor Preview -->
      <div class="flex-1 flex flex-col p-6 overflow-y-auto gap-6 bg-[#FAFAF9] dark:bg-dark-panel">
        
        <!-- Recently Edited: Bento Grid Style -->
        <div v-if="!selectedNote">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h2 class="text-xl font-black tracking-tight" :class="isDark ? 'text-text-primary' : 'text-navy-900'">Recently Edited</h2>
              <p class="text-sm font-medium mt-1" :class="isDark ? 'text-text-muted' : 'text-navy-500'">Pick up right where you left off</p>
            </div>
            <button class="text-sm font-bold flex items-center gap-1 transition-colors" :class="isDark ? 'text-text-faint hover:text-text-primary' : 'text-navy-400 hover:text-navy-900'">
              View History
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6" v-if="notes.length > 0">
            <!-- Small Stacked Cards -->
            <div class="col-span-1 flex flex-col gap-6">
              <div v-for="note in notes.slice(1, 3)" :key="note.id" class="flex-1 bg-white dark:bg-dark-panel rounded-2xl p-4 border border-[#D9E2EC] dark:border-dark-border shadow-sm hover:border-brand-200 dark:hover:border-brand-500/30 transition-shadow relative overflow-hidden group cursor-pointer" @click="selectNote(note.id)">
                <div class="flex items-center justify-between mb-2">
                  <span class="px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-500 text-[9px] font-black uppercase tracking-widest">{{ note.focus_dimension || 'General' }}</span>
                </div>
                <h3 class="text-sm font-black text-navy-900 dark:text-text-primary leading-snug group-hover:text-brand-500 transition-colors">{{ note.title || 'Untitled' }}</h3>
                <p class="text-xs text-navy-500 dark:text-text-muted mt-1 line-clamp-2">{{ note.content_text || 'No content' }}</p>
              </div>
            </div>

            <!-- Large Card -->
            <div v-if="notes.length > 0" class="col-span-2 bg-white dark:bg-dark-panel rounded-2xl p-6 border border-[#D9E2EC] dark:border-dark-border shadow-sm hover:border-brand-200 dark:hover:border-brand-500/30 transition-shadow relative overflow-hidden group cursor-pointer" @click="selectNote(notes[0].id)">
              <div class="flex items-center justify-between mb-4">
                <div class="flex gap-2">
                  <span class="px-3 py-1 rounded-full bg-[#E8EDF2] dark:bg-dark-surface text-navy-700 dark:text-text-primary text-[10px] font-black uppercase tracking-widest border border-[#D9E2EC] dark:border-dark-border">{{ notes[0].focus_dimension || 'General' }}</span>
                </div>
                <span class="text-[11px] font-bold text-navy-400 dark:text-text-faint">Recent</span>
              </div>
              <h3 class="text-xl font-black text-navy-900 dark:text-text-primary mb-2 group-hover:text-brand-500 transition-colors max-w-sm leading-tight">{{ notes[0].title || 'Untitled' }}</h3>
              <p class="text-sm text-navy-500 dark:text-text-muted max-w-md line-clamp-2 mb-4">{{ notes[0].content_text || 'No content' }}</p>
            </div>
          </div>
          <div v-else class="text-navy-500 dark:text-text-muted text-sm font-bold text-center mt-10">No recent notes. Create one to get started!</div>
        </div>

        <!-- Distraction-Free Editor Preview Section -->
        <div class="flex-1 bg-white dark:bg-dark-panel rounded-[32px] border border-[#D9E2EC] dark:border-dark-border shadow-sm flex flex-col overflow-hidden relative">
          <!-- Editor Header -->
          <div class="h-16 border-b border-[#D9E2EC] dark:border-dark-border flex items-center justify-between px-6 bg-transparent shrink-0 z-10" v-if="selectedNote">
            <!-- Formatting Controls -->
            <div class="flex items-center gap-1 text-navy-500 dark:text-text-muted overflow-x-auto scrollbar-hide">
              <button @click="undo" :disabled="!canUndo" class="p-1.5 hover:bg-[#E8EDF2] dark:hover:bg-dark-surface rounded transition-colors disabled:opacity-30" title="Undo"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/></svg></button>
              <button @click="redo" :disabled="!canRedo" class="p-1.5 hover:bg-[#E8EDF2] dark:hover:bg-dark-surface rounded transition-colors mr-2 disabled:opacity-30" title="Redo"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6"/></svg></button>
              
              <div class="w-px h-5 bg-[#D9E2EC] dark:bg-dark-border mx-1"></div>
              
              <button @click="editorRef?.formatFocusedBlock('paragraph')" class="p-1.5 hover:bg-[#E8EDF2] dark:hover:bg-dark-surface rounded transition-colors" title="Text"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/></svg></button>
              <button @click="editorRef?.formatFocusedBlock('heading1')" class="p-1.5 hover:bg-[#E8EDF2] dark:hover:bg-dark-surface rounded transition-colors" title="Heading 1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h2m0 0v14m0-14h2M13 5h2m0 0v14m0-14h2M5 12h10"/></svg></button>
              <button @click="editorRef?.formatFocusedBlock('heading2')" class="p-1.5 hover:bg-[#E8EDF2] dark:hover:bg-dark-surface rounded transition-colors" title="Heading 2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5h2m0 0v14m0-14h2M14 5h2v6h2V5h2v14h-2v-6h-2v6h-2V5z"/></svg></button>
              <button @click="editorRef?.formatFocusedBlock('bullet')" class="p-1.5 hover:bg-[#E8EDF2] dark:hover:bg-dark-surface rounded transition-colors" title="Bullet List"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" stroke-dasharray="2 4"/></svg></button>
              <button @click="editorRef?.formatFocusedBlock('number')" class="p-1.5 hover:bg-[#E8EDF2] dark:hover:bg-dark-surface rounded transition-colors" title="Numbered List"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 6h13M7 12h13M7 18h13M4 6h.01M4 12h.01M4 18h.01"/></svg></button>
              <button @click="editorRef?.formatFocusedBlock('todo')" class="p-1.5 hover:bg-[#E8EDF2] dark:hover:bg-dark-surface rounded transition-colors" title="To-do List"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></button>
              <button @click="editorRef?.formatFocusedBlock('quote')" class="p-1.5 hover:bg-[#E8EDF2] dark:hover:bg-dark-surface rounded transition-colors" title="Quote"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg></button>
              <button @click="editorRef?.formatFocusedBlock('divider')" class="p-1.5 hover:bg-[#E8EDF2] dark:hover:bg-dark-surface rounded transition-colors" title="Divider"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg></button>
              
              <div class="w-px h-5 bg-[#D9E2EC] dark:bg-dark-border mx-1"></div>
              
              <button @click="editorRef?.formatFocusedBlock('image')" class="p-1.5 hover:bg-[#E8EDF2] dark:hover:bg-dark-surface rounded transition-colors text-brand-500" title="Add Image"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></button>
              <button @click="editorRef?.formatFocusedBlock('callout')" class="p-1.5 hover:bg-[#E8EDF2] dark:hover:bg-dark-surface rounded transition-colors text-yellow-500" title="Callout"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg></button>
              <button @click="editorRef?.formatFocusedBlock('reflection')" class="p-1.5 hover:bg-[#E8EDF2] dark:hover:bg-dark-surface rounded transition-colors text-rose-500" title="Reflection"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg></button>
            </div>
            
            <!-- Actions -->
            <div class="flex items-center gap-2">
              <div class="text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 mr-2" :class="saveStatusColor">
                <span class="w-1.5 h-1.5 rounded-full animate-pulse" :class="saveStatusBg"></span>
                <span class="hidden sm:inline">{{ saveStatusText }}</span>
              </div>

              
              <button @click="confirmDelete" class="p-2 text-navy-400 dark:text-text-faint hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors" title="Delete Note">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
              
              <button @click="exportToPDF" class="px-4 py-1.5 text-sm font-bold text-white btn-primary rounded-lg transition-all flex items-center gap-2 ml-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                Export Note
              </button>
            </div>
          </div>
          
          <!-- Mocking the NoteEditor functionality inside the specific view -->
          <div class="flex-1 overflow-y-auto bg-transparent p-8 lg:px-16 scrollbar-hide">
            <div v-if="selectedNote" class="max-w-4xl mx-auto w-full">
              <input v-model="selectedNote.title" class="w-full text-4xl font-black text-navy-900 dark:text-text-primary placeholder:text-navy-300 dark:placeholder:text-text-faint outline-none border-none focus:ring-0 p-0 mb-6 bg-transparent" placeholder="Untitled Note" @input="updateProperty('title', $event.target.value)" />
              <NoteEditor 
                ref="editorRef"
                :blocks="editorBlocks"
                @update:blocks="updateBlocksWithHistory"
              />
            </div>
            <div v-else class="h-full flex flex-col items-center justify-center opacity-50 pointer-events-none">
               <h3 class="text-2xl font-black text-navy-900 dark:text-text-primary mb-2">Neural Pathways in Habit Formation</h3>
               <p class="text-navy-500 dark:text-text-muted font-medium text-sm">Select a note or create a new one to begin writing.</p>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Modals -->
    <NoteTemplatePicker 
      :isOpen="isTemplatePickerOpen"
      :isLoading="isLoadingTemplates"
      :templates="templates"
      @close="isTemplatePickerOpen = false"
      @select="createNoteFromTemplate"
    />

    <!-- Delete Modal -->
    <Teleport to="body">
      <div v-if="showDeleteModal" class="fixed inset-0 bg-[#0B1120]/80 dark:bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" @click.self="showDeleteModal = false">
        <div class="bg-white dark:bg-dark-panel rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-slide-up border border-[#D9E2EC] dark:border-dark-border">
          <div class="p-6">
            <div class="w-12 h-12 bg-rose-50 dark:bg-rose-500/10 rounded-full flex items-center justify-center text-rose-500 mb-4 mx-auto">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </div>
            <h3 class="text-xl font-black text-center text-navy-900 dark:text-text-primary mb-2">Delete Note?</h3>
            <p class="text-navy-500 dark:text-text-muted text-sm text-center mb-6">Are you sure you want to delete this note? This action cannot be undone.</p>
            <div class="flex gap-3">
              <button @click="showDeleteModal = false" class="flex-1 py-2.5 px-4 rounded-xl font-bold text-navy-700 dark:text-text-primary bg-[#E8EDF2] dark:bg-dark-surface hover:bg-[#D9E2EC] dark:hover:bg-dark-border transition-colors">Cancel</button>
              <button @click="deleteNote" class="flex-1 py-2.5 px-4 rounded-xl font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-md shadow-rose-200 dark:shadow-none transition-colors">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { usePage } from '@inertiajs/vue3';
import DashboardLayout from '@/Layouts/DashboardLayout.vue';
import NotesSidebar from '@/Components/Notes/NotesSidebar.vue';
import NoteEditor from '@/Components/Notes/NoteEditor.vue';
import NotePropertiesPanel from '@/Components/Notes/NotePropertiesPanel.vue';
import NoteTemplatePicker from '@/Components/Notes/NoteTemplatePicker.vue';
import { notesApi, setAuthToken } from '@/services/notesApi';

// State
const notes = ref([]);
const selectedNote = ref(null);
const editorBlocks = ref([]);
const editorRef = ref(null);
const templates = ref([]);

// History for Undo/Redo
const blockHistory = ref([]);
const historyIndex = ref(-1);

import { computed } from 'vue';
const canUndo = computed(() => historyIndex.value > 0);
const canRedo = computed(() => historyIndex.value < blockHistory.value.length - 1);
const isDark = computed(() => document.documentElement.classList.contains('dark'));

// Delete Modal State
const showDeleteModal = ref(false);

const filters = ref({
  search: '',
  focusDimension: 'all'
});

const isLoadingList = ref(false);
const isLoadingTemplates = ref(false);
const isTemplatePickerOpen = ref(false);
const saveStatus = ref('saved'); // 'saved', 'saving', 'unsaved', 'error'
let autosaveTimeout = null;

// Query Params
const page = usePage();
const targetId = new URLSearchParams(window.location.search).get('target_id');
const sessionId = new URLSearchParams(window.location.search).get('session_id');

onMounted(async () => {
  setAuthToken(page.props.go_token);
  await fetchNotes();
  
  if (targetId || sessionId) {
    // Auto open new note modal if arriving from another page
    openTemplatePicker();
  }
});

async function fetchNotes() {
  isLoadingList.value = true;
  try {
    notes.value = await notesApi.getNotes();
  } catch (err) {
    console.error('Failed to fetch notes', err);
  } finally {
    isLoadingList.value = false;
  }
}

async function fetchTemplates() {
  if (templates.value.length > 0) return;
  isLoadingTemplates.value = true;
  try {
    templates.value = await notesApi.getTemplates();
  } catch (err) {
    console.error('Failed to fetch templates', err);
    // Fallback
    templates.value = [{ id: 'blank', title: 'Blank Note', content_json: '{"blocks":[]}' }];
  } finally {
    isLoadingTemplates.value = false;
  }
}

async function openTemplatePicker() {
  isTemplatePickerOpen.value = true;
  await fetchTemplates();
}

async function createNoteFromTemplate(tpl) {
  isTemplatePickerOpen.value = false;
  
  const blocks = tpl.content_json ? JSON.parse(tpl.content_json).blocks : [];
  
  const payload = {
    title: tpl.title === 'Blank Note' ? 'Untitled' : tpl.title,
    content_json: JSON.stringify({ blocks }),
    content_text: tpl.content_text || '',
    focus_dimension: 'General',
    target_id: targetId || null,
    planner_session_id: sessionId || null
  };
  
  try {
    const newNote = await notesApi.createNote(payload);
    notes.value.unshift(newNote);
    selectNote(newNote.id);
  } catch (err) {
    console.error('Create failed', err);
    alert('Failed to create note.');
  }
}

async function selectNote(id) {
  const note = notes.value.find(n => n.id === id);
  if (!note) return;
  
  // Try to fetch full details if needed, but list might have it all.
  try {
    const fullNote = await notesApi.getNote(id);
    selectedNote.value = fullNote;
    const blocks = fullNote.content_json ? JSON.parse(fullNote.content_json).blocks || [] : [];
    editorBlocks.value = blocks;
    
    // Initialize History
    blockHistory.value = [JSON.stringify(blocks)];
    historyIndex.value = 0;
    
    saveStatus.value = 'saved';

    // Auto-focus the last block
    nextTick(() => {
      if (editorRef.value && typeof editorRef.value.focusLastBlock === 'function') {
        editorRef.value.focusLastBlock();
      }
    });
  } catch (err) {
    console.error('Failed to load note details', err);
  }
}

function updateBlocksWithHistory(newBlocks) {
  editorBlocks.value = newBlocks;
  
  // Add to history if changed
  const newState = JSON.stringify(newBlocks);
  if (newState !== blockHistory.value[historyIndex.value]) {
    // Truncate future history if we're not at the end
    blockHistory.value = blockHistory.value.slice(0, historyIndex.value + 1);
    blockHistory.value.push(newState);
    // Keep max 50 history states
    if (blockHistory.value.length > 50) {
      blockHistory.value.shift();
    } else {
      historyIndex.value++;
    }
  }
  
  triggerAutosave();
}

function undo() {
  if (canUndo.value) {
    historyIndex.value--;
    editorBlocks.value = JSON.parse(blockHistory.value[historyIndex.value]);
    triggerAutosave();
  }
}

function redo() {
  if (canRedo.value) {
    historyIndex.value++;
    editorBlocks.value = JSON.parse(blockHistory.value[historyIndex.value]);
    triggerAutosave();
  }
}

function confirmDelete() {
  if (!selectedNote.value) return;
  showDeleteModal.value = true;
}

async function deleteNote() {
  if (!selectedNote.value) return;
  try {
    await notesApi.deleteNote(selectedNote.value.id);
    notes.value = notes.value.filter(n => n.id !== selectedNote.value.id);
    selectedNote.value = null;
    showDeleteModal.value = false;
  } catch (err) {
    console.error('Failed to delete', err);
  }
}

function updateProperty(field, value) {
  if (!selectedNote.value) return;
  selectedNote.value[field] = value;
  triggerAutosave();
}

async function togglePin(id) {
  try {
    const updated = await notesApi.togglePin(id);
    const index = notes.value.findIndex(n => n.id === id);
    if (index !== -1) notes.value[index] = updated;
    if (selectedNote.value?.id === id) selectedNote.value.is_pinned = updated.is_pinned;
  } catch (err) {
    console.error('Pin toggle failed', err);
  }
}

async function toggleArchive() {
  if (!selectedNote.value) return;
  try {
    const updated = await notesApi.toggleArchive(selectedNote.value.id);
    const index = notes.value.findIndex(n => n.id === updated.id);
    if (index !== -1) notes.value[index] = updated;
    selectedNote.value = null; // deselect after archive
  } catch (err) {
    console.error('Archive toggle failed', err);
  }
}



function extractText(blocks) {
  return blocks.map(b => b.content).join('\n');
}

function triggerAutosave() {
  if (saveStatus.value !== 'saving') {
    saveStatus.value = 'unsaved';
  }
  
  if (autosaveTimeout) clearTimeout(autosaveTimeout);
  
  autosaveTimeout = setTimeout(() => {
    saveNote();
  }, 1000);
}

async function saveNote() {
  if (!selectedNote.value) return;
  
  saveStatus.value = 'saving';
  
  const payload = {
    title: selectedNote.value.title,
    content_json: JSON.stringify({ blocks: editorBlocks.value }),
    content_text: extractText(editorBlocks.value),
    focus_dimension: selectedNote.value.focus_dimension,
    tags: selectedNote.value.tags,
    mood: selectedNote.value.mood,
    confidence_level: selectedNote.value.confidence_level ? parseInt(selectedNote.value.confidence_level) : null,
    target_id: selectedNote.value.target_id,
    planner_session_id: selectedNote.value.planner_session_id
  };

  try {
    const updated = await notesApi.updateNote(selectedNote.value.id, payload);
    const index = notes.value.findIndex(n => n.id === updated.id);
    if (index !== -1) notes.value[index] = updated;
    selectedNote.value = updated;
    saveStatus.value = 'saved';
  } catch (err) {
    console.error('Save failed', err);
    saveStatus.value = 'error';
  }
}

watch(() => selectedNote.value?.title, () => {
  if (selectedNote.value) triggerAutosave();
});

watch(editorBlocks, () => {
  if (selectedNote.value) triggerAutosave();
}, { deep: true });

function exportToPDF() {
  if (!selectedNote.value) {
    alert("Please select a note to export.");
    return;
  }
  
  // A simple and robust way to export to PDF without external libraries is to use the browser's print functionality 
  // paired with @media print CSS rules (which should hide sidebars and nav).
  window.print();
}

</script>
