// Web Audio API offline-compatible feedback sound generator
class AudioService {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    // Resume if suspended (browsers block initial audio load sometimes)
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playSuccess() {
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // High pleasant chime chord (C5 - E5 - G5)
      const playTone = (freq: number, delay: number, duration: number) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + delay);

        gainNode.gain.setValueAtTime(0, now + delay);
        gainNode.gain.linearRampToValueAtTime(0.12, now + delay + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + delay + duration);

        osc.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + duration);
      };

      playTone(523.25, 0, 0.3);      // C5
      playTone(659.25, 0.08, 0.3);   // E5
      playTone(783.99, 0.16, 0.4);   // G5
    } catch (e) {
      console.warn('Audio play failed:', e);
    }
  }

  playError() {
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Low descending negative chime / warning buzz (B3 -> Ab3)
      const playTone = (freqStart: number, freqEnd: number, duration: number) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freqStart, now);
        osc.frequency.linearRampToValueAtTime(freqEnd, now + duration);

        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + duration);
      };

      playTone(220.00, 140.00, 0.35); // Descending bass tone (A3 -> F3 equivalent)
    } catch (e) {
      console.warn('Audio play failed:', e);
    }
  }
}

export const audioService = new AudioService();
