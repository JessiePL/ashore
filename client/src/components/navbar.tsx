'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/home', label: 'Home' },
  { href: '/chat', label: 'Chat' },
  { href: '/tree', label: 'Tree' },
  { href: '/settings', label: 'Settings' },
];

export default function BottomNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-inner flex justify-around items-center py-2 z-50">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-sm text-gray-700 hover:text-blue-500 transition 
            ${pathname === item.href ? 'font-semibold underline text-blue-600' : ''}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
