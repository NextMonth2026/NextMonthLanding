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

// Reusable components from original homepage (to be compressed/adapted)
const studio = 'https://res.cloudinary.com/drl0fxrkq/image/upload/v1774170533/Screenshot_2026-03-22_at_09.08.31_vfdgiz.png';
const norman = 'https://res.cloudinary.com/drl0fxrkq/image/upload/v1772064611/1859C19A-9D92-4ED1-A0D9-A65421EA9FAE_xl3ggq.png';

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
        <motion.p {...fade(0)} className="mb-6 inline-block rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-signal/90">Vision First. Platform Second.</motion.p>
        <motion.h1 {...fade(0.08)} className="font-display text-[clamp(2.9rem,7.5vw,5.4rem)] font-bold leading-[0.98] tracking-tightest text-gradient">You say you value your people.<br className="hidden sm:block" /> Prove it.</motion.h1>
        <motion.p {...fade(0.18)} className="mx-auto mt-7 max-w-2xl text-[18px] leading-relaxed text-white/65">Every organisation depends on people who quietly know how things really work. The first question isn’t how to protect their knowledge. The first question is: Do you know who they are?</motion.p>
        <motion.div {...fade(0.28)} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button onClick={onFind} style={primary} className="group relative inline-flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-semibold transition-transform hover:scale-[1.03]">Find Them <span className="transition-transform group-hover:translate-x-0.5">→</span></button>
          <a href="/dave" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-8 py-4 text-[15px] font-medium text-white/85 transition-colors hover:border-white/35 hover:text-white">Learn our methodology</a>
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
              { label: 'Some call them experts.', body: 'They hold the undocumented history of why things are the way they are.' },
              { label: 'Some call them mentors.', body: 'They are the silent engine of onboarding and professional growth.' },
              { label: 'We call them Guides.', body: 'They are the person everyone quietly turns to when something unexpected happens.' }
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
  const [guideName, setGuideName] = useState('');

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
      if (guideName.trim()) {
        onIdentified(guideName);
      } else {
        onFailure();
      }
    }
  };

  return (
    <section id="assessment" className="relative py-24 lg:py-32 bg-ink/50">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <motion.div {...reveal} className="text-center mb-12">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">Knowledge Discovery Assessment</p>
          <h2 className="font-display text-[clamp(1.9rem,4vw,2.8rem)] font-semibold leading-tight tracking-tightest text-gradient">Identify your indispensable people through behavior.</h2>
        </motion.div>

        <motion.div {...reveal} className="glass rounded-[2rem] p-8 sm:p-12">
          <div className="mb-8 flex justify-between items-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">Discovery Step {currentStep + 1} of {questions.length}</span>
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
                  value={guideName}
                  onChange={(e) => setGuideName(e.target.value)}
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

function ReflectionSection({ guideName }) {
  const reveal = useReveal();
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <motion.div {...reveal} className="text-center">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-signal/80">You say you value your people. Now prove it.</p>
          <h2 className="font-display text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-tight tracking-tightest text-gradient mb-12">
            Organisations depend on {guideName}. <br />But have they protected what {guideName} knows?
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 text-left">
            {[
              { q: `Have you recognised ${guideName}?`, a: 'Not just for their job title, but for the silent burden of judgement they carry.' },
              { q: `Have you captured what ${guideName} has learned?`, a: 'The years of experience that don’t exist in any manual or onboarding document.' },
              { q: `Have you invested in retaining ${guideName}?`, a: 'Because when they leave, a piece of the organisation’s memory leaves with them.' },
              { q: `Have you shared that knowledge?`, a: 'So the whole team can benefit from the judgement {guideName} has earned.' }
            ].map((item, i) => (
              <div key={i} className="glass rounded-2xl p-6 border border-white/5">
                <h3 className="font-display text-lg font-medium text-white mb-2">{item.q}</h3>
                <p className="text-[14.5px] leading-relaxed text-white/50">{item.a.replace('{guideName}', guideName)}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-white/40 italic">This isn’t criticism. It’s organisational risk.</p>
        </motion.div>
      </div>
    </section>
  );
}

function DaveMethodSection() {
  const reveal = useReveal();
  const movements = [
    { title: 'Recognise', body: 'Identify the people who carry the business in their heads.' },
    { title: 'Capture', body: 'Turn silent judgement into reusable, connected assets.' },
    { title: 'Validate', body: 'Ensure the knowledge is accurate, current and trusted.' },
    { title: 'Translate', body: 'Make expertise accessible to everyone, regardless of their level.' },
    { title: 'Compound', body: 'Turn individual wisdom into a growing organisational memory.' }
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-ink/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div {...reveal} className="max-w-3xl mb-16">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">The Methodology</p>
          <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tightest text-gradient">The Dave Method helps remarkable people share years of judgement with the whole organisation.</h2>
          <p className="mt-6 text-white/60 text-lg leading-relaxed">We call these people <strong>Guides</strong>. The Dave Method is the process of turning their expertise into an Opportunity Operating System.</p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-5">
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
              <h3 className="font-display text-xl font-semibold text-white mb-3">{m.title}</h3>
              <p className="text-[14px] leading-relaxed text-white/45">{m.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="/dave" style={primary} className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-[15px] font-semibold transition-transform hover:scale-[1.03]">Explore the Dave Method</a>
        </div>
      </div>
    </section>
  );
}

function PersonalizedCalculator({ guideName }) {
  const reveal = useReveal();
  return (
    <div id="risk-assessment">
      <div className="mx-auto max-w-4xl px-6 lg:px-10 pt-24">
        <motion.div {...reveal} className="text-center">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-magenta">Knowledge Risk Assessment</p>
          <h2 className="font-display text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-tight tracking-tightest text-gradient">What is {guideName}’s knowledge worth to the business?</h2>
          <p className="mt-6 text-white/50 text-lg">Calculate the floor of your exposure if your key person leaves tomorrow.</p>
        </motion.div>
      </div>
      <DaveCalculator initialName={guideName} />
    </div>
  );
}

// Compressed Platform Sections
function PlatformEvidence() {
  const reveal = useReveal();
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div {...reveal} className="mb-14 text-center">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">The Platform</p>
          <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tightest text-gradient">How we preserve judgement.</h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div {...reveal}>
            <h3 className="font-display text-3xl font-semibold text-white mb-6">Your Intelligent Chief of Staff</h3>
            <p className="text-white/60 text-lg leading-relaxed mb-6">Norman works proactively in the background, continuously connecting the dots across your content library and identifying hidden opportunities worth acting on.</p>
            <div className="space-y-4">
              {['Norman connects people and projects', 'Knowledge graphs map hidden relationships', 'AI guides provide searchable wisdom', 'Opportunity Engine fuels commercial movement'].map(item => (
                <div key={item} className="flex items-center gap-3 text-white/80 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal"></span>
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-10">
              <a href="/platform" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-6 py-3 text-[15px] font-medium text-white/85 transition-colors hover:border-white/35 hover:text-white">See how it works</a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="glass rounded-[2rem] p-6">
            <img src={studio} alt="NextMonth Studio" className="rounded-xl border border-white/10 shadow-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function IceMakerSection() {
  const reveal = useReveal();
  return (
    <section className="relative py-24 lg:py-32 bg-magenta/[0.02]">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <motion.div {...reveal} className="glass rounded-[2rem] p-8 sm:p-12 lg:p-16 border-magenta/10">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-magenta/80">IceMaker</p>
          <h2 className="font-display text-[clamp(1.9rem,4vw,2.9rem)] font-semibold leading-tight tracking-tightest text-gradient mb-6">NextMonth captures judgement. <br />IceMaker puts it to work.</h2>
          <p className="text-white/70 text-lg leading-relaxed mb-10">Captured judgement becomes interactive training, onboarding, searchable guidance and practical learning experiences. IceMaker is the delivery engine for your organisational memory.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {['Interactive Training', 'Smart Onboarding', 'Searchable AI Guides', 'Operational Support'].map(item => (
              <div key={item} className="bg-white/[0.03] rounded-xl px-5 py-4 border border-white/5 text-white/80 font-medium">{item}</div>
            ))}
          </div>
          <div className="mt-10">
            <a href="/dave/demo" style={primary} className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-[15px] font-semibold transition-transform hover:scale-[1.03]">See a living guide</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function VisionClosing() {
  const reveal = useReveal();
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
        <motion.div {...reveal}>
          <h2 className="font-display text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-tight tracking-tightest text-gradient mb-12">Imagine a business where experience compounds instead of disappearing.</h2>
          <div className="grid gap-6 text-left sm:grid-cols-2">
            {[
              'Every new starter learns from your best people.',
              'Nobody has to feel embarrassed asking the same question twice.',
              'Managers stop repeating themselves.',
              'Your organisational memory grows every month.'
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="h-6 w-6 rounded-full bg-signal/20 flex items-center justify-center flex-none mt-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal"></span>
                </span>
                <p className="text-white/70 text-[16px]">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FinalCTA({ guideName, onReset }) {
  const reveal = useReveal();
  return (
    <section className="relative py-24 lg:py-32 pb-48">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-magenta/[0.08] blur-[150px]"></div>
      </div>
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div {...reveal}>
          <h2 className="font-display text-[clamp(2.4rem,6vw,4rem)] font-bold leading-tight tracking-tightest text-gradient">Don’t wait until {guideName} leaves to discover what only they knew.</h2>
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
          <p className="text-white/60 text-lg leading-relaxed mb-10">This is the first diagnosis. When expertise is invisible, it’s also unprotected. We can help you map your Knowledge Carriers by dependency, not job title.</p>
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
  const [guideName, setGuideName] = useState('Dave');
  const [hasIdentified, setHasIdentified] = useState(false);
  const [failedIdentification, setFailedIdentification] = useState(false);

  const scrollToAssessment = () => {
    document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' });
  };

  const resetAssessment = () => {
    setHasIdentified(false);
    setFailedIdentification(false);
    setGuideName('');
    scrollToAssessment();
  };

  return (
    <div className="relative min-h-screen bg-ink">
      <Nav />
      <main>
        <Hero onFind={scrollToAssessment} />
        <VisibilitySection />
        <DiscoveryAssessment
          onIdentified={(name) => {
            setGuideName(name);
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
            <ReflectionSection guideName={guideName} />
            <DaveMethodSection />
            <PersonalizedCalculator guideName={guideName} />
            <PlatformEvidence />
            <IceMakerSection />
            <VisionClosing />
            <FinalCTA guideName={guideName} onReset={resetAssessment} />
          </motion.div>
        )}
        <FoundingSection />
      </main>
      <Footer />
    </div>
  );
}
