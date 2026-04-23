'use client';

import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const Dot = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--green);
  pointer-events: none;
  z-index: 99999;
  transform: translate(-50%, -50%);
  transition: transform 0.08s ease, opacity 0.2s ease;
  animation: ${fadeIn} 0.4s ease forwards;

  @media (pointer: coarse) {
    display: none;
  }
`;

const Ring = styled.div<{ $hovered: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1.5px solid var(--green);
  pointer-events: none;
  z-index: 99998;
  transform: translate(-50%, -50%) scale(${({ $hovered }) => ($hovered ? 1.6 : 1)});
  transition: transform 0.22s ease, opacity 0.2s ease, border-color 0.2s ease;
  animation: ${fadeIn} 0.4s ease forwards;
  opacity: ${({ $hovered }) => ($hovered ? 0.6 : 0.85)};

  @media (pointer: coarse) {
    display: none;
  }
`;

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, [tabindex]';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Ring follows with lerp via rAF
  const ringPos = useRef({ x: -100, y: -100 });
  const mousePos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }

      const target = e.target as Element | null;
      setHovered(Boolean(target?.closest(INTERACTIVE)));
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.14);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.14);

      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <Dot ref={dotRef} />
      <Ring ref={ringRef} $hovered={hovered} />
    </>
  );
};

export default CustomCursor;
