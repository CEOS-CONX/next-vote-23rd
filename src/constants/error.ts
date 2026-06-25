export const ERROR_CODES = {
  DUPLICATE_USER_ID: 'E001',
  DUPLICATE_EMAIL: 'E002',
  AUTH_REQUIRED: 'E004',
  VOTE_NOT_FOUND: 'E005',
  CANDIDATE_NOT_FOUND: 'E006',
  INVALID_CANDIDATE: 'E007',
} as const;

export const ERROR_MESSAGES: Record<string, string> = {
  [ERROR_CODES.DUPLICATE_USER_ID]: '이미 사용 중인 아이디입니다.',
  [ERROR_CODES.DUPLICATE_EMAIL]: '이미 사용 중인 이메일입니다.',
  [ERROR_CODES.AUTH_REQUIRED]: '로그인이 필요합니다.',
  [ERROR_CODES.VOTE_NOT_FOUND]: '투표를 찾을 수 없습니다.',
  [ERROR_CODES.CANDIDATE_NOT_FOUND]: '후보를 찾을 수 없습니다.',
  [ERROR_CODES.INVALID_CANDIDATE]: '해당 투표의 후보가 아닙니다.',
};
