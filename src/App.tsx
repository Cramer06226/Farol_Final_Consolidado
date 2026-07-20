import { useState, useRef } from 'react';
import { Lightbulb, Compass, Anchor, Star } from 'lucide-react';
import { decks, Deck } from './data/questions';

const ROULETTE_DURATION = 10000;

function playTicTac(ticks: number) {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;
    for (let i = 0; i < ticks; i++) {
      const t = now + i * 1.0;
      // Alternate tic (high) and tac (low)
      const freq = i % 2 === 0 ? 1200 : 900;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.55, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.1);
    }
    setTimeout(() => ctx.close(), (ticks + 1) * 1000);
  } catch {
    // AudioContext unavailable — fail silently
  }
}

function playDing() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.9, now + 0.02);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);
    masterGain.connect(ctx.destination);

    const freqs = [880, 1318.5, 1760];
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.5, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4 - i * 0.1);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc.stop(now + 1.5);
    });

    setTimeout(() => ctx.close(), 2500);
  } catch {
    // AudioContext unavailable — fail silently
  }
}

const cardThemes: Record<string, { bg: string; accent: string; icon: React.ReactNode }> = {
  "História Geral": { bg: "from-amber-100 to-amber-200", accent: "text-amber-700", icon: <Compass className="w-5 h-5" /> },
  "Geografia": { bg: "from-blue-100 to-blue-200", accent: "text-blue-700", icon: <Anchor className="w-5 h-5" /> },
  "História da Música": { bg: "from-rose-100 to-rose-200", accent: "text-rose-700", icon: <Star className="w-5 h-5" /> },
  "História da Pintura": { bg: "from-purple-100 to-purple-200", accent: "text-purple-700", icon: <Lightbulb className="w-5 h-5" /> },
  "Instrumentos Musicais": { bg: "from-emerald-100 to-emerald-200", accent: "text-emerald-700", icon: <Star className="w-5 h-5" /> },
  "Ciência": { bg: "from-cyan-100 to-cyan-200", accent: "text-cyan-700", icon: <Lightbulb className="w-5 h-5" /> },
  "Literatura": { bg: "from-orange-100 to-orange-200", accent: "text-orange-700", icon: <Compass className="w-5 h-5" /> },
  "Astronomia": { bg: "from-indigo-100 to-indigo-200", accent: "text-indigo-700", icon: <Star className="w-5 h-5" /> },
  "Cinema": { bg: "from-red-100 to-red-200", accent: "text-red-700", icon: <Lightbulb className="w-5 h-5" /> },
  "Mitologia": { bg: "from-violet-100 to-violet-200", accent: "text-violet-700", icon: <Anchor className="w-5 h-5" /> },
};

function AnswerDisplay({ answer, isRevealed, isRouletteSpinning }: {
  answer: string | null;
  isRevealed: boolean;
  isRouletteSpinning: boolean;
}) {
  const innerClass = isRevealed
    ? 'bg-gradient-to-br from-[#fffef5] to-[#f5f0dc] border-[#d4af37] answer-glow-intense'
    : 'bg-gradient-to-br from-[#f5f0dc] to-[#e8dcc0] border-[#8b6914]';

  return (
    <div
      className={`relative aspect-square w-[55vw] max-w-[280px] sm:w-[300px] sm:max-w-[320px] md:w-[340px] md:max-w-[350px] rounded-full bg-gradient-to-br from-[#1e3a5f] via-[#162544] to-[#0d1e36] border-4 sm:border-6 flex items-center justify-center z-10 ${isRouletteSpinning ? 'roulette-spin border-[#d4af37]' : isRevealed ? 'border-[#d4af37]' : 'border-[#4464a6]'}`}
    >
      <div className={`absolute inset-3 sm:inset-4 rounded-full border-2 sm:border-3 flex items-center justify-center p-4 sm:p-6 ${innerClass}`}>
        {isRevealed && answer ? (
          <p className="answer-fade-in text-[#162544] text-center font-serif font-bold leading-snug hyphens-auto overflow-hidden line-clamp-4" style={{ fontSize: '1.5rem', textShadow: '0 0 10px rgba(212,175,55,0.5)' }}>
            {answer}
          </p>
        ) : (
          <span className="text-[#8b6914] text-sm sm:text-base font-medium">
            {isRouletteSpinning ? 'Girando...' : 'Resposta'}
          </span>
        )}
      </div>
      <div className="absolute -left-1 sm:-left-2 top-1/2 -translate-y-1/2 w-6 sm:w-8 h-3 sm:h-4 bg-gradient-to-l from-[#4464a6] to-[#1e3a5f] rounded-l-full shadow-md" />
    </div>
  );
}

export default function App() {
  const [selectedDeck, setSelectedDeck] = useState<Deck>(decks[0]);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isRouletteSpinning, setIsRouletteSpinning] = useState(false);
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set());
  const [showDeckMenu, setShowDeckMenu] = useState(false);
  const isProcessingRef = useRef(false);

  const handleQuestionClick = () => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;

    setIsSpinning(true);
    setCurrentQuestion(null);
    setCurrentAnswer(null);
    setIsAnswerRevealed(false);
    setIsRouletteSpinning(false);

    setTimeout(() => {
      const availableQuestions = selectedDeck.questions.filter(q => !usedQuestions.has(q.id));

      let selectedQuestion;
      let newUsedSet: Set<number>;

      if (availableQuestions.length === 0) {
        newUsedSet = new Set();
        const randomIndex = Math.floor(Math.random() * selectedDeck.questions.length);
        selectedQuestion = selectedDeck.questions[randomIndex];
        newUsedSet.add(selectedQuestion.id);
      } else {
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        selectedQuestion = availableQuestions[randomIndex];
        newUsedSet = new Set([...usedQuestions, selectedQuestion.id]);
      }

      setCurrentQuestion(selectedQuestion.question);
      setCurrentAnswer(selectedQuestion.answer);
      setIsSpinning(false);
      setUsedQuestions(newUsedSet);

      setIsRouletteSpinning(true);
      playTicTac(10);

      setTimeout(() => {
        setIsRouletteSpinning(false);
        setIsAnswerRevealed(true);
        playDing();
        isProcessingRef.current = false;
      }, ROULETTE_DURATION);
    }, 1000);
  };

  const handleDeckSelect = (deck: Deck) => {
    setSelectedDeck(deck);
    setUsedQuestions(new Set());
    setCurrentQuestion(null);
    setCurrentAnswer(null);
    setIsAnswerRevealed(false);
    setIsRouletteSpinning(false);
    setShowDeckMenu(false);
  };

  const theme = cardThemes[selectedDeck.name] || cardThemes["História Geral"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0d1e36] to-[#1a2a4a] relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-200 rounded-full" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-200 rounded-full" />
        <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-yellow-100 rounded-full" />
        <div className="absolute top-32 right-1/3 w-1 h-1 bg-white rounded-full" />
        <div className="absolute top-80 left-1/3 w-2 h-2 bg-blue-100 rounded-full" />
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#162544] via-[#1e3a5f] to-[#162544] border-b-4 border-[#d4af37] shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-center gap-2 sm:gap-3">
          <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-[#d4af37]" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#f5f0dc] tracking-wider">
            Farol Encantado
          </h1>
          <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-[#d4af37]" />
        </div>
      </header>

      <main className="pt-20 sm:pt-24 pb-16 px-4 max-w-4xl mx-auto min-h-screen flex flex-col">
        <div className="relative mb-4 sm:mb-6">
          <button
            onClick={() => setShowDeckMenu(!showDeckMenu)}
            className={`w-full bg-gradient-to-r ${theme.bg} rounded-xl p-3 sm:p-4 shadow-lg border-2 border-[#d4af37] flex items-center justify-between`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-[#d4af37]">{theme.icon}</span>
              <span className={`font-semibold ${theme.accent} text-base sm:text-lg`}>
                {selectedDeck.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-gray-600">
                {usedQuestions.size}/{selectedDeck.questions.length} usadas
              </span>
              <svg className={`w-4 h-4 sm:w-5 sm:h-5 ${theme.accent} ${showDeckMenu ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          {showDeckMenu && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#162544] rounded-xl border-2 border-[#d4af37] shadow-2xl z-50 overflow-hidden max-h-[60vh] overflow-y-auto">
              {decks.map((deck) => {
                const deckTheme = cardThemes[deck.name];
                return (
                  <button
                    key={deck.id}
                    onClick={() => handleDeckSelect(deck)}
                    className={`w-full p-3 sm:p-4 flex items-center gap-3 ${
                      selectedDeck.id === deck.id
                        ? 'bg-[#d4af37]/20'
                        : 'hover:bg-[#d4af37]/10'
                    }`}
                  >
                    <span className="text-[#d4af37]">{deckTheme.icon}</span>
                    <span className="text-[#f5f0dc] font-medium text-sm sm:text-base">{deck.name}</span>
                    {selectedDeck.id === deck.id && (
                      <span className="ml-auto text-[#d4af37]">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-4 sm:gap-6">
          <div className="relative w-full max-w-sm sm:max-w-lg md:max-w-xl flex-1 flex flex-col justify-center items-center min-h-0">
            <div className="absolute left-1/2 -translate-x-1/2 top-1/4 h-[40%] w-3 sm:w-4 bg-gradient-to-b from-[#d4af37] via-[#b8963c] to-[#8b6914] rounded-full shadow-lg z-0" />

            <div className="relative flex flex-col items-center justify-between gap-6 sm:gap-8 md:gap-10 w-full py-2">
              <button
                onClick={handleQuestionClick}
                disabled={isSpinning || (!isAnswerRevealed && currentAnswer !== null)}
                className="relative aspect-square w-[55vw] max-w-[280px] sm:w-[300px] sm:max-w-[320px] md:w-[340px] md:max-w-[350px] rounded-full bg-gradient-to-br from-[#d4af37] via-[#f5f0dc] to-[#b8963c] shadow-[0_0_30px_rgba(212,175,55,0.5)] border-4 sm:border-6 border-[#d4af37] flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-80 z-10"
              >
                <div className="absolute inset-3 sm:inset-4 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#0d1e36] border-2 sm:border-3 border-[#8b6914] flex items-center justify-center p-4 sm:p-6">
                  {currentQuestion ? (
                    <p className="text-[#f5f0dc] text-sm sm:text-base md:text-lg font-serif text-center leading-snug hyphens-auto overflow-hidden line-clamp-6">
                      {currentQuestion}
                    </p>
                  ) : (
                    <div className="text-center">
                      <Lightbulb className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-[#d4af37] mx-auto mb-2" />
                      <span className="text-[#d4af37] text-sm sm:text-base font-medium">
                        {isSpinning ? 'Sorteando...' : 'Toque'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="absolute -right-1 sm:-right-2 top-1/2 -translate-y-1/2 w-6 sm:w-8 h-3 sm:h-4 bg-gradient-to-r from-[#d4af37] to-[#f5f0dc] rounded-r-full shadow-md" />
              </button>

              <AnswerDisplay answer={currentAnswer} isRevealed={isAnswerRevealed} isRouletteSpinning={isRouletteSpinning} />
            </div>
          </div>

          <div className="text-center text-[#f5f0dc]/60 text-sm sm:text-base px-4">
            <p>Toque na esfera dourada para sortear uma pergunta</p>
            <p>A resposta será revelada após 10 segundos de giro</p>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#162544] via-[#0d1e36] to-[#162544] border-t-2 border-[#d4af37]/30 py-2 sm:py-3">
        <p className="text-center text-[#d4af37]/60 text-xs sm:text-sm">
          Um jogo de conhecimento para mentes curiosas
        </p>
      </footer>
    </div>
  );
}
