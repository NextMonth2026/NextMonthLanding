import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Nav, Footer, primary } from '../components/SiteChrome.jsx';
import DaveCalculator from './DaveCalculator.jsx';

const ease = [0.22, 1, 0.36, 1];

function useReveal() {
  const reduce = useReducedMotion();
  return { initial: reduce ? { opacity: 1 } : { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-80px' }, transition: { duration: 0.7, ease } };
}

const PROBLEMS = [
  { title: 'They lose judgement, not information.', body: 'Information is “press this button.” Judgement is “don’t press it today — the humidity’s up and this machine always behaves differently.”' },
  { title: 'The knowledge already isn’t flowing.', body: 'Junior staff don’t ask twice — they don’t want to look stupid. The questions they swallow become silent mistakes.' },
  { title: 'The window closes before the leaving date.', body: 'By the time notice is handed in, the goodwill and the incentive to share are already gone.' },
];

export default function DavePage() {
  const reveal = useReveal();
  const reduce = useReducedMotion();
  const fade = (delay) => ({ initial: reduce ? { opacity: 1 } : { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease, delay } });

  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'The Dave Method — NextMonth';
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta ? meta.getAttribute('content') : null;
    if (meta) meta.setAttribute('content', 'Work out how much operational judgement is trapped inside your key people — and what it costs if they leave. Free knowledge-risk calculator and 90-day protection plan.');
    return () => { document.title = prevTitle; if (meta && prevDesc !== null) meta.setAttribute('content', prevDesc); };
  }, []);

  return (
    <div className="relative min-h-screen bg-ink">
      <Nav />
      <main>
        {/* 1. Hero — the phone call */}
        <section className="relative isolate overflow-hidden pb-16 pt-36 lg:pb-20 lg:pt-44">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-[12%] top-[-6%] h-[560px] w-[560px] rounded-full bg-signal/[0.12] blur-[150px]"></div>
            <div className="absolute right-[6%] top-[24%] h-[460px] w-[460px] rounded-full bg-magenta/[0.10] blur-[150px]"></div>
            <div className="grid-texture absolute inset-0"></div>
          </div>
          <div className="mx-auto max-w-3xl px-6 text-center">
            <motion.p {...fade(0)} className="mb-6 inline-block rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-signal/90">The Dave Method</motion.p>
            <motion.h1 {...fade(0.08)} className="font-display text-[clamp(2.6rem,6.5vw,4.6rem)] font-bold leading-[1.02] tracking-tightest text-gradient">“Could I speak to Dave, please?”</motion.h1>
            <motion.div {...fade(0.18)} className="mx-auto mt-8 max-w-xl space-y-2 text-left">
              <p className="text-[17px] leading-relaxed text-white/70">“Dave who?”</p>
              <p className="text-[17px] leading-relaxed text-white/70">“I don’t know his name. He’s the person everyone quietly goes to when something complicated happens.”</p>
            </motion.div>
            <motion.p {...fade(0.26)} className="mx-auto mt-7 max-w-2xl text-[16.5px] leading-relaxed text-white/60">Every business has a Dave. Sometimes it’s Sarah. Sometimes it’s Ahmed. Sometimes it’s someone who’s never had “manager” in their job title. But everyone knows who they are.</motion.p>
            <motion.div {...fade(0.34)} className="mt-10">
              <a href="#calculator" style={primary} className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold transition-transform hover:scale-[1.03]">Work out what Dave is worth <span className="transition-transform group-hover:translate-y-0.5">↓</span></a>
            </motion.div>
          </div>
        </section>

        {/* 2. The problem */}
        <section className="relative py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <motion.div {...reveal} className="mx-auto mb-14 max-w-3xl text-center">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">The problem</p>
              <h2 className="font-display text-[clamp(1.8rem,3.8vw,2.8rem)] font-semibold leading-tight tracking-tightest text-gradient">What happens when the people who know how your business really works are no longer there to explain it?</h2>
            </motion.div>
            <div className="grid gap-5 md:grid-cols-3">
              {PROBLEMS.map((c, i) => (
                <motion.article key={c.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease, delay: i * 0.1 }} className="glass glass-hover flex flex-col rounded-3xl p-7">
                  <h3 className="font-display text-[19px] font-semibold leading-snug tracking-tight text-white">{c.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/60">{c.body}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* 3. The calculator */}
        <DaveCalculator />

        {/* 4. The belief */}
        <section className="relative py-24 lg:py-32">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10"><div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/[0.08] blur-[150px]"></div></div>
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <motion.div {...reveal} className="glass rounded-[2rem] p-8 sm:p-12 lg:p-16">
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-signal/80">What we believe</p>
              <div className="space-y-5 text-[17px] leading-relaxed text-white/72">
                <p>Every business has people who quietly become part of the organisation’s memory. They are rarely the loudest. They are often interrupted. They answer the same questions hundreds of times, and carry decisions nobody realises they’re carrying.</p>
                <p>Most businesses only discover their value when they’re leaving. We believe that’s too late.</p>
                <p className="font-display text-[19px] font-medium text-white">The Dave Method exists because judgement shouldn’t disappear with the people who earned it.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 5. The Dave Files teaser */}
        <section className="relative py-24 lg:py-32">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <motion.div {...reveal} className="glass overflow-hidden rounded-[2rem] p-8 sm:p-12">
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">Coming soon</p>
              <h2 className="font-display text-[clamp(1.9rem,4vw,2.9rem)] font-semibold leading-tight tracking-tightest text-gradient">The Dave Files</h2>
              <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-white/62">Twenty-minute documentary conversations with recently retired experts, about everything they knew that nobody ever wrote down. What did nobody ever ask you? What took ten years to learn?</p>
              <div className="mt-8 flex items-center gap-4 rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.02] px-6 py-8">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-white/50">▶</span>
                <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-white/40">First conversations in production</p>
              </div>
              <p className="mt-8 font-display text-[clamp(1.3rem,3vw,1.9rem)] font-semibold leading-snug tracking-tight text-gradient">Don’t wait until your Dave retires to discover what the business never captured.</p>
            </motion.div>
          </div>
        </section>

        {/* 6. Final CTA */}
        <section className="relative py-24 lg:py-32">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10"><div className="absolute left-1/2 top-1/2 h-[460px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-magenta/[0.08] blur-[150px]"></div></div>
          <div className="mx-auto max-w-3xl px-6 text-center">
            <motion.div {...reveal}>
              <h2 className="font-display text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-[1.06] tracking-tightest text-gradient">Book a floor-walk audit.</h2>
              <p className="mx-auto mt-6 max-w-xl text-[16.5px] leading-relaxed text-white/65">We map your Knowledge Carriers — by dependency, not job title — and the five processes that break first.</p>
              <div className="mt-10"><a href="/#founding" style={primary} className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold transition-transform hover:scale-[1.03]">Book a floor-walk audit <span>→</span></a></div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
