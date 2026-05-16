'use client';

import { useState } from 'react';
import { IoChevronForward } from 'react-icons/io5';
import Leader from '@/assets/shapes/Leader_bf.svg';
import VoteTitle from '@/assets/shapes/vote_title.svg';
import { teamMembers, teams, type Part } from '@/mocks/teams';

interface Props {
  part: Extract<Part, 'FE' | 'BE'>;
}

export default function PartLeaderVote({ part }: Props) {
  const [titleHovered, setTitleHovered] = useState(false);
  const [selectedName, setSelectedName] = useState<string | null>(null);

  const names = teams
    .flatMap((team) => teamMembers[team][part])
    .sort((a, b) => a.localeCompare(b, 'ko'));

  const showVote = titleHovered || selectedName !== null;

  const handleSubmit = () => {
    if (!selectedName) return;
    // TODO: 실제 투표 API 연동
    console.log(`Vote for ${part} leader:`, selectedName);
  };

  return (
    <main className="min-h-screen w-full px-0 py-32 max-md:px-5 max-md:py-20">
      <div className="mx-auto flex w-full max-w-[1280px] flex-row items-start justify-center gap-32 max-lg:gap-20 max-md:flex-col max-md:items-center max-md:justify-normal max-md:gap-12">
        {/* Leader Title */}
        <div className="w-full max-w-[455px] max-md:max-w-[277px]">
          <button
            type="button"
            onMouseEnter={() => setTitleHovered(true)}
            onMouseLeave={() => setTitleHovered(false)}
            onClick={handleSubmit}
            disabled={!selectedName}
            className="group relative block aspect-[280/141] w-full transition-transform duration-300 disabled:cursor-default"
          >
            {showVote ? (
              <VoteTitle className="absolute inset-0 h-full w-full" />
            ) : (
              <Leader className="absolute inset-0 h-full w-full" />
            )}

            <span className="text-subhead text-foreground absolute top-[35%] left-[27%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap max-md:top-[58%] max-md:left-[40%]">
              {part} - LEADER
            </span>

            {showVote && (
              <span className="text-subhead text-foreground absolute top-[20%] left-[50%] inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 whitespace-nowrap max-md:top-[33%] max-md:left-[82%]">
                투표하기
                <IoChevronForward aria-hidden className="text-[1em]" />
              </span>
            )}
          </button>
        </div>

        {/* Names */}
        <ul className="grid grid-cols-2 gap-x-16 gap-y-8 max-md:gap-x-10 max-md:gap-y-6">
          {names.map((name) => {
            const isSelected = selectedName === name;
            return (
              <li key={name} className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setSelectedName((cur) => (cur === name ? null : name))}
                  className="group relative inline-flex h-[55px] w-[55px] items-center justify-center"
                >
                  <span
                    aria-hidden
                    className={`absolute inset-0 rounded-full bg-[#AAD2FF] blur-[10px] transition-opacity duration-200 ${
                      isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  />
                  <span className="text-subhead-bold text-foreground relative z-10 whitespace-nowrap">
                    {name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
