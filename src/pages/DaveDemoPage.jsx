import { useEffect, useMemo, useState } from 'react';
import { Nav, Footer, primary } from '../components/SiteChrome.jsx';
import {
  meta,
  badge,
  enter,
  guide,
  attribution,
  openingChips,
  questions,
  askExhausted,
  check,
  turn,
} from './daveDemoScript.js';

// Fully scripted demo — no AI, no fetch, no backend, no free-text input.
// A canned question tree that shows how a real NextMonth capture behaves.

const STAGES = ['enter', 'meet', 'ask', 'check', 'turn'];

// Persistent honesty badge — visible on every stage.
function DemoBadge() {
  return (
    <div className="mx-auto mb-8 flex max-w-2xl items-center justify-center gap-2.5 rounded-full border border-white/[0.09] bg-white/[0.03] px-4 py-2 text-center">
      <span className="h-1.5 w-1.5 flex-none rounded-full bg-magenta/80"></span>
      <span className="font-mono text-[10.5px] uppercase leading-snug tracking-[0.14em] text-white/45">
        {badge}
      </span>
    </div>
  );
}

// Small progress rail so the IceMaker structure (Enter → Meet → Ask → Check) reads.
const STAGE_LABELS = { enter: 'Enter', meet: 'Meet the guide', ask: 'Ask', check: 'Check', turn: 'The turn' };
function StageRail({ stage }) {
  const idx = STAGES.indexOf(stage);
  return (
    <div className="mx-auto mb-10 flex max-w-md items-center justify-center gap-2.5">
      {STAGES.map((s, i) => (
        <span key={s} className="flex items-center gap-2.5">
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${
              i === idx ? 'text-signal' : i < idx ? 'text-white/45' : 'text-white/20'
            }`}
          >
            {STAGE_LABELS[s]}
          </span>
          {i < STAGES.length - 1 && <span className="h-px w-4 flex-none bg-white/12"></span>}
        </span>
      ))}
    </div>
  );
}

// Fades/slides each stage in on mount via a CSS transition — no animation library.
function StagePanel({ children }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <div
      className={`transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      {children}
    </div>
  );
}

// Avatar with initials — no stock photos, no AI faces.
function GuideAvatar({ size = 'h-14 w-14', text = 'text-[20px]' }) {
  return (
    <span
      className={`relative flex ${size} flex-none items-center justify-center rounded-full ring-1 ring-signal/40`}
      style={{ background: 'linear-gradient(140deg, rgba(43,200,244,0.22), rgba(238,40,184,0.22))' }}
    >
      <span className={`font-display ${text} font-semibold text-white`}>{guide.initials}</span>
    </span>
  );
}

function EnterStage({ onNext }) {
  return (
    <StagePanel>
      <div className="glass relative isolate overflow-hidden rounded-[2rem] p-8 sm:p-12 lg:p-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-signal/[0.12] blur-[140px]"></div>
          <div className="absolute right-[4%] bottom-[-10%] h-[360px] w-[360px] rounded-full bg-magenta/[0.10] blur-[140px]"></div>
          <div className="grid-texture absolute inset-0"></div>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal/90">{enter.eyebrow}</p>
        <h1 className="mt-6 max-w-2xl font-display text-[clamp(2.4rem,6vw,4rem)] font-bold leading-[1.02] tracking-tightest text-gradient">
          {enter.headline}
        </h1>
        <div className="mt-7 max-w-xl space-y-3">
          {enter.scene.map((line) => (
            <p key={line} className="text-[16.5px] leading-relaxed text-white/68">
              {line}
            </p>
          ))}
        </div>
        <button
          type="button"
          onClick={onNext}
          style={primary}
          className="group mt-10 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold transition-transform hover:scale-[1.03]"
        >
          {enter.cta} <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </button>
      </div>
    </StagePanel>
  );
}

function MeetStage({ onNext }) {
  return (
    <StagePanel>
      <div className="glass mx-auto max-w-2xl rounded-[2rem] p-8 sm:p-12">
        <div className="flex items-center gap-5">
          <GuideAvatar size="h-16 w-16" text="text-[24px]" />
          <div>
            <p className="font-display text-[22px] font-semibold leading-tight text-white">{guide.name}</p>
            <p className="mt-1 text-[14.5px] text-white/60">{guide.role}</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal/80">{guide.tenure}</p>
          </div>
        </div>
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/35">{guide.business}</p>
        <blockquote className="mt-7 border-l-2 border-signal/40 pl-5 text-[18px] leading-relaxed text-white/80">
          “{guide.voiceLine}”
        </blockquote>
        <button
          type="button"
          onClick={onNext}
          style={primary}
          className="group mt-9 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold transition-transform hover:scale-[1.03]"
        >
          {guide.cta} <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </button>
      </div>
    </StagePanel>
  );
}

// Chip button used across Ask and Check stages.
function Chip({ label, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded-full border border-signal/25 bg-signal/[0.06] px-4 py-2.5 text-left text-[14px] leading-snug text-white/85 transition-colors hover:border-signal/50 hover:bg-signal/[0.1] disabled:opacity-40"
    >
      {label}
    </button>
  );
}

function Answer({ q }) {
  return (
    <div className="max-w-[85%] space-y-3 rounded-2xl rounded-tl-md border border-white/[0.08] bg-white/[0.035] px-5 py-4">
      <div className="flex items-center gap-2.5">
        <GuideAvatar size="h-7 w-7" text="text-[11px]" />
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal/80">{attribution}</span>
      </div>
      {q.answer.map((para) => (
        <p key={para} className="text-[15px] leading-relaxed text-white/78">
          {para}
        </p>
      ))}
      <p className="border-t border-white/[0.07] pt-2.5 font-mono text-[11px] leading-relaxed text-white/38">
        {q.source}
      </p>
    </div>
  );
}

function AskStage({ onCheck }) {
  const [asked, setAsked] = useState([]);

  // Available chips = opening chips plus every follow-up unlocked so far, minus
  // questions already asked. Q4/Q5 surface only through follow-up links.
  const availableChips = useMemo(() => {
    const askedSet = new Set(asked);
    const unlocked = new Set(openingChips);
    asked.forEach((id) => questions[id].followUps.forEach((f) => unlocked.add(f)));
    return [...unlocked].filter((id) => !askedSet.has(id));
  }, [asked]);

  const ask = (id) => setAsked((prev) => [...prev, id]);
  const exhausted = availableChips.length === 0;

  return (
    <StagePanel>
      <div className="glass mx-auto max-w-2xl rounded-[2rem] p-6 sm:p-8">
        <div className="flex items-center gap-3 border-b border-white/[0.07] pb-4">
          <GuideAvatar size="h-9 w-9" text="text-[13px]" />
          <div className="leading-tight">
            <p className="font-display text-[15px] font-semibold text-white">{guide.name}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal/70">{guide.role}</p>
          </div>
          <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">
            <span className="h-1.5 w-1.5 rounded-full bg-signal"></span>Living guide
          </span>
        </div>

        {/* Transcript */}
        <div className="mt-5 space-y-5">
          {asked.length === 0 && (
            <p className="text-[14.5px] leading-relaxed text-white/50">
              Pick a question below. Frank answers, then hands you what to ask next.
            </p>
          )}
          {asked.map((id) => (
            <div key={id} className="space-y-2.5">
              <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-md bg-magenta/[0.12] px-4 py-2.5 text-right text-[14.5px] text-white/90">
                {questions[id].chip}
              </div>
              <Answer q={questions[id]} />
            </div>
          ))}
        </div>

        {/* Chips / progression */}
        <div className="mt-7 border-t border-white/[0.07] pt-5">
          {!exhausted ? (
            <>
              <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/40">
                {asked.length === 0 ? 'Ask Frank' : 'Ask next'}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {availableChips.map((id) => (
                  <Chip key={id} label={questions[id].chip} onClick={() => ask(id)} />
                ))}
              </div>
            </>
          ) : (
            <p className="text-[15px] leading-relaxed text-white/65">{askExhausted}</p>
          )}

          <div className="mt-6">
            <button
              type="button"
              onClick={onCheck}
              style={exhausted ? primary : undefined}
              className={`group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14.5px] font-semibold transition-transform hover:scale-[1.03] ${
                exhausted ? '' : 'border border-white/20 bg-white/[0.03] text-white/85 hover:border-white/35'
              }`}
            >
              Take the check <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          </div>
        </div>
      </div>
    </StagePanel>
  );
}

function CheckStage({ onNext }) {
  const [picked, setPicked] = useState(null);
  const answered = picked !== null;
  const pickedCorrect = answered && check.options.find((o) => o.id === picked)?.correct;

  return (
    <StagePanel>
      <div className="glass mx-auto max-w-2xl rounded-[2rem] p-8 sm:p-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal/80">{check.eyebrow}</p>
        <h2 className="mt-4 font-display text-[clamp(1.5rem,3.4vw,2.1rem)] font-semibold leading-snug tracking-tight text-white">
          {check.question}
        </h2>

        <div className="mt-7 grid gap-3">
          {check.options.map((o) => {
            const isPicked = picked === o.id;
            let tone = 'border-white/[0.1] bg-white/[0.03] text-white/80 hover:border-signal/40';
            if (answered) {
              if (o.correct) tone = 'border-signal/60 bg-signal/[0.1] text-white';
              else if (isPicked) tone = 'border-magenta/50 bg-magenta/[0.08] text-white/80';
              else tone = 'border-white/[0.07] bg-white/[0.02] text-white/45';
            }
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => !answered && setPicked(o.id)}
                disabled={answered}
                className={`flex items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left text-[15px] leading-snug transition-colors ${tone}`}
              >
                <span>{o.label}</span>
                {answered && o.correct && <span className="flex-none font-mono text-[12px] text-signal">✓</span>}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="mt-6">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
              {pickedCorrect ? check.correctToast : check.incorrectToast}
            </p>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4">
              <p className="text-[15px] leading-relaxed text-white/80">{check.explanation}</p>
            </div>
            <button
              type="button"
              onClick={onNext}
              style={primary}
              className="group mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold transition-transform hover:scale-[1.03]"
            >
              See what just happened <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          </div>
        )}
      </div>
    </StagePanel>
  );
}

function TurnStage() {
  return (
    <StagePanel>
      <div className="glass mx-auto max-w-3xl rounded-[2rem] p-8 sm:p-12 lg:p-14">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal/80">{turn.eyebrow}</p>
        <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-white/75">
          {turn.paragraphs.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href={turn.primaryCta.href}
            style={primary}
            className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold transition-transform hover:scale-[1.03]"
          >
            {turn.primaryCta.label} <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
          <a
            href={turn.secondaryCta.href}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-7 py-3.5 text-[15px] font-medium text-white/85 transition-colors hover:border-white/35 hover:text-white"
          >
            {turn.secondaryCta.label} <span>→</span>
          </a>
        </div>
      </div>
    </StagePanel>
  );
}

export default function DaveDemoPage() {
  const [stage, setStage] = useState('enter');

  useEffect(() => {
    const prevTitle = document.title;
    document.title = meta.title;
    const metaEl = document.querySelector('meta[name="description"]');
    const prevDesc = metaEl ? metaEl.getAttribute('content') : null;
    if (metaEl) metaEl.setAttribute('content', meta.description);
    return () => {
      document.title = prevTitle;
      if (metaEl && prevDesc !== null) metaEl.setAttribute('content', prevDesc);
    };
  }, []);

  // Scroll to top on each stage change so the new panel starts in view.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stage]);

  return (
    <div className="relative min-h-screen bg-ink">
      <Nav />
      <main className="relative isolate overflow-hidden pb-24 pt-32 lg:pt-36">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[12%] top-[-6%] h-[520px] w-[520px] rounded-full bg-signal/[0.08] blur-[150px]"></div>
          <div className="absolute right-[6%] top-[30%] h-[420px] w-[420px] rounded-full bg-magenta/[0.07] blur-[150px]"></div>
        </div>
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <DemoBadge />
          <StageRail stage={stage} />
          {/* key forces StagePanel remount so its enter transition replays per stage */}
          <div key={stage}>
            {stage === 'enter' && <EnterStage onNext={() => setStage('meet')} />}
            {stage === 'meet' && <MeetStage onNext={() => setStage('ask')} />}
            {stage === 'ask' && <AskStage onCheck={() => setStage('check')} />}
            {stage === 'check' && <CheckStage onNext={() => setStage('turn')} />}
            {stage === 'turn' && <TurnStage />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
