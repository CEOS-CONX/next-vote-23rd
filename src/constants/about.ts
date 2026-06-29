export interface AboutMember {
  nameEn: string;
  part: 'FE' | 'BE';
  contributions: string[];
}

export const ABOUT_MEMBERS: AboutMember[] = [
  {
    nameEn: 'KIM HONGYEOP',
    part: 'FE',
    contributions: ['Setting', 'Auth', 'Members', 'About Us', 'Deploy'],
  },
  { nameEn: 'OH YUJIN', part: 'FE', contributions: ['Voting', 'Common', 'Members'] },
  { nameEn: 'KIM DOHYUN', part: 'BE', contributions: ['Members', 'Auth', 'Infra'] },
  { nameEn: 'KIM TAEHEE', part: 'BE', contributions: ['Voting', 'Swagger'] },
];
