import { ShieldCheck } from 'lucide-react';

export default function OfflineIndicator() {
  return (
    <div id="offline-indicator" className="fixed bottom-4 right-4 z-50 select-none">
      <div className="flex items-center gap-2 bg-[#4ECDC4] text-white border-2 border-black px-4 py-2 rounded-2xl shadow-[3px_3px_0px_rgba(0,0,0,1)] text-xs font-black uppercase tracking-wider">
        <ShieldCheck className="w-4 h-4 text-white" />
        <span>Offline-Modus aktiv (100% Lokal)</span>
      </div>
    </div>
  );
}
