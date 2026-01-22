import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eras } from '../data/timelineData';
import './AudioManager.css';

// Era-specific music from archive.org (public domain) and other royalty-free sources
const eraAudioConfig = {
  victorian: {
    label: 'Moonlight Sonata',
    artist: 'Beethoven',
    // Public domain classical from archive.org
    url: 'https://archive.org/download/100ClassicalMusicMasterpieces/1801%20Beethoven-%20%27Moonlight%27%20Sonata%2C%201st%20movement.mp3'
  },
  artNouveau: {
    label: 'Ave Maria',
    artist: 'Schubert',
    url: 'https://archive.org/download/100ClassicalMusicMasterpieces/1825%20Schubert%20-%20Ave%20Maria.mp3'
  },
  artDeco: {
    label: 'Jazz de los años 20',
    artist: 'Bennie Moten',
    // Public domain 1920s jazz
    url: 'https://archive.org/download/Free_20s_Jazz_Collection/Bennie_Moten_Kater_St._Rag.mp3'
  },
  midCentury: {
    label: 'Spring Song',
    artist: 'Mendelssohn',
    url: 'https://archive.org/download/100ClassicalMusicMasterpieces/1841%20Mendelssohn%20-Spring%20Song.mp3'
  },
  eighties: {
    label: 'Synthwave Ambient',
    artist: 'Synth Era',
    // Using generated audio for 80s since we need synthwave
    useGenerated: true,
    baseFreq: 110,
    type: 'sawtooth',
    chords: [1, 1.335, 1.5, 2]
  },
  digital: {
    label: 'Electronic Ambient',
    artist: 'Digital Age',
    useGenerated: true,
    baseFreq: 174.61,
    type: 'square',
    chords: [1, 1.5, 2]
  },
  social: {
    label: 'Träumerei',
    artist: 'Schumann',
    url: 'https://archive.org/download/100ClassicalMusicMasterpieces/1838%20Schumann%20-%20Traumerei.mp3'
  },
  immersive: {
    label: 'Adagio',
    artist: 'Albinoni',
    url: 'https://archive.org/download/100ClassicalMusicMasterpieces/1730%20Albinoni%20%2C%20Adagio.mp3'
  },
  future: {
    label: 'Futuristic Ambient',
    artist: 'Future Sounds',
    useGenerated: true,
    baseFreq: 87.31,
    type: 'sawtooth',
    chords: [1, 1.5, 2, 3]
  }
};

export default function AudioManager() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentEra, setCurrentEra] = useState('victorian');
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const nodesRef = useRef({ oscillators: [], gains: [] });
  const masterGainRef = useRef(null);
  const currentEraRef = useRef(currentEra);

  // Keep ref in sync with state
  useEffect(() => {
    currentEraRef.current = currentEra;
  }, [currentEra]);

  // Detect current era based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const timeline = document.getElementById('timeline');
      if (!timeline) {
        setIsVisible(false);
        return;
      }

      const timelineRect = timeline.getBoundingClientRect();
      const isInTimeline = timelineRect.top < window.innerHeight * 0.8 && timelineRect.bottom > 0;

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
          const classList = Array.from(header.classList);
          const eraClass = classList.find(c => c.startsWith('era-') && c !== 'era-section-header');
          if (eraClass) {
            closestEra = eraClass.replace('era-', '');
          }
        }
      });

      if (closestEra && eraAudioConfig[closestEra]) {
        setCurrentEra(closestEra);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    setTimeout(handleScroll, 100);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cleanup generated audio
  const cleanupGenerated = useCallback(() => {
    nodesRef.current.oscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {}
    });
    nodesRef.current.gains.forEach(gain => {
      try {
        gain.disconnect();
      } catch (e) {}
    });
    nodesRef.current = { oscillators: [], gains: [] };
  }, []);

  // Create generated synth sound (for 80s, digital, future)
  const createGeneratedSound = useCallback((config) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    const ctx = audioContextRef.current;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    cleanupGenerated();

    masterGainRef.current = ctx.createGain();
    masterGainRef.current.gain.setValueAtTime(0.35, ctx.currentTime);
    masterGainRef.current.connect(ctx.destination);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, ctx.currentTime);
    filter.connect(masterGainRef.current);

    config.chords.forEach((ratio, i) => {
      const osc = ctx.createOscillator();
      osc.type = config.type;
      osc.frequency.setValueAtTime(config.baseFreq * ratio, ctx.currentTime);
      osc.detune.setValueAtTime((i - 1) * 8, ctx.currentTime);

      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0.2, ctx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start();

      nodesRef.current.oscillators.push(osc);
      nodesRef.current.gains.push(oscGain);

      // LFO for movement
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.15 + (i * 0.08), ctx.currentTime);

      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(5, ctx.currentTime);

      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      nodesRef.current.oscillators.push(lfo);
      nodesRef.current.gains.push(lfoGain);
    });

    // Bass
    const bassOsc = ctx.createOscillator();
    bassOsc.type = 'sine';
    bassOsc.frequency.setValueAtTime(config.baseFreq / 2, ctx.currentTime);

    const bassGain = ctx.createGain();
    bassGain.gain.setValueAtTime(0.12, ctx.currentTime);

    bassOsc.connect(bassGain);
    bassGain.connect(masterGainRef.current);
    bassOsc.start();

    nodesRef.current.oscillators.push(bassOsc);
    nodesRef.current.gains.push(bassGain);
  }, [cleanupGenerated]);

  // Stop generated audio
  const stopGenerated = useCallback(() => {
    if (masterGainRef.current && audioContextRef.current) {
      const ctx = audioContextRef.current;
      masterGainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
      setTimeout(cleanupGenerated, 400);
    }
  }, [cleanupGenerated]);

  // Play audio for era
  const playAudio = useCallback((eraKey) => {
    const config = eraAudioConfig[eraKey];
    if (!config) return;

    // Stop any existing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    stopGenerated();

    if (config.useGenerated) {
      // Use Web Audio API for synth sounds
      createGeneratedSound(config);
    } else {
      // Use HTML5 Audio for real music
      setIsLoading(true);

      if (!audioRef.current) {
        audioRef.current = new Audio();
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;

        audioRef.current.addEventListener('canplaythrough', () => {
          setIsLoading(false);
          if (currentEraRef.current === eraKey) {
            audioRef.current.play().catch(e => console.log('Play failed:', e));
          }
        });

        audioRef.current.addEventListener('error', (e) => {
          console.error('Audio load error:', e);
          setIsLoading(false);
          // Fallback to generated audio
          createGeneratedSound({
            baseFreq: 220,
            type: 'sine',
            chords: [1, 1.25, 1.5]
          });
        });
      }

      audioRef.current.src = config.url;
      audioRef.current.load();
    }
  }, [createGeneratedSound, stopGenerated]);

  // Stop all audio
  const stopAllAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    stopGenerated();
  }, [stopGenerated]);

  // Handle era changes while playing
  useEffect(() => {
    if (isPlaying && currentEra) {
      playAudio(currentEra);
    }
  }, [currentEra, isPlaying, playAudio]);

  // Toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      stopAllAudio();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playAudio(currentEra);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAllAudio();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [stopAllAudio]);

  const era = currentEra ? eras[currentEra] : null;

  const shouldShow = isVisible;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          className="audio-manager"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <motion.button
            className={`audio-button ${isPlaying ? 'playing' : ''} ${isLoading ? 'loading' : ''}`}
            onClick={togglePlay}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              '--audio-accent': era?.colors?.accent || '#FFFF00',
            }}
            aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
            disabled={isLoading}
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  className="audio-loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, rotate: 360 }}
                  transition={{ rotate: { duration: 1, repeat: Infinity, ease: "linear" } }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="40 20" />
                  </svg>
                </motion.div>
              ) : isPlaying ? (
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

            {isPlaying && !isLoading && (
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
