import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { primary } from '../components/SiteChrome.jsx';

// Method constants — stated visibly in the footnote below.
const WEEKS_PER_YEAR = 46;      // working weeks
const HOURS_PER_MONTH = 160;    // 160-hr months
const RECRUIT_RATE = 0.15;      // recruitment = 15% of annual cost
const EFFECTIVENESS_GAP = 0.5;  // 50% effectiveness gap during rebuild
const WEEKS_PER_MONTH = 4.33;

const gbp = (n) => '£' + Math.round(n).toLocaleString('en-GB');

function bandFor(processes, hours) {
  const pPts = processes >= 10 ? 3 : processes >= 6 ? 2 : processes >= 3 ? 1 : 0;
  const hPts = hours >= 8 ? 3 : hours >= 5 ? 2 : hours >= 2 ? 1 : 0;
  const points = pPts + hPts;
  if (points >= 5) return { label: 'Critical', tone: 'text-magenta' };
  if (points >= 3) return { label: 'High', tone: 'text-signal' };
  if (points >= 1) return { label: 'Moderate', tone: 'text-violet' };
  return { label: 'Low', tone: 'text-white/60' };
}

function Field({ id, label, hint, prefix, type = 'number', value, onChange }) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">{label}</span>
      <span className="relative flex items-center">
        {prefix && <span className="pointer-events-none absolute left-4 text-[15px] text-white/50">{prefix}</span>}
        <input
          id={id}
          type={type}
          inputMode={type === 'number' ? 'numeric' : undefined}
          min={type === 'number' ? 0 : undefined}
          value={value}
          onChange={onChange}
          className={`w-full rounded-2xl border border-white/[0.09] bg-white/[0.03] py-3 ${prefix ? 'pl-9 pr-4' : 'px-4'} text-[15px] text-white outline-none transition-colors focus:border-signal/50`}
        />
      </span>
      {hint && <span className="mt-1.5 block text-[12.5px] text-white/35">{hint}</span>}
    </label>
  );
}

function Line({ label, working, result, strong }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-dashed border-white/[0.12] py-2.5 last:border-b-0">
      <div className="min-w-0">
        <p className={`truncate text-[13.5px] ${strong ? 'text-white/85' : 'text-white/65'}`}>{label}</p>
        {working && <p className="mt-0.5 font-mono text-[11.5px] text-white/35">{working}</p>}
      </div>
      <p className={`flex-none font-mono ${strong ? 'text-[15px] text-white' : 'text-[13.5px] text-white/70'}`}>{result}</p>
    </div>
  );
}

export default function DaveCalculator({ initialName = 'Dave' }) {
  const [name, setName] = useState(initialName);
  useEffect(() => { setName(initialName); }, [initialName]);
  const [processes, setProcesses] = useState(12);
  const [hours, setHours] = useState(6);
  const [rate, setRate] = useState(22);
  const [rebuildMonths, setRebuildMonths] = useState(3);
  const [showPlan, setShowPlan] = useState(false);

  const num = (setter) => (e) => setter(e.target.value === '' ? 0 : Math.max(0, Number(e.target.value)));
  const who = name.trim() || 'Dave';

  const annualCost = rate * HOURS_PER_MONTH * 12;
  const repeatCost = hours * rate * WEEKS_PER_YEAR;
  const recruitCost = annualCost * RECRUIT_RATE;
  const rebuildCost = rebuildMonths * rate * HOURS_PER_MONTH * EFFECTIVENESS_GAP;
  const lossExposure = recruitCost + rebuildCost;
  const band = bandFor(processes, hours);
  const catchUpWeeks = Math.round(rebuildMonths * WEEKS_PER_MONTH);

  return (
    <section id="calculator" className="relative py-24 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10"><div className="absolute right-[8%] top-[18%] h-[440px] w-[440px] rounded-full bg-signal/[0.08] blur-[150px]"></div><div className="absolute left-[6%] bottom-[10%] h-[380px] w-[380px] rounded-full bg-magenta/[0.07] blur-[150px]"></div></div>
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-signal">Knowledge Risk Assessment</p>
          <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tightest text-gradient">The cost of being indispensable.</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Inputs */}
          <div className="glass rounded-3xl p-7 sm:p-8">
            <div className="space-y-6">
              <Field id="dave-name" label="Who holds the knowledge?" type="text" value={name} onChange={(e) => setName(e.target.value)} hint="A name makes it real. It's rarely just one person." />
              <Field id="dave-processes" label="How many tasks would stop if they weren't here?" value={processes} onChange={num(setProcesses)} />
              <Field id="dave-hours" label="How many hours a week do they spend repeating themselves?" value={hours} onChange={num(setHours)} />
              <Field id="dave-rate" label="What is their hourly cost to the business?" prefix="£" value={rate} onChange={num(setRate)} hint="£22/hr ≈ £34k/yr fully loaded" />
              <Field id="dave-rebuild" label="How many months would it take to replace them properly?" value={rebuildMonths} onChange={num(setRebuildMonths)} />
            </div>
          </div>

          {/* Receipt */}
          <div className="glass rounded-3xl p-7 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">Dependency band</p>
                <p className={`font-display text-[15px] font-semibold ${band.tone}`}>{band.label}</p>
              </div>
              <div className="mt-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
                <div className="mb-4">
                  <p className="text-[15px] font-medium text-white mb-1">Today's daily waste</p>
                  <p className="text-[13.5px] leading-relaxed text-white/50">Your team currently spends the equivalent of <strong className="text-white">{Math.round(hours * WEEKS_PER_YEAR / 40)} working weeks</strong> every year asking {who} questions the business should already know the answers to.</p>
                </div>
                <Line label="Annual cost of repeated explanations" working={`${hours} hrs/wk × £${rate} × ${WEEKS_PER_YEAR} wks`} result={`${gbp(repeatCost)}/yr`} strong />
              </div>

              <div className="mt-5 rounded-2xl border border-magenta/25 bg-magenta/[0.06] p-6 text-center">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">Total replacement risk</p>
                <p className="mt-2 font-mono text-[clamp(2.4rem,6vw,3.6rem)] font-semibold leading-none text-white">{gbp(lossExposure)}</p>
                <p className="mt-2 font-mono text-[11.5px] text-white/40">recruitment {gbp(recruitCost)} + rebuild {gbp(rebuildCost)}</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-[15px] font-medium text-white mb-2">Tomorrow's risk</p>
              <p className="text-[14px] leading-relaxed text-white/60 italic">"If {who} left tomorrow, replacing what they know could cost at least <strong className="text-white/90 not-italic">{gbp(lossExposure)}</strong>."</p>
              <p className="mt-3 text-[13px] leading-relaxed text-white/40">This is the absolute floor. It assumes a proper handover, which most departures never get. It doesn't include the value of the opportunities {who} could be chasing if they weren't re-explaining the basics.</p>
            </div>
          </div>
        </div>

        {/* Exclusions */}
        <div className="glass mt-6 rounded-3xl p-7 sm:p-8">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">What this number deliberately leaves out</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'The silent mistakes made because staff were too afraid to ask twice.',
              `The high-value projects ${who} could be leading instead of repeating the basics.`,
              `The risk that a replacement for ${who}’s experience doesn’t exist in the market.`,
              'The institutional memory that disappears weeks before the notice period ends.',
              'The cost of inconsistent decisions while the new person catches up.',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-[14.5px] leading-relaxed text-white/70"><span className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-magenta/70"></span>{item}</li>
            ))}
          </ul>
          <p className="mt-6 border-t border-white/[0.07] pt-5 text-[15px] font-medium text-white/70">None of these can be priced honestly, so none are priced. Treat the figure above as the floor, not the estimate.</p>
        </div>

        {/* Method footnote */}
        <p className="mt-5 text-center font-mono text-[11.5px] leading-relaxed text-white/35">Method: {WEEKS_PER_YEAR} working weeks/yr · {HOURS_PER_MONTH}-hr months · recruitment {Math.round(RECRUIT_RATE * 100)}% of annual cost · {Math.round(EFFECTIVENESS_GAP * 100)}% effectiveness gap during rebuild.</p>

        {/* Reveal: 90-day plan */}
        <div className="mt-10 text-center">
          <button type="button" onClick={() => setShowPlan((v) => !v)} style={primary} className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold transition-transform hover:scale-[1.03]" aria-expanded={showPlan}>
            {showPlan ? 'Hide the plan' : 'Show the 90-day protection plan'} <span>{showPlan ? '↑' : '→'}</span>
          </button>
        </div>

        {showPlan && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="mt-8">
            <div className="grid gap-5 md:grid-cols-3">
              {[
                { tag: 'Days 1–30 · Recognise', body: <>Walk the floor <strong className="font-semibold text-white">with</strong> {who}, not around them. We celebrate their contribution by identifying the {processes} processes they carry. The {hours} hrs/week of re-explaining becomes our priority list.</> },
                { tag: 'Days 31–60 · Preserve', body: <>Turn {who}’s judgement into a shared organisational memory. Create short, searchable guides with {who}’s name on them. <em className="text-white/80">New starters can learn at their own pace. Nobody has to look stupid to learn.</em></> },
                { tag: 'Days 61–90 · Compound', body: <>Measure the impact: time to competent and signed-off. Watch your business get smarter every month as experience compounds instead of disappearing.</> },
              ].map((phase) => (
                <article key={phase.tag} className="glass glass-hover flex flex-col rounded-3xl p-6">
                  <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-signal">{phase.tag}</p>
                  <p className="text-[14.5px] leading-relaxed text-white/70">{phase.body}</p>
                </article>
              ))}
            </div>
            <p className="mt-6 text-center text-[15px] font-medium text-white/65">The modules aren't the product — the system that keeps them true is.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
