// GET /api/content - public: the whole site's content, as last saved by the admin.
// PUT /api/content - admin only: replaces it after cleaning and validating.
import { getStore } from '@netlify/blobs';
import { verifyRequest, json } from '../lib/auth.mjs';
import { cleanContent } from '../../src/data/schema.js';
import { defaultContent } from '../../src/data/site.js';

const KEY = 'site';
const MAX_BODY_BYTES = 200 * 1024;

export default async (req) => {
  const store = getStore({ name: 'content', consistency: 'strong' });

  if (req.method === 'GET') {
    const saved = await store.get(KEY, { type: 'json' });
    const { content } = cleanContent(saved || defaultContent, defaultContent);
    // Short browser cache keeps repeat visits cheap on slow data
    return json({ content }, 200, { 'Cache-Control': 'public, max-age=60' });
  }

  if (req.method === 'PUT') {
    if (!verifyRequest(req)) return json({ message: 'Please log in again.' }, 401);

    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) return json({ message: 'That is too much content to save at once.' }, 413);

    let body;
    try {
      body = JSON.parse(raw);
    } catch {
      return json({ message: 'Invalid data.' }, 400);
    }

    const { content, errors } = cleanContent(body?.content, defaultContent);
    if (errors.length) {
      return json({ message: 'Please fix these before saving.', errors }, 400);
    }
    await store.setJSON(KEY, content);
    return json({ content });
  }

  return json({ message: 'Use GET or PUT' }, 405);
};

export const config = { path: '/api/content' };
