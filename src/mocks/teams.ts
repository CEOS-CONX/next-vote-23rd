export const teams = ['Ditda', 'JobDri', 'Groupeat', 'IPX', 'CONX'] as const;

export type TeamName = (typeof teams)[number];

export const PARTS = ['PM', 'DESIGN', 'FE', 'BE'] as const;

export type Part = (typeof PARTS)[number];

export const teamMembers: Record<TeamName, Record<Part, string[]>> = {
  Ditda: {
    PM: ['문현승', '오유준'],
    DESIGN: ['문수인', '고다현'],
    FE: ['박유민', '권오진'],
    BE: ['임종훈', '안준석'],
  },
  JobDri: {
    PM: ['안민용', '이소은'],
    DESIGN: ['김미소', '오상헌'],
    FE: ['이윤서', '구민교'],
    BE: ['황신애', '최우혁'],
  },
  Groupeat: {
    PM: ['안세빈', '안서연'],
    DESIGN: ['김예린', '김은홍'],
    FE: ['이승연', '황영준'],
    BE: ['김동욱', '최승원'],
  },
  IPX: {
    PM: ['이정원', '변성우'],
    DESIGN: ['김정원', '권지민'],
    FE: ['남기림', '김민서'],
    BE: ['오지송', '김태익'],
  },
  CONX: {
    PM: ['조아현', '김채원'],
    DESIGN: ['우유민', '이우림'],
    FE: ['김홍엽', '오유진'],
    BE: ['김태희', '김도현'],
  },
};

export const membersByTeam: Record<TeamName, string[]> = Object.fromEntries(
  teams.map((team) => [team, PARTS.flatMap((part) => teamMembers[team][part])]),
) as Record<TeamName, string[]>;

export const membersByPart: Record<Part, string[]> = Object.fromEntries(
  PARTS.map((part) => [part, teams.flatMap((team) => teamMembers[team][part])]),
) as Record<Part, string[]>;
