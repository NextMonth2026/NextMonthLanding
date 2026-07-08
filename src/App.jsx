import { lazy, Suspense, useEffect, useState } from 'react';
import { Nav, Footer } from './components/SiteChrome.jsx';

const DavePage = lazy(() => import('./pages/DavePage.jsx'));
const DaveDemoPage = lazy(() => import('./pages/DaveDemoPage.jsx'));
const PlatformPage = lazy(() => import('./pages/PlatformPage.jsx'));
const HomePage = lazy(() => import('./pages/HomePage.jsx'));

function PageLoader() { return <div className="flex min-h-screen items-center justify-center bg-ink"><span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">Loading…</span></div>; }

function currentPath() { return typeof window !== 'undefined' ? window.location.pathname.replace(/\/+$/, '') || '/' : '/'; }

export default function App() {
  const [path, setPath] = useState(currentPath);
  useEffect(() => { const onPop = () => setPath(currentPath()); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
  if (path === '/dave/demo') return <Suspense fallback={<PageLoader />}><DaveDemoPage /></Suspense>;
  if (path === '/dave') return <Suspense fallback={<PageLoader />}><DavePage /></Suspense>;
  if (path === '/platform') return <Suspense fallback={<PageLoader />}><PlatformPage /></Suspense>;
  return <Suspense fallback={<PageLoader />}><HomePage /></Suspense>;
}
