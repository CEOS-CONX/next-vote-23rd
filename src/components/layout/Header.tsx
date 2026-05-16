'use client';

import { useNavigationStore } from '@/stores/navigation';
import DesktopHeader from './DesktopHeader';

export default function Header() {
  const toggle = useNavigationStore((s) => s.toggle);

  return (
    <>
      {/* Mobile */}
      <header className="hidden items-start justify-between px-5 pt-8 pb-4 max-md:flex">
        <div className="text-body2 text-foreground" style={{ fontFeatureSettings: "'case' on" }}>
          <p>CEOS</p>
          <p>AWARD</p>
        </div>
        <button
          onClick={toggle}
          className="flex cursor-pointer flex-col gap-[4.2px] p-1"
          aria-label="메뉴 열기"
        >
          <span className="bg-foreground block h-[4.2px] w-7" />
          <span className="bg-foreground block h-[4.2px] w-7" />
          <span className="bg-foreground block h-[4.2px] w-7" />
        </button>
      </header>

      {/* Desktop */}
      <div className="block max-md:hidden">
        <DesktopHeader />
      </div>
    </>
  );
}
