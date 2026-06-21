import { useState, useEffect } from 'react';
import { UserProgress, Topic, Level } from '../types';
import { TOPICS } from '../data/questionGenerator';
import { fetchLeaderboard, LeaderboardUser } from '../firebase';
import { useAuth } from '../AuthContext';
import { 
  Activity, 
  Layers, 
  Clock, 
  CalendarDays, 
  TrendingUp, 
  Sparkles, 
  Compass, 
  Bookmark, 
  Flame, 
  Trophy, 
  Award, 
  LogOut, 
  ChevronRight,
  BookOpen,
  HelpCircle,
  CloudLightning,
  Smartphone,
  CheckCircle,
  UserCheck
} from 'lucide-react';
import { motion } from 'motion/react';

// Help helper to get right icon component matching string
const getIconComponent = (key: string) => {
  switch (key) {
    case 'Activity': return Activity;
    case 'Layers': return Layers;
    case 'Clock': return Clock;
    case 'CalendarDays': return CalendarDays;
    case 'TrendingUp': return TrendingUp;
    case 'Sparkles': return Sparkles;
    case 'Compass': return Compass;
    case 'Bookmark': return Bookmark;
    default: return BookOpen;
  }
};

interface DashboardProps {
  progress: UserProgress;
  onSelectTopic: (topic: Topic) => void;
  onLogout: () => void;
}

export default function Dashboard({ progress, onSelectTopic, onLogout }: DashboardProps) {
  const { user, isConfigured, signInWithGoogle, signInAsGuest } = useAuth();
  const [activeLevel, setActiveLevel] = useState<Level>('A1');
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // PWA install prompts state
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const handleBeforePrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };
    window.addEventListener('beforeinstallprompt', handleBeforePrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforePrompt);
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) {
      alert('Tippen Sie in Safari auf Teilen -> "Zum Home-Bildschirm hinzufügen", um die App direkt auf Ihrem iPhone zu installieren!');
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Install choice: ${outcome}`);
    setDeferredPrompt(null);
    setCanInstall(false);
  };


  useEffect(() => {
    // Fetch leaderboard
    fetchLeaderboard().then(setLeaderboard);
  }, []);

  const currentLevelTopics = TOPICS.filter(t => t.level === activeLevel);

  // Calculates completion rates
  const stats = {
    A1: {
      correct: progress.levelProgress?.A1?.correct || 0,
      played: progress.levelProgress?.A1?.totalPlayed || 0,
    },
    A2: {
      correct: progress.levelProgress?.A2?.correct || 0,
      played: progress.levelProgress?.A2?.totalPlayed || 0,
    }
  };

  return (
    <div id="dashboard" className="min-h-screen bg-[#FFD93D] text-[#2D3436] pb-20 font-sans">
      
      {/* Top Banner Header with User Info */}
      <header className="bg-white border-b-4 border-black py-5 px-4 md:px-8 sticky top-0 z-40 shadow-[0_4px_0_0_rgba(0,0,0,1)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#FF6B6B] rounded-2xl flex items-center justify-center border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:rotate-2 transition-transform text-2xl">
              🇮🇹
            </div>
            <div>
              <h1 className="text-2xl font-black text-black leading-none tracking-tight">ITALIENISCH AKTIV</h1>
              <p className="text-xs font-black text-slate-500 mt-0.5 uppercase tracking-wide">
                Ciao, <span className="text-black underline decoration-[#FF6B6B] decoration-2">{progress.displayName || 'Lerner'}</span>! 👋
              </p>
            </div>
          </div>

          {/* User Score Stats Row */}
          <div className="flex items-center flex-wrap gap-3">
            {/* Points pill */}
            <div className="bg-[#FFEAA7] border-2 border-black px-3.5 py-1.5 rounded-2xl flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Award className="w-4 h-4 text-black" />
              <div className="text-left text-xs font-black text-black">
                {progress.points} XP
              </div>
            </div>

            {/* Streak pill */}
            <div className="bg-[#FF6B6B] text-white border-2 border-black px-3.5 py-1.5 rounded-2xl flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Flame className="w-4 h-4 text-white animate-pulse" />
              <div className="text-left text-xs font-black">
                {progress.streak} Tage
              </div>
            </div>

            <button
              id="btn-logout"
              onClick={onLogout}
              className="p-2 bg-[#F0F0F0] hover:bg-rose-100 border-2 border-black text-[#2D3436] hover:text-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 transition cursor-pointer"
              title="Abmelden"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Layout Area */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 mt-8">

        {/* PWA & Supabase Panel Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Card 1: PWA Installation */}
          <div className="bg-white border-4 border-black p-5 rounded-[24px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="w-5 h-5 text-[#FF6B6B]" />
                <h3 className="text-base font-black uppercase text-black">Handy-App Installation</h3>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-bold">
                Installieren Sie den Kurs als native App auf Ihrem Smartphone! Das Quiz läuft dadurch 100% offline und belegt kaum Speicherplatz.
              </p>
            </div>
            
            <div className="mt-4">
              <button
                onClick={handleInstallApp}
                className="w-full bg-[#4ECDC4] hover:bg-[#3dbdb3] text-white font-black text-xs py-3 border-2 border-black rounded-xl shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-y-0.5 transition uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2"
              >
                <Smartphone className="w-4 h-4" />
                <span>Pronto! App installieren</span>
              </button>
            </div>
          </div>

          {/* Card 2: Supabase Learn Progress Backup */}
          <div className="bg-white border-4 border-black p-5 rounded-[24px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CloudLightning className="w-5 h-5 text-amber-500 animate-pulse" />
                <h3 className="text-base font-black uppercase text-black">Lernfortschritt sichern</h3>
              </div>
              
              {user && user.id !== 'local-guest' ? (
                <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 text-emerald-850 text-xs font-bold leading-relaxed flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold uppercase text-[10px] text-emerald-700 block mb-0.5">Erfolgreich Gesichert</span>
                    Ihr Fortschritt ist mit der Supabase-Tabelle <code className="bg-emerald-100 px-1 rounded font-mono text-emerald-900 border border-emerald-200">lernfortschritt</code> synchronisiert!
                    <span className="block text-[10px] text-slate-500 mt-1 font-mono">UID: {user.id.slice(0, 8)}...</span>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-xs text-slate-700 leading-relaxed font-bold mb-3">
                    Sichern Sie Ihre Punkte und Streaks in der Supabase Cloud-Datenbank. Melden Sie sich an, um Ihren Fortschritt nie zu verlieren.
                  </p>
                  
                  {isConfigured ? (
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        onClick={signInWithGoogle}
                        className="bg-white hover:bg-slate-50 border-2 border-black text-[#2D3436] font-black py-2.5 rounded-xl shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 transition cursor-pointer flex items-center justify-center gap-1"
                      >
                        🌐 Google Sign-In
                      </button>
                      <button
                        onClick={signInAsGuest}
                        className="bg-[#FFEAA7] hover:bg-[#ffe082] border-2 border-black text-black font-black py-2.5 rounded-xl shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 transition cursor-pointer flex items-center justify-center gap-1"
                      >
                        👥 Als Gast sichern
                      </button>
                    </div>
                  ) : (
                    <div className="bg-amber-50 border border-amber-300 rounded-xl p-2.5 text-amber-850 text-[11px] leading-snug">
                      <span className="font-extrabold text-[#FF6B6B] block uppercase text-[9px] tracking-wide">Offline-Modus aktiv</span>
                      Bitte konfigurieren Sie die <span className="font-mono bg-amber-100 px-1 py-0.5 rounded text-amber-900">VITE_SUPABASE_URL</span> & <span className="font-mono bg-amber-100 px-1 py-0.5 rounded text-amber-900">VITE_SUPABASE_ANON_KEY</span> in Ihrer Datei, um das Cloud-Backup freizuschalten.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
        
        {/* Level Selectors & Toggle Grid */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="bg-white p-1 rounded-full inline-flex self-start md:self-auto border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <button
              id="tab-level-a1"
              onClick={() => setActiveLevel('A1')}
              className={`px-5 py-2 rounded-full font-black transition text-xs md:text-sm flex items-center gap-1.5 cursor-pointer ${
                activeLevel === 'A1' 
                  ? 'bg-[#4ECDC4] text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                  : 'text-gray-500 border-2 border-transparent hover:text-black'
              }`}
            >
              <span>Niveau A1</span>
            </button>
            <button
              id="tab-level-a2"
              onClick={() => setActiveLevel('A2')}
              className={`px-5 py-2 rounded-full font-black transition text-xs md:text-sm flex items-center gap-1.5 cursor-pointer ${
                activeLevel === 'A2' 
                  ? 'bg-[#4ECDC4] text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                  : 'text-gray-500 border-2 border-transparent hover:text-black'
              }`}
            >
              <span>Niveau A2</span>
            </button>
          </div>

          {/* Quick toggle for Leaderboard */}
          <button
            id="btn-toggle-leaderboard"
            onClick={() => setShowLeaderboard(!showLeaderboard)}
            className={`px-5 py-3 rounded-2xl border-2 border-black font-black text-xs md:text-sm transition-all duration-150 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1.5px] active:translate-y-[3px] active:shadow-none flex items-center gap-2 w-full md:w-auto justify-center cursor-pointer ${
              showLeaderboard 
                ? 'bg-[#FF6B6B] text-white' 
                : 'bg-white text-black hover:bg-[#FFEAA7]'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-500 fill-amber-300" />
            <span>{showLeaderboard ? 'Themenübersicht anzeigen' : 'Bestenliste (Leaderboard) anzeigen'}</span>
          </button>
        </div>

        {/* Level Progress Stats Banner */}
        <div className="bg-white border-4 border-black rounded-[24px] p-5 mb-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-left">
            <span className="font-extrabold text-black text-base uppercase tracking-tight block md:inline">Ihr {activeLevel} Fortschritt:</span>
            <span className="text-gray-600 block md:inline md:ml-2 font-black">({stats[activeLevel].correct} von {stats[activeLevel].played} Fragen richtig gelöst)</span>
          </div>
          <div className="w-full sm:w-64 bg-gray-100 rounded-full h-4 overflow-hidden border-2 border-black">
            <div 
              className="bg-[#4ECDC4] h-full rounded-full transition-all duration-300 border-r-2 border-black"
              style={{ width: `${stats[activeLevel].played > 0 ? Math.min(100, (stats[activeLevel].correct / stats[activeLevel].played) * 100) : 0}%` }}
            />
          </div>
        </div>

        {showLeaderboard ? (
          /* Leaderboard Screen */
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border-4 border-black p-6 rounded-[32px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-xl mx-auto text-[#2D3436]"
          >
            <div className="flex items-center gap-2.5 mb-6 border-b-2 border-dashed border-gray-300 pb-3">
              <Trophy className="w-6 h-6 text-amber-500 fill-amber-300" />
              <h3 className="text-xl font-black text-black tracking-tight">Integrationskurs Bestenliste</h3>
            </div>
            <div className="space-y-3">
              {leaderboard.map((user, idx) => (
                <div 
                  key={user.userId || idx}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                    user.userId === progress.userId 
                      ? 'bg-[#FFEAA7] font-black text-black' 
                      : 'bg-white text-[#2D3436]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 text-xs rounded-lg flex items-center justify-center font-black bg-gray-100 border border-black text-center">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-bold truncate max-w-[150px] sm:max-w-xs">{user.displayName}</span>
                    {user.streak > 0 && (
                      <span className="flex items-center gap-0.5 text-[10px] uppercase px-2 py-0.5 rounded-full bg-[#FF6B6B] text-white border border-black font-black">
                        🔥 {user.streak}d
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-black font-mono bg-gray-100 px-2.5 py-1 rounded-md border border-black text-black">{user.points} XP</span>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Topics grid - Vibrant layout */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
            {currentLevelTopics.map((topic, index) => {
              const IconComp = getIconComponent(topic.iconName);
              const personalTopicState = progress.topicsCompleted?.[`${activeLevel}_${topic.id}`];
              
              return (
                <button
                  id={`topic-card-${topic.id}`}
                  key={topic.id}
                  onClick={() => onSelectTopic(topic)}
                  className="w-full text-left bg-white hover:bg-[#FFF3B0] border-4 border-black p-6 rounded-[28px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 hover:-translate-y-0.5 hover:-translate-x-0.5 flex flex-col justify-between group h-full outline-none focus:ring-4 focus:ring-black min-h-[180px] cursor-pointer"
                >
                  {/* Top line with title left, badge right */}
                  <div className="flex items-start justify-between gap-3 w-full">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-[#FFEAA7] border-2 border-black group-hover:bg-[#FF6B6B] group-hover:text-white transition-all text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <IconComp className="w-5 h-5 stroke-[2.5px]" />
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-black group-hover:text-red-500 transition-colors leading-tight">
                          {topic.title}
                        </h4>
                        <span className="text-[11px] font-black tracking-wide text-gray-500 block uppercase font-mono">
                          {topic.italianTitle}
                        </span>
                      </div>
                    </div>
                    {/* Badge */}
                    <span className="text-[10px] bg-[#4ECDC4] text-white border-2 border-black px-2.5 py-1 rounded-full font-black uppercase whitespace-nowrap self-start shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                      Aktiv
                    </span>
                  </div>

                  {/* Description in German */}
                  <p className="text-xs mt-4 text-gray-700 font-bold leading-relaxed flex-grow">
                    {topic.description}
                  </p>

                  {/* Active topic score or played trigger */}
                  <div className="mt-5 pt-4 border-t-2 border-dashed border-gray-200 w-full flex items-center justify-between text-xs text-gray-650 font-black uppercase font-mono">
                    {personalTopicState ? (
                      <div className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-lg font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span>Gelöst: {personalTopicState.score} XP</span>
                      </div>
                    ) : (
                      <span className="text-black bg-[#FFEAA7] border border-black px-2 py-0.5 rounded-lg font-bold">
                        Bereit
                      </span>
                    )}
                    <div className="flex items-center gap-1 text-black font-black uppercase tracking-wider text-[11px] group-hover:text-[#FF6B6B]">
                      <span>Starten →</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </main>

      {/* Developer Credit Footer */}
      <footer className="mt-12 mb-6 text-center text-xs font-black uppercase text-gray-750 tracking-widest bg-white border-y-2 border-dashed border-black py-3 max-w-2xl mx-auto rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,1)]">
        <span>🤖 &nbsp; :developer: Olamide &nbsp; 🤖</span>
      </footer>

    </div>
  );
}
