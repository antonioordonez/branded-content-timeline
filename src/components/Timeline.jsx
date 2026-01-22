import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useMemo } from 'react';
import TimelineItem from './TimelineItem';
import { timelineData, eras } from '../data/timelineData';
import './Timeline.css';

export default function Timeline({ onItemClick }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Group items by era for section headers
  const groupedData = useMemo(() => {
    const groups = [];
    let currentEra = null;

    timelineData.forEach((item, index) => {
      if (item.era !== currentEra) {
        groups.push({
          type: 'era-header',
          era: item.era,
          data: eras[item.era]
        });
        currentEra = item.era;
      }
      groups.push({
        type: 'item',
        data: item,
        index
      });
    });

    return groups;
  }, []);

  // Progress line
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="timeline" className="timeline" ref={containerRef}>
      {/* Main progress line */}
      <div className="timeline-progress-track">
        <motion.div
          className="timeline-progress-line"
          style={{ height: lineHeight }}
        />
      </div>

      {/* Timeline header */}
      <motion.header
        className="timeline-header"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="timeline-main-title">
          164 Años de
          <br />
          <span>Contenido de Marca</span>
        </h2>
        <p className="timeline-intro">
          Desde la primera revista de John Deere hasta los mundos virtuales de hoy,
          el branded content ha evolucionado de herramienta comercial a fenómeno cultural.
        </p>
      </motion.header>

      {/* Timeline content */}
      <div className="timeline-content">
        {groupedData.map((group, idx) => {
          if (group.type === 'era-header') {
            return (
              <EraHeader key={`era-${group.era}`} era={group.era} data={group.data} />
            );
          }
          return (
            <TimelineItem
              key={`item-${group.data.year}-${group.index}`}
              item={group.data}
              index={group.index}
              onClick={onItemClick}
            />
          );
        })}
      </div>

      {/* Footer */}
      <motion.footer
        className="timeline-footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="timeline-footer-content">
          <p className="timeline-footer-text">
            El branded content no es publicidad disfrazada.
            <br />
            Es la marca convirtiéndose en cultura.
          </p>
          <a
            href="https://madridcontent.school"
            target="_blank"
            rel="noopener noreferrer"
            className="timeline-footer-link"
          >
            Descubre más en Madrid Content School
          </a>
        </div>
      </motion.footer>
    </section>
  );
}

function EraHeader({ era, data }) {
  return (
    <motion.div
      className={`era-section-header era-${era}`}
      style={{
        '--era-primary': data.colors.primary,
        '--era-secondary': data.colors.secondary,
        '--era-accent': data.colors.accent,
        '--era-background': data.colors.background,
        '--era-text': data.colors.text,
      }}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="era-header-content">
        <span className="era-header-years">{data.years}</span>
        <h3 className="era-header-name">{data.name}</h3>
        <p className="era-header-description">{data.description}</p>
      </div>
      <motion.div
        className="era-header-decoration"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
    </motion.div>
  );
}
