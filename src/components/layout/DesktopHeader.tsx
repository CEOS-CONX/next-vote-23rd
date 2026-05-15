'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { label: 'VOTING', href: '/voting' },
  { label: 'MEMBERS', href: '/members' },
  { label: 'ABOUT US', href: '/about' },
  { label: 'LOGIN', href: '/login' },
];

export default function DesktopHeader() {
  const pathname = usePathname();

  return (
    <header
      className="mx-[62px] mt-9 flex h-9"
      style={{ fontFeatureSettings: "'case' on" }}
    >
      {/* Logo */}
      <div className="flex flex-1 items-start border-4 border-foreground px-[26px] py-1">
        <span className="text-body2 text-foreground">2024 CEOS AWARD </span>
      </div>

      {/* Navigation */}
      <div className="flex flex-1 items-start bg-foreground">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-1 justify-center py-2 text-body2 ${
              pathname.startsWith(item.href) ? 'text-nav-accent' : 'text-nav-text'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
