import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Plays a terminal "boot up" cut-scene once on load, then calls onDone().
export default function BootScreen({ lines, onDone }) {
  const [visible, setVisible] = useState(true);
  const [typedLines, setTypedLines] = useState([]);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setVisible(false);
    setTimeout(onDone, 550);
  };

  useEffect(() => {
    let cancelled = false;
    const perLineDelay = 420;
    const typeSpeed = 18;

    lines.forEach((text, idx) => {
      setTimeout(() => {
        if (cancelled) return;
        setTypedLines((prev) => [...prev, '']);
        let i = 0;
        const tick = () => {
          if (cancelled) return;
          if (i <= text.length) {
            setTypedLines((prev) => {
              const next = [...prev];
              next[idx] = text.slice(0, i);
              return next;
            });
            i++;
            setTimeout(tick, typeSpeed);
          }
        };
        tick();
      }, idx * perLineDelay);
    });

    const totalTime = lines.length * perLineDelay + 900;
    const doneTimer = setTimeout(finish, totalTime);
    const safetyTimer = setTimeout(finish, 6000);

    return () => {
      cancelled = true;
      clearTimeout(doneTimer);
      clearTimeout(safetyTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="boot-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="boot-box">
            <div id="bootLines">
              {typedLines.map((text, idx) => (
                <div key={idx} className="boot-line show">
                  {text}
                  {idx === lines.length - 1 && text.length === lines[idx].length && (
                    <span className="boot-cursor" />
                  )}
                </div>
              ))}
            </div>
          </div>
          <button className="boot-skip" onClick={finish}>
            SKIP &#9654;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
