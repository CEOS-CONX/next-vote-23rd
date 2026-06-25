// 클라이언트 → Next.js Route Handler 경로
export const API_ROUTES = {
  auth: {
    login: '/api/auth/login',
    signup: '/api/auth/signup',
    logout: '/api/auth/logout',
    me: '/api/auth/me',
    refresh: '/api/auth/refresh',
  },
} as const;

// Next.js Route Handler → 백엔드 경로
export const BACKEND_ENDPOINTS = {
  auth: {
    login: '/api/v1/auth/login',
    signup: '/api/v1/auth/signup',
  },
} as const;
