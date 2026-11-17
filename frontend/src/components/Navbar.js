// File: src/components/Navbar.js
import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { whatsappLink } from '../data/links';
import { useContent } from '../content';
import { WhatsAppIcon } from './ContactButtons';

const navItems = [
  { name: 'Crafts', href: '/#crafts' },
  { name: 'Free demo', href: '/#demo' },
  { name: "What's on", href: '/#whats-on' },
  { name: 'Sanju', href: '/#sanju' },
  { name: 'Contact', href: '/#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { content } = useContent();
  const close = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-maroon/95">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <a href="/#top" className="font-serif text-2xl text-zari leading-none">
          {content.site.name}
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-cream/80">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-zari transition-colors">
              {item.name}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={whatsappLink(content.contact)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-[#25d366] text-[#04231a] px-4 py-2 rounded-md text-sm font-semibold"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Book a free demo
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            className="p-2 -mr-2 text-cream hover:text-zari"
          >
            {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="border-t border-maroon-700 bg-maroon-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={close} className="block py-3 text-cream hover:text-zari md:hidden">
                {item.name}
              </a>
            ))}
            <a href="/admin" onClick={close} className="block py-3 text-cream/70 hover:text-zari md:border-0 border-t border-maroon-700">
              Admin login
            </a>
          </div>
        </nav>
      )}
      <div className="temple-border" aria-hidden="true" />
    </header>
  );
};

export default Navbar;
