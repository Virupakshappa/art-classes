// File: src/data/site.js
// Built-in site content. The admin screen (/admin) edits a saved copy of this
// on the server; these values are the starting point and the offline fallback.

export const site = {
  name: 'Dancing Needles',
  tagline: 'Where the needle dances and thread meets colour',
  crafts: 'Painting, aari work, crochet, tatting and saree designing classes',
  location: 'Kushtagi, Karnataka, India',
  modes: 'Offline in Kushtagi, online anywhere - and always a free demo first.',
};

export const artist = {
  name: 'Sanju',
  title: 'Painting & Traditional Craft Tutor',
  experience: '8+ years of teaching',
  bio: [
    '8+ years of teaching painting and traditional Indian handcrafts - online & offline.',
    'From bridal aari blouses to crochet flowers and saree kuchu, every class is hands-on and friendly. Try any craft with a free demo class before you join.',
  ],
  specialties: ['Painting', 'Aari / Maggam Work', 'Crochet (Krosha)', 'Tatting', 'Saree Kuchu', 'Saree Designing', 'Embroidery'],
};

export const stats = [
  { value: '8+', label: 'Years of Experience' },
  { value: '100+', label: 'Students Taught' },
  { value: '200+', label: 'Happy Customers' },
];

export const contact = {
  // Country code + number, digits only
  whatsapp: '919620955605',
  // Number as it should be dialled (assumed same as WhatsApp)
  phone: '+919620955605',
  // Instagram username without the @
  instagram: 'dancing_needles_',
  whatsappMessage: "Hi Sanju! I saw your Dancing Needles website and I'd like to book a free demo class.",
};

export const classes = [
  {
    id: 'painting',
    title: 'Painting',
    description: 'Acrylic, watercolour, fabric & mandala art for all ages.',
    modes: ['Offline', 'Online'],
    freeDemo: true,
    stripe: '#e8c87a',
  },
  {
    id: 'aari-maggam',
    title: 'Aari / Maggam Work',
    description: 'Bridal blouses, dupattas & embroidery with the aari needle.',
    modes: ['Offline', 'Online'],
    freeDemo: true,
    stripe: '#ff3d8b',
  },
  {
    id: 'crochet',
    title: 'Crochet (Krosha)',
    description: 'Flowers, toys, wearables & home décor from a single thread.',
    modes: ['Offline', 'Online'],
    freeDemo: true,
    stripe: '#00b39a',
  },
  {
    id: 'tatting',
    title: 'Tatting',
    description: 'Delicate knotted lace for edgings, doilies, earrings & jewellery.',
    modes: ['Offline', 'Online'],
    freeDemo: true,
    stripe: '#ff8a4c',
  },
  {
    id: 'saree-kuchu',
    title: 'Saree Kuchu & Designing',
    description: 'Beautiful tassels and custom saree designing.',
    modes: ['Offline', 'Online'],
    freeDemo: true,
    stripe: '#f8efe3',
  },
];

// How booking works - shown as numbered steps
export const demoSteps = [
  { title: 'Message on WhatsApp', text: 'Say which craft you want to try.' },
  { title: 'Pick a time', text: 'Choose a slot that suits you - online or in Kushtagi.' },
  { title: 'Join the free demo', text: 'Try the craft first. Join the batch only if you love it.' },
];

export const faqs = [
  {
    q: 'Is the demo class really free?',
    a: 'Yes. Every craft starts with a free demo class, online or offline, so you can try it before you join.',
  },
  {
    q: 'Which classes can I take online?',
    a: 'All of them. Every craft is taught online as well as offline in Kushtagi, so you can learn from anywhere.',
  },
  {
    q: 'When does a new batch start?',
    a: 'A new beginner painting batch starts on the 1st of every month. For other crafts, message on WhatsApp to join the next batch.',
  },
  {
    q: 'What are the fees and where is the class?',
    a: 'Message Sanju on WhatsApp - she will share the current fees and where offline classes are held in Kushtagi.',
  },
];

export const events = [
  {
    when: 'Every Week',
    title: 'FREE Demo Class',
    text: 'Try any craft before you join - online or offline.',
    cta: 'Book Free Demo',
    highlight: true,
  },
  {
    when: 'Monthly',
    title: 'Beginner Painting Batch',
    text: 'New batch starts the 1st of every month.',
    cta: 'Reserve a Seat',
  },
  {
    when: 'Seasonal',
    title: 'Bridal Aari Workshop',
    text: 'Intensive bridal blouse & maggam work workshop.',
    cta: 'Enquire',
  },
];

export const journey = [
  { year: '2017', title: 'The First Stitch', text: 'Started teaching from home in Kushtagi.' },
  { year: '2019', title: 'Growing Family of Students', text: 'Crossed 30 happy learners across crafts.' },
  { year: '2021', title: 'Going Online', text: 'Began online classes - students from other towns joined.' },
  { year: '2023', title: '100+ Students', text: 'A community of artists, makers & proud mothers.' },
  { year: 'Today', title: 'Art Runs in the Family', text: 'Teaching, creating & raising two little artists.' },
];

// Class dates & timings - added by the admin, so empty by default
export const batches = [];

// Everything above as one object: the built-in content shown until (or if)
// the saved content from the server arrives
export const defaultContent = {
  site, artist, stats, contact, classes, batches, demoSteps, faqs, events, journey,
};
