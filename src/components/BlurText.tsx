import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type BlurTextProps = {
  text: string;
  className?: string;
  delay?: number;
  animateBy?: "words";
  direction?: "bottom";
};

export function BlurText({
  text,
  className = "",
  delay = 0,
}: BlurTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15, rootMargin: "0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const words = text.split(/\s+/).filter(Boolean);
  const stepDuration = 0.35;
  const totalDuration = stepDuration * 3;

  return (
    <p
      ref={containerRef}
      className={`flex flex-wrap ${className}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block mr-[0.3em] last:mr-0"
          initial={{
            filter: "blur(10px)",
            opacity: 0,
            y: 50,
          }}
          animate={
            visible
              ? {
                  filter: ["blur(10px)", "blur(5px)", "blur(0px)"],
                  opacity: [0, 0.5, 1],
                  y: [50, -5, 0],
                }
              : {
                  filter: "blur(10px)",
                  opacity: 0,
                  y: 50,
                }
          }
          transition={{
            duration: totalDuration,
            times: [0, 0.5, 1],
            delay: delay / 1000 + i * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}
