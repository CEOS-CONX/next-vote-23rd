'use client';

import Link from 'next/link';
import IconOnboardingMobile from '@/assets/icons/icon_onboarding_mobile.svg';
import IconOnboardingDesktop from '@/assets/icons/icon_onboarding_desktop.svg';

export default function Home() {
  return (
    <div className="relative mt-20 overflow-hidden md:mt-0 md:h-[calc(100vh-36px-36px)] md:overflow-visible">
      {/* Title */}
      <h1 className="font-suite text-headline1 text-foreground md:absolute md:left-[34.7%] md:top-[196px] md:text-[75px] md:font-black md:leading-[135%] md:tracking-[-0.001em]">
        2024
        <br className="md:hidden" />
        <span className="hidden md:inline"> </span>
        세오스 어워즈
      </h1>

      {/* Decorative SVG - Mobile */}
      <div className="absolute -right-10 top-8.75 md:hidden">
        <IconOnboardingMobile className="h-[189px] w-[268px]" />
      </div>

      {/* Decorative SVG - Desktop */}
      <div className="absolute right-[-100px] top-[130px] hidden md:block">
        <IconOnboardingDesktop className="h-[500px] w-[709px]" />
      </div>

      {/* CTA */}
      <div className="mt-32.5 flex justify-end md:absolute md:bottom-[120px] md:right-[60px]">
        <Link
          href="/voting"
          className="font-suite text-headline5 text-foreground md:text-[40px] md:leading-[135%] md:tracking-[-0.001em]"
        >
          투표하러 가기 &gt;
        </Link>
      </div>
    </div>
  );
}
