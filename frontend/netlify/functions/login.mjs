// POST /api/login - exchanges the admin username/password for a 12-hour session token.
import { getStore } from '@netlify/blobs';
import { isConfigured, checkCredentials, createToken, json } from '../lib/auth.mjs';

const MAX_FAILURES = 5;
const WINDOW_MS = 15 * 60 * 1000;

export default async (req, context) => {
  if (req.method !== 'POST') return json({ message: 'Use POST' }, 405);
  if (!isConfigured()) return json({ message: 'Admin login is not set up on the server.' }, 500);

  // Lock an IP out for 15 minutes after 5 wrong attempts to stop password guessing
  const attempts = getStore({ name: 'login-attempts', consistency: 'strong' });
  const key = `ip-${context.ip || 'unknown'}`;
  const now = Date.now();
  let record = (await attempts.get(key, { type: 'json' })) || { count: 0, first: now };
  if (now - record.first > WINDOW_MS) record = { count: 0, first: now };
  if (record.count >= MAX_FAILURES) {
    const minutes = Math.ceil((record.first + WINDOW_MS - now) / 60000);
    return json({ message: `Too many wrong attempts. Try again in ${minutes} minutes.` }, 429);
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ message: 'Send a username and password.' }, 400);
  }

  if (!checkCredentials(body?.username ?? '', body?.password ?? '')) {
    await attempts.setJSON(key, { count: record.count + 1, first: record.first });
    return json({ message: 'Wrong username or password.' }, 401);
  }

  await attempts.delete(key);
  return json({ token: createToken() });
};

export const config = { path: '/api/login' };
