import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eras } from '../data/timelineData';
import './AudioManager.css';

// Era-specific audio configurations for generated ambient sounds
const eraAudioConfig = {
  victorian: {
    label: 'Piano Clásico',
    baseFreq: 220,
    type: 'sine',
    chords: [1, 1.25, 1.5], // Minor chord
    tempo: 0.5
  },
  artNouveau: {
    label: 'Vals Elegante',
    baseFreq: 261.63,
    type: 'sine',
    chords: [1, 1.25, 1.5, 2],
    tempo: 0.75
  },
  artDeco: {
    label: 'Jazz Swing',
    baseFreq: 196,
    type: 'triangle',
    chords: [1, 1.26, 1.5, 1.88], // Dominant 7th
    tempo: 1.2
  },
  midCentury: {
    label: 'Retro Lounge',
    baseFreq: 293.66,
    type: 'sine',
    chords: [1, 1.2, 1.5],
    tempo: 0.8
  },
  eighties: {
    label: 'Synthwave',
    baseFreq: 110,
    type: 'sawtooth',
    chords: [1, 1.335, 1.5, 2],
    tempo: 1.5
  },
  digital: {
    label: 'Electronic',
    baseFreq: 174.61,
    type: 'square',
    chords: [1, 1.5, 2],
    tempo: 1.0
  },
  social: {
    label: 'Modern Ambient',
    baseFreq: 329.63,
    type: 'sine',
    chords: [1, 1.2, 1.5, 1.8],
    tempo: 0.6
  },
  immersive: {
    label: 'Cinematic',
    baseFreq: 146.83,
    type: 'sine',
    chords: [1, 1.189, 1.498, 1.782], // Sus4
    tempo: 0.4
  },
  future: {
    label: 'Futuristic',
    baseFreq: 87.31,
    type: 'sawtooth',
    chords: [1, 1.5, 2, 3],
    tempo: 0.7
  }
};

export default function AudioManager() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentEra, setCurrentEra] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const audioContextRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const gainNodeRef = useRef(null);
  const lfoRef = useRef(null);
  const isPlayingRef = useRef(false);

  // Detect current era based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const timeline = document.getElementById('timeline');
      if (!timeline) return;

      const timelineRect = timeline.getBoundingClientRect();
      const isInTimeline = timelineRect.top < window.innerHeight * 0.5 && timelineRect.bottom > window.innerHeight * 0.5;

      setIsVisible(isInTimeline);

      if (!isInTimeline) return;

      const eraHeaders = document.querySelectorAll('.era-section-header');
      let closestEra = null;
      let closestDistance = Infinity;

      eraHeaders.forEach((header) => {
        const rect = header.getBoundingClientRect();
        const distance = Math.abs(rect.top - window.innerHeight / 3);

        if (distance < closestDistance && rect.top < window.innerHeight) {
          closestDistance = distance;
          const eraClass = Array.from(header.classList).find(c => c.startsWith('era-'));
          if (eraClass) {
            closestEra = eraClass.replace('era-', '');
          }
        }
      });

      if (closestEra && closestEra !== currentEra) {
        setCurrentEra(closestEra);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentEra]);

  // Create ambient sound for an era
  const createAmbientSound = useCallback((eraKey) => {
    if (!eraKey || !eraAudioConfig[eraKey]) return;

    const config = eraAudioConfig[eraKey];

    // Create or resume audio context
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    const ctx = audioContextRef.current;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Stop existing oscillators
    oscillatorsRef.current.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {}
    });
    oscillatorsRef.current = [];

    // Create master gain
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
    }
    gainNodeRef.current = ctx.createGain();
    gainNodeRef.current.gain.setValueAtTime(0, ctx.currentTime);
    gainNodeRef.current.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 1);

    // Create filter for warmth
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);

    // Create reverb-like delay
    const delay = ctx.createDelay();
    delay.delayTime.setValueAtTime(0.3, ctx.currentTime);
    const delayGain = ctx.createGain();
    delayGain.gain.setValueAtTime(0.3, ctx.currentTime);

    // Connect chain
    gainNodeRef.current.connect(filter);
    filter.connect(ctx.destination);
    filter.connect(delay);
    delay.connect(delayGain);
    delayGain.connect(ctx.destination);

    // Create oscillators for chord
    config.chords.forEach((ratio, i) => {
      const osc = ctx.createOscillator();
      osc.type = config.type;
      osc.frequency.setValueAtTime(config.baseFreq * ratio, ctx.currentTime);

      // Add slight detuning for richness
      osc.detune.setValueAtTime((i - 1) * 5, ctx.currentTime);

      // Individual gain for each oscillator
      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0.3 / config.chords.length, ctx.currentTime);

      // Add slow LFO for movement
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.1 + (i * 0.05), ctx.currentTime);

      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(3, ctx.currentTime);

      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      osc.connect(oscGain);
      oscGain.connect(gainNodeRef.current);

      osc.start();
      lfo.start();

      oscillatorsRef.current.push(osc);
      oscillatorsRef.current.push(lfo);
    });

    // Add subtle rhythmic element
    const rhythmOsc = ctx.createOscillator();
    rhythmOsc.type = 'sine';
    rhythmOsc.frequency.setValueAtTime(config.baseFreq / 2, ctx.currentTime);

    const rhythmGain = ctx.createGain();
    rhythmGain.gain.setValueAtTime(0, ctx.currentTime);

    // Rhythmic LFO
    const rhythmLfo = ctx.createOscillator();
    rhythmLfo.type = 'sine';
    rhythmLfo.frequency.setValueAtTime(config.tempo, ctx.currentTime);

    const rhythmLfoGain = ctx.createGain();
    rhythmLfoGain.gain.setValueAtTime(0.05, ctx.currentTime);

    rhythmLfo.connect(rhythmLfoGain);
    rhythmLfoGain.connect(rhythmGain.gain);

    rhythmOsc.connect(rhythmGain);
    rhythmGain.connect(gainNodeRef.current);

    rhythmOsc.start();
    rhythmLfo.start();

    oscillatorsRef.current.push(rhythmOsc);
    oscillatorsRef.current.push(rhythmLfo);

  }, []);

  // Stop all audio
  const stopAudio = useCallback(() => {
    if (gainNodeRef.current && audioContextRef.current) {
      const ctx = audioContextRef.current;
      gainNodeRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);

      setTimeout(() => {
        oscillatorsRef.current.forEach(osc => {
          try {
            osc.stop();
            osc.disconnect();
          } catch (e) {}
        });
        oscillatorsRef.current = [];
      }, 600);
    }
  }, []);

  // Handle era changes
  useEffect(() => {
    if (currentEra && isPlayingRef.current) {
      createAmbientSound(currentEra);
    }
  }, [currentEra, createAmbientSound]);

  // Toggle play/pause
  const togglePlay = () => {
    setHasInteracted(true);

    if (isPlaying) {
      stopAudio();
      isPlayingRef.current = false;
      setIsPlaying(false);
    } else {
      isPlayingRef.current = true;
      setIsPlaying(true);
      if (currentEra) {
        createAmbientSound(currentEra);
      }
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      stopAudio();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [stopAudio]);

  const era = currentEra ? eras[currentEra] : null;
  const audioInfo = currentEra ? eraAudioConfig[currentEra] : null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="audio-manager"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <motion.button
            className={`audio-button ${isPlaying ? 'playing' : ''}`}
            onClick={togglePlay}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              '--audio-accent': era?.colors.accent || '#FFFF00',
            }}
          >
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.svg
                  key="pause"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="play"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  initial={{ scale: 0, rotate: 90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <path d="M8 5.14v14l11-7-11-7z" />
                </motion.svg>
              )}
            </AnimatePresence>

            {isPlaying && (
              <div className="audio-visualizer">
                {[...Array(4)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="audio-bar"
                    animate={{
                      scaleY: [0.3, 1, 0.5, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            )}
          </motion.button>

          <AnimatePresence>
            {(showTooltip || !hasInteracted) && (
              <motion.div
                className="audio-tooltip"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                {!hasInteracted ? (
                  <span className="audio-hint">🎵 Música de época</span>
                ) : isPlaying && audioInfo ? (
                  <>
                    <span className="audio-era">{era?.name}</span>
                    <span className="audio-track">{audioInfo.label}</span>
                  </>
                ) : (
                  <span className="audio-hint">Audio pausado</span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
