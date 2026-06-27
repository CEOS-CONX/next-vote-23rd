// 클라이언트 → Next.js Route Handler 경로
export const API_ROUTES = {
  auth: {
    login: '/api/auth/login',
    signup: '/api/auth/signup',
    logout: '/api/auth/logout',
    me: '/api/auth/me',
    refresh: '/api/auth/refresh',
  },
  vote: {
    votes: (pollId: number) => `/api/polls/${pollId}/votes`, //post, patch, delete
    myVote: (pollId: number) => `/api/polls/${pollId}/votes/me`, //get
    results: (pollId: number) => `/api/polls/${pollId}/results`, //get
  },
} as const;

// Next.js Route Handler → 백엔드 경로
export const BACKEND_ENDPOINTS = {
  auth: {
    login: '/api/v1/auth/login',
    signup: '/api/v1/auth/signup',
  },
  vote: {
    votes: (pollId: number) => `/api/v1/polls/${pollId}/votes`,
    myVote: (pollId: number) => `/api/v1/polls/${pollId}/votes/me`,
    results: (pollId: number) => `/api/v1/polls/${pollId}/results`,
  },
} as const;
