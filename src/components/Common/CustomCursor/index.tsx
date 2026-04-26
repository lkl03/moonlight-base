'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => setEnabled(fine.matches && !reduce.matches);
    update();

    fine.addEventListener('change', update);
    reduce.addEventListener('change', update);

    return () => {
      fine.removeEventListener('change', update);
      reduce.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    window.addEventListener('pointermove', onMove, { passive: true });

    let raf = 0;
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;

      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ring.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Ring — slightly lagged, hollow with emerald border */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 99998,
          width: '18px',
          height: '18px',
          marginLeft: '-9px',
          marginTop: '-9px',
          borderRadius: '50%',
          border: '1.5px solid #17F2A6',
          background: 'transparent',
          backdropFilter: 'blur(1px)',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />
      {/* Dot — same position, very subtle tinted fill */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 99999,
          width: '18px',
          height: '18px',
          marginLeft: '-9px',
          marginTop: '-9px',
          borderRadius: '50%',
          background: 'rgba(23, 242, 166, 0.08)',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />
    </>
  );
}
