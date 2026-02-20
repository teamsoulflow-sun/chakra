/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw, ChevronRight, ChevronLeft, Heart, Info, BookOpen, Award } from 'lucide-react';
import Markdown from 'react-markdown';
import { CHAKRAS, QUESTIONS } from './constants';
import { ChakraStatus, DiagnosticResult } from './types';
import { ChakraIcon } from './components/ChakraIcon';
import { generateDiagnosticReport } from './services/geminiService';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type AppState = 'welcome' | 'quiz' | 'analyzing' | 'report';

export default function App() {
  const [state, setState] = useState<AppState>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [report, setReport] = useState<string | null>(null);
  const [results, setResults] = useState<DiagnosticResult[]>([]);

  const currentQuestion = QUESTIONS[currentQuestionIndex];

  const handleAnswer = (impact: Record<string, number>) => {
    const newAnswers = { ...answers };
    Object.entries(impact).forEach(([chakraId, value]) => {
      newAnswers[chakraId] = (newAnswers[chakraId] || 0) + value;
    });
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = async (finalAnswers: Record<string, number>) => {
    setState('analyzing');

    const diagnosticResults: DiagnosticResult[] = CHAKRAS.map(chakra => {
      const score = finalAnswers[chakra.id] || 0;
      let status: ChakraStatus = 'balanced';

      if (score <= -2) status = 'blocked';
      else if (score < 0) status = 'underactive';
      else if (score > 4) status = 'overflowing';
      else if (score > 2) status = 'overactive';

      return { chakraId: chakra.id, score, status };
    });

    setResults(diagnosticResults);

    const generatedReport = await generateDiagnosticReport(diagnosticResults);
    setReport(generatedReport);
    setState('report');
  };

  const reset = () => {
    setState('welcome');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setReport(null);
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-[#1a1a1a] font-serif selection:bg-[#5A5A40] selection:text-white">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-orange-500 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500 blur-[120px]" />
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 min-h-screen flex flex-col">
        <header className="mb-8 sm:mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-[#5A5A40] mb-2"
          >
            SHAKTI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[10px] sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] font-sans font-semibold text-[#8a8a70]"
          >
            Chakra Diagnostic Journey
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 sm:mt-6 px-4"
          >
            <a
              href="https://soulgrow.my.canva.site/lp-zen-gym-2-0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] sm:text-xs font-sans font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] text-orange-600 hover:text-orange-700 underline underline-offset-4 transition-colors"
            >
              Join Zen Gym 2.0 with Sanchari Niranjan
            </a>
          </motion.div>
        </header>

        <AnimatePresence mode="wait">
          {state === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-8"
            >
              <div className="relative">
                <div className="flex flex-wrap justify-center gap-4 max-w-md">
                  {CHAKRAS.map((c, i) => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <ChakraIcon chakra={c} size="md" />
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 max-w-2xl">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight">
                  Discover the Divine Energy Within You
                </h2>
                <p className="text-base sm:text-lg text-[#4a4a3a] leading-relaxed px-2">
                  Namaste, Shakti. Your chakras are the spinning wheels of energy that govern your physical, emotional, and spiritual well-being. Take this fun 10-question journey to find out where you stand today.
                </p>
              </div>

              <button
                onClick={() => setState('quiz')}
                className="group relative px-8 sm:px-12 py-3 sm:py-4 bg-[#5A5A40] text-white rounded-full font-sans font-bold text-base sm:text-lg overflow-hidden transition-all hover:shadow-2xl hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Begin the Journey <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <div className="pt-2 sm:pt-4">
                <a
                  href="https://soulgrow.my.canva.site/lp-zen-gym-2-0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 sm:px-8 py-2 sm:py-3 rounded-full border border-orange-200 text-orange-700 font-sans font-bold text-sm sm:text-base hover:bg-orange-50 transition-all"
                >
                  <Sparkles className="w-4 h-4" /> Register for Zen Gym 2.0
                </a>
              </div>
            </motion.div>
          )}

          {state === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex-1 flex flex-col max-w-2xl mx-auto w-full"
            >
              <div className="mb-8 flex justify-between items-end">
                <div>
                  <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#8a8a70]">Question</span>
                  <p className="text-4xl font-black text-[#5A5A40]">{currentQuestionIndex + 1}<span className="text-xl text-[#8a8a70]/50"> / {QUESTIONS.length}</span></p>
                </div>
                <div className="w-32 h-1 bg-[#e5e5df] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#5A5A40]"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-medium leading-snug">
                  {currentQuestion.text}
                </h3>

                <div className="grid gap-3 sm:gap-4">
                  {currentQuestion.options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(option.impact)}
                      className="text-left p-4 sm:p-6 rounded-2xl border border-[#d5d5cf] bg-white/50 hover:bg-white hover:border-[#5A5A40] hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <span className="shrink-0 w-8 h-8 rounded-full border border-[#d5d5cf] flex items-center justify-center text-xs font-sans font-bold group-hover:bg-[#5A5A40] group-hover:text-white group-hover:border-transparent transition-colors">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-base sm:text-lg leading-tight">{option.text}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {state === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-8"
            >
              <div className="relative w-48 h-48">
                {CHAKRAS.map((c, i) => (
                  <motion.div
                    key={c.id}
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      rotate: 360,
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }
                    }}
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        backgroundColor: c.color,
                        transform: `translateY(${60 + i * 10}px)`
                      }}
                    />
                  </motion.div>
                ))}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-[#5A5A40] animate-pulse" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-medium">Reading Your Aura...</h2>
                <p className="text-[#8a8a70] italic">The universe is whispering your secrets to us.</p>
              </div>
            </motion.div>
          )}

          {state === 'report' && (
            <motion.div
              key="report"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 space-y-6 sm:space-y-12 pb-20"
            >
              <section className="bg-white rounded-[32px] sm:rounded-[40px] p-5 sm:p-8 md:p-12 shadow-xl border border-[#e5e5df]">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
                  <div className="w-full lg:w-1/3 flex flex-col items-center gap-6 lg:sticky lg:top-8 order-2 lg:order-1">
                    <div className="relative py-6 lg:py-12 flex flex-col items-center w-full bg-[#fcfcf8] lg:bg-transparent rounded-3xl lg:rounded-none p-6 lg:p-0 border border-[#e5e5df] lg:border-none">
                      {/* Vertical Line - Hidden on Mobile */}
                      <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#d5d5cf] to-transparent hidden lg:block" />

                      <div className="flex flex-col items-center gap-6 sm:gap-8 relative z-10 w-full">
                        {results.slice().reverse().map((res, i) => {
                          const chakra = CHAKRAS.find(c => c.id === res.chakraId)!;
                          return (
                            <motion.div
                              key={res.chakraId}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-center gap-4 sm:gap-6 w-full group"
                            >
                              <div className="relative shrink-0">
                                <ChakraIcon chakra={chakra} status={res.status} size="sm" />
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-sans font-bold mb-1.5">
                                  <span className="text-[#5A5A40]">{chakra.name}</span>
                                  <span className={cn(
                                    "px-2 py-0.5 rounded text-[9px]",
                                    res.status === 'balanced' ? 'bg-emerald-100 text-emerald-700' :
                                      res.status === 'overflowing' || res.status === 'overactive' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                                  )}>{res.status}</span>
                                </div>
                                <div className="h-2 bg-[#f0f0e8] rounded-full overflow-hidden shadow-inner border border-[#e5e5df]/50">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(100, Math.max(5, (res.score + 5) * 10))}%` }}
                                    className="h-full shadow-[0_0_8px_rgba(0,0,0,0.1)]"
                                    style={{ backgroundColor: chakra.color }}
                                  />
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 w-full max-w-sm">
                      <button
                        onClick={reset}
                        className="group flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-[#d5d5cf] text-[10px] font-sans font-bold uppercase tracking-widest text-[#8a8a70] hover:text-[#5A5A40] hover:border-[#5A5A40] transition-all bg-white"
                      >
                        <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" /> Retake Diagnostic
                      </button>

                      <a
                        href="https://soulgrow.my.canva.site/lp-zen-gym-2-0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-orange-500 text-white text-[10px] font-sans font-bold uppercase tracking-widest hover:shadow-xl hover:bg-orange-600 transition-all text-center"
                      >
                        Enroll in Zen Gym 2.0
                      </a>
                    </div>

                    <div className="mt-4 p-4 rounded-2xl bg-stone-50 border border-stone-200 w-full max-w-sm text-center">
                      <p className="text-[10px] text-stone-500 uppercase tracking-widest mb-2">Guided by</p>
                      <p className="font-serif text-lg font-medium text-[#5A5A40]">Sanchari Niranjan</p>
                      <p className="text-[11px] text-[#8a8a70] mt-1 italic">Chakra & Prana Master Guide</p>
                    </div>
                  </div>

                  <div className="w-full lg:w-2/3 prose prose-stone prose-base sm:prose-lg max-w-none order-1 lg:order-2">
                    <div className="markdown-body p-2 sm:p-0">
                      <Markdown>{report || ''}</Markdown>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-[#5A5A40] to-[#3D3D2B] text-white p-6 sm:p-12 rounded-[32px] sm:rounded-[40px] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400/10 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-[80px]" />

                <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                  <div className="inline-block px-4 py-1 rounded-full border border-orange-300/30 bg-orange-300/10 text-orange-200 text-[10px] font-sans font-bold uppercase tracking-widest">
                    The Path to Mastery
                  </div>

                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-medium leading-tight max-w-2xl px-2">
                    Take Your Healing Journey Deeper with Zen Gym 2.0
                  </h2>

                  <p className="text-base sm:text-lg md:text-xl text-stone-200 font-serif leading-relaxed max-w-3xl px-4 italic">
                    "True healing happens when you align your energy with your purpose."
                  </p>

                  <p className="text-sm sm:text-base md:text-lg text-stone-300 font-sans leading-relaxed max-w-2xl px-4">
                    Join **Sanchari Niranjan** in a sacred container designed for the modern Shakti. Balance your Prana, master your mindset, and unlock your true potential through ancient wisdom and practical tools.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto px-6">
                    <a
                      href="https://soulgrow.my.canva.site/lp-zen-gym-2-0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group px-10 py-4 bg-orange-400 text-[#1a1a1a] rounded-full font-sans font-black text-lg hover:shadow-2xl transition-all text-center"
                    >
                      Enroll in Zen Gym 2.0
                    </a>
                    <a
                      href="https://soulgrow.my.canva.site/lp-zen-gym-2-0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-10 py-4 border border-white/30 rounded-full font-sans font-bold text-lg hover:bg-white/10 transition-all text-center"
                    >
                      Learn More
                    </a>
                  </div>

                  <p className="text-xs text-stone-400 uppercase tracking-widest font-sans">
                    Limited intake for the Divine Feminine cohort
                  </p>
                </div>
              </section>

              <section className="grid md:grid-cols-3 gap-6">
                <div className="bg-[#5A5A40] text-white p-8 rounded-[32px] space-y-4">
                  <Heart className="w-8 h-8 text-orange-300" />
                  <h4 className="text-xl font-bold">Self-Care Ritual</h4>
                  <p className="text-sm opacity-80 leading-relaxed">
                    Remember, Shakti, that balance is a journey, not a destination. Be kind to yourself as you navigate these energies.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-[32px] border border-[#e5e5df] space-y-4">
                  <Info className="w-8 h-8 text-[#5A5A40]" />
                  <h4 className="text-xl font-bold">Daily Mantra</h4>
                  <p className="text-sm text-[#8a8a70] leading-relaxed italic">
                    "I am grounded. I am creative. I am powerful. I am loved. I speak my truth. I see clearly. I am one with the divine."
                  </p>
                </div>
                <div className="bg-orange-50 p-8 rounded-[32px] border border-orange-100 space-y-4">
                  <Award className="w-8 h-8 text-orange-500" />
                  <h4 className="text-xl font-bold">Next Steps</h4>
                  <p className="text-sm text-orange-800 leading-relaxed">
                    Focus on your most 'blocked' chakra for the next 7 days. Small changes lead to massive shifts in your Prana.
                  </p>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="relative z-10 py-12 text-center border-t border-[#e5e5df]">
        <p className="text-xs font-sans font-bold uppercase tracking-[0.4em] text-[#8a8a70]">
          Made with Love for the Divine Feminine
        </p>
      </footer>
    </div>
  );
}
