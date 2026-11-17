// File: src/components/ContactBar.js
import React from 'react';
import ContactButtons from './ContactButtons';

// Always-visible contact bar at the bottom of the screen on phones
const ContactBar = () => (
  <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-maroon/95 border-t border-zari-deep/40 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
    <ContactButtons />
  </div>
);

export default ContactBar;
