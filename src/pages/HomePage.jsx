import { useState, useEffect, useMemo } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Nav, Footer, primary } from '../components/SiteChrome.jsx';
import DaveCalculator from './DaveCalculator.jsx';
import NodeNetwork from '../NodeNetwork.jsx';
import { FoundingSection } from './PlatformPage.jsx';

const ease = [0.22, 1, 0.36, 1];

function useReveal() {
  const reduce = useReducedMotion();
  return { initial: reduce ? { opacity: 1 } : { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-80px' }, transition: { duration: 0.7, ease } };
}

const studio = 'https://res.cloudinary.com/drl0fxrkq/image/upload/v1774170533/Screenshot_2026-03-22_at_09.08.31_vfdgiz.png';

function Hero({ onFind }) {
  const reduce = useReducedMotion();
  const fade = (delay) => ({ initial: reduce ? { opacity: 1 } : { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease, delay } });

  return (
    <section className="relative isolate overflow-hidden pb-16 pt-36 lg:pb-20 lg:pt-44">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[12%] top-[-6%] h-[560px] w-[560px] rounded-full bg-signal/[0.08] blur-[150px]"></div>
        <div className="absolute right-[6%] top-[24%] h-[460px] w-[460px] rounded-full bg-magenta/[0.06] blur-[150px]"></div>
        <div className="grid-texture absolute inset-0"></div>
      </div>
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[820px] opacity-20">
        <NodeNetwork />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/30 to-ink"></div>
      </div>
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div {...fade(0)} className="space-y-6">
          <p className="font-display text-[clamp(1.5rem,4vw,2.2rem)] font-medium text-white/90">Imagine your business had a hard drive.</p>
          <div className="space-y-2 text-white/50 font-display text-lg sm:text-xl">
             <p>On it was twenty years of experience.</p>
             <p>Twenty years of customer relationships.</p>
             <p>Twenty years of solving problems.</p>
             <p>Twenty years of knowing what works.</p>
             <p>Twenty years of avoiding expensive mistakes.</p>
             <p>Twenty years of judgement.</p>
          </div>
        </motion.div>

        <motion.div {...fade(0.4)} className="mt-12 space-y-8">
          <h1 className="font-display text-[clamp(2.5rem,6.5vw,4.8rem)] font-bold leading-[1.02] tracking-tightest text-gradient">
            Now imagine that hard drive stood up one Friday afternoon… <br/>and left forever.
          </h1>
          <p className="mx-auto max-w-2xl text-[20px] leading-relaxed text-white/70">
            NextMonth helps businesses preserve and grow the judgement of their best people.
          </p>
        </motion.div>

        <motion.div {...fade(0.8)} className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button onClick={onFind} style={primary} className="group relative inline-flex items-center gap-2 rounded-full px-8 py-4 text-[16px] font-semibold transition-transform hover:scale-[1.03]">Start the Knowledge Loss Assessment <span className="transition-transform group-hover:translate-x-0.5">→</span></button>
        </motion.div>
      </div>
    </section>
  );
}

function VisibilitySection() {
  const reveal = useReveal();
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <motion.div {...reveal} className="glass overflow-hidden rounded-[2rem] p-8 sm:p-12 lg:p-16">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-signal/80">The Visibility Problem</p>
          <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tightest text-gradient">Organisation charts tell you who reports to whom. They don’t tell you who everyone depends on.</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              { label: 'The people everyone quietly turns to.', body: 'They hold the history of every “why” that never made it into a manual.' },
              { label: 'The people who spot problems before everyone else.', body: 'They are the reason new starters don’t quit in their first month.' },
              { label: 'The people who know how things really work.', body: 'They are the person you call when the system fails and nobody knows why.' }
            ].map((item, i) => (
              <div key={i} className="space-y-4">
                <h3 className="font-display text-xl font-medium text-white">{item.label}</h3>
                <p className="text-[15px] leading-relaxed text-white/50">{item.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DiscoveryAssessment({ onIdentified, onFailure }) {
  const reveal = useReveal();
  const [currentStep, setCurrentStep] = useState(0);
  const [guideNames, setGuideNames] = useState(['', '', '', '']);

  const questions = [
    { id: 'interrupted', label: 'Who gets interrupted most?', hint: 'The person whose desk is always a destination.' },
    { id: 'repeating', label: 'Who explains the same thing repeatedly?', hint: 'The one who has become a human manual.' },
    { id: 'exceptions', label: 'Who understands the exceptions?', hint: 'When the system fails, they know the workaround.' },
    { id: 'holiday', label: 'Whose holiday causes disruption?', hint: 'The person whose absence makes everyone nervous.' }
  ];

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(v => v + 1);
    } else {
      const filteredNames = guideNames.filter(n => n.trim() !== '');
      if (filteredNames.length > 0) {
        onIdentified(filteredNames);
      } else {
        onFailure();
      }
    }
  };

  const updateName = (val) => {
    const newNames = [...guideNames];
    newNames[currentStep] = val;
    setGuideNames(newNames);
  };

  return (
    <section id="assessment" className="relative py-24 lg:py-32 bg-ink/50">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <motion.div {...reveal} className="text-center mb-12">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">Knowledge Loss Assessment</p>
          <h2 className="font-display text-[clamp(1.9rem,4vw,2.8rem)] font-semibold leading-tight tracking-tightest text-gradient">Identify your indispensable people through behavior.</h2>
        </motion.div>

        <motion.div {...reveal} className="glass rounded-[2rem] p-8 sm:p-12">
          <div className="mb-8 flex justify-between items-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">Assessment Step {currentStep + 1} of {questions.length}</span>
            <div className="flex gap-1.5">
              {questions.map((_, i) => (
                <div key={i} className={`h-1 w-8 rounded-full transition-colors ${i <= currentStep ? 'bg-signal' : 'bg-white/10'}`}></div>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease }}
              className="space-y-6"
            >
              <div>
                <label className="block font-display text-2xl font-medium text-white mb-2">{questions[currentStep].label}</label>
                <p className="text-white/40 text-sm mb-6">{questions[currentStep].hint}</p>
                <input
                  type="text"
                  placeholder="Enter a name..."
                  value={guideNames[currentStep]}
                  onChange={(e) => updateName(e.target.value)}
                  className="w-full rounded-2xl border border-white/[0.09] bg-white/[0.03] px-6 py-4 text-xl text-white outline-none transition-colors focus:border-signal/50"
                  onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex justify-end">
            <button
              onClick={handleNext}
              style={primary}
              className="group inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-[15px] font-semibold transition-transform hover:scale-[1.03]"
            >
              {currentStep < questions.length - 1 ? 'Next Step' : 'Reveal Result'} <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function LivingBusinessBrainSection() {
  const reveal = useReveal();
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <motion.div {...reveal}>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-signal">The Central Proposition</p>
            <h2 className="font-display text-[clamp(2.2rem,5vw,3.5rem)] font-semibold leading-tight tracking-tightest text-gradient">Your business already has intelligence. It’s simply fragmented.</h2>
            <p className="mt-8 text-white/70 text-lg leading-relaxed">
              NextMonth helps you build a <strong>living business brain</strong> from the judgement, experience and expertise already inside your organisation. Then, IceMaker turns that judgement into interactive training, onboarding, and operational support.
            </p>
            <div className="mt-10 space-y-4">
              {[
                'Connects fragmented knowledge',
                'Answers critical questions',
                'Creates training and documentation',
                'Supports faster, better decisions',
                'Grows every time an expert contributes'
              ].map(item => (
                <div key={item} className="flex items-center gap-3 text-white/80 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal"></span>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...reveal} className="glass rounded-[2rem] p-6 relative">
             <div className="absolute inset-0 bg-signal/10 blur-[100px] -z-10"></div>
             <img src={studio} alt="Living Business Brain" className="rounded-xl border border-white/10 shadow-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HumanBenefitSection() {
  const reveal = useReveal();
  return (
    <section className="relative py-24 lg:py-32 bg-ink/30">
      <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
        <motion.div {...reveal}>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-magenta">Human Benefit</p>
          <h2 className="font-display text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-tight tracking-tightest text-gradient">Free your experts.</h2>
          <p className="mt-6 text-white/60 text-lg leading-relaxed">
            Today, your best people repeatedly answer the same questions. Tomorrow, those questions answer themselves.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 text-left">
             {[
               { title: 'Stop the Interruption', body: 'Experts reclaim hours every week by letting the business brain handle the repeated basics.' },
               { title: 'Time to Innovate', body: 'Free your people to solve tomorrow’s problems instead of yesterday’s.' },
               { title: 'Confident Mentoring', body: 'New starters learn from your best people, even when they aren’t in the room.' },
               { title: 'Scale Judgement', body: 'Make the wisdom of your most experienced people available to everyone, instantly.' }
             ].map((item, i) => (
               <div key={i} className="space-y-3">
                 <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
                 <p className="text-white/50 leading-relaxed">{item.body}</p>
               </div>
             ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DaveMethodSection() {
  const reveal = useReveal();
  const movements = [
    { title: 'Recognise', body: 'Identify the remarkable people who carry the business in their heads.' },
    { title: 'Celebrate', body: 'Recognise their contribution by turning silent judgement into lasting organisational memory.' },
    { title: 'Capture', body: 'Brain Maker: Secure the experience and expertise through a guided, serious production process.' },
    { title: 'Validate', body: 'Ensure the shared memory is accurate, current and trusted.' },
    { title: 'Translate', body: 'IceMaker: Turn the captured judgement into interactive training, onboarding, guides and operational support.' },
    { title: 'Grow', body: 'Turn individual wisdom into a growing organisational brain.' }
  ];

  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div {...reveal} className="max-w-3xl mb-16 text-center mx-auto">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">The Methodology</p>
          <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tightest text-gradient">The Dave Method</h2>
          <p className="mt-6 text-white/60 text-lg leading-relaxed">A systematic approach to transforming fragmented experience into a living business brain.</p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {movements.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass p-6 rounded-2xl border border-white/5"
            >
              <span className="font-mono text-signal text-xs uppercase tracking-widest block mb-4">0{i + 1}</span>
              <h3 className="font-display text-lg font-semibold text-white mb-3">{m.title}</h3>
              <p className="text-[13px] leading-relaxed text-white/45">{m.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AIGoldRushSection() {
  const reveal = useReveal();
  return (
    <section className="relative py-24 lg:py-32 bg-ink">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <motion.div {...reveal} className="space-y-12">
          <div className="max-w-3xl">
             <h2 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] font-semibold leading-[1.1] tracking-tightest text-gradient mb-8">
               Before you buy more artificial intelligence, capture your actual intelligence.
             </h2>
             <div className="space-y-6 text-white/70 text-lg sm:text-xl leading-relaxed">
               <p>Every week there's another AI model. Another subscription. Another promise of smarter software.</p>
               <p>
                 But none of those systems know your customers. Your suppliers. Your culture. Your workarounds. Your judgement. Or the twenty years your best people have spent learning how your business really works.
               </p>
               <p>That knowledge already exists. It's simply trapped inside people.</p>
               <p>
                 NextMonth helps organisations transform that fragmented experience into a living business brain that can support every department, every new starter and every future decision.
               </p>
               <p className="text-white/40 italic">
                 AI becomes dramatically more valuable when it's built on your organisation's own judgement rather than generic knowledge.
               </p>
             </div>
          </div>

          <div className="border-l-2 border-magenta/40 pl-8 py-2">
             <p className="font-display text-2xl sm:text-3xl font-medium text-white/90 leading-tight">
               The smartest model in the world cannot know what only your people have learned.
             </p>
             <p className="mt-4 font-display text-2xl sm:text-3xl font-medium text-magenta leading-tight">
               That's your competitive advantage.
             </p>
          </div>

          <div className="pt-4">
            <button
              onClick={() => document.getElementById('brain-maker')?.scrollIntoView({ behavior: 'smooth' })}
              style={primary}
              className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[16px] font-semibold transition-transform hover:scale-[1.03]"
            >
              Start building your business brain <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BrainMakerSection() {
  const reveal = useReveal();
  return (
    <section id="brain-maker" className="relative py-24 lg:py-32 bg-ink/50 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-signal/[0.08] blur-[120px]"></div>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <motion.div {...reveal}>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-magenta">The Capture Experience</p>
            <h2 className="font-display text-[clamp(2.2rem,5vw,3.5rem)] font-semibold leading-tight tracking-tightest text-gradient">Enter Brain Maker</h2>
            <p className="mt-8 text-white/80 text-lg leading-relaxed">
              Brain Maker is the guided NextMonth experience for turning hard-earned human experience into a living business brain.
            </p>
            <p className="mt-6 text-white/60 text-lg leading-relaxed">
              It does not ask people to fill in a quick form.
            </p>
            <p className="mt-6 text-white/60 text-lg leading-relaxed">
              It interviews them over time, follows the threads that matter, separates proven judgement from outdated habits, and helps structure what they know into something the whole organisation can use.
            </p>
            <p className="mt-8 text-white/40 text-sm italic">
              Powered by CharacterX, Rob Hutt’s 2026 transformation methodology, and the NextMonth Knowledge Capture Protocol.
            </p>
            <div className="mt-10">
              <button style={primary} className="group relative inline-flex items-center gap-2 rounded-full px-8 py-4 text-[16px] font-semibold transition-transform hover:scale-[1.03]">
                Start the Brain Maker process <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </button>
            </div>
          </motion.div>
          <motion.div {...reveal} className="glass rounded-[2rem] p-10 border border-white/10 relative">
             <div className="absolute inset-0 bg-magenta/5 blur-[80px] -z-10"></div>
             <div className="space-y-8">
                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                   <div className="h-3 w-3 rounded-full bg-magenta animate-pulse"></div>
                   <p className="font-mono text-xs uppercase tracking-widest text-white/40">Guided Capture in Progress</p>
                </div>
                <div className="space-y-4">
                   <div className="h-4 w-3/4 rounded bg-white/5"></div>
                   <div className="h-4 w-1/2 rounded bg-white/5"></div>
                   <div className="h-4 w-2/3 rounded bg-white/5"></div>
                </div>
                <div className="pt-4">
                   <p className="font-display text-xl text-white/80 italic font-medium">"It separates proven judgement from outdated habits..."</p>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PersonalizedCalculator({ guideNames }) {
  const reveal = useReveal();
  return (
    <div id="risk-assessment">
      <DaveCalculator initialNames={guideNames} />
    </div>
  );
}

function FinalCTA({ onReset }) {
  const reveal = useReveal();
  return (
    <section className="relative py-24 lg:py-32 pb-48">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-magenta/[0.08] blur-[150px]"></div>
      </div>
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div {...reveal}>
          <h2 className="font-display text-[clamp(2.4rem,6vw,4rem)] font-bold leading-tight tracking-tightest text-gradient">Your business cannot afford to let its intelligence disappear.</h2>
          <p className="mt-8 text-white/60 text-xl max-w-2xl mx-auto">
             Recognise your people. Preserve their judgement. Build your business brain.
          </p>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row justify-center">
            <button onClick={onReset} style={primary} className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[15px] font-semibold transition-transform hover:scale-[1.03]">Find Your People <span className="transition-transform group-hover:translate-x-0.5">→</span></button>
            <a href="#founding" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-8 py-4 text-[15px] font-medium text-white/85 transition-colors hover:border-white/35 hover:text-white">Book a Discovery Workshop</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DiagnosticFailure({ onReset }) {
  const reveal = useReveal();
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div {...reveal} className="glass rounded-[2rem] p-8 sm:p-12 border-magenta/20">
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-tight tracking-tightest text-gradient mb-6">Your organisation may not know where its operational judgement actually lives.</h2>
          <p className="text-white/60 text-lg leading-relaxed mb-10">This is the first diagnosis. When expertise is invisible, it’s also unprotected. We can help you map your indispensable people by dependency, not job title.</p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <a href="#founding" style={primary} className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[15px] font-semibold transition-transform hover:scale-[1.03]">Book a Knowledge Discovery Workshop <span className="transition-transform group-hover:translate-x-0.5">→</span></a>
            <button onClick={onReset} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-8 py-4 text-[15px] font-medium text-white/85 transition-colors hover:border-white/35 hover:text-white">Try assessment again</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [guideNames, setGuideNames] = useState([]);
  const [hasIdentified, setHasIdentified] = useState(false);
  const [failedIdentification, setFailedIdentification] = useState(false);

  const scrollToAssessment = () => {
    document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' });
  };

  const resetAssessment = () => {
    setHasIdentified(false);
    setFailedIdentification(false);
    setGuideNames([]);
    scrollToAssessment();
  };

  return (
    <div className="relative min-h-screen bg-ink">
      <Nav />
      <main>
        <Hero onFind={scrollToAssessment} />
        <VisibilitySection />
        <DiscoveryAssessment
          onIdentified={(names) => {
            setGuideNames(names);
            setHasIdentified(true);
            setFailedIdentification(false);
            setTimeout(() => document.getElementById('risk-assessment')?.scrollIntoView({ behavior: 'smooth' }), 100);
          }}
          onFailure={() => {
            setFailedIdentification(true);
            setHasIdentified(false);
          }}
        />

        {failedIdentification && <DiagnosticFailure onReset={resetAssessment} />}

        {hasIdentified && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <DaveMethodSection />
            <PersonalizedCalculator guideNames={guideNames} />
            <LivingBusinessBrainSection />
            <AIGoldRushSection />
            <BrainMakerSection />
            <HumanBenefitSection />
            <FinalCTA onReset={resetAssessment} />
          </motion.div>
        )}
        <FoundingSection />
      </main>
      <Footer />
    </div>
  );
}
