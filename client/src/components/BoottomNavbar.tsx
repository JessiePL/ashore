'use client';
import Link from 'next/link';
import '@/styles/navbar.css';
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
    <nav className="bottom-navbar navbar fixed-bottom bg-light border-top shadow shadow-lg py-4">
      <div className="container d-flex justify-content-around fs-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-link text-center ${
              pathname === item.href ? 'fw-bold text-primary' : 'text-secondary'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
