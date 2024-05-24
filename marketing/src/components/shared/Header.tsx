import Link from 'next/link';
import React from 'react';

const headerConfig = {
  logo: {
    src: '/path/to/logo.png',
    alt: 'tailcall',
  },
  navItems: [
    { name: 'Home', href: '/', active: true },
    { name: 'Docs', href: '/docs' },
    { name: 'Blog', href: '/blog' },
    { name: 'Developers', href: '/developers' },
  ],
  actions: [
    { icon: 'discord', href: 'https://discord.com' },
    { icon: 'github', href: 'https://github.com', label: 'Star 1140' },
  ],
};

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <img src={headerConfig.logo.src} alt={headerConfig.logo.alt} className="h-8 mr-4" />
        <span className="font-bold text-xl">{headerConfig.logo.alt}</span>
      </div>
      <nav className="flex space-x-4">
        {headerConfig.navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`px-3 py-2 rounded ${item.active ? 'bg-yellow-300' : ''}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="flex space-x-4">
        {headerConfig.actions.map((action) => (
          <Link key={action.icon} href={action.href} className="flex items-center space-x-2 border px-3 py-2 rounded">
            <span className={`icon-${action.icon}`}></span>
            {action.label && <span>{action.label}</span>}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;