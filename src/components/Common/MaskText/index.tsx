// MaskText.tsx
'use client';
import { Body, LineMask } from './styles';
import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';

type MaskTextProps = {
  phrases: string[];
  tag: 'h1' | 'h2' | 'h3' | 'span' | 'p';
  className?: string;   // ← agregado
};

const MaskText = ({ phrases, tag, className }: MaskTextProps) => {
  const animate = {
    initial: { y: '100%' },
    open: (i: number) => ({
      y: '0%',
      transition: { duration: 1, delay: 0.1 * i, ease: [0.33, 1, 0.68, 1] },
    }),
  };
  const body = useRef(null);
  const isInView = useInView(body, { once: true, margin: '-10%', amount: 0.4 });

  return (
    <Body ref={body}>
      {phrases.map((phrase, index) => (
        <LineMask key={index}>
          {tag === 'h1' ? (
            <motion.h1 className={className} variants={animate} initial="initial" animate={isInView ? 'open' : ''} custom={index}>
              {phrase}
            </motion.h1>
          ) : tag === 'h2' ? (
            <motion.h2 className={className} variants={animate} initial="initial" animate={isInView ? 'open' : ''} custom={index}>
              {phrase}
            </motion.h2>
          ) : tag === 'h3' ? (
            <motion.h3 className={className} variants={animate} initial="initial" animate={isInView ? 'open' : ''} custom={index}>
              {phrase}
            </motion.h3>
          ) : tag === 'span' ? (
            <motion.span className={className} variants={animate} initial="initial" animate={isInView ? 'open' : ''} custom={index}>
              {phrase}
            </motion.span>
          ) : (
            <motion.p className={className} variants={animate} initial="initial" animate={isInView ? 'open' : ''} custom={index}>
              {phrase}
            </motion.p>
          )}
        </LineMask>
      ))}
    </Body>
  );
};

export default MaskText;

