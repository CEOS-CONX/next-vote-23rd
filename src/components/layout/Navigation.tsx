'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useNavigationStore } from '@/stores/navigation';
import IconExit from '@/assets/icons/icon_exit.svg';

const menuItems = [
  { label: 'VOTING', href: '/voting' },
  { label: 'MEMBERS', href: '/members' },
  { label: 'ABOUT US', href: '/about' },
  { label: 'LOGIN', href: '/login' },
];

export default function Navigation() {
  const { isOpen, close } = useNavigationStore();
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 mx-auto flex max-w-97.5 justify-end md:hidden">
      <div className="absolute inset-0" onClick={close} />
      <nav className="relative flex h-full w-[279px] flex-col bg-nav-bg">
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute right-5 top-[33px] flex h-9 w-9 cursor-pointer items-center justify-center"
          aria-label="메뉴 닫기"
        >
          <IconExit className="h-[23px] w-[23px]" />
        </button>

        {/* Menu Items */}
        <ul className="mt-[111px] flex flex-col gap-8 pr-5">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={close}
                className={`block font-suite text-headline3 text-right ${
                  pathname.startsWith(item.href) ? 'text-nav-accent' : 'text-white'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
