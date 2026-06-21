import { UserProgress } from './types';

export const LOCAL_STORAGE_KEY = 'it_quiz_progress';

const defaultProgress = (userId: string, email: string | null = null, displayName: string | null = null): UserProgress => ({
  userId,
  email,
  displayName: displayName || 'Olamide-Schüler',
  points: 0,
  completedQuestions: 0,
  streak: 0,
  lastActive: new Date().toISOString(),
  topicsCompleted: {},
  levelProgress: {
    A1: { correct: 0, totalPlayed: 0 },
    A2: { correct: 0, totalPlayed: 0 }
  }
});

// A local user session with standard key
export const getLocalUserProgress = (): UserProgress => {
  const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached) as UserProgress;
    } catch (e) {
      // ignore parsing error
    }
  }
  const newProg = defaultProgress('local-user', null, 'Olamide-Schüler');
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newProg));
  return newProg;
};

export const initAuthListener = (
  onUserSet: (progress: UserProgress | null, fUser: any | null) => void,
  setIsLoading: (loading: boolean) => void
) => {
  setIsLoading(true);
  const prog = getLocalUserProgress();
  // Delay slightly to match realistic startup loading
  const timer = setTimeout(() => {
    onUserSet(prog, { uid: 'local-user', displayName: prog.displayName, email: null });
    setIsLoading(false);
  }, 100);

  return () => clearTimeout(timer);
};

export const loginWithGoogle = async (): Promise<{ user: any; progress: UserProgress }> => {
  const prog = getLocalUserProgress();
  return { user: { uid: 'local-user', displayName: prog.displayName }, progress: prog };
};

export const loginAnonymously = async (): Promise<{ user: any; progress: UserProgress }> => {
  const prog = getLocalUserProgress();
  return { user: { uid: 'local-user', displayName: prog.displayName }, progress: prog };
};

export const logoutUser = async () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export const saveUserProgress = async (progress: UserProgress): Promise<void> => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
};

export interface LeaderboardUser {
  userId: string;
  points: number;
  displayName: string;
  streak: number;
}

export const fetchLeaderboard = async (): Promise<LeaderboardUser[]> => {
  const progress = getLocalUserProgress();
  const base = [
    { userId: '1', displayName: 'Maximilian (A1)', points: 1450, streak: 8 },
    { userId: '2', displayName: 'Clara (A2)', points: 1200, streak: 5 },
    { userId: '3', displayName: 'Julia (A1)', points: 950, streak: 3 },
    { userId: '4', displayName: 'Lukas (A1)', points: 720, streak: 12 },
    { userId: '5', displayName: 'Sarah (A2)', points: 640, streak: 4 }
  ];

  const userInLeaderboard = base.find(u => u.userId === progress.userId);
  if (!userInLeaderboard) {
    base.push({
      userId: progress.userId,
      displayName: progress.displayName || 'Olamide-Schüler (Sie)',
      points: progress.points,
      streak: progress.streak
    });
  } else {
    userInLeaderboard.points = progress.points;
    userInLeaderboard.streak = progress.streak;
  }

  // Sort descending
  base.sort((a, b) => b.points - a.points);
  return base.slice(0, 5);
};
