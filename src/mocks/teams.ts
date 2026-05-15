export const teams = ['Cupfee Deal', 'Angel Bridge', 'Musai', 'Photo Ground', 'Cake Way'] as const;

export type TeamName = (typeof teams)[number];

export const membersByTeam: Record<TeamName, string[]> = {
  'Cupfee Deal': ['강다혜', '권혜인', '류원', '박지수', '송유선', '윤영준', '이가빈', '이희원', '지민재', '최지원'],
  'Angel Bridge': ['김민수', '이서연', '박준혁', '정하은', '최우진'],
  Musai: ['김도윤', '이수빈', '박시현', '정예린', '한지호'],
  'Photo Ground': ['김하늘', '이정우', '박소연', '최민준', '윤채원'],
  'Cake Way': ['김지훈', '이나연', '박현우', '정다은', '송민지'],
};
