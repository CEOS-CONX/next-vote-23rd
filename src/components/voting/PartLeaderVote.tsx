'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoChevronForward } from 'react-icons/io5';
import Leader from '@/assets/shapes/Leader_bf.svg';
import VoteTitle from '@/assets/shapes/vote_title.svg';
import { API_ROUTES } from '@/constants/api';

interface Props {
  part: 'FE' | 'BE';
}

interface Candidate {
  candidateId: number;
  name: string;
  voteCount: number;
}

export default function PartLeaderVote({ part }: Props) {
  const router = useRouter();
  const [titleHovered, setTitleHovered] = useState(false);

  const POLL_ID = part === 'FE' ? 1 : 2;

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch(API_ROUTES.vote.results(POLL_ID));
      const data = await res.json();
      setCandidates(data.results ?? []);
    })();

    (async () => {
      const res = await fetch(API_ROUTES.vote.myVote(POLL_ID));
      if (!res.ok) return;
      const data = await res.json();
      setHasVoted(data.hasVoted);
      if (data.candidateId) setSelectedId(data.candidateId);
    })();
    // part(=POLL_ID)이 바뀌면 다시 불러옴. FE/BE 페이지가 같은 컴포넌트를 쓰기 때문
  }, [POLL_ID]);

  // 이름 가나다순으로 정렬
  const sortedCandidates = [...candidates].sort((a, b) => a.name.localeCompare(b.name, 'ko'));

  const showVote = titleHovered || selectedId !== null;

  // 투표
  const handleSubmit = async () => {
    if (!selectedId || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch(API_ROUTES.vote.votes(POLL_ID), {
        method: hasVoted ? 'PATCH' : 'POST', // 처음이면 POST, 이미 했으면 PATCH(재투표)
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidateId: selectedId }),
      });

      if (res.ok) {
        router.push(`/voting/result/${POLL_ID}`);
      } else {
        const err = await res.json();
        alert(err.message ?? '투표에 실패했습니다.');
      }
    } finally {
      setSubmitting(false);
    }
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
            disabled={!selectedId} // 고른 후보 없으면 비활성화
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

        <ul className="grid grid-cols-2 gap-x-16 gap-y-8 max-md:gap-x-10 max-md:gap-y-6">
          {sortedCandidates.map((c) => {
            const isSelected = selectedId === c.candidateId; // 이름 대신 id로 비교
            return (
              <li key={c.candidateId} className="flex justify-center">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedId((cur) => (cur === c.candidateId ? null : c.candidateId))
                  }
                  className="group relative inline-flex h-[55px] w-[55px] items-center justify-center"
                >
                  <span
                    aria-hidden
                    className={`absolute inset-0 rounded-full bg-[#AAD2FF] blur-[10px] transition-opacity duration-200 ${
                      isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  />
                  <span className="text-subhead-bold text-foreground relative z-10 whitespace-nowrap">
                    {c.name}
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
