import React, { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import ContactBar from './components/ContactBar';
import Home from './pages/Home';
import { ContentProvider } from './content';

// Admin code downloads only for whoever opens /admin - visitors never pay for it
const Admin = lazy(() => import('./pages/Admin'));
const isAdmin = window.location.pathname.replace(/\/$/, '') === '/admin';

const App = () => {
  return (
    <ContentProvider>
    <div id="top" className="min-h-screen bg-maroon text-cream">
      <Navbar />
      {/* Top padding clears the fixed header; bottom padding the phone contact bar */}
      <main className={`pt-[4.375rem] ${isAdmin ? '' : 'pb-20 md:pb-0'}`}>
        {isAdmin ? (
          <Suspense fallback={<p className="p-6 text-cream/70">Loading…</p>}>
            <Admin />
          </Suspense>
        ) : (
          <Home />
        )}
      </main>
      {!isAdmin && <ContactBar />}
    </div>
    </ContentProvider>
  );
};

export default App;
