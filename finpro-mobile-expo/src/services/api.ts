// API Service for Lumora Mobile
// Connects to the Go backend at localhost:8008

import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

// Detect and use correct URL dynamically
export const getBaseUrl = () => {
  // In development with Expo Go, this gets the current local IP automatically
  const debuggerHost = Constants.expoConfig?.hostUri;
  if (debuggerHost) {
    // debuggerHost is like "192.168.1.56:8081", we just want the IP
    const ip = debuggerHost.split(':')[0];
    return `http://${ip}:8008`;
  }

  // Fallback IP if running outside of Expo Go / production
  return 'http://192.168.1.56:8008';
};

export const getAvatarUrl = (path: string): string | null => {
  if (!path) return null;
  if (path.startsWith('http')) return path;

  const debuggerHost = Constants.expoConfig?.hostUri;
  const ip = debuggerHost ? debuggerHost.split(':')[0] : '192.168.1.56';

  // Avatar path from DB is like "/storage/avatars/xxx.jpg"
  // Go backend now serves this at http://IP:8008/storage/avatars/xxx.jpg
  if (path.startsWith('/storage/')) {
    return `http://${ip}:8008${path}`;
  }

  // Go-uploaded avatars served at /uploads/
  if (path.startsWith('/uploads/')) {
    return `http://${ip}:8008${path}`;
  }

  return `http://${ip}:8008${path}`;
};

// Token management
export const getToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync('auth_token');
  } catch {
    return null;
  }
};

export const setToken = async (token: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync('auth_token', token);
  } catch (e) {
    console.error('Error saving token', e);
  }
};

export const removeToken = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync('auth_token');
  } catch (e) {
    console.error('Error removing token', e);
  }
};

// Generic fetch wrapper
const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const token = await getToken();
  const url = `${getBaseUrl()}/api${endpoint}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `HTTP ${response.status}`);
  }

  return data;
};

// ─── Auth API ───────────────────────────────────────────────
export const authApi = {
  login: async (email: string, password: string) => {
    const res = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.data?.token) {
      await setToken(res.data.token);
    }
    return res;
  },

  register: async (name: string, email: string, password: string) => {
    const res = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    if (res.data?.token) {
      await setToken(res.data.token);
    }
    return res;
  },

  getMe: async () => {
    return await apiRequest('/auth/me', {
      method: 'GET',
    });
  },

  updateProfile: async (formData: FormData) => {
    const token = await getToken();
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/auth/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    return await res.json();
  },

  logout: async () => {
    await removeToken();
  },
};

// ─── Assessment API ─────────────────────────────────────────
export const assessmentApi = {
  getQuestions: () => apiRequest('/assessment/questions'),
  submit: (answers: Array<{ question_id: string; answer_value: number }>) =>
    apiRequest('/assessment/submit', {
      method: 'POST',
      body: JSON.stringify(answers),
    }),
  getStatus: () => apiRequest('/assessment/status'),
  chat: (message: string) =>
    apiRequest('/assessment/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    }),
  getChatHistory: () => apiRequest('/assessment/chat/history'),
};

// ─── Dashboard API ──────────────────────────────────────────
export const dashboardApi = {
  getMetrics: () => apiRequest('/dashboard'),
  getProgress: () => apiRequest('/dashboard/progress'),
  getNotifications: () => apiRequest('/dashboard/notifications'),
  getAIStrategies: () => apiRequest('/dashboard/ai-strategies'),
  search: (query: string) => apiRequest(`/dashboard/search?q=${encodeURIComponent(query)}`),
};

// ─── Planner API ────────────────────────────────────────────
export const plannerApi = {
  getSessions: () => apiRequest('/dashboard/planner'),
  createSession: (data: any) =>
    apiRequest('/dashboard/planner', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getSession: (id: string) => apiRequest(`/dashboard/planner/${id}`),
  updateSession: (id: string, data: any) =>
    apiRequest(`/dashboard/planner/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  deleteSession: (id: string) =>
    apiRequest(`/dashboard/planner/${id}`, { method: 'DELETE' }),
  completeSession: (id: string) =>
    apiRequest(`/dashboard/planner/${id}/complete`, { method: 'PATCH' }),
  skipSession: (id: string) =>
    apiRequest(`/dashboard/planner/${id}/skip`, { method: 'PATCH' }),
  getGoogleEvents: () => apiRequest('/dashboard/calendar/events'),
  getGoogleStatus: () => apiRequest('/dashboard/calendar/status'),
  disconnectGoogle: () => apiRequest('/dashboard/calendar/disconnect', { method: 'DELETE' }),
};

// ─── Targets API ────────────────────────────────────────────
export const targetsApi = {
  getTargets: () => apiRequest('/dashboard/weekly-targets'),
  createTarget: (data: any) =>
    apiRequest('/dashboard/weekly-targets', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateTarget: (id: string, data: any) =>
    apiRequest(`/dashboard/weekly-targets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  deleteTarget: (id: string) =>
    apiRequest(`/dashboard/weekly-targets/${id}`, { method: 'DELETE' }),
  createSubtask: (targetId: string, data: any) =>
    apiRequest(`/dashboard/weekly-targets/${targetId}/subtasks`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  deleteSubtask: (targetId: string, subtaskId: string) =>
    apiRequest(`/dashboard/weekly-targets/${targetId}/subtasks/${subtaskId}`, {
      method: 'DELETE',
    }),
  toggleSubtask: (targetId: string, subtaskId: string) =>
    apiRequest(`/dashboard/weekly-targets/${targetId}/subtasks/${subtaskId}/toggle`, {
      method: 'PATCH',
    }),
};

// ─── Notes API ──────────────────────────────────────────────
export const notesApi = {
  getNotes: () => apiRequest('/dashboard/notes'),
  getTemplates: () => apiRequest('/dashboard/notes/templates'),
  createNote: (data: any) =>
    apiRequest('/dashboard/notes', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getNoteById: (id: string) => apiRequest(`/dashboard/notes/${id}`),
  updateNote: (id: string, data: any) =>
    apiRequest(`/dashboard/notes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  deleteNote: (id: string) =>
    apiRequest(`/dashboard/notes/${id}`, { method: 'DELETE' }),
  togglePin: (id: string) =>
    apiRequest(`/dashboard/notes/${id}/pin`, { method: 'PUT' }),
};
