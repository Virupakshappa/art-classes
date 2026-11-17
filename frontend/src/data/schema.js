// File: src/data/schema.js
// Describes every editable section of the site. Used twice:
//  - the admin screen builds its forms from it
//  - the server cleans and validates saved content with it, so a bad edit
//    (or a malicious request) can never store anything the site can't show.

const STRIPES = [
  { value: '#e8c87a', label: 'Zari gold' },
  { value: '#ff3d8b', label: 'Kumkum pink' },
  { value: '#00b39a', label: 'Peacock teal' },
  { value: '#ff8a4c', label: 'Marigold' },
  { value: '#f8efe3', label: 'Cream' },
  { value: '#d4af37', label: 'Deep gold' },
];

export const BATCH_MODES = ['Online & offline', 'Online', 'Offline'];

// Field types: text (default), textarea, date, select, checkbox, multiselect,
// strings (list of short texts), list (list of items with their own fields)
export const schema = [
  {
    key: 'site',
    label: 'Basics',
    type: 'object',
    fields: [
      { key: 'name', label: 'Brand name', max: 40, required: true },
      { key: 'tagline', label: 'Tagline', max: 120 },
      { key: 'crafts', label: 'What you teach (one line)', max: 160 },
      { key: 'location', label: 'Location', max: 80 },
      { key: 'modes', label: 'Online / offline line', max: 160 },
    ],
  },
  {
    key: 'contact',
    label: 'Contact details',
    type: 'object',
    fields: [
      {
        key: 'whatsapp', label: 'WhatsApp number', max: 15, required: true,
        help: 'Country code + number, digits only. Example: 919876543210',
        pattern: '^\\d{8,15}$', patternMessage: 'WhatsApp number must be 8-15 digits, no spaces or +',
      },
      {
        key: 'phone', label: 'Phone number for calls', max: 16, required: true,
        help: 'Example: +919876543210',
        pattern: '^\\+?\\d{8,15}$', patternMessage: 'Phone number must be digits, optionally starting with +',
      },
      {
        key: 'instagram', label: 'Instagram username', max: 30, required: true,
        help: 'Without the @',
        pattern: '^[A-Za-z0-9._]{1,30}$', patternMessage: 'Instagram username can only use letters, numbers, . and _',
      },
      { key: 'whatsappMessage', label: 'Ready-typed WhatsApp message', type: 'textarea', max: 200 },
    ],
  },
  {
    key: 'artist',
    label: 'About Sanju',
    type: 'object',
    fields: [
      { key: 'name', label: 'Name', max: 40, required: true },
      { key: 'title', label: 'Title', max: 80 },
      { key: 'experience', label: 'Experience', max: 60 },
      { key: 'bio', label: 'Bio paragraphs', type: 'strings', multiline: true, max: 600, maxItems: 5 },
      { key: 'specialties', label: 'Specialties', type: 'strings', max: 40, maxItems: 12 },
    ],
  },
  {
    key: 'stats',
    label: 'Numbers (years, students, customers)',
    type: 'list',
    maxItems: 3,
    itemLabel: (item) => `${item.value} ${item.label}`,
    fields: [
      { key: 'value', label: 'Number', max: 10, placeholder: '100+' },
      { key: 'label', label: 'Label', max: 40, placeholder: 'Students Taught' },
    ],
  },
  {
    key: 'classes',
    label: 'Crafts',
    type: 'list',
    maxItems: 12,
    itemLabel: (item) => item.title,
    fields: [
      { key: 'title', label: 'Craft name', max: 60, required: true },
      { key: 'description', label: 'Description', type: 'textarea', max: 200 },
      { key: 'modes', label: 'Taught', type: 'multiselect', options: ['Offline', 'Online'] },
      { key: 'freeDemo', label: 'First class free', type: 'checkbox' },
      { key: 'stripe', label: 'Stripe colour', type: 'select', options: STRIPES },
    ],
  },
  {
    key: 'batches',
    label: 'Class dates & timings',
    type: 'list',
    maxItems: 60,
    itemLabel: (item, content) =>
      [content.classes.find((c) => c.id === item.classId)?.title, item.startDate, item.time]
        .filter(Boolean).join(', '),
    fields: [
      // Options are the current crafts - filled in at runtime
      { key: 'classId', label: 'Craft', type: 'select', options: 'classes', required: true },
      { key: 'startDate', label: 'Start date', type: 'date' },
      { key: 'days', label: 'Days', max: 60, placeholder: 'Mon, Wed, Fri' },
      { key: 'time', label: 'Timing', max: 60, placeholder: '5:00 PM - 6:00 PM' },
      { key: 'mode', label: 'Online or offline', type: 'select', options: BATCH_MODES },
      { key: 'note', label: 'Note (optional)', max: 120, placeholder: 'Only 5 seats left' },
    ],
  },
  {
    key: 'demoSteps',
    label: 'How the free demo works',
    type: 'list',
    maxItems: 5,
    itemLabel: (item) => item.title,
    fields: [
      { key: 'title', label: 'Step', max: 60 },
      { key: 'text', label: 'Details', max: 160 },
    ],
  },
  {
    key: 'events',
    label: "What's on",
    type: 'list',
    maxItems: 10,
    itemLabel: (item) => item.title,
    fields: [
      { key: 'when', label: 'When', max: 40, placeholder: 'Every Week' },
      { key: 'title', label: 'Title', max: 80, required: true },
      { key: 'text', label: 'Details', type: 'textarea', max: 200 },
      { key: 'cta', label: 'Button text', max: 30, placeholder: 'Book Free Demo' },
      { key: 'highlight', label: 'Highlight this one', type: 'checkbox' },
    ],
  },
  {
    key: 'journey',
    label: 'Journey (timeline)',
    type: 'list',
    maxItems: 12,
    itemLabel: (item) => `${item.year} ${item.title}`,
    fields: [
      { key: 'year', label: 'Year', max: 12 },
      { key: 'title', label: 'Title', max: 80 },
      { key: 'text', label: 'Details', max: 200 },
    ],
  },
  {
    key: 'faqs',
    label: 'Questions',
    type: 'list',
    maxItems: 12,
    itemLabel: (item) => item.q,
    fields: [
      { key: 'q', label: 'Question', max: 120, required: true },
      { key: 'a', label: 'Answer', type: 'textarea', max: 600 },
    ],
  },
];

const newId = () => Math.random().toString(36).slice(2, 10);

const optionValues = (field, context) => {
  if (field.options === 'classes') return context.classes.map((c) => c.id);
  return field.options.map((o) => (typeof o === 'string' ? o : o.value));
};

// Cleans one field; returns [value, errorMessage]
const cleanField = (field, raw, context) => {
  switch (field.type) {
    case 'checkbox':
      return [raw === true];
    case 'date':
      return [/^\d{4}-\d{2}-\d{2}$/.test(raw) ? raw : ''];
    case 'select': {
      const values = optionValues(field, context);
      // An unknown craft stays empty so the batch is dropped below
      if (field.options === 'classes') return [values.includes(raw) ? raw : ''];
      return [values.includes(raw) ? raw : values[0] ?? ''];
    }
    case 'multiselect': {
      const values = optionValues(field, context);
      const picked = Array.isArray(raw) ? values.filter((v) => raw.includes(v)) : [];
      return [picked.length ? picked : [values[0]]];
    }
    case 'strings': {
      const items = (Array.isArray(raw) ? raw : [])
        .map((s) => String(s ?? '').trim().slice(0, field.max))
        .filter(Boolean)
        .slice(0, field.maxItems);
      return [items];
    }
    default: {
      const value = String(raw ?? '').trim().slice(0, field.max ?? 200);
      if (field.required && !value) return [value, `${field.label} can't be empty`];
      if (value && field.pattern && !new RegExp(field.pattern).test(value)) {
        return [value, field.patternMessage];
      }
      return [value];
    }
  }
};

const cleanItem = (fields, raw, context, errors, where) => {
  const item = {};
  fields.forEach((field) => {
    const [value, error] = cleanField(field, raw?.[field.key], context);
    item[field.key] = value;
    if (error) errors.push(`${where}: ${error}`);
  });
  return item;
};

// Returns { content, errors }. Unknown keys are dropped, lengths capped,
// list sizes limited and links validated.
export const cleanContent = (input, defaults) => {
  const errors = [];
  const content = {};
  // Crafts first, so batches can be checked against the current crafts
  const ordered = [...schema].sort((a, b) => (a.key === 'classes' ? -1 : b.key === 'classes' ? 1 : 0));

  ordered.forEach((section) => {
    const raw = input?.[section.key] ?? defaults[section.key];
    if (section.type === 'object') {
      content[section.key] = cleanItem(section.fields, raw, content, errors, section.label);
      return;
    }
    const list = (Array.isArray(raw) ? raw : []).slice(0, section.maxItems);
    content[section.key] = list.map((rawItem, index) => {
      const item = cleanItem(section.fields, rawItem, content, errors, `${section.label} #${index + 1}`);
      const id = String(rawItem?.id ?? '').slice(0, 40);
      return { id: /^[\w-]+$/.test(id) ? id : newId(), ...item };
    });
  });

  // A batch for a craft that was deleted has nothing to show under
  const classIds = new Set(content.classes.map((c) => c.id));
  content.batches = content.batches.filter((b) => classIds.has(b.classId));

  return { content, errors };
};
