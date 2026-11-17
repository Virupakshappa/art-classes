// File: src/data/links.js
// Contact links built from the (editable) contact details

export const whatsappLink = (contact, message = contact.whatsappMessage) =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;

export const instagramLink = (contact) => `https://instagram.com/${contact.instagram}`;

export const phoneLink = (contact) => `tel:${contact.phone}`;
