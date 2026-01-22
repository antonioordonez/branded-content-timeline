import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import TimelineIcon from './TimelineIcon';
import { eras } from '../data/timelineData';
import './TimelineItem.css';

export default function TimelineItem({ item, index, onClick }) {
  const ref = useRef(null);
  const era = eras[item.era];
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"]
  });

  // Base animations
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 0.5, 1]);

  // Fan animation - cards rotate in from each side
  const rotateZ = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isEven ? [-15, -5, 0] : [15, 5, 0]
  );

  // 3D rotation for depth effect
  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isEven ? [25, 10, 0] : [-25, -10, 0]
  );

  // Slide in from the side
  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isEven ? [-100, -30, 0] : [100, 30, 0]
  );

  // Scale up as it comes in
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 0.9, 1]);

  // Slight vertical movement
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  // Parallax for the icon - opposite direction for extra depth
  const iconY = useTransform(scrollYProgress, [0, 1], [30, -15]);
  const iconRotate = useTransform(
    scrollYProgress,
    [0, 1],
    isEven ? [10, 0] : [-10, 0]
  );

  // Year marker animation
  const yearScale = useTransform(scrollYProgress, [0, 0.4, 0.8], [0.5, 0.8, 1]);
  const yearOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 0.5, 1]);

  return (
    <motion.article
      ref={ref}
      className={`timeline-item era-${item.era} ${isEven ? 'even' : 'odd'}`}
      style={{
        '--era-primary': era.colors.primary,
        '--era-secondary': era.colors.secondary,
        '--era-accent': era.colors.accent,
        '--era-background': era.colors.background,
        '--era-text': era.colors.text,
        perspective: '1200px',
      }}
    >
      {/* Timeline connector line */}
      <motion.div
        className="timeline-connector"
        style={{ scaleY: scrollYProgress }}
      />

      {/* Year marker */}
      <motion.div
        className="timeline-year-marker"
        style={{
          opacity: yearOpacity,
          scale: yearScale,
        }}
      >
        <span className="timeline-year">{item.year}</span>
        <motion.div
          className="timeline-dot"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.2 }}
        />
      </motion.div>

      {/* Content card with fan animation */}
      <motion.div
        className="timeline-card"
        style={{
          opacity,
          x,
          y,
          scale,
          rotateZ,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onClick={() => onClick && onClick(item)}
        whileHover={{
          scale: 1.03,
          rotateZ: 0,
          rotateY: 0,
          x: 0,
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="timeline-card-inner">
          {/* Icon with parallax */}
          <motion.div
            className="timeline-icon-wrapper"
            style={{
              y: iconY,
              rotate: iconRotate,
            }}
          >
            <TimelineIcon icon={item.icon} color={era.colors.accent} />
          </motion.div>

          {/* Era badge */}
          <span className="timeline-era-badge">{era.name}</span>

          {/* Title */}
          <h3 className="timeline-title">{item.title}</h3>

          {/* Brand */}
          <span className="timeline-brand">{item.brand}</span>

          {/* Description */}
          <p className="timeline-description">{item.description}</p>

          {/* Click indicator */}
          <span className="timeline-click-hint">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Ver más
          </span>

          {/* Decorative elements */}
          <div className="timeline-card-decoration">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path
                d="M0 100 Q50 80 100 100"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3 }}
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}
