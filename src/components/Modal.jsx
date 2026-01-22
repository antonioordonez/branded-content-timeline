import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import TimelineIcon from './TimelineIcon';
import { eras } from '../data/timelineData';
import './Modal.css';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    rotateX: -15
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 30,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export default function Modal({ item, isOpen, onClose }) {
  const era = item ? eras[item.era] : null;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.article
            className={`modal era-${item.era}`}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            style={{
              '--era-primary': era.colors.primary,
              '--era-secondary': era.colors.secondary,
              '--era-accent': era.colors.accent,
              '--era-background': era.colors.background,
              '--era-text': era.colors.text,
            }}
          >
            {/* Close button */}
            <motion.button
              className="modal-close"
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </motion.button>

            {/* Header with year */}
            <motion.header className="modal-header" variants={contentVariants}>
              <div className="modal-year-badge">
                <span className="modal-year">{item.year}</span>
                <span className="modal-era-name">{era.name}</span>
              </div>
            </motion.header>

            {/* Media section */}
            <motion.div className="modal-media" variants={contentVariants}>
              {item.video ? (
                <div className="modal-video-wrapper">
                  <iframe
                    src={item.video}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : item.image ? (
                <div className="modal-image-wrapper">
                  <img src={item.image} alt={item.title} />
                </div>
              ) : (
                <div className="modal-icon-wrapper">
                  <TimelineIcon icon={item.icon} color={era.colors.accent} />
                </div>
              )}
            </motion.div>

            {/* Content */}
            <motion.div className="modal-content" variants={contentVariants}>
              <h2 className="modal-title">{item.title}</h2>
              <p className="modal-brand">{item.brand}</p>
              <p className="modal-description">{item.description}</p>

              {/* Extended content */}
              {item.extended && (
                <motion.div
                  className="modal-extended"
                  variants={contentVariants}
                >
                  <h3 className="modal-extended-title">Por qué importa</h3>
                  <p className="modal-extended-text">{item.extended}</p>
                </motion.div>
              )}

              {/* Key insight */}
              {item.insight && (
                <motion.blockquote
                  className="modal-insight"
                  variants={contentVariants}
                >
                  <span className="modal-insight-icon">"</span>
                  {item.insight}
                </motion.blockquote>
              )}

              {/* Tags/keywords */}
              {item.tags && (
                <motion.div className="modal-tags" variants={contentVariants}>
                  {item.tags.map((tag, i) => (
                    <span key={i} className="modal-tag">{tag}</span>
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* Footer decoration */}
            <motion.div
              className="modal-decoration"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
