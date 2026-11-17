// File: src/pages/Admin.js
// Admin editor for every section of the site. The forms are generated from
// src/data/schema.js, which the server also uses to validate what is saved.
import React, { useEffect, useState } from 'react';
import { PlusIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import { schema } from '../data/schema';
import { useContent, fetchContent, saveContent, login, logout, getToken } from '../content';

const inputClass =
  'w-full bg-maroon border border-maroon-700 rounded-md px-3 py-2.5 text-cream placeholder-cream/35 focus:border-zari focus:ring-0';

const newId = () => Math.random().toString(36).slice(2, 10);

const optionList = (field, content) => {
  if (field.options === 'classes') return content.classes.map((c) => ({ value: c.id, label: c.title || 'Untitled craft' }));
  return field.options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
};

const emptyValue = (field, content) => {
  switch (field.type) {
    case 'checkbox': return field.key === 'freeDemo';
    case 'strings': return [];
    case 'multiselect': return optionList(field, content).map((o) => o.value);
    case 'select': return optionList(field, content)[0]?.value ?? '';
    default: return '';
  }
};

const newItem = (section, content) => ({
  id: newId(),
  ...Object.fromEntries(section.fields.map((f) => [f.key, emptyValue(f, content)])),
});

const LoginForm = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await login(username, password);
      onLoggedIn();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto px-4 py-12 space-y-5">
      <h1 className="font-serif text-4xl text-zari">Admin login</h1>
      {error && <p className="bg-kumkum/15 border border-kumkum/50 text-cream rounded-md p-3 text-sm">{error}</p>}
      <label className="block">
        <span className="text-sm text-cream/80">Username</span>
        <input
          className={`${inputClass} mt-1`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
          required
        />
      </label>
      <label className="block">
        <span className="text-sm text-cream/80">Password</span>
        <input
          type="password"
          className={`${inputClass} mt-1`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      </label>
      <button
        type="submit"
        disabled={busy}
        className="w-full py-3 rounded-md bg-zari text-maroon font-semibold disabled:opacity-60"
      >
        {busy ? 'Logging in…' : 'Log in'}
      </button>
    </form>
  );
};

const StringsInput = ({ field, value, onChange }) => {
  const Input = field.multiline ? 'textarea' : 'input';
  return (
    <div className="space-y-2">
      {value.map((text, i) => (
        <div key={i} className="flex gap-2 items-start">
          <Input
            className={inputClass}
            rows={field.multiline ? 3 : undefined}
            value={text}
            maxLength={field.max}
            onChange={(e) => onChange(value.map((t, j) => (j === i ? e.target.value : t)))}
          />
          <button type="button" aria-label="Remove" onClick={() => onChange(value.filter((_, j) => j !== i))} className="p-2.5 text-kumkum">
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      ))}
      {value.length < field.maxItems && (
        <button type="button" onClick={() => onChange([...value, ''])} className="inline-flex items-center gap-1.5 text-sm text-zari py-1">
          <PlusIcon className="h-4 w-4" />
          Add
        </button>
      )}
    </div>
  );
};

const Field = ({ field, value, onChange, content }) => {
  const label = <span className="text-xs text-cream/60">{field.label}</span>;
  const help = field.help && <span className="block text-xs text-cream/45 mt-1">{field.help}</span>;

  switch (field.type) {
    case 'checkbox':
      return (
        <label className="flex items-center gap-3 py-1">
          <input type="checkbox" className="h-5 w-5 rounded accent-[#e8c87a]" checked={value} onChange={(e) => onChange(e.target.checked)} />
          <span className="text-sm text-cream/85">{field.label}</span>
        </label>
      );
    case 'multiselect':
      return (
        <div>
          {label}
          <div className="flex gap-5 mt-1">
            {optionList(field, content).map((option) => (
              <label key={option.value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded accent-[#e8c87a]"
                  checked={value.includes(option.value)}
                  onChange={(e) => onChange(e.target.checked ? [...value, option.value] : value.filter((v) => v !== option.value))}
                />
                <span className="text-sm text-cream/85">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      );
    case 'select':
      return (
        <label className="block">
          {label}
          <select className={inputClass} value={value} onChange={(e) => onChange(e.target.value)}>
            {optionList(field, content).map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
      );
    case 'strings':
      return (
        <div>
          {label}
          <div className="mt-1"><StringsInput field={field} value={value} onChange={onChange} /></div>
        </div>
      );
    default: {
      const Input = field.type === 'textarea' ? 'textarea' : 'input';
      return (
        <label className="block">
          {label}
          <Input
            type={field.type === 'date' ? 'date' : 'text'}
            rows={field.type === 'textarea' ? 3 : undefined}
            className={inputClass}
            value={value}
            maxLength={field.max}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
          />
          {help}
        </label>
      );
    }
  }
};

const Fields = ({ fields, item, onChange, content }) => (
  <div className="space-y-3">
    {fields.map((field) => (
      <Field
        key={field.key}
        field={field}
        value={item[field.key] ?? emptyValue(field, content)}
        content={content}
        onChange={(value) => onChange({ ...item, [field.key]: value })}
      />
    ))}
  </div>
);

const ListSection = ({ section, items, onChange, content }) => {
  const move = (from, to) => {
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  };

  return (
    <div className="space-y-2">
      {items.length === 0 && <p className="text-sm text-cream/50">Nothing here yet - this section is hidden on the site.</p>}
      {items.map((item, i) => (
        <details key={item.id} className="bg-maroon rounded-md border border-maroon-700">
          <summary className="cursor-pointer px-3 py-3 text-cream/90 text-sm">
            {section.itemLabel(item, content) || 'New item'}
          </summary>
          <div className="px-3 pb-3 space-y-3">
            <Fields
              fields={section.fields}
              item={item}
              content={content}
              onChange={(changed) => onChange(items.map((it, j) => (j === i ? changed : it)))}
            />
            <div className="flex flex-wrap gap-4 pt-1 text-sm">
              <button type="button" disabled={i === 0} onClick={() => move(i, i - 1)} className="inline-flex items-center gap-1 text-cream/70 disabled:opacity-30">
                <ArrowUpIcon className="h-4 w-4" /> Move up
              </button>
              <button type="button" disabled={i === items.length - 1} onClick={() => move(i, i + 1)} className="inline-flex items-center gap-1 text-cream/70 disabled:opacity-30">
                <ArrowDownIcon className="h-4 w-4" /> Move down
              </button>
              <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} className="inline-flex items-center gap-1 text-kumkum">
                <TrashIcon className="h-4 w-4" /> Remove
              </button>
            </div>
          </div>
        </details>
      ))}
      {items.length < section.maxItems && (
        <button
          type="button"
          onClick={() => onChange([...items, newItem(section, content)])}
          className="inline-flex items-center gap-1.5 text-sm text-zari py-1"
        >
          <PlusIcon className="h-4 w-4" />
          Add
        </button>
      )}
    </div>
  );
};

const Editor = ({ onLoggedOut }) => {
  const { setContent } = useContent();
  const [draft, setDraft] = useState(null);
  const [loadError, setLoadError] = useState('');
  const [status, setStatus] = useState({ type: '', text: '', details: [] });
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  // Always edit the latest saved copy from the server, never a stale one
  useEffect(() => {
    fetchContent().then(setDraft).catch((err) => setLoadError(err.message));
  }, []);

  const update = (key, value) => {
    setDraft({ ...draft, [key]: value });
    setDirty(true);
    setStatus({ type: '', text: '', details: [] });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const saved = await saveContent(draft);
      setDraft(saved);
      setContent(saved);
      setDirty(false);
      setStatus({ type: 'ok', text: 'Saved. Visitors now see the changes.', details: [] });
    } catch (err) {
      if (err.status === 401) {
        logout();
        onLoggedOut();
        return;
      }
      setStatus({ type: 'error', text: err.message, details: err.details || [] });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    onLoggedOut();
  };

  if (loadError) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 space-y-4">
        <p className="text-cream">Couldn't load the site content: {loadError}</p>
        <button onClick={() => window.location.reload()} className="px-5 py-2.5 rounded-md bg-zari text-maroon font-semibold">
          Try again
        </button>
      </div>
    );
  }
  if (!draft) return <p className="p-6 text-cream/70">Loading site content…</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-36">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-serif text-3xl sm:text-4xl text-zari">Edit the website</h1>
        <button onClick={handleLogout} className="text-sm text-cream/70 underline underline-offset-2 shrink-0">
          Log out
        </button>
      </div>
      <p className="mt-2 text-cream/65 text-sm">
        Open a section, make your changes, then press Save at the bottom.
      </p>

      <div className="mt-6 space-y-3">
        {schema.map((section) => (
          <details key={section.key} className="bg-maroon-800 rounded-lg">
            <summary className="cursor-pointer px-4 py-4 font-serif text-xl text-cream">
              {section.label}
            </summary>
            <div className="px-4 pb-4">
              {section.type === 'object' ? (
                <Fields
                  fields={section.fields}
                  item={draft[section.key]}
                  content={draft}
                  onChange={(value) => update(section.key, value)}
                />
              ) : (
                <ListSection
                  section={section}
                  items={draft[section.key]}
                  content={draft}
                  onChange={(value) => update(section.key, value)}
                />
              )}
            </div>
          </details>
        ))}
      </div>

      {/* Save bar stays in reach while scrolling on a phone */}
      <div className="fixed bottom-0 left-0 right-0 bg-maroon-800 border-t border-maroon-700 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <div className="max-w-3xl mx-auto">
          {status.details.length > 0 && (
            <ul className="mb-2 text-sm text-kumkum list-disc pl-5 max-h-24 overflow-y-auto">
              {status.details.map((detail) => <li key={detail}>{detail}</li>)}
            </ul>
          )}
          <div className="flex items-center gap-4">
            <p className={`flex-1 text-sm ${status.type === 'error' ? 'text-kumkum' : 'text-cream/70'}`}>
              {status.text || (dirty ? 'You have unsaved changes.' : 'All changes saved.')}
            </p>
            <button
              onClick={handleSave}
              disabled={!dirty || saving}
              className="px-6 py-3 rounded-md bg-zari text-maroon font-semibold disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(Boolean(getToken()));

  return loggedIn
    ? <Editor onLoggedOut={() => setLoggedIn(false)} />
    : <LoginForm onLoggedIn={() => setLoggedIn(true)} />;
};

export default Admin;
