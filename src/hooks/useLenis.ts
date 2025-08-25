import { useEffect } from 'react';
import Lenis from 'lenis';


declare global {
  interface Window {
    ScrollTrigger?: {
      update: () => void;
      refresh: () => void;
    };
  }
}

export const useLenis = () => {
  useEffect(() => {
    
    const lenis = new Lenis({
      duration: 1, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Плавная функция easing
      lerp: 0.07, 
      smoothWheel: true,
      syncTouch: false, 
      touchMultiplier: 1.5, 
      wheelMultiplier: 1.2, 
      infinite: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical'
    });

    // Оптимизированная функция анимации
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    
    if (window.ScrollTrigger) {
      lenis.on('scroll', () => {
        window.ScrollTrigger?.update();
      });
    }

    
    const handleResize = () => {
      lenis.resize();
      window.ScrollTrigger?.refresh();
    };

    window.addEventListener('resize', handleResize);

    
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      lenis.destroy();
    };
  }, []);
};