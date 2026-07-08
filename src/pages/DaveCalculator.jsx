import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { primary } from '../components/SiteChrome.jsx';

const WEEKS_PER_YEAR = 46;
const HOURS_PER_MONTH = 160;
const RECRUIT_RATE = 0.15;
const EFFECTIVENESS_GAP = 0.5;

const gbp = (n) => '£' + Math.round(n).toLocaleString('en-GB');

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

const DEFAULT_PERSON = {
  tasks: 12,
  hours: 6,
  rate: 22,
  rebuildMonths: 3
};

export default function DaveCalculator({ initialNames = [] }) {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    if (initialNames.length > 0) {
      setPeople(initialNames.map(name => ({ ...DEFAULT_PERSON, name })));
    } else {
      setPeople([{ ...DEFAULT_PERSON, name: 'Sarah' }]);
    }
  }, [initialNames]);

  const updatePerson = (index, field, value) => {
    const newPeople = [...people];
    newPeople[index] = { ...newPeople[index], [field]: value };
    setPeople(newPeople);
  };

  const results = useMemo(() => {
    return people.map(p => {
      const annualCost = p.rate * HOURS_PER_MONTH * 12;
      const repeatCost = p.hours * p.rate * WEEKS_PER_YEAR;
      const recruitCost = annualCost * RECRUIT_RATE;
      const rebuildCost = p.rebuildMonths * p.rate * HOURS_PER_MONTH * EFFECTIVENESS_GAP;
      const lossExposure = recruitCost + rebuildCost;
      const weeksWasted = Math.round(p.hours * WEEKS_PER_YEAR / 40);

      return {
        ...p,
        repeatCost,
        lossExposure,
        weeksWasted,
        recruitCost,
        rebuildCost
      };
    });
  }, [people]);

  const totalExposure = results.reduce((acc, r) => acc + r.lossExposure, 0);

  return (
    <section id="calculator" className="relative py-24 lg:py-32 overflow-hidden">
       <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[8%] top-[18%] h-[440px] w-[440px] rounded-full bg-signal/[0.08] blur-[150px]"></div>
        <div className="absolute left-[6%] bottom-[10%] h-[380px] w-[380px] rounded-full bg-magenta/[0.07] blur-[150px]"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-magenta">Organisational Diagnosis</p>
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.5rem)] font-semibold leading-tight tracking-tightest text-gradient">The Knowledge Loss Assessment</h2>
          <p className="mt-6 text-white/50 text-lg">Calculate the floor of your organisational exposure if your key people left tomorrow.</p>
        </div>

        <div className="grid gap-12">
          {results.map((person, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass rounded-[2.5rem] p-8 lg:p-12 border border-white/5 relative overflow-hidden"
            >
              <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
                {/* Inputs */}
                <div className="space-y-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 rounded-full bg-signal/20 flex items-center justify-center text-signal font-display text-xl font-bold">
                       {person.name.charAt(0)}
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white">{person.name}</h3>
                  </div>

                  <Field
                    id={`tasks-${idx}`}
                    label="Knowledge Dependency"
                    hint="How many critical tasks or decisions would stop if they weren't here?"
                    value={person.tasks}
                    onChange={(e) => updatePerson(idx, 'tasks', Number(e.target.value))}
                  />

                  <Field
                    id={`hours-${idx}`}
                    label="Weekly Interruption"
                    hint="How many hours a week do they spend repeating themselves?"
                    value={person.hours}
                    onChange={(e) => updatePerson(idx, 'hours', Number(e.target.value))}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Field
                      id={`rate-${idx}`}
                      label="Hourly Cost"
                      prefix="£"
                      value={person.rate}
                      onChange={(e) => updatePerson(idx, 'rate', Number(e.target.value))}
                    />
                    <Field
                      id={`rebuild-${idx}`}
                      label="Months to replace"
                      value={person.rebuildMonths}
                      onChange={(e) => updatePerson(idx, 'rebuildMonths', Number(e.target.value))}
                    />
                  </div>
                </div>

                {/* Narrative Results */}
                <div className="flex flex-col justify-center space-y-10">
                   <div className="space-y-2">
                     <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">Interruption Cost</p>
                     <p className="text-white/80 text-xl leading-relaxed">
                        <strong>{person.name}</strong> spends the equivalent of <span className="text-white font-bold">{person.weeksWasted} working weeks</span> every year answering questions the business should already know the answers to.
                     </p>
                     <p className="text-white/40 font-mono text-sm pt-2">
                        Measured annual waste: {gbp(person.repeatCost)}
                     </p>
                   </div>

                   <div className="space-y-2">
                     <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-magenta">Replacement Risk</p>
                     <p className="text-white/80 text-xl leading-relaxed">
                        If <strong>{person.name}</strong> left tomorrow, the business would slow down for <span className="text-white font-bold">{person.rebuildMonths} months</span> before someone else could make the same decisions confidently.
                     </p>
                     <div className="mt-4 p-6 rounded-2xl bg-magenta/5 border border-magenta/10">
                        <p className="font-mono text-xs text-white/40 uppercase mb-1">Measured Exposure Floor</p>
                        <p className="text-3xl font-display font-bold text-white">{gbp(person.lossExposure)}</p>
                        <p className="text-[11px] font-mono text-white/30 mt-2 uppercase tracking-wider">Recruitment {gbp(person.recruitCost)} + Knowledge Rebuild {gbp(person.rebuildCost)}</p>
                     </div>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Organisational Exposure Summary */}
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="mt-16 glass rounded-[2.5rem] p-10 text-center border-t-2 border-signal/30"
        >
           <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/50 mb-4">Total Combined Organisational Exposure</p>
           <h2 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-bold text-gradient leading-none">
              {gbp(totalExposure)}
           </h2>
           <p className="mt-8 text-white/50 text-lg max-w-2xl mx-auto italic">
              "This is not a budget request. This is the financial value of the judgement currently held inside your people that remains unprotected."
           </p>
        </motion.div>

        {/* Hidden Cost Section */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
           <div className="glass rounded-3xl p-8 border border-white/5">
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-signal">Measured Costs</p>
              <ul className="space-y-4">
                 {[
                    'Direct recruitment fees',
                    'Salary during non-productive onboarding',
                    'Lost productivity during the effectiveness gap',
                    'Direct cost of repeat explanations'
                 ].map(item => (
                   <li key={item} className="flex gap-3 text-white/60">
                      <span className="h-1.5 w-1.5 rounded-full bg-signal mt-2 flex-none"></span>
                      {item}
                   </li>
                 ))}
              </ul>
           </div>
           <div className="glass rounded-3xl p-8 border border-magenta/20 bg-magenta/[0.02]">
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-magenta">Hidden Costs (The Real Exposure)</p>
              <ul className="space-y-4">
                 {[
                    'Degradation of customer and supplier relationships',
                    'Loss of production quality and consistency',
                    'Compromised decision-making during the transition',
                    'Management distraction and burnout',
                    'Lost innovation opportunities while experts repeat basics',
                    'Risk that a market replacement does not exist'
                 ].map(item => (
                   <li key={item} className="flex gap-3 text-white/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-magenta mt-2 flex-none"></span>
                      {item}
                   </li>
                 ))}
              </ul>
              <p className="mt-8 pt-6 border-t border-white/10 text-white/50 italic text-sm">
                 The hidden costs of losing expert judgement are often significantly larger than the measured costs above.
              </p>
           </div>
        </div>
      </div>
    </section>
  );
}
