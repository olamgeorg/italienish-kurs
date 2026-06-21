import { useState, useEffect } from 'react';
import { Question, Level, Topic } from '../types';
import { audioService } from './AudioService';
import { 
  ArrowLeft, 
  HelpCircle, 
  CheckCircle, 
  XCircle, 
  HelpCircle as QuestionIcon, 
  Sparkles, 
  CornerDownRight, 
  RotateCcw,
  Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuizCardProps {
  level: Level;
  topic: Topic;
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean, score: number) => void;
  onClose: () => void;
}

export default function QuizCard({ 
  level, 
  topic, 
  question, 
  currentIndex, 
  totalQuestions, 
  onAnswer, 
  onClose 
}: QuizCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  // States specifically for sentence reordering questions
  const [assembledSentence, setAssembledSentence] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);

  // Reset state on question change
  useEffect(() => {
    setSelectedOption(null);
    setShowExplanation(false);
    setShowHelp(false);
    setIsAnswered(false);
    setIsCorrectAnswer(false);
    
    if (question.type === 'reorder' && question.options) {
      setAvailableWords([...question.options]);
      setAssembledSentence([]);
    }
  }, [question]);

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;
    
    setSelectedOption(option);
    setIsAnswered(true);

    const checkCorrect = typeof question.correctAnswer === 'string'
      ? option.trim().replace(/[.,!]/g, '').toLowerCase() === question.correctAnswer.trim().replace(/[.,!]/g, '').toLowerCase()
      : false;

    setIsCorrectAnswer(checkCorrect);
    setShowExplanation(true);

    if (checkCorrect) {
      audioService.playSuccess();
    } else {
      audioService.playError();
    }
  };

  const handleWordChipClick = (word: string, idx: number) => {
    if (isAnswered) return;
    setAssembledSentence([...assembledSentence, word]);
    setAvailableWords(availableWords.filter((_, i) => i !== idx));
  };

  const handleRemoveWordChip = (word: string, idx: number) => {
    if (isAnswered) return;
    setAvailableWords([...availableWords, word]);
    setAssembledSentence(assembledSentence.filter((_, i) => i !== idx));
  };

  const handleResetReorder = () => {
    if (isAnswered || !question.options) return;
    setAvailableWords([...question.options]);
    setAssembledSentence([]);
  };

  const handleCheckReorder = () => {
    if (isAnswered) return;
    setIsAnswered(true);

    const assembledStr = assembledSentence.join(' ').trim().replace(/[.,!?]/g, '').toLowerCase();
    const correctStr = (question.correctAnswer as string).trim().replace(/[.,!?]/g, '').toLowerCase();
    
    const checkCorrect = assembledStr === correctStr;
    setIsCorrectAnswer(checkCorrect);
    setShowExplanation(true);

    if (checkCorrect) {
      audioService.playSuccess();
    } else {
      audioService.playError();
    }
  };

  const handleNextClick = () => {
    onAnswer(isCorrectAnswer, isCorrectAnswer ? 15 : 0);
  };

  // Convert text speech backup options
  const triggerTextToSpeech = () => {
    if ('speechSynthesis' in window) {
      const text = question.italianSentence.replace(/_+/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'it-IT';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div id="quiz-card-container" className="min-h-screen bg-[#FFD93D] text-[#2D3436] flex flex-col items-center justify-center p-4 font-sans">
      
      {/* Quiz Screen Wrapper */}
      <div className="w-full max-w-2xl bg-white border-4 border-black rounded-[36px] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] p-6 md:p-9 flex flex-col justify-between text-[#2D3436] relative">
        
        {/* Top Header - Title left, badge right, no stacked layout */}
        <div className="flex items-center justify-between border-b-2 border-dashed border-gray-300 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              id="btn-close-quiz"
              onClick={onClose}
              className="p-2 bg-[#F0F0F0] hover:bg-rose-100 border-2 border-black rounded-xl transition text-black shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-y-0.5 cursor-pointer flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 stroke-[3px]" />
            </button>
            <div className="text-left">
              <span className="text-xs uppercase font-black tracking-wider text-slate-500 font-mono">
                {topic.title}
              </span>
              <h3 className="text-sm md:text-base font-black text-black block -mt-0.5">
                Frage {currentIndex} von {totalQuestions}
              </h3>
            </div>
          </div>
          {/* Badge */}
          <span className="text-xs bg-[#4ECDC4] text-white font-black px-3.5 py-1.5 rounded-full border-2 border-black uppercase tracking-wider shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            {level} • QUIZ
          </span>
        </div>

        {/* Level progress dots visual indicators */}
        <div className="flex gap-1.5 justify-center mb-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div 
              key={i} 
              className={`w-3.5 h-3.5 rounded-full border-2 border-black transition-all ${
                i < currentIndex ? 'bg-[#4ECDC4]' : 'bg-gray-100'
              }`} 
            />
          ))}
        </div>

        {/* Dynamic Question Prompt Area */}
        <div className="text-center mb-6">
          <h4 className="text-sm uppercase font-black tracking-widest text-[#FF6B6B] font-mono mb-2">
            ITALIENISCH LERNEN:
          </h4>
          <h3 className="text-xl md:text-2xl font-black text-black leading-tight mb-5">
            {question.prompt}
          </h3>
          
          {/* Text-To-Speech Pronunciation assist */}
          <div className="flex items-center justify-center gap-3">
            <div className="text-xl md:text-2xl font-black text-black bg-gray-50 py-3.5 px-6 rounded-2xl border-2 border-black inline-block shadow-[3px_3px_0px_rgba(0,0,0,1)]">
              {question.italianSentence || assembledSentence.join(' ')}
            </div>
            
            <button
              onClick={triggerTextToSpeech}
              title="Aussprache anhören"
              className="p-3 bg-[#FFEAA7] hover:bg-[#FFF3B0] border-2 border-black text-black rounded-2xl active:translate-y-0.5 transition flex items-center justify-center shrink-0 shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer"
            >
              <Volume2 className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>

        {/* Help & Tipps Drawer/Toggler */}
        <div className="mb-6 text-center">
          {showHelp ? (
            <div className="text-xs md:text-sm bg-[#FFEAA7] text-black border-2 border-black py-2.5 px-4 rounded-xl inline-block leading-normal shadow-[2px_2px_0px_rgba(0,0,0,1)] font-bold">
              💡 {question.helpText}
            </div>
          ) : (
            <button
              onClick={() => setShowHelp(true)}
              className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-black font-black uppercase tracking-wider bg-white hover:bg-gray-50 px-3.5 py-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 active:translate-y-1 active:shadow-none transition-all duration-150 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Hilfe & Tipp anzeigen</span>
            </button>
          )}
        </div>

        {/* Answer Options & Interactive Area */}
        <div className="flex-grow my-2">
          {question.type === 'reorder' ? (
            /* Sentence Reordering Interface */
            <div className="space-y-4">
              <div id="assembled-sentence-box" className="min-h-16 p-4 rounded-2xl bg-gray-50 border-2 border-dashed border-black flex flex-wrap gap-2.5 items-center justify-center">
                {assembledSentence.length === 0 ? (
                  <span className="text-xs text-slate-500 font-bold font-mono">Wörter unten antippen, um den Satz zu bilden...</span>
                ) : (
                  assembledSentence.map((word, i) => (
                    <button
                      key={i}
                      onClick={() => handleRemoveWordChip(word, i)}
                      className="px-3.5 py-2 bg-[#4ECDC4] hover:bg-[#FF6B6B] text-white rounded-xl text-sm font-black border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 active:translate-y-1 active:shadow-none transition cursor-pointer"
                    >
                      {word}
                    </button>
                  ))
                )}
              </div>

              {/* Remainder words drawer */}
              <div className="flex flex-wrap gap-2.5 justify-center py-2">
                {availableWords.map((word, idx) => (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleWordChipClick(word, idx)}
                    className="px-4 py-2 bg-white hover:bg-[#FFEAA7] disabled:opacity-50 disabled:hover:bg-white text-black font-black border-2 border-black rounded-xl text-sm transition shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-y-0.5 cursor-pointer"
                  >
                    {word}
                  </button>
                ))}
              </div>

              {/* Action utilities */}
              <div className="flex gap-3 justify-center pt-2">
                <button
                  disabled={isAnswered || assembledSentence.length === 0}
                  onClick={handleResetReorder}
                  className="px-3.5 py-2.5 bg-[#F0F0F0] hover:bg-rose-100 border-2 border-black text-[#2D3436] hover:text-black rounded-xl text-xs font-black transition flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Zurücksetzen</span>
                </button>
                <button
                  disabled={isAnswered || assembledSentence.length === 0}
                  onClick={handleCheckReorder}
                  className="px-6 py-2.5 bg-[#FF6B6B] hover:bg-[#ff5252] text-white rounded-xl text-xs font-black uppercase tracking-wider transition border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer disabled:opacity-50"
                >
                  Prüfen
                </button>
              </div>
            </div>
          ) : (
            /* Typical Multiple Choice and Select Options - Vertically stacked, full width for mobiles */
            <div className="space-y-3.5">
              {question.options?.map((option, idx) => {
                const isSelected = selectedOption === option;
                let btnStyle = "bg-white border-2 border-black text-[#2D3436] hover:bg-[#FFEAA7] shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 active:translate-y-1 active:shadow-none";
                
                if (isAnswered) {
                  const checkCorrect = option.trim().replace(/[.,!]/g, '').toLowerCase() === (question.correctAnswer as string).trim().replace(/[.,!]/g, '').toLowerCase();
                  if (checkCorrect) {
                    btnStyle = "bg-[#4ECDC4] text-white border-2 border-black font-black shadow-[3px_3px_0px_rgba(0,0,0,0.15)] pointer-events-none";
                  } else if (isSelected) {
                    btnStyle = "bg-[#FF6B6B] text-white border-2 border-black font-black shadow-[3px_3px_0px_rgba(0,0,0,0.15)] pointer-events-none";
                  } else {
                    btnStyle = "bg-gray-50 border border-gray-200 text-gray-400 opacity-50 pointer-events-none";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleOptionClick(option)}
                    className={`w-full py-4 px-6 rounded-2xl font-black transition-all duration-150 flex items-center justify-between text-base select-none outline-none cursor-pointer ${btnStyle}`}
                  >
                    <span className="flex-grow text-left">{option}</span>
                    {isAnswered && (
                      <span className="shrink-0 ml-3">
                        {option.trim().replace(/[.,!]/g, '').toLowerCase() === (question.correctAnswer as string).trim().replace(/[.,!]/g, '').toLowerCase() ? (
                          <div className="bg-white text-black border border-black px-2 py-0.5 rounded text-xs">RICHTIG</div>
                        ) : isSelected ? (
                          <div className="bg-white text-black border border-black px-2 py-0.5 rounded text-xs text-[#FF6B6B]">FALSCH</div>
                        ) : null}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Correct/Incorrect Explanation and Tone indicators */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`p-4 md:p-5 rounded-2xl border-2 border-black mb-6 text-sm shadow-[3px_3px_0px_rgba(0,0,0,1)] ${
                isCorrectAnswer 
                  ? 'bg-emerald-50' 
                  : 'bg-rose-50'
              }`}
            >
              <div className="flex items-center gap-2 font-black mb-1.5 text-black">
                {isCorrectAnswer ? (
                  <span className="bg-[#4ECDC4] text-white border border-black px-2 py-0.5 rounded-lg text-xs font-black flex items-center gap-1 uppercase tracking-wider">
                    ★ Ottimo! (Richtig)
                  </span>
                ) : (
                  <span className="bg-[#FF6B6B] text-white border border-black px-2 py-0.5 rounded-lg text-xs font-black flex items-center gap-1 uppercase tracking-wider">
                    ✦ Sbagliato! (Falsch)
                  </span>
                )}
              </div>

              <p className="text-xs md:text-sm text-gray-800 leading-relaxed font-bold">
                {question.explanation}
              </p>

              <div className="flex items-start gap-1.5 mt-2.5 p-2.5 bg-white border-2 border-black rounded-xl text-xs md:text-sm font-mono text-gray-800 shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
                <CornerDownRight className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5 stroke-[2.5px]" />
                <span>Musterantwort: <b className="text-emerald-700 font-extrabold font-sans text-sm">{question.correctAnswer}</b></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lower Next Question Action Area */}
        {isAnswered && (
          <button
            id="btn-next-question"
            onClick={handleNextClick}
            className="w-full bg-[#FF6B6B] hover:bg-[#ff5252] text-white font-black tracking-widest uppercase py-4 border-4 border-black rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all duration-150 outline-none cursor-pointer text-base text-center block"
          >
            {currentIndex === totalQuestions ? 'Quiz beenden 🏁' : 'Nächste Frage ➔'}
          </button>
        )}

      </div>
    </div>
  );
}
