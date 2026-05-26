// API Service for Lumora Mobile
// Connects to the Go backend at localhost:8008

import AsyncStorage from '@react-native-async-storage/async-storage';

// Change this to your computer's local IP if testing on a physical device
// e.g., 'http://192.168.1.100:8008'
const BASE_URL = 'http://10.39.30.165:8008'; // Physical Device via Wi-Fi
const PHYSICAL_DEVICE_URL = 'http://192.168.0.100:8008'; // Will be configured

// Detect and use correct URL
export const getBaseUrl = () => {
  // For physical devices connected via USB, use your PC's local network IP
  // For emulators, 10.0.2.2 maps to localhost
  return BASE_URL;
};

// Token management
export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('auth_token');
  } catch {
    return null;
  }
};

export const setToken = async (token: string): Promise<void> => {
  await AsyncStorage.setItem('auth_token', token);
};

export const removeToken = async (): Promise<void> => {
  await AsyncStorage.removeItem('auth_token');
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
  toggleSubtask: (targetId: string, subtaskId: string) =>
    apiRequest(`/dashboard/weekly-targets/${targetId}/subtasks/${subtaskId}/toggle`, {
      method: 'PATCH',
    }),
};

// ─── Notes API ──────────────────────────────────────────────
export const notesApi = {
  getNotes: () => apiRequest('/dashboard/notes'),
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
