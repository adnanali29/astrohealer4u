let audioContext: AudioContext | null = null;

export function initAudioContext(): void {
  if (typeof window === 'undefined') return;
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
}

export function generateCelestialTone(
  frequency: number,
  type: OscillatorType = 'sine',
  volumeValue: number = 0.25,
  enabled: boolean = true
): void {
  if (!enabled || typeof window === 'undefined') return;
  try {
    initAudioContext();
    if (!audioContext) return;

    const osc = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, audioContext.currentTime);

    gainNode.gain.setValueAtTime(volumeValue, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.8);

    osc.connect(gainNode);
    gainNode.connect(audioContext.destination);

    osc.start();
    osc.stop(audioContext.currentTime + 1.8);
  } catch (e) {
    console.warn('Audio Context interaction pending user swipe.');
  }
}
