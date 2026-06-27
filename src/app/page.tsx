'use client';

import Link from 'next/link';
import IconOnboarding from '@/assets/icons/icon_onboarding_desktop.svg';
import { useAuthStore } from '@/stores/auth';

export default function Home() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return (
    <>
      {/* Mobile white background overlay */}
      <div className="fixed inset-0 -z-10 bg-white md:hidden" />
      <div className="relative mt-0 h-[calc(100vh-36px-36px)] overflow-visible bg-white max-md:mt-20 max-md:h-auto max-md:min-h-[calc(100vh-80px)] max-md:overflow-hidden">
      {/* Title */}
      <div className="relative z-10 mr-53.75 ml-auto w-155.25 pt-49 max-lg:mr-59 max-lg:w-md max-md:mr-31.75 max-md:w-45.5 max-md:pt-5.75">
        <h1 className="font-suite text-foreground max-md:text-headline1 flex flex-wrap text-[75px] leading-[135%] font-black tracking-[-0.001em]">
          <span>2026</span>
          <span className="ml-auto">세오스 어워즈</span>
        </h1>
      </div>

      {/* Decorative SVG */}
      <div className="absolute top-30.25 right-0 overflow-hidden max-lg:top-42 max-md:top-30">
        <IconOnboarding className="-mr-25 h-125 w-177.25 max-md:-mr-5.75 max-md:h-47.25 max-md:w-67" />
      </div>

      {/* CTA */}
      <div className="absolute top-142 right-20 w-66.75 max-lg:top-153.75 max-md:top-72.25 max-md:right-5 max-md:w-auto">
        <Link
          href={isAuthenticated ? '/voting/result' : '/voting'}
          className="font-suite text-foreground max-md:text-headline5 text-[40px] leading-[135%] font-extrabold tracking-[-0.001em]"
        >
          {isAuthenticated ? '결과보러 가기' : '투표하러 가기'} &gt;
        </Link>
      </div>
    </div>
    </>
  );
}
