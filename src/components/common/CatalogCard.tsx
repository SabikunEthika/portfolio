import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const lines = [
  "SUBJ: Full-stack development",
  "SUBJ: Applied artificial intelligence",
  "NOTE: Learns, builds, ships.",
  "LOC:  Dhaka, Bangladesh",
];

const total = lines.reduce((n, line) => n + line.length, 0);

function CatalogCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= total) window.clearInterval(id);
    }, 26);

    return () => {
      window.clearInterval(id);
      setCount(0);
    };
  }, [inView]);

  let remaining = count;
  let caretPlaced = false;

  return (
    <div ref={ref} className="catalog-card">
      <div className="catalog-top">
        <span>CALL NO.</span>
        <strong>QA76.73 .S25</strong>
      </div>

      <h3>Alam, Sabikun</h3>
      <p className="catalog-title">
        Portfolio of a full-stack developer : <em>selected works, 2023&ndash;</em>
      </p>

      <div className="catalog-lines">
        {lines.map((line) => {
          const shown = line.slice(0, Math.max(0, remaining));
          remaining -= line.length;

          const showCaret = !caretPlaced && shown.length < line.length;
          if (showCaret) caretPlaced = true;

          return (
            <p key={line}>
              {shown}
              {showCaret && <span className="tw-caret" />}
            </p>
          );
        })}
      </div>

      <motion.div
        className="catalog-stamp"
        initial={{ opacity: 0, scale: 2.6, rotate: -26 }}
        animate={
          inView
            ? { opacity: 0.88, scale: 1, rotate: -11 }
            : { opacity: 0, scale: 2.6, rotate: -26 }
        }
        transition={
          inView
            ? { delay: 2.6, type: "spring", stiffness: 260, damping: 14 }
            : { duration: 0.2 }
        }
      >
        Catalogued
      </motion.div>
    </div>
  );
}

export default CatalogCard;