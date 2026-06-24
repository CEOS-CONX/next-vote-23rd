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
    <header className="mx-15.5 mt-9 flex h-9" style={{ fontFeatureSettings: "'case' on" }}>
      {/* Logo */}
      <div className="border-foreground flex flex-1 items-start border-4 px-6.5 py-1">
        <span className="text-body2 text-foreground">2026 CEOS AWARD </span>
      </div>

      {/* Navigation */}
      <div className="bg-foreground flex flex-1 items-start">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-body2 flex flex-1 justify-center py-2 ${
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
