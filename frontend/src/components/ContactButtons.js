// File: src/components/ContactButtons.js
import React from 'react';
import { PhoneIcon } from '@heroicons/react/24/outline';
import { whatsappLink, instagramLink, phoneLink } from '../data/links';
import { useContent } from '../content';

// Inline brand icons - tiny, no extra downloads
export const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.75-.71 2-1.4.25-.7.25-1.29.17-1.4-.07-.13-.27-.2-.57-.35zM12.05 21.8h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 01-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 012.89 6.99c0 5.45-4.44 9.88-9.89 9.88zm8.41-18.3A11.81 11.81 0 0012.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 005.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41z" />
  </svg>
);

export const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const buttons = (contact, message) => [
  {
    label: 'WhatsApp',
    href: whatsappLink(contact, message),
    icon: WhatsAppIcon,
    // WhatsApp green is what people recognise and trust
    className: 'bg-[#25d366] text-[#04231a] border-[#25d366]',
    external: true,
  },
  {
    label: 'Instagram',
    href: instagramLink(contact),
    icon: InstagramIcon,
    className: 'text-cream border-kumkum/70 hover:bg-kumkum/15',
    external: true,
  },
  {
    label: 'Call',
    href: phoneLink(contact),
    icon: PhoneIcon,
    className: 'text-cream border-zari/60 hover:bg-zari/15',
  },
];

// Row of WhatsApp / Instagram / Call buttons. `message` pre-fills the WhatsApp chat.
const ContactButtons = ({ message, className = '' }) => {
  const { content } = useContent();
  return (
    <div className={`grid grid-cols-3 gap-2 sm:gap-3 ${className}`}>
      {buttons(content.contact, message).map(({ label, href, icon: Icon, className: color, external }) => (
        <a
          key={label}
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={`flex items-center justify-center gap-2 px-2 py-3 rounded-md border text-sm sm:text-base font-semibold transition-colors ${color}`}
        >
          <Icon className="h-5 w-5 shrink-0" />
          <span>{label}</span>
        </a>
      ))}
    </div>
  );
};

export default ContactButtons;
