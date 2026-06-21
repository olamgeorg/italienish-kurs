import { useState } from 'react';
import { UserProgress, Topic, Question } from './types';
import { useAuth } from './AuthContext';
import { generateQuestion, TOPICS } from './data/questionGenerator';
import Dashboard from './components/Dashboard';
import QuizCard from './components/QuizCard';
import OfflineIndicator from './components/OfflineIndicator';
import { 
  Award, 
  Flame, 
  CheckCircle, 
  RotateCcw, 
  X, 
  Sparkles,
  BookOpen, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const { user, progress, isLoading, syncProgress, signOut } = useAuth();

  // Active quiz session states
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [sessionCorrectCount, setSessionCorrectCount] = useState(0);
  const [sessionPointsEarned, setSessionPointsEarned] = useState(0);
  const [showResults, setShowResults] = useState(false);


  // Handle start of a quiz
  const handleSelectTopic = (topic: Topic) => {
    // Generate 10 random questions out of a 1000 pool for high variation
    // Use dynamic seed offset based on total questions answered to ensure diversity
    const offsetSeed = (progress?.completedQuestions || 0) % 990;
    const questionsList: Question[] = [];
    
    for (let i = 0; i < 10; i++) {
      // Pick dynamic indexes between seed and seed + 9
      questionsList.push(generateQuestion(topic.level, topic.id, offsetSeed + i));
    }

    setQuizQuestions(questionsList);
    setCurrentQuestionIdx(0);
    setSessionCorrectCount(0);
    setSessionPointsEarned(0);
    setActiveTopic(topic);
    setShowResults(false);
  };

  // Handle answers answered
  const handleQuestionAnswered = (isCorrect: boolean, points: number) => {
    if (isCorrect) {
      setSessionCorrectCount(sessionCorrectCount + 1);
      setSessionPointsEarned(sessionPointsEarned + points);
    }

    const nextIdx = currentQuestionIdx + 1;
    if (nextIdx < quizQuestions.length) {
      setCurrentQuestionIdx(nextIdx);
    } else {
      // Completed last question - save stats
      handleCompleteQuiz(sessionCorrectCount + (isCorrect ? 1 : 0), sessionPointsEarned + points);
    }
  };

  // Save progress and update stats on completing quiz
  const handleCompleteQuiz = async (finalCorrectCount: number, finalPoints: number) => {
    if (!progress || !activeTopic) return;

    // Calculate updated metrics
    const currentLevel = activeTopic.level;
    const previousLevelProgress = progress.levelProgress?.[currentLevel] || { correct: 0, totalPlayed: 0 };
    
    const updatedLevelProgress = {
      ...progress.levelProgress,
      [currentLevel]: {
        correct: previousLevelProgress.correct + finalCorrectCount,
        totalPlayed: previousLevelProgress.totalPlayed + 10
      }
    };

    // Calculate streak
    const now = new Date();
    const lastActiveDate = progress.lastActive ? new Date(progress.lastActive) : null;
    let newStreak = progress.streak || 0;

    if (lastActiveDate) {
      const diffTime = Math.abs(now.getTime() - lastActiveDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 1) {
        // Active consecutive day or same day
        if (lastActiveDate.toDateString() !== now.toDateString()) {
          newStreak += 1; // Increment only on a new calendar day
        }
      } else {
        // Broken streak
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }

    // Update topic score records
    const topicKey = `${currentLevel}_${activeTopic.id}`;
    const previousTopicRecord = progress.topicsCompleted?.[topicKey] || { score: 0, total: 0, completedAt: '' };
    
    const updatedTopicsCompleted = {
      ...progress.topicsCompleted,
      [topicKey]: {
        score: Math.max(previousTopicRecord.score, finalPoints),
        total: 10,
        completedAt: now.toISOString()
      }
    };

    const updatedProgress: UserProgress = {
      ...progress,
      points: progress.points + finalPoints,
      completedQuestions: progress.completedQuestions + 10,
      streak: newStreak,
      lastActive: now.toISOString(),
      levelProgress: updatedLevelProgress,
      topicsCompleted: updatedTopicsCompleted
    };

    setShowResults(true);

    try {
      await syncProgress(updatedProgress);
    } catch (e) {
      console.warn("Could not sync online instantly. Saved in client database cache.", e);
    }
  };

  // Logout / Reset
  const handleLogout = async () => {
    if (window.confirm("Möchten Sie Ihren Fortschritt wirklich löschen und zurücksetzen?")) {
      await signOut();
    }
  };


  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFD93D] flex flex-col items-center justify-center text-black font-sans">
        <div className="relative">
          <div className="w-16 h-16 border-8 border-black border-t-white rounded-full animate-spin"></div>
        </div>
        <p className="mt-5 font-black uppercase tracking-wider text-sm text-black">
          Lade Italiano Integrationskurs...
        </p>
      </div>
    );
  }

  return (
    <div className="font-sans antialiased bg-[#FFD93D] text-[#2D3436] min-h-screen pb-12">
      <AnimatePresence mode="wait">
        
        {activeTopic ? (
          showResults ? (
            /* Results dashboard upon finishing a quiz */
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#FFD93D]"
            >
              <div className="w-full max-w-md bg-white border-4 border-black p-6 md:p-8 rounded-[36px] text-center shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative">
                
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#4ECDC4] text-white mb-4 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                  <CheckCircle className="w-10 h-10" />
                </div>

                <span className="text-[10px] tracking-widest uppercase font-black text-slate-500 block mb-1">
                  Quiz Abgeschlossen!
                </span>
                <h2 className="text-2xl font-black text-black">{activeTopic.title}</h2>
                <p className="text-xs text-gray-500 font-bold -mt-0.5">{activeTopic.italianTitle}</p>

                {/* Score breakdown metrics grids */}
                <div className="grid grid-cols-2 gap-4 my-6">
                  
                  {/* XP earned view card */}
                  <div className="bg-[#FFEAA7] border-2 border-black p-4 rounded-2xl flex flex-col items-center shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                    <Award className="w-6 h-6 text-black mb-1 stroke-[2.5px]" />
                    <span className="text-[10px] text-gray-650 uppercase font-black font-mono leading-none">Punkte</span>
                    <span className="text-lg font-black text-black mt-1">+{sessionPointsEarned} XP</span>
                  </div>

                  {/* Accuracy rating card */}
                  <div className="bg-[#FF6B6B] text-white border-2 border-black p-4 rounded-2xl flex flex-col items-center shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                    <Flame className="w-6 h-6 text-white mb-1" />
                    <span className="text-[10px] text-white/90 uppercase font-black font-mono leading-none">Richtig</span>
                    <span className="text-lg font-black text-white mt-1">
                      {sessionCorrectCount}/10
                    </span>
                  </div>

                </div>

                {/* Motivational German text banner */}
                <div className="bg-gray-50 p-4 rounded-2xl border-2 border-black text-xs md:text-sm text-gray-800 leading-relaxed mb-6 font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                  {sessionCorrectCount >= 8 ? (
                    <span className="text-emerald-700 block font-black">🌟 Großartige Leistung! Bellissimo!</span>
                  ) : sessionCorrectCount >= 5 ? (
                    <span className="text-[#FF6B6B] block font-black">👍 Gut gemacht! Ein Schritt näher zur Integration!</span>
                  ) : (
                    <span className="text-amber-700 block font-black">📖 Dranbleiben! Wiederholung macht den Meister.</span>
                  )}
                  <p className="mt-1 text-gray-600 text-[11px] leading-snug">Sie haben wichtige Grammatikregeln für Ihren Alltag in Deutschland gelernt.</p>
                </div>

                <div className="space-y-3.5">
                  <button
                    id="btn-retry-quiz"
                    onClick={() => handleSelectTopic(activeTopic)}
                    className="w-full bg-[#FFEAA7] hover:bg-[#FFF3B0] text-black font-black py-3.5 border-2 border-black rounded-2xl transition flex items-center justify-center gap-2 text-sm shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-y-0.5 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 text-black stroke-[2.5px]" />
                    <span>Nochmal üben (Neue Fragen)</span>
                  </button>

                  <button
                    id="btn-return-dashboard"
                    onClick={() => {
                      setActiveTopic(null);
                      setShowResults(false);
                    }}
                    className="w-full bg-[#FF6B6B] hover:bg-[#ff5252] text-white font-black tracking-widest uppercase py-4 border-4 border-black rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all duration-150 text-sm outline-none cursor-pointer"
                  >
                    Zur Themenübersicht
                  </button>
                </div>

              </div>
            </motion.div>
          ) : (
            /* Selected Topic Active Game screen */
            <div key="quiz" className="w-full">
              <QuizCard
                level={activeTopic.level}
                topic={activeTopic}
                question={quizQuestions[currentQuestionIdx]}
                currentIndex={currentQuestionIdx + 1}
                totalQuestions={quizQuestions.length}
                onAnswer={handleQuestionAnswered}
                onClose={() => setActiveTopic(null)}
              />
            </div>
          )
        ) : (
          /* Normal Dashboard Overview landing view */
          <motion.div key="dashboard-parent" exit={{ opacity: 0 }}>
            <Dashboard
              progress={progress}
              onSelectTopic={handleSelectTopic}
              onLogout={handleLogout}
            />
            {/* Helpful small study banner at absolute footer */}
            <div className="max-w-6xl mx-auto px-4 md:px-8 pb-12 -mt-10">
              <div className="bg-[#FFEAA7] border-4 border-black p-5 md:p-6 rounded-[28px] shadow-[6px_6px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row items-center justify-between gap-4 text-black">
                <div className="text-left">
                  <h4 className="text-sm font-black text-black flex items-center gap-1.5 justify-start">
                    <Sparkles className="w-4 h-4" />
                    Integrationskurs-Leitsatz
                  </h4>
                  <p className="text-xs text-slate-800 leading-relaxed max-w-2xl mt-1 font-bold">
                    „Eine neue Sprache ist ein neues Leben.“ Jede gelöste Frage bringt Sie dem selbstbewussten Sprechen im Berufsleben, Einkauf oder auf Reisen näher. Der Quizpool erweitert sich mit jedem Ihrer Versuche um weitere der 1.000+ Fragen pro Thema.
                  </p>
                </div>
                <button
                  onClick={() => {
                    // Pick a random topic instantly to trigger fun play
                    const randomTopic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
                    handleSelectTopic(randomTopic);
                  }}
                  className="bg-[#FF6B6B] hover:bg-[#ff5252] shrink-0 text-white font-black text-xs px-5 py-3 border-2 border-black rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-y-0.5 transition uppercase tracking-wider cursor-pointer"
                >
                  Zufälliges Thema starten
                </button>
              </div>
            </div>
          </motion.div>
        )}
        
      </AnimatePresence>

      {/* Persistent global Offline status HUD */}
      <OfflineIndicator />
    </div>
  );
}
