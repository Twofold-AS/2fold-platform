'use client';
import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');

    if (!cursorDot || !cursorRing) return;

    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        (cursorDot as HTMLElement).style.left = e.clientX - 4 + 'px';
        (cursorDot as HTMLElement).style.top = e.clientY - 4 + 'px';
        (cursorRing as HTMLElement).style.left = e.clientX - 20 + 'px';
        (cursorRing as HTMLElement).style.top = e.clientY - 20 + 'px';
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div className="cursor-dot"></div>
      <div className="cursor-ring"></div>
    </>
  );
}
