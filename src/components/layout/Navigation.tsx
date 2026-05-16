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
    <div className="fixed inset-0 z-50 mx-auto hidden max-w-97.5 justify-end max-md:flex">
      <div className="absolute inset-0" onClick={close} />
      <nav className="bg-nav-bg relative flex h-full w-[279px] flex-col">
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-[33px] right-5 flex h-9 w-9 cursor-pointer items-center justify-center"
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
                className={`font-suite text-headline3 block text-right ${
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
