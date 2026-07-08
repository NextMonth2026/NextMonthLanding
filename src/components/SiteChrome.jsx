import { useEffect, useState } from 'react';

export const logo = 'https://res.cloudinary.com/drl0fxrkq/image/upload/v1769952407/8A3D82EC-31EF-4209-85E2-D1D284F5E960_lnzuah.png';
export const primary = { backgroundColor: '#EE28B8', color: '#0A0207' };
export const foundingMailto = 'mailto:hello@nextmonth.io?subject=Founding%20customer%20access%20request';

// Universal links: `/#anchor` resolves as a same-document fragment scroll on the
// homepage and as a full navigation-plus-scroll from other routes (e.g. /dave).
const links = [
  { label: 'Home', href: '/' },
  { label: 'Dave Method', href: '/dave' },
  { label: 'Platform', href: '/platform' },
  { label: 'Founding Customers', href: '/#founding' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll); }, []);
  return <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled ? 'bg-ink/70 backdrop-blur-xl border-b border-white/[0.06]' : 'border-b border-transparent'}`}><nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10"><a href="/" className="group flex items-center" aria-label="NextMonth home"><img src={logo} alt="NextMonth" className="h-7 w-auto sm:h-8" /></a><ul className="hidden items-center gap-9 md:flex">{links.map((l) => <li key={l.href}><a href={l.href} className="text-[14px] font-medium text-white/55 transition-colors hover:text-white">{l.label}</a></li>)}</ul><div className="hidden md:block"><a href="/#founding" style={primary} className="rounded-full px-4 py-2 text-[14px] font-semibold transition-transform hover:scale-[1.03]">Become a founding customer</a></div><button className="text-white md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={open}><div className="space-y-1.5"><span className={`block h-px w-6 bg-white transition ${open ? 'translate-y-[6px] rotate-45' : ''}`}></span><span className={`block h-px w-6 bg-white transition ${open ? 'opacity-0' : ''}`}></span><span className={`block h-px w-6 bg-white transition ${open ? '-translate-y-[6px] -rotate-45' : ''}`}></span></div></button></nav>{open && <div className="border-t border-white/[0.06] bg-ink/95 px-6 py-4 backdrop-blur-xl md:hidden"><ul className="space-y-3">{links.map((l) => <li key={l.href}><a href={l.href} onClick={() => setOpen(false)} className="block text-[15px] text-white/70 hover:text-white">{l.label}</a></li>)}<li><a href="/#founding" onClick={() => setOpen(false)} style={primary} className="mt-2 block rounded-full px-4 py-2 text-center text-[15px] font-semibold">Become a founding customer</a></li></ul></div>}</header>;
}

export function Footer() { return <footer className="border-t border-white/[0.06] py-14"><div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 sm:flex-row sm:items-center sm:justify-between lg:px-10"><div><img src={logo} alt="NextMonth" className="h-6 w-auto" /><p className="mt-3 text-[14px] text-white/45">Helping organisations build a living business brain.</p></div><nav className="flex flex-wrap gap-x-7 gap-y-2">{[['Home', '/'], ['Dave Method', '/dave'], ['Platform', '/platform'], ['Founding Customers', '/#founding']].map(([l, h]) => <a key={l} href={h} className="text-[14px] text-white/50 transition-colors hover:text-white">{l}</a>)}</nav></div><div className="mx-auto mt-8 max-w-7xl px-6 lg:px-10"><p className="text-[12.5px] text-white/30">© {new Date().getFullYear()} NextMonth. All rights reserved.</p></div></footer>; }
