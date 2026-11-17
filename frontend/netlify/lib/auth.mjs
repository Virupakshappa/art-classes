// Shared admin auth helpers for the Netlify functions.
// Credentials and the signing secret come from Netlify environment variables,
// so they never ship in the website code that visitors download.
import { createHmac, timingSafeEqual } from 'node:crypto';

const SESSION_HOURS = 12;

const secret = () => process.env.SESSION_SECRET;

export const isConfigured = () =>
  Boolean(process.env.ADMIN_USER && process.env.ADMIN_PASSWORD && secret());

// Constant-time compare so response timing doesn't leak how much matched
const safeEqual = (a, b) => {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  return left.length === right.length && timingSafeEqual(left, right);
};

export const checkCredentials = (user, password) =>
  // Evaluate both so a wrong username takes as long as a wrong password
  [safeEqual(user, process.env.ADMIN_USER), safeEqual(password, process.env.ADMIN_PASSWORD)]
    .every(Boolean);

const sign = (payload) => createHmac('sha256', secret()).update(payload).digest('base64url');

export const createToken = () => {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + SESSION_HOURS * 3600 * 1000 }))
    .toString('base64url');
  return `${payload}.${sign(payload)}`;
};

export const verifyRequest = (req) => {
  const header = req.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  const [payload, signature] = token.split('.');
  if (!payload || !signature || !isConfigured() || !safeEqual(signature, sign(payload))) {
    return false;
  }
  try {
    return JSON.parse(Buffer.from(payload, 'base64url').toString()).exp > Date.now();
  } catch {
    return false;
  }
};

export const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers },
  });
