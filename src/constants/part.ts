export const PARTS = {
  FRONTEND: { label: 'FRONT-END', display: 'FRONT - END', value: 'FRONTEND' },
  BACKEND: { label: 'BACK-END', display: 'BACK - END', value: 'BACKEND' },
} as const;

export type PartKey = keyof typeof PARTS;
