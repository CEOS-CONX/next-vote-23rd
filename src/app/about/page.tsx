'use client';

import AboutDesktop from '@/components/about/AboutDesktop';
import AboutMobile from '@/components/about/AboutMobile';

export default function AboutPage() {
  return (
    <>
      <div className="fixed inset-0 -z-10 bg-white" />
      <div className="min-h-[calc(100vh-72px)] overflow-hidden bg-white max-md:min-h-[calc(100vh-80px)]">
        <div className="max-md:hidden">
          <AboutDesktop />
        </div>
        <div className="hidden max-md:block">
          <AboutMobile />
        </div>
      </div>
    </>
  );
}
