import { motion } from 'framer-motion';

const iconVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: "easeInOut" }
  }
};

const icons = {
  journal: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.rect
        x="12" y="8" width="40" height="48" rx="2"
        stroke={color} strokeWidth="2"
        variants={iconVariants}
      />
      <motion.line x1="20" y1="20" x2="44" y2="20" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.line x1="20" y1="28" x2="44" y2="28" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.line x1="20" y1="36" x2="36" y2="36" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M12 8h4v48h-4" stroke={color} strokeWidth="2" fill="none" variants={iconVariants} />
    </svg>
  ),
  circus: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path d="M32 8L8 48h48L32 8z" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M32 8v40" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M20 32h24" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.circle cx="32" cy="4" r="2" fill={color} variants={iconVariants} />
      <motion.path d="M8 48h48" stroke={color} strokeWidth="2" variants={iconVariants} />
    </svg>
  ),
  poster: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.rect x="10" y="6" width="44" height="52" rx="2" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.circle cx="32" cy="26" r="10" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M22 44h20" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M26 50h12" stroke={color} strokeWidth="2" variants={iconVariants} />
    </svg>
  ),
  bottle: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path d="M26 8h12v8l4 8v32a4 4 0 01-4 4H26a4 4 0 01-4-4V24l4-8V8z" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.ellipse cx="32" cy="8" rx="6" ry="2" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M24 36h16" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M24 44h16" stroke={color} strokeWidth="2" variants={iconVariants} />
    </svg>
  ),
  guide: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.rect x="8" y="10" width="48" height="44" rx="4" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.circle cx="32" cy="32" r="12" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M32 24v16M24 32h16" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.circle cx="32" cy="32" r="4" stroke={color} strokeWidth="2" variants={iconVariants} />
    </svg>
  ),
  orange: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.circle cx="32" cy="36" r="20" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M32 16v-4M28 14c0-4 8-4 8 0" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M24 28c8 8 16 0 16 0" stroke={color} strokeWidth="2" variants={iconVariants} />
    </svg>
  ),
  grapes: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.circle cx="32" cy="24" r="6" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.circle cx="24" cy="34" r="6" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.circle cx="40" cy="34" r="6" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.circle cx="28" cy="44" r="6" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.circle cx="36" cy="44" r="6" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M32 18v-8M28 12h8" stroke={color} strokeWidth="2" variants={iconVariants} />
    </svg>
  ),
  spinach: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.ellipse cx="32" cy="36" rx="16" ry="20" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M32 16v40" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M24 28c4 2 8-2 8-2s4 4 8 2" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M24 40c4 2 8-2 8-2s4 4 8 2" stroke={color} strokeWidth="2" variants={iconVariants} />
    </svg>
  ),
  radio: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.rect x="8" y="20" width="48" height="36" rx="4" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.circle cx="24" cy="40" r="10" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.rect x="40" y="28" width="10" height="20" rx="2" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M16 8l8 12M48 8l-8 12" stroke={color} strokeWidth="2" variants={iconVariants} />
    </svg>
  ),
  soap: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.ellipse cx="32" cy="40" rx="20" ry="12" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.circle cx="20" cy="20" r="6" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.circle cx="36" cy="16" r="8" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.circle cx="48" cy="26" r="4" stroke={color} strokeWidth="2" variants={iconVariants} />
    </svg>
  ),
  microphone: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.rect x="24" y="8" width="16" height="28" rx="8" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M16 28v4a16 16 0 0032 0v-4" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.line x1="32" y1="48" x2="32" y2="56" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.line x1="24" y1="56" x2="40" y2="56" stroke={color} strokeWidth="2" variants={iconVariants} />
    </svg>
  ),
  trophy: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path d="M20 8h24v20a12 12 0 01-24 0V8z" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M20 14H10a6 6 0 006 12h4" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M44 14h10a6 6 0 01-6 12h-4" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.line x1="32" y1="40" x2="32" y2="48" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M22 48h20v8H22z" stroke={color} strokeWidth="2" variants={iconVariants} />
    </svg>
  ),
  cowboy: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.ellipse cx="32" cy="28" rx="20" ry="8" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M20 28c-4 8-4 16 0 20h24c4-4 4-12 0-20" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M24 28v-8a8 8 0 0116 0v8" stroke={color} strokeWidth="2" variants={iconVariants} />
    </svg>
  ),
  candy: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.circle cx="32" cy="32" r="16" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M16 32H8M56 32h-8" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M4 28l8 8M4 36l8-8M52 28l8 8M52 36l8-8" stroke={color} strokeWidth="2" variants={iconVariants} />
    </svg>
  ),
  jet: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path d="M32 8l-4 24h-16l-4 8h20l-4 16h8l4-16h20l-4-8H36l-4-24z" stroke={color} strokeWidth="2" variants={iconVariants} />
    </svg>
  ),
  gamepad: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.rect x="8" y="18" width="48" height="28" rx="8" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M20 28v8M16 32h8" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.circle cx="44" cy="28" r="3" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.circle cx="48" cy="36" r="3" stroke={color} strokeWidth="2" variants={iconVariants} />
    </svg>
  ),
  brick: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.rect x="12" y="20" width="40" height="24" rx="2" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.circle cx="20" cy="16" r="4" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.circle cx="32" cy="16" r="4" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.circle cx="44" cy="16" r="4" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.rect x="16" y="48" width="32" height="8" rx="2" stroke={color} strokeWidth="2" variants={iconVariants} />
    </svg>
  ),
  package: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.rect x="12" y="16" width="40" height="36" rx="2" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M12 28h40" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M26 28v-12h12v12" stroke={color} strokeWidth="2" variants={iconVariants} />
    </svg>
  ),
  car: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path d="M8 36h48l-4-12H12l-4 12z" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M4 36v8h8v-8H4zM52 36v8h8v-8h-8z" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.circle cx="16" cy="44" r="4" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.circle cx="48" cy="44" r="4" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M20 28h24" stroke={color} strokeWidth="2" variants={iconVariants} />
    </svg>
  ),
  blender: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path d="M20 8h24l-4 32H24L20 8z" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.rect x="18" y="40" width="28" height="16" rx="2" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.circle cx="32" cy="48" r="4" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M24 20h16M26 28h12" stroke={color} strokeWidth="2" variants={iconVariants} />
    </svg>
  ),
  tv: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.rect x="8" y="16" width="48" height="36" rx="4" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.rect x="14" y="22" width="30" height="24" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.circle cx="50" cy="30" r="2" fill={color} variants={iconVariants} />
      <motion.circle cx="50" cy="38" r="2" fill={color} variants={iconVariants} />
      <motion.path d="M24 8l8 8M40 8l-8 8" stroke={color} strokeWidth="2" variants={iconVariants} />
    </svg>
  ),
  perfume: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.rect x="20" y="20" width="24" height="36" rx="4" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.rect x="28" y="12" width="8" height="8" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M32 8v4" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M12 24l6 4M12 32l6 0M12 40l6-4" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M52 24l-6 4M52 32l-6 0M52 40l-6-4" stroke={color} strokeWidth="2" variants={iconVariants} />
    </svg>
  ),
  beer: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path d="M16 16h24v40H16z" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M40 24h8a4 4 0 014 4v16a4 4 0 01-4 4h-8" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M20 24c0-4 4-4 4 0s4 4 4 0 4-4 4 0 4 4 4 0" stroke={color} strokeWidth="2" variants={iconVariants} />
    </svg>
  ),
  parachute: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path d="M8 24c0-12 12-16 24-16s24 4 24 16" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M8 24c4 8 12 8 16 4M24 28c4 4 12 4 16 0M40 28c4 4 12 4 16-4" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M16 28l8 24M48 28l-8 24" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.circle cx="32" cy="56" r="4" stroke={color} strokeWidth="2" variants={iconVariants} />
    </svg>
  ),
  mirror: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.ellipse cx="32" cy="28" rx="20" ry="20" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.line x1="32" y1="48" x2="32" y2="60" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.ellipse cx="32" cy="60" rx="12" ry="4" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.circle cx="28" cy="24" r="3" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.circle cx="36" cy="24" r="3" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M26 34c4 4 8 4 12 0" stroke={color} strokeWidth="2" variants={iconVariants} />
    </svg>
  ),
  film: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.rect x="8" y="12" width="48" height="40" rx="2" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.rect x="12" y="16" width="6" height="6" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.rect x="12" y="26" width="6" height="6" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.rect x="12" y="36" width="6" height="6" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.rect x="46" y="16" width="6" height="6" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.rect x="46" y="26" width="6" height="6" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.rect x="46" y="36" width="6" height="6" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M24 32l16-8v16z" stroke={color} strokeWidth="2" variants={iconVariants} />
    </svg>
  ),
  pokeball: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.circle cx="32" cy="32" r="24" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.line x1="8" y1="32" x2="56" y2="32" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.circle cx="32" cy="32" r="8" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.circle cx="32" cy="32" r="4" stroke={color} strokeWidth="2" variants={iconVariants} />
    </svg>
  ),
  lightbulb: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path d="M24 44v4h16v-4" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M26 52h12" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M28 56h8" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M24 44c-6-4-10-10-10-18a18 18 0 1136 0c0 8-4 14-10 18" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M28 32v-8l4 4 4-4v8" stroke={color} strokeWidth="2" variants={iconVariants} />
    </svg>
  ),
  vr: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.rect x="4" y="20" width="56" height="28" rx="8" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.circle cx="22" cy="34" r="8" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.circle cx="42" cy="34" r="8" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M30 34h4" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.path d="M4 32H0M64 32h-4" stroke={color} strokeWidth="2" variants={iconVariants} />
    </svg>
  ),
  star: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path d="M32 8l6 18h18l-14 11 5 19-15-11-15 11 5-19-14-11h18z" stroke={color} strokeWidth="2" variants={iconVariants} />
    </svg>
  ),
  racing: (color) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.rect x="8" y="8" width="48" height="48" rx="4" stroke={color} strokeWidth="2" variants={iconVariants} />
      <motion.rect x="8" y="8" width="16" height="16" fill={color} variants={iconVariants} />
      <motion.rect x="40" y="8" width="16" height="16" fill={color} variants={iconVariants} />
      <motion.rect x="24" y="24" width="16" height="16" fill={color} variants={iconVariants} />
      <motion.rect x="8" y="40" width="16" height="16" fill={color} variants={iconVariants} />
      <motion.rect x="40" y="40" width="16" height="16" fill={color} variants={iconVariants} />
    </svg>
  )
};

export default function TimelineIcon({ icon, color = '#FFFF00' }) {
  const IconComponent = icons[icon];

  if (!IconComponent) {
    return (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.circle cx="32" cy="32" r="24" stroke={color} strokeWidth="2" variants={iconVariants} />
      </svg>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      style={{ width: '100%', height: '100%' }}
    >
      {IconComponent(color)}
    </motion.div>
  );
}
