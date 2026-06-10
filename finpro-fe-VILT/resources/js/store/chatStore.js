import { ref, watch } from 'vue';
import { assessmentApi, plannerApi, targetsApi } from '@/services/workspaceApi';
import { notesApi } from '@/services/notesApi';

const savedChatOpen = sessionStorage.getItem('lumora_chat_open') === 'true';
const savedChatMessages = sessionStorage.getItem('lumora_chat_messages');

export const isChatOpen = ref(savedChatOpen);
export const chatMessages = ref(savedChatMessages ? JSON.parse(savedChatMessages) : []);
export const isSending = ref(false);
export const unreadChat = ref(false);

watch(isChatOpen, (val) => {
    sessionStorage.setItem('lumora_chat_open', val);
    if (val) unreadChat.value = false;
});

watch(chatMessages, (val) => {
    sessionStorage.setItem('lumora_chat_messages', JSON.stringify(val));
}, { deep: true });

export const sendChatMessage = async (text, srlProfile, scrollToBottomCallback) => {
    if (!text || isSending.value) return;

    chatMessages.value.push({ role: 'user', content: text });
    isSending.value = true;
    if (scrollToBottomCallback) await scrollToBottomCallback();

    try {
        const response = await assessmentApi.chat(text, JSON.stringify(srlProfile || {}));

        if (response && response.success) {
            let reply = response.data.reply;
            
            // Find multiple actions line by line
            let actionDataList = [];
            let cleanReply = reply;
            
            // 1. Check inside markdown blocks first
            const codeBlocks = reply.match(/```(?:json)?\s*([\s\S]*?)\s*```/g);
            if (codeBlocks) {
                for (const block of codeBlocks) {
                    const inner = block.replace(/```(?:json)?\s*([\s\S]*?)\s*```/, '$1');
                    const lines = inner.split('\n');
                    for (const line of lines) {
                        const trimmed = line.trim();
                        if (trimmed.startsWith('{"action"') && trimmed.endsWith('}')) {
                            try {
                                actionDataList.push(JSON.parse(trimmed));
                                cleanReply = cleanReply.replace(trimmed, '');
                            } catch (e) {}
                        }
                    }
                    cleanReply = cleanReply.replace(block, '');
                }
            }

            // 2. Check plain lines with regex to catch single/double quotes
            const actionRegex = /\{[\s]*["']action["']\s*:[\s\S]*?\}/g;
            const matches = cleanReply.match(actionRegex);
            if (matches) {
                for (const match of matches) {
                    try {
                        // Replace single quotes with double quotes for valid JSON parsing
                        let jsonStr = match.replace(/'/g, '"');
                        actionDataList.push(JSON.parse(jsonStr));
                        cleanReply = cleanReply.replace(match, '');
                    } catch (e) {
                        console.error('Failed to parse AI action:', e);
                        // Strip it anyway to hide it from UI
                        cleanReply = cleanReply.replace(match, '');
                    }
                }
            }
            
            cleanReply = cleanReply.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
            reply = cleanReply;

            console.log('[Lumora AI] Found actions:', actionDataList);
            
            let actionTextAdded = false;

            for (const actionData of actionDataList) {
                try {
                    if (actionData.action === 'create_note') {
                        const blocks = [{ id: Date.now().toString(), type: 'paragraph', content: actionData.content || '' }];
                        await notesApi.createNote({
                            title: actionData.title || 'AI Note',
                            content_json: JSON.stringify({ blocks }),
                            content_text: actionData.content || '',
                            focus_dimension: 'General'
                        });
                        reply += '\n\n✨ **I have successfully created the note for you!** You can view it in your Notes tab.';
                    } else if (actionData.action === 'create_planner') {
                        await plannerApi.createSession({
                            title: actionData.title || 'AI Planned Session',
                            description: actionData.description || 'Created via Lumora Buddy',
                            date: actionData.date || new Date().toISOString().split('T')[0],
                            start_time: actionData.start_time || '09:00',
                            end_time: actionData.end_time || '10:00',
                            focus_dimension: 'General'
                        });
                        window.dispatchEvent(new CustomEvent('planner-updated'));
                        reply += '\n\n✨ **I have successfully scheduled the session for you!** Check your Planner tab.';
                    } else if (actionData.action === 'create_target') {
                        // Build subtasks array from AI response
                        const subtaskInputs = [];
                        if (Array.isArray(actionData.subtasks) && actionData.subtasks.length > 0) {
                            for (const st of actionData.subtasks) {
                                const title = typeof st === 'string' ? st : st.title;
                                if (title) subtaskInputs.push({ title });
                            }
                        }
                        // Ensure at least 1 subtask (system requires it for progress tracking)
                        if (subtaskInputs.length === 0) {
                            subtaskInputs.push({ title: 'Break down this target into actionable steps' });
                        }
                        
                        console.log('[Lumora AI] Creating target with subtasks:', subtaskInputs);
                        // Calculate default due_date (end of current week - Sunday)
                        const today = new Date();
                        const dayOfWeek = today.getDay();
                        const sunday = new Date(today);
                        sunday.setDate(today.getDate() + (7 - dayOfWeek));
                        const defaultDueDate = sunday.toISOString().split('T')[0];

                        const newTarget = await targetsApi.createTarget({
                            title: actionData.title || 'AI Weekly Target',
                            description: actionData.description || '',
                            focus_dimension: 'General',
                            priority: 'medium',
                            due_date: actionData.due_date || defaultDueDate,
                            subtasks: subtaskInputs
                        });
                        console.log('[Lumora AI] createTarget response:', newTarget);
                        
                        // If backend didn't handle inline subtasks, create them individually
                        if (newTarget && newTarget.id && (!newTarget.subtasks || newTarget.subtasks.length === 0)) {
                            for (const st of subtaskInputs) {
                                try {
                                    await targetsApi.createSubtask(newTarget.id, { title: st.title });
                                } catch (subErr) {
                                    console.error('[Lumora AI] Subtask creation failed:', subErr);
                                }
                            }
                        }
                        window.dispatchEvent(new CustomEvent('target-updated'));
                        reply += '\n\n✨ **I have successfully created your target!** Check your Weekly Targets tab.';
                    } else if (actionData.action === 'edit_note' && actionData.id) {
                        await notesApi.updateNote(actionData.id, {
                            title: actionData.title,
                            content_text: actionData.content
                        });
                        reply += '\n\n✨ **I have updated your note!**';
                    } else if (actionData.action === 'delete_note' && actionData.id) {
                        await notesApi.deleteNote(actionData.id);
                        reply += '\n\n🗑️ **I have deleted the note.**';
                    } else if (actionData.action === 'edit_planner' && actionData.id) {
                        await plannerApi.updateSession(actionData.id, {
                            title: actionData.title,
                            date: actionData.date,
                            start_time: actionData.start_time,
                            end_time: actionData.end_time
                        });
                        window.dispatchEvent(new CustomEvent('planner-updated'));
                        reply += '\n\n✨ **I have updated your planner session!**';
                    } else if (actionData.action === 'delete_planner' && actionData.id) {
                        await plannerApi.deleteSession(actionData.id);
                        window.dispatchEvent(new CustomEvent('planner-deleted', { detail: actionData.id }));
                        reply += '\n\n🗑️ **I have deleted the planner session.**';
                    } else if (actionData.action === 'edit_target' && actionData.id) {
                        await targetsApi.updateTarget(actionData.id, {
                            title: actionData.title,
                            description: actionData.description
                        });
                        window.dispatchEvent(new CustomEvent('target-updated'));
                        reply += '\n\n✨ **I have updated your weekly target!**';
                    } else if (actionData.action === 'delete_target' && actionData.id) {
                        await targetsApi.deleteTarget(actionData.id);
                        window.dispatchEvent(new CustomEvent('target-updated'));
                        reply += '\n\n🗑️ **I have deleted your weekly target.**';
                    }
                } catch (e) {
                    console.error("[Lumora AI] Failed to execute AI action:", e);
                    if (!actionTextAdded) {
                        reply += '\n\n⚠️ I tried to perform an action but encountered an error.';
                        actionTextAdded = true;
                    }
                }
            }

            chatMessages.value.push({ role: 'bot', content: reply });
            if (!isChatOpen.value) unreadChat.value = true;
        } else {
            chatMessages.value.push({ role: 'bot', content: 'Oops! Something went wrong.' });
            if (!isChatOpen.value) unreadChat.value = true;
        }
    } catch (err) {
        console.error(err);
        const errMsg = err.response?.data?.message || err.message || 'Network error. Please try again.';
        chatMessages.value.push({ role: 'bot', content: 'Error: ' + errMsg });
        if (!isChatOpen.value) unreadChat.value = true;
    } finally {
        isSending.value = false;
        if (scrollToBottomCallback) await scrollToBottomCallback();
    }
};

export const fetchChatHistory = async () => {
    try {
        isSending.value = true;
        const logs = await assessmentApi.getChatHistory();
        if (logs && logs.length > 0) {
            chatMessages.value = logs;
        }
    } catch (err) {
        console.error("Failed to load chat history:", err);
    } finally {
        isSending.value = false;
    }
};
