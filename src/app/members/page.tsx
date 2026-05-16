'use client';
import { useState } from 'react';
import Image from 'next/image';
import Members from '@/assets/shapes/members.svg';
import memberProfile from '@/assets/shapes/member_profile.png';
import { membersByPart, PARTS, type Part } from '@/mocks/teams';

const PART_LABELS: Record<Part, string> = {
  PM: 'PM',
  DESIGN: 'DESIGN',
  FE: 'FRONT - END',
  BE: 'BACK - END',
};

function MemberCard({ name }: { name: string }) {
  return (
    <li className="relative w-full">
      <Image
        src={memberProfile}
        alt=""
        className="h-auto w-full"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 text-center whitespace-nowrap">
        <p className="text-subhead-bold text-foreground">{name}</p>
        <p className="text-body2 text-white">CEOS UNIV</p>
        <p className="text-body2 text-white">Computer Science</p>
      </div>
    </li>
  );
}

export default function MembersPage() {
  const [activePart, setActivePart] = useState<Part>('FE');
  const members = [...membersByPart[activePart]].sort((a, b) => a.localeCompare(b, 'ko'));

  return (
    <main className="min-h-screen w-full px-0 py-20 max-md:px-5 max-md:py-12">
      <div className="mx-auto flex w-full max-w-[1280px] gap-20 max-lg:gap-12 max-md:flex-col max-md:gap-8">
        {/* 파트 탭 */}
        <aside className="shrink-0 max-md:w-full">
          {/* 데스크탑 */}
          <div className="relative w-[237px] max-md:hidden">
            <Members className="block h-auto w-full" />
            <ul className="absolute top-[3.16%] left-[4.85%] flex h-[72.5%] w-[65%] flex-col justify-evenly px-3">
              {PARTS.map((part) => {
                const isActive = activePart === part;
                return (
                  <li key={part}>
                    <button
                      type="button"
                      onClick={() => setActivePart(part)}
                      className={`text-foreground text-left hover:opacity-70 ${
                        isActive ? 'text-subhead-bold underline' : 'text-subhead'
                      }`}
                    >
                      {PART_LABELS[part]}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 모바일 */}
          <ul className="hidden gap-2 overflow-x-auto max-md:flex">
            {PARTS.map((part) => {
              const isActive = activePart === part;
              return (
                <li key={part}>
                  <button
                    type="button"
                    onClick={() => setActivePart(part)}
                    className={`text-body1-med rounded-full border px-4 py-2 whitespace-nowrap ${
                      isActive
                        ? 'bg-foreground border-foreground text-white'
                        : 'text-foreground border-border'
                    }`}
                  >
                    {PART_LABELS[part]}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* 프로필카드 */}
        <section className="flex-1">
          <h2 className="font-suite text-headline3 text-foreground">23th MEMBERS</h2>
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 max-md:mt-6 max-md:grid-cols-1 max-md:gap-y-3">
            {members.map((name) => (
              <MemberCard key={name} name={name} />
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
