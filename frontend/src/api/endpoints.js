// ============================================
// API Endpoint Helpers
// ============================================
import API from './axios';

// ---- Auth Endpoints ----
export const authAPI = {
  login: (data) => API.post('/auth/login', data),
  register: (data) => API.post('/auth/register', data),
  getMe: () => API.get('/auth/me'),
};

// ---- Project Endpoints ----
export const projectAPI = {
  getAll: (params) => API.get('/projects', { params }),
  getById: (id) => API.get(`/projects/${id}`),
  create: (data) => API.post('/projects', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (id, data) => API.put(`/projects/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id) => API.delete(`/projects/${id}`),
};

// ---- Skill Endpoints ----
export const skillAPI = {
  getAll: () => API.get('/skills'),
  create: (data) => API.post('/skills', data),
  update: (id, data) => API.put(`/skills/${id}`, data),
  delete: (id) => API.delete(`/skills/${id}`),
};

// ---- Message Endpoints ----
export const messageAPI = {
  send: (data) => API.post('/messages', data),
  getAll: () => API.get('/messages'),
  toggleRead: (id) => API.put(`/messages/${id}/read`),
  delete: (id) => API.delete(`/messages/${id}`),
};

// ---- Testimonial Endpoints ----
export const testimonialAPI = {
  getAll: () => API.get('/testimonials'),
  create: (data) => API.post('/testimonials', data),
  delete: (id) => API.delete(`/testimonials/${id}`),
};

// ---- Certification Endpoints ----
export const certificationAPI = {
  getAll: () => API.get('/certifications'),
  create: (data) => API.post('/certifications', data),
  delete: (id) => API.delete(`/certifications/${id}`),
};

// ---- Analytics API ----
export const analyticsAPI = {
  getViews: () => API.get('/analytics/views'),
  incrementViews: () => API.post('/analytics/views'),
};

// ---- GitHub API ----
export const githubAPI = {
  getRepos: (username) =>
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
      .then((res) => res.json()),
  getProfile: (username) =>
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json()),
};
