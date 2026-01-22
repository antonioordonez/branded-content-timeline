import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { eras } from '../data/timelineData';
import './EraIndicator.css';

export default function EraIndicator() {
  const [currentEra, setCurrentEra] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const timeline = document.getElementById('timeline');
      if (!timeline) return;

      const timelineRect = timeline.getBoundingClientRect();
      const isInTimeline = timelineRect.top < window.innerHeight / 2 && timelineRect.bottom > window.innerHeight / 2;

      setIsVisible(isInTimeline);

      if (!isInTimeline) return;

      // Find the era section that's currently most visible
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

  const era = currentEra ? eras[currentEra] : null;

  return (
    <AnimatePresence>
      {isVisible && era && (
        <motion.div
          className="era-indicator"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          style={{
            '--indicator-accent': era.colors.accent,
            '--indicator-primary': era.colors.primary,
          }}
        >
          <motion.div
            className="era-indicator-dot"
            layoutId="era-dot"
            style={{ background: era.colors.accent }}
          />
          <div className="era-indicator-content">
            <span className="era-indicator-years">{era.years}</span>
            <span className="era-indicator-name">{era.name}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
