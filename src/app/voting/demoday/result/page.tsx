'use client';

import Link from 'next/link';
import Image from 'next/image';
import { IoChevronForward } from 'react-icons/io5';
import no1 from '@/assets/shapes/no1.png';
import no2 from '@/assets/shapes/no2.png';
import no3 from '@/assets/shapes/no3.png';
import Star from '@/assets/shapes/Star.png';
import Star16 from '@/assets/shapes/Star16.png';

interface Result {
  rank: 1 | 2 | 3;
  team: string;
  votes: number;
}

// 임시 mock
const results: Result[] = [
  { rank: 1, team: 'CONX', votes: 25 },
  { rank: 2, team: 'Groupeat', votes: 18 },
  { rank: 3, team: 'Ditda', votes: 12 },
];

const RANK_IMAGES = { 1: no1, 2: no2, 3: no3 } as const;

function ResultCard({ rank, team, votes }: Result) {
  return (
    <div className="relative inline-block w-[280px] max-md:w-[220px]">
      <Image
        src={RANK_IMAGES[rank]}
        alt={`${rank}위`}
        className="h-auto w-full"
        sizes="(max-width: 768px) 220px, 280px"
        priority
      />
      <span className="text-subhead-bold text-foreground absolute top-[60%] left-[58%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
        {team} | {votes}표
      </span>
    </div>
  );
}

export default function DemoDayResultPage() {
  return (
    <main className="min-h-screen w-full px-0 py-32 max-md:px-5 max-md:py-20">
      {/* Desktop layout — staircase */}
      <div className="relative mx-auto h-[680px] w-full max-w-[1100px] max-md:hidden">
        {/* Decorations */}
        <Image
          src={Star16}
          alt=""
          aria-hidden
          className="absolute top-[8%] right-[12%] h-auto w-[140px]"
          sizes="140px"
        />
        <Image
          src={Star}
          alt=""
          aria-hidden
          className="absolute top-[42%] left-[6%] h-auto w-[150px]"
          sizes="150px"
        />
        <Image
          src={Star}
          alt=""
          aria-hidden
          className="absolute right-[6%] bottom-[12%] h-auto w-[90px]"
          sizes="90px"
        />

        {/* Connecting lines */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* 1위 → 2위: 오른쪽으로 뻗어서 아래로 내려가 2위 위에 닿음 */}
          <path
            d="M 50 25 L 67 25 L 67 40"
            stroke="#191F28"
            strokeWidth="2"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
          {/* 2위 → 3위: 아래로 내려가 왼쪽으로 가서 3위 위에 닿음 */}
          <path
            d="M 67 62 L 67 80 L 47 80"
            stroke="#191F28"
            strokeWidth="2"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
          {/* 3위 → main link: 오른쪽으로 직선 */}
          <path
            d="M 47 90 L 68 90"
            stroke="#191F28"
            strokeWidth="2"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* 1위 */}
        <div className="absolute top-[12%] left-[24%]">
          <ResultCard {...results[0]} />
        </div>

        {/* 2위 */}
        <div className="absolute top-[40%] left-[52%]">
          <ResultCard {...results[1]} />
        </div>

        {/* 3위 */}
        <div className="absolute top-[68%] left-[22%]">
          <ResultCard {...results[2]} />
        </div>

        {/* Main link */}
        <Link
          href="/"
          className="text-subhead-bold text-foreground absolute top-[87%] left-[68%] inline-flex items-center gap-1 hover:opacity-70"
        >
          메인으로 가기
          <IoChevronForward aria-hidden className="text-[1em]" />
        </Link>
      </div>

      {/* Mobile layout — 세로 스택 */}
      <div className="hidden flex-col items-center gap-12 max-md:flex">
        <Image src={Star16} alt="" aria-hidden className="h-auto w-[80px] self-end" sizes="80px" />
        {results.map((r) => (
          <ResultCard key={r.rank} {...r} />
        ))}
        <Link
          href="/"
          className="text-subhead-bold text-foreground mt-4 inline-flex items-center gap-1 self-end hover:opacity-70"
        >
          메인으로 가기
          <IoChevronForward aria-hidden className="text-[1em]" />
        </Link>
      </div>
    </main>
  );
}
