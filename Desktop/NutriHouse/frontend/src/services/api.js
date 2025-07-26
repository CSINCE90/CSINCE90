import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:9090',
  headers: { 'Content-Type': 'application/json' },
});

// 🔐  Interceptor: aggiunge automaticamente il token JWT a ogni richiesta
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ============ AUTH ============

export const login = (credentials) =>
  api.post('/auth/login', credentials).then((r) => r.data);

export const register = (dati) =>
  api.post('/auth/register', dati).then((r) => r.data);

// ============ USERS ============

export const getUsers = () => api.get('/users').then((r) => r.data);

export const createUser = (data) =>
  api.post('/users', data).then((r) => r.data);

// ============ PAZIENTI ============

export const getPazienti = () => api.get('/pazienti').then((r) => r.data);

export const getPazienteById = (id) =>
  api.get(`/pazienti/${id}`).then((r) => r.data);

export const createPaziente = (data) =>
  api.post('/pazienti', data).then((r) => r.data);

// ============ ALLERGIE ============

export const getAllergie = () => api.get('/allergie').then((r) => r.data);

export const createAllergia = (data) =>
  api.post('/allergie', data).then((r) => r.data);

// ============ PAZIENTE-ALLERGIE ============

export const getPazienteAllergie = () =>
  api.get('/paziente-allergie').then((r) => r.data);

export const createPazienteAllergia = (data) =>
  api.post('/paziente-allergie', data).then((r) => r.data);

// ============ ALIMENTI ============

export const getAlimenti = () => api.get('/alimenti').then((r) => r.data);

export const createAlimento = (data) =>
  api.post('/alimenti', data).then((r) => r.data);

// ============ DIETE ============

export const getDiete = () => api.get('/diete').then((r) => r.data);

export const createDieta = (data) =>
  api.post('/diete', data).then((r) => r.data);

// ============ DIETA-ALIMENTO ============

export const getDietaAlimenti = () =>
  api.get('/dieta-alimento').then((r) => r.data);

export const createDietaAlimento = (data) =>
  api.post('/dieta-alimento', data).then((r) => r.data);

export const createDietaAlimentoBulk = (data) =>
  api.post('/dieta-alimento/bulk', data).then((r) => r.data);

// Export default instance in caso serva altrove
export default api;