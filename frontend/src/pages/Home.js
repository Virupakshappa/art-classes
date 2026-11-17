// File: src/pages/Home.js
import React from 'react';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { whatsappLink, instagramLink, phoneLink } from '../data/links';
import { useContent } from '../content';
import ContactButtons, { WhatsAppIcon } from '../components/ContactButtons';

const external = { target: '_blank', rel: 'noopener noreferrer' };

const SectionTitle = ({ children }) => (
  <h2 className="font-serif text-3xl sm:text-4xl text-zari leading-tight">{children}</h2>
);

const modeText = (modes) =>
  modes.length > 1 ? 'Online and offline' : `${modes[0]} only`;

// "2026-12-01" -> "1 Dec 2026", read as a local date
const formatDate = (value) => {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
};

// Dated batches first, soonest at the top
const byDate = (a, b) => (a.startDate || '9999').localeCompare(b.startDate || '9999');

const BatchList = ({ batches }) => (
  <ul className="mt-3 space-y-2">
    {batches.map((batch, i) => (
      <li key={batch.id ?? i} className="text-sm bg-maroon-800 rounded-md px-3 py-2">
        {batch.startDate && <p className="text-zari font-semibold">Starts {formatDate(batch.startDate)}</p>}
        <p className="text-cream/85">{[batch.days, batch.time].filter(Boolean).join(', ')}</p>
        <p className="text-cream/55">{batch.mode}{batch.note && `. ${batch.note}`}</p>
      </li>
    ))}
  </ul>
);

const Home = () => {
  const { content } = useContent();
  const { site, artist, stats, contact, classes, batches, demoSteps, events, journey, faqs } = content;
  const ask = (topic) => whatsappLink(contact, `Hi ${artist.name}! ${topic}`);

  return (
    <>
      {/* Hero - the brand name, set large in zari gold */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-12 sm:pt-20 sm:pb-20">
        <h1 className="font-serif text-zari text-[3.25rem] leading-[0.95] sm:text-8xl">
          {site.name}
        </h1>
        <p className="mt-5 max-w-xl text-xl sm:text-2xl text-cream leading-snug">
          {site.tagline}.
        </p>
        <p className="mt-3 max-w-xl text-cream/75 leading-relaxed">
          {site.crafts} with {artist.name}. {site.modes}
        </p>
        <p className="mt-4 flex items-center text-sm text-cream/60">
          <MapPinIcon className="h-4 w-4 mr-1.5 shrink-0" />
          {site.location}
        </p>
        <a
          href={whatsappLink(contact)}
          {...external}
          className="mt-8 inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-4 rounded-md bg-zari text-maroon text-lg font-semibold hover:bg-zari-deep transition-colors"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Book a free demo class
        </a>
      </section>

      <div className="pallu" aria-hidden="true" />

      {/* Crafts - each one marked with its own pallu stripe */}
      <section id="crafts" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <SectionTitle>Crafts you can learn</SectionTitle>
        <ul className="mt-6 grid md:grid-cols-2 gap-x-10">
          {classes.map((course, i) => (
            <li
              key={course.id ?? i}
              className="border-l-4 pl-4 py-5 border-b border-b-maroon-700"
              style={{ borderLeftColor: course.stripe }}
            >
              <h3 className="font-serif text-2xl text-cream">{course.title}</h3>
              <p className="mt-1 text-cream/75 leading-relaxed">{course.description}</p>
              <p className="mt-2 text-sm text-cream/55">
                {modeText(course.modes)}{course.freeDemo && ', first class free'}
              </p>
              <BatchList batches={batches.filter((b) => b.classId === course.id).sort(byDate)} />
              <a
                href={ask(`I'd like to book a free demo class for ${course.title}.`)}
                {...external}
                className="mt-3 inline-flex items-center gap-1.5 text-[#25d366] font-semibold text-sm py-1"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Ask about {course.title.split(' (')[0].toLowerCase()}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Free demo - a real step-by-step sequence, so it is numbered */}
      {demoSteps.length > 0 && (
      <section id="demo" className="bg-maroon-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <SectionTitle>How the free demo works</SectionTitle>
          <ol className="mt-8 grid sm:grid-cols-3 gap-8">
            {demoSteps.map((step, index) => (
              <li key={step.id ?? index} className="flex sm:block gap-4">
                <span className="font-serif text-4xl text-kumkum leading-none w-8 shrink-0">{index + 1}</span>
                <div className="sm:mt-3">
                  <h3 className="font-semibold text-cream">{step.title}</h3>
                  <p className="mt-1 text-cream/70 leading-relaxed">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      )}

      {/* What's on */}
      {events.length > 0 && (
      <section id="whats-on" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <SectionTitle>What's on</SectionTitle>
        <dl className="mt-6 divide-y divide-maroon-700">
          {events.map((event, i) => (
            <div key={event.id ?? i} className="py-5 sm:grid sm:grid-cols-[10rem_1fr_auto] sm:gap-6 sm:items-baseline">
              <dt className="text-sm text-peacock font-semibold">{event.when}</dt>
              <dd className="mt-1 sm:mt-0">
                <p className="font-serif text-2xl text-cream">{event.title}</p>
                <p className="mt-1 text-cream/70">{event.text}</p>
              </dd>
              <dd className="mt-3 sm:mt-0">
                <a
                  href={ask(`I'd like to know about the ${event.title}.`)}
                  {...external}
                  className={`inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-semibold border ${
                    event.highlight
                      ? 'bg-zari text-maroon border-zari'
                      : 'border-zari/50 text-zari hover:bg-zari/10'
                  }`}
                >
                  {event.cta}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </section>
      )}

      {/* About Sanju and her journey */}
      <section id="sanju" className="bg-maroon-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:grid md:grid-cols-2 md:gap-14">
          <div>
            <SectionTitle>Meet {artist.name}</SectionTitle>
            <p className="mt-2 text-cream/60">{artist.title}</p>
            <div className="mt-5 space-y-4 text-cream/85 leading-relaxed max-w-prose">
              {artist.bio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              {stats.length > 0 && (
                <p>
                  {stats.map((stat) => `${stat.value} ${stat.label.toLowerCase()}`).join(', ')}.
                </p>
              )}
            </div>
          </div>
          {journey.length > 0 && (
          <ol className="mt-10 md:mt-2 border-l border-zari-deep/50 space-y-6">
            {journey.map((step, i) => (
              <li key={step.id ?? i} className="relative pl-6">
                <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rotate-45 bg-zari" aria-hidden="true" />
                <p className="font-serif text-xl text-zari">{step.year}</p>
                <p className="text-cream font-medium">{step.title}</p>
                <p className="text-cream/65 text-sm leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
          )}
        </div>
      </section>

      {/* Questions - native <details>, no JavaScript needed */}
      {faqs.length > 0 && (
      <section id="questions" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <SectionTitle>Questions</SectionTitle>
        <div className="mt-6 max-w-3xl divide-y divide-maroon-700 border-y border-maroon-700">
          {faqs.map((item, i) => (
            <details key={item.id ?? i} className="group py-4">
              <summary className="flex justify-between items-center gap-4 cursor-pointer list-none text-cream font-medium">
                {item.q}
                <span className="text-zari text-xl leading-none transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 text-cream/70 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
      )}

      {/* Contact */}
      <section id="contact" className="bg-maroon-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <SectionTitle>Start with a free class</SectionTitle>
          <p className="mt-3 text-cream/75 leading-relaxed">
            Message, follow or call {artist.name} - whichever is easiest for you.
          </p>
          <ContactButtons className="mt-6 max-w-xl" />
          <ul className="mt-6 space-y-1 text-sm text-cream/65">
            <li>WhatsApp and call: <a href={phoneLink(contact)} className="text-cream underline underline-offset-2">{contact.phone}</a></li>
            <li>Instagram: <a href={instagramLink(contact)} {...external} className="text-cream underline underline-offset-2">@{contact.instagram}</a></li>
            <li>{site.location}</li>
          </ul>
        </div>
      </section>

      <footer>
        <div className="temple-border temple-border-down" aria-hidden="true" />
        <p className="text-center text-sm text-cream/50 py-6 px-4">
          {site.name}, {site.location}
        </p>
      </footer>
    </>
  );
};

export default Home;
