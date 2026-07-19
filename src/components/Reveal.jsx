import { useState } from 'react';
import { motion } from 'framer-motion';

// Wraps children in a scroll-triggered reveal animation (blur + rise).
// glitch=true adds a short glitch "cut" effect (from index.css) as it snaps into place.
export default function Reveal({ children, className = '', glitch = false, delay = 0, as = 'div' }) {
  const Tag = motion[as] || motion.div;
  const [entered, setEntered] = useState(false);

  const variants = {
    hidden: { opacity: 0, y: 28, filter: 'blur(2px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay },
    },
  };

  return (
    <Tag
      className={`reveal ${glitch ? 'reveal-glitch' : ''} ${entered ? 'in' : ''} ${className}`}
      initial="hidden"
      whileInView="visible"
      onViewportEnter={() => setEntered(true)}
      viewport={{ once: true, margin: '-40px' }}
      variants={variants}
    >
      {children}
    </Tag>
  );
}
