import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSupabase, isSupabaseConfigured } from './supabaseClient';
import { UserProgress } from './types';
import { LOCAL_STORAGE_KEY, getLocalUserProgress, saveUserProgress } from './firebase';

export interface AuthContextType {
  user: any | null; // Supabase user or guest user representation
  progress: UserProgress;
  isLoading: boolean;
  isConfigured: boolean;
  signInWithGoogle: () => Promise<void>;
  signInAsGuest: () => Promise<void>;
  signOut: () => Promise<void>;
  syncProgress: (newProgress: UserProgress) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [progress, setProgress] = useState<UserProgress>(getLocalUserProgress());
  const [isLoading, setIsLoading] = useState(true);
  const isConfigured = isSupabaseConfigured();
  const supabase = getSupabase();

  // Load and subscribe to Auth events on mount
  useEffect(() => {
    const initializeAuth = async () => {
      if (!isConfigured || !supabase) {
        // Fallback: Default to guest user using LocalStorage
        const localProg = getLocalUserProgress();
        setUser({
          id: 'local-guest',
          email: null,
          user_metadata: { name: 'Olamide-Gast (Offline)' },
          is_anonymous: true,
        });
        setProgress(localProg);
        setIsLoading(false);
        return;
      }

      try {
        // Get active session
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          await loadUserProgressFromSupabase(session.user);
        } else {
          // No session, check if we have a cached guest progress
          const localProg = getLocalUserProgress();
          setUser({
            id: 'local-guest',
            email: null,
            user_metadata: { name: localProg.displayName || 'Olamide-Gast' },
            is_anonymous: true,
          });
          setProgress(localProg);
        }
      } catch (error) {
        console.error('Error initializing search Auth:', error);
      } finally {
        setIsLoading(false);
      }

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          await loadUserProgressFromSupabase(session.user);
        } else {
          setUser(null);
          const localProg = getLocalUserProgress();
          setProgress(localProg);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    };

    initializeAuth();
  }, [isConfigured]);

  // Load progress from Supabase table 'lernfortschritt' and sync with localStorage
  const loadUserProgressFromSupabase = async (supabaseUser: any) => {
    if (!supabase) return;
    try {
      // 1. Fetch entries from 'lernfortschritt'
      const { data, error } = await (supabase
        .from('lernfortschritt') as any)
        .select('*')
        .eq('user_id', supabaseUser.id);

      if (error) throw error;

      const localProg = getLocalUserProgress();
      
      // Let's create an updated prog object based on our base offline state or Supabase values
      const mergedProgress: UserProgress = {
        ...localProg,
        userId: supabaseUser.id,
        email: supabaseUser.email || null,
        displayName: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || 'Olamide Schüler',
      };

      if (data && data.length > 0) {
        // Merge Supabase entries into local levels
        data.forEach((row: any) => {
          const level = row.course_level as 'A1' | 'A2';
          if (level === 'A1' || level === 'A2') {
            const playedCount = Math.round((row.progress_percent / 100) * 50); // back-calculate estimation
            mergedProgress.levelProgress[level] = {
              correct: Math.round(playedCount * 0.8), // generic estimation
              totalPlayed: playedCount,
            };
          }
        });
      }

      setProgress(mergedProgress);
      saveUserProgress(mergedProgress); // update localCache
    } catch (e) {
      console.warn('Could not load progress from Supabase. Working with localized data:', e);
    }
  };

  const signInWithGoogle = async () => {
    if (!isConfigured || !supabase) {
      alert('Supabase ist nicht konfiguriert! Bitte fügen Sie die VITE_SUPABASE_URL und VITE_SUPABASE_ANON_KEY hinzu.');
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      alert('Fehler bei Google-Anmeldung: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signInAsGuest = async () => {
    if (!isConfigured || !supabase) {
      // Local Guest directly initialized offline
      const anonymousUser = {
        id: 'local-guest',
        email: null,
        user_metadata: { name: 'Olamide-Gast' },
        is_anonymous: true,
      };
      setUser(anonymousUser);
      return;
    }
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInAnonymously();
      if (error) throw error;
      if (data.user) {
        setUser(data.user);
      }
    } catch (error: any) {
      console.error('Guest Sign-In Error:', error);
      alert('Fehler bei Gast-Anmeldung: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    if (isConfigured && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setUser(null);
    const freshProg: UserProgress = {
      userId: 'local-guest',
      email: null,
      displayName: 'Olamide-Gast',
      points: 0,
      completedQuestions: 0,
      streak: 0,
      lastActive: new Date().toISOString(),
      topicsCompleted: {},
      levelProgress: {
        A1: { correct: 0, totalPlayed: 0 },
        A2: { correct: 0, totalPlayed: 0 },
      },
    };
    setProgress(freshProg);
    saveUserProgress(freshProg);
  };

  // Sync / save progress
  const syncProgress = async (newProgress: UserProgress) => {
    setProgress(newProgress);
    saveUserProgress(newProgress); // local cache update

    if (!isConfigured || !supabase || !user || user.id === 'local-guest') {
      return; // Offline fallback success
    }

    try {
      // Calculate levels percentage
      // For each level, we calculate correct ratio
      const levels: Array<'A1' | 'A2'> = ['A1', 'A2'];
      for (const lvl of levels) {
        const lp = newProgress.levelProgress[lvl];
        const pct = lp.totalPlayed > 0 ? Math.round((lp.correct / lp.totalPlayed) * 100) : 0;

        // Upsert row in 'lernfortschritt' table
        const { error } = await (supabase
          .from('lernfortschritt') as any)
          .upsert(
            {
              user_id: user.id,
              course_level: lvl,
              progress_percent: pct,
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'user_id,course_level' }
          );

        if (error) {
          console.warn(`Supabase upsert progress error for ${lvl}:`, error);
        }
      }
    } catch (e) {
      console.warn('Sync to Supabase database failed contextually:', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        progress,
        isLoading,
        isConfigured,
        signInWithGoogle,
        signInAsGuest,
        signOut,
        syncProgress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
