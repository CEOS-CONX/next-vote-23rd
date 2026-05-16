'use client';
import Link from 'next/link';
import Leader from '../../assets/shapes/Leader_bf.svg';
import Team from '../../assets/shapes/Demo_bf.svg';

export default function VotingMainPage() {
  const user = { isLoggedIn: true, part: 'FE' };
  const leaderText = user.isLoggedIn ? `${user.part} - LEADER` : 'FE - LEADER';
  const userPart = user.isLoggedIn ? user.part.toLowerCase() : 'fe';

  return (
    <main className="min-h-screen w-full px-5 py-32.5 md:px-0">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-24">
        <div className="mx-auto w-full max-w-[277px] md:mx-0 md:ml-[min(330px,calc(50%-227.5px))] md:max-w-[455px]">
          <Link
            href={`/voting/fe-leader?part=${userPart}`}
            className="group relative block aspect-[280/141] w-full transition-transform duration-300"
          >
            <Leader className="absolute inset-0 h-full w-full" />
            <span className="absolute top-[35%] left-[25%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap transition-colors duration-200 group-hover:bg-gradient-to-r group-hover:from-[#1B7BE8] group-hover:to-[#E5DCB7] group-hover:bg-clip-text group-hover:text-transparent">
              {leaderText}
            </span>
          </Link>
        </div>

        <div className="mx-auto w-full max-w-[277px] md:mx-0 md:mr-[min(330px,calc(50%-227.5px))] md:max-w-[455px] md:self-end">
          <Link
            href={`/voting/demoday`}
            className="group relative block aspect-[210/188] w-full transition-transform duration-300"
          >
            <Team className="absolute inset-0 h-full w-full" />
            <span className="absolute top-[32%] left-[22%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap transition-colors duration-200 group-hover:bg-gradient-to-r group-hover:from-[#1B7BE8] group-hover:to-[#E5DCB7] group-hover:bg-clip-text group-hover:text-transparent">
              DEMO - DAY
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
