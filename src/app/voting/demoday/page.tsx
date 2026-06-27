'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoChevronForward } from 'react-icons/io5';
import Demo from '@/assets/shapes/Demo_bf.svg';
import VoteTitleDemo from '@/assets/shapes/vote_title_demo.svg';
import { API_ROUTES } from '@/constants/api';

const POLL_ID = 3;

interface Candidate {
  candidateId: number;
  name: string;
  voteCount: number;
}

export default function DemoDayPage() {
  const router = useRouter();
  const [titleHovered, setTitleHovered] = useState(false);

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
  }, []);

  const showVote = titleHovered || selectedId !== null;

  const handleSubmit = async () => {
    if (!selectedId || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch(API_ROUTES.vote.votes(POLL_ID), {
        // 처음 투표면 POST 이미 투표한 적 있으면 PATCH
        method: hasVoted ? 'PATCH' : 'POST',
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
      <div className="mx-auto flex w-full max-w-[1280px] items-start justify-center gap-24 max-lg:gap-16 max-md:flex-col max-md:items-center max-md:gap-12">
        <ul className="flex flex-col items-center gap-10 pt-12 max-md:order-1 max-md:gap-6 max-md:pt-0">
          {candidates.map((c) => {
            const isSelected = selectedId === c.candidateId;
            return (
              <li key={c.candidateId}>
                <button
                  type="button"
                  // 같은 걸 다시 누르면 선택 해제, 아니면 그 후보 선택
                  onClick={() =>
                    setSelectedId((cur) => (cur === c.candidateId ? null : c.candidateId))
                  }
                  className="group relative inline-flex h-[55px] min-w-[140px] items-center justify-center px-4"
                >
                  <span
                    aria-hidden
                    className={`absolute top-1/2 left-1/2 h-[55px] w-[55px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#AAD2FF] blur-[10px] transition-opacity duration-200 ${
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

        {/* Demo title — 데스크탑에서 mt로 top 위치를 팀 리스트 좌표에 맞춤
            default: 5번째 팀 바닥 (48 + 5×55 + 4×40 = 483)
            vote:    4번째 팀 바닥 (48 + 4×55 + 3×40 = 388) */}
        <div
          className={`mt-[388px] w-full max-w-[455px] transition-[margin-top] duration-300 max-md:order-2 max-md:mt-0 max-md:max-w-[277px]`}
        >
          <button
            type="button"
            onMouseEnter={() => setTitleHovered(true)}
            onMouseLeave={() => setTitleHovered(false)}
            onClick={handleSubmit}
            disabled={!selectedId} // 고른 후보가 없으면 비활성화
            className="group relative block aspect-[210/188] w-full transition-transform duration-300 disabled:cursor-default"
          >
            {/* SVG 크기/위치 직접 조정:
                - width: 컨테이너 폭 대비 % (SVG 가로 크기, 높이는 비율 따라 자동)
                - left:  컨테이너 폭 대비 % (좌우 이동, 음수=왼쪽)
                - top:   컨테이너 '높이' 대비 % (상하 이동, 음수=위)
                Demo_bf는 컨테이너를 꽉 채우는 기준값. vote_title_demo만 별도 보정 중 */}
            {showVote ? (
              <div
                className="absolute aspect-[333/305]"
                style={{ width: '44.6%', left: '-0.23%', top: '-0.21%' }}
              >
                <VoteTitleDemo className="h-full w-full" />
              </div>
            ) : (
              <div
                className="absolute aspect-[210/188]"
                style={{ width: '46.2%', left: '0%', top: '0%' }}
              >
                <Demo className="h-full w-full" />
              </div>
            )}

            <span className="text-subhead text-foreground absolute top-[32%] left-[21%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap transition-all duration-300 max-md:top-[69.95%] max-md:left-[45.24%]">
              DEMO - DAY
            </span>

            {showVote && (
              <span className="text-subhead text-foreground absolute top-[15%] left-[32%] inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 whitespace-nowrap max-md:top-[31.54%] max-md:left-[67.60%]">
                투표하기
                <IoChevronForward aria-hidden className="text-[1em]" />
              </span>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
