// File: src/content.js
// Site content shared by every component. Starts from the copy saved on the
// phone (or the built-in content), then refreshes from the server.
import React, { createContext, useContext, useEffect, useState } from 'react';
import { defaultContent } from './data/site';

const CACHE_KEY = 'content';
const TOKEN_KEY = 'adminToken';
const TIMEOUT_MS = 15000;

const ContentContext = createContext({ content: defaultContent, setContent: () => {} });

// Fill any missing section from the built-in content so the page always renders
const withDefaults = (data) => {
  const merged = { ...defaultContent };
  Object.keys(defaultContent).forEach((key) => {
    const value = data?.[key];
    const expected = defaultContent[key];
    if (value && Array.isArray(value) === Array.isArray(expected) && typeof value === 'object') {
      merged[key] = value;
    }
  });
  return merged;
};

const readCache = () => {
  try {
    return withDefaults(JSON.parse(localStorage.getItem(CACHE_KEY)));
  } catch {
    return defaultContent;
  }
};

const writeCache = (content) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(content));
  } catch {
    // Storage full or blocked - caching is best effort
  }
};

const request = async (path, options = {}) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(path, {
      ...options,
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    });
    const data = await response.json().catch(() => null);
    if (!response.ok) {
      const error = new Error(data?.message || 'Something went wrong. Please try again.');
      error.status = response.status;
      error.details = data?.errors;
      throw error;
    }
    return data;
  } catch (error) {
    if (error.name === 'AbortError' || error instanceof TypeError) {
      throw new Error('No connection. Check your internet and try again.');
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
};

// The server must answer with a content object; anything else (e.g. an HTML
// page from a host without the API) counts as a failure so the page never breaks.
const asContent = (data) => {
  if (!data || typeof data.content !== 'object' || !Array.isArray(data.content.classes)) {
    throw new Error('Saved content is not available right now.');
  }
  return withDefaults(data.content);
};

export const fetchContent = async () => {
  const content = asContent(await request('/api/content'));
  writeCache(content);
  return content;
};

export const getToken = () => sessionStorage.getItem(TOKEN_KEY);

export const login = async (username, password) => {
  const { token } = await request('/api/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  sessionStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => sessionStorage.removeItem(TOKEN_KEY);

export const saveContent = async (content) => {
  const saved = asContent(await request('/api/content', {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify({ content }),
  }));
  writeCache(saved);
  return saved;
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(readCache);

  useEffect(() => {
    // Offline or API unavailable: keep showing the saved / built-in copy
    fetchContent().then(setContent).catch(() => {});
  }, []);

  return (
    <ContentContext.Provider value={{ content, setContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
