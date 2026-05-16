'use client';

import Link from 'next/link';
import IconOnboardingMobile from '@/assets/icons/icon_onboarding_mobile.svg';
import IconOnboardingDesktop from '@/assets/icons/icon_onboarding_desktop.svg';

export default function Home() {
  return (
    <div className="relative mt-0 h-[calc(100vh-36px-36px)] overflow-visible max-md:mt-20 max-md:h-auto max-md:overflow-hidden">
      {/* Title */}
      <h1 className="font-suite text-foreground max-md:text-headline1 absolute top-[196px] left-[34.7%] text-[75px] leading-[135%] font-black tracking-[-0.001em] max-md:static">
        2024
        <br className="hidden max-md:inline" />
        <span className="inline max-md:hidden"> </span>
        세오스 어워즈
      </h1>

      {/* Decorative SVG - Mobile */}
      <div className="absolute top-8.75 -right-10 hidden max-md:block">
        <IconOnboardingMobile className="h-[189px] w-[268px]" />
      </div>

      {/* Decorative SVG - Desktop */}
      <div className="absolute top-[130px] right-[-100px] block max-md:hidden">
        <IconOnboardingDesktop className="h-[500px] w-[709px]" />
      </div>

      {/* CTA */}
      <div className="absolute right-[60px] bottom-[120px] mt-32.5 flex justify-end max-md:static max-md:right-auto max-md:bottom-auto">
        <Link
          href="/voting"
          className="font-suite text-foreground max-md:text-headline5 text-[40px] leading-[135%] font-extrabold tracking-[-0.001em]"
        >
          투표하러 가기 &gt;
        </Link>
      </div>
    </div>
  );
}
